import Link from "next/link";
import { ArrowUpRight, Monitor, ShoppingBag, Server, BrainCircuit } from "lucide-react";

const services = [
  { title: "WEBSITES AND WEB APPS", text: "Websites and web apps shaped around your business, not a template.", icon: Monitor, href: "/services/web-development/custom-website" },
  { title: "E-COMMERCE DEVELOPMENT", text: "Product, checkout, and inventory systems built around your operations.", icon: ShoppingBag, href: "/services/web-development/backend-api" },
  { title: "BACKEND SYSTEMS AND APIS", text: "Reliable backend systems and APIs that power your applications.", icon: Server, href: "/services/web-development/ecommerce" },
  { title: "DATA ANALYTICS AND AI SYSTEMS", text: "Data and AI systems that turn your data into insight and automation.", icon: BrainCircuit, href: "/services/web-development/maintenance-support" },
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

