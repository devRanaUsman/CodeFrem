import type { ReactNode } from "react";
import clsx from "clsx";
export default function GlowCard({children,className,hoverGlow=true}: {children:ReactNode;className?:string;hoverGlow?:boolean}) {
  return <div className={clsx("inner-card p-8 relative overflow-hidden transition-colors duration-200", hoverGlow && "hover:border-accent/70", className)}>{children}</div>;
}

