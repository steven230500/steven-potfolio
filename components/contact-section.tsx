"use client";

import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, MessageCircle, Send } from "lucide-react";
import { useLanguage } from "@/lib/language-context";


export function ContactSection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 px-4 bg-muted scroll-mt-28 md:scroll-mt-40">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.contactTitle}</h2>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-semibold mb-4">{t.contactSubtitle}</h3>
            <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-2xl mx-auto">
              {t.contactDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-background rounded-lg p-6 text-center shadow-sm border hover:shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 hover:bg-accent/20">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Email</h4>
              <p className="text-sm text-muted-foreground mb-4">steven230500@outlook.com</p>
              <Button variant="outline" size="sm" className="w-full transition-all duration-200 hover:bg-accent hover:text-accent-foreground" asChild>
                <a href="mailto:steven230500@outlook.com">
                  <Send className="w-4 h-4 mr-2" />
                  {t.emailBtn}
                </a>
              </Button>
            </div>

            <div className="bg-background rounded-lg p-6 text-center shadow-sm border hover:shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 hover:bg-accent/20">
                <MessageCircle className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">WhatsApp</h4>
              <p className="text-sm text-muted-foreground mb-4">+57 3022908439</p>
              <Button variant="outline" size="sm" className="w-full transition-all duration-200 hover:bg-accent hover:text-accent-foreground" asChild>
                <a href="https://wa.me/573022908439" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t.whatsappBtn}
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
            </div>

            <div className="bg-background rounded-lg p-6 text-center shadow-sm border hover:shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300 hover:bg-accent/20">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <h4 className="font-semibold mb-2">Teléfono</h4>
              <p className="text-sm text-muted-foreground mb-4">+57 3022908439</p>
              <Button variant="outline" size="sm" className="w-full transition-all duration-200 hover:bg-accent hover:text-accent-foreground" asChild>
                <a href="tel:+573022908439">
                  <Phone className="w-4 h-4 mr-2" />
                  Llamar
                </a>
              </Button>
            </div>
          </div>

          <div className="text-center">
            <h4 className="text-lg font-semibold mb-6">Sígueme en redes sociales</h4>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" size="lg" className="gap-2 bg-transparent hover:bg-accent/5 transition-all duration-300 hover:scale-105 hover:shadow-lg" asChild>
                <a href="https://github.com/steven230500?tab=repositories" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  GitHub
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 bg-transparent hover:bg-accent/5 transition-all duration-300 hover:scale-105 hover:shadow-lg" asChild>
                <a href="https://www.linkedin.com/in/steven-p-0ab502126/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
