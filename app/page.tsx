import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { ContactSection } from "@/components/contact-section"
import { LanguageToggle } from "@/components/language-toggle"
import { FloatingNav } from "@/components/floating-nav"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/10">
      <FloatingNav />
      <LanguageToggle />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  )
}
