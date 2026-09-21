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
    "bg-[#AFF45D] text-black text-xs sm:text-sm px-7 py-3.5 shadow-sm hover:bg-[#9BDC49] shadow-sm",
  secondary:
    "border border-line text-ink text-xs sm:text-sm px-6 py-3.5 hover:border-[#AFF45D] hover:text-accent-ink",
  ghost:
    "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-ink hover:underline",
  dark:
    "bg-ink text-white text-xs sm:text-sm px-7 py-3.5 shadow-md hover:scale-105",
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


