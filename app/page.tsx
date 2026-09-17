import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import MasterpiecesSection from "@/components/MasterpiecesSection";
import ServicesSection from "@/components/ServicesSection";
import MarqueeSection from "@/components/MarqueeSection";
import TeamSection from "@/components/TeamSection";
import PortfolioTags from "@/components/PortfolioTags";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-[#0A0A0A] text-white relative">
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

      {/* Marquee Banner */}
      <MarqueeSection />

      {/* Studio Team Grid */}
      <TeamSection />

      {/* Interactive Portfolio Taxonomy Bar */}
      <PortfolioTags />

      {/* Contact & Consultation Form */}
      <ContactSection />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
