const BASE_POINTS: Record<string, number> = {
  easy: 20,
  medium: 40,
  hard: 60,
}

// Based on time SPENT (not remaining). Timer is 60s.
// Spent ≤15s  = Remaining >45s → ×2.0
// Spent 15-30s = Remaining 30-45s → ×1.5
// Spent 30-45s = Remaining 15-30s → ×1.25
// Spent >45s  = Remaining <15s  → ×1.0
function getSpeedMultiplier(timeSpentMs: number): number {
  const seconds = timeSpentMs / 1000
  if (seconds <= 15) return 2.0
  if (seconds <= 30) return 1.5
  if (seconds <= 45) return 1.25
  return 1.0
}

export function calculatePoints(
  difficulty: string,
  isCorrect: boolean,
  timeSpentMs: number
): number {
  if (!isCorrect) return 0
  const base = BASE_POINTS[difficulty] ?? 20
  return Math.round(base * getSpeedMultiplier(timeSpentMs))
}
