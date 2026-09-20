"use client";

import React, { useActionState, useMemo, useState } from "react";
import { Loader2, Send } from "lucide-react";
import ContactSelect from "@/components/contact/ContactSelect";
import {
  submitContact,
  type ContactFormState,
} from "@/app/contact/actions";
import {
  BUDGET_OPTIONS,
  SERVICE_OPTIONS,
  SOURCE_OPTIONS,
  validateContactForm,
} from "@/lib/contactValidation";

const initialState: ContactFormState = { status: "idle", fieldErrors: {} };

const inputClasses = (hasError: boolean) =>
  `w-full rounded-xl border bg-[#161616] px-4 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition-all ${
    hasError
      ? "border-red-500/70"
      : "border-[#2A2A2A] hover:border-[#3A3A3A] focus:border-[#AAFF00] focus:shadow-[0_0_18px_rgba(170,255,0,0.15)]"
  }`;

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 text-xs text-red-400" role="alert">
      {message}
    </p>
  );
}

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState
  );
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    description: "",
  });
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  // The success panel is owned by the action state, but the user can
  // dismiss it ("Send another message") — otherwise the form never
  // comes back, since a successful action state doesn't reset itself.
  const [successDismissed, setSuccessDismissed] = useState(false);

  // Live client validation only after a failed submit — before that, the
  // form stays quiet so nobody is yelled at while typing.
  const liveErrors = useMemo(
    () =>
      showErrors
        ? validateContactForm({
            ...values,
            service,
            budget,
            source: "",
          })
        : {},
    [values, service, budget, showErrors]
  );

  const errors = Object.keys(state.fieldErrors).length
    ? state.fieldErrors
    : liveErrors;

  if (state.status === "success" && !successDismissed) {
    return (
      <div
        className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-3xl border border-[#AAFF00]/30 bg-[#111111] p-8 text-center shadow-[0_0_45px_rgba(170,255,0,0.08)]"
        role="status"
      >
        <span className="grid h-16 w-16 place-items-center rounded-full border border-[#AAFF00]/40 bg-[#AAFF00]/10 text-[#AAFF00]">
          <Send className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-3xl font-serif text-white">
          Message received!
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-400">
          We&apos;ll get back to you within 24 hours on weekdays. Check your
          inbox — we&apos;ll reach out from hello@codefrem.com
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({ name: "", email: "", company: "", description: "" });
            setService("");
            setBudget("");
            setShowErrors(false);
            setSuccessDismissed(true);
          }}
          className="mt-8 text-xs font-bold uppercase tracking-wider text-[#AAFF00] hover:underline"
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      noValidate
      onSubmit={(event) => {
        // Paint inline errors immediately on a failed client-side pass.
        const form = event.currentTarget;
        if (!form.checkValidity()) setShowErrors(true);
        setSuccessDismissed(false);
      }}
      className="rounded-3xl border border-[#222222] bg-[#111111] p-6 sm:p-8 lg:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Row 1 */}
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-400"
          >
            Name <span className="text-[#AAFF00]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            aria-invalid={Boolean(errors.name)}
            className={inputClasses(Boolean(errors.name))}
          />
          <FieldError message={errors.name} />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-400"
          >
            Email <span className="text-[#AAFF00]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="your@email.com"
            value={values.email}
            onChange={(e) =>
              setValues((v) => ({ ...v, email: e.target.value }))
            }
            aria-invalid={Boolean(errors.email)}
            className={inputClasses(Boolean(errors.email))}
          />
          <FieldError message={errors.email} />
        </div>

        {/* Row 2 */}
        <div>
          <label
            htmlFor="company"
            className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-400"
          >
            Company <span className="text-gray-600">(optional)</span>
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Your business name"
            value={values.company}
            onChange={(e) =>
              setValues((v) => ({ ...v, company: e.target.value }))
            }
            className={inputClasses(false)}
          />
        </div>
        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-400">
            Service Needed <span className="text-[#AAFF00]">*</span>
          </span>
          <ContactSelect
            name="service"
            options={SERVICE_OPTIONS}
            placeholder="Select a service..."
            error={errors.service}
            required
            onChange={(value) => setService(value)}
          />
        </div>

        {/* Row 3 */}
        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-400">
            Budget Range <span className="text-[#AAFF00]">*</span>
          </span>
          <ContactSelect
            name="budget"
            options={BUDGET_OPTIONS}
            placeholder="Select a budget range..."
            error={errors.budget}
            required
            onChange={(value) => setBudget(value)}
          />
        </div>
        <div>
          <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-400">
            How did you hear about us?
            <span className="text-gray-600"> (optional)</span>
          </span>
          <ContactSelect
            name="source"
            options={SOURCE_OPTIONS}
            placeholder="Select..."
            onChange={() => {}}
          />
        </div>

        {/* Row 4 */}
        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-400"
          >
            Project Description <span className="text-[#AAFF00]">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Tell us what you're building, what problem you're trying to solve, and any deadline or timeline you have in mind..."
            value={values.description}
            onChange={(e) =>
              setValues((v) => ({ ...v, description: e.target.value }))
            }
            aria-invalid={Boolean(errors.description)}
            className={`${inputClasses(Boolean(errors.description))} resize-y`}
          />
          <FieldError message={errors.description} />
        </div>

        {/* Row 5 */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isPending}
            className="group flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#AAFF00] to-[#7ACC00] px-8 py-4 text-sm font-bold uppercase tracking-wider text-black shadow-[0_0_25px_rgba(170,255,0,0.3)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(170,255,0,0.45)] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                Send Message
                <Send
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
