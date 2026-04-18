"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error ?? "Erro ao criar conta")
      setLoading(false)
      return
    }

    const result = await signIn("credentials", { email, password, redirect: false })
    if (result?.error) {
      setError("Conta criada, mas não foi possível entrar automaticamente. Faça login.")
      setLoading(false)
      router.push("/login")
      return
    }
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🧠</div>
          <h1 className="text-3xl font-extrabold text-blue-800">QuizBrasil</h1>
          <p className="text-gray-500 mt-1">Crie sua conta gratuita</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-blue-500"
              placeholder="Seu nome"
              required
              minLength={2}
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-blue-500"
              placeholder="seu@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:outline-none focus:border-blue-500"
              placeholder="Mínimo 8 caracteres"
              required
              minLength={8}
            />
          </div>

          {error && <p className="text-red-600 text-center font-semibold">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 text-white py-4 rounded-2xl text-xl font-bold hover:bg-blue-800 transition disabled:opacity-50 mt-2"
          >
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-6 text-lg">
          Já tem conta?{" "}
          <Link href="/login" className="text-blue-600 font-bold hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  )
}
