"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { getLenisInstance } from "@/lib/lenis";

export default function Footer() {
  const scrollToTop = () => {
    const lenis = getLenisInstance();
    if (lenis) {
      lenis.scrollTo(0, { lerp: 0.08 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#0A0A0A] pb-12 pt-4 px-4 sm:px-6 lg:px-12">
      {/* Lime Green Card Footer matching Creatix Template */}
      <div className="max-w-6xl mx-auto rounded-[36px] bg-[#AAFF00] text-black p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Brand & Slogan */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-black" viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 0 L55 35 L90 15 L65 45 L100 50 L65 55 L90 85 L55 65 L50 100 L45 65 L10 85 L35 55 L0 50 L35 45 L10 15 L45 35 Z" />
              </svg>
              <span className="text-3xl font-extrabold tracking-tight text-black font-serif">
                Codefrem
              </span>
            </div>
            <p className="text-black/80 text-xs sm:text-sm max-w-sm font-medium">
              Empowering global visionary brands through creative 3D solutions, performant Next.js engineering, and memorable experiences.
            </p>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm font-semibold">
            <div className="space-y-3">
              <span className="text-black/50 uppercase tracking-widest text-[11px] block font-bold">
                Company
              </span>
              <ul className="space-y-2">
                <li><Link href="#about" className="hover:underline">About Us</Link></li>
                <li><Link href="#about" className="hover:underline">Our Team</Link></li>
                <li><Link href="#contact" className="hover:underline">Careers</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-black/50 uppercase tracking-widest text-[11px] block font-bold">
                Services
              </span>
              <ul className="space-y-2">
                <li><Link href="#services" className="hover:underline">UI/UX Design</Link></li>
                <li><Link href="#services" className="hover:underline">Web Development</Link></li>
                <li><Link href="#services" className="hover:underline">3D Spline</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-black/50 uppercase tracking-widest text-[11px] block font-bold">
                Connect
              </span>
              <ul className="space-y-2">
                <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:underline">Twitter/X</a></li>
                <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:underline">LinkedIn</a></li>
                <li><a href="https://dribbble.com" target="_blank" rel="noreferrer" className="hover:underline">Dribbble</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Divider & Copyright */}
        <div className="pt-6 border-t border-black/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-black/80">
          <span>© {new Date().getFullYear()} Codefrem. All rights reserved.</span>
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-black text-[#AAFF00] flex items-center justify-center hover:scale-110 transition-transform shadow-md"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
