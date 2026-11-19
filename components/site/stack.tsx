"use client"

import { Fragment } from "react"
import { stackLines } from "@/lib/content"
import { useLanguage } from "@/lib/language-context"
import { TechChip } from "./icons"
import { Section } from "./section"

/** The stack as prose, not a matrix of boxes: each line is a sentence with the tools set inline. */
export function Stack() {
  const { language, t } = useLanguage()
  const and = language === "es" ? "y" : "and"

  return (
    <Section id="stack" title={t.stack.title} lede={t.stack.lede}>
      <div className="space-y-6 sm:space-y-8 lg:ml-[33%]">
        {stackLines.map((line) => (
          <p key={line.lead.en} className="text-lead leading-[2.1] text-text-2">
            {line.lead[language]}{" "}
            {line.items.map((item, i) => (
              <Fragment key={item}>
                <TechChip name={item} />
                {i < line.items.length - 2 && ", "}
                {i === line.items.length - 2 && ` ${and} `}
              </Fragment>
            ))}
            {line.tail ? ` ${line.tail[language]}` : "."}
          </p>
        ))}
      </div>
    </Section>
  )
}
