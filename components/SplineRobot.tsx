"use client";

import React, { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";
import { useDeviceCapability, type DeviceTier } from "@/hooks/useDeviceCapability";
import { signalRobotReady } from "@/lib/boot";

/**
 * Quality budget per device tier:
 * - high   → DPR ≤ 1.5 (Retina-sharp enough, 56% fewer fragments than DPR 3),
 *            idle sway sampled at the display refresh rate.
 * - medium → DPR 1 (exact 1:1 pixels), idle sway capped at ~30fps. A slow
 *            sine wave sampled at half rate is visually identical; it halves
 *            the GPU/CPU the hero burns while a visitor just reads the page.
 * - low    → no canvas at all: static SVG badge below (0% GPU).
 */
const QUALITY: Record<DeviceTier, { dprCap: number; idleFrameMs: number }> = {
  high: { dprCap: 1.5, idleFrameMs: 16 },
  medium: { dprCap: 1, idleFrameMs: 32 },
};

export default function SplineRobot() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const tier = useDeviceCapability();

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Verify WebGL support before attempting to create the Spline Application
    let hasWebGL = true;
    try {
      const testCanvas = document.createElement("canvas");
      hasWebGL = !!(
        window.WebGLRenderingContext &&
        (testCanvas.getContext("webgl2") ||
          testCanvas.getContext("webgl") ||
          testCanvas.getContext("experimental-webgl"))
      );
    } catch {
      hasWebGL = false;
    }

    if (!hasWebGL) {
      // Microtask deferral keeps the effect body free of synchronous
      // setState (same pattern as the low-tier branch above).
      queueMicrotask(() => {
        setHasError(true);
        setIsLoading(false);
        signalRobotReady();
      });
      return;
    }

    const canvas = canvasRef.current;
    const { dprCap, idleFrameMs } = QUALITY[tier] || QUALITY.high;

    let app: Application | null = null;
    let animId: number | null = null;
    let isAnimating = false;
    let lastTime = 0;
    let isInView = true;
    let isIdleMoving = false;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let idleStartTime = 0;
    let idleBaseX = 0;
    let idleBaseY = 0;
    let disposed = false;

    // Touch/coarse-pointer devices have no mouse cursor to wait for.
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasTouchInput =
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;

    // Normalized mouse coordinates [-1, 1]
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    let helmetObj: any = null;
    let eyesObj: any = null;
    let robotObj: any = null;
    let bodyObj: any = null;

    const requestFrame = () => {
      // renderMode:"manual" — nothing renders unless WE say so. Combined with
      // the settle-out loop below, the GPU sits at true 0% whenever neither
      // the pointer nor the idle sway is moving.
      app?.requestRender();
    };

    try {
      app = new Application(canvas, {
        renderMode: "manual",
        renderer: "webgl",
      } as any);
      (window as any).splineApp = app;
    } catch (e) {
      console.warn("Spline init error:", e);
      queueMicrotask(() => {
        setHasError(true);
        setIsLoading(false);
        signalRobotReady();
      });
      return;
    }

    const applyRobotPose = () => {
      const pitch = currentY * 0.65;
      const yaw = currentX * 1.25;
      const roll = currentX * 0.15;

      if (helmetObj) {
        helmetObj.rotation.x = pitch;
        helmetObj.rotation.y = yaw;
        helmetObj.rotation.z = roll;
      }
      if (eyesObj) {
        eyesObj.rotation.x = pitch;
        eyesObj.rotation.y = yaw;
        eyesObj.rotation.z = roll;
      }
      if (robotObj) {
        robotObj.scale.set(1.6, 1.6, 1.6);
        robotObj.position.x = 0;
        robotObj.position.y = -145;
        robotObj.position.z = -18.52;
        robotObj.rotation.x = 0;
        robotObj.rotation.y = 0;
        robotObj.rotation.z = 0;
      }
      if (bodyObj) {
        bodyObj.rotation.x = 0;
        bodyObj.rotation.y = 0;
        bodyObj.rotation.z = 0;
      }
    };

    // Agile tracking loop with delta-time (framerate-independent, zero-lag)
    const renderLoop = (time: number) => {
      if (disposed) return;

      if (!isInView) {
        isAnimating = false;
        animId = null;
        return;
      }

      if (!lastTime) lastTime = time;

      // The autonomous idle sway runs forever, so on slower tiers we sample
      // it at ~30fps instead of the display refresh rate — imperceptible on
      // motion this gentle, and half the GPU/CPU. Pointer-driven tracking is
      // never throttled.
      if (isIdleMoving && time - lastTime < idleFrameMs) {
        animId = requestAnimationFrame(renderLoop);
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // After about five seconds without pointer movement, gently animate
      // the robot's head on its own with slow, natural-looking motion.
      if (isIdleMoving) {
        const elapsed = (time - idleStartTime) / 1000;

        // Keep the autonomous motion centered around the exact direction
        // the robot was already looking when the user stopped moving.
        targetX =
          idleBaseX +
          Math.sin(elapsed * 0.45) * 0.24 +
          Math.sin(elapsed * 0.18 + 1.2) * 0.07;
        targetY =
          idleBaseY +
          Math.sin(elapsed * 0.32 + 0.8) * 0.12 +
          Math.sin(elapsed * 0.14) * 0.04;

        // Keep the generated gaze within the same normalized range as the
        // pointer-controlled gaze.
        targetX = Math.max(-1, Math.min(1, targetX));
        targetY = Math.max(-1, Math.min(1, targetY));
      }

      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Settle and drop GPU usage to 0% when idle
      if (!isIdleMoving && Math.abs(dx) < 0.0003 && Math.abs(dy) < 0.0003) {
        currentX = targetX;
        currentY = targetY;

        applyRobotPose();
        requestFrame();

        isAnimating = false;
        animId = null;
        lastTime = 0;
        return;
      }

      // High-speed responsiveness: ~65/s decay factor
      const factor = 1 - Math.exp(-65 * dt);
      currentX += dx * factor;
      currentY += dy * factor;

      applyRobotPose();
      requestFrame();

      animId = requestAnimationFrame(renderLoop);
    };

    const startAnimation = () => {
      if (!isAnimating && isInView) {
        isAnimating = true;
        lastTime = 0;
        animId = requestAnimationFrame(renderLoop);
      }
    };

    const startIdleMovement = () => {
      if (!isInView || disposed) return;

      // Start from the robot's current gaze so there is no snap or jerk.
      idleBaseX = currentX;
      idleBaseY = currentY;
      targetX = currentX;
      targetY = currentY;
      isIdleMoving = true;
      idleStartTime = performance.now();
      startAnimation();
    };

    const resetIdleTimer = () => {
      if (idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = null;
      }

      // On mobile/tablet or any screen without a fine pointer, start
      // autonomous movement immediately instead of waiting 5 seconds.
      if (!hasFinePointer || hasTouchInput) {
        startIdleMovement();
        return;
      }

      isIdleMoving = false;
      idleStartTime = 0;

      idleTimer = setTimeout(() => {
        startIdleMovement();
      }, 5000);
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Touch/stylus movement should not interrupt autonomous head movement.
      // Only a real mouse/trackpad pointer controls the robot's gaze.
      if (e.pointerType !== "mouse") return;

      isIdleMoving = false;
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
      resetIdleTimer();
      startAnimation();
    };

    const handlePointerLeave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;

      targetX = 0;
      targetY = 0;
      resetIdleTimer();
      startAnimation();
    };

    const handleResize = () => {
      if (app) {
        (app as any)._viewportMode = 0;
        if ((app as any)._frameView) {
          (app as any)._frameView.enableResponsive = true;
        }
        (app as any)._resize?.(true);
        requestFrame();
      }
    };

    // Browsers drop WebGL contexts under memory pressure (esp. on phones).
    // Without this, the hero shows a dead gray frame forever.
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (animId) cancelAnimationFrame(animId);
      animId = null;
      isAnimating = false;
    };
    const handleContextRestored = () => {
      // Spline rebuilds its GL state; ask it to re-measure + repaint.
      (app as any)?._resize?.(true);
      requestFrame();
      startAnimation();
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize);

    resetIdleTimer();

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView) {
          resetIdleTimer();
          startAnimation();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Load locally from /scene.splinecode with fallback
    const sceneUrl = "/scene.splinecode";

    app
      .load(sceneUrl)
      .catch(() => {
        return app?.load("https://prod.spline.design/n9L6SSO5OIaBztSc/scene.splinecode");
      })
      .then(() => {
        if (disposed || !app) return;

        const em = (app as any)._eventManager;
        if (em?.handlers?.Follow) {
          em.handlers.Follow.disconnect?.();
          em.handlers.Follow.events = [];
        }
        if (em?.handlers?.LookAt) {
          em.handlers.LookAt.disconnect?.();
          em.handlers.LookAt.events = [];
        }
        if (em?.handlers?.VariableChange) {
          em.handlers.VariableChange.disconnect?.();
          em.handlers.VariableChange.propertiesToWatch = [];
          em.handlers.VariableChange.events = [];
        }

        // Hide clutter elements & the 3D Floor plane that was causing the gray square!
        const clutter = [
          "Board",
          "Cursor Target",
          "Message",
          "Message 2",
          "Message 3",
          "Rectangle 3",
          "Text",
          "Text 2",
          "Shape 0",
          "Floor",
        ];
        clutter.forEach((name) => {
          const obj = app?.findObjectByName(name);
          if (obj) obj.visible = false;
        });

        // Cache objects
        robotObj = app.findObjectByName("Robot");
        helmetObj = app.findObjectByName("Helmet");
        eyesObj = app.findObjectByName("Eyes");
        bodyObj = app.findObjectByName("Body");

        // Scale and position Robot to prominently fit the hero section
        if (robotObj) {
          robotObj.scale.set(1.6, 1.6, 1.6);
          robotObj.position.x = 0;
          robotObj.position.y = -145;
          robotObj.position.z = -18.52;
          robotObj.rotation.x = 0;
          robotObj.rotation.y = 0;
          robotObj.rotation.z = 0;
        }

        if (bodyObj) {
          bodyObj.rotation.x = 0;
          bodyObj.rotation.y = 0;
          bodyObj.rotation.z = 0;
        }

        if (helmetObj) {
          helmetObj.position.x = 1.18;
          helmetObj.position.y = 113.63;
          helmetObj.position.z = 0.08;
          helmetObj.rotation.x = 0;
          helmetObj.rotation.y = 0;
          helmetObj.rotation.z = 0;
        }

        if (eyesObj) {
          eyesObj.rotation.x = 0;
          eyesObj.rotation.y = 0;
          eyesObj.rotation.z = 0;
        }

        (app as any)._viewportMode = 0;
        if ((app as any)._frameView) {
          (app as any)._frameView.enableResponsive = true;
        }

        const renderer = (app as any)._renderer;
        if (renderer) {
          // Force 100% transparent background - eliminates the gray square box completely!
          const origSetClearColor = renderer.setClearColor.bind(renderer);
          renderer.setClearColor = () => {
            origSetClearColor(0x000000, 0);
          };
          renderer.setClearColor(0x000000, 0);
          renderer.setClearAlpha(0);

          // Tier-based resolution cap: "medium" renders at exactly 1x pixels
          // (1:1 with CSS pixels) instead of the phone-default 3x — 9× fewer
          // fragments per frame for near-zero visual difference on a hero
          // this soft. "high" caps at 1.5x.
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
        }

        if ((app as any)._scene) {
          (app as any)._scene.background = null;
        }

        (app as any)?._resize?.(true);
        requestFrame();

        // Confirm the GPU has rendered the frame before signaling robot readiness
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (disposed) return;
            setIsLoading(false);
            signalRobotReady();
          });
        });
      })
      .catch((err) => {
        console.error("Spline load error:", err);
        setHasError(true);
        setIsLoading(false);
        signalRobotReady();
      });

    return () => {
      disposed = true;
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      if (idleTimer) clearTimeout(idleTimer);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);
      if (app) {
        try {
          app.dispose();
        } catch (e) {
          console.warn("Spline cleanup:", e);
        }
      }
    };
  }, [tier]);

  // Fallback card only if WebGL is unsupported or scene load fails
  if (hasError) {
    return (
      <div className="relative w-full max-w-[460px] h-full min-h-[340px] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative w-44 h-44 rounded-full bg-[#111111] border-2 border-[#AAFF00] flex items-center justify-center shadow-[0_0_40px_rgba(170,255,0,0.25)]">
            <svg
              className="w-24 h-24 text-[#AAFF00]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <circle cx="12" cy="5" r="2" />
              <path d="M12 7v4" />
              <line x1="8" y1="16" x2="8.01" y2="16" strokeWidth="3" />
              <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth="3" />
            </svg>
            <span className="absolute -top-2 px-3 py-0.5 text-[10px] font-semibold tracking-wider bg-[#AAFF00] text-black rounded-full uppercase">
              AI Powered
            </span>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg">Codefrem 3D Intelligence</h4>
            <p className="text-xs text-gray-500 max-w-xs mt-1">
              Interactive 3D model could not be loaded.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px] h-full min-h-[340px] sm:min-h-[370px] flex items-center justify-center select-none"
    >
      {/* Sleek Skeleton Loader */}
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-transparent backdrop-blur-[1px] rounded-3xl">
          <div className="relative flex items-center justify-center">
            <div className="w-12 h-12 border-3 border-[#AAFF00] border-t-transparent rounded-full animate-spin" />
          </div>
          <span className="mt-3 text-xs font-semibold uppercase tracking-wider text-gray-500 animate-pulse">
            Loading 3D Robot...
          </span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain outline-none block"
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "transparent",
          pointerEvents: "auto",
        }}
      />
    </div>
  );
}
