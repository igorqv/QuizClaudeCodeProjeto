import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { ZodError } from "zod"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { getLevelFromScore, checkAndAwardBadges } from "@/lib/levels"
import { finishSchema } from "@/lib/validators"

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { sessionId } = finishSchema.parse(body)

    // Verify ownership before attempting atomic completion
    const gameSession = await prisma.gameSession.findUnique({ where: { id: sessionId } })
    if (!gameSession || gameSession.userId !== session.user.id) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 404 })
    }

    // Atomic update: only succeeds if status is still 'in_progress'
    // Prevents double-finishing if two requests arrive simultaneously
    const updated = await prisma.gameSession.updateMany({
      where: { id: sessionId, status: "in_progress" },
      data: { status: "completed", finishedAt: new Date() },
    })
    if (updated.count === 0) {
      return NextResponse.json({ error: "Sessão já finalizada" }, { status: 400 })
    }

    const completed = await prisma.gameSession.findUniqueOrThrow({ where: { id: sessionId } })

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { totalScore: true },
    })

    const previousScore = currentUser?.totalScore ?? 0
    const previousLevel = getLevelFromScore(previousScore)
    const newTotalScore = previousScore + completed.score
    const newLevel = getLevelFromScore(newTotalScore)

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        totalScore: { increment: completed.score },
        totalCorrect: { increment: completed.correctCount },
        gamesPlayed: { increment: 1 },
        level: newLevel,
      },
      select: { totalScore: true, level: true, gamesPlayed: true },
    })

    const newBadges = await checkAndAwardBadges(session.user.id, sessionId, updatedUser)

    return NextResponse.json({
      roundScore: completed.score,
      correctCount: completed.correctCount,
      totalScore: updatedUser.totalScore,
      newLevel: updatedUser.level,
      levelUp: updatedUser.level > previousLevel,
      newBadges,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }
    return NextResponse.json({ error: "Erro ao finalizar partida" }, { status: 500 })
  }
}
