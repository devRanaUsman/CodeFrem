import React from "react";
import clsx from "clsx";

/**
 * Micro tag pill: hairline border, uppercase micro type (the exact tag
 * treatment of the homepage project cards. Server component.
 */
export default function TagPill({
  children,
  className,
  lime = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** Lime-filled variant (category pill style). */
  lime?: boolean;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
        lime
          ? "bg-[#AFF45D] text-black font-extrabold tracking-widest px-3 py-1.5"
          : "border border-line text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}


