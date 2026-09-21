"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const links = [{ href: "/services", label: "Services" }, { href: "/projects", label: "Work" }, { href: "/about", label: "About" }];
export default function Navbar() {
  const pathname = usePathname();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const isOpen = openPath === pathname;
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpenPath(null); menuButton.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);
  return <header className="studio-header">
    <nav className="studio-container studio-nav" aria-label="Main navigation">
      <Link href="/" className="studio-logo" onClick={() => setOpenPath(null)} aria-label="Codefrem home"><svg className="brand-mark" viewBox="0 0 40 48" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 5 20 20 36 5v38L20 28 4 43V5Z"/><path d="m9 15 22 23V15L9 38V15Z"/></svg><span className="brand-word">Codefrem / Web Design & Development</span></Link>
      <div className="desktop-links">{links.map(link => <Link key={link.href} href={link.href} aria-current={pathname.startsWith(link.href) ? "page" : undefined}>{link.label}</Link>)}</div>
      <Link href="/contact" className="nav-contact">Let’s talk <ArrowUpRight size={16} /></Link>
      <span className="header-edition">2026 PORTFOLIO <i /></span><button ref={menuButton} className="mobile-toggle" onClick={() => setOpenPath(isOpen ? null : pathname)} aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? "Close navigation" : "Open navigation"}>{isOpen ? <X /> : <Menu />}</button>
    </nav>
    {isOpen && <div id="mobile-navigation" className="mobile-navigation">{[...links, { href: "/contact", label: "Contact" }].map(link => <Link key={link.href} href={link.href} onClick={() => setOpenPath(null)}>{link.label}<ArrowUpRight size={16} /></Link>)}</div>}
  </header>;
}



