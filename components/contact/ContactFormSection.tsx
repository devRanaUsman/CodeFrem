import React from "react";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfoCards from "@/components/contact/ContactInfoCards";

/**
 * Main content of /contact: the form (left, ~60%) and the direct-contact /
 * booking / social cards (right, ~40%). Stacks to a single column on
 * mobile with the form first. Server component.
 */
export default function ContactFormSection() {
  return (
    <section className="w-full pb-16 lg:pb-24 px-4 sm:px-6 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
        <Reveal className="lg:col-span-3">
          <ContactForm />
        </Reveal>
        <Reveal delay={120} className="lg:col-span-2">
          <ContactInfoCards />
        </Reveal>
      </div>
    </section>
  );
}
