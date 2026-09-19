import React from "react";
import { ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

/**
 * The site's pill button, matched to the homepage's hero CTA capsule:
 * solid lime (primary) or hairline outline (secondary), rounded-full,
 * uppercase tracking, arrow icon, hover scale.
 *
 * `href` renders a Next <Link>; otherwise a <button> (use onClick).
 * Server component.
 */
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95";

const variants = {
  primary:
    "bg-[#AAFF00] text-black text-xs sm:text-sm px-7 py-3.5 shadow-[0_0_20px_rgba(170,255,0,0.3)] hover:bg-[#88CC00] hover:shadow-[0_0_30px_rgba(170,255,0,0.45)]",
  secondary:
    "border border-white/20 text-white text-xs sm:text-sm px-6 py-3.5 hover:border-[#AAFF00] hover:text-[#AAFF00]",
  ghost:
    "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#AAFF00] hover:underline",
  dark:
    "bg-black text-white text-xs sm:text-sm px-7 py-3.5 shadow-md hover:scale-105",
} as const;

export default function CTAButton({
  href,
  onClick,
  children,
  variant = "primary",
  className,
  withArrow = true,
  type,
}: {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  withArrow?: boolean;
  type?: "button" | "submit";
}) {
  const cls = clsx(base, variants[variant], className);
  const arrow =
    withArrow && variant !== "ghost" ? (
      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
    ) : null;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
        {arrow}
      </Link>
    );
  }
  return (
    <button type={type ?? "button"} onClick={onClick} className={cls}>
      {children}
      {arrow}
    </button>
  );
}
