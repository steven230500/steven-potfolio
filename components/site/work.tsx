"use client"

import Image from "next/image"
import { useId, useState } from "react"
import { otherBuilds, projects, type Project } from "@/lib/content"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { AppleLogo, GooglePlayLogo, Plus } from "./icons"
import { TechChip } from "./icons"
import { ExternalLink, Section } from "./section"

/**
 * Signature: a browser frame with the real domain and a real screenshot.
 * It proves the site exists and runs; it is the only framed object on the page.
 */
function BrowserFrame({ project }: { project: Project }) {
  return (
    <figure className="overflow-hidden rounded-frame border border-line bg-surface">
      <div className="flex items-center gap-3 border-b border-line px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-surface-2 px-2.5 py-1 font-mono text-meta text-text-2">
          <svg viewBox="0 0 16 16" aria-hidden className="size-3 shrink-0 text-live">
            <path
              d="M4.5 7V5.5a3.5 3.5 0 0 1 7 0V7M3.5 7h9v6.5h-9z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <span className="truncate">{project.domain}</span>
        </span>
      </div>
      <div className="relative aspect-[16/10] bg-surface-2">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            sizes="(min-width: 1024px) 34rem, 100vw"
            className="object-cover"
          />
        ) : project.logo ? (
          <div className="absolute inset-0 grid place-items-center p-10">
            <div className="relative size-32">
              <Image src={project.logo} alt={project.name} fill sizes="8rem" className="object-contain" />
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 grid place-items-center p-8">
            <span className="wide text-section font-extrabold tracking-[-0.03em] text-accent">{project.name}</span>
          </div>
        )}
      </div>
    </figure>
  )
}

function ProjectRow({ project, defaultOpen }: { project: Project; defaultOpen?: boolean }) {
  const { language, t } = useLanguage()
  const [open, setOpen] = useState(!!defaultOpen)
  const panelId = useId()

  return (
    <li className="border-t border-line last:border-b">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="group flex w-full items-center gap-4 py-6 text-left sm:gap-8 sm:py-8"
        >
          <span className="flex min-w-0 flex-1 flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
            <span
              className={cn(
                "semi-wide text-title font-bold tracking-[-0.02em] transition-colors duration-[var(--dur-1)] sm:text-[clamp(1.75rem,1rem+2.4vw,2.75rem)]",
                open ? "text-accent" : "text-text group-hover:text-accent",
              )}
            >
              {project.name}
            </span>
            <span className="text-small text-text-2">{project.sector[language]}</span>
          </span>
          <span className="hidden items-center gap-2 font-mono text-meta text-text-3 md:flex">
            <span aria-hidden className="size-1.5 rounded-full bg-live" />
            {project.domain}
          </span>
          <span
            aria-hidden
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-full border border-line text-text transition-[rotate,background-color,border-color] duration-[var(--dur-3)] ease-[var(--ease-out)] group-hover:border-line-strong motion-reduce:transition-none",
              open && "rotate-45 border-accent bg-accent text-accent-ink group-hover:border-accent",
            )}
          >
            <Plus size={18} weight="bold" />
          </span>
        </button>
      </h3>

      <div id={panelId} className="expand" data-open={open} inert={!open}>
        <div>
          <div className="expand-inner flex flex-col gap-8 pb-10 lg:flex-row lg:gap-14">
            <div className="lg:w-[52%] lg:shrink-0">
              <BrowserFrame project={project} />
            </div>

            <div className="flex flex-1 flex-col gap-6">
              {project.role && <p className="text-small font-semibold text-text">{project.role[language]}</p>}
              <p className="text-text text-pretty">{project.summary[language]}</p>

              <div>
                <p className="mb-1 text-meta text-text-3">{t.work.operated}</p>
                <p className="text-small text-text-2 text-pretty">{project.operated[language]}</p>
              </div>

              <div>
                <p className="mb-2 text-meta text-text-3">{t.work.stack}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <li key={s}>
                      <TechChip name={s} size="sm" />
                    </li>
                  ))}
                </ul>
              </div>

              {project.apps && (
                <div>
                  <p className="mb-2 text-meta text-text-3">{t.work.apps}</p>
                  <ul className="space-y-2 text-small">
                    {project.apps.map((app) => (
                      <li key={app.appStore} className="flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span className="font-semibold text-text">{app.name[language]}</span>
                        <a
                          href={app.appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${app.name[language]}, App Store`}
                          className="inline-flex items-center gap-1 text-text-2 transition-colors duration-[var(--dur-1)] hover:text-accent"
                        >
                          <AppleLogo size={16} weight="fill" /> App Store
                        </a>
                        <a
                          href={app.googlePlay}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${app.name[language]}, Google Play`}
                          className="inline-flex items-center gap-1 text-text-2 transition-colors duration-[var(--dur-1)] hover:text-accent"
                        >
                          <GooglePlayLogo size={16} weight="fill" /> Google Play
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-auto pt-2">
                <ExternalLink href={project.url} className="font-semibold text-text">
                  {t.work.visit} {project.domain}
                </ExternalLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export function Work() {
  const { language, t } = useLanguage()

  return (
    <Section id="work" title={t.work.title} lede={t.work.lede}>
      <ul>
        {projects.map((p, i) => (
          <ProjectRow key={p.domain} project={p} defaultOpen={i === 0} />
        ))}
      </ul>

      <div className="mt-16 lg:ml-[33%]">
        <h3 className="mb-5 text-small font-semibold text-text-2">{t.work.other}</h3>
        <ul className="space-y-5">
          {otherBuilds.map((p) => (
            <li key={p.url} className="max-w-[var(--measure)]">
              <ExternalLink href={p.url} className="font-semibold text-text">
                {p.name}
              </ExternalLink>
              <p className="mt-1 text-small text-text-2 text-pretty">{p.summary[language]}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
