import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { getSubServiceBySlug, webDevelopment } from "@/lib/subServices";

export const metadata: Metadata = {
  title: "E-commerce Development — Codefrem",
  description:
    "Fast online stores with friction-free Stripe checkout, CMS-managed products and rich SEO. Starting from $1200, delivered in 3–4 weeks.",
};

export default function EcommercePage() {
  const service = getSubServiceBySlug("web-development/ecommerce");
  if (!service) notFound();
  return <SubServiceTemplate service={service} category={webDevelopment} />;
}


