import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  // Abandon any in-progress sessions before starting a new one
  await prisma.gameSession.updateMany({
    where: { userId: session.user.id, status: "in_progress" },
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

  const selected = shuffle(all).slice(0, 10)

  const gameSession = await prisma.gameSession.create({
    data: { userId: session.user.id },
  })

  // Build question list: 4 shuffled options, correct NOT marked
  const questions = selected.map((q) => ({
    id: q.id,
    number: q.number,
    theme: q.theme,
    difficulty: q.difficulty,
    questionText: q.questionText,
    options: shuffle([q.correctAnswer, q.wrongAnswer1, q.wrongAnswer2, q.wrongAnswer3]),
  }))

  return NextResponse.json({ sessionId: gameSession.id, questions })
}
