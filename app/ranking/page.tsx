import Link from "next/link"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

async function getRankingData() {
  const guests = await prisma.guestPlayer.findMany({
    select: { name: true, bestScore: true, email: true },
  })

  const ranking = guests
    .sort((a, b) => b.bestScore - a.bestScore)
    .slice(0, 10)
    .map((g, i) => ({
      position: i + 1,
      name: g.name,
      bestScore: g.bestScore,
    }))

  return { ranking }
}

export default async function RankingPage() {
  const { ranking } = await getRankingData()
  const cookieStore = await cookies()
  const guestEmail = cookieStore.get("guest_email")?.value

  const guests = await prisma.guestPlayer.findMany({
    select: { name: true, bestScore: true, email: true },
  })

  let userPosition = null
  if (guestEmail) {
    const me = guests.find((g) => g.email === decodeURIComponent(guestEmail))
    if (me && !ranking.find((r) => r.name === me.name && r.bestScore === me.bestScore)) {
      const ahead = guests.filter((g) => g.bestScore > me.bestScore).length
      userPosition = {
        position: ahead + 1,
        name: me.name,
        bestScore: me.bestScore,
      }
    }
  }

  const MEDALS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-gray-800">🏆 Ranking</h1>
          <Link href="/" className="text-blue-600 hover:underline text-sm font-semibold">
            ← Home
          </Link>
        </div>

        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          {ranking.map((entry: any) => {
            const isMe = guestEmail && entry.name === userPosition?.name && entry.bestScore === userPosition?.bestScore
            return (
              <div
                key={`${entry.name}-${entry.bestScore}`}
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
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-blue-700 text-lg">{entry.bestScore}</div>
                  <div className="text-xs text-gray-400">pts</div>
                </div>
              </div>
            )
          })}
        </div>

        {userPosition && !ranking.find((r: any) => r.name === userPosition.name) && (
          <div className="bg-blue-700 text-white rounded-3xl p-5 flex items-center gap-4">
            <div className="text-2xl font-extrabold">#{userPosition.position}</div>
            <div className="flex-1">
              <div className="font-bold">{userPosition.name}</div>
            </div>
            <div className="text-right">
              <div className="font-extrabold text-xl">{userPosition.bestScore}</div>
              <div className="text-blue-200 text-xs">pts</div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
