import Link from "next/link";
import { ArrowUpRight, Monitor, ShoppingBag, Smartphone, Settings2 } from "lucide-react";

const services = [
  { title: "WEB DESIGN", text: "Distinctive, intuitive websites shaped around your business.", icon: Monitor, href: "/services/web-development/custom-website" },
  { title: "WEB DEVELOPMENT", text: "Fast, responsive experiences that work beautifully.", icon: Smartphone, href: "/services/web-development/backend-api" },
  { title: "E-COMMERCE", text: "Thoughtful online stores that make shopping effortless.", icon: ShoppingBag, href: "/services/web-development/ecommerce" },
  { title: "WEBSITE CARE", text: "Ongoing improvements and support, long after launch.", icon: Settings2, href: "/services/web-development/maintenance-support" },
];
export default function ServicesSection() {
  return <section id="services" className="home-section">
    <div className="section-label-row"><h2 className="section-label">WHAT WE DO</h2><span className="micro-note">SOLVING PROBLEMS WITH DESIGN & CODE</span></div>
    <div className="reference-services">{services.map(({title,text,icon:Icon,href},i) => <Link href={href} key={title} className="reference-service glass-panel">
      <div className="service-card-top"><Icon size={23} strokeWidth={1.25} /><span>0{i+1}</span></div>
      <h3>{title}</h3><div className="service-card-bottom"><p>{text}</p><ArrowUpRight size={19} /></div>
    </Link>)}</div>
  </section>;
}

