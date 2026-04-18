"use client"

import Link from "next/link"
import { motion } from "framer-motion"

interface NewBadge {
  key: string
  name: string
  icon: string
  description: string
}

interface ResultScreenProps {
  roundScore: number
  correctCount: number
  totalScore: number
  newLevel: number
  levelUp: boolean
  newBadges: NewBadge[]
  levelName: string
  levelIcon: string
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 260, damping: 18 } },
}

export default function ResultScreen({
  roundScore,
  correctCount,
  totalScore,
  newLevel,
  levelUp,
  newBadges,
  levelName,
  levelIcon,
}: ResultScreenProps) {
  const stars = correctCount >= 9 ? "⭐⭐⭐" : correctCount >= 6 ? "⭐⭐" : "⭐"

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8 flex flex-col items-center justify-center">
      <motion.div
        className="w-full max-w-md space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Score card */}
        <motion.div variants={cardVariants} className="bg-white rounded-3xl shadow-md p-6 text-center">
          <div className="text-5xl mb-2">{stars}</div>
          <h1 className="text-2xl font-extrabold text-gray-800 mb-1">Rodada Concluída!</h1>
          <p className="text-gray-500">{correctCount}/10 acertos</p>
          <motion.div
            className="mt-4 text-5xl font-extrabold text-blue-700"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            +{roundScore}
          </motion.div>
          <div className="text-sm text-gray-500 mt-1">pontos nessa rodada</div>
          <div className="mt-3 text-lg font-bold text-gray-700">
            Total: {totalScore} pts
          </div>
        </motion.div>

        {/* Level up */}
        {levelUp && (
          <motion.div
            variants={cardVariants}
            className="bg-yellow-50 border-2 border-yellow-400 rounded-3xl p-5 text-center"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <div className="text-4xl mb-1">{levelIcon}</div>
            <div className="text-xl font-extrabold text-yellow-700">
              Level Up! Nível {newLevel} — {levelName}
            </div>
          </motion.div>
        )}

        {/* Badges */}
        {newBadges.length > 0 && (
          <motion.div variants={cardVariants} className="bg-white rounded-3xl shadow-md p-5">
            <h2 className="text-lg font-extrabold text-gray-800 mb-3">
              Conquistas Desbloqueadas!
            </h2>
            <motion.div
              className="flex gap-4 flex-wrap"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {newBadges.map((b) => (
                <motion.div
                  key={b.key}
                  variants={badgeVariants}
                  className="text-center"
                  title={b.description}
                >
                  <div className="text-4xl">{b.icon}</div>
                  <div className="text-xs font-semibold text-gray-600 mt-1 max-w-[60px]">
                    {b.name}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div variants={cardVariants} className="grid grid-cols-2 gap-3">
          <Link
            href="/play"
            className="bg-blue-700 text-white py-4 rounded-2xl text-lg font-bold text-center hover:bg-blue-800 active:scale-95 transition shadow"
          >
            🎮 Jogar de Novo
          </Link>
          <Link
            href="/profile"
            className="bg-white border-2 border-blue-700 text-blue-700 py-4 rounded-2xl text-lg font-bold text-center hover:bg-blue-50 active:scale-95 transition"
          >
            👤 Perfil
          </Link>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Link
            href="/ranking"
            className="block w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-2xl text-lg font-bold text-center hover:border-blue-400 active:scale-95 transition"
          >
            🏆 Ver Ranking
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
