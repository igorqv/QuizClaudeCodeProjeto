"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
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

    // Save cookies
    document.cookie = `guest_name=${encodeURIComponent(name)}; path=/; max-age=${7 * 24 * 60 * 60}`
    document.cookie = `guest_email=${encodeURIComponent(email)}; path=/; max-age=${7 * 24 * 60 * 60}`

    setLoading(false)
    router.push("/play")
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="text-center max-w-lg w-full">
        <div className="text-7xl mb-4">🧠</div>
        <h1 className="text-5xl font-extrabold text-blue-800 mb-3">QuizBrasil</h1>
        <p className="text-xl text-gray-600 mb-10">
          Teste seus conhecimentos sobre o Brasil e o mundo!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Nome *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-blue-500"
              placeholder="Seu nome"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              E-mail *
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-blue-500"
              placeholder="seu@email.com"
              required
            />
          </div>

          {error && <p className="text-red-600 text-center font-semibold text-lg">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 text-white py-4 rounded-2xl text-xl font-bold hover:bg-blue-800 transition disabled:opacity-50 mt-2"
          >
            {loading ? "Carregando..." : "🎮 Jogar Agora"}
          </button>
        </form>

        <p className="text-gray-500 mt-6 text-sm">
          Seus dados são salvos por 7 dias para acessar o ranking
        </p>
      </div>
    </main>
  )
}
