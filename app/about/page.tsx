import type { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import StatBlock, { type Stat } from "@/components/ui/StatBlock";
import Marquee from "@/components/ui/Marquee";
import TeamCard from "@/components/ui/TeamCard";
import CtaFooter from "@/components/ui/CtaFooter";
import Footer from "@/components/ui/Footer";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "About — Codefrem",
  description:
    "Codefrem is a two-person studio blending deep engineering logic with avant-garde aesthetics. Meet the founders and the way we work.",
};

const approach = [
  {
    icon: "✦",
    title: "Design that answers to data",
    body: "Every pixel earns its place. We prototype, measure, and keep what moves the numbers — aesthetics follow evidence, not trends.",
  },
  {
    icon: "⚡",
    title: "Performance is a feature",
    body: "60fps isn't a luxury; it's the baseline. Render budgets, DPR caps and lazy everything — beauty that never taxes the battery.",
  },
  {
    icon: "◆",
    title: "Small team, senior hands",
    body: "No hand-offs, no layers. The people you meet on day one are the people designing and shipping your product.",
  },
  {
    icon: "❖",
    title: "Partners, not vendors",
    body: "We join your standups, argue about the roadmap, and stay after launch. Your wins are the portfolio we actually care about.",
  },
];

const stats: Stat[] = [
  { value: "30+", label: "Project Built" },
  { value: "2000+", label: "Coding Hours" },
  { value: "3+", label: "Years Exp." },
  { value: "24/7", label: "Response Time" },
];

export default function AboutPage() {
  return (
    <main className="bg-[#0A0A0A] text-white">
      <PageHero
        eyebrow="Who We Are"
        line1="A two-person studio turning ideas into"
        highlight="masterpieces"
        lead="We may be compact, but our creativity isn't. Codefrem blends deep engineering logic with avant-garde aesthetics to build digital products that move the numbers — and the people using them."
      />

      {/* Founder story */}
      <section className="w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="Our Story"
              title="Built by two people who"
              highlight="care"
            />
            <div className="space-y-4 text-gray-400 text-sm leading-relaxed -mt-4">
              <p>
                Codefrem started the way most good things do: two friends, one
                too-ambitious side project, and a stubborn belief that a website
                could feel alive without feeling heavy.
              </p>
              <p>
                Three years and thirty-something projects later, we&apos;re
                still deliberately small. Every client works directly with the
                founders — the person who designs your product is the person who
                answers your messages.
              </p>
              <p>
                We take on few projects, go unreasonably deep on each, and treat
                performance budgets with the same respect as brand guidelines.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <GlowCard className="min-h-[220px] flex flex-col justify-between">
                <span className="text-4xl font-serif italic text-[#AAFF00]">
                  “
                </span>
                <div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    If it doesn&apos;t feel effortless to use, it doesn&apos;t
                    ship — no matter how good the Figma file looks.
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-widest text-gray-500 font-bold">
                    — The one who designs
                  </p>
                </div>
              </GlowCard>
              <GlowCard className="min-h-[220px] flex flex-col justify-between">
                <span className="text-4xl font-serif italic text-[#AAFF00]">
                  “
                </span>
                <div>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    Nobody notices a fast website. Everybody notices a slow one.
                    We build for the silence.
                  </p>
                  <p className="mt-4 text-xs uppercase tracking-widest text-gray-500 font-bold">
                    — The one who ships
                  </p>
                </div>
              </GlowCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Our approach — GlowCard grid */}
      <section className="w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-12 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="How We Work"
            title="Our"
            highlight="Approach"
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-2">
            {approach.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <GlowCard className="h-full min-h-[230px] flex flex-col">
                  <span className="w-11 h-11 rounded-2xl bg-[#1a1a1a] border border-[#333333] flex items-center justify-center text-[#AAFF00] text-lg">
                    {item.icon}
                  </span>
                  <h3 className="mt-5 text-lg font-serif text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-gray-400 text-sm leading-relaxed">
                    {item.body}
                  </p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team grid */}
      <section className="w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="The Studio"
            title="Meet the"
            highlight="Team"
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto -mt-2">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 120}>
                <TeamCard member={member} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="w-full py-14 lg:py-20 px-4 sm:px-6 lg:px-12">
        <StatBlock stats={stats} />
      </section>

      <Marquee />
      <Footer />
      {/* <CtaFooter title="Let's build your next flagship project" /> */}
    </main>
  );
}
