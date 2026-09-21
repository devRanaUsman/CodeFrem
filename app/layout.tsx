import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Codefrem — Web Design & Development",
  description: "Thoughtful web design and reliable development for your business. Codefrem builds custom websites, online stores and web applications, with support beyond launch.",
  keywords: ["Codefrem", "web development", "web design", "business websites", "ecommerce"],
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body id="top" className="min-h-screen bg-canvas text-ink antialiased selection:bg-[#AFF45D] selection:text-black"><Navbar />{children}<Footer /></body></html>;
}



