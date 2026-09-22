"use client";

import { useEffect, useRef, useState } from "react";
import { steps } from "@/data/process";
import { FileSearch, Layers, SearchCheck, Rocket, ShieldCheck, LucideIcon } from "lucide-react";

const stepIcons: LucideIcon[] = [FileSearch, Layers, SearchCheck, Rocket, ShieldCheck];

interface StepCardProps {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
  cardRef?: React.Ref<HTMLDivElement>;
  className?: string;
}

function StepCard({ number, title, text, icon: Icon, cardRef, className = "" }: StepCardProps) {
  return (
    <div
      ref={cardRef}
      className={`group relative z-10 bg-white/95 rounded-[26px] p-7 sm:p-8 border border-white/90 shadow-[0_12px_36px_-6px_rgba(22,24,27,0.06),0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_44px_-8px_rgba(82,122,36,0.14),0_0_0_1px_rgba(175,244,93,0.45)] hover:-translate-y-1 transition-all duration-300 ease-out backdrop-blur-sm ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-ink text-[17px] tracking-tight">{number}</span>
        <div className="relative w-12 h-12 rounded-full bg-[#aff45d]/25 border border-[#aff45d]/40 flex items-center justify-center shadow-[0_0_16px_rgba(175,244,93,0.35)] group-hover:scale-105 group-hover:shadow-[0_0_22px_rgba(175,244,93,0.5)] transition-all duration-300">
          <div className="w-8 h-8 rounded-full bg-[#A0E34F] text-white flex items-center justify-center shadow-sm">
            <Icon size={16} strokeWidth={2.2} />
          </div>
        </div>
      </div>
      <h3 className="text-[17px] font-bold text-[black] tracking-tight mt-5 block">
        {title}
      </h3>
      <p className="text-[13.5px] text-muted leading-relaxed mt-2.5">
        {text}
      </p>
    </div>
  );
}

export default function HowItWorksSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);

  const [paths, setPaths] = useState<{ p1: string; p2: string; p3: string; p4: string } | null>(null);

  useEffect(() => {
    const updatePaths = () => {
      const container = containerRef.current;
      const c1 = card1Ref.current;
      const c2 = card2Ref.current;
      const c3 = card3Ref.current;
      const c4 = card4Ref.current;
      const c5 = card5Ref.current;

      if (!container || !c1 || !c2 || !c3 || !c4 || !c5) return;

      const contBox = container.getBoundingClientRect();
      const b1 = c1.getBoundingClientRect();
      const b2 = c2.getBoundingClientRect();
      const b3 = c3.getBoundingClientRect();
      const b4 = c4.getBoundingClientRect();
      const b5 = c5.getBoundingClientRect();

      // Only draw connecting snake lines on desktop when cards are in 2 columns
      if (b2.left <= b1.right - 20) {
        setPaths(null);
        return;
      }

      // Point A: Right edge of Card 01 (vertical center)
      const pAx = b1.right - contBox.left;
      const pAy = b1.top + b1.height / 2 - contBox.top;

      // Point B: Top center of Card 02
      const pBx = b2.left + b2.width / 2 - contBox.left;
      const pBy = b2.top - contBox.top;

      // Point C: Bottom center of Card 02
      const pCx = b2.left + b2.width / 2 - contBox.left;
      const pCy = b2.bottom - contBox.top;

      // Point D: Top center of Card 03
      const pDx = b3.left + b3.width / 2 - contBox.left;
      const pDy = b3.top - contBox.top;

      // Point E: Bottom center of Card 03
      const pEx = b3.left + b3.width / 2 - contBox.left;
      const pEy = b3.bottom - contBox.top;

      // Point F: Top center of Card 04
      const pFx = b4.left + b4.width / 2 - contBox.left;
      const pFy = b4.top - contBox.top;

      // Point G: Bottom center of Card 04
      const pGx = b4.left + b4.width / 2 - contBox.left;
      const pGy = b4.bottom - contBox.top;

      // Point H: Bottom center of Card 05
      const pHx = b5.left + b5.width / 2 - contBox.left;
      const pHy = b5.bottom - contBox.top;

      // Path 1: From pA (right of Card 01) -> right to pBx -> turn down to pBy (top of Card 02)
      const r1 = Math.min(22, Math.max(6, (pBy - pAy) * 0.6));
      const p1 = `M ${pAx} ${pAy} L ${Math.max(pAx, pBx - r1)} ${pAy} Q ${pBx} ${pAy}, ${pBx} ${pAy + r1} L ${pBx} ${pBy}`;

      // Path 2: Straight vertical from Card 02 bottom to Card 03 top
      const p2 = `M ${pCx} ${pCy} L ${pDx} ${pDy}`;

      // Path 3: Straight vertical from Card 03 bottom to Card 04 top
      const p3 = `M ${pEx} ${pEy} L ${pFx} ${pFy}`;

      // Path 4: From Card 04 bottom -> down -> curve left -> across -> curve up into Card 05 bottom
      const turnY = Math.max(pGy, pHy) + 26;
      const r4 = Math.min(20, Math.max(8, (turnY - pGy) * 0.6));
      const r5 = Math.min(20, Math.max(8, (turnY - pHy) * 0.6));
      const p4 = `M ${pGx} ${pGy} L ${pGx} ${turnY - r4} Q ${pGx} ${turnY}, ${pGx - r4} ${turnY} L ${pHx + r5} ${turnY} Q ${pHx} ${turnY}, ${pHx} ${turnY - r5} L ${pHx} ${pHy}`;

      setPaths({ p1, p2, p3, p4 });
    };

    updatePaths();

    const ro = new ResizeObserver(() => {
      updatePaths();
    });

    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", updatePaths);

    // Also run on next tick to account for initial layout/fonts
    const timer = setTimeout(updatePaths, 150);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updatePaths);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="process" className="home-section">
      <div className="section-label-row">
        <h2 className="section-label">HOW WE WORKS</h2>
        <span className="micro-note">FROM FIRST CALL TO ONGOING SUPPORT</span>
      </div>

      <div ref={containerRef} className="relative w-full max-w-5xl mx-auto mt-8 lg:mt-12">
        {/* Dashed connector lines for desktop */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block"
          style={{ overflow: "visible" }}
          aria-hidden="true"
        >
          {paths && (
            <>
              <path
                d={paths.p1}
                fill="none"
                stroke="#9aa3b2"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
              <path
                d={paths.p2}
                fill="none"
                stroke="#9aa3b2"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
              <path
                d={paths.p3}
                fill="none"
                stroke="#9aa3b2"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
              <path
                d={paths.p4}
                fill="none"
                stroke="#9aa3b2"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
            </>
          )}
        </svg>

        {/* Desktop 2-Column Staggered Layout */}
        <div className="hidden md:grid grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Left Column: Step 01, Headline, Step 05 */}
          <div className="flex flex-col">
            <StepCard
              number={steps[0].number}
              title={steps[0].title}
              text={steps[0].text}
              icon={stepIcons[0]}
              cardRef={card1Ref}
            />

            {/* Middle Display Statement */}
            <div className="my-12 lg:my-16 pr-4">
              <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-ink uppercase tracking-tight leading-[1.05]">
                HOW WE<br />
                WORK ON A<br />
                <span className="text-[#A0E34F]">PROJECT</span>
              </h3>
              <p className="mt-4 text-[13.5px] text-muted max-w-xs leading-relaxed">
                From first call to ongoing support, with clear scopes, weekly demos, and code built to last.
              </p>
            </div>

            <StepCard
              number={steps[4].number}
              title={steps[4].title}
              text={steps[4].text}
              icon={stepIcons[4]}
              cardRef={card5Ref}
            />
          </div>

          {/* Right Column: Staggered spacer, Step 02, Gap, Step 03, Gap, Step 04, Brand footer */}
          <div className="flex flex-col pt-20 lg:pt-24">
            <StepCard
              number={steps[1].number}
              title={steps[1].title}
              text={steps[1].text}
              icon={stepIcons[1]}
              cardRef={card2Ref}
            />

            <div className="h-9 lg:h-12" aria-hidden="true" />

            <StepCard
              number={steps[2].number}
              title={steps[2].title}
              text={steps[2].text}
              icon={stepIcons[2]}
              cardRef={card3Ref}
            />

            <div className="h-9 lg:h-12" aria-hidden="true" />

            <StepCard
              number={steps[3].number}
              title={steps[3].title}
              text={steps[3].text}
              icon={stepIcons[3]}
              cardRef={card4Ref}
            />

            {/* Discreet Studio watermark */}
            <div className="pt-8 pl-4 opacity-70 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#aff45d] shadow-[0_0_8px_#aff45d]" />
              <span className="text-xs font-bold text-ink tracking-wider font-mono">CODEFREM</span>
              <span className="text-muted text-xs">| Studio Process</span>
            </div>
          </div>
        </div>

        {/* Mobile Sequential Timeline Flow */}
        <div className="flex md:hidden flex-col gap-4 items-center">
          <div className="w-full mb-3 px-1">
            <h3 className="text-2xl sm:text-3xl font-black text-ink uppercase tracking-tight leading-[1.1]">
              HOW A PROJECT <span className="text-[#A0E34F]">WORKS</span> WITH US.
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
              From first call to ongoing support, with clear scopes, weekly demos, and code built to last.
            </p>
          </div>

          {steps.map((step, idx) => {
            const Icon = stepIcons[idx];
            return (
              <div key={step.number} className="w-full flex flex-col items-center">
                <StepCard
                  number={step.number}
                  title={step.title}
                  text={step.text}
                  icon={Icon}
                  className="w-full"
                />
                {idx < steps.length - 1 && (
                  <div className="w-[2px] h-8 border-l-2 border-dashed border-[#9aa3b2] my-1.5" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
