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

/** Hides the pill while scrolling down past the hero, brings it back on any upward scroll. */
function useHideOnScroll() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    let last = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        const delta = y - last
        if (y < 120) setHidden(false)
        else if (delta > 6) setHidden(true)
        else if (delta < -6) setHidden(false)
        last = y
        ticking = false
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return [hidden, setHidden] as const
}

export function SiteHeader() {
  const { t, language, toggleLanguage } = useLanguage()
  const active = useActiveSection()
  const [hidden, setHidden] = useHideOnScroll()
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLUListElement>(null)
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null)

  // The active-section highlight slides between links instead of jumping.
  useLayoutEffect(() => {
    const list = navRef.current
    const link = active && list?.querySelector<HTMLElement>(`[data-id="${active}"]`)
    setIndicator(link ? { x: link.offsetLeft, w: link.offsetWidth } : null)
  }, [active, language])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  const links = SECTIONS.map((id) => ({ id, label: t.nav[id] }))
  const isHidden = hidden && !open

  return (
    <header
      // Keyboard focus inside the pill always brings it back.
      onFocusCapture={() => setHidden(false)}
      className={cn(
        "fixed inset-x-0 top-3 z-50 flex justify-center px-3 transition-[translate,opacity] duration-[var(--dur-3)] ease-[var(--ease-out)] motion-reduce:transition-none",
        isHidden && "pointer-events-none -translate-y-[calc(100%+1rem)] opacity-0",
      )}
    >
      <a
        href="#main"
        className="sr-only rounded-full bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:absolute focus:left-4 focus:top-0"
      >
        {t.skip}
      </a>

      <div
        className={cn(
          "relative w-full max-w-max overflow-hidden border border-line bg-surface shadow-[0_8px_24px_-12px_rgb(13_18_32/0.25)] max-md:max-w-none",
          open ? "rounded-3xl" : "rounded-full",
          "transition-[border-radius] duration-[var(--dur-2)]",
        )}
      >
        <div className="flex h-12 items-center gap-1 pl-1.5 pr-1.5">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            aria-label={language === "es" ? "Steven Patiño, inicio" : "Steven Patiño, home"}
            className="semi-wide grid size-9 shrink-0 place-items-center rounded-full bg-text text-meta font-extrabold tracking-tight text-bg"
          >
            SP
          </a>

          {/* Mobile: show where you are instead of the full list */}
          <span className="ml-2 flex-1 truncate text-small font-semibold text-text md:hidden" aria-hidden>
            {active ? t.nav[active] : "Steven Patiño"}
          </span>

          <nav aria-label="Principal" className="ml-1 hidden md:block">
            <div className="relative">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 rounded-full bg-surface-2 transition-[translate,width,opacity] duration-[var(--dur-3)] ease-[var(--ease-out)] motion-reduce:transition-none"
                style={{
                  width: indicator?.w ?? 0,
                  translate: indicator ? `${indicator.x}px 0` : undefined,
                  opacity: indicator ? 1 : 0,
                }}
              />
              <ul ref={navRef} className="flex items-center">
              {links.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    data-id={l.id}
                    aria-current={active === l.id ? "true" : undefined}
                    className={cn(
                      "relative z-10 block rounded-full px-3.5 py-1.5 text-small transition-colors duration-[var(--dur-1)]",
                      active === l.id ? "font-semibold text-text" : "text-text-2 hover:text-text",
                    )}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              </ul>
            </div>
          </nav>

          <span aria-hidden className="mx-1.5 hidden h-5 w-px bg-line md:block" />

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={t.nav.language}
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
            className="grid size-9 place-items-center rounded-full text-text hover:bg-surface-2 md:hidden"
          >
            {open ? <X size={18} /> : <List size={18} />}
          </button>
        </div>

        {/* Mobile menu grows out of the pill, same expand primitive as the project rows */}
        <div id="mobile-nav" className="expand md:hidden" data-open={open} inert={!open}>
          <div>
            <nav aria-label="Principal" className="expand-inner px-4 pb-4 pt-1">
              <ul>
                {links.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "semi-wide block rounded-xl px-2 py-2.5 text-title font-bold",
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

        {/* Reading progress along the bottom edge of the pill, driven by CSS scroll timeline. */}
        <span aria-hidden className="scroll-progress absolute inset-x-0 bottom-0 h-[2px] bg-accent" />
      </div>
    </header>
  )
}
