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
 * card and social links. Server component: only the copy button is a
 * client island.
 */
export default function ContactInfoCards() {
  return (
    <div className="space-y-5">
      {/* A - Direct contact */}
      <GlowCard className="p-6 sm:p-7">
        <h3 className="text-xl font-sans text-ink">
          Prefer to reach out directly?
        </h3>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex-1 truncate text-sm font-semibold text-accent-ink hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          <CopyEmailButton email={CONTACT_EMAIL} />
        </div>
        <ul className="mt-4 space-y-2.5 text-sm text-muted">
          <li className="flex items-center gap-2.5">
            <MapPin className="h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
            Lahore, Pakistan · GMT+5
          </li>
          <li className="flex items-center gap-2.5">
            <Clock className="h-4 w-4 shrink-0 text-accent-ink" aria-hidden="true" />
            Mon-Fri, 10am-7pm PKT
          </li>
        </ul>
      </GlowCard>



      {/* C - Socials */}
      <GlowCard className="p-6 sm:p-7">
        <h3 className="text-xl font-sans text-ink">Find us online</h3>
        <ul className="mt-4 space-y-2.5">
          {SOCIALS.map(({ label, handle, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-[#AFF45D]/40"
              >
                <Icon
                  className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent-ink"
                  aria-hidden="true"
                />
                <span className="flex-1 text-sm font-semibold text-ink">
                  {label}
                </span>
                <span className="text-xs text-muted group-hover:text-muted">
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


