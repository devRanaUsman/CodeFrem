import Marquee from "@/components/ui/Marquee";

/**
 * Homepage tech-stack strip — the marquee that used to show client logos.
 *
 * No client logos: a three-client studio showing off a logo wall reads as
 * padding. The stack we actually build with is honest, specific, and tells a
 * visitor more. Reuses the site's existing CSS-only Marquee (compact variant)
 * so it costs nothing to scroll.
 */
const tech = [
  "Next.js",
  "Python",
  "TypeScript",
  "Power BI",
  "Tailwind CSS",
  "PostgreSQL",
  "TensorFlow",
  "Vercel",
  "Figma",
  "Pandas",
  "Sanity CMS",
  "Stripe",
  "LangChain",
  "Tableau",
];

export default function TechStrip() {
  return (
    <section
      aria-label="Technologies we work with"
      className="w-full bg-canvas pt-10 sm:pt-12"
    >
      <p className="mb-4 px-4 text-center text-[11px] font-semibold uppercase tracking-widest text-muted">
        Technologies we work with
      </p>
      <Marquee words={tech} />
    </section>
  );
}



