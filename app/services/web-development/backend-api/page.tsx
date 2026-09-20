import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { getSubServiceBySlug, webDevelopment } from "@/lib/subServices";

export const metadata: Metadata = {
  title: "Backend & API Development — Codefrem",
  description:
    "Clean APIs, reliable PostgreSQL schemas and integrations that don't break — fully documented and handed over. Starting from $600, delivered in 1–2 weeks.",
};

export default function BackendApiPage() {
  const service = getSubServiceBySlug("web-development/backend-api");
  if (!service) notFound();
  return <SubServiceTemplate service={service} category={webDevelopment} />;
}
