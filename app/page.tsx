import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Services from "@/components/sections/Services"
import Portfolio from "@/components/sections/Portfolio"
import Contact from "@/components/sections/Contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />
    </main>
  )
}