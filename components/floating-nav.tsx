"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Menu, X } from "lucide-react"
import { scrollToId } from "@/lib/utils"

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { language, setLanguage } = useLanguage()
  const t = translations[language]

  const navItems = [
    { id: "hero",       label: t.nav.home },
    { id: "about",      label: t.nav.about },
    { id: "skills",     label: t.nav.skills },
    { id: "experience", label: t.nav.experience },
    { id: "projects",   label: t.nav.projects },
    { id: "contact",    label: t.nav.contact },
  ]

  const ratioMapRef = useRef<Map<string, number>>(new Map())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[]

    if (sections.length === 0) return

    ratioMapRef.current = new Map(sections.map((s) => [s.id, 0]))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = (e.target as HTMLElement).id
          ratioMapRef.current.set(id, e.isIntersecting ? e.intersectionRatio : 0)
        })

        let bestId = "hero"
        let bestRatio = -1
        ratioMapRef.current.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        })

        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
          bestId = "contact"
        }

        setActiveSection(bestId)
      },
      {
        root: null,
        threshold: [0.1, 0.25, 0.4, 0.6, 0.8],
        rootMargin: "-80px 0px -20% 0px",
      }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [language])

  const handleGo = (sectionId: string) => {
    scrollToId(sectionId)
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "bg-background border-border" : "bg-background/0 border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <button
          onClick={() => handleGo("hero")}
          className="font-mono text-sm text-foreground tracking-tight"
          aria-label="Home"
        >
          <span className="text-accent">~/</span>steven-patino
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleGo(item.id)}
              className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
                activeSection === item.id
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
          <span className="mx-2 h-4 w-px bg-border" aria-hidden />
          <button
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            className="px-2 py-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
          >
            {language === "en" ? "ES" : "EN"}
          </button>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
          >
            {language === "en" ? "ES" : "EN"}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
            className="text-foreground p-1"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleGo(item.id)}
                  className={`w-full text-left px-2 py-2 font-mono text-xs uppercase tracking-wider ${
                    activeSection === item.id ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
