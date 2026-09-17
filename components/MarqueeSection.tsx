"use client";

import React from "react";

export default function MarqueeSection() {
  const words = [
    { text: "Innovate", hasPlus: true },
    { text: "Inspire", hasPlus: true },
    { text: "Create", hasPlus: false, hasStar: true },
  ];

  return (
    <section className="w-full py-12 md:py-16 bg-[#0A0A0A] border-y border-[#222222] overflow-hidden select-none">
      <div className="flex w-max animate-marquee">
        {/* Repeating Block 1 */}
        <div className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
                Innovate
              </span>
              <span className="text-4xl sm:text-6xl md:text-7xl font-light text-[#AAFF00]">
                +
              </span>
              <span className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
                Inspire
              </span>
              <span className="text-4xl sm:text-6xl md:text-7xl font-light text-[#AAFF00]">
                +
              </span>
              <span className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
                Create
              </span>
              <span className="text-3xl sm:text-5xl text-[#AAFF00]">
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Repeating Block 2 for seamless loop */}
        <div className="flex items-center gap-8 sm:gap-12 shrink-0 pr-8 sm:pr-12" aria-hidden="true">
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={`dup-${i}`}>
              <span className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
                Innovate
              </span>
              <span className="text-4xl sm:text-6xl md:text-7xl font-light text-[#AAFF00]">
                +
              </span>
              <span className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
                Inspire
              </span>
              <span className="text-4xl sm:text-6xl md:text-7xl font-light text-[#AAFF00]">
                +
              </span>
              <span className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white">
                Create
              </span>
              <span className="text-3xl sm:text-5xl text-[#AAFF00]">
                ✦
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
