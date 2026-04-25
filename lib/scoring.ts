const BASE_POINTS: Record<string, number> = {
  easy: 20,
  medium: 40,
  hard: 60,
}

function getSpeedMultiplier(timeSpentMs: number): number {
  const seconds = timeSpentMs / 1000
  if (seconds <= 15) return 2.0
  if (seconds <= 30) return 1.5
  if (seconds <= 45) return 1.25
  return 1.0
}

// streak = consecutive correct answers including the current one
// streak < 3  → ×1.0 (no bonus)
// streak 3–4  → ×1.25
// streak 5–9  → ×1.5
// streak 10+  → ×2.0
export function getComboMultiplier(streak: number): number {
  if (streak >= 10) return 2.0
  if (streak >= 5) return 1.5
  if (streak >= 3) return 1.25
  return 1.0
}

export function calculatePoints(
  difficulty: string,
  isCorrect: boolean,
  timeSpentMs: number,
  streak = 0
): number {
  if (!isCorrect) return 0
  const base = BASE_POINTS[difficulty] ?? 20
  return Math.round(base * getSpeedMultiplier(timeSpentMs) * getComboMultiplier(streak))
}
