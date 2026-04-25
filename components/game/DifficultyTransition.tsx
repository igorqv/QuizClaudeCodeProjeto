"use client"

import { motion } from "framer-motion"

interface DifficultyTransitionProps {
  fromDifficulty: string
  toDifficulty: string
  onContinue: () => void
}

const DIFFICULTY_CONFIG: Record<string, { icon: string; name: string; textColor: string; bgColor: string; description: string }> = {
  easy:   { icon: "🟢", name: "Fácil",  textColor: "text-green-600",  bgColor: "bg-green-50",  description: "" },
  medium: { icon: "🟡", name: "Médio",  textColor: "text-yellow-600", bgColor: "bg-yellow-50", description: "As perguntas ficam um pouco mais difíceis!" },
  hard:   { icon: "🔴", name: "Difícil", textColor: "text-red-600",   bgColor: "bg-red-50",    description: "Chegou a hora das perguntas mais difíceis!" },
}

export default function DifficultyTransition({ fromDifficulty, toDifficulty, onContinue }: DifficultyTransitionProps) {
  const from = DIFFICULTY_CONFIG[fromDifficulty]
  const to   = DIFFICULTY_CONFIG[toDifficulty]

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <motion.div
        className="w-full max-w-sm text-center space-y-6"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        {/* Completed level */}
        <motion.div
          className="bg-white rounded-3xl shadow-md px-6 py-5"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="text-5xl mb-2">✅</div>
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Nível concluído</p>
          <p className="text-2xl font-black text-gray-800 mt-1">
            {from?.icon} {from?.name}
          </p>
        </motion.div>

        {/* Arrow */}
        <motion.div
          className="text-3xl text-gray-400"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          ↓
        </motion.div>

        {/* Next level */}
        <motion.div
          className={`rounded-3xl shadow-md px-6 py-5 ${to?.bgColor ?? "bg-white"}`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Próximo nível</p>
          <p className={`text-3xl font-black mt-1 ${to?.textColor ?? "text-gray-800"}`}>
            {to?.icon} {to?.name}
          </p>
          {to?.description && (
            <p className="text-gray-500 mt-2 text-base">{to.description}</p>
          )}
        </motion.div>

        {/* CTA */}
        <motion.button
          onClick={onContinue}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-blue-700 text-white py-5 rounded-2xl text-xl font-bold shadow-lg hover:bg-blue-800 transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Continuar →
        </motion.button>
      </motion.div>
    </main>
  )
}
