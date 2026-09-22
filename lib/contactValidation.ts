/**
 * Shared between the server action (app/contact/actions.ts) and the client
 * form (components/contact/ContactForm.tsx) so both sides validate with the
 * exact same rules.
 */

export interface ContactFormInput {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  source: string;
  description: string;
}

export type ContactFieldErrors = Partial<
  Record<"name" | "email" | "service" | "budget" | "description", string>
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(
  input: ContactFormInput
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  if (!input.name.trim()) errors.name = "Please tell us your name.";
  if (!input.email.trim()) {
    errors.email = "We need an email to reply to.";
  } else if (!EMAIL_RE.test(input.email.trim())) {
    errors.email = "That email doesn't look right.";
  }
  if (!input.service)
    errors.service = "Pick the closest service, or 'Not sure yet'.";
  if (!input.budget) errors.budget = "A rough range is enough.";
  if (input.description.trim().length < 20) {
    errors.description =
      "Give us a couple of sentences: the problem, not the solution.";
  }
  return errors;
}

export const SERVICE_OPTIONS = [
  { value: "web-development", label: "Web Development" },
  { value: "data-science", label: "Data Science & Analytics" },
  { value: "ui-ux", label: "UI/UX Design" },
  { value: "3d-motion", label: "3D & Motion Design" },
  { value: "not-sure", label: "Not sure yet, let's talk" },
];

export const BUDGET_OPTIONS = [
  { value: "under-500", label: "Under $500" },
  { value: "500-1000", label: "$500 - $1,000" },
  { value: "1000-3000", label: "$1,000 - $3,000" },
  { value: "3000-5000", label: "$3,000 - $5,000" },
  { value: "5000-plus", label: "$5,000+" },
];

export const SOURCE_OPTIONS = [
  { value: "google", label: "Google Search" },
  { value: "social", label: "Social Media" },
  { value: "referral", label: "Referral from someone" },
  { value: "direct", label: "Direct / Typed the URL" },
  { value: "other", label: "Other" },
];
