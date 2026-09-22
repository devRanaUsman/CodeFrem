import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { getSubServiceBySlug, webDevelopment } from "@/lib/subServices";

export const metadata: Metadata = {
  title: "Custom Website Development | Codefrem",
  description:
    "Hand-built Next.js websites designed around your business goals: fast, responsive, and easy to update. Starting from $800, delivered in 2-3 weeks.",
};

export default function CustomWebsitePage() {
  const service = getSubServiceBySlug("web-development/custom-website");
  if (!service) notFound();
  return <SubServiceTemplate service={service} category={webDevelopment} />;
}


