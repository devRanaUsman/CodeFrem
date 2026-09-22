"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const menuButton = useRef<HTMLButtonElement>(null);
  const lastScrollY = useRef(0);

  // Scroll listener: hide navbar on scroll down, reveal on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show near the top of the page
      if (currentScrollY <= 40) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Scrolling down -> hide navbar & close mobile menu
      if (currentScrollY > lastScrollY.current + 8) {
        setIsVisible(false);
        setIsOpen(false);
      }
      // Scrolling up -> show navbar
      else if (currentScrollY < lastScrollY.current - 8) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className={`studio-header ${isVisible ? "header-visible" : "header-hidden"}`}>
      <nav className="studio-nav" aria-label="Main navigation">
        {/* Left Links */}
        <div className="nav-group nav-group-left">
          <Link
            href="/about"
            className={pathname === "/about" ? "active-link" : ""}
            aria-current={pathname === "/about" ? "page" : undefined}
          >
            About Us
          </Link>
          <Link
            href="/services"
            className={pathname.startsWith("/services") ? "active-link" : ""}
            aria-current={pathname.startsWith("/services") ? "page" : undefined}
          >
            Services
          </Link>
        </div>

        {/* Center Brand */}
        <Link href="/" className="studio-brand" onClick={() => setIsOpen(false)} aria-label="Codefrem home">
          <Image src="/images/codefrem_LOGO.png" alt="" width={150} height={150} />
        </Link>

        {/* Right Links */}
        <div className="nav-group nav-group-right">
          <Link
            href="/projects"
            className={pathname.startsWith("/projects") ? "active-link" : ""}
            aria-current={pathname.startsWith("/projects") ? "page" : undefined}
          >
            Work
          </Link>
          <Link
            href="/contact"
            className={pathname === "/contact" ? "active-link" : ""}
            aria-current={pathname === "/contact" ? "page" : undefined}
          >
            Contact
          </Link>
        </div>

        {/* Mobile toggle button */}
        <button
          ref={menuButton}
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div id="mobile-navigation" className="mobile-navigation">
          <Link href="/about" onClick={() => setIsOpen(false)}>
            <span>About Us</span>
            <ArrowUpRight size={16} />
          </Link>
          <Link href="/services" onClick={() => setIsOpen(false)}>
            <span>Services</span>
            <ArrowUpRight size={16} />
          </Link>
          <Link href="/projects" onClick={() => setIsOpen(false)}>
            <span>Work</span>
            <ArrowUpRight size={16} />
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)}>
            <span>Contact</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      )}
    </header>
  );
}



