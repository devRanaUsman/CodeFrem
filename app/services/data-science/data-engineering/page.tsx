import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { dataScience, getSubServiceBySlug } from "@/lib/subServices";

export const metadata: Metadata = {
  title: "Data Engineering — Codefrem",
  description:
    "Reliable pipelines that move your data where it's needed — automatically, validated, on time. Starting from $1000, delivered in 3–5 weeks.",
};

export default function DataEngineeringPage() {
  const service = getSubServiceBySlug("data-science/data-engineering");
  if (!service) notFound();
  return <SubServiceTemplate service={service} category={dataScience} />;
}
