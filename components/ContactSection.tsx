import Link from "next/link";
import { ArrowUpRight, Globe2, MapPin, MessageSquare } from "lucide-react";

export default function ContactSection() {
  return <section id="contact" className="reference-contact">
    <div className="contact-title"><p className="section-label">LET’S WORK TOGETHER</p><h2>HAVE A PROJECT<br /><span>IN MIND?</span></h2></div>
    <div className="contact-invitation"><p>We’re always open to discussing new projects, creative ideas, or opportunities.</p><Link href="/contact"><span className="circle-arrow"><ArrowUpRight size={20}/></span> GET IN TOUCH</Link></div>
    <div className="contact-mini-cards"><Link href="/contact"><MessageSquare/><span><small>START A CONVERSATION</small>Tell us about your project</span></Link><a href="https://codefrem.vercel.app"><Globe2/><span><small>WEBSITE</small>codefrem.vercel.app</span></a><div><MapPin/><span><small>WORKING</small>Pakistan · Worldwide</span></div></div>
    <div className="wire-globe" aria-hidden="true">{Array.from({length:7},(_,i)=><i key={i} style={{transform:`rotate(${i*25}deg)`}}/>)}</div>
  </section>;
}

