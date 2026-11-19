import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Every page section: one wide-set title and an optional one-line lede. No eyebrows, no numbering. */
export function Section({
  id,
  title,
  lede,
  children,
  className,
}: {
  id: string
  title: string
  lede?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("px-[var(--gutter)] py-20 sm:py-28", className)}>
      <div className="mx-auto max-w-[var(--page)]">
        <header className="mb-12 flex flex-col gap-4 sm:mb-16 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <h2 id={`${id}-title`} className="wide text-section font-extrabold tracking-[-0.03em] text-text">
            {title}
          </h2>
          {lede && <p className="max-w-[26rem] text-text-2 text-pretty lg:pb-2 lg:text-right">{lede}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}

/** External link with the north-east arrow that nudges on hover. */
export function ExternalLink({
  href,
  children,
  className,
  label,
}: {
  href: string
  children: ReactNode
  className?: string
  label?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "group/link inline-flex items-center gap-1 underline decoration-line-strong decoration-1 underline-offset-4 transition-[color,text-decoration-color] duration-[var(--dur-1)] hover:text-accent hover:decoration-accent",
        className,
      )}
    >
      {children}
      <svg
        viewBox="0 0 16 16"
        aria-hidden
        className="size-[0.8em] shrink-0 transition-transform duration-[var(--dur-2)] ease-[var(--ease-out)] group-hover/link:-translate-y-px group-hover/link:translate-x-px motion-reduce:transition-none"
      >
        <path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}
