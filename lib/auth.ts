import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "./prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })
        if (!user) return null

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash)
        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          level: user.level,
          totalScore: user.totalScore,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.level = user.level
        token.totalScore = user.totalScore
      }
      return token
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        // Fetch fresh data so session reflects post-game level/score updates
        const fresh = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { level: true, totalScore: true },
        })
        session.user.id = token.id as string
        session.user.level = fresh?.level ?? (token.level as number)
        session.user.totalScore = fresh?.totalScore ?? (token.totalScore as number)
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
}
