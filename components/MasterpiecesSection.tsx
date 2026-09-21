"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export default function MasterpiecesSection() {
  return (
    <section id="about" className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-canvas text-ink">
      <div className="max-w-7xl mx-auto">
        {/* Header with Title and Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-ink">
              <Sparkles className="w-4 h-4" />
              <span>Who We Are</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-sans text-ink tracking-tight leading-tight">
              Turning Ideas Into <br />
              <span className="not-italic text-ink">Masterpieces</span>
            </h2>
          </div>

          <div className="lg:col-span-6 flex items-center lg:pt-8">
            <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xl">
              We may be a compact team, but our creativity knows no bounds. By staying agile and working hand-in-hand with our clients, we transform ideas into cutting-edge designs that make a lasting impression on the digital landscape.
            </p>
          </div>
        </div>

        {/* Gallery / Image Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Visual Card with Lime Overlay Tag */}
          <div className="md:col-span-7 relative group rounded-xl overflow-hidden border border-line bg-surface min-h-[360px] md:min-h-[440px] flex items-end p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

            {/* Simulated Agency Environment Graphic */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-40 transition-opacity">
              <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center">
                <span className="text-8xl font-black text-ink/5 select-none">Codefrem</span>
              </div>
            </div>

            {/* Bottom Content & Tag */}
            <div className="relative z-20 w-full space-y-3">
              <div className="inline-block bg-[#AFF45D] text-black font-extrabold text-xs sm:text-sm px-4 py-1.5 rounded-sm tracking-wider uppercase shadow-sm">
                A Creative Design Agency
              </div>
              <p className="text-muted text-xs sm:text-sm max-w-md">
                Blending deep engineering logic with avant-garde aesthetics to scale next-generation digital products.
              </p>
            </div>
          </div>

          {/* Right Showcase Card */}
          <div className="md:col-span-5 relative rounded-xl overflow-hidden border border-line bg-surface min-h-[360px] md:min-h-[440px] flex flex-col justify-between p-6 sm:p-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-surface border border-line flex items-center justify-center text-accent-ink">
                ✦
              </div>
              <h3 className="text-2xl font-sans text-ink">
                Engineered for High Performance
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                Every project is crafted using ultra-fast Next.js architecture, WebGL pipelines, and fluid motion design that captivates without throttling device batteries.
              </p>
            </div>

            <div className="pt-6 border-t border-line flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-muted font-semibold">
                Bespoke Architecture
              </span>
              <span className="text-xs text-accent-ink font-mono font-medium">
                0ms Latency
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


