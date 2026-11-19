"use client"

import { useEffect, useRef, useState } from "react"
import { contact } from "@/lib/content"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { ArrowUp, Check, Copy, GithubLogo, LinkedinLogo, Phone, WhatsappLogo } from "./icons"

export function Contact() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${contact.email}`
    }
  }

  const channels = [
    { href: contact.whatsapp, label: t.contact.whatsapp, Icon: WhatsappLogo, external: true },
    { href: contact.phoneHref, label: `${t.contact.call} ${contact.phoneDisplay}`, Icon: Phone },
    { href: contact.github, label: "GitHub", Icon: GithubLogo, external: true },
    { href: contact.linkedin, label: "LinkedIn", Icon: LinkedinLogo, external: true },
  ]

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-surface px-[var(--gutter)] pb-10 pt-24 sm:pt-32"
    >
      <div className="mx-auto max-w-[var(--page)]">
        <h2 id="contact-title" className="wide text-section font-extrabold tracking-[-0.03em] text-text">
          {t.contact.title}
        </h2>
        <p className="mt-4 max-w-[var(--measure)] text-lead text-text-2 text-pretty">{t.contact.lede}</p>

        {/* The email is the call to action, set large enough to be the last thing you remember. */}
        <div className="mt-12 flex flex-col items-start gap-4 sm:mt-16 lg:flex-row lg:items-center lg:gap-6">
          <a
            href={`mailto:${contact.email}`}
            className="semi-wide break-all text-[clamp(1.375rem,0.6rem+3.6vw,3.5rem)] font-bold leading-tight tracking-[-0.02em] text-accent underline decoration-transparent decoration-[0.06em] underline-offset-[0.18em] transition-[text-decoration-color] duration-[var(--dur-2)] hover:decoration-accent"
          >
            {contact.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className={cn(
              "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-small font-semibold transition-colors duration-[var(--dur-2)]",
              copied ? "border-live text-live" : "border-line-strong text-text hover:border-text",
            )}
          >
            <span className="relative grid size-4 place-items-center" aria-hidden>
              <Copy
                size={16}
                className={cn(
                  "col-start-1 row-start-1 transition-[opacity,scale] duration-[var(--dur-2)] motion-reduce:transition-none",
                  copied ? "scale-50 opacity-0" : "opacity-100",
                )}
              />
              <Check
                size={16}
                weight="bold"
                className={cn(
                  "col-start-1 row-start-1 transition-[opacity,scale] duration-[var(--dur-2)] ease-[var(--ease-out)] motion-reduce:transition-none",
                  copied ? "opacity-100" : "scale-50 opacity-0",
                )}
              />
            </span>
            <span aria-live="polite">{copied ? t.contact.copied : t.contact.copy}</span>
          </button>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2">
          {channels.map(({ href, label, Icon, external }) => (
            <li key={href}>
              <a
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-surface-2 px-4 text-small text-text transition-colors duration-[var(--dur-1)] hover:bg-accent-soft hover:text-accent"
              >
                <Icon size={18} />
                {label}
              </a>
            </li>
          ))}
        </ul>

        <footer className="mt-24 flex flex-col gap-4 border-t border-line pt-6 text-meta text-text-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Steven Patiño Urquijo. {t.footer.built}
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 text-text-2 hover:text-text">
            <ArrowUp size={14} />
            {t.footer.top}
          </a>
        </footer>
      </div>
    </section>
  )
}
