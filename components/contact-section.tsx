"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { sendContact } from "@/app/actions/send-contact";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(1, "El nombre es requerido"),
  lastName: z.string().min(1, "El apellido es requerido"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(3, "El asunto es muy corto"),
  message: z.string().min(10, "El mensaje es muy corto"),
  company: z.string().optional(),
  formStartTime: z.number().optional(),
});
type FormValues = z.infer<typeof formSchema>;


// Bot protection functions
function isSubmissionTooFast(startTime: number): boolean {
  const now = Date.now();
  const timeDiff = now - startTime;
  return timeDiff < 2000; // Less than 2 seconds
}

function hasSuspiciousContent(message: string): boolean {
  const suspiciousPatterns = [
    /http[s]?:\/\//gi, // URLs
    /<script/gi, // Script tags
    /javascript:/gi, // JavaScript URLs
    /on\w+\s*=/gi, // Event handlers
    /\b(?:viagra|casino|lottery|winner)\b/gi, // Spam keywords
  ];

  return suspiciousPatterns.some(pattern => pattern.test(message));
}


export function ContactSection() {
  const { t } = useLanguage();
  const { toast } = useToast();

  // Bot protection state - simplified to prevent re-render issues
  const [formStartTime] = useState(() => Date.now());

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
      company: "",
      formStartTime,
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    trigger,
    formState: { errors, isSubmitting: formIsSubmitting },
  } = form;

  const onSubmit = async (values: FormValues) => {
    try {
      // Clear any previous errors
      clearErrors();

      // Validate all fields before proceeding
      const isValid = await trigger();

      if (!isValid) {
        toast({
          title: "Campos requeridos",
          description: "Por favor completa todos los campos correctamente.",
          variant: "destructive",
        });
        return;
      }

      // Bot protection checks
      if (isSubmissionTooFast(values.formStartTime || formStartTime)) {
        toast({
          title: "Envío demasiado rápido",
          description: "Por favor espera un momento antes de enviar.",
          variant: "destructive",
        });
        return;
      }

      if (hasSuspiciousContent(values.message)) {
        toast({
          title: "Contenido sospechoso",
          description: "El mensaje contiene contenido no permitido.",
          variant: "destructive",
        });
        return;
      }

      const res = await sendContact(values);

      if (res.ok) {
        toast({
          title: "✅ Mensaje enviado",
          description: "Gracias por contactarme. Te responderé pronto.",
        });
        reset();
      } else if (res.error === "bad_captcha") {
        toast({
          title: "Error de validación",
          description: "La respuesta al captcha es incorrecta.",
          variant: "destructive",
        });
      } else if (res.error === "too_fast") {
        toast({
          title: "Envío demasiado rápido",
          description: "Por favor espera un momento antes de enviar.",
          variant: "destructive",
        });
      } else if (res.error === "validation") {
        // Handle server-side validation errors
        if (res.issues) {
          // res.issues is a flattened error object from Zod
          const issues = res.issues as Record<string, { message?: string }>;
          Object.entries(issues).forEach(([field, error]) => {
            if (error?.message) {
              setError(field as keyof FormValues, {
                message: error.message,
              });
            }
          });
        }
        toast({
          title: "Campos requeridos",
          description: "Por favor completa todos los campos correctamente.",
          variant: "destructive",
        });
      } else if (res.error === "email_failed") {
        toast({
          title: "Error al enviar",
          description: "Hubo un problema al enviar el mensaje. Intenta más tarde.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error desconocido",
          description: "Ocurrió un error inesperado. Intenta más tarde.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error de conexión",
        description: "No se pudo enviar el mensaje. Verifica tu conexión e intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-muted scroll-mt-28 md:scroll-mt-40">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{t.contactTitle}</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">{t.contactSubtitle}</h3>
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
              <Button variant="outline" size="lg" className="gap-2 bg-transparent" asChild>
                <a href="https://github.com/steven230500?tab=repositories" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                  GitHub
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="gap-2 bg-transparent" asChild>
                <a href="https://www.linkedin.com/in/steven-p-0ab502126/" target="_blank" rel="noopener noreferrer">
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
              {/* honeypot */}
              <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("company")} />

              <form
                noValidate
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder={t.firstName}
                      {...register("firstName")}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-invalid={!!errors.firstName}
                    />
                    {errors.firstName && <p className="mt-1 text-xs text-destructive">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder={t.lastName}
                      {...register("lastName")}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      aria-invalid={!!errors.lastName}
                    />
                    {errors.lastName && <p className="mt-1 text-xs text-destructive">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    placeholder={t.emailAddress}
                    {...register("email")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder={t.subject}
                    {...register("subject")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-invalid={!!errors.subject}
                  />
                  {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>}
                </div>

                <div>
                  <textarea
                    placeholder={t.yourMessage}
                    {...register("message")}
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                </div>


                <Button
                  className="w-full"
                  size="lg"
                  type="submit"
                  disabled={formIsSubmitting}
                >
                  {formIsSubmitting ? "Enviando..." : t.sendMessageBtn}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
