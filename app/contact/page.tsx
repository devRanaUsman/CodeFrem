import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ContactSection from "@/components/ContactSection";
import Marquee from "@/components/ui/Marquee";
import Footer from "@/components/ui/Footer";
export const metadata: Metadata = {
  title: "Contact — Codefrem",
  description:
    "Start a project with Codefrem — UI/UX, Next.js development, Spline 3D and motion design. We reply within 24 hours.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      <PageHero
        eyebrow="Get In Touch"
        line1="Let's make something"
        highlight="exceptional"
        lead="Tell us where you're headed — we'll reply within 24 hours with honest thoughts on how to get there."
      />
      <ContactSection />
      <Marquee words={["Reply", "within", "24 hours"]} className="mt-4" />
      <Footer />
    </main>
  );
}
