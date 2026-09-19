"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "high" | "medium";

/**
 * Device capability tier for the Spline 3D robot:
 * - "high"   → full experience (DPR ≤ 1.5, display refresh rate idle tracking)
 * - "medium" → optimized (DPR 1, ~30fps idle sway for touch/mobile screens)
 */
export function useDeviceCapability(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("high");

  useEffect(() => {
    // Debug override: /?perf=medium|high
    const override = new URLSearchParams(window.location.search).get("perf");
    if (override === "medium" || override === "high") {
      setTier(override as DeviceTier);
      return;
    }

    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        navigator.maxTouchPoints > 0);
    const smallScreen =
      typeof window !== "undefined" &&
      Math.min(window.innerWidth, window.innerHeight) <= 820;

    // Phones & small mobile touch screens: render the robot with a conservative DPR 1 budget
    if (isTouch && smallScreen) {
      setTier("medium");
      return;
    }

    // Default to high tier for desktop and larger screens
    setTier("high");
  }, []);

  return tier;
}

