import Link from "next/link"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"
import { getLevelInfo } from "@/lib/levels"

const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000
const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" }

function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default async function RankingPage() {
  const cookieStore = await cookies()
  const rawEmail = cookieStore.get("guest_email")?.value
  const playerEmail = rawEmail ? decodeURIComponent(rawEmail) : null

  // Top 10 by bestScore (all-time)
  const top10 = await prisma.guestPlayer.findMany({
    select: {
      name: true,
      email: true,
      bestScore: true,
      totalScore: true,
    },
    orderBy: { bestScore: "desc" },
    take: 10,
  })

  const ranking = top10.map((g, i) => ({
    position: i + 1,
    name: g.name,
    bestScore: g.bestScore,
    levelInfo: getLevelInfo(g.totalScore),
    isMe: g.email === playerEmail,
  }))

  const inTop10 = ranking.some((r) => r.isMe)

  // Current player's data
  let myBestScore = 0
  let myTotalScore = 0
  let myRankPosition: number | null = null
  let myAccuracyPct: number | null = null
  let myGames: Array<{
    score: number
    correctCount: number
    livesRemaining: number
    finishedAt: Date
    questionsAnswered: number
  }> = []
  let myBadges: Array<{ icon: string; name: string }> = []

  if (playerEmail) {
    const me = await prisma.guestPlayer.findUnique({
      where: { email: playerEmail },
      select: {
        id: true,
        bestScore: true,
        totalScore: true,
        totalCorrect: true,
        totalAnswered: true,
        badges: {
          select: { badge: { select: { icon: true, name: true } } },
          orderBy: { earnedAt: "asc" },
        },
      },
    })

    if (me) {
      myBestScore = me.bestScore
      myTotalScore = me.totalScore
      myAccuracyPct =
        me.totalAnswered > 0 ? Math.round((me.totalCorrect / me.totalAnswered) * 100) : null
      myBadges = me.badges.map((ub) => ub.badge)

      const threeDaysAgo = new Date(Date.now() - THREE_DAYS_MS)
      const sessions = await prisma.gameSession.findMany({
        where: {
          guestId: me.id,
          status: "completed",
          finishedAt: { gte: threeDaysAgo },
        },
        orderBy: { score: "desc" },
        take: 3,
        select: {
          score: true,
          correctCount: true,
          livesRemaining: true,
          finishedAt: true,
          _count: { select: { answers: true } },
        },
      })

      myGames = sessions.map((s) => ({
        score: s.score,
        correctCount: s.correctCount,
        livesRemaining: s.livesRemaining,
        finishedAt: s.finishedAt!,
        questionsAnswered: s._count.answers,
      }))

      if (!inTop10) {
        const ahead = await prisma.guestPlayer.count({
          where: { bestScore: { gt: me.bestScore } },
        })
        myRankPosition = ahead + 1
      }
    }
  }

  const myLevelInfo = getLevelInfo(myTotalScore)

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-gray-800">🏆 Ranking</h1>
          <Link href="/" className="text-blue-600 hover:underline text-sm font-semibold">
            ← Home
          </Link>
        </div>

        {/* Top 10 */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Top 10 Global
          </h2>
          <div className="bg-white rounded-3xl shadow-md overflow-hidden">
            {ranking.length === 0 ? (
              <div className="px-5 py-10 text-center text-gray-400 text-lg">
                Ainda não há jogadores no ranking.
              </div>
            ) : (
              ranking.map((entry) => (
                <div
                  key={entry.position}
                  className={`flex items-center gap-4 px-5 py-4 border-b last:border-0 border-gray-100 ${
                    entry.isMe ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="w-8 text-center text-xl font-extrabold text-gray-400">
                    {MEDALS[entry.position] ?? `#${entry.position}`}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-800 truncate">{entry.name}</span>
                      {entry.isMe && (
                        <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full">
                          você
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {entry.levelInfo.icon} {entry.levelInfo.name}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-extrabold text-blue-700 text-lg">{entry.bestScore}</div>
                    <div className="text-xs text-gray-400">pts</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Player outside top 10 */}
        {myRankPosition && (
          <div className="bg-blue-700 text-white rounded-3xl p-5 flex items-center gap-4">
            <div className="text-2xl font-extrabold">#{myRankPosition}</div>
            <div className="flex-1">
              <div className="font-bold">Sua posição</div>
              <div className="text-blue-200 text-sm">Continue jogando para subir!</div>
            </div>
            <div className="text-right">
              <div className="font-extrabold text-xl">{myBestScore}</div>
              <div className="text-blue-200 text-xs">pts</div>
            </div>
          </div>
        )}

        {/* Player profile */}
        {playerEmail && (
          <>
            {/* Level + stats */}
            <div className="bg-white rounded-3xl shadow-md p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Seu nível
                  </div>
                  <div className="text-xl font-extrabold text-gray-800">
                    {myLevelInfo.icon} {myLevelInfo.name}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                    Score total
                  </div>
                  <div className="text-xl font-extrabold text-blue-700">
                    {myTotalScore.toLocaleString("pt-BR")} pts
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all"
                    style={{ width: `${myLevelInfo.progressPct}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1 text-right">
                  {myLevelInfo.pointsToNext !== null
                    ? `Faltam ${myLevelInfo.pointsToNext.toLocaleString("pt-BR")} pts para ${myLevelInfo.nextLevel?.icon} ${myLevelInfo.nextLevel?.name}`
                    : "👑 Nível máximo!"}
                </p>
              </div>

              {/* Accuracy */}
              {myAccuracyPct !== null && (
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="text-sm text-gray-500 font-semibold">Taxa de acerto</span>
                  <span className="font-extrabold text-lg text-gray-800">{myAccuracyPct}%</span>
                </div>
              )}
            </div>

            {/* Badges */}
            {myBadges.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Suas Conquistas
                </h2>
                <div className="grid grid-cols-4 gap-3">
                  {myBadges.map((badge) => (
                    <div
                      key={badge.name}
                      title={badge.name}
                      className="bg-white rounded-2xl shadow-sm p-3 flex flex-col items-center gap-1 text-center"
                    >
                      <span className="text-3xl">{badge.icon}</span>
                      <span className="text-xs font-bold text-gray-600 leading-tight">{badge.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top 3 recent games */}
            <div>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Melhores Jogadas{" "}
                <span className="normal-case font-normal">(últimos 3 dias)</span>
              </h2>
              {myGames.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-md px-5 py-8 text-center text-gray-400">
                  Nenhuma jogada nos últimos 3 dias.
                </div>
              ) : (
                <div className="space-y-3">
                  {myGames.map((game, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl shadow-sm px-5 py-4 flex items-center gap-4"
                    >
                      <div className="text-2xl">{MEDALS[i + 1]}</div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-800 text-lg">
                          {game.score}{" "}
                          <span className="text-sm font-normal text-gray-400">pts</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {game.correctCount}/{game.questionsAnswered} acertos ·{" "}
                          {game.livesRemaining > 0
                            ? `${game.livesRemaining} ❤️ restante${game.livesRemaining !== 1 ? "s" : ""}`
                            : "💔 sem vidas"}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">{formatDate(game.finishedAt)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* CTA */}
        <div className="text-center pt-2">
          <Link
            href="/play"
            className="inline-block bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-blue-800 active:scale-95 transition shadow"
          >
            🎮 Jogar Agora
          </Link>
        </div>

      </div>
    </main>
  )
}
