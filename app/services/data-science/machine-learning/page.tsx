import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { dataScience, getSubServiceBySlug } from "@/lib/subServices";

export const metadata: Metadata = {
  title: "Machine Learning Solutions — Codefrem",
  description:
    "Forecasting, scoring and anomaly detection measured by business impact — feasibility first, hype never. Starting from $1500, delivered in 4–6 weeks.",
};

export default function MachineLearningPage() {
  const service = getSubServiceBySlug("data-science/machine-learning");
  if (!service) notFound();
  return <SubServiceTemplate service={service} category={dataScience} />;
}
