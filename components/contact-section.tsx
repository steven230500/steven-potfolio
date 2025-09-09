"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { sendContact } from "@/app/actions/send-contact";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Too short"),
  message: z.string().min(10, "Too short"),
  company: z.string().optional(), // honeypot
});
type FormValues = z.infer<typeof formSchema>;

export function ContactSection() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
      company: "",
    },
  });

  const getRecaptchaToken = async () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    const grecaptcha = (window as any).grecaptcha;
    if (!siteKey) return null;

    const start = Date.now();
    while (!grecaptcha?.execute && Date.now() - start < 1500) {
      await new Promise((r) => setTimeout(r, 100));
    }
    if (!grecaptcha?.execute) return null;

    try {
      if (typeof grecaptcha.ready === "function") {
        await new Promise<void>((resolve) => grecaptcha.ready(() => resolve()));
      }
      return await grecaptcha.execute(siteKey, { action: "contact" });
    } catch {
      return null;
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const token = await getRecaptchaToken();
      if (!token) {
        toast({
          title: "No se pudo validar reCAPTCHA",
          description: "Recarga la página e intenta de nuevo.",
        });
        return;
      }
      const res = await sendContact({ ...values, recaptchaToken: token });
      if (res.ok) {
        toast({
          title: "✅ Mensaje enviado",
          description: "Gracias por contactarme. Te responderé pronto.",
        });
        reset();
      } else if (res.error === "bad_captcha") {
        toast({
          title: "reCAPTCHA falló",
          description: "Parece tráfico automático. Intenta de nuevo.",
        });
      } else if (res.error === "validation") {
        toast({
          title: "Revisa el formulario",
          description: "Hay campos con errores.",
        });
      } else {
        toast({
          title: "Ups, no se pudo enviar",
          description: "Intenta nuevamente en unos minutos.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 bg-muted scroll-mt-28 md:scroll-mt-40"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t.contactTitle}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                {t.contactSubtitle}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                {t.contactDescription}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <span>steven230500@outlook.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <span>+57 3022908439</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent" />
                <span>Cartagena, Colombia</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                size="lg"
                className="gap-2 bg-transparent"
                asChild
              >
                <a
                  href="https://github.com/steven230500?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 bg-transparent"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/steven-p-0ab502126/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          <Card className="bg-background">
            <CardHeader>
              <CardTitle>{t.sendMessage}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                {...register("company")}
              />

              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder={t.firstName}
                      {...register("firstName")}
                      aria-invalid={!!errors.firstName}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      placeholder={t.lastName}
                      {...register("lastName")}
                      aria-invalid={!!errors.lastName}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Input
                    placeholder={t.emailAddress}
                    type="email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder={t.subject}
                    {...register("subject")}
                    aria-invalid={!!errors.subject}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <Textarea
                    placeholder={t.yourMessage}
                    className="min-h-[120px]"
                    {...register("message")}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : t.sendMessageBtn}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
