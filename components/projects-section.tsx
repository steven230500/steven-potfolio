"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import Image from "next/image"

export function ProjectsSection() {
  const { t } = useLanguage()

  const projects = [
    {
      title: "Grupo La Fe Cartagena",
      description: "Aplicación web para organización de apoyo para la recuperación de la ludopatía. Desarrollada con Next.js, TypeScript y Tailwind CSS.",
      image: "/grupo-la-fe-logo.png",
      url: "https://grupolafecartagena.org",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Docker"],
      category: "Web Development"
    }
    // Aquí se pueden agregar más proyectos
  ]

  return (
    <section id="projects" className="py-20 px-4 bg-background scroll-mt-28 md:scroll-mt-40">

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.projectsTitle}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="bg-muted hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="p-0">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {project.category}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-3 text-accent">{project.title}</CardTitle>
                <p className="text-foreground mb-4 leading-relaxed text-sm text-pretty">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver Proyecto
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}