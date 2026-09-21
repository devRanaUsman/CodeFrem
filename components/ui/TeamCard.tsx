import React from "react";
import GlowCard from "./GlowCard";
import type { TeamMember } from "@/lib/team";

/**
 * Team member card for the /about grid. If `avatar` is set it renders the
 * photo; otherwise a lime-on-dark monogram tile in the site's card style.
 * Server component.
 */
export default function TeamCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <GlowCard className="flex flex-col min-h-[300px] p-8">
      <div className="flex items-center gap-4">
        {member.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={member.avatar}
            alt={member.name}
            className="w-16 h-16 rounded-2xl object-cover border border-line"
          />
        ) : (
          <div className="w-16 h-16 rounded-2xl bg-surface border border-line flex items-center justify-center text-accent-ink text-xl font-black tracking-tight">
            {initials || "✦"}
          </div>
        )}
        <div>
          <h3 className="text-xl font-sans text-ink">{member.name}</h3>
          <p className="text-xs font-bold uppercase tracking-widest text-accent-ink mt-1">
            {member.role}
          </p>
        </div>
      </div>

      <p className="mt-5 text-muted text-sm leading-relaxed">{member.bio}</p>

      {member.links && member.links.length > 0 && (
        <div className="mt-auto pt-6 flex items-center gap-4 border-t border-line">
          {member.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-bold uppercase tracking-widest text-muted hover:text-accent-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </GlowCard>
  );
}


