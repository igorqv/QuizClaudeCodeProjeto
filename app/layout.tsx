import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Curiosamente",
  description: "Aprenda jogando! Quiz de cultura geral sobre o Brasil e o mundo para jovens.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} font-sans`}>{children}</body>
    </html>
  )
}
