/**
 * Single source of truth for every project on the site.
 *
 * The homepage horizontal showcase, the /projects grid, and every
 * /projects/[slug] case study all read from this one array.
 *
 * PLACEHOLDER CONTENT: all five projects are fictionalized case studies.
 * Client names are changed for confidentiality. Every placeholder field
 * is marked with a TODO: replace copy, images and testimonials with real
 * material as projects are cleared for publication.
 */

export type ProjectCategory = "Web Dev" | "UI/UX" | "3D & Motion" | "Brand";

export interface ProjectResult {
  value: string;
  label: string;
  /** Small context line under the metric, e.g. "down from 6.2s on 4G mobile". */
  context?: string;
}

export interface ProjectProcessStep {
  /** "01", "02", … */
  step: string;
  title: string;
  description: string;
}

export interface ProjectDeliverable {
  /** Icon key resolved to a lucide icon in the case-study template. */
  icon: string;
  title: string;
  description: string;
}

export interface ProjectGalleryItem {
  /** Optional image path (public/…). Gradient placeholder is used if absent. */
  src?: string;
  caption: string;
}

export interface ProjectTestimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface Project {
  slug: string;
  /** Two-digit display index, e.g. "01". */
  number: string;
  title: string;
  client: string;
  year: string;
  category: ProjectCategory;
  tagline: string;
  /** One-liner for the grid card. */
  description: string;
  /** 2-3 service pills on the card. */
  tags: string[];
  stack: {
    frontend?: string[];
    backend?: string[];
    infrastructure?: string[];
    design?: string[];
  };
  duration: string;
  /** Absent → the case study shows "Confidential". */
  liveUrl?: string;
  /** Hex accent used for the card's glow + placeholder overlays. */
  accentColor: string;
  /** Optional hero image (public/…). Gradient placeholder is used if absent. */
  heroImage?: string;
  gallery: ProjectGalleryItem[];
  problem: {
    body: string;
    challenges: string[];
  };
  solution: {
    body: string;
    deliverables: ProjectDeliverable[];
  };
  process: ProjectProcessStep[];
  results: ProjectResult[];
  testimonial?: ProjectTestimonial;
  /** Optional before/after strip for performance-focused projects. */
  beforeMetrics?: string[];
  afterMetrics?: string[];
  /** Exactly 3 slugs for the "More Work" section. */
  relatedSlugs?: string[];
}

/** Placeholder gradient per category (never external image URLs). */
export const categoryGradients: Record<ProjectCategory, string> = {
  "Web Dev": "linear-gradient(135deg, #1e3a8a, #7c3aed)",
  "UI/UX": "linear-gradient(135deg, #831843, #7c3aed)",
  "3D & Motion": "linear-gradient(135deg, #065f46, #0891b2)",
  Brand: "linear-gradient(135deg, #92400e, #b45309)",
};

export const projects: Project[] = [
  {
    slug: "nebula-finance",
    number: "01",
    title: "Nebula Finance",
    client: "Nebula Labs",
    year: "2025",
    category: "UI/UX",
    tagline: "From spreadsheet chaos to a dashboard traders open on purpose.",
    description:
      "A full dashboard redesign and design system for a next-gen fintech startup.",
    tags: ["Design System", "Fintech"],
    stack: {
      design: ["Figma", "FigJam", "Maze"],
      frontend: ["Next.js", "TypeScript", "Tailwind CSS"],
      infrastructure: ["Vercel"],
    },
    duration: "5 weeks",
    // TODO: add the live URL once the client approves publication.
    accentColor: "#a855f7",
    gallery: [
      // TODO: Replace gradient placeholders with actual project screenshots
      { caption: "Rebuilt trading dashboard, dark mode" },
      { caption: "Design system component sheet" },
      { caption: "Onboarding flow, step 1 of 3" },
    ],
    problem: {
      body: "Nebula's beta users loved the idea but abandoned the product. The dashboard buried critical numbers three clicks deep, and every feature shipped by a different contractor looked like it belonged to a different app. Support tickets were dominated by 'where do I find…' questions, and onboarding completion had stalled at 34%. The founding team knew the product was competitive; the experience wasn't.",
      challenges: [
        "Critical portfolio numbers buried three navigation levels deep",
        "Five contractor-built features with five conflicting visual languages",
        "Onboarding completion stuck at 34% with no diagnostics on why",
      ],
    },
    solution: {
      body: "We started by shadowing seven traders through their morning routine and mapping every question the dashboard had to answer. The information architecture was rebuilt around three of them: what do I own, what changed, what do I do next. A token-driven design system (color, type, spacing, 40+ documented components) replaced the patchwork, so every future feature ships looking like it belongs. Finally, onboarding was cut from nine steps to three, each with a visible next win. The marketing site was redesigned in the same system so the promise and the product finally match.",
      deliverables: [
        {
          icon: "layout",
          title: "Rebuilt dashboard IA",
          description: "Three questions, three surfaces: zero hunting.",
        },
        {
          icon: "layers",
          title: "Token-driven design system",
          description: "40+ components documented in Figma and code.",
        },
        {
          icon: "trending-up",
          title: "3-step onboarding",
          description: "Every step ends with a visible win.",
        },
        {
          icon: "globe",
          title: "Marketing site refresh",
          description: "Same system, same voice, new conversion paths.",
        },
      ],
    },
    process: [
      {
        step: "01",
        title: "Research",
        description:
          "Shadowed seven traders, interviewed the support queue, and turned complaints into a ranked list of broken journeys.",
      },
      {
        step: "02",
        title: "Wireframe",
        description:
          "Rebuilt the information architecture around the three questions traders actually ask, reviewed with real accounts.",
      },
      {
        step: "03",
        title: "Design",
        description:
          "Token-driven design system first, then high-fidelity screens, so every new feature inherits the language for free.",
      },
      {
        step: "04",
        title: "Test",
        description:
          "Moderated sessions with five beta users on clickable prototypes; fixed the three biggest drop-off points before code.",
      },
      {
        step: "05",
        title: "Deliver",
        description:
          "Engineered in Next.js with the client's team, documented in Figma, and handed over with component-by-component notes.",
      },
    ],
    results: [
      {
        value: "94%",
        label: "Onboarding completion",
        context: "up from 34% at project start",
      },
      {
        value: "2.1×",
        label: "Weekly active traders",
        context: "measured 8 weeks post-launch",
      },
      {
        value: "40+",
        label: "Design system components",
        context: "with Figma + code parity",
      },
    ],
    testimonial: {
      // TODO: Replace with real client testimonial
      quote:
        "Codefrem didn't just redesign the dashboard; they understood our traders better than we did. Support tickets about 'where do I find things' dropped to nearly zero within a month.",
      name: "Founder & CEO",
      role: "Founder & CEO",
      company: "Nebula Labs",
    },
    relatedSlugs: ["lumen-health", "orbit-commerce", "vertex-studio"],
  },
  {
    slug: "orbit-commerce",
    number: "02",
    title: "Orbit Commerce",
    client: "Orbit Retail Group",
    year: "2025",
    category: "Web Dev",
    tagline: "A headless storefront that loads before customers can blink.",
    description:
      "Headless storefront with sub-second page loads and 3D product previews.",
    tags: ["Next.js", "E-commerce"],
    stack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["Node.js", "PostgreSQL", "Stripe"],
      infrastructure: ["Vercel", "Edge Network"],
      design: ["Figma", "Spline"],
    },
    duration: "6 weeks",
    // TODO: add the live URL once the client approves publication.
    accentColor: "#7c3aed",
    gallery: [
      // TODO: Replace gradient placeholders with actual project screenshots
      { caption: "Homepage hero with 3D product preview" },
      { caption: "Product detail page: variant picker" },
      { caption: "Mobile checkout flow, two taps to pay" },
    ],
    problem: {
      body: "Orbit's legacy theme took over six seconds to render on a phone, and most of their traffic was phones. Every marketing experiment was locked behind a developer ticket, so campaigns died waiting for the backlog. Cart abandonment had climbed past 78% on mobile, and the previous agency's answer was 'buy a faster plan'. The business needed a storefront the marketing team could run, not just a faster version of the same cage.",
      challenges: [
        "6+ second mobile loads on the platform that paid the bills",
        "Every content change blocked behind a developer ticket",
        "78% cart abandonment on phones: the majority channel",
      ],
    },
    solution: {
      body: "We rebuilt Orbit as a headless Next.js storefront, rendering product pages at the edge so first paint lands in under a second on 4G. A component library with locked-down design tokens means the marketing team composes landing pages and campaign blocks themselves; no developer, no ticket, no drift. Product pages got Spline-powered 3D previews so shoppers can spin flagship items before buying, with a performance tier system that keeps them optional on weak connections. Checkout was rebuilt around Stripe with guest-first flow, address autocomplete and honest error states. Granular caching plus ISR keeps the catalog fresh without sacrificing speed.",
      deliverables: [
        {
          icon: "zap",
          title: "Edge rendering",
          description: "Product pages paint in under a second on 4G.",
        },
        {
          icon: "box",
          title: "3D product previews",
          description: "Spline configurators with low-end fallbacks.",
        },
        {
          icon: "layout",
          title: "Marketing component library",
          description: "Campaign pages without developer tickets.",
        },
        {
          icon: "gauge",
          title: "Performance budgets",
          description: "Enforced in CI; regressions fail the build.",
        },
      ],
    },
    process: [
      {
        step: "01",
        title: "Audit",
        description:
          "Profiled the legacy stack, traced the abandonment funnel, and set hard performance budgets before any redesign.",
      },
      {
        step: "02",
        title: "Architecture",
        description:
          "Chose the headless split: edge-rendered catalog, Stripe checkout, ISR for freshness, documented as API contracts.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Storefront, component library and 3D previews built in weekly increments against real product data.",
      },
      {
        step: "04",
        title: "Optimise",
        description:
          "Image pipeline, cache strategy and DPR-capped 3D tuned until every template passed the budget on a mid-range phone.",
      },
      {
        step: "05",
        title: "Handoff",
        description:
          "Marketing team trained on the component library; monitoring and a runbook left behind. We stay on call.",
      },
    ],
    results: [
      {
        value: "0.8s",
        label: "LCP on 4G mobile",
        context: "down from 6.2s on the legacy theme",
      },
      {
        value: "-31%",
        label: "Cart abandonment",
        context: "measured across 60 days post-launch",
      },
      {
        value: "+18%",
        label: "Conversion rate",
        context: "like-for-like traffic comparison",
      },
    ],
    beforeMetrics: ["6.2s LCP on 4G", "78% cart abandonment", "100% changes via dev tickets"],
    afterMetrics: ["0.8s LCP on 4G", "47% cart abandonment", "Campaign pages self-serve"],
    testimonial: {
      // TODO: Replace with real client testimonial
      quote:
        "Working with Codefrem transformed our online store. The speed improvement alone paid for the project in the first month, and our marketing team hasn't filed a dev ticket since launch.",
      name: "Head of Digital",
      role: "Head of Digital",
      company: "Orbit Retail Group",
    },
    relatedSlugs: ["vertex-studio", "aether-motors", "nebula-finance"],
  },
  {
    slug: "aether-motors",
    number: "03",
    title: "Aether Motors",
    client: "Aether Motors",
    year: "2024",
    category: "3D & Motion",
    tagline: "A hypercar you can spin, color and configure, in the browser.",
    description:
      "Interactive WebGL configurator for an electric hypercar launch site.",
    tags: ["WebGL", "Spline 3D"],
    stack: {
      frontend: ["Next.js", "TypeScript", "Spline", "GSAP"],
      design: ["Blender", "Figma", "After Effects"],
      infrastructure: ["Vercel"],
    },
    duration: "8 weeks",
    // TODO: add the live URL once the launch NDA expires.
    accentColor: "#0891b2",
    gallery: [
      // TODO: Replace gradient placeholders with actual project screenshots
      { caption: "Configurator: paint and wheel swap in real time" },
      { caption: "Scroll-driven cinematic intro sequence" },
      { caption: "Low-power fallback mode on mid-range mobile" },
    ],
    problem: {
      body: "Aether's launch depended entirely on press renders. Every paint and trim combination they wanted to show meant another photography day, and the photography budget was already spent. Meanwhile the pre-launch site held visitors for barely forty seconds; a spec sheet and a countdown don't make people fall in love with a car. They needed a way to let every visitor configure their dream build without a single new render.",
      challenges: [
        "Every config variant required a photo shoot the budget couldn't cover",
        "40-second average visit, no emotional connection to the car",
        "Launch site had to impress on press laptops and mid-range phones alike",
      ],
    },
    solution: {
      body: "We built the launch around a Spline-powered configurator: real-time paint, wheel and trim swaps on a photoreal-grade model, framed by a cinematic scroll-driven intro that hands you the keys. Every interaction was engineered to a strict performance budget (render-on-demand, DPR caps and a 30fps idle mode), so the scene holds 60fps on mid-range phones instead of melting them. A tiered fallback system swaps WebGL for a static gallery on weak devices, so nobody hits a black rectangle. Pre-orders flow straight from the configurator state: your exact build, submitted with your deposit.",
      deliverables: [
        {
          icon: "box",
          title: "Real-time configurator",
          description: "Paint, wheels and trim, swapped live in WebGL.",
        },
        {
          icon: "film",
          title: "Scroll-driven intro",
          description: "A cinematic sequence that ends at the configurator.",
        },
        {
          icon: "gauge",
          title: "Performance tiers",
          description: "60fps on mid-range phones, graceful fallbacks below.",
        },
        {
          icon: "trending-up",
          title: "Build-to-order flow",
          description: "The exact configured car attaches to the pre-order.",
        },
      ],
    },
    process: [
      {
        step: "01",
        title: "Concept",
        description:
          "Mapped the emotional arc: reveal, explore, configure, commit, and what each beat must make the visitor feel.",
      },
      {
        step: "02",
        title: "Model",
        description:
          "Prepared the Blender-sourced hypercar for real-time: retopology, baked lighting, LODs tuned for mobile GPUs.",
      },
      {
        step: "03",
        title: "Interact",
        description:
          "Built the Spline scene (material swapping, camera choreography and scroll sync) against the performance budget.",
      },
      {
        step: "04",
        title: "Optimise",
        description:
          "Render-on-demand, DPR caps, texture budgets and a device-tier system verified on real low-end hardware.",
      },
      {
        step: "05",
        title: "Launch",
        description:
          "Load-tested under press-day traffic spikes and shipped with monitoring on every tier's real-world fps.",
      },
    ],
    results: [
      {
        value: "3:40",
        label: "Avg. time in configurator",
        context: "against a 40-second site baseline",
      },
      {
        value: "2,400",
        label: "Pre-orders in week one",
        context: "with configured builds attached",
      },
      {
        value: "60fps",
        label: "On mid-range mobile",
        context: "with render-on-demand idle cost near zero",
      },
    ],
    testimonial: {
      // TODO: Replace with real client testimonial
      quote:
        "The configurator became the launch. Press covered the website itself, and our pre-order numbers beat the internal forecast by a factor we're still quoting in board meetings.",
      name: "CMO",
      role: "Chief Marketing Officer",
      company: "Aether Motors",
    },
    relatedSlugs: ["orbit-commerce", "vertex-studio", "nebula-finance"],
  },
  {
    slug: "lumen-health",
    number: "04",
    title: "Lumen Health",
    client: "Lumen Health",
    year: "2024",
    category: "Brand",
    tagline: "One calm, trustworthy identity for twelve very different markets.",
    description:
      "Patient-first platform design for a telehealth provider across 12 markets.",
    tags: ["Brand Identity", "Healthcare"],
    stack: {
      design: ["Figma", "FigJam"],
      frontend: ["Next.js", "Tailwind CSS"],
      infrastructure: ["Vercel"],
    },
    duration: "10 weeks",
    // TODO: confirm publication approval with compliance before adding a URL.
    accentColor: "#d97706",
    gallery: [
      // TODO: Replace gradient placeholders with actual project screenshots
      { caption: "Unified identity: one system, twelve markets" },
      { caption: "Localized booking flow, Arabic and German locales" },
      { caption: "WCAG AA color system across light and dark surfaces" },
    ],
    problem: {
      body: "Lumen operated in 12 countries with 12 visual dialects: different logos, tones, color systems and booking flows, inherited from regional agencies. Patients didn't trust what they didn't recognize, and trust is the entire product when the service is healthcare. Internally, every new market launch re-litigated the same design decisions from zero. Compliance requirements varied per region, which had become the excuse for the inconsistency nobody wanted to fix.",
      challenges: [
        "12 markets, 12 visual dialects, no recognizable parent brand",
        "Booking completion varied wildly by region with no shared pattern",
        "Accessibility and compliance requirements fragmented per market",
      ],
    },
    solution: {
      body: "We unified Lumen around a single calm system: one accessible color architecture (WCAG AA verified on every surface combination), a warm typographic voice that translates without losing tone, and one booking flow pattern that localizes cleanly per market: language, imagery and compliance details are variables, never redesigns. Regional teams got a documented system with explicit local-variant slots, so launching market thirteen is a configuration task, not a committee. The identity shipped with a brand book, a Figma library and coded components so the system survives contact with future vendors.",
      deliverables: [
        {
          icon: "palette",
          title: "Accessible color system",
          description: "WCAG AA verified on every surface pair.",
        },
        {
          icon: "globe",
          title: "Localized booking pattern",
          description: "One flow, twelve markets, zero redesigns.",
        },
        {
          icon: "layers",
          title: "Brand + Figma library",
          description: "Explicit local-variant slots per market.",
        },
        {
          icon: "shield",
          title: "Compliance integration",
          description: "Regional requirements built into the system, not bolted on.",
        },
      ],
    },
    process: [
      {
        step: "01",
        title: "Research",
        description:
          "Audited all twelve markets, interviewed regional teams, and mapped where inconsistency actually cost trust.",
      },
      {
        step: "02",
        title: "Wireframe",
        description:
          "Designed the one booking pattern every market would inherit, stress-tested against each region's compliance rules.",
      },
      {
        step: "03",
        title: "Design",
        description:
          "Built the unified identity (color, type, voice) with explicit slots for local variation instead of exceptions.",
      },
      {
        step: "04",
        title: "Test",
        description:
          "Usability and accessibility testing across four languages, including RTL, with real patients in three markets.",
      },
      {
        step: "05",
        title: "Deliver",
        description:
          "Brand book, Figma library and coded components, so market thirteen ships as configuration, not a new project.",
      },
    ],
    results: [
      {
        value: "12",
        label: "Markets unified",
        context: "one system, local variants by design",
      },
      {
        value: "+44%",
        label: "Booking completion",
        context: "average lift across the three worst regions",
      },
      {
        value: "AA+",
        label: "Accessibility across flows",
        context: "verified in four languages including RTL",
      },
    ],
    testimonial: {
      // TODO: Replace with real client testimonial
      quote:
        "For the first time, a patient in Berlin and a patient in Dubai know they're in the same hands. The system Codefrem built turns our thirteenth market launch into a checklist item.",
      name: "VP of Product",
      role: "VP of Product",
      company: "Lumen Health",
    },
    relatedSlugs: ["nebula-finance", "orbit-commerce", "vertex-studio"],
  },
  {
    slug: "vertex-studio",
    number: "05",
    title: "Vertex Studio",
    client: "Vertex VFX",
    year: "2023",
    category: "Web Dev",
    tagline: "A showreel site that feels like one of their own shots.",
    description:
      "Portfolio platform for a VFX studio with cinematic scroll storytelling.",
    tags: ["GSAP", "Creative Dev"],
    stack: {
      frontend: ["Next.js", "TypeScript", "GSAP", "Lenis"],
      backend: ["Node.js"],
      infrastructure: ["Vercel"],
      design: ["Figma", "After Effects"],
    },
    duration: "7 weeks",
    // TODO: add the live URL once the client approves publication.
    accentColor: "#4f46e5",
    gallery: [
      // TODO: Replace gradient placeholders with actual project screenshots
      { caption: "Scroll-sequenced project showcase" },
      { caption: "Lazy-loaded film plates with title-sequence intros" },
      { caption: "Notion-powered case study pages" },
    ],
    problem: {
      body: "Vertex's work is jaw-dropping; their website was a grid of compressed thumbnails. Studios that win awards were losing pitches to prettier PDFs, because the site flattened cinematic work into a contact sheet. Every project needed its full-resolution plates streamed to prove what the studio could do, and the old site streamed none of them. Worse, the team couldn't update anything without a developer, so new work sat unpublished for weeks.",
      challenges: [
        "Cinematic work flattened into a compressed thumbnail grid",
        "Losing pitches to agencies with better websites, not better work",
        "New projects unpublished for weeks: every update needed a developer",
      ],
    },
    solution: {
      body: "We built a GSAP-driven, scroll-sequenced showcase where each project plays like a mini title sequence: plates lazy-load in cinematic order, the scroll scrubs the timeline, and every sequence ends by handing the visitor to a full case study. A Notion-backed publishing pipeline means the studio drops new work into a database and the site rebuilds itself: no developer, no wait. Under the cinematic surface it's a ruthlessly optimized static build: 100 Lighthouse performance, sub-second first loads, and reduced-motion fallbacks that keep everything readable for every visitor.",
      deliverables: [
        {
          icon: "film",
          title: "Scroll-sequenced showcases",
          description: "Every project plays like a title sequence.",
        },
        {
          icon: "zap",
          title: "Cinematic lazy loading",
          description: "Full-res plates stream exactly when needed.",
        },
        {
          icon: "pen-tool",
          title: "Notion publishing",
          description: "New work self-publishes: no developer needed.",
        },
        {
          icon: "gauge",
          title: "100 Lighthouse perf",
          description: "Cinematic surface, static-build discipline underneath.",
        },
      ],
    },
    process: [
      {
        step: "01",
        title: "Audit",
        description:
          "Sit-down with the founders on what a pitch actually needs the site to prove, and where the old one lost deals.",
      },
      {
        step: "02",
        title: "Architecture",
        description:
          "Static Next.js with a Notion-backed content pipeline and a plate-streaming budget per project page.",
      },
      {
        step: "03",
        title: "Build",
        description:
          "Scroll-sequenced showcases engineered against real film plates, with GSAP timelines synced to Lenis scroll.",
      },
      {
        step: "04",
        title: "Optimise",
        description:
          "Plate preloading strategy, reduced-motion fallbacks and performance tuning until Lighthouse read 100.",
      },
      {
        step: "05",
        title: "Handoff",
        description:
          "The studio published their next two projects themselves, from Notion, without emailing us once.",
      },
    ],
    results: [
      {
        value: "4:12",
        label: "Avg. session duration",
        context: "visitors watch the sequences, not skim them",
      },
      {
        value: "+60%",
        label: "Inbound pitch requests",
        context: "first quarter after launch",
      },
      {
        value: "100",
        label: "Lighthouse performance",
        context: "with full-resolution film plates",
      },
    ],
    beforeMetrics: ["Compressed thumbnail grid", "Weeks to publish new work", "No motion on the reel"],
    afterMetrics: ["Scroll-sequenced full-plate showcase", "Self-serve Notion publishing", "Scroll-scrubbed film sequences"],
    testimonial: {
      // TODO: Replace with real client testimonial
      quote:
        "Our site finally competes with our reel. We've had clients quote the website back to us in first calls, and we publish new work ourselves in minutes.",
      name: "Founding Partner",
      role: "Founding Partner",
      company: "Vertex VFX",
    },
    relatedSlugs: ["orbit-commerce", "aether-motors", "nebula-finance"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsBySlugs(slugs: string[]): Project[] {
  return slugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => Boolean(p));
}

/** All categories that actually have projects, in tab order. */
export const projectCategories: ProjectCategory[] = [
  "Web Dev",
  "UI/UX",
  "3D & Motion",
  "Brand",
];
