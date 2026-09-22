"use server";

/**
 * Server action behind the /contact form.
 *
 * // TODO: Connect to email service (Resend / Nodemailer / EmailJS)
 * // For now, log to console and show success state.
 *
 * When the email service lands: keep the same validation + return shape,
 * add the send call after validation passes, and surface provider
 * failures as a form-level error message.
 */

import {
  validateContactForm,
  type ContactFormInput,
} from "@/lib/contactValidation";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  fieldErrors: import("@/lib/contactValidation").ContactFieldErrors;
  /** Form-level message for unexpected failures. */
  message?: string;
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const input: ContactFormInput = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    company: String(formData.get("company") ?? ""),
    service: String(formData.get("service") ?? ""),
    budget: String(formData.get("budget") ?? ""),
    source: String(formData.get("source") ?? ""),
    description: String(formData.get("description") ?? ""),
  };

  const fieldErrors = validateContactForm(input);
  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors };
  }

  // TODO: Connect to email service (Resend / Nodemailer / EmailJS)
  // For now, log to console and show success state.
  console.log("[contact] New inquiry:", {
    from: `${input.name} <${input.email}>`,
    company: input.company || "(none)",
    service: input.service,
    budget: input.budget,
    source: input.source || "(none)",
    description: input.description,
  });

  return { status: "success", fieldErrors: {} };
}
