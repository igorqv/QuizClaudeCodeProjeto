import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { LEVEL_NAMES, LEVEL_ICONS, getLevelProgress } from "@/lib/levels"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      userBadges: { include: { badge: true }, orderBy: { earnedAt: "asc" } },
    },
  })
  if (!user) redirect("/login")

  const sessions = await prisma.gameSession.findMany({
    where: { userId: user.id, status: "completed" },
    orderBy: { finishedAt: "desc" },
    take: 10,
  })

  const { nextThreshold, progress } = getLevelProgress(user.totalScore, user.level)
  const accuracy =
    user.gamesPlayed > 0
      ? Math.round((user.totalCorrect / (user.gamesPlayed * 10)) * 100)
      : 0

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-5">

        <div className="flex items-center gap-3 mb-2">
          <Link href="/dashboard" className="text-blue-600 hover:underline text-sm font-semibold">
            ← Dashboard
          </Link>
        </div>

        {/* Profile header */}
        <div className="bg-white rounded-3xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="text-6xl">
              {user.avatarId ? `avatar-${user.avatarId}` : "🧑"}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-800">{user.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl">{LEVEL_ICONS[user.level]}</span>
                <span className="text-base font-semibold text-blue-700">
                  Nível {user.level} — {LEVEL_NAMES[user.level]}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>{user.totalScore} pts</span>
              {user.level < 5 && <span>próximo: {nextThreshold} pts</span>}
            </div>
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-3xl shadow-md p-6">
          <h2 className="text-xl font-extrabold text-gray-800 mb-4">Estatísticas</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-extrabold text-blue-700">{user.totalScore}</div>
              <div className="text-sm text-gray-500 mt-1">Pontos</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-blue-700">{user.gamesPlayed}</div>
              <div className="text-sm text-gray-500 mt-1">Rodadas</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-blue-700">{accuracy}%</div>
              <div className="text-sm text-gray-500 mt-1">Acertos</div>
            </div>
          </div>
        </div>

        {/* Badges */}
        {user.userBadges.length > 0 && (
          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-xl font-extrabold text-gray-800 mb-4">
              Conquistas ({user.userBadges.length})
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {user.userBadges.map((ub) => (
                <div key={ub.badgeId} className="text-center" title={ub.badge.description}>
                  <div className="text-4xl">{ub.badge.icon}</div>
                  <div className="text-xs font-semibold text-gray-600 mt-1">{ub.badge.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        {sessions.length > 0 && (
          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-xl font-extrabold text-gray-800 mb-4">Últimas Rodadas</h2>
            <div className="space-y-3">
              {sessions.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between py-2 border-b last:border-0 border-gray-100"
                >
                  <div className="text-sm text-gray-500">
                    {s.finishedAt
                      ? new Date(s.finishedAt).toLocaleDateString("pt-BR")
                      : "—"}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{s.correctCount}/10 acertos</span>
                    <span className="font-extrabold text-blue-700">+{s.score} pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
