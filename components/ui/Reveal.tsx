import React from "react";
import clsx from "clsx";

/** Content stays visible without JavaScript; motion is limited to lightweight hover feedback. */
export default function Reveal({children, className, as: Tag = "div"}: {
  children: React.ReactNode; className?: string; delay?: number;
  as?: "div" | "section" | "li" | "article" | "span" | "h2" | "p"; once?: boolean;
}) {
  return <Tag className={clsx("reveal", className)}>{children}</Tag>;
}

