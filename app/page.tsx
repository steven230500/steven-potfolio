import { SiteHeader } from "@/components/site/site-header"
import { Hero } from "@/components/site/hero"
import { Work } from "@/components/site/work"
import { Experience } from "@/components/site/experience"
import { Stack } from "@/components/site/stack"
import { About } from "@/components/site/about"
import { Contact } from "@/components/site/contact"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <About />
        <Contact />
      </main>
    </>
  )
}
