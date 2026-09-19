import React from "react";
import Reveal from "./Reveal";

export interface Stat {
  value: string;
  label: string;
}

/**
 * The homepage stat strip, made reusable: dark rounded card with the lime
 * left accent border, big bold values over micro uppercase labels, divided
 * grid. Feed it any stats; the homepage keeps its own instance via this
 * component. Server component.
 */
export default function StatBlock({
  stats,
  className = "bg-[#111111] lg:bg-[#111111]/90 lg:backdrop-blur-xl",
}: {
  stats: Stat[];
  className?: string;
}) {
  return (
    <Reveal className="max-w-6xl mx-auto rounded-3xl border border-[#2A2A2A] border-l-4 border-l-[#AAFF00] p-6 sm:p-10 shadow-2xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#222222]">
        {stats.map((stat, index) => (
          <div
            key={`${stat.label}-${index}`}
            className={`flex flex-col items-center md:items-start text-center md:text-left ${
              index !== 0 ? "pt-4 md:pt-0 md:pl-8" : ""
            }`}
          >
            <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-sans">
              {stat.value}
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-400 mt-2 tracking-wide uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
