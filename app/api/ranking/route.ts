import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { prisma } from "@/lib/prisma"

interface RankingEntry {
  position: number
  name: string
  bestScore: number
}

export async function GET() {
  const cookieStore = await cookies()
  const guestEmail = cookieStore.get("guest_email")?.value

  const guests = await prisma.guestPlayer.findMany({
    select: { name: true, bestScore: true, email: true },
  })

  const ranking = guests
    .sort((a, b) => b.bestScore - a.bestScore)
    .slice(0, 10)
    .map((g, i): RankingEntry => ({
      position: i + 1,
      name: g.name,
      bestScore: g.bestScore,
    }))

  let userPosition: RankingEntry | null = null
  if (guestEmail) {
    const me = guests.find((g) => g.email === guestEmail)
    if (me && !ranking.find((r) => r.name === me.name && r.bestScore === me.bestScore)) {
      const ahead = guests.filter((g) => g.bestScore > me.bestScore).length
      userPosition = {
        position: ahead + 1,
        name: me.name,
        bestScore: me.bestScore,
      }
    }
  }

  return NextResponse.json({ ranking, userPosition })
}
