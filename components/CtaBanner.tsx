import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

/**
 * Homepage closing CTA — one line, one button.
 *
 * Replaces the old contact block (heading + email capture form + "Expert
 * online" badge). The homepage's job is to send people to /contact, where the
 * real form lives — duplicating it here just gave two places to get a form
 * wrong. `id="contact"` is kept so existing `#contact` links still land here.
 */
export default function CtaBanner() {
  return (
    <section
      id="contact"
      className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-12 bg-canvas text-ink"
    >
      <Reveal className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-[36px] border border-[#AFF45D]/25 bg-surface px-6 py-12 sm:px-12 sm:py-16 text-center shadow-sm">
          {/* Soft lime glow behind the headline — a single static paint, no
              backdrop filter and no animation. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-56 max-w-lg"
            style={{
              background:
                "radial-gradient(50% 100% at 50% 0%, rgba(170,255,0,0.16) 0%, transparent 100%)",
            }}
          />

          <h2 className="relative text-3xl sm:text-4xl lg:text-5xl font-sans tracking-tight text-ink">
            Ready to build something?
          </h2>
          <p className="relative mt-4 mx-auto max-w-md text-sm sm:text-base text-muted leading-relaxed">
            We&apos;re currently taking new projects. Let&apos;s talk about
            yours.
          </p>
          <div className="relative mt-8 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#AFF45D] px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:bg-[#9BDC49] hover:scale-105 active:scale-95 shadow-sm"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}


