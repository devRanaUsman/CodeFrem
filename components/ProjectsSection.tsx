"use client";

import React, { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
// Single source of truth (lib/projects.ts) — the same data powers the
// /projects grid and every /projects/[slug] case study.
import { projects } from "@/lib/projects";

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Reduced-motion path: no pinning, no GSAP. Expose the track as a native
    // horizontal scroller and keep the progress counter in sync.
    if (prefersReducedMotion) {
      const wrapper = track.parentElement as HTMLElement;
      wrapper.style.overflowX = "auto";
      wrapper.style.scrollSnapType = "x mandatory";
      const cards = Array.from(
        track.querySelectorAll<HTMLElement>(".project-card")
      );
      cards.forEach((card) => {
        card.style.scrollSnapAlign = "center";
      });

      const onScroll = () => {
        const center = wrapper.scrollLeft + wrapper.clientWidth / 2;
        let closest = 0;
        let best = Infinity;
        cards.forEach((card, i) => {
          const mid = card.offsetLeft + card.offsetWidth / 2;
          const d = Math.abs(mid - center);
          if (d < best) {
            best = d;
            closest = i;
          }
        });
        setActiveIndex(Math.max(closest - 1, 0));
      };
      wrapper.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        wrapper.removeEventListener("scroll", onScroll);
      };
    }

    // Mobile/tablet guard: below `lg` (1024px) the cards render as a plain
    // vertical stack (pure CSS below) and ZERO JS runs here — no GSAP, no
    // ScrollTrigger, nothing fighting Lenis. That is what makes mobile scroll
    // smooth. Moving between stack ⇄ horizontal needs a reload by design:
    // tearing down a pinned ScrollTrigger mid-session shifts every section
    // below it and visibly jumps the page, which is worse than a reload.
    const isDesktopViewport = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktopViewport) {
      return;
    }

    // Desktop only from here. GSAP is dynamically imported so phones and
    // tablets never download it at all (smaller mobile bundles, faster 4G).
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled || !section || !track) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");
        const distance = () => Math.max(track.scrollWidth - window.innerWidth, 0);

        // SmoothScrollProvider (root layout) guarantees Lenis is the single
        // scroll driver, and it already animates the scrollbar value smoothly.
        // `scrub: true` frame-locks the track to that animated value; adding
        // a second smoothing layer (`scrub: 1`) makes scrolling feel laggy.
        const scrubValue = true as const;

        // Master timeline: pins the section and scrubs the track horizontally.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            pinSpacing: true,
            // Frame-locked to Lenis's animated scroll value.
            scrub: scrubValue,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        tl.to(track, {
          x: () => -distance(),
          ease: "none",
        });

        // Parallax drift on the inner visuals so cards feel layered and alive.
        cards.forEach((card, index) => {
          const visual = card.querySelector(".project-visual");
          if (!visual) return;

          gsap.fromTo(
            visual,
            { xPercent: index % 2 === 0 ? -8 : 8 },
            {
              xPercent: index % 2 === 0 ? 8 : -8,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${distance()}`,
                scrub: scrubValue,
                invalidateOnRefresh: true,
              },
            }
          );
        });

        // Active index tracking drives the progress dots (project cards only).
        gsap.utils
          .toArray<HTMLElement>(".project-card[data-project]")
          .forEach((card, index) => {
            ScrollTrigger.create({
              trigger: card,
              containerAnimation: tl,
              start: "left center",
              end: "right center",
              onToggle: (self) => {
                if (self.isActive) setActiveIndex(index);
              },
            });
          });

        // Reveal-on-enter heading animation.
        gsap.from(".projects-header > *", {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
          },
        });
      }, section);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full bg-[#0A0A0A] text-white relative z-10 flex flex-col justify-center lg:h-screen lg:overflow-hidden"
    >
      <div className="w-full lg:pl-12 px-2 sm:px-6 lg:px-12 py-16 lg:py-0">
        {/* Header */}
        <div className="projects-header mb-10 lg:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-5xl font-serif tracking-tight flex items-center gap-3">
            <span>Featured</span>
            <span className="bg-[#AAFF00] text-black px-4 py-1 rounded-full font-sans font-bold text-2xl sm:text-4xl not-italic">
              Projects
            </span>
          </h2>
        </div>

        {/* ≥lg: horizontal GSAP track. Below lg: plain vertical stack (CSS only). */}
        <div className="lg:overflow-visible">
          <div
            ref={trackRef}
            className="flex flex-col lg:flex-row gap-6 w-full lg:w-max will-change-transform lg:pr-12"
          >
            {/* Intro panel */}
            <div className="project-card shrink-0 w-full lg:w-[420px] flex flex-col justify-between rounded-3xl border border-[#222222] bg-[#111111] p-8 min-h-[300px] lg:min-h-[460px]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#AAFF00] font-bold">
                  Selected Work
                </span>
                <h3 className="mt-4 text-4xl sm:text-5xl font-serif leading-tight">
                  Work that moves the needle
                </h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-400 text-sm leading-relaxed">
                  {projects.length} flagship projects, engineered end-to-end —
                  from strategy and design systems to 3D and full-stack builds.
                </p>
                <div className="flex items-center gap-2 text-[#AAFF00]">
                  <span className="h-px w-10 bg-[#AAFF00]" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Keep scrolling
                  </span>
                </div>
              </div>
            </div>

            {/* Project cards */}
            {projects.map((project) => (
              <article
                key={project.id}
                data-project={project.id}
                className={`project-card group shrink-0 w-full lg:w-[440px] rounded-3xl border border-[#222222] bg-gradient-to-b ${project.gradient} overflow-hidden flex flex-col min-h-[420px] lg:min-h-[460px]`}
              >
                {/* Visual area */}
                <div className="project-visual relative h-[52%] min-h-[190px] overflow-hidden bg-[#0F0F0F]">
                  <div className="absolute inset-0 bg-[radial-gradient(#1E1E1E_1px,transparent_1px)] [background-size:18px_18px] opacity-60" />

                  {/* Big ghost index number */}
                  <span className="absolute top-4 right-5 text-7xl font-black text-white/[0.06] select-none">
                    {project.id}
                  </span>

                  {/* Center mark */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl font-black uppercase tracking-tight text-white/10 group-hover:text-white/15 transition-colors select-none">
                      {project.title.split(" ")[0]}
                    </span>
                  </div>

                  {/* Category pill */}
                  <div className="absolute top-4 left-5 inline-block bg-[#AAFF00] text-black text-[10px] font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full">
                    {project.category}
                  </div>
                </div>

                {/* Content area */}
                <div className="flex-1 flex flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="text-xl sm:text-2xl font-serif text-white">
                        {project.title}
                      </h3>
                      <span className="text-[10px] font-mono text-gray-500">
                        /{project.year}
                      </span>
                    </div>
                    <p className="mt-2.5 text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 border border-white/10 rounded-full px-2.5 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`/projects/${project.slug}`}
                      aria-label={`View ${project.title} case study`}
                      className="w-9 h-9 shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-[#AAFF00] group-hover:text-black group-hover:border-[#AAFF00] transition-all"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </article>
            ))}

            {/* Outro panel */}
            <div className="project-card shrink-0 w-full lg:w-[380px] flex flex-col items-start justify-center rounded-3xl bg-[#AAFF00] text-black p-8 min-h-[420px] lg:min-h-[460px] shadow-[0_0_45px_rgba(170,255,0,0.2)]">
              <span className="text-xs font-extrabold uppercase tracking-widest text-black/60">
                Like what you see?
              </span>
              <h3 className="mt-3 text-4xl font-serif font-bold leading-tight">
                Let&apos;s build your next flagship project
              </h3>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 bg-black text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-full hover:scale-105 transition-transform"
              >
                Start a Project
                <ArrowUpRight className="w-4 h-4 text-[#AAFF00]" />
              </a>
            </div>
          </div>
        </div>

        {/* Progress indicator — desktop horizontal scrub only */}
        <div className="mt-8 hidden lg:flex items-center gap-2.5">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === index
                ? "w-8 bg-[#AAFF00]"
                : "w-3 bg-white/15"
                }`}
            />
          ))}
          <span className="ml-3 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
