/**
 * Single source of truth for every project on the site.
 *
 * The homepage horizontal showcase, the /projects grid, and every
 * /projects/[slug] case study all read from this one array — add or edit a
 * project here and it updates everywhere. Swap the placeholder case-study
 * copy (problem/solution/visuals/results) with real content as you go.
 */

export interface ProjectResult {
  value: string;
  label: string;
}

export interface Project {
  /** URL slug, e.g. "nebula-finance" → /projects/nebula-finance */
  slug: string;
  /** Two-digit display index, e.g. "01" */
  id: string;
  title: string;
  category: string;
  description: string;
  year: string;
  tags: string[];
  /** Tailwind gradient classes used by the card visual (matches homepage). */
  gradient: string;
  /** Optional thumbnail (public/...). Falls back to the typographic visual. */
  image?: string;
  client: string;
  role: string;
  caseStudy: {
    /** One line, used as the meta description and card subtitle. */
    summary: string;
    problem: string;
    solution: string;
    /** Placeholder for screenshots — drop image paths into public/ and list them. */
    visuals: { src: string; alt: string }[];
    results: ProjectResult[];
    services: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "nebula-finance",
    id: "01",
    title: "Nebula Finance",
    category: "UI/UX Design",
    description: "A full rebrand and dashboard redesign for a next-gen fintech startup.",
    year: "2025",
    tags: ["Fintech", "Design System"],
    gradient: "from-[#AAFF00]/25 via-[#0A0A0A] to-[#0A0A0A]",
    client: "Nebula Labs",
    role: "Product Design, Design System",
    caseStudy: {
      summary: "From spreadsheet chaos to a dashboard traders open on purpose.",
      problem:
        "Nebula's beta users loved the idea but abandoned the product: the dashboard buried critical numbers three clicks deep, and every new feature looked like it belonged to a different app. Onboarding completion sat at 34%.",
      solution:
        "We rebuilt the information architecture around the three questions traders actually ask, designed a token-driven design system (color, type, spacing, 40+ components), and shipped a marketing site that speaks human, not fintech.",
      visuals: [
        // Add screenshots to /public and reference them here, e.g.:
        // { src: "/projects/nebula-dashboard.png", alt: "Nebula analytics dashboard" },
      ],
      results: [
        { value: "94%", label: "Onboarding completion" },
        { value: "2.1×", label: "Weekly active traders" },
        { value: "40+", label: "Design system components" },
      ],
      services: ["UI/UX Design", "Design System", "Web Development"],
    },
  },
  {
    slug: "orbit-commerce",
    id: "02",
    title: "Orbit Commerce",
    category: "Web Development",
    description: "Headless storefront with sub-second page loads and 3D product previews.",
    year: "2025",
    tags: ["E-commerce", "Next.js"],
    gradient: "from-white/15 via-[#0A0A0A] to-[#0A0A0A]",
    client: "Orbit Retail Group",
    role: "Full-Stack Development",
    caseStudy: {
      summary: "A headless storefront that loads before customers can blink.",
      problem:
        "Orbit's legacy theme took 6+ seconds to render on mobile and locked every experiment behind a developer ticket. Cart abandonment climbed past 78% on phones.",
      solution:
        "We moved them to a headless Next.js storefront with edge rendering, granular caching and a component library the marketing team composes without us. 3D product previews (Spline) let shoppers spin flagship items before buying.",
      visuals: [],
      results: [
        { value: "0.8s", label: "LCP on 4G mobile" },
        { value: "-31%", label: "Cart abandonment" },
        { value: "+18%", label: "Conversion rate" },
      ],
      services: ["Web Development", "3D Designs", "Motion Graphics"],
    },
  },
  {
    slug: "aether-motors",
    id: "03",
    title: "Aether Motors",
    category: "3D & Motion",
    description: "Interactive WebGL configurator for an electric hypercar launch site.",
    year: "2024",
    tags: ["WebGL", "Spline 3D"],
    gradient: "from-[#AAFF00]/25 via-[#0A0A0A] to-[#0A0A0A]",
    client: "Aether Motors",
    role: "3D Design, Creative Development",
    caseStudy: {
      summary: "A hypercar you can spin, color and configure — right in the browser.",
      problem:
        "Aether's launch depended on press renders. Every paint/trim combination they wanted to show meant another photography day, and the site had no way to hold a visitor longer than 40 seconds.",
      solution:
        "We built a Spline-powered configurator: real-time paint and wheel swaps, a cinematic scroll-driven intro, and a performance budget (DPR caps, render-on-demand) that keeps it at 60fps on mid-range phones.",
      visuals: [],
      results: [
        { value: "3:40", label: "Avg. time on configurator" },
        { value: "2,400", label: "Pre-orders in week one" },
        { value: "60fps", label: "On mid-range mobile" },
      ],
      services: ["3D Designs", "Motion Graphics", "Web Development"],
    },
  },
  {
    slug: "lumen-health",
    id: "04",
    title: "Lumen Health",
    category: "Brand Identity",
    description: "Patient-first platform design for a telehealth provider across 12 markets.",
    year: "2024",
    tags: ["Healthcare", "Product Design"],
    gradient: "from-white/15 via-[#0A0A0A] to-[#0A0A0A]",
    client: "Lumen Health",
    role: "Brand Identity, Product Design",
    caseStudy: {
      summary: "One calm, trustworthy identity for twelve very different markets.",
      problem:
        "Lumen operated in 12 countries with 12 visual dialects — different logos, tones and booking flows. Patients didn't trust what they didn't recognize.",
      solution:
        "We unified the brand around a single calm system: accessible color (WCAG AA on every surface), a warm typographic voice, and one booking flow pattern localized per market without redesigning twelve times.",
      visuals: [],
      results: [
        { value: "12", label: "Markets unified" },
        { value: "+44%", label: "Booking completion" },
        { value: "AA+", label: "Accessibility across flows" },
      ],
      services: ["UI/UX Design", "Brand Identity"],
    },
  },
  {
    slug: "vertex-studio",
    id: "05",
    title: "Vertex Studio",
    category: "Full-Stack Build",
    description: "Portfolio platform for a VFX studio with cinematic scroll storytelling.",
    year: "2023",
    tags: ["Creative Dev", "GSAP"],
    gradient: "from-[#AAFF00]/25 via-[#0A0A0A] to-[#0A0A0A]",
    client: "Vertex VFX",
    role: "Creative Development",
    caseStudy: {
      summary: "A showreel site that feels like one of their own shots.",
      problem:
        "Vertex's work is jaw-dropping; their website was a grid of compressed thumbnails. Studios that win awards were losing pitches to prettier PDFs.",
      solution:
        "We built a GSAP-driven, scroll-sequenced showcase: each project plays like a mini title sequence, lazy-loads its plates, and hands the visitor to a case study. All on a static Next.js build their team deploys from Notion.",
      visuals: [],
      results: [
        { value: "4:12", label: "Avg. session duration" },
        { value: "+60%", label: "Inbound pitch requests" },
        { value: "100", label: "Lighthouse performance" },
      ],
      services: ["Web Development", "Motion Graphics"],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
