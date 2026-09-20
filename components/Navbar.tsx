"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isOutsideHero, setIsOutsideHero] = useState(false);

  const visibleRef = useRef(true);
  const outsideHeroRef = useRef(false);
  const heroBottomRef = useRef(0);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  // Close mobile drawer whenever route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const isHome = pathname === "/";

    const measureHero = () => {
      if (isHome) {
        const hero = document.getElementById("hero-section");
        heroBottomRef.current = hero ? hero.offsetTop + hero.offsetHeight : 0;
      } else {
        heroBottomRef.current = 0;
      }
    };

    const update = () => {
      tickingRef.current = false;
      const y = window.scrollY;
      const goingDown = y > lastYRef.current;
      lastYRef.current = y;

      // 1. Hide on scroll DOWN, show on scroll UP (or near the top).
      const nextVisible = !goingDown || y < 100;
      if (nextVisible !== visibleRef.current) {
        visibleRef.current = nextVisible;
        setIsVisible(nextVisible);
      }

      // 2. Colour switch:
      // On homepage: switches to white pill once scrolled past the white hero section.
      // On subpages: remains the dark glass pill near top, switches to white pill on scroll for contrast.
      const nextOutside = isHome
        ? (heroBottomRef.current > 0 && y > heroBottomRef.current - 70)
        : (y > 80);

      if (nextOutside !== outsideHeroRef.current) {
        outsideHeroRef.current = nextOutside;
        setIsOutsideHero(nextOutside);
      }
    };

    const onScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(update);
      }
    };

    measureHero();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measureHero);
    document.fonts?.ready.then(measureHero).catch(() => {});
    const remeasureT = setTimeout(measureHero, 1500);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measureHero);
      clearTimeout(remeasureT);
    };
  }, [pathname]);

  return (
    <header
      className={`fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 transition-[transform,opacity] duration-300 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "-translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      <nav
        className={`max-w-2xl mx-auto rounded-full px-6 sm:px-8 py-3 flex items-center justify-between transition-all duration-300 lg:backdrop-blur-xl ${
          isOutsideHero
            ? "bg-white/95 lg:bg-white/85 border border-black/10 text-black shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            : "bg-[#111111]/95 lg:bg-[#111111]/90 border border-white/15 text-white shadow-2xl"
        }`}
      >
        {/* Left Links */}
        <div
          className={`hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium transition-colors ${
            isOutsideHero ? "text-gray-700" : "text-gray-300"
          }`}
        >
          <Link
            href="/about"
            className={`transition-colors ${
              pathname === "/about"
                ? isOutsideHero
                  ? "text-black font-bold"
                  : "text-[#AAFF00] font-bold"
                : isOutsideHero
                ? "hover:text-black"
                : "hover:text-[#AAFF00]"
            }`}
          >
            About Us
          </Link>
          <Link
            href="/services"
            className={`transition-colors ${
              pathname.startsWith("/services")
                ? isOutsideHero
                  ? "text-black font-bold"
                  : "text-[#AAFF00] font-bold"
                : isOutsideHero
                ? "hover:text-black"
                : "hover:text-[#AAFF00]"
            }`}
          >
            Services
          </Link>
        </div>

        {/* Center Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <svg
            className={`w-4 h-4 animate-spin-slow transition-colors ${
              isOutsideHero ? "text-[#72b000]" : "text-[#AAFF00]"
            }`}
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M50 0 L55 35 L90 15 L65 45 L100 50 L65 55 L90 85 L55 65 L50 100 L45 65 L10 85 L35 55 L0 50 L35 45 L10 15 L45 35 Z" />
          </svg>
          <span
            className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
              isOutsideHero ? "text-black" : "text-white"
            }`}
          >
            Code<span className={isOutsideHero ? "text-[#72b000]" : "text-[#AAFF00]"}>Frem</span>
          </span>
        </Link>

        {/* Right Links */}
        <div
          className={`hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium transition-colors ${
            isOutsideHero ? "text-gray-700" : "text-gray-300"
          }`}
        >
          <Link
            href="/projects"
            className={`transition-colors ${
              pathname === "/projects"
                ? isOutsideHero
                  ? "text-black font-bold"
                  : "text-[#AAFF00] font-bold"
                : isOutsideHero
                ? "hover:text-black"
                : "hover:text-[#AAFF00]"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className={`transition-colors ${
              pathname === "/contact"
                ? isOutsideHero
                  ? "text-black font-bold"
                  : "text-[#AAFF00] font-bold"
                : isOutsideHero
                ? "hover:text-black"
                : "hover:text-[#AAFF00]"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-1 transition-colors ${
              isOutsideHero ? "text-gray-800 hover:text-black" : "text-gray-300 hover:text-white"
            }`}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div
          className={`md:hidden mt-3 max-w-xs mx-auto rounded-2xl p-4 shadow-2xl flex flex-col space-y-3 text-center transition-all ${
            isOutsideHero
              ? "bg-white/98 border border-black/10 text-black"
              : "bg-[#111111]/98 border border-white/10 text-white"
          }`}
        >
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className={`text-sm py-1 font-medium transition-colors ${
              pathname === "/about"
                ? isOutsideHero ? "text-black font-bold" : "text-[#AAFF00] font-bold"
                : "hover:text-[#AAFF00]"
            }`}
          >
            About Us
          </Link>
          <Link
            href="/services"
            onClick={() => setIsOpen(false)}
            className={`text-sm py-1 font-medium transition-colors ${
              pathname === "/services"
                ? isOutsideHero ? "text-black font-bold" : "text-[#AAFF00] font-bold"
                : "hover:text-[#AAFF00]"
            }`}
          >
            Services
          </Link>
          <Link
            href="/projects"
            onClick={() => setIsOpen(false)}
            className={`text-sm py-1 font-medium transition-colors ${
              pathname === "/projects"
                ? isOutsideHero ? "text-black font-bold" : "text-[#AAFF00] font-bold"
                : "hover:text-[#AAFF00]"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className={`text-sm py-1 font-medium transition-colors ${
              pathname === "/contact"
                ? isOutsideHero ? "text-black font-bold" : "text-[#AAFF00] font-bold"
                : "hover:text-[#AAFF00]"
            }`}
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
