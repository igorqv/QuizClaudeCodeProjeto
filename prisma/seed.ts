import { PrismaClient } from "@prisma/client"
import { readFileSync } from "fs"
import { join } from "path"

const prisma = new PrismaClient()

interface QuestionData {
  number: number
  theme: string
  difficulty: string
  basePoints: number
  questionText: string
  correctAnswer: string
  wrongAnswer1: string
  wrongAnswer2: string
  wrongAnswer3: string
  explanation: string
}

const BADGES = [
  { key: "first_answer",  name: "Primeira Resposta", description: "Acertou a primeira pergunta",                  icon: "🎯" },
  { key: "first_quiz",    name: "Primeiro Quiz",      description: "Completou a primeira rodada",                  icon: "✅" },
  { key: "on_fire",       name: "Em Chamas",          description: "5 acertos consecutivos em uma rodada",         icon: "🔥" },
  { key: "lightning",     name: "Relâmpago",          description: "Respondeu 3 perguntas em menos de 10s cada",   icon: "⚡" },
  { key: "perfect_game",  name: "Nota 10",            description: "Acertou todas as 10 perguntas de uma rodada",  icon: "🌟" },
  { key: "level_2",       name: "Aprendiz",           description: "Alcançou o Nível 2",                           icon: "📚" },
  { key: "level_3",       name: "Conhecedor",         description: "Alcançou o Nível 3",                           icon: "🎓" },
  { key: "level_4",       name: "Especialista",       description: "Alcançou o Nível 4",                           icon: "🏆" },
  { key: "level_5",       name: "Mestre",             description: "Alcançou o Nível 5",                           icon: "👑" },
  { key: "explorer",      name: "Explorador",         description: "Completou 10 rodadas",                         icon: "🗺️" },
  { key: "veteran",       name: "Veterano",           description: "Completou 50 rodadas",                         icon: "🏅" },
]

async function main() {
  console.log("🌱 Iniciando seed...")

  // Seed badges
  for (const badge of BADGES) {
    await prisma.badge.upsert({
      where: { key: badge.key },
      update: badge,
      create: badge,
    })
  }
  console.log(`✅ ${BADGES.length} badges inseridos`)

  // Seed questions
  const raw = readFileSync(join(__dirname, "questions-data.json"), "utf-8")
  const questions: QuestionData[] = JSON.parse(raw)

  for (const q of questions) {
    await prisma.question.upsert({
      where: { number: q.number },
      update: q,
      create: q,
    })
  }
  console.log(`✅ ${questions.length} perguntas inseridas`)
  console.log("🎉 Seed concluído!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
