"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
    { titleKey: "backendTech",   skills: ["Node.js", "PHP", "Laravel", "Microservices"] },
    { titleKey: "databases",     skills: ["MongoDB", "PostgreSQL", "Firebase", "Redis"] },
    { titleKey: "cloudDevOps",   skills: ["AWS", "Firebase", "Lambda", "Rekognition", "CI/CD"] },
    { titleKey: "architecture",  skills: ["Clean Architecture", "BLoC", "Redux", "MobX", "Modular"] },
  ]

  return (
    <section id="skills" className="py-20 px-4 bg-muted scroll-mt-28 md:scroll-mt-40">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.skillsTitle}</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card key={index} className="bg-background">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 text-accent">
                  {t[category.titleKey]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
