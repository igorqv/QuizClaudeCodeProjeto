import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { z, ZodError } from "zod"
import { prisma } from "@/lib/prisma"

const finishSchema = z.object({
  sessionId: z.string().cuid(),
  guestId: z.string().cuid(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, guestId } = finishSchema.parse(body)

    const gameSession = await prisma.gameSession.findUnique({ where: { id: sessionId } })
    if (!gameSession || gameSession.guestId !== guestId) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 404 })
    }

    const updated = await prisma.gameSession.updateMany({
      where: { id: sessionId, status: "in_progress" },
      data: { status: "completed", finishedAt: new Date() },
    })
    if (updated.count === 0) {
      return NextResponse.json({ error: "Sessão já finalizada" }, { status: 400 })
    }

    const completed = await prisma.gameSession.findUniqueOrThrow({ where: { id: sessionId } })

    const guest = await prisma.guestPlayer.findUnique({
      where: { id: guestId },
      select: { bestScore: true, gamesPlayed: true },
    })

    // Update bestScore only if current score is higher
    const newBestScore = Math.max(guest?.bestScore ?? 0, completed.score)

    const updatedGuest = await prisma.guestPlayer.update({
      where: { id: guestId },
      data: {
        bestScore: newBestScore,
        gamesPlayed: { increment: 1 },
      },
      select: { bestScore: true, gamesPlayed: true },
    })

    return NextResponse.json({
      roundScore: completed.score,
      correctCount: completed.correctCount,
      bestScore: updatedGuest.bestScore,
      gamesPlayed: updatedGuest.gamesPlayed,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }
    return NextResponse.json({ error: "Erro ao finalizar partida" }, { status: 500 })
  }
}
