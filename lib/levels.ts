import { prisma } from "./prisma"

export const LEVEL_THRESHOLDS = [0, 500, 2000, 5000, 10000]
export const LEVEL_NAMES = ["", "Curioso", "Aprendiz", "Conhecedor", "Especialista", "Mestre"]
export const LEVEL_ICONS = ["", "🌱", "📚", "🎓", "🏆", "👑"]

export function getLevelFromScore(totalScore: number): number {
  let level = 1
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (totalScore >= LEVEL_THRESHOLDS[i]) level = i + 1
  }
  return Math.min(level, 5)
}

export function getLevelProgress(totalScore: number, level: number) {
  const prevThreshold = LEVEL_THRESHOLDS[level - 1] ?? 0
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? totalScore
  const range = nextThreshold - prevThreshold
  const progress = range > 0 ? Math.round(((totalScore - prevThreshold) / range) * 100) : 100
  return { prevThreshold, nextThreshold, progress }
}

export async function checkAndAwardBadges(
  userId: string,
  sessionId: string,
  updatedUser: { level: number; gamesPlayed: number }
): Promise<{ key: string; name: string; icon: string; description: string }[]> {
  const [session, existing, allBadges] = await Promise.all([
    prisma.gameSession.findUnique({
      where: { id: sessionId },
      include: { answers: { orderBy: { answeredAt: "asc" } } },
    }),
    prisma.userBadge.findMany({
      where: { userId },
      include: { badge: { select: { key: true } } },
    }),
    prisma.badge.findMany(),
  ])

  if (!session) return []

  const earned = new Set(existing.map((ub) => ub.badge.key))
  const byKey = Object.fromEntries(allBadges.map((b) => [b.key, b]))

  const toAward: string[] = []

  if (!earned.has("first_answer") && session.answers.some((a) => a.isCorrect)) {
    toAward.push("first_answer")
  }

  if (!earned.has("first_quiz") && updatedUser.gamesPlayed === 1) {
    toAward.push("first_quiz")
  }

  if (!earned.has("perfect_game") && session.correctCount === 10) {
    toAward.push("perfect_game")
  }

  if (!earned.has("on_fire")) {
    let streak = 0
    for (const answer of session.answers) {
      streak = answer.isCorrect ? streak + 1 : 0
      if (streak >= 5) {
        toAward.push("on_fire")
        break
      }
    }
  }

  if (!earned.has("lightning")) {
    const fast = session.answers.filter((a) => a.isCorrect && a.timeSpentMs < 10000)
    if (fast.length >= 3) toAward.push("lightning")
  }

  const levelBadgeMap: Record<number, string> = { 2: "level_2", 3: "level_3", 4: "level_4", 5: "level_5" }
  const levelKey = levelBadgeMap[updatedUser.level]
  if (levelKey && !earned.has(levelKey)) toAward.push(levelKey)

  if (!earned.has("explorer") && updatedUser.gamesPlayed >= 10) toAward.push("explorer")
  if (!earned.has("veteran") && updatedUser.gamesPlayed >= 50) toAward.push("veteran")

  if (toAward.length === 0) return []

  await prisma.userBadge.createMany({
    data: toAward.map((key) => ({ userId, badgeId: byKey[key].id })),
    skipDuplicates: true,
  })

  return toAward.map((key) => ({
    key,
    name: byKey[key].name,
    icon: byKey[key].icon,
    description: byKey[key].description,
  }))
}
