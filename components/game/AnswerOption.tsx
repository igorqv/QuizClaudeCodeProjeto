"use client"

import { motion } from "framer-motion"

interface AnswerOptionProps {
  label: string
  text: string
  state: "idle" | "selected" | "correct" | "wrong"
  onClick: () => void
  disabled: boolean
}

const STATE_STYLES = {
  idle: "bg-white border-gray-200 text-gray-800",
  selected: "bg-blue-50 border-blue-500 text-blue-800",
  correct: "bg-green-50 border-green-500 text-green-800",
  wrong: "bg-red-50 border-red-500 text-red-700 line-through",
}

const STATE_ICON = {
  idle: null,
  selected: null,
  correct: "✅",
  wrong: "❌",
}

export default function AnswerOption({ label, text, state, onClick, disabled }: AnswerOptionProps) {
  const isIdle = state === "idle"

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={isIdle && !disabled ? { scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" } : {}}
      whileTap={isIdle && !disabled ? { scale: 0.97 } : {}}
      animate={
        state === "correct"
          ? { scale: [1, 1.04, 1], transition: { duration: 0.3 } }
          : state === "wrong"
          ? { x: [0, -6, 6, -4, 4, 0], transition: { duration: 0.35 } }
          : {}
      }
      className={`
        w-full flex items-center gap-3 border-2 rounded-2xl px-4 py-3 text-left
        min-h-[48px] transition-colors duration-200 font-semibold text-base
        ${STATE_STYLES[state]}
        disabled:cursor-default
      `}
    >
      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
        {label}
      </span>
      <span className="flex-1">{text}</span>
      {STATE_ICON[state] && (
        <span className="flex-shrink-0 text-xl">{STATE_ICON[state]}</span>
      )}
    </motion.button>
  )
}
