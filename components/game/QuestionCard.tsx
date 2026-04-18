"use client"

import { motion } from "framer-motion"
import Timer from "./Timer"
import AnswerOption from "./AnswerOption"

const DIFFICULTY_ICON: Record<string, string> = {
  easy: "🟢",
  medium: "🟡",
  hard: "🔴",
}

const LABELS = ["A", "B", "C", "D"]

export type AnswerState = "idle" | "selected" | "correct" | "wrong"

interface Question {
  id: string
  theme: string
  difficulty: string
  questionText: string
  options: string[]
}

interface QuestionCardProps {
  question: Question
  questionNumber: number
  total: number
  roundScore: number
  answerStates: AnswerState[]
  timerRunning: boolean
  onAnswer: (option: string, index: number) => void
  onTimerExpire: () => void
  answered: boolean
}

export default function QuestionCard({
  question,
  questionNumber,
  total,
  roundScore,
  answerStates,
  timerRunning,
  onAnswer,
  onTimerExpire,
  answered,
}: QuestionCardProps) {
  return (
    <motion.div
      className="bg-white rounded-3xl shadow-md p-6 space-y-4"
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
            {questionNumber}/{total}
          </span>
          <span className="text-sm text-gray-500">
            {DIFFICULTY_ICON[question.difficulty]} {question.theme}
          </span>
        </div>
        <Timer duration={60} onExpire={onTimerExpire} running={timerRunning} />
      </div>

      <p className="text-lg font-bold text-gray-800 leading-snug">
        {question.questionText}
      </p>

      <div className="space-y-3">
        {question.options.map((opt, i) => (
          <AnswerOption
            key={i}
            label={LABELS[i]}
            text={opt}
            state={answerStates[i]}
            onClick={() => onAnswer(opt, i)}
            disabled={answered}
          />
        ))}
      </div>

      <div className="text-right text-sm text-gray-400 font-semibold">
        Pontos na rodada: <span className="text-blue-700 font-extrabold">{roundScore}</span>
      </div>
    </motion.div>
  )
}
