import SectionHeading from "@/components/ui/SectionHeading";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import type { ProcessStep } from "@/lib/subServices";

/**
 * Homepage process — three steps, nothing more.
 *
 * Reuses ProcessTimeline (the /services process card, which already lays out
 * three steps as divided columns on desktop and a stack on mobile), so the
 * homepage reads as the same studio as the service pages.
 */
const steps: ProcessStep[] = [
  {
    title: "Tell us your idea",
    body: "Fill in the contact form with your project details, budget, and timeline.",
  },
  {
    title: "We scope and propose",
    body: "We review within 24hrs and send an honest proposal — no padding, no fluff.",
  },
  {
    title: "We build and ship",
    body: "We handle design, development and deployment. You stay updated throughout.",
  },
];

export default function ProcessSection() {
  return (
    <section className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-canvas text-ink">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="How It Works"
          title="From idea to shipped"
          highlight="product"
          align="center"
        />
        <ProcessTimeline steps={steps} />
      </div>
    </section>
  );
}


