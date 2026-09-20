"use client";

import React, { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";
import { useDeviceCapability, type DeviceTier } from "@/hooks/useDeviceCapability";
import { signalRobotReady } from "@/lib/boot";

/**
 * Quality budget per device tier:
 * - high   → DPR ≤ 1.5 (Retina-sharp enough, 56% fewer fragments than DPR 3),
 *            idle sway sampled at the display refresh rate.
 * - medium → DPR 1 (exact 1:1 pixels), idle sway capped at ~30fps.
 * - low    → no canvas at all: static SVG badge below (0% GPU).
 */
const QUALITY: Record<DeviceTier, { dprCap: number; idleFrameMs: number }> = {
  high: { dprCap: 1.5, idleFrameMs: 16 },
  medium: { dprCap: 1, idleFrameMs: 32 },
};

/**
 * Module-level persistent cache across route navigations.
 * Once loaded, the 3D scene and WebGL Application remain alive in memory.
 * Navigating between pages (e.g. /services -> /) instantly re-mounts the canvas
 * with zero reload delay, zero network requests, and zero loading spinners.
 */
let cachedCanvas: HTMLCanvasElement | null = null;
let cachedApp: Application | null = null;
let cachedLoaded = false;
let cachedHasError = false;
let cachedLoadingPromise: Promise<void> | null = null;

let cachedHelmetObj: any = null;
let cachedEyesObj: any = null;
let cachedRobotObj: any = null;
let cachedBodyObj: any = null;

export default function SplineRobot() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(() => !cachedLoaded);
  const [hasError, setHasError] = useState(() => cachedHasError);
  const tier = useDeviceCapability();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Verify WebGL support
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
      cachedHasError = true;
      setHasError(true);
      setIsLoading(false);
      signalRobotReady();
      return;
    }

    // Reuse or create singleton canvas
    if (!cachedCanvas) {
      cachedCanvas = document.createElement("canvas");
      cachedCanvas.className = "w-full h-full object-contain outline-none block";
      cachedCanvas.style.width = "100%";
      cachedCanvas.style.height = "100%";
      cachedCanvas.style.backgroundColor = "transparent";
      cachedCanvas.style.pointerEvents = "auto";
    }

    // Attach to current container if not already attached
    if (cachedCanvas.parentElement !== container) {
      container.appendChild(cachedCanvas);
    }

    const { dprCap, idleFrameMs } = QUALITY[tier] || QUALITY.high;

    // Instantiate Spline Application once
    if (!cachedApp) {
      try {
        cachedApp = new Application(cachedCanvas, {
          renderMode: "manual",
          renderer: "webgl",
        } as any);
        (window as any).splineApp = cachedApp;
      } catch (e) {
        console.warn("Spline init error:", e);
        cachedHasError = true;
        setHasError(true);
        setIsLoading(false);
        signalRobotReady();
        return;
      }
    }

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

    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasTouchInput =
      window.matchMedia("(pointer: coarse)").matches ||
      navigator.maxTouchPoints > 0;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const requestFrame = () => {
      cachedApp?.requestRender();
    };

    const applyRobotPose = () => {
      const pitch = currentY * 0.65;
      const yaw = currentX * 1.25;
      const roll = currentX * 0.15;

      if (cachedHelmetObj) {
        cachedHelmetObj.rotation.x = pitch;
        cachedHelmetObj.rotation.y = yaw;
        cachedHelmetObj.rotation.z = roll;
      }
      if (cachedEyesObj) {
        cachedEyesObj.rotation.x = pitch;
        cachedEyesObj.rotation.y = yaw;
        cachedEyesObj.rotation.z = roll;
      }
      if (cachedRobotObj) {
        cachedRobotObj.scale.set(1.6, 1.6, 1.6);
        cachedRobotObj.position.x = 0;
        cachedRobotObj.position.y = -145;
        cachedRobotObj.position.z = -18.52;
        cachedRobotObj.rotation.x = 0;
        cachedRobotObj.rotation.y = 0;
        cachedRobotObj.rotation.z = 0;
      }
      if (cachedBodyObj) {
        cachedBodyObj.rotation.x = 0;
        cachedBodyObj.rotation.y = 0;
        cachedBodyObj.rotation.z = 0;
      }
    };

    const renderLoop = (time: number) => {
      if (disposed) return;

      if (!isInView) {
        isAnimating = false;
        animId = null;
        return;
      }

      if (!lastTime) lastTime = time;

      if (isIdleMoving && time - lastTime < idleFrameMs) {
        animId = requestAnimationFrame(renderLoop);
        return;
      }

      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (isIdleMoving) {
        const elapsed = (time - idleStartTime) / 1000;
        targetX =
          idleBaseX +
          Math.sin(elapsed * 0.45) * 0.24 +
          Math.sin(elapsed * 0.18 + 1.2) * 0.07;
        targetY =
          idleBaseY +
          Math.sin(elapsed * 0.32 + 0.8) * 0.12 +
          Math.sin(elapsed * 0.14) * 0.04;

        targetX = Math.max(-1, Math.min(1, targetX));
        targetY = Math.max(-1, Math.min(1, targetY));
      }

      const dx = targetX - currentX;
      const dy = targetY - currentY;

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

    const updateCanvasDimensions = () => {
      if (!container || !cachedApp || !cachedCanvas || disposed) return;
      const rect = container.getBoundingClientRect();
      const w = Math.round(rect.width || container.clientWidth || 420);
      const h = Math.round(rect.height || container.clientHeight || 370);
      if (w > 0 && h > 0) {
        const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
        cachedCanvas.width = Math.round(w * dpr);
        cachedCanvas.height = Math.round(h * dpr);
        const renderer = (cachedApp as any)._renderer;
        if (renderer) {
          renderer.setPixelRatio(dpr);
        }
        if (typeof (cachedApp as any).setSize === "function") {
          (cachedApp as any).setSize(w, h);
        }
        (cachedApp as any)._viewportMode = 0;
        if ((cachedApp as any)._frameView) {
          (cachedApp as any)._frameView.enableResponsive = true;
        }
        (cachedApp as any)._resize?.(true);
        cachedApp.requestRender();
      }
    };

    const handleResize = () => {
      updateCanvasDimensions();
    };

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      if (animId) cancelAnimationFrame(animId);
      animId = null;
      isAnimating = false;
    };

    const handleContextRestored = () => {
      updateCanvasDimensions();
      startAnimation();
    };

    cachedCanvas.addEventListener("webglcontextlost", handleContextLost);
    cachedCanvas.addEventListener("webglcontextrestored", handleContextRestored);
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
          updateCanvasDimensions();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasDimensions();
    });
    resizeObserver.observe(container);

    // If already loaded from previous page visit: reuse immediately!
    if (cachedLoaded && cachedApp) {
      setIsLoading(false);
      signalRobotReady();

      updateCanvasDimensions();

      requestAnimationFrame(() => {
        if (disposed) return;
        updateCanvasDimensions();
        startAnimation();
      });
    } else if (!cachedLoadingPromise) {
      // First time loading scene
      const sceneUrl = "/scene.splinecode";
      cachedLoadingPromise = cachedApp!
        .load(sceneUrl)
        .catch(() => {
          return cachedApp?.load("https://prod.spline.design/n9L6SSO5OIaBztSc/scene.splinecode");
        })
        .then(() => {
          if (!cachedApp) return;

          const em = (cachedApp as any)._eventManager;
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

          // Hide clutter elements & 3D floor plane
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
            const obj = cachedApp?.findObjectByName(name);
            if (obj) obj.visible = false;
          });

          // Cache 3D objects
          cachedRobotObj = cachedApp.findObjectByName("Robot");
          cachedHelmetObj = cachedApp.findObjectByName("Helmet");
          cachedEyesObj = cachedApp.findObjectByName("Eyes");
          cachedBodyObj = cachedApp.findObjectByName("Body");

          if (cachedRobotObj) {
            cachedRobotObj.scale.set(1.6, 1.6, 1.6);
            cachedRobotObj.position.x = 0;
            cachedRobotObj.position.y = -145;
            cachedRobotObj.position.z = -18.52;
            cachedRobotObj.rotation.x = 0;
            cachedRobotObj.rotation.y = 0;
            cachedRobotObj.rotation.z = 0;
          }

          if (cachedBodyObj) {
            cachedBodyObj.rotation.x = 0;
            cachedBodyObj.rotation.y = 0;
            cachedBodyObj.rotation.z = 0;
          }

          if (cachedHelmetObj) {
            cachedHelmetObj.position.x = 1.18;
            cachedHelmetObj.position.y = 113.63;
            cachedHelmetObj.position.z = 0.08;
            cachedHelmetObj.rotation.x = 0;
            cachedHelmetObj.rotation.y = 0;
            cachedHelmetObj.rotation.z = 0;
          }

          if (cachedEyesObj) {
            cachedEyesObj.rotation.x = 0;
            cachedEyesObj.rotation.y = 0;
            cachedEyesObj.rotation.z = 0;
          }

          (cachedApp as any)._viewportMode = 0;
          if ((cachedApp as any)._frameView) {
            (cachedApp as any)._frameView.enableResponsive = true;
          }

          const renderer = (cachedApp as any)._renderer;
          if (renderer) {
            const origSetClearColor = renderer.setClearColor.bind(renderer);
            renderer.setClearColor = () => {
              origSetClearColor(0x000000, 0);
            };
            renderer.setClearColor(0x000000, 0);
            renderer.setClearAlpha(0);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
          }

          if ((cachedApp as any)._scene) {
            (cachedApp as any)._scene.background = null;
          }

          (cachedApp as any)?._resize?.(true);
          cachedApp.requestRender();

          cachedLoaded = true;
        });
    }

    if (cachedLoadingPromise && !cachedLoaded) {
      cachedLoadingPromise
        .then(() => {
          if (disposed) return;
          setIsLoading(false);
          signalRobotReady();

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (disposed) return;
              (cachedApp as any)?._resize?.(true);
              cachedApp?.requestRender();
              startAnimation();
            });
          });
        })
        .catch((err) => {
          console.error("Spline load error:", err);
          cachedHasError = true;
          if (!disposed) {
            setHasError(true);
            setIsLoading(false);
            signalRobotReady();
          }
        });
    }

    return () => {
      disposed = true;
      observer.disconnect();
      resizeObserver.disconnect();
      if (animId) cancelAnimationFrame(animId);
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("resize", handleResize);

      if (cachedCanvas) {
        cachedCanvas.removeEventListener("webglcontextlost", handleContextLost);
        cachedCanvas.removeEventListener("webglcontextrestored", handleContextRestored);
        if (cachedCanvas.parentElement === container) {
          container.removeChild(cachedCanvas);
        }
      }
      // NOTE: We deliberately do NOT call cachedApp.dispose().
      // This keeps the WebGL context and loaded scene intact in memory,
      // enabling instantaneous re-attachment on return navigations!
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
      {/* Sleek Skeleton Loader - only shown on initial first load before cachedLoaded is true */}
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
    </div>
  );
}
