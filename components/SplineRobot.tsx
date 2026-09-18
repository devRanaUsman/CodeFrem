"use client";

import React, { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

export default function SplineRobot() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const tier = useDeviceCapability();

  useEffect(() => {
    if (tier === "low") {
      setIsLoading(false);
      return;
    }

    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    let app: Application | null = null;
    let animId: number | null = null;
    let isAnimating = false;
    let lastTime = 0;
    let isInView = true;

    // Normalized mouse coordinates [-1, 1]
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    let helmetObj: any = null;
    let eyesObj: any = null;
    let robotObj: any = null;
    let bodyObj: any = null;

    try {
      app = new Application(canvas, {
        renderer: "webgl",
      } as any);
      (window as any).splineApp = app;
    } catch (e) {
      console.warn("Spline init error:", e);
      setIsLoading(false);
      return;
    }

    // Agile tracking loop with delta-time (framerate-independent, zero-lag)
    const renderLoop = (time: number) => {
      if (!isInView) {
        isAnimating = false;
        animId = null;
        return;
      }

      if (!lastTime) lastTime = time;
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      const dx = targetX - currentX;
      const dy = targetY - currentY;

      // Settle and drop GPU usage to 0% when idle
      if (Math.abs(dx) < 0.0003 && Math.abs(dy) < 0.0003) {
        currentX = targetX;
        currentY = targetY;

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
          robotObj.scale.set(1.3, 1.3, 1.3);
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

        try {
          (app as any)?.render?.();
        } catch {
          app?.requestRender?.();
        }

        isAnimating = false;
        animId = null;
        lastTime = 0;
        return;
      }

      // High-speed responsiveness: ~65/s decay factor
      const factor = 1 - Math.exp(-65 * dt);
      currentX += dx * factor;
      currentY += dy * factor;

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
        robotObj.scale.set(1.3, 1.3, 1.3);
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

      try {
        (app as any)?.render?.();
      } catch {
        app?.requestRender?.();
      }

      animId = requestAnimationFrame(renderLoop);
    };

    const startAnimation = () => {
      if (!isAnimating && isInView) {
        isAnimating = true;
        lastTime = 0;
        animId = requestAnimationFrame(renderLoop);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
      startAnimation();
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
      startAnimation();
    };

    const handleResize = () => {
      if (app) {
        (app as any)._viewportMode = 0;
        if ((app as any)._frameView) {
          (app as any)._frameView.enableResponsive = true;
        }
        (app as any)._resize?.(true);
        app.requestRender();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("resize", handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (isInView) {
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
        if (!app) return;
        setIsLoading(false);

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
          robotObj.scale.set(1.3, 1.3, 1.3);
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

          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25));
          if (renderer.shadowMap) {
            renderer.shadowMap.autoUpdate = false;
            renderer.shadowMap.needsUpdate = true;
          }
        }

        if ((app as any)._scene) {
          (app as any)._scene.background = null;
        }

        (app as any)?._resize?.(true);
        (app as any)?.render?.();
        app.requestRender();
      })
      .catch((err) => {
        console.error("Spline load error:", err);
        setIsLoading(false);
      });

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
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

  // Low-End / Mobile Static Fallback Card (0% GPU, instantaneous load)
  if (tier === "low") {
    return (
      <div className="relative w-full max-w-[460px] h-[480px] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative w-52 h-52 rounded-full bg-[#111111] border-2 border-[#AAFF00] flex items-center justify-center shadow-[0_0_40px_rgba(170,255,0,0.25)]">
            <svg
              className="w-28 h-28 text-[#AAFF00]"
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
              Optimized for high-speed mobile & battery efficiency.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[480px] h-[500px] flex items-center justify-center select-none"
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
