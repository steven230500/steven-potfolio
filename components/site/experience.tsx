"use client"

import { jobs } from "@/lib/content"
import { useLanguage } from "@/lib/language-context"
import { TechChip } from "./icons"
import { ExternalLink, Section } from "./section"

/**
 * A real timeline, so the years are the structure: they sit in their own
 * column and the rule between them fills in as you read (CSS scroll timeline).
 */
export function Experience() {
  const { language, t } = useLanguage()

  return (
    <Section id="experience" title={t.experience.title} lede={t.experience.lede}>
      <ol className="relative">
        {/* Track + fill. Hidden on small screens where the layout stacks. */}
        <span aria-hidden className="absolute bottom-2 left-[11rem] top-2 hidden w-px bg-line md:block" />
        <span aria-hidden className="timeline-fill absolute bottom-2 left-[11rem] top-2 hidden w-px bg-accent md:block" />

        {jobs.map((job) => {
          const years = job.start === job.end ? job.start : `${job.start}–${job.end.slice(2)}`
          return (
            <li key={`${job.company}-${job.start}`} className="relative pb-14 last:pb-0 md:flex md:gap-0">
              <div className="mb-3 md:mb-0 md:w-[11rem] md:shrink-0 md:pr-6">
                <p className="semi-wide tabular whitespace-nowrap text-title font-bold text-text-3 md:sticky md:top-[calc(var(--header-h)+1.5rem)]">
                  {years}
                </p>
              </div>

              <span
                aria-hidden
                className="absolute left-[11rem] top-[0.6rem] hidden size-[9px] -translate-x-1/2 rounded-full border-2 border-accent bg-bg md:block"
              />

              <div className="max-w-[var(--measure)] md:pl-10">
                <h3 className="text-title font-bold tracking-[-0.01em] text-text">
                  {job.role}
                  <span className="font-normal text-text-2">, {job.company}</span>
                </h3>
                <p className="mt-1 text-small text-text-3">
                  {job.place[language]}, <span className="tabular">{job.period[language]}</span>
                </p>
                <p className="mt-4 text-text-2 text-pretty">{job.summary[language]}</p>

                {job.links.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-small">
                    {job.links.map((l) => (
                      <li key={l.url}>
                        <ExternalLink href={l.url} className="text-text">
                          {l.name}
                        </ExternalLink>
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
                  {job.stack.map((s) => (
                    <li key={s}>
                      <TechChip name={s} size="sm" />
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
