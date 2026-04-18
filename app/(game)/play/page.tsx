"use client"

import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import QuestionCard, { AnswerState } from "@/components/game/QuestionCard"
import ResultScreen from "@/components/game/ResultScreen"

interface Question {
  id: string
  theme: string
  difficulty: string
  questionText: string
  options: string[]
}

interface FinishResult {
  roundScore: number
  correctCount: number
  bestScore: number
  gamesPlayed: number
}

type Phase = "loading" | "playing" | "feedback" | "result" | "error"

interface GameState {
  phase: Phase
  sessionId: string | null
  guestId: string | null
  questions: Question[]
  currentIdx: number
  roundScore: number
  answerStates: AnswerState[]
  feedbackText: string
  finishResult: FinishResult | null
  errorMsg: string
}

type Action =
  | { type: "GAME_STARTED"; sessionId: string; guestId: string; questions: Question[] }
  | { type: "ANSWER_SUBMITTED" }
  | { type: "ANSWER_RECEIVED"; answerStates: AnswerState[]; pointsEarned: number; feedbackText: string }
  | { type: "NEXT_QUESTION" }
  | { type: "GAME_FINISHED"; finishResult: FinishResult }
  | { type: "ERROR"; errorMsg: string }
  | { type: "RESET" }

const initial: GameState = {
  phase: "loading",
  sessionId: null,
  guestId: null,
  questions: [],
  currentIdx: 0,
  roundScore: 0,
  answerStates: ["idle", "idle", "idle", "idle"],
  feedbackText: "",
  finishResult: null,
  errorMsg: "",
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "GAME_STARTED":
      return { ...initial, phase: "playing", sessionId: action.sessionId, guestId: action.guestId, questions: action.questions }
    case "ANSWER_SUBMITTED":
      return { ...state, phase: "feedback" }
    case "ANSWER_RECEIVED":
      return {
        ...state,
        answerStates: action.answerStates,
        roundScore: state.roundScore + action.pointsEarned,
        feedbackText: action.feedbackText,
      }
    case "NEXT_QUESTION":
      return {
        ...state,
        phase: "playing",
        currentIdx: state.currentIdx + 1,
        answerStates: ["idle", "idle", "idle", "idle"],
        feedbackText: "",
      }
    case "GAME_FINISHED":
      return { ...state, phase: "result", finishResult: action.finishResult }
    case "ERROR":
      return { ...state, phase: "error", errorMsg: action.errorMsg }
    case "RESET":
      return { ...initial }
  }
}

export default function PlayPage() {
  const router = useRouter()
  const [state, dispatch] = useReducer(reducer, initial)
  const [countdown, setCountdown] = useState<number | null>(null)
  const answeredRef = useRef(false)

  useEffect(() => {
    if (countdown === null || countdown <= 0) return
    const id = setTimeout(() => setCountdown((c) => (c !== null ? c - 1 : null)), 1000)
    return () => clearTimeout(id)
  }, [countdown])

  useEffect(() => {
    if (state.phase === "playing") setCountdown(null)
  }, [state.phase])

  useEffect(() => {
    startGame()
  }, [])

  async function startGame() {
    dispatch({ type: "RESET" })
    answeredRef.current = false
    try {
      const guestNameCookie = document.cookie.split("; ").find((c) => c.startsWith("guest_name="))?.split("=")[1] || ""
      const guestEmailCookie = document.cookie.split("; ").find((c) => c.startsWith("guest_email="))?.split("=")[1] || ""

      if (!guestNameCookie || !guestEmailCookie) {
        router.push("/")
        return
      }

      const res = await fetch("/api/game/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName: decodeURIComponent(guestNameCookie),
          guestEmail: decodeURIComponent(guestEmailCookie),
        }),
      })

      if (!res.ok) throw new Error("Falha ao iniciar")
      const data = await res.json()
      sessionStorage.setItem("guestId", data.guestId)
      dispatch({ type: "GAME_STARTED", sessionId: data.sessionId, guestId: data.guestId, questions: data.questions })
    } catch {
      dispatch({ type: "ERROR", errorMsg: "Não foi possível iniciar o jogo. Tente novamente." })
    }
  }

  const handleAnswer = useCallback(
    async (chosenAnswer: string, optionIndex: number, expired = false) => {
      if (answeredRef.current || !state.sessionId || !state.guestId) return
      answeredRef.current = true
      dispatch({ type: "ANSWER_SUBMITTED" })

      const capturedSessionId = state.sessionId
      const capturedGuestId = state.guestId
      const capturedIdx = state.currentIdx
      const capturedTotal = state.questions.length
      const capturedOptions = state.questions[state.currentIdx].options
      const capturedQuestionId = state.questions[state.currentIdx].id

      async function advance() {
        const next = capturedIdx + 1
        if (next < capturedTotal) {
          dispatch({ type: "NEXT_QUESTION" })
          answeredRef.current = false
        } else {
          dispatch({ type: "RESET" })
          try {
            const res = await fetch("/api/game/finish", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sessionId: capturedSessionId, guestId: capturedGuestId }),
            })
            const data = await res.json()
            dispatch({ type: "GAME_FINISHED", finishResult: data })
          } catch {
            dispatch({ type: "ERROR", errorMsg: "Erro ao finalizar partida." })
          }
        }
      }

      try {
        const res = await fetch("/api/game/answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: capturedSessionId,
            guestId: capturedGuestId,
            questionId: capturedQuestionId,
            chosenAnswer: expired ? "" : chosenAnswer,
          }),
        })
        const data = await res.json()

        const newStates: AnswerState[] = capturedOptions.map((opt, i) => {
          if (opt === data.correctAnswer) return "correct"
          if (!expired && i === optionIndex) return "wrong"
          return "idle"
        })

        dispatch({
          type: "ANSWER_RECEIVED",
          answerStates: newStates,
          pointsEarned: data.pointsEarned ?? 0,
          feedbackText: expired
            ? `⏰ Tempo esgotado! Resposta: ${data.correctAnswer}`
            : data.isCorrect
            ? `✅ Correto! +${data.pointsEarned} pts`
            : `❌ Errado. Resposta: ${data.correctAnswer}`,
        })

        const isWrong = !data.isCorrect
        if (isWrong) setCountdown(30)
        setTimeout(() => advance(), isWrong ? 30000 : 2000)
      } catch {
        setTimeout(() => advance(), 500)
      }
    },
    [state.sessionId, state.guestId, state.currentIdx, state.questions]
  )

  const handleTimerExpire = useCallback(() => {
    handleAnswer("", 0, true)
  }, [handleAnswer])

  if (state.phase === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <motion.div
            className="text-5xl mb-4"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            🧠
          </motion.div>
          <p className="text-xl font-bold text-blue-700">Preparando perguntas...</p>
        </div>
      </main>
    )
  }

  if (state.phase === "error") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
        <motion.div
          className="text-center max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-5xl mb-4">😕</div>
          <p className="text-xl font-bold text-gray-800 mb-4">{state.errorMsg}</p>
          <button
            onClick={startGame}
            className="bg-blue-700 text-white px-8 py-3 rounded-2xl font-bold text-lg hover:bg-blue-800 transition"
          >
            Tentar Novamente
          </button>
        </motion.div>
      </main>
    )
  }

  if (state.phase === "result" && state.finishResult) {
    return (
      <ResultScreen
        roundScore={state.finishResult.roundScore}
        correctCount={state.finishResult.correctCount}
        bestScore={state.finishResult.bestScore}
        gamesPlayed={state.finishResult.gamesPlayed}
      />
    )
  }

  const question = state.questions[state.currentIdx]

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <div className="max-w-lg mx-auto space-y-4">
        <QuestionCard
          key={state.currentIdx}
          question={question}
          questionNumber={state.currentIdx + 1}
          total={state.questions.length}
          roundScore={state.roundScore}
          answerStates={state.answerStates}
          timerRunning={state.phase === "playing"}
          onAnswer={(opt, idx) => handleAnswer(opt, idx)}
          onTimerExpire={handleTimerExpire}
          answered={state.phase === "feedback"}
        />

        <AnimatePresence>
          {state.phase === "feedback" && state.feedbackText && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`text-center text-lg font-bold py-3 rounded-2xl ${
                state.feedbackText.startsWith("✅")
                  ? "bg-green-100 text-green-700"
                  : state.feedbackText.startsWith("⏰")
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <div>{state.feedbackText}</div>
              {countdown !== null && countdown > 0 && (
                <div className="text-sm font-semibold mt-1 opacity-70">
                  Próxima pergunta em {countdown}s
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
