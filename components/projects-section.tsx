"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export function ProjectsSection() {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })],
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: any) => {
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const projects = [
    {
      title: "iforevents",
      description:
        "Plataforma integral de análisis de eventos y API de tracking. Incluye Dashboard administrativo, API en Go, y arquitectura escalable con ClickHouse, Redis y RabbitMQ. Soporte para instalación Self-Hosted con Docker.",
      image: "/iforevents.svg",
      url: "https://iforevents.com/",
      technologies: [
        "Go",
        "ClickHouse",
        "Redis",
        "RabbitMQ",
        "Docker",
        "Next.js",
      ],
      category: "Analytics Platform",
    },
    {
      title: "XIV Simposio Medicina Interna",
      description:
        "Landing page para el XIV Simposio de Medicina Interna de la Universidad del Valle. Información de inscripciones, agenda y ponentes.",
      image: "/simposio.png", // Using provided asset
      url: "https://medicina-interna-simposio-landing.vercel.app/",
      technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
      category: "Landing Page",
    },
    {
      title: "What to do Cartagena",
      description:
        "Guía interactiva completa para descubrir qué hacer en Cartagena de Indias. Incluye mapa interactivo, eventos locales, comercios, rutas turísticas y gamificación.",
      image: "/cartagena-unesco-world-heritage-historic-center.jpg",
      url: "https://whattodocartagena.com/",
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Leaflet",
        "React Leaflet",
      ],
      category: "Web Development",
    },
    {
      title: "Grupo La Fe Cartagena",
      description:
        "Aplicación web para organización de apoyo para la recuperación de la ludopatía. Desarrollada con Next.js, TypeScript y Tailwind CSS.",
      image: "/grupo-la-fe-logo.png",
      url: "https://grupolafecartagena.org",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Docker"],
      category: "Web Development",
    },
  ];

  return (
    <section
      id="projects"
      className="py-20 px-4 bg-background scroll-mt-28 md:scroll-mt-40"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t.projectsTitle}
        </h2>

        <div className="relative group/carousel">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {projects.map((project, index) => (
                <div
                  className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-4"
                  key={index}
                >
                  <Card className="bg-muted hover:shadow-lg transition-all duration-300 group h-full flex flex-col">
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
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="mb-2">
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl mb-3 text-accent line-clamp-1">
                        {project.title}
                      </CardTitle>
                      <p className="text-foreground mb-4 leading-relaxed text-sm text-pretty line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                        {project.technologies
                          .slice(0, 3)
                          .map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="secondary"
                              className="text-xs"
                            >
                              {tech}
                            </Badge>
                          ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
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
                </div>
              ))}
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full z-10 hidden md:flex opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm ${!canScrollPrev ? "invisible" : ""}`}
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="sr-only">Previous slide</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full z-10 hidden md:flex opacity-0 group-hover/carousel:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm ${!canScrollNext ? "invisible" : ""}`}
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight className="w-5 h-5" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
