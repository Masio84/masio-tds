<<<<<<< HEAD
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"
import "./globals.css"
=======
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
>>>>>>> fe5435f0a26d62894eb6a10d3b02f82b3f681fd5

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "MTDS Starter CRM System",
  description: "Sistema CRM profesional por Masio Technologies",
}
=======
  title: "Masio Technologies & Digital Solutions",
  description: "Creative Developer Studio. Transformamos ideas complejas en experiencias digitales elegantes, rápidas y escalables.",
};
>>>>>>> fe5435f0a26d62894eb6a10d3b02f82b3f681fd5

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
<<<<<<< HEAD
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
=======
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white relative`}
      >
        <CustomCursor />
        <Navbar />
        {children}
        <Footer />
>>>>>>> fe5435f0a26d62894eb6a10d3b02f82b3f681fd5
      </body>
    </html>
  )
}