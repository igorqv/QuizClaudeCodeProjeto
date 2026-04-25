export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import HomeForm from "@/components/HomeForm"

async function getTop3() {
  try {
    return await prisma.guestPlayer.findMany({
      select: { name: true, bestScore: true },
      orderBy: { bestScore: "desc" },
      take: 3,
      where: { bestScore: { gt: 0 } },
    })
  } catch {
    return []
  }
}

export default async function HomePage() {
  const top3 = await getTop3()
  return <HomeForm top3={top3} />
}
