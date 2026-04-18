import { getServerSession } from "next-auth"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { LEVEL_NAMES, LEVEL_ICONS } from "@/lib/levels"

export default async function RankingPage() {
  const [session, top10] = await Promise.all([
    getServerSession(authOptions),
    prisma.user.findMany({
      orderBy: { totalScore: "desc" },
      take: 10,
      select: { id: true, name: true, level: true, totalScore: true },
    }),
  ])

  const ranking = top10.map((u, i) => ({
    position: i + 1,
    id: u.id,
    name: u.name,
    level: u.level,
    levelName: LEVEL_NAMES[u.level],
    levelIcon: LEVEL_ICONS[u.level],
    totalScore: u.totalScore,
  }))

  let userPosition: {
    position: number
    id: string
    name: string
    level: number
    levelName: string
    levelIcon: string
    totalScore: number
  } | null = null

  if (session?.user?.id) {
    const userId = session.user.id
    const inTop10 = ranking.find((r) => r.id === userId)
    if (!inTop10) {
      const me = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, level: true, totalScore: true },
      })
      if (me) {
        const ahead = await prisma.user.count({ where: { totalScore: { gt: me.totalScore } } })
        userPosition = {
          position: ahead + 1,
          ...me,
          levelName: LEVEL_NAMES[me.level],
          levelIcon: LEVEL_ICONS[me.level],
        }
      }
    }
  }

  const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-5">

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-gray-800">🏆 Ranking</h1>
          {session && (
            <Link href="/dashboard" className="text-blue-600 hover:underline text-sm font-semibold">
              ← Dashboard
            </Link>
          )}
        </div>

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          {ranking.map((entry) => {
            const isMe = session?.user?.id === entry.id
            return (
              <div
                key={entry.id}
                className={`flex items-center gap-4 px-5 py-4 border-b last:border-0 border-gray-100 ${
                  isMe ? "bg-blue-50" : ""
                }`}
              >
                <div className="w-8 text-center text-xl font-extrabold text-gray-400">
                  {MEDALS[entry.position] ?? `#${entry.position}`}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-800 flex items-center gap-1">
                    {entry.name}
                    {isMe && (
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full ml-1">
                        você
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {entry.levelIcon} {entry.levelName}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-blue-700 text-lg">{entry.totalScore}</div>
                  <div className="text-xs text-gray-400">pts</div>
                </div>
              </div>
            )
          })}
        </div>

        {userPosition && (
          <div className="bg-blue-700 text-white rounded-3xl p-5 flex items-center gap-4">
            <div className="text-2xl font-extrabold">#{userPosition.position}</div>
            <div className="flex-1">
              <div className="font-bold">{userPosition.name}</div>
              <div className="text-blue-200 text-sm">
                {userPosition.levelIcon} {userPosition.levelName}
              </div>
            </div>
            <div className="text-right">
              <div className="font-extrabold text-xl">{userPosition.totalScore}</div>
              <div className="text-blue-200 text-xs">pts</div>
            </div>
          </div>
        )}

      </div>
    </main>
  )
}
