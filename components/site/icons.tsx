"use client"

import type { SimpleIcon } from "simple-icons"
import {
  siAstro,
  siCaddy,
  siCloudflare,
  siDrizzle,
  siPwa,
  siRabbitmq,
  siResend,
  siClickhouse,
  siDart,
  siDigitalocean,
  siDocker,
  siFirebase,
  siFlutter,
  siGithubactions,
  siGo,
  siLaravel,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPhp,
  siPostgresql,
  siReact,
  siRedis,
  siTailscale,
  siTailwindcss,
  siTypescript,
  siVercel,
} from "simple-icons"
import { cn } from "@/lib/utils"

/**
 * UI icons come from Phosphor (regular weight, 1em, inherits currentColor).
 * Technology logos come from Simple Icons, always monochrome so they sit in
 * the text colour instead of competing with the single accent.
 */
export {
  AppleLogo,
  ArrowUp,
  ArrowUpRight,
  Check,
  Copy,
  EnvelopeSimple,
  GithubLogo,
  GooglePlayLogo,
  LinkedinLogo,
  List,
  Moon,
  Phone,
  Plus,
  Sun,
  WhatsappLogo,
  X,
} from "@phosphor-icons/react"

const logos: Record<string, SimpleIcon> = {
  Flutter: siFlutter,
  Dart: siDart,
  "React Native": siReact,
  React: siReact,
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  "Tailwind CSS": siTailwindcss,
  "Node.js": siNodedotjs,
  NestJS: siNestjs,
  Go: siGo,
  PHP: siPhp,
  Laravel: siLaravel,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  Redis: siRedis,
  Firebase: siFirebase,
  ClickHouse: siClickhouse,
  Docker: siDocker,
  "GitHub Actions": siGithubactions,
  Caddy: siCaddy,
  DigitalOcean: siDigitalocean,
  Vercel: siVercel,
  Tailscale: siTailscale,
  Astro: siAstro,
  Drizzle: siDrizzle,
  Resend: siResend,
  RabbitMQ: siRabbitmq,
  PWA: siPwa,
  Cloudflare: siCloudflare,
}

export function TechLogo({ name, className }: { name: string; className?: string }) {
  const icon = logos[name]
  if (!icon) return null
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={cn("size-[1em] shrink-0", className)}>
      <path d={icon.path} fill="currentColor" />
    </svg>
  )
}

/** Inline technology chip: logo + name. The only "pill" shape in the system with a 5px radius. */
export function TechChip({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "inline-block whitespace-nowrap rounded-chip border border-line bg-surface leading-[1.3] text-text",
        size === "sm" ? "px-1.5 py-0.5 text-meta" : "px-[0.4em] py-[0.08em]",
      )}
    >
      <TechLogo name={name} className="mr-[0.4em] inline-block align-[-0.125em] text-text-2" />
      {name}
    </span>
  )
}
