"use server"

import { z } from "zod"
import { Resend } from "resend"

const schema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(3, "Too short"),
  message: z.string().min(10, "Too short"),
  captchaAnswer: z.string().min(1, "Captcha required"),
  company: z.string().optional(),
  formStartTime: z.number().optional(),
})


export async function sendContact(input: unknown) {
  const plain =
    input instanceof FormData ? Object.fromEntries(input.entries()) : (input as Record<string, unknown>)

  const parsed = schema.safeParse(plain)
  if (!parsed.success) {
    return { ok: false, error: "validation", issues: parsed.error.flatten() }
  }

  const { firstName, lastName, email, subject, message, company, captchaAnswer, formStartTime } = parsed.data

  // Honeypot check - if company field is filled, it's likely a bot
  if (company && company.length > 0) return { ok: true }

  // Basic bot protection checks
  if (!captchaAnswer || captchaAnswer.trim().length === 0) {
    return { ok: false, error: "bad_captcha" }
  }

  // Check if form was submitted too quickly (less than 2 seconds)
  if (formStartTime && Date.now() - formStartTime < 2000) {
    return { ok: false, error: "too_fast" }
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
    return { ok: false, error: "email_failed" }
  }
}
