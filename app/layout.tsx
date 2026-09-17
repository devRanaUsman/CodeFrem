import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codefrem — Empowering Brands Through Creative Solutions",
  description:
    "Next-generation digital agency specializing in UI/UX, full-stack Next.js web applications, and interactive Spline 3D web experiences.",
  keywords: [
    "Codefrem",
    "creative agency",
    "web design",
    "Spline 3D",
    "Next.js 15",
    "digital studio",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-[#0A0A0A] text-white antialiased selection:bg-[#AAFF00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
