import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return <main className="reference-home">
    <HeroSection />
    <div className="reference-content">
      <ServicesSection /><ProjectsSection />
      <section className="reference-process glass-panel" aria-label="Our process">{[["01","DISCOVER","YOUR VISION"],["02","DESIGN","WITH PURPOSE"],["03","DEVELOP","WITH CARE"],["04","LAUNCH","& SUPPORT"]].map(([number,line1,line2])=><div key={number}><strong>{number}<span> /</span></strong><p>{line1}<br/>{line2}</p></div>)}</section>
      <section className="home-section philosophy-section"><div className="section-label-row"><h2 className="section-label">THE WAY WE WORK</h2><Link href="/about" className="section-more">MEET THE STUDIO <ArrowRight size={17}/></Link></div>
        <div className="studio-quote glass-panel"><span className="quote-mark">“</span><p>Thoughtful, clear, and crafted with care.<br/>Good websites don’t just look beautiful.<br/>They make your next step feel effortless.</p><div className="quote-signature"><span>CF</span><div><strong>CODEFREM</strong><small>DESIGN & DEVELOPMENT STUDIO</small></div></div></div>
      </section>
      <ContactSection />
    </div>
  </main>;
}

