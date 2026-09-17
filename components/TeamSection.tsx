"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

const teamMembers = [
  {
    name: "Alex Thorne",
    role: "Founder & Creative Director",
    desc: "12+ years pioneering cutting-edge digital experiences and brand narratives across Silicon Valley.",
  },
  {
    name: "Sophia Martinez",
    role: "Lead 3D & Spline Artist",
    desc: "Specialist in real-time WebGL interactive shaders, rigging, and lightweight web 3D assets.",
  },
  {
    name: "Daniel Vance",
    role: "Principal Systems Architect",
    desc: "Architecting zero-latency Next.js infrastructure and distributed cloud microservices.",
  },
  {
    name: "Emma Watson",
    role: "Senior UI/UX Designer",
    desc: "Designing world-class design systems with accessibility-first, conversion-driven interfaces.",
  },
  {
    name: "Liam Chen",
    role: "Motion & Brand Strategist",
    desc: "Crafting fluid micro-animations and identity frameworks that leave lasting impressions.",
  },
  {
    name: "Olivia Brooks",
    role: "Client Partner & Operations",
    desc: "Bridging creative vision with precise execution to deliver milestones ahead of schedule.",
  },
];

export default function TeamSection() {
  return (
    <section id="reviews" className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header matching Creatix design */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight flex items-center gap-3">
              <span>Meet</span>
              <span className="bg-[#AAFF00] text-black px-4 py-1 rounded-full font-sans font-bold text-2xl sm:text-4xl not-italic">
                Our Team
              </span>
            </h2>
          </div>

          <a
            href="#contact"
            className="self-start sm:self-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#161616] hover:bg-[#AAFF00] text-gray-300 hover:text-black border border-[#2A2A2A] hover:border-[#AAFF00] text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>Join Our Team</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6-Card Team Grid with White Cards (High contrast matching Creatix template) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative rounded-3xl bg-white text-black p-6 sm:p-7 shadow-xl hover:shadow-[0_15px_35px_rgba(170,255,0,0.2)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Lime Green Avatar Icon */}
                  <div className="w-10 h-10 rounded-full bg-[#AAFF00] text-black flex items-center justify-center font-mono font-bold text-xs shadow-sm">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 group-hover:bg-black group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-black group-hover:text-black transition-colors">
                  {member.name}
                </h3>
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mt-0.5">
                  {member.role}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm mt-3 leading-relaxed">
                  {member.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                <span>Codefrem Studio</span>
                <span className="text-black font-semibold">Available</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
