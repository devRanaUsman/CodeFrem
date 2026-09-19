import React from "react";
import clsx from "clsx";

/**
 * The site's core card: rounded-3xl, hairline #222 border, dark surface —
 * the exact treatment of the homepage's MasterpiecesSection/ServicesSection
 * cards — with an optional lime hover glow.
 *
 * Server component; hover effects are pure CSS.
 */
export default function GlowCard({
  children,
  className,
  hoverGlow = true,
}: {
  children: React.ReactNode;
  className?: string;
  /** Adds the lime border + glow shadow on hover. */
  hoverGlow?: boolean;
}) {
  return (
    <div
      className={clsx(
        "rounded-3xl border border-[#222222] bg-[#111111] p-8 relative overflow-hidden transition-all duration-300",
        hoverGlow &&
          "hover:border-[#AAFF00]/60 hover:shadow-[0_0_35px_rgba(170,255,0,0.12)] hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
