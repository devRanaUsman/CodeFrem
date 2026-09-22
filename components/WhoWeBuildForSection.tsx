"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, TrendingUp, Briefcase, ShoppingCart, Rocket, LucideIcon } from "lucide-react";

interface TargetCard {
  number: string;
  title: string;
  icon: LucideIcon;
}

const targetCards: TargetCard[] = [
  {
    number: "01",
    title: "Growing Businesses",
    icon: TrendingUp,
  },
  {
    number: "02",
    title: "Service-based businesses",
    icon: Briefcase,
  },
  {
    number: "03",
    title: "E-commerce Stores",
    icon: ShoppingCart,
  },
  {
    number: "04",
    title: "Startups & Founders",
    icon: Rocket,
  },
];

export default function WhoWeBuildForSection() {
  return (
    <section id="who-we-build-for" className="home-section relative overflow-hidden py-8 lg:py-16">
      {/* Subtle decorative background contours (bottom left) */}
      <svg
        className="absolute -bottom-6 -left-10 w-72 h-44 pointer-events-none opacity-20 hidden sm:block"
        viewBox="0 0 240 140"
        fill="none"
        aria-hidden="true"
      >
        <path d="M-30 140 C 30 100, 90 125, 170 80 C 200 60, 220 70, 250 45" stroke="#A0E34F" strokeWidth="1.2" />
        <path d="M-30 120 C 30 85, 100 110, 180 65 C 210 48, 230 55, 250 30" stroke="#A0E34F" strokeWidth="1" />
        <path d="M-30 100 C 40 70, 110 95, 190 50 C 220 35, 235 40, 250 15" stroke="#A0E34F" strokeWidth="0.8" />
        <path d="M-30 80 C 50 55, 120 80, 200 35 C 230 20, 240 25, 250 0" stroke="#A0E34F" strokeWidth="0.6" />
      </svg>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Heading, Copy, CTA */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5 text-[11px] font-mono tracking-widest uppercase text-muted font-medium">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#A0E34F] shadow-[0_0_8px_#A0E34F]" />
            <span>WHO WE BUILD FOR</span>
          </div>

          {/* Large Display Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-[58px] font-black text-ink uppercase tracking-tight leading-[1.02] mt-4 mb-6">
            WHO WE<br />
            <span className="text-[#A0E34F]">BUILD FOR</span>
          </h2>

          {/* Body Copy (ordered to match cards 01 -> 02 -> 03 -> 04) */}
          <div className="space-y-4 text-[13.5px] sm:text-[14.5px] leading-relaxed text-muted max-w-xl">
            <p>
              Codefrem builds custom software for businesses that have outgrown standard tools and need systems built around their operations. We work with growing businesses moving beyond template websites, off-the-shelf limits, and restrictive setups.
            </p>

            <p>
              For service-based businesses, including agencies, consultancies, and professional firms selling expertise rather than product, we build client portals and operational software that replace manual spreadsheets, scattered emails, and ad hoc workarounds.
            </p>

            <p>
              We also build for stores reaching the limits of hosted e-commerce platforms. Custom software can connect business workflows, customer experiences, data, and third-party services in one unified system.
            </p>

            <p>
              For startups and early-stage founders developing their first product, our development team scopes each project around required features, integrations, and long-term needs. This keeps the build focused on what the business actually needs rather than adding unnecessary features.
            </p>
          </div>

          {/* CTA Link */}
          <div className="pt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 group text-ink transition-colors"
            >
              <span className="w-9 h-9 rounded-full border border-[#A0E34F] bg-[#A0E34F]/10 flex items-center justify-center text-[#2d500e] group-hover:bg-[#A0E34F] group-hover:text-ink transition-all duration-300 shadow-[0_0_12px_rgba(160,227,79,0.2)]">
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </span>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-ink group-hover:text-[#49701e] transition-colors">
                LET&apos;S BUILD YOUR SOLUTION
              </span>
              <ArrowUpRight size={15} className="text-muted group-hover:text-[#49701e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </Link>
          </div>
        </div>

        {/* Right Column: 2x2 Cards with Center Orbital Star Emblem */}
        <div className="lg:col-span-6 relative flex items-center justify-center py-6 sm:py-10">
          {/* Orbital Concentric Background Rings and Radial Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            {/* Center ambient glow */}
            <div className="absolute w-72 h-72 rounded-full bg-[#A0E34F]/12 blur-3xl" />

            {/* Orbit SVG with rings, radial dashed lines, and accent dots */}
            <svg
              className="w-full h-full max-w-[540px] max-h-[540px] overflow-visible"
              viewBox="0 0 500 500"
              fill="none"
            >
              {/* Concentric rings */}
              <circle cx="250" cy="250" r="95" stroke="#A0E34F" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 4" />
              <circle cx="250" cy="250" r="150" stroke="#A0E34F" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="5 5" />
              <circle cx="250" cy="250" r="215" stroke="#A0E34F" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="6 6" />

              {/* Diagonal connecting rays towards the 4 card quadrants */}
              <line x1="250" y1="250" x2="110" y2="110" stroke="#A0E34F" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
              <line x1="250" y1="250" x2="390" y2="110" stroke="#A0E34F" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
              <line x1="250" y1="250" x2="110" y2="390" stroke="#A0E34F" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />
              <line x1="250" y1="250" x2="390" y2="390" stroke="#A0E34F" strokeWidth="1" strokeOpacity="0.3" strokeDasharray="4 4" />

              {/* Orbital Nodes / Dots along the rings */}
              <circle cx="250" cy="100" r="3.5" fill="#A0E34F" className="filter drop-shadow-[0_0_4px_#A0E34F]" />
              <circle cx="250" cy="400" r="3.5" fill="#A0E34F" className="filter drop-shadow-[0_0_4px_#A0E34F]" />
              <circle cx="100" cy="250" r="3.5" fill="#A0E34F" className="filter drop-shadow-[0_0_4px_#A0E34F]" />
              <circle cx="400" cy="250" r="3.5" fill="#A0E34F" className="filter drop-shadow-[0_0_4px_#A0E34F]" />

              <circle cx="178" cy="178" r="3" fill="#A0E34F" />
              <circle cx="322" cy="178" r="3" fill="#A0E34F" />
              <circle cx="178" cy="322" r="3" fill="#A0E34F" />
              <circle cx="322" cy="322" r="3" fill="#A0E34F" />

              <circle cx="155" cy="305" r="2.5" fill="#A0E34F" opacity="0.8" />
              <circle cx="345" cy="195" r="2.5" fill="#A0E34F" opacity="0.8" />
            </svg>
          </div>

          {/* Central Glowing Green Orb with Codefrem Brand Star */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
            {/* Outer translucent glossy ring */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/80 backdrop-blur-md border border-white/95 shadow-[0_12px_36px_rgba(160,227,79,0.35)] flex items-center justify-center transition-transform duration-300">
              {/* Intermediate pale-green ring */}
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full border border-[#A0E34F]/40 bg-[#A0E34F]/15 flex items-center justify-center">
                {/* Core vibrant lime button */}
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full bg-[#A0E34F] flex items-center justify-center shadow-[0_0_24px_rgba(160,227,79,0.7)]">
                  {/* Codefrem Brand Star in clean white */}
                  <svg
                    className="w-7 h-7 filter drop-shadow-[0_0_3px_rgba(255,255,255,0.7)]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <line x1="12" y1="2" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <line x1="4.9" y1="4.9" x2="19.1" y2="19.1" />
                    <line x1="19.1" y1="4.9" x2="4.9" y2="19.1" />
                    <circle cx="12" cy="12" r="2.3" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 2x2 Grid of Segments */}
          <div className="w-full grid grid-cols-2 gap-5 sm:gap-8 relative z-10">
            {targetCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.number}
                  className="group relative bg-white/95 rounded-[22px] p-5 sm:p-6 border border-white/90 shadow-[0_10px_30px_-5px_rgba(22,24,27,0.06),0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-8px_rgba(160,227,79,0.24),0_0_0_1px_rgba(160,227,79,0.5)] hover:-translate-y-1 transition-all duration-300 ease-out backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    {/* Icon inside circular light-green badge */}
                    <div className="w-11 h-11 rounded-full bg-[#A0E34F]/15 border border-[#A0E34F]/30 flex items-center justify-center text-ink group-hover:bg-[#A0E34F]/30 group-hover:scale-105 transition-all duration-300">
                      <Icon size={20} strokeWidth={1.8} className="text-[#203a07]" />
                    </div>
                    {/* Number badge */}
                    <span className="text-xs font-mono font-bold text-[#5b8e26] tracking-wider">
                      {card.number}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="mt-4 font-bold text-ink text-[15px] sm:text-[17px] leading-snug">
                    {card.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
