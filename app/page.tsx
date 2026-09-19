import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import MasterpiecesSection from "@/components/MasterpiecesSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white relative">
      {/* Smart Fixed Navbar with scroll-direction reveal & Hero Black/White Theme Toggle */}
      <Navbar />

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

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
