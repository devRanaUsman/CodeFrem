"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail("");
    }, 5000);
  };

  return (
    <section id="contact" className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-12 bg-[#0A0A0A] text-white">
      <div className="max-w-6xl mx-auto rounded-[36px] bg-[#141414] border border-[#262626] p-8 sm:p-14 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Heading & Email Submission Pill */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-tight">
              Get in Touch Today!
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-md">
              Ready to elevate your brand with bespoke 3D interactions and bleeding-edge web architecture? Let&apos;s start the conversation.
            </p>

            {submitted ? (
              <div className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#AAFF00]/15 border border-[#AAFF00] text-[#AAFF00] text-sm font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Thank you! We will reach out to you shortly.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 max-w-md">
                <div className="relative w-full">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    suppressHydrationWarning
                    className="w-full bg-[#1e1e1e] border border-[#333333] focus:border-[#AAFF00] rounded-full px-6 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto shrink-0 px-8 py-3.5 rounded-full bg-[#AAFF00] hover:bg-[#88CC00] text-black font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(170,255,0,0.3)] hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>Submit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right: Stylized Consultant Visual Icon Badge */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-3xl bg-gradient-to-tr from-zinc-800 to-zinc-900 border border-zinc-700/60 p-6 flex flex-col justify-between shadow-2xl">
              <div className="flex items-center justify-between">
                <span className="w-3 h-3 rounded-full bg-[#AAFF00] shadow-[0_0_10px_#AAFF00]" />
                <span className="text-[10px] uppercase tracking-widest text-[#AAFF00] font-mono">Expert Online</span>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-serif text-white font-bold">24/7</div>
                <div className="text-xs text-gray-400">Direct Partner Consultation</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
