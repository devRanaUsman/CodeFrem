import React from "react";
import clsx from "clsx";
import { Check } from "lucide-react";
import type { Plan } from "@/lib/subServices";
import Reveal from "@/components/ui/Reveal";
import CTAButton from "@/components/ui/CTAButton";

/**
 * Three-tier pricing (Starter / Standard / Premium) shared by every
 * sub-service page. Standard carries the lime highlight. All copy is
 * data-driven from lib/subServices.ts. Server component.
 */
export default function PricingPlans({ plans }: { plans: Plan[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
      {plans.map((plan, index) => (
        <Reveal key={plan.name} delay={index * 80} className="h-full">
          <div
            className={clsx(
              "relative h-full rounded-3xl border p-7 sm:p-8 flex flex-col transition-all duration-300",
              plan.featured
                ? "border-[#AAFF00]/60 bg-[#111111] shadow-[0_0_40px_rgba(170,255,0,0.12)]"
                : "border-[#222222] bg-[#111111] hover:border-white/25"
            )}
          >
            {plan.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#AAFF00] px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-black">
                Most Popular
              </span>
            )}

            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#AAFF00]">
              {plan.name}
            </span>
            <p className="mt-3 text-4xl font-serif font-bold text-white">
              {plan.price}
            </p>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              {plan.blurb}
            </p>

            <ul className="mt-6 space-y-3 border-t border-white/5 pt-6 flex-1">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm text-gray-300"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#AAFF00]"
                    aria-hidden="true"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <CTAButton
                href="/contact"
                variant={plan.featured ? "primary" : "secondary"}
                className="w-full"
              >
                Get Started
              </CTAButton>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
