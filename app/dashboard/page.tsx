import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { LEVEL_NAMES, LEVEL_ICONS, getLevelProgress } from "@/lib/levels"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      userBadges: {
        include: { badge: true },
        orderBy: { earnedAt: "desc" },
        take: 4,
      },
    },
  })
  if (!user) redirect("/login")

  const { nextThreshold, progress } = getLevelProgress(user.totalScore, user.level)

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-md p-6">
          <h1 className="text-2xl font-extrabold text-gray-800">
            Olá, {user.name}! 👋
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl">{LEVEL_ICONS[user.level]}</span>
            <span className="text-lg font-semibold text-blue-700">
              Nível {user.level} — {LEVEL_NAMES[user.level]}
            </span>
          </div>
          <div className="mt-3">
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

        {/* Play button */}
        <Link
          href="/play"
          className="flex items-center justify-center gap-3 w-full bg-blue-700 text-white py-5 rounded-3xl text-2xl font-extrabold hover:bg-blue-800 active:scale-95 transition shadow-lg"
        >
          🎮 Jogar Agora!
        </Link>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/ranking"
            className="bg-white rounded-2xl shadow-md p-5 text-center hover:shadow-lg active:scale-95 transition"
          >
            <div className="text-4xl mb-2">🏆</div>
            <div className="font-bold text-gray-700 text-lg">Ranking</div>
          </Link>
          <Link
            href="/profile"
            className="bg-white rounded-2xl shadow-md p-5 text-center hover:shadow-lg active:scale-95 transition"
          >
            <div className="text-4xl mb-2">👤</div>
            <div className="font-bold text-gray-700 text-lg">Perfil</div>
          </Link>
        </div>

        {/* Recent badges */}
        {user.userBadges.length > 0 && (
          <div className="bg-white rounded-3xl shadow-md p-6">
            <h2 className="text-xl font-extrabold text-gray-800 mb-4">Conquistas Recentes</h2>
            <div className="flex gap-4 flex-wrap">
              {user.userBadges.map((ub) => (
                <div key={ub.badgeId} className="text-center" title={ub.badge.description}>
                  <div className="text-4xl">{ub.badge.icon}</div>
                  <div className="text-xs font-semibold text-gray-600 mt-1 max-w-[60px]">
                    {ub.badge.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
              <div className="text-3xl font-extrabold text-blue-700">
                {user.gamesPlayed > 0
                  ? Math.round((user.totalCorrect / (user.gamesPlayed * 10)) * 100)
                  : 0}%
              </div>
              <div className="text-sm text-gray-500 mt-1">Acertos</div>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
