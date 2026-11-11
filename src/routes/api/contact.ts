import "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod/v4";
import { resend, FROM_EMAIL, TO_EMAIL } from "@/lib/resend";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  company: z.string().optional(),
  serviceInterest: z.enum([
    "Print",
    "Web Development",
    "Mobile App",
    "Consulting",
    "Other",
  ]),
  budgetRange: z.enum([
    "Under $1K",
    "$1K-$5K",
    "$5K-$20K",
    "$20K+",
    "Not sure",
  ]),
  timeline: z.enum([
    "ASAP",
    "Within 1 month",
    "1-3 months",
    "3+ months",
    "Just exploring",
  ]),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

async function captureServerEvent(
  apiKey: string,
  event: string,
  properties: Record<string, unknown>,
) {
  const POSTHOG_HOST =
    (process.env.VITE_PUBLIC_POSTHOG_HOST as string) ||
    "https://us.posthog.com";

  try {
    await fetch(`${POSTHOG_HOST}/capture/`, {
      method: "POST",
      signal: AbortSignal.timeout(5000),
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        event,
        properties: {
          ...properties,
          $lib: "posthog-node-custom",
        },
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // Non-critical: silently ignore PostHog capture failures
  }
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as unknown;

          // Validate
          const parsed = contactFormSchema.safeParse(body);
          if (!parsed.success) {
            return new Response(
              JSON.stringify({
                success: false,
                error: parsed.error.issues
                  .map((i) => i.message)
                  .join(", "),
              }),
              {
                status: 400,
                headers: { "Content-Type": "application/json" },
              },
            );
          }

          const data = parsed.data;

          // Send emails via Resend
          if (resend) {
            // Email to captain
            await resend.emails.send({
              from: FROM_EMAIL,
              to: TO_EMAIL,
              replyTo: data.email,
              subject: `New Contact Form: ${data.serviceInterest} inquiry from ${data.name.replace(/[\r\n]/g, " ")}`,
              html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
                <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
                <p><strong>Company:</strong> ${escapeHtml(data.company || "Not provided")}</p>
                <p><strong>Service Interest:</strong> ${escapeHtml(data.serviceInterest)}</p>
                <p><strong>Budget Range:</strong> ${escapeHtml(data.budgetRange)}</p>
                <p><strong>Timeline:</strong> ${escapeHtml(data.timeline)}</p>
                <hr />
                <p><strong>Message:</strong></p>
                <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
              `,
            });

            // Auto-reply to sender
            await resend.emails.send({
              from: FROM_EMAIL,
              to: data.email,
              subject: "We received your message — Gabeyre Global Inc",
              html: `
                <h2>Thanks for reaching out, ${escapeHtml(data.name)}!</h2>
                <p>We've received your inquiry about <strong>${escapeHtml(data.serviceInterest)}</strong> and will get back to you within 24 hours.</p>
                <p>Here's a summary of what you shared:</p>
                <blockquote style="border-left: 3px solid #0D9488; padding-left: 16px; margin: 16px 0;">
                  <p>${escapeHtml(data.message).replace(/\n/g, "<br />")}</p>
                </blockquote>
                <p>In the meantime, feel free to check out our work at <a href="https://gabeyreglobal.ca/work">gabeyreglobal.ca/work</a>.</p>
                <hr />
                <p style="color: #64748B; font-size: 14px;">
                  Gabeyre Global Inc — Ontario, Canada<br />
                  <a href="https://gabeyreglobal.ca">gabeyreglobal.ca</a>
                </p>
              `,
            });
          }

          // Server-side PostHog capture
          const posthogKey = process.env
            .VITE_PUBLIC_POSTHOG_KEY as string;
          if (posthogKey) {
            await captureServerEvent(posthogKey, "form_submitted", {
              form_name: "contact",
              service_interest: data.serviceInterest,
              budget_range: data.budgetRange,
              timeline: data.timeline,
              source: "server",
            });
          }

          return new Response(
            JSON.stringify({ success: true }),
            {
              status: 200,
              headers: { "Content-Type": "application/json" },
            },
          );
        } catch (error) {
          console.error("Contact form error:", error);
          return new Response(
            JSON.stringify({
              success: false,
              error:
                "Failed to process your submission. Please try again later.",
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            },
          );
        }
      },
    },
  },
});
