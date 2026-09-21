import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import FaqAccordion from "@/components/services/FaqAccordion";
import ContactFormSection from "@/components/contact/ContactFormSection";

export const metadata: Metadata = {
  title: "Contact — Codefrem",
  description:
    "Start a project with Codefrem — web development, data science, UI/UX, 3D and motion. Tell us about your project; we reply within 24 hours on weekdays.",
};

const nextSteps = [
  {
    title: "We review your brief",
    body: "Within 24 hours on weekdays, both founders read your message and discuss whether we're the right fit.",
  },
  {
    title: "You get an honest reply",
    body: "We reply with initial thoughts, questions, and a rough sense of timeline and budget — no sales pitch, no pressure.",
  },
  {
    title: "We scope it together",
    body: "If it's a fit, we hop on a short call to nail down the details and put together a proposal.",
  },
];

const faqs = [
  {
    q: "How quickly can you start on a project?",
    a: "Usually within 1–2 weeks of signing off on the project scope. We take on a limited number of projects at a time so we can give each one proper attention.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes — we work remotely with clients worldwide. Most of our communication happens over email and video calls, and we're flexible with time zones.",
  },
  {
    q: "What does your payment structure look like?",
    a: "We typically split projects into two payments: 50% upfront to begin work, 50% on delivery. For longer projects we can arrange milestone-based payments.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes — we offer a maintenance and support package for post-launch bug fixes, updates and monitoring. We can discuss this as part of your project scope.",
  },
  {
    q: "What if I don't know exactly what I need?",
    a: "That's completely fine — most clients don't. Tell us the problem you're trying to solve and your budget, and we'll suggest the right approach. That's what the discovery call is for.",
  },
  {
    q: "Can you sign an NDA before we talk?",
    a: "Absolutely — just mention it in your message and we'll send one over before the call.",
  },
];

export default function ContactPage() {
  return (
    <main className="bg-canvas text-ink">
      <PageHero
        eyebrow="Get In Touch"
        line1="Tell us about"
        highlight="your website"
        lead="Tell us about your project — we'll reply within 24 hours on weekdays with honest thoughts on how to get there."
      />

      {/* Trust badges — replaces the old "Expert Online 24/7" badge */}
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-3">
          {[
            "Direct Partner Access — you talk to the founders, not an account manager",
            "Reply within 24hrs on weekdays",
          ].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-2 rounded-full border border-[#AFF45D]/25 bg-surface px-4 py-2 text-[11px] font-semibold text-muted shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#AFF45D] shadow-sm" />
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Form + contact info */}
      <div className="pt-12 lg:pt-16">
        <ContactFormSection />
      </div>

      {/* What happens next */}
      <section className="w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="The Process"
            title="What happens after"
            highlight="you hit send"
            align="center"
          />
          <ProcessTimeline steps={nextSteps} />
        </div>
      </section>

      {/* FAQ */}
      <section className="w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <SectionHeading
            eyebrow="FAQ"
            title="Common"
            highlight="questions"
            align="center"
          />
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* Mini CTA — the quiet exit for people who aren't ready for the form */}
      <section className="w-full px-4 sm:px-6 lg:px-12 pb-20 lg:pb-28">
        <Reveal className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-line bg-surface px-6 py-8 text-center transition-colors duration-300 hover:border-[#AFF45D]/40 sm:px-10">
            <h2 className="text-xl sm:text-2xl font-sans text-ink">
              Still unsure? Just say hello.
            </h2>
            {/* TODO: Replace with real email address */}
            <a
              href="mailto:hello@codefrem.com"
              className="mt-2 inline-block text-sm font-semibold text-accent-ink hover:underline"
            >
              hello@codefrem.com
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}



