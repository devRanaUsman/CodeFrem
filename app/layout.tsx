import type { Metadata } from "next";
import "./globals.css";
import "lenis/dist/lenis.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Preloader from "@/components/Preloader";

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
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0A0A0A] text-white antialiased selection:bg-[#AAFF00] selection:text-black">
        {/* Runs before first paint. The browser's native scroll restoration
            applies the saved offset against the pre-hydration layout — before
            GSAP can insert the ProjectsSection pin spacer — which shifted
            every section below the pin and briefly flashed the wrong part of
            the page on reload. Setting "manual" hands restore duty to
            ScrollTrigger's built-in scroll memory, which re-applies the
            position only after the final post-pin layout exists (GSAP's
            documented pattern). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{history.scrollRestoration="manual";window.scrollTo(0,0)}catch(e){}',
          }}
        />
        {/* Preloader owns the first paint: black shutter + terminal boot
            sequence, then a staggered column reveal. It self-unmounts and
            refreshes ScrollTrigger when done. */}
        <Preloader />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
