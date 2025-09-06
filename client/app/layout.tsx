import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ToastProvider } from "@/components/ui/toast"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "EcoFinds - Sustainable Marketplace",
  description: "Buy and sell eco-friendly products in a sustainable marketplace",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <ToastProvider>{children}</ToastProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
