import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SoftSell - Turn Unused Software into Profit",
  description:
    "SoftSell helps you sell your unused software licenses quickly and easily. Get the best value for your unused software today.",
  keywords: "software resale, license reselling, sell software licenses, software marketplace",
  openGraph: {
    title: "SoftSell - Turn Unused Software into Profit",
    description:
      "SoftSell helps you sell your unused software licenses quickly and easily. Get the best value for your unused software today.",
    url: "https://softsell.vercel.app",
    siteName: "SoftSell",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SoftSell - Software Resale Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
