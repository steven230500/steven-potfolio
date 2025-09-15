"use client";

import { useForm } from "react-hook-form";
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
});
type FormValues = z.infer<typeof formSchema>;


async function getRecaptchaToken(): Promise<string | null> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey || typeof window === "undefined") {
    console.warn("reCAPTCHA: Site key not found or not in browser environment");
    return null;
  }

  // Wait for reCAPTCHA to be ready
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    const grecaptcha = window.grecaptcha;
    if (grecaptcha && typeof grecaptcha.execute === "function") {
      try {
        const token = await grecaptcha.execute(siteKey, { action: "contact" });
        if (token && token.length > 0) {
          return token;
        }
      } catch (error) {
        console.error("reCAPTCHA execution error:", error);
        return null;
      }
    }

    // Wait 500ms before next attempt
    await new Promise(resolve => setTimeout(resolve, 500));
    attempts++;
  }

  console.warn("reCAPTCHA: Failed to get token after", maxAttempts, "attempts");
  return null;
}


export function ContactSection() {
  const { t } = useLanguage();
  const { toast } = useToast();

  console.log("ContactSection rendered");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit", // Only validate on form submission
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
      company: "",
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

  console.log("Form state:", form.getValues());
  console.log("Form errors:", errors);

  const onSubmit = async (values: FormValues) => {
    console.log("Form submitted with values:", values);
    console.log("Form errors before validation:", errors);

    try {
      // Clear any previous errors
      clearErrors();

      // Validate all fields before proceeding
      const isValid = await trigger();
      console.log("Form validation result:", isValid);
      console.log("Form errors after validation:", errors);

      if (!isValid) {
        console.log("Form validation failed");
        toast({
          title: "Campos requeridos",
          description: "Por favor completa todos los campos correctamente.",
          variant: "destructive",
        });
        return;
      }

      const token = await getRecaptchaToken();
      if (!token) {
        toast({
          title: "Error de validación",
          description: "No se pudo validar reCAPTCHA. Recarga la página e intenta de nuevo.",
          variant: "destructive",
        });
        return;
      }

      console.log("Sending contact form...");
      const res = await sendContact({ ...values, recaptchaToken: token });

      if (res.ok) {
        toast({
          title: "✅ Mensaje enviado",
          description: "Gracias por contactarme. Te responderé pronto.",
        });
        reset();
      } else if (res.error === "bad_captcha") {
        toast({
          title: "Error de validación",
          description: "La validación reCAPTCHA falló. Intenta de nuevo.",
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
      console.error("Form submission error:", error);
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
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Form submit event triggered");
                  console.log("Form data:", new FormData(e.target as HTMLFormElement));
                  handleSubmit(onSubmit)(e);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Input
                      placeholder={t.firstName}
                      {...register("firstName")}
                      aria-invalid={!!errors.firstName}
                      onChange={(e) => {
                        console.log("firstName changed:", e.target.value);
                        register("firstName").onChange(e);
                      }}
                    />
                    {errors.firstName && <p className="mt-1 text-xs text-destructive">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <Input
                      placeholder={t.lastName}
                      {...register("lastName")}
                      aria-invalid={!!errors.lastName}
                    />
                    {errors.lastName && <p className="mt-1 text-xs text-destructive">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div>
                  <Input
                    placeholder={t.emailAddress}
                    type="email"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                </div>

                <div>
                  <Input
                    placeholder={t.subject}
                    {...register("subject")}
                    aria-invalid={!!errors.subject}
                  />
                  {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>}
                </div>

                <div>
                  <Textarea
                    placeholder={t.yourMessage}
                    className="min-h-[120px]"
                    {...register("message")}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    size="lg"
                    type="submit"
                    disabled={formIsSubmitting}
                  >
                    {formIsSubmitting ? "Enviando..." : t.sendMessageBtn}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    type="button"
                    onClick={async () => {
                      console.log("Manual validation triggered");
                      const result = await trigger();
                      console.log("Manual validation result:", result);
                    }}
                  >
                    Validar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
