"use client";

import React from "react";

const tags = [
  "UX Design",
  "App Design",
  "Dashboard",
  "Wireframe",
  "User Research",
  "3D Spline Interactive",
  "Brand Identity",
  "Motion Design",
  "Next.js Architecture",
];

export default function PortfolioTags() {
  return (
    <section id="projects" className="w-full py-10 bg-[#0A0A0A] border-b border-[#222222] overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center gap-3 md:gap-4 flex-nowrap md:flex-wrap justify-start md:justify-center">
          {tags.map((tag, index) => (
            <button
              key={index}
              className="whitespace-nowrap px-6 py-2.5 rounded-full border border-[#2A2A2A] bg-[#111111] text-gray-300 hover:text-black hover:bg-[#AAFF00] hover:border-[#AAFF00] text-xs sm:text-sm font-semibold transition-all duration-200 hover:scale-105 shadow-sm"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
