"use client";

import React from "react";

const stats = [
  { value: "30+", label: "Project Built" },
  { value: "2000+", label: "Coding Hours" },
  { value: "3+", label: "Years Exp." },
  { value: "24/7", label: "Response Time" },
];

export default function StatsBar() {
  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-12 -mt-6  relative z-20">
      <div className="max-w-6xl mx-auto  rounded-xl bg-surface lg:bg-surface/90 lg:backdrop-blur-xl border border-line border-l-4 border-l-[#AFF45D] p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-line">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col items-center md:items-start text-center md:text-left ${
                index !== 0 ? "pt-4 md:pt-0 md:pl-8" : ""
              }`}
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink font-sans">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-medium text-muted mt-2 tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


