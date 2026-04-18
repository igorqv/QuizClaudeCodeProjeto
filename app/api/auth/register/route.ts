import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import bcrypt from "bcryptjs"
import { ZodError } from "zod"
import { prisma } from "@/lib/prisma"
import { registerSchema } from "@/lib/validators"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = registerSchema.parse(body)

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "Este email já está cadastrado" }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true },
    })

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: "Erro ao criar conta" }, { status: 500 })
  }
}
