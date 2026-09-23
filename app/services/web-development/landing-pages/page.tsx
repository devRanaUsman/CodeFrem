import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { getSubServiceBySlug, webDevelopment } from "@/lib/subServices";

const service = getSubServiceBySlug("web-development/landing-pages");
export const metadata: Metadata = {
  title: "Landing Pages | Codefrem",
  description: service?.description,
};

export default function ServicePage() {
  if (!service) notFound();
  return <SubServiceTemplate service={service} category={webDevelopment} />;
}
