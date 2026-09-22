import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { dataScience, getSubServiceBySlug } from "@/lib/subServices";

export const metadata: Metadata = {
  title: "Data Visualization | Codefrem",
  description:
    "Interactive charts, dashboards and infographics that make complex data obvious in seconds. Starting from $600, delivered in 1-2 weeks.",
};

export default function DataVisualizationPage() {
  const service = getSubServiceBySlug("data-science/data-visualization");
  if (!service) notFound();
  return <SubServiceTemplate service={service} category={dataScience} />;
}


