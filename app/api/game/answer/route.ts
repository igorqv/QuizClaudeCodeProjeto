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
          select: { questionId: true, answeredAt: true, isCorrect: true },
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

    // Calculate streak: consecutive correct answers before this one (desc order)
    let prevStreak = 0
    for (const ans of gameSession.answers) {
      if (ans.isCorrect) prevStreak++
      else break
    }
    const newStreak = isCorrect ? prevStreak + 1 : 0

    const pointsEarned = calculatePoints(question.difficulty, isCorrect, serverTimeSpentMs, newStreak)

    const newLives = isCorrect
      ? gameSession.livesRemaining
      : Math.max(0, gameSession.livesRemaining - 1)
    const gameOver = !isCorrect && newLives === 0

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
        livesRemaining: newLives,
        ...(gameOver ? { status: "completed", finishedAt: new Date() } : {}),
      },
    })

    return NextResponse.json({
      isCorrect,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      pointsEarned,
      livesRemaining: newLives,
      gameOver,
      streak: newStreak,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 })
    }
    return NextResponse.json({ error: "Erro ao processar resposta" }, { status: 500 })
  }
}
