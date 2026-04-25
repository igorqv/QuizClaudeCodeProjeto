export interface LevelDef {
  level: number
  name: string
  icon: string
  minScore: number
}

export const LEVELS: LevelDef[] = [
  { level: 1, name: "Curioso",      icon: "🔍", minScore: 0 },
  { level: 2, name: "Aprendiz",     icon: "📚", minScore: 500 },
  { level: 3, name: "Conhecedor",   icon: "🎓", minScore: 2000 },
  { level: 4, name: "Especialista", icon: "🏆", minScore: 5000 },
  { level: 5, name: "Mestre",       icon: "👑", minScore: 10000 },
]

export interface LevelInfo extends LevelDef {
  nextLevel: LevelDef | null
  progressPct: number   // 0–100
  pointsToNext: number | null
}

export function getLevelInfo(totalScore: number): LevelInfo {
  let current = LEVELS[0]
  for (const l of LEVELS) {
    if (totalScore >= l.minScore) current = l
  }
  const nextIdx = LEVELS.findIndex((l) => l.level === current.level) + 1
  const next = nextIdx < LEVELS.length ? LEVELS[nextIdx] : null
  const progressPct = next
    ? Math.round(((totalScore - current.minScore) / (next.minScore - current.minScore)) * 100)
    : 100
  return {
    ...current,
    nextLevel: next,
    progressPct,
    pointsToNext: next ? next.minScore - totalScore : null,
  }
}

export const BADGE_DEFINITIONS = [
  { key: "primeiro_passo", name: "Primeiro Passo",    icon: "🎯", description: "Completou o primeiro jogo" },
  { key: "em_chamas",      name: "Em Chamas",          icon: "🔥", description: "5 acertos consecutivos em uma partida" },
  { key: "combo_mestre",   name: "Combo Mestre",       icon: "⚡", description: "10 acertos consecutivos em uma partida" },
  { key: "sobrevivente",   name: "Sobrevivente",       icon: "❤️", description: "Completou todas as 145 perguntas sem perder uma vida" },
  { key: "pontuador",      name: "Pontuador",          icon: "💯", description: "Marcou mais de 500 pontos em uma partida" },
  { key: "curioso_badge",  name: "Curioso",            icon: "🔍", description: "Jogou 5 partidas" },
  { key: "maratonista",    name: "Maratonista",        icon: "🏃", description: "Jogou 10 partidas" },
  { key: "aprendiz",       name: "Aprendiz",           icon: "📚", description: "Alcançou o nível Aprendiz (500 pts totais)" },
  { key: "conhecedor",     name: "Conhecedor",         icon: "🎓", description: "Alcançou o nível Conhecedor (2.000 pts totais)" },
  { key: "especialista",   name: "Especialista",       icon: "🏆", description: "Alcançou o nível Especialista (5.000 pts totais)" },
  { key: "mestre",         name: "Mestre",             icon: "👑", description: "Alcançou o nível Mestre (10.000 pts totais)" },
]
