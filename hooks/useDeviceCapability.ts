"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "high" | "low";

export function useDeviceCapability(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("high");

  useEffect(() => {
    // 1. Reduced motion check
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setTier("low");
      return;
    }

    // 2. Mobile screen check
    if (window.innerWidth < 768) {
      setTier("low");
      return;
    }

    // 3. Hardware concurrency (CPU cores)
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      setTier("low");
      return;
    }

    // 4. Device Memory (if available)
    const nav = navigator as any;
    if (nav.deviceMemory && nav.deviceMemory < 4) {
      setTier("low");
      return;
    }

    // 5. Network condition
    if (nav.connection && (nav.connection.effectiveType === "2g" || nav.connection.effectiveType === "slow-2g")) {
      setTier("low");
      return;
    }

    setTier("high");
  }, []);

  return tier;
}
