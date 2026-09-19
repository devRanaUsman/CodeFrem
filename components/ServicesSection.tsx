"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const servicesList = [
  {
    id: "01",
    title: "UI/UX Design",
    description: "Intuitive user journeys, design systems, and wireframes that transform user engagement into conversions.",
  },
  {
    id: "02",
    title: "Web Development",
    description: "Ultra-fast Next.js 16 full-stack web applications with bulletproof TypeScript and responsive layouts.",
  },
  {
    id: "03",
    title: "3D Designs",
    description: "Optimized 3D models, custom Spline canvas interactions, and WebGL experiences tuned for 60fps.",
  },
  {
    id: "04",
    title: "Motion Graphics",
    description: "Fluid micro-interactions, logo branding, design tokens, and cinematic animations.",
  },
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section id="services" className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#0A0A0A] text-white relative">
      <div className="max-w-7xl mx-auto relative">
        {/* Vertical Left Tag 'WHAT WE DO' matching Creatix layout */}
        <div className="hidden xl:flex absolute -left-12 top-0 bottom-0 items-start pt-4">
          <div className="bg-[#AAFF00] text-black text-[10px] font-black tracking-widest uppercase px-2.5 py-1.5 rounded-sm [writing-mode:vertical-lr] rotate-180 select-none">
            WHAT WE DO
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight flex items-center gap-3">
            <span>Our</span>
            <span className="bg-[#AAFF00] text-black px-4 py-1 rounded-full font-sans font-bold text-2xl sm:text-4xl not-italic">
              Services
            </span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-3 max-w-lg leading-relaxed">
            We offer a range of creative and digital services designed to help your brand stand out.
          </p>
        </div>

        {/* 2-Column Services Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 4 Pill Service Cards */}
          <div className="lg:col-span-7 flex flex-col space-y-3.5">
            {servicesList.map((service, index) => {
              const isActive = activeService === index;
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  className={`group cursor-pointer rounded-full border px-6 py-4 transition-all duration-300 flex items-center justify-between ${
                    isActive
                      ? "bg-[#161616] border-[#AAFF00] shadow-[0_0_20px_rgba(170,255,0,0.15)]"
                      : "bg-[#111111] border-[#222222] hover:border-gray-600 hover:bg-[#151515]"
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-xs sm:text-sm font-mono font-bold text-gray-400 group-hover:text-white">
                      {service.id}
                    </span>
                    <span className="text-sm sm:text-lg font-medium text-white group-hover:text-[#AAFF00] transition-colors">
                      {service.title}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-[#AAFF00] group-hover:text-black transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Showcase & Accent Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {/* Top Interactive Card */}
            <div className="rounded-3xl border border-[#222222] bg-[#141414] p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                  Ever wondered how design magic happens?
                </span>
                <h4 className="text-xl font-serif text-white">
                  See how we work
                </h4>
              </div>
              <div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#AAFF00] hover:underline"
                >
                  <span>Explore Process</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Bottom Accent Card in Bright Lime */}
            <div className="rounded-3xl bg-[#AAFF00] p-8 text-black flex flex-col justify-between min-h-[200px] shadow-[0_0_35px_rgba(170,255,0,0.25)]">
              <div>
                <span className="text-xs uppercase tracking-widest text-black/70 font-semibold block mb-1">
                  Looking for design experts who can bring your vision to life?
                </span>
                <h4 className="text-xl font-serif font-bold text-black">
                  Meet our expert
                </h4>
              </div>
              <div className="pt-3">
                <a
                  href="#contact"
                  className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                >
                  <ArrowUpRight className="w-4 h-4 text-[#AAFF00]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
