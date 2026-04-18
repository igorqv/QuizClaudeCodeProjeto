import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
  const isAuth = !!token
  const { pathname } = request.nextUrl

  const isAuthPage = pathname === "/login" || pathname === "/register"

  if (isAuthPage) {
    if (isAuth) return NextResponse.redirect(new URL("/dashboard", request.url))
    return NextResponse.next()
  }

  if (!isAuth) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/play", "/profile", "/login", "/register"],
}
