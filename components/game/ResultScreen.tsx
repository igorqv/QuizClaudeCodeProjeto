"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface Badge {
  icon: string
  name: string
  description: string
}

interface ResultScreenProps {
  roundScore: number
  correctCount: number
  bestScore: number
  gamesPlayed: number
  questionsAnswered: number
  gameOver: boolean
  totalScore: number
  levelName: string
  levelIcon: string
  leveledUp: boolean
  progressPct: number
  pointsToNext: number | null
  newBadges: Badge[]
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
}

export default function ResultScreen({
  roundScore,
  correctCount,
  bestScore,
  gamesPlayed,
  questionsAnswered,
  gameOver,
  totalScore,
  levelName,
  levelIcon,
  leveledUp,
  progressPct,
  pointsToNext,
  newBadges,
}: ResultScreenProps) {
  const accuracyPct = questionsAnswered > 0 ? correctCount / questionsAnswered : 0
  const stars = gameOver
    ? "💔"
    : accuracyPct >= 0.7 ? "⭐⭐⭐"
    : accuracyPct >= 0.5 ? "⭐⭐"
    : "⭐"

  const isBestScore = roundScore === bestScore && roundScore > 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8 flex flex-col items-center justify-center">
      <motion.div
        className="w-full max-w-md space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Level-up celebration */}
        <AnimatePresence>
          {leveledUp && (
            <motion.div
              variants={cardVariants}
              className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl p-5 text-center shadow-lg"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="text-4xl mb-1">🎉</div>
              <div className="text-white font-black text-xl">Subiu de nível!</div>
              <div className="text-white/90 text-lg font-bold mt-1">
                {levelIcon} {levelName}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Score card */}
        <motion.div variants={cardVariants} className="bg-white rounded-3xl shadow-md p-6 text-center">
          <div className="text-5xl mb-2">{stars}</div>
          <h1 className="text-2xl font-extrabold text-gray-800 mb-1">
            {gameOver ? "Suas Vidas Acabaram!" : "Quiz Concluído!"}
          </h1>
          <p className="text-gray-500">
            {correctCount}/{questionsAnswered} acertos
          </p>
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
            Melhor score: {bestScore} pts
          </div>
          <div className="text-sm text-gray-500 mt-0.5">
            {gamesPlayed} jogo{gamesPlayed !== 1 ? "s" : ""} jogado{gamesPlayed !== 1 ? "s" : ""}
          </div>
        </motion.div>

        {/* New best score */}
        {isBestScore && (
          <motion.div
            variants={cardVariants}
            className="bg-yellow-50 border-2 border-yellow-400 rounded-3xl p-4 text-center"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <div className="text-3xl mb-1">🏆</div>
            <div className="text-xl font-extrabold text-yellow-700">Novo Recorde!</div>
          </motion.div>
        )}

        {/* Completed all questions */}
        {!gameOver && questionsAnswered >= 145 && (
          <motion.div
            variants={cardVariants}
            className="bg-green-50 border-2 border-green-400 rounded-3xl p-4 text-center"
          >
            <div className="text-3xl mb-1">🎉</div>
            <div className="text-xl font-extrabold text-green-700">
              Respondeu todas as 145 perguntas!
            </div>
          </motion.div>
        )}

        {/* Level progress */}
        <motion.div variants={cardVariants} className="bg-white rounded-3xl shadow-md p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Seu nível</span>
              <div className="text-lg font-extrabold text-gray-800 mt-0.5">
                {levelIcon} {levelName}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Score total</span>
              <div className="text-lg font-extrabold text-blue-700 mt-0.5">
                {totalScore.toLocaleString("pt-BR")} pts
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
            />
          </div>

          {pointsToNext !== null ? (
            <p className="text-xs text-gray-400 mt-2 text-right">
              Faltam {pointsToNext.toLocaleString("pt-BR")} pts para o próximo nível
            </p>
          ) : (
            <p className="text-xs text-green-600 font-bold mt-2 text-center">
              👑 Nível máximo atingido!
            </p>
          )}
        </motion.div>

        {/* New badges */}
        {newBadges.length > 0 && (
          <motion.div variants={cardVariants} className="bg-white rounded-3xl shadow-md p-5">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
              🏅 Conquistas desbloqueadas
            </div>
            <div className="flex flex-col gap-2">
              {newBadges.map((badge, i) => (
                <motion.div
                  key={badge.name}
                  className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <span className="text-3xl">{badge.icon}</span>
                  <div>
                    <div className="font-extrabold text-gray-800">{badge.name}</div>
                    <div className="text-sm text-gray-500">{badge.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
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
            href="/"
            className="bg-white border-2 border-blue-700 text-blue-700 py-4 rounded-2xl text-lg font-bold text-center hover:bg-blue-50 active:scale-95 transition"
          >
            🏠 Home
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
