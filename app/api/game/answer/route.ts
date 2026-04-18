import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { z, ZodError } from "zod"
import { prisma } from "@/lib/prisma"
import { calculatePoints } from "@/lib/scoring"

const answerSchema = z.object({
  sessionId: z.string().cuid(),
  guestId: z.string().cuid(),
  questionId: z.string().cuid(),
  chosenAnswer: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, guestId, questionId, chosenAnswer } = answerSchema.parse(body)

    const gameSession = await prisma.gameSession.findUnique({
      where: { id: sessionId },
      include: {
        answers: {
          select: { questionId: true, answeredAt: true },
          orderBy: { answeredAt: "desc" },
        },
      },
    })

    if (!gameSession || gameSession.guestId !== guestId) {
      return NextResponse.json({ error: "Sessão inválida" }, { status: 404 })
    }
    if (gameSession.status !== "in_progress") {
      return NextResponse.json({ error: "Sessão já finalizada" }, { status: 400 })
    }
    if (gameSession.answers.some((a) => a.questionId === questionId)) {
      return NextResponse.json({ error: "Pergunta já respondida" }, { status: 400 })
    }

    const question = await prisma.question.findUnique({ where: { id: questionId } })
    if (!question) {
      return NextResponse.json({ error: "Pergunta não encontrada" }, { status: 404 })
    }

    const lastAnswer = gameSession.answers[0]
    const questionStartTime = lastAnswer?.answeredAt ?? gameSession.startedAt
    const serverTimeSpentMs = Math.min(Date.now() - questionStartTime.getTime(), 65000)

    const isCorrect = chosenAnswer === question.correctAnswer
    const pointsEarned = calculatePoints(question.difficulty, isCorrect, serverTimeSpentMs)

    await prisma.sessionAnswer.create({
      data: {
        sessionId,
        questionId,
        chosenAnswer,
        isCorrect,
        timeSpentMs: serverTimeSpentMs,
        pointsEarned,
      },
    })

    await prisma.gameSession.update({
      where: { id: sessionId },
      data: {
        score: { increment: pointsEarned },
        correctCount: { increment: isCorrect ? 1 : 0 },
      },
    })

    return NextResponse.json({
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      pointsEarned,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }
    return NextResponse.json({ error: "Erro ao processar resposta" }, { status: 500 })
  }
}
