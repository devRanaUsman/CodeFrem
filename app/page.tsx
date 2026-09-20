import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import MasterpiecesSection from "@/components/MasterpiecesSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white relative">
      {/* Hero Section (White card with centered 3D Robot) */}
      <HeroSection />

      {/* Key Metrics Bar */}
      <StatsBar />

      {/* Masterpieces Agency Identity Showcase */}
      <MasterpiecesSection />

      {/* Core Services Section with lime pill heading */}
      <ServicesSection />

      {/* Featured Projects with GSAP horizontal scroll showcase */}
      <ProjectsSection />

      {/* Contact & Consultation Form */}
      <ContactSection />
    </main>
  );
}
