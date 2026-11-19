"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { List, X } from "./icons"
import { ThemeToggle } from "./theme-toggle"

const SECTIONS = ["work", "experience", "stack", "about", "contact"] as const
type SectionId = (typeof SECTIONS)[number]

function useActiveSection() {
  const [active, setActive] = useState<SectionId | null>(null)
  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    // A section is "active" when it crosses a thin band just above the middle of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id as SectionId)
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )
    els.forEach((el) => io.observe(el))
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.4) setActive(null)
      else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) setActive("contact")
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])
  return active
}

export function SiteHeader() {
  const { t, language, toggleLanguage } = useLanguage()
  const active = useActiveSection()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLUListElement>(null)
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // The active-section marker slides between links instead of jumping.
  useLayoutEffect(() => {
    const list = navRef.current
    if (!list || !active) return setIndicator(null)
    const link = list.querySelector<HTMLElement>(`[data-id="${active}"]`)
    if (!link) return
    setIndicator({ x: link.offsetLeft, w: link.offsetWidth })
  }, [active, language])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const links = SECTIONS.map((id) => ({ id, label: t.nav[id] }))

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-[var(--dur-2)]",
        scrolled || open ? "bg-bg shadow-[0_1px_0_var(--line)]" : "bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-full bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        {t.skip}
      </a>

      <div className="px-[var(--gutter)]">
      <div className="mx-auto flex h-[var(--header-h)] max-w-[var(--page)] items-center justify-between gap-4">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="semi-wide text-small font-bold tracking-tight text-text"
        >
          Steven Patiño
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul ref={navRef} className="relative flex items-center gap-1">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  data-id={l.id}
                  aria-current={active === l.id ? "true" : undefined}
                  className={cn(
                    "block rounded-full px-3 py-1.5 text-small transition-colors duration-[var(--dur-1)]",
                    active === l.id ? "text-text" : "text-text-2 hover:text-text",
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-1 left-0 h-[2px] rounded-full bg-accent transition-[translate,width,opacity] duration-[var(--dur-3)] ease-[var(--ease-out)] motion-reduce:transition-none"
              style={{
                width: indicator ? indicator.w - 24 : 0,
                translate: indicator ? `${indicator.x + 12}px 0` : undefined,
                opacity: indicator ? 1 : 0,
              }}
            />
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t.nav.language}
            lang={language === "es" ? "en" : "es"}
            className="grid h-9 min-w-9 place-items-center rounded-full px-2 text-meta font-semibold text-text-2 transition-colors duration-[var(--dur-1)] hover:bg-surface-2 hover:text-text"
          >
            {language === "es" ? "EN" : "ES"}
          </button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t.nav.close : t.nav.menu}
            className="grid size-9 place-items-center rounded-full text-text md:hidden hover:bg-surface-2"
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </div>
      </div>

      {/* Mobile menu: same expand primitive as the project rows */}
      <div id="mobile-nav" className="expand md:hidden" data-open={open}>
        <div>
          <nav aria-label="Principal" className="expand-inner px-[var(--gutter)] pb-6 pt-2">
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "semi-wide block py-2 text-title font-bold",
                      active === l.id ? "text-accent" : "text-text",
                    )}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Reading progress, driven by scroll position in CSS (no JS listener). */}
      <span aria-hidden className="scroll-progress absolute inset-x-0 bottom-0 h-px bg-accent" />
    </header>
  )
}
