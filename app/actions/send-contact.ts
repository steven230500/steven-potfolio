"use server"

import { z } from "zod"
import { Resend } from "resend"

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Too short"),
  message: z.string().min(10, "Too short"),
  company: z.string().optional(),    
  recaptchaToken: z.string().min(1), 
})

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY
  if (!secret) return { success: false, score: 0 }

  const params = new URLSearchParams()
  params.append("secret", secret)
  params.append("response", token)

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
    cache: "no-store",
  })

  const data = (await res.json()) as { success: boolean; score?: number }
  return { success: !!data.success, score: data.score ?? 0 }
}

export async function sendContact(input: unknown) {
  const plain =
    input instanceof FormData ? Object.fromEntries(input.entries()) : (input as Record<string, unknown>)

  const parsed = schema.safeParse(plain)
  if (!parsed.success) {
    return { ok: false, error: "validation", issues: parsed.error.flatten() }
  }

  const { firstName, lastName, email, subject, message, company, recaptchaToken } = parsed.data

  if (company && company.length > 0) return { ok: true }

  const check = await verifyRecaptcha(recaptchaToken)
  if (!check.success || check.score < 0.5) {
    return { ok: false, error: "bad_captcha" }
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const to = process.env.CONTACT_TO || "steven230500@outlook.com"
  const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>"

  try {
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      text: `From: ${firstName} ${lastName} <${email}>\n\n${message}`,
      html: `
        <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
          <p><strong>From:</strong> ${firstName} ${lastName} &lt;${email}&gt;</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr />
          <p>${(message || "").replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    })

    return { ok: true }
  } catch (err) {
    console.error("sendContact error:", err)
    return { ok: false, error: "email_failed" }
  }
}
