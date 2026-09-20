import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { dataScience, getSubServiceBySlug } from "@/lib/subServices";

export const metadata: Metadata = {
  title: "AI Integration — Codefrem",
  description:
    "Practical AI features — assistants, document search, content generation — shipped in weeks with cost guardrails. Starting from $1200, delivered in 3–4 weeks.",
};

export default function AiIntegrationPage() {
  const service = getSubServiceBySlug("data-science/ai-integration");
  if (!service) notFound();
  return <SubServiceTemplate service={service} category={dataScience} />;
}
