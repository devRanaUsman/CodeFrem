import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServiceTemplate from "@/components/services/SubServiceTemplate";
import { getSubServiceBySlug, studioDisciplines } from "@/lib/subServices";

const service = getSubServiceBySlug("3d-designs");
export const metadata: Metadata = {
  title: "3D Designs | Codefrem",
  description: service?.description,
};

export default function ServicePage() {
  if (!service) notFound();
  return <SubServiceTemplate service={service} category={studioDisciplines} />;
}
