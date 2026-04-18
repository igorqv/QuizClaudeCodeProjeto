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

async function main() {
  console.log("🌱 Iniciando seed...")

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
