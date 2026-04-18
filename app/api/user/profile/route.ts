import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { LEVEL_NAMES, LEVEL_THRESHOLDS, LEVEL_ICONS } from "@/lib/levels"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      userBadges: {
        include: { badge: true },
        orderBy: { earnedAt: "desc" },
      },
    },
  })
  if (!user) return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })

  const prevThreshold = LEVEL_THRESHOLDS[user.level - 1] ?? 0
  const nextThreshold = LEVEL_THRESHOLDS[user.level] ?? null
  const accuracy =
    user.gamesPlayed > 0
      ? Math.round((user.totalCorrect / (user.gamesPlayed * 10)) * 100)
      : 0

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    avatarId: user.avatarId,
    totalScore: user.totalScore,
    level: user.level,
    levelName: LEVEL_NAMES[user.level],
    levelIcon: LEVEL_ICONS[user.level],
    prevThreshold,
    nextThreshold,
    gamesPlayed: user.gamesPlayed,
    totalCorrect: user.totalCorrect,
    accuracy,
    badges: user.userBadges.map((ub) => ({
      key: ub.badge.key,
      name: ub.badge.name,
      description: ub.badge.description,
      icon: ub.badge.icon,
      earnedAt: ub.earnedAt,
    })),
  })
}
