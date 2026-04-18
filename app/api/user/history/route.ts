import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 })
  }

  const sessions = await prisma.gameSession.findMany({
    where: { userId: session.user.id, status: "completed" },
    orderBy: { finishedAt: "desc" },
    take: 10,
    select: {
      id: true,
      score: true,
      correctCount: true,
      startedAt: true,
      finishedAt: true,
    },
  })

  return NextResponse.json({ sessions })
}
