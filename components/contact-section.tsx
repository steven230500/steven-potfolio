"use client";

import { Mail, Phone, Github, Linkedin, ExternalLink, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function ContactSection() {
  const { t } = useLanguage();

  const channels = [
    {
      icon: Mail,
      label: "email",
      value: "steven230500@outlook.com",
      href: "mailto:steven230500@outlook.com",
      cta: t.emailBtn,
    },
    {
      icon: MessageCircle,
      label: "whatsapp",
      value: "+57 302 290 8439",
      href: "https://wa.me/573022908439",
      cta: t.whatsappBtn,
      external: true,
    },
    {
      icon: Phone,
      label: "phone",
      value: "+57 302 290 8439",
      href: "tel:+573022908439",
      cta: "Llamar",
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-14 border-t border-border">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-10">
          05 · {t.contactTitle}
        </p>

        <h3 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
          {t.contactSubtitle}
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-2xl mb-12">
          {t.contactDescription}
        </p>

        <div className="rounded-lg border border-border bg-card font-mono text-sm overflow-hidden mb-10">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border">
            <span className="w-2.5 h-2.5 rounded-full bg-[#565f72]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#565f72]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#565f72]" />
            <span className="ml-2 text-xs text-muted-foreground">contact.sh</span>
          </div>
          <div className="divide-y divide-border">
            {channels.map(({ icon: Icon, label, value, href, cta, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between gap-4 px-4 py-4 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">./{label}</span>
                  <span className="text-foreground truncate">{value}</span>
                </div>
                <span className="flex items-center gap-1 text-accent shrink-0 text-xs uppercase tracking-wider">
                  {cta}
                  {external && <ExternalLink className="w-3 h-3" />}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex gap-6">
          <a
            href="https://github.com/steven230500?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/steven-p-0ab502126/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
