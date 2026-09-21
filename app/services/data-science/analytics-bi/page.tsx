import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { dataScience, getSubServiceBySlug } from "@/lib/subServices";

export const metadata: Metadata = {
  title: "Analytics & Business Intelligence — Codefrem",
  description:
    "Unified data, dashboards people actually open, and automated reporting. Starting from $700, delivered in 2–3 weeks.",
};

export default function AnalyticsBiPage() {
  const service = getSubServiceBySlug("data-science/analytics-bi");
  if (!service) notFound();
  return <SubServiceTemplate service={service} category={dataScience} />;
}


