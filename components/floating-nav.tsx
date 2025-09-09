"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"
import { Menu, X } from "lucide-react"
import { scrollToId } from "@/lib/utils"

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language } = useLanguage()
  const t = translations[language]

  const navItems = [
    { id: "hero",       label: t.nav.home },
    { id: "about",      label: t.nav.about },
    { id: "skills",     label: t.nav.skills },
    { id: "experience", label: t.nav.experience }, 
    { id: "contact",    label: t.nav.contact },
  ]

  const ratioMapRef = useRef<Map<string, number>>(new Map())

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

        // Fllback: si estamos al fondo de la página, fija "contact"
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
          bestId = "contact"
        }

        setActiveSection(bestId)
      },
      {
        root: null,
        threshold: [0.15, 0.35, 0.5, 0.75, 0.98],
        rootMargin: "-72px 0px -35% 0px",
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
    <>
      <nav className="hidden md:block fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-card/80 backdrop-blur-md border border-border rounded-full px-6 py-3 shadow-lg animate-slide-in-up">
        <ul className="flex space-x-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleGo(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-card/80 backdrop-blur-md border border-border rounded-full p-3 shadow-lg"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5 text-foreground" /> : <Menu className="w-5 h-5 text-foreground" />}
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 bg-card/95 backdrop-blur-md border border-border rounded-2xl p-4 shadow-xl min-w-[200px]">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleGo(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
