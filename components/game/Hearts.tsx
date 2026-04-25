"use client"

import { motion, AnimatePresence } from "framer-motion"

interface HeartsProps {
  lives: number
}

export default function Hearts({ lives }: HeartsProps) {
  return (
    <div className="flex items-center gap-3" aria-label={`${lives} vidas restantes`}>
      {[0, 1, 2].map((i) => {
        const isAlive = i < lives
        return (
          <motion.div
            key={i}
            className="relative w-10 h-10 flex items-center justify-center"
            animate={isAlive ? { scale: 1 } : { scale: 0.85 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span
              className={`text-3xl select-none transition-opacity duration-300 ${
                isAlive ? "opacity-100" : "opacity-25"
              }`}
            >
              ❤️
            </span>
            <AnimatePresence>
              {!isAlive && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  <span className="text-red-700 font-black text-2xl leading-none">✕</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}
