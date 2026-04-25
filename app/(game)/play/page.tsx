"use client"

import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import QuestionCard, { AnswerState } from "@/components/game/QuestionCard"
import ResultScreen from "@/components/game/ResultScreen"
import Hearts from "@/components/game/Hearts"
import DifficultyTransition from "@/components/game/DifficultyTransition"

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
  questionsAnswered: number
  gameOver: boolean
  totalScore: number
  level: number
  levelName: string
  levelIcon: string
  leveledUp: boolean
  progressPct: number
  pointsToNext: number | null
  newBadges: Array<{ icon: string; name: string; description: string }>
}

type Phase = "loading" | "playing" | "feedback" | "difficulty-transition" | "result" | "error"

interface GameState {
  phase: Phase
  sessionId: string | null
  guestId: string | null
  questions: Question[]
  currentIdx: number
  roundScore: number
  lives: number
  streak: number
  answerStates: AnswerState[]
  feedbackText: string
  feedbackIsWrong: boolean
  explanation: string
  transitionFromDifficulty: string | null
  transitionToDifficulty: string | null
  finishResult: FinishResult | null
  errorMsg: string
}

type Action =
  | { type: "GAME_STARTED"; sessionId: string; guestId: string; questions: Question[] }
  | { type: "ANSWER_SUBMITTED" }
  | {
      type: "ANSWER_RECEIVED"
      answerStates: AnswerState[]
      pointsEarned: number
      feedbackText: string
      feedbackIsWrong: boolean
      livesRemaining: number
      explanation: string
      streak: number
    }
  | { type: "NEXT_QUESTION" }
  | { type: "SHOW_TRANSITION"; fromDifficulty: string; toDifficulty: string }
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
  lives: 3,
  streak: 0,
  answerStates: ["idle", "idle", "idle", "idle"],
  feedbackText: "",
  feedbackIsWrong: false,
  explanation: "",
  transitionFromDifficulty: null,
  transitionToDifficulty: null,
  finishResult: null,
  errorMsg: "",
}

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "GAME_STARTED":
      return {
        ...initial,
        phase: "playing",
        sessionId: action.sessionId,
        guestId: action.guestId,
        questions: action.questions,
      }
    case "ANSWER_SUBMITTED":
      return { ...state, phase: "feedback" }
    case "ANSWER_RECEIVED":
      return {
        ...state,
        answerStates: action.answerStates,
        roundScore: state.roundScore + action.pointsEarned,
        feedbackText: action.feedbackText,
        feedbackIsWrong: action.feedbackIsWrong,
        lives: action.livesRemaining,
        streak: action.streak,
        explanation: action.explanation,
      }
    case "SHOW_TRANSITION":
      return {
        ...state,
        phase: "difficulty-transition",
        transitionFromDifficulty: action.fromDifficulty,
        transitionToDifficulty: action.toDifficulty,
      }
    case "NEXT_QUESTION":
      return {
        ...state,
        phase: "playing",
        currentIdx: state.currentIdx + 1,
        answerStates: ["idle", "idle", "idle", "idle"],
        feedbackText: "",
        feedbackIsWrong: false,
        explanation: "",
        transitionFromDifficulty: null,
        transitionToDifficulty: null,
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
  const advanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingAdvanceFnRef = useRef<(() => Promise<void>) | null>(null)

  useEffect(() => {
    if (countdown === null || countdown <= 0) return
    const id = setTimeout(() => setCountdown((c) => (c !== null ? c - 1 : null)), 1000)
    return () => clearTimeout(id)
  }, [countdown])

  useEffect(() => {
    if (state.phase === "playing") {
      setCountdown(null)
      pendingAdvanceFnRef.current = null
    }
  }, [state.phase])

  useEffect(() => {
    startGame()
  }, [])

  async function startGame() {
    dispatch({ type: "RESET" })
    answeredRef.current = false
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current)
      advanceTimeoutRef.current = null
    }
    pendingAdvanceFnRef.current = null

    try {
      const guestNameCookie  = document.cookie.split("; ").find((c) => c.startsWith("guest_name="))?.split("=")[1]  || ""
      const guestEmailCookie = document.cookie.split("; ").find((c) => c.startsWith("guest_email="))?.split("=")[1] || ""

      if (!guestNameCookie || !guestEmailCookie) {
        router.push("/")
        return
      }

      const res = await fetch("/api/game/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName:  decodeURIComponent(guestNameCookie),
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

  function handleSkip() {
    if (advanceTimeoutRef.current) {
      clearTimeout(advanceTimeoutRef.current)
      advanceTimeoutRef.current = null
    }
    setCountdown(null)
    const fn = pendingAdvanceFnRef.current
    pendingAdvanceFnRef.current = null
    if (fn) fn()
  }

  function handleContinueFromTransition() {
    dispatch({ type: "NEXT_QUESTION" })
    answeredRef.current = false
  }

  const handleAnswer = useCallback(
    async (chosenAnswer: string, optionIndex: number, expired = false) => {
      if (answeredRef.current || !state.sessionId || !state.guestId) return
      answeredRef.current = true
      dispatch({ type: "ANSWER_SUBMITTED" })

      const capturedSessionId = state.sessionId
      const capturedGuestId   = state.guestId
      const capturedIdx       = state.currentIdx
      const capturedTotal     = state.questions.length
      const capturedOptions   = state.questions[state.currentIdx].options
      const capturedQuestionId = state.questions[state.currentIdx].id
      const capturedQuestions = state.questions

      async function finishGame() {
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

      async function advance() {
        const isLastQuestion = capturedIdx + 1 >= capturedTotal
        if (isLastQuestion) {
          await finishGame()
          return
        }
        // Check for difficulty transition
        const currentDiff = capturedQuestions[capturedIdx].difficulty
        const nextDiff     = capturedQuestions[capturedIdx + 1].difficulty
        if (currentDiff !== nextDiff) {
          dispatch({ type: "SHOW_TRANSITION", fromDifficulty: currentDiff, toDifficulty: nextDiff })
        } else {
          dispatch({ type: "NEXT_QUESTION" })
          answeredRef.current = false
        }
      }

      try {
        const res = await fetch("/api/game/answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId:    capturedSessionId,
            guestId:      capturedGuestId,
            questionId:   capturedQuestionId,
            chosenAnswer: expired ? "" : chosenAnswer,
          }),
        })
        const data = await res.json()

        const newStates: AnswerState[] = capturedOptions.map((opt, i) => {
          if (opt === data.correctAnswer) return "correct"
          if (!expired && i === optionIndex) return "wrong"
          return "idle"
        })

        const isWrong  = !data.isCorrect
        const gameOver: boolean = data.gameOver ?? false
        const streak: number   = data.streak   ?? 0

        // Build feedback text
        let feedbackText: string
        if (expired) {
          feedbackText = `⏰ Tempo esgotado! Resposta: ${data.correctAnswer}`
        } else if (data.isCorrect) {
          const comboMsg = streak >= 3 ? ` 🔥 ${streak} em sequência!` : ""
          feedbackText = `✅ Correto! +${data.pointsEarned} pts${comboMsg}`
        } else {
          feedbackText = `❌ Errado. Resposta: ${data.correctAnswer}`
        }

        dispatch({
          type: "ANSWER_RECEIVED",
          answerStates: newStates,
          pointsEarned:    data.pointsEarned   ?? 0,
          feedbackText,
          feedbackIsWrong: isWrong,
          livesRemaining:  data.livesRemaining ?? 3,
          explanation:     (isWrong || expired) ? (data.explanation ?? "") : "",
          streak,
        })

        if (gameOver) {
          pendingAdvanceFnRef.current = finishGame
          advanceTimeoutRef.current = setTimeout(finishGame, 3000)
        } else if (isWrong || expired) {
          setCountdown(20)
          pendingAdvanceFnRef.current = advance
          advanceTimeoutRef.current = setTimeout(advance, 20000)
        } else {
          pendingAdvanceFnRef.current = advance
          advanceTimeoutRef.current = setTimeout(advance, 2000)
        }
      } catch {
        advanceTimeoutRef.current = setTimeout(() => {
          dispatch({ type: "NEXT_QUESTION" })
          answeredRef.current = false
        }, 500)
      }
    },
    [state.sessionId, state.guestId, state.currentIdx, state.questions]
  )

  const handleTimerExpire = useCallback(() => {
    handleAnswer("", 0, true)
  }, [handleAnswer])

  // ── Render phases ────────────────────────────────────────────────

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

  if (state.phase === "difficulty-transition" && state.transitionToDifficulty) {
    return (
      <DifficultyTransition
        fromDifficulty={state.transitionFromDifficulty ?? "easy"}
        toDifficulty={state.transitionToDifficulty}
        onContinue={handleContinueFromTransition}
      />
    )
  }

  if (state.phase === "result" && state.finishResult) {
    return (
      <ResultScreen
        roundScore={state.finishResult.roundScore}
        correctCount={state.finishResult.correctCount}
        bestScore={state.finishResult.bestScore}
        gamesPlayed={state.finishResult.gamesPlayed}
        questionsAnswered={state.finishResult.questionsAnswered}
        gameOver={state.finishResult.gameOver}
        totalScore={state.finishResult.totalScore}
        levelName={state.finishResult.levelName}
        levelIcon={state.finishResult.levelIcon}
        leveledUp={state.finishResult.leveledUp}
        progressPct={state.finishResult.progressPct}
        pointsToNext={state.finishResult.pointsToNext}
        newBadges={state.finishResult.newBadges}
      />
    )
  }

  const question = state.questions[state.currentIdx]
  const showSkipButton = state.phase === "feedback" && state.feedbackIsWrong && state.lives > 0

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-6">
      <div className="max-w-lg mx-auto space-y-4">

        {/* Lives + streak bar */}
        <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm px-5 py-3">
          <span className="text-sm font-bold text-gray-500">Vidas</span>
          <Hearts lives={state.lives} />
          <AnimatePresence>
            {state.streak >= 2 && (
              <motion.div
                key="streak"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center gap-1 bg-orange-100 border border-orange-200 px-3 py-1 rounded-full"
              >
                <span className="text-orange-600 font-black text-sm">🔥 {state.streak}x</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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

        {/* Feedback */}
        <AnimatePresence>
          {state.phase === "feedback" && state.feedbackText && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`text-lg font-bold py-3 px-4 rounded-2xl ${
                state.feedbackText.startsWith("✅")
                  ? "bg-green-100 text-green-700"
                  : state.feedbackText.startsWith("⏰")
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <div className="text-center">{state.feedbackText}</div>

              {/* Explanation for wrong/expired answers */}
              {state.explanation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.25, delay: 0.1 }}
                  className="mt-2 text-sm font-normal bg-white/60 rounded-xl p-3 text-gray-700 text-left"
                >
                  📖 {state.explanation}
                </motion.div>
              )}

              {state.lives === 0 && (
                <div className="text-center text-sm font-semibold mt-2 opacity-80">
                  💔 Suas vidas acabaram!
                </div>
              )}
              {countdown !== null && countdown > 0 && state.lives > 0 && (
                <div className="text-center text-sm font-semibold mt-1 opacity-70">
                  Próxima pergunta em {countdown}s
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip button */}
        <AnimatePresence>
          {showSkipButton && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              onClick={handleSkip}
              className="w-full bg-blue-700 text-white py-4 rounded-2xl text-lg font-bold hover:bg-blue-800 active:scale-95 transition shadow"
            >
              Próxima Pergunta →
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </main>
  )
}
