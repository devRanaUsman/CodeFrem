"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Star } from "lucide-react";

// Dynamically import Spline WebGL (strictly client-side only)
const SplineRobot = dynamic(() => import("./SplineRobot"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full max-w-[440px] h-[360px] flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="w-10 h-10 border-3 border-[#AAFF00] border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  ),
});

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="w-full min-h-screen lg:h-screen lg:max-h-[960px] bg-white text-[#111111] rounded-b-[40px] sm:rounded-b-[56px] px-4 sm:px-8 lg:px-12 flex flex-col justify-between pt-12 sm:pt-14 pb-5 relative shadow-2xl overflow-hidden"
    >
      {/* Decorative Lime Starburst Flower on Left */}
      <div className="absolute top-20 left-6 sm:left-10 lg:left-16 text-[#AAFF00] pointer-events-none select-none">
        <svg className="w-12 h-12 sm:w-16 sm:h-16 animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 0 L55 35 L90 15 L65 45 L100 50 L65 55 L90 85 L55 65 L50 100 L45 65 L10 85 L35 55 L0 50 L35 45 L10 15 L45 35 Z" />
        </svg>
      </div>

      {/* Main Center Hero Area (Fits all in 1 Screen View) */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between my-auto relative z-10 py-2">
        {/* 1. Main Heading (Fixed in place) */}
        <div className="text-center max-w-4xl mx-auto relative z-20 top-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#111111] leading-[1.12]">
            Empowering Brands <br />
            <span className="inline-flex items-center gap-2 sm:gap-3">
              Through Creative Solutions
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-[#88CC00] inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
              </svg>
            </span>
          </h1>
        </div>

        {/* 2. Middle Grid: Left Text + Center Robot & Circle (Centered) + Right Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-4 relative my-auto">
          {/* Left Column */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-3 order-2 lg:order-1 z-20">
            <div className="text-[#88CC00] hidden lg:block">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
            <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed max-w-[260px]">
              From web development to branding, we deliver innovative strategies that elevate your brand and drive growth. Let&apos;s create something exceptional together.
            </p>
            <a
              href="#services"
              className="inline-flex items-center px-5 py-2 rounded-full border border-gray-300 hover:border-black text-xs font-semibold text-gray-800 hover:text-black transition-all hover:bg-black/5"
            >
              Innovate Your Brand
            </a>
          </div>

          {/* Center Column: 🤖 Robot and Circle exactly centered between Heading and Buttons */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative order-1 lg:order-2 z-10 my-auto">
            {/* Subtle Circular Outline centered behind the Robot */}
            <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-gray-200/90 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

            {/* Curly Doodle Arrow pointing to Robot */}
            <div className="absolute -left-2 sm:left-2 top-1/2 -translate-y-1/2 hidden md:block text-gray-400 pointer-events-none">
              <svg className="w-12 h-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M25,20 C10,45 10,65 25,80 C35,90 55,85 45,70 C40,60 25,65 30,75" strokeDasharray="3 3" />
                <path d="M28,68 L32,77 L22,78" />
              </svg>
            </div>

            {/* The 3D Robot Canvas - Vertically balanced */}
            <div className="relative z-10 w-full max-w-[420px] h-[340px] sm:h-[370px] flex items-center justify-center">
              <SplineRobot />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-end text-center lg:text-right space-y-2 order-3 z-20">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-3.5 h-3.5 fill-[#AAFF00] text-[#AAFF00]"
                />
              ))}
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[#111111]">
                10 Years
              </div>
              <div className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold mt-0.5">
                Experience
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom CTAs Capsule (Fixed in place at bottom of Hero) */}
        <div className="relative z-20 flex justify-center pb-1">
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-[#111111]/85 backdrop-blur-xl border border-white/20 shadow-2xl">
            <a
              href="#contact"
              className="px-6 sm:px-7 py-2.5 rounded-full bg-[#AAFF00] hover:bg-[#88CC00] text-black font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(170,255,0,0.3)] hover:scale-105"
            >
              Start Your Project
            </a>
            <a
              href="#contact"
              className="px-5 sm:px-6 py-2.5 rounded-full text-white hover:text-[#AAFF00] font-medium text-xs sm:text-sm transition-all"
            >
              Let&apos;s Collaborate
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
