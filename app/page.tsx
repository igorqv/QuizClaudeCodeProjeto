import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { authOptions } from "@/lib/auth"

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  if (session) redirect("/dashboard")

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="text-center max-w-lg">
        <div className="text-7xl mb-4">🧠</div>
        <h1 className="text-5xl font-extrabold text-blue-800 mb-3">QuizBrasil</h1>
        <p className="text-xl text-gray-600 mb-10">
          Teste seus conhecimentos sobre o Brasil e o mundo!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="bg-blue-700 text-white px-10 py-4 rounded-2xl text-xl font-bold hover:bg-blue-800 transition shadow-lg"
          >
            🎮 Jogar Agora
          </Link>
          <Link
            href="/login"
            className="border-2 border-blue-700 text-blue-700 px-10 py-4 rounded-2xl text-xl font-bold hover:bg-blue-50 transition"
          >
            Entrar
          </Link>
        </div>
      </div>
    </main>
  )
}
