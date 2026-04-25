import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { z, ZodError } from "zod"
import { prisma } from "@/lib/prisma"
import { getLevelInfo } from "@/lib/levels"

const finishSchema = z.object({
  sessionId: z.string().cuid(),
  guestId: z.string().cuid(),
})

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, guestId } = finishSchema.parse(body)

    const gameSession = await prisma.gameSession.findUnique({
      where: { id: sessionId },
      include: {
        _count: { select: { answers: true } },
        answers: {
          select: { isCorrect: true },
          orderBy: { answeredAt: "asc" },
        },
      },
    })

    if (!gameSession || gameSession.guestId !== guestId) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 404 })
    }
    if (gameSession.status === "abandoned") {
      return NextResponse.json({ error: "Sessão abandonada" }, { status: 400 })
    }

    if (gameSession.status === "in_progress") {
      await prisma.gameSession.update({
        where: { id: sessionId },
        data: { status: "completed", finishedAt: new Date() },
      })
    }

    const questionsAnswered = gameSession._count.answers
    const roundScore = gameSession.score

    // Calculate max streak in this session (for badge checking)
    let maxStreak = 0
    let currentStreak = 0
    for (const ans of gameSession.answers) {
      if (ans.isCorrect) {
        currentStreak++
        maxStreak = Math.max(maxStreak, currentStreak)
      } else {
        currentStreak = 0
      }
    }

    // Get guest BEFORE update to compare level
    const guestBefore = await prisma.guestPlayer.findUnique({
      where: { id: guestId },
      select: { bestScore: true, totalScore: true, gamesPlayed: true },
    })

    const prevTotalScore = guestBefore?.totalScore ?? 0
    const newBestScore = Math.max(guestBefore?.bestScore ?? 0, roundScore)

    const updatedGuest = await prisma.guestPlayer.update({
      where: { id: guestId },
      data: {
        bestScore:     newBestScore,
        totalScore:    { increment: roundScore },
        totalCorrect:  { increment: gameSession.correctCount },
        totalAnswered: { increment: questionsAnswered },
        gamesPlayed:   { increment: 1 },
      },
      select: {
        bestScore:     true,
        totalScore:    true,
        totalCorrect:  true,
        totalAnswered: true,
        gamesPlayed:   true,
      },
    })

    // ── Badge logic ──────────────────────────────────────────────
    const existingBadges = await prisma.userBadge.findMany({
      where: { guestId },
      select: { badge: { select: { key: true } } },
    })
    const ownedKeys = new Set(existingBadges.map((ub) => ub.badge.key))

    const prevLevel = getLevelInfo(prevTotalScore).level
    const newLevel  = getLevelInfo(updatedGuest.totalScore).level

    const toAward: string[] = []

    // Game-count badges
    if (updatedGuest.gamesPlayed === 1)  toAward.push("primeiro_passo")
    if (updatedGuest.gamesPlayed === 5)  toAward.push("curioso_badge")
    if (updatedGuest.gamesPlayed === 10) toAward.push("maratonista")

    // Score badge (single game)
    if (roundScore >= 500) toAward.push("pontuador")

    // Streak badges
    if (maxStreak >= 5)  toAward.push("em_chamas")
    if (maxStreak >= 10) toAward.push("combo_mestre")

    // Survivor: answered all 145 questions without losing a life
    if (questionsAnswered >= 145 && gameSession.livesRemaining > 0) toAward.push("sobrevivente")

    // Level-up badges
    if (prevLevel < 2 && newLevel >= 2) toAward.push("aprendiz")
    if (prevLevel < 3 && newLevel >= 3) toAward.push("conhecedor")
    if (prevLevel < 4 && newLevel >= 4) toAward.push("especialista")
    if (prevLevel < 5 && newLevel >= 5) toAward.push("mestre")

    // Filter already-owned, then award
    const newBadgeKeys = toAward.filter((k) => !ownedKeys.has(k))
    let newBadges: Array<{ icon: string; name: string; description: string }> = []

    if (newBadgeKeys.length > 0) {
      const badges = await prisma.badge.findMany({
        where: { key: { in: newBadgeKeys } },
      })
      if (badges.length > 0) {
        await prisma.userBadge.createMany({
          data: badges.map((b) => ({ guestId, badgeId: b.id })),
          skipDuplicates: true,
        })
        newBadges = badges.map((b) => ({
          icon: b.icon,
          name: b.name,
          description: b.description,
        }))
      }
    }
    // ─────────────────────────────────────────────────────────────

    // Fire-and-forget cleanup of sessions older than 3 days
    const threeDaysAgo = new Date(Date.now() - THREE_DAYS_MS)
    prisma.gameSession.deleteMany({
      where: { finishedAt: { lt: threeDaysAgo } },
    }).catch(() => {})

    const levelInfo = getLevelInfo(updatedGuest.totalScore)

    return NextResponse.json({
      roundScore,
      correctCount:      gameSession.correctCount,
      bestScore:         updatedGuest.bestScore,
      gamesPlayed:       updatedGuest.gamesPlayed,
      questionsAnswered,
      gameOver:          gameSession.livesRemaining === 0,
      totalScore:        updatedGuest.totalScore,
      level:             levelInfo.level,
      levelName:         levelInfo.name,
      levelIcon:         levelInfo.icon,
      leveledUp:         newLevel > prevLevel,
      progressPct:       levelInfo.progressPct,
      pointsToNext:      levelInfo.pointsToNext,
      newBadges,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }
    return NextResponse.json({ error: "Erro ao finalizar partida" }, { status: 500 })
  }
}
