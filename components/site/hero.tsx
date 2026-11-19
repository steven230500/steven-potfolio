"use client"

import type { CSSProperties } from "react"
import { useLanguage } from "@/lib/language-context"
import { LocalTime } from "./local-time"

const delay = (i: number) => ({ "--i": i }) as CSSProperties

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="top" aria-labelledby="hero-title" className="relative px-[var(--gutter)] pb-20 pt-[calc(var(--header-h)+clamp(2.5rem,8vh,5rem))] sm:pb-28">
      <div className="mx-auto max-w-[var(--page)]">
        <p className="hero-after mb-5 text-small text-text-2 sm:mb-6 sm:text-body" style={delay(0)}>
          {t.hero.role}
        </p>

        {/* The name expands from condensed to wide on load — Archivo's width axis is the brand. */}
        <h1
          id="hero-title"
          className="text-display font-extrabold tracking-[-0.035em] text-text"
          aria-label="Steven Patiño"
        >
          <span className="hero-line" style={delay(0)} aria-hidden>
            <span>Steven</span>
          </span>
          <span className="hero-line pl-[0.55em] sm:pl-[1.1em]" style={delay(1)} aria-hidden>
            <span>Patiño</span>
          </span>
        </h1>

        <div className="mt-10 flex flex-col gap-8 sm:mt-14 lg:ml-[33%] lg:max-w-[var(--measure)]">
          <p className="hero-after text-lead text-text text-pretty" style={delay(1)}>
            {t.hero.lead}
          </p>

          <div className="hero-after flex flex-wrap items-center gap-3" style={delay(2)}>
            <a
              href="#work"
              className="inline-flex h-11 items-center rounded-full bg-accent px-5 font-semibold text-accent-ink transition-colors duration-[var(--dur-1)] hover:bg-accent-hover"
            >
              {t.hero.ctaWork}
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center rounded-full px-4 font-semibold text-text underline decoration-line-strong decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-[var(--dur-1)] hover:decoration-accent"
            >
              {t.hero.ctaContact}
            </a>
          </div>

          <dl className="hero-after flex flex-col gap-1.5 text-small text-text-2" style={delay(3)}>
            <div className="flex items-start gap-2">
              <dt className="sr-only">Status</dt>
              <span aria-hidden className="relative mt-[0.55em] grid size-2 shrink-0 place-items-center">
                <span className="absolute size-2 rounded-full bg-live motion-safe:animate-ping motion-safe:[animation-duration:2.4s] opacity-40" />
                <span className="size-2 rounded-full bg-live" />
              </span>
              <dd>{t.hero.available}</dd>
            </div>
            <div className="flex items-center gap-2 pl-4">
              <dt>{t.hero.localTime}</dt>
              <dd className="text-text">
                <LocalTime />
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
