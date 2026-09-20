import React from "react";
import { AtSign, Calendar, Clock, Globe, MapPin, Send } from "lucide-react";
import GlowCard from "@/components/ui/GlowCard";
import CopyEmailButton from "@/components/contact/CopyEmailButton";

// TODO: Replace with real email address
const CONTACT_EMAIL = "hello@codefrem.com";

// TODO: Replace with real social URLs
const SOCIALS = [
  { label: "Twitter/X", handle: "@codefrem", href: "https://twitter.com", icon: AtSign },
  { label: "LinkedIn", handle: "/company/codefrem", href: "https://linkedin.com", icon: Globe },
  { label: "Dribbble", handle: "@codefrem", href: "https://dribbble.com", icon: Send },
];

/**
 * Right column of the /contact page: direct contact details, the booking
 * card and social links. Server component — only the copy button is a
 * client island.
 */
export default function ContactInfoCards() {
  return (
    <div className="space-y-5">
      {/* A — Direct contact */}
      <GlowCard className="p-6 sm:p-7">
        <h3 className="text-xl font-serif text-white">
          Prefer to reach out directly?
        </h3>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/5 bg-[#161616] px-4 py-3">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex-1 truncate text-sm font-semibold text-[#AAFF00] hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          <CopyEmailButton email={CONTACT_EMAIL} />
        </div>
        <ul className="mt-4 space-y-2.5 text-sm text-gray-400">
          <li className="flex items-center gap-2.5">
            <MapPin className="h-4 w-4 shrink-0 text-[#AAFF00]" aria-hidden="true" />
            Lahore, Pakistan · GMT+5
          </li>
          <li className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 shrink-0 text-[#AAFF00]" aria-hidden="true" />
            Mon–Fri, 10am–7pm PKT
          </li>
        </ul>
      </GlowCard>

      {/* B — Book a call */}
      <GlowCard className="p-6 sm:p-7">
        <h3 className="text-xl font-serif text-white">Prefer to talk first?</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-400">
          Book a free 30-minute discovery call with one of the founders.
        </p>
        <a
          // TODO: Replace # with Calendly or Cal.com link when set up
          href="#"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:border-[#AAFF00] hover:text-[#AAFF00]"
        >
          <Calendar className="h-4 w-4" aria-hidden="true" />
          Book a Call
        </a>
        <p className="mt-3 text-xs text-gray-500">
          No commitment. Just a conversation.
        </p>
      </GlowCard>

      {/* C — Socials */}
      <GlowCard className="p-6 sm:p-7">
        <h3 className="text-xl font-serif text-white">Find us online</h3>
        <ul className="mt-4 space-y-2.5">
          {SOCIALS.map(({ label, handle, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-white/5 bg-[#161616] px-4 py-3 transition-colors hover:border-[#AAFF00]/40"
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-gray-400 transition-colors group-hover:text-[#AAFF00]"
                  aria-hidden="true"
                />
                <span className="flex-1 text-sm font-semibold text-white">
                  {label}
                </span>
                <span className="text-xs text-gray-500 group-hover:text-gray-400">
                  {handle}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </GlowCard>
    </div>
  );
}
