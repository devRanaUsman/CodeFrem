import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhoWeBuildForSection from "@/components/WhoWeBuildForSection";
import FaqSection from "@/components/FaqSection";
import CircuitDivider from "@/components/ui/CircuitDivider";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import CodefremLogoIcon from "@/public/images/codefrem_logo_icon.png";

export default function Home() {

  return <main className="reference-home">
    <HeroSection />
    <div className="reference-content">
      <ServicesSection /><ProjectsSection />
      <HowItWorksSection />
      <section className="home-section philosophy-section"><div className="section-label-row"><h2 className="section-label">THE WAY WE WORK</h2><Link href="/about" className="section-more">MEET THE STUDIO <ArrowRight size={17} /></Link></div>
        <div className="studio-quote glass-panel"><span className="quote-mark">“</span><p>Thoughtful, clear, and crafted with care.<br />Good websites don’t just look beautiful.<br />They make your next step feel effortless.</p><div className="quote-signature justify-center"><span className="h-10  relative w-10">
          <Image height={45} width={45} src={CodefremLogoIcon} alt="Codefrem" className="object-contain" />
        </span><div><strong>CODEFREM</strong><small>DESIGN & DEVELOPMENT STUDIO</small></div></div></div>
      </section>
      <WhoWeBuildForSection />
      <CircuitDivider />
      <FaqSection />
      <CircuitDivider />
      <ContactSection />
    </div>
  </main>;
}

