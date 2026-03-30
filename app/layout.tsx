import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import ConditionalNavigation from "@/app/components/ConditionalNavigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Masio Technologies & Digital Solutions",
  description: "Creative Developer Studio. Transformamos ideas complejas en experiencias digitales elegantes, rápidas y escalables.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white relative`}
      >
        <CustomCursor />
        <ConditionalNavigation>
          {children}
        </ConditionalNavigation>
      </body>
    </html>
  )
}