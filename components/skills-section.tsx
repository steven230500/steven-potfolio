"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

type T = typeof translations.en
type StringKeys<TObj> = {
  [K in keyof TObj]: TObj[K] extends string ? K : never
}[keyof TObj]
type TitleKey = StringKeys<T>

export function SkillsSection() {
  const { t } = useLanguage()

  const skillCategories: { titleKey: TitleKey; skills: string[] }[] = [
    { titleKey: "mobileDev",     skills: ["Flutter", "Dart", "React Native", "iOS", "Android"] },
    { titleKey: "frontendTech",  skills: ["React", "Next.js", "TypeScript", "JavaScript", "Vite"] },
    { titleKey: "backendTech",   skills: ["Node.js", "NestJS", "PHP", "Laravel", "Microservices"] },
    { titleKey: "databases",     skills: ["MongoDB", "PostgreSQL", "Firebase", "Redis"] },
    { titleKey: "cloudDevOps",   skills: ["AWS", "Digital Ocean", "Vercel", "Docker", "Caddy", "CI/CD"] },
    { titleKey: "architecture",  skills: ["Clean Architecture", "BLoC", "Redux", "MobX", "CQRS", "DDD"] },
  ]

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-14 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-10">
          02 · {t.skillsTitle}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
          {skillCategories.map((category) => (
            <div key={category.titleKey} className="bg-background p-6">
              <h3 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
                {t[category.titleKey]}
              </h3>
              <div className="flex flex-wrap gap-x-2 gap-y-2 text-sm text-foreground">
                {category.skills.map((skill, i) => (
                  <span key={skill} className="flex items-center gap-2">
                    {skill}
                    {i < category.skills.length - 1 && (
                      <span className="text-muted-foreground">·</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
