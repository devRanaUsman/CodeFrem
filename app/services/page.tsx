import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import TagPill from "@/components/ui/TagPill";
import Footer from "@/components/Footer";
import CtaFooter from "@/components/ui/CtaFooter";

export const metadata: Metadata = {
  title: "Services — Codefrem",
  description:
    "UI/UX design, full-stack Next.js development, Spline 3D experiences and motion graphics — engineered end-to-end by a two-person studio.",
};

interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  includes: string[];
  tools: string[];
}

const services: Service[] = [
  {
    id: "01",
    title: "UI/UX Design",
    tagline: "Interfaces that feel obvious in hindsight.",
    description:
      "Intuitive user journeys, design systems, and wireframes that transform user engagement into conversions. We design the flow first, the pixels second.",
    includes: [
      "UX research & user flows",
      "Wireframes & high-fidelity UI",
      "Scalable design systems",
      "Interactive prototypes",
      "Accessibility (WCAG AA)",
    ],
    tools: ["Figma", "FigJam", "Maze", "Storybook"],
  },
  {
    id: "02",
    title: "Web Development",
    tagline: "Fast, typed, and boringly reliable.",
    description:
      "Ultra-fast Next.js full-stack web applications with bulletproof TypeScript and responsive layouts. Static-first, edge-ready, measurable.",
    includes: [
      "Next.js App Router builds",
      "TypeScript end-to-end",
      "CMS & e-commerce integrations",
      "Performance budgets (Core Web Vitals)",
      "SEO & analytics wiring",
    ],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Sanity"],
  },
  {
    id: "03",
    title: "3D Designs",
    tagline: "Spline scenes that run at 60fps — on phones.",
    description:
      "Optimized 3D models, custom Spline canvas interactions, and WebGL experiences tuned for 60fps. Hero moments that don't melt batteries.",
    includes: [
      "Spline scene design & build",
      "Custom WebGL interactions",
      "3D product configurators",
      "Performance tiers (low-end fallbacks)",
      "Scene loading choreography",
    ],
    tools: ["Spline", "Three.js", "Blender", "WebGL"],
  },
  {
    id: "04",
    title: "Motion Graphics",
    tagline: "Motion with intent, never decoration.",
    description:
      "Fluid micro-interactions, logo branding, design tokens, and cinematic animations. Every animation has a job: guide, reward, or explain.",
    includes: [
      "Micro-interaction systems",
      "Scroll-driven storytelling",
      "Logo & brand animation",
      "Lottie/After Effects production",
      "Reduced-motion fallbacks",
    ],
    tools: ["GSAP", "After Effects", "Lottie", "Framer Motion"],
  },
];

const process = [
  {
    step: "Discover",
    body: "Goals, users, constraints. We map the problem before touching a pixel — and define what 'working' means in numbers.",
  },
  {
    step: "Design",
    body: "Flows, prototypes, visual language. You see clickable work early and often; feedback shapes the build, not a post-mortem.",
  },
  {
    step: "Build",
    body: "Typed, tested, componentized code with performance budgets enforced from commit one. Weekly demos, no surprises.",
  },
  {
    step: "Launch",
    body: "Analytics, SEO, monitoring, handover docs. Then we stay around — iteration after launch is where products actually grow.",
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      <PageHero
        eyebrow="What We Do"
        line1="Design, engineering and 3D —"
        highlight="end-to-end"
        lead="Four disciplines, one team, zero hand-offs. Every service below is delivered by the founders themselves, from first wireframe to production deploy."
      />

      {/* Service sections */}
      <section className="w-full py-10 lg:py-16 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
          {services.map((service, index) => (
            <Reveal key={service.id} delay={index * 60}>
              <GlowCard className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-8 sm:p-10 lg:p-12">
                {/* Left: identity */}
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-4">
                    <span className="text-xs sm:text-sm font-mono font-bold text-[#AAFF00]">
                      {service.id}
                    </span>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>
                  <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-serif text-white">
                    {service.title}
                  </h2>
                  <p className="mt-2 text-sm text-[#AAFF00] font-medium">
                    {service.tagline}
                  </p>
                  <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tools.map((tool) => (
                      <TagPill key={tool}>{tool}</TagPill>
                    ))}
                  </div>
                </div>

                {/* Right: what's included */}
                <div className="lg:col-span-7">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                    What&apos;s included
                  </span>
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-white/5 bg-[#0F0F0F] px-4 py-3.5 text-sm text-gray-300"
                      >
                        <span className="mt-0.5 text-[#AAFF00]">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#AAFF00] hover:underline"
                  >
                    <span>Discuss this service</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process timeline — stats-strip styling */}
      <section className="w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="How It Works"
            title="The"
            highlight="Process"
            align="center"
          />
          <Reveal className="rounded-3xl border border-[#2A2A2A] border-l-4 border-l-[#AAFF00] bg-[#111111] p-6 sm:p-10 shadow-2xl -mt-2">
            <ol className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#222222]">
              {process.map((phase, index) => (
                <li
                  key={phase.step}
                  className={`flex flex-col ${index !== 0 ? "pt-6 md:pt-0 md:pl-8" : ""}`}
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#AAFF00]">
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-2 text-2xl font-extrabold tracking-tight text-white font-sans">
                    {phase.step}
                  </span>
                  <span className="mt-2 text-xs sm:text-sm font-medium text-gray-400 leading-relaxed">
                    {phase.body}
                  </span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
      <Footer />
      {/* <CtaFooter title="Have a project in one of these lanes?" label="Get a Quote" /> */}
    </main>
  );
}
