import { NextResponse, NextRequest } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const requestSchema = z.object({
  guestName: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  guestEmail: z.string().email("E-mail inválido"),
})

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  const validation = requestSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(
      { error: "Nome e e-mail inválidos" },
      { status: 400 }
    )
  }

  const { guestName, guestEmail } = validation.data

  const guest = await prisma.guestPlayer.upsert({
    where: { email: guestEmail },
    update: { name: guestName },
    create: { name: guestName, email: guestEmail },
  })

  await prisma.gameSession.updateMany({
    where: { guestId: guest.id, status: "in_progress" },
    data: { status: "abandoned" },
  })

  const all = await prisma.question.findMany({
    select: {
      id: true,
      number: true,
      theme: true,
      difficulty: true,
      questionText: true,
      correctAnswer: true,
      wrongAnswer1: true,
      wrongAnswer2: true,
      wrongAnswer3: true,
    },
  })

  // Shuffle within each difficulty group, then concatenate easy → medium → hard
  const easy = shuffle(all.filter((q) => q.difficulty === "easy"))
  const medium = shuffle(all.filter((q) => q.difficulty === "medium"))
  const hard = shuffle(all.filter((q) => q.difficulty === "hard"))
  const ordered = [...easy, ...medium, ...hard]

  const gameSession = await prisma.gameSession.create({
    data: { guestId: guest.id },
  })

  const questions = ordered.map((q) => ({
    id: q.id,
    number: q.number,
    theme: q.theme,
    difficulty: q.difficulty,
    questionText: q.questionText,
    options: shuffle([q.correctAnswer, q.wrongAnswer1, q.wrongAnswer2, q.wrongAnswer3]),
  }))

  return NextResponse.json({ sessionId: gameSession.id, guestId: guest.id, questions })
}
