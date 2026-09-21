import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function CtaStrip({title="Have a project in mind?",subtext="Tell us what you're building. Let's work out the next step together.",label="Start a Project",href="/contact"}: {title?:string;subtext?:string;label?:string;href?:string}) {
  return <section className="px-6 pb-16"><div className="inner-card max-w-6xl mx-auto p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8"><div><p className="section-label mb-5">LET’S WORK TOGETHER</p><h2 className="text-3xl sm:text-4xl uppercase tracking-tight">{title}</h2><p className="text-muted text-sm leading-relaxed mt-4 max-w-xl">{subtext}</p></div><Link href={href} className="inline-flex items-center gap-4 shrink-0 text-xs uppercase tracking-widest text-accent-ink"><span className="circle-arrow"><ArrowUpRight size={19}/></span>{label}</Link></div></section>;
}
