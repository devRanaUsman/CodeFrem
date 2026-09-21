import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Globe2, Navigation } from "lucide-react";

export default function HeroSection() {
  return <section id="hero-section" className="reference-hero">
    <div className="hero-orbits" aria-hidden="true"><i /><i /><i /></div>
    <div className="hero-cross" aria-hidden="true">+</div>
    <div className="hero-portrait"><Image src="/images/editorial-portrait.webp" alt="" fill sizes="(max-width: 640px) 85vw, 60vw" preload /></div>
    <div className="hero-copy">
      <p className="hero-kicker">CODEFREM / INDEPENDENT DIGITAL STUDIO</p>
      <h1>DESIGN.<br /><span>DEVELOP.</span></h1>
      <p className="hero-manifesto">WE BUILD DIGITAL EXPERIENCES<br />THAT ARE USEFUL, USABLE,<br />AND <span>UNFORGETTABLE.</span></p>
      <Link className="hero-project-link" href="/contact">LET’S BUILD YOUR WEBSITE <ArrowUpRight size={16} /></Link>
    </div>
    <div className="hero-location"><div><Globe2 size={28} strokeWidth={1} /><p>BASED IN<strong>PAKISTAN</strong></p></div><div><Navigation size={27} strokeWidth={1} /><p>WORKING<strong>WORLDWIDE</strong></p></div></div>
    <Link href="/contact" className="availability-card"><span>LET’S WORK TOGETHER</span><strong>YOUR NEXT</strong><span>WEB PROJECT <i /></span></Link>
    <span className="hero-watermark" aria-hidden="true">CF</span>
  </section>;
}

