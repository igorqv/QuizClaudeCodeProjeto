import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      level: number
      totalScore: number
    } & DefaultSession["user"]
  }

  interface User {
    level: number
    totalScore: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    level: number
    totalScore: number
  }
}
