"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface Top3Entry {
  name: string
  bestScore: number
}

interface HomeFormProps {
  top3: Top3Entry[]
}

const MEDALS = ["🥇", "🥈", "🥉"]

export default function HomeForm({ top3 }: HomeFormProps) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Pre-fill from cookies for returning players
  useEffect(() => {
    const raw = document.cookie.split("; ")
    const savedName = raw.find((c) => c.startsWith("guest_name="))?.split("=")[1]
    const savedEmail = raw.find((c) => c.startsWith("guest_email="))?.split("=")[1]
    if (savedName) setName(decodeURIComponent(savedName))
    if (savedEmail) setEmail(decodeURIComponent(savedEmail))
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!name.trim()) {
      setError("Nome é obrigatório")
      return
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("E-mail inválido")
      return
    }

    setLoading(true)
    document.cookie = `guest_name=${encodeURIComponent(name)}; path=/; max-age=${7 * 24 * 60 * 60}`
    document.cookie = `guest_email=${encodeURIComponent(email)}; path=/; max-age=${7 * 24 * 60 * 60}`
    router.push("/play")
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 px-4 py-10">
      <div className="w-full max-w-md flex flex-col gap-6">

        {/* Header */}
        <div className="text-center">
          <motion.div
            className="text-7xl mb-3"
            animate={{ rotate: [0, -8, 8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            🧠
          </motion.div>
          <h1 className="text-5xl font-black text-white tracking-tight">Curiosamente</h1>
          <p className="text-blue-300 mt-2 text-base">
            145 perguntas · 12 temas
          </p>
        </div>

        {/* Top 3 */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl px-5 py-4 border border-white/20">
          <div className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3 text-center">
            🏆 Melhores Jogadores
          </div>
          {top3.length === 0 ? (
            <p className="text-center text-blue-300 py-2 text-sm">
              Seja o primeiro campeão!
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {top3.map((player, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-2xl w-8 text-center">{MEDALS[i]}</span>
                  <span className="flex-1 text-white font-semibold truncate">
                    {player.name}
                  </span>
                  <span className="text-amber-300 font-extrabold text-lg tabular-nums">
                    {player.bestScore.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-blue-400 text-xs">pts</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">
              Nome
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-lg font-semibold text-gray-800 focus:outline-none focus:border-blue-500 transition-colors bg-gray-50"
              placeholder="Seu nome"
              autoComplete="given-name"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-100 rounded-xl px-4 py-3 text-lg font-semibold text-gray-800 focus:outline-none focus:border-blue-500 transition-colors bg-gray-50"
              placeholder="seu@email.com"
              autoComplete="email"
            />
          </div>

          {error && (
            <p className="text-red-500 text-center font-semibold text-sm">
              {error}
            </p>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white py-5 rounded-2xl text-2xl font-black shadow-lg disabled:opacity-60 tracking-wide mt-1"
            style={{ boxShadow: "0 8px 32px rgba(245,158,11,0.4)" }}
          >
            {loading ? "Carregando..." : "🎮 JOGAR AGORA"}
          </motion.button>
        </form>

      </div>
    </main>
  )
}
