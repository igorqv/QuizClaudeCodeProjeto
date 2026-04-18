import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { LEVEL_NAMES, LEVEL_ICONS } from "@/lib/levels"

export async function GET() {
  const session = await getServerSession(authOptions)

  const top10 = await prisma.user.findMany({
    orderBy: { totalScore: "desc" },
    take: 10,
    select: { id: true, name: true, avatarId: true, level: true, totalScore: true },
  })

  const ranking = top10.map((u, i) => ({
    position: i + 1,
    id: u.id,
    name: u.name,
    avatarId: u.avatarId,
    level: u.level,
    levelName: LEVEL_NAMES[u.level],
    levelIcon: LEVEL_ICONS[u.level],
    totalScore: u.totalScore,
  }))

  let userPosition = null
  if (session?.user?.id) {
    const userId = session.user.id
    const inTop10 = ranking.find((r) => r.id === userId)
    if (!inTop10) {
      const me = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, avatarId: true, level: true, totalScore: true },
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

  return NextResponse.json({ ranking, userPosition })
}
