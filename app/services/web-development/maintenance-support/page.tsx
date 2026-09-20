import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { getSubServiceBySlug, webDevelopment } from "@/lib/subServices";

export const metadata: Metadata = {
  title: "Website Maintenance & Support — Codefrem",
  description:
    "Monthly updates, monitoring, security patches and quick fixes from the founders who build like they maintain. Plans from $150/mo, cancel anytime.",
};

export default function MaintenanceSupportPage() {
  const service = getSubServiceBySlug("web-development/maintenance-support");
  if (!service) notFound();
  return <SubServiceTemplate service={service} category={webDevelopment} />;
}
