import { prisma } from "@/lib/prisma"
import HomeForm from "@/components/HomeForm"

async function getTop3() {
  return prisma.guestPlayer.findMany({
    select: { name: true, bestScore: true },
    orderBy: { bestScore: "desc" },
    take: 3,
    where: { bestScore: { gt: 0 } },
  })
}

export default async function HomePage() {
  const top3 = await getTop3()
  return <HomeForm top3={top3} />
}
