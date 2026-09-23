/**
 * Single source of truth for every project on the site.
 *
 * The homepage horizontal showcase, the /projects grid, and every
 * /projects/[slug] case study all read from this one array.
 *
 * Preview assets come from public/images. Existing illustrative case-study
 * copy remains until approved project details are supplied. The RAG project
 * uses the supplied brief and capabilities rather than measured results.
 */

export type ProjectCategory = "Web Dev" | "UI/UX" | "3D & Motion" | "Brand" | "Data Science";

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
  /** Supplied project asset, served from public/. */
  heroImage: string;
  imageAlt: string;
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
  "Data Science": "linear-gradient(135deg, #065f46, #0891b2)",
};

export const projects: Project[] = [
  {
    slug: "style-hub",
    heroImage: "/images/style_hub.png",
    imageAlt: "Style Hub fashion storefront with clothing and accessories",
    number: "01",
    title: "Style Hub",
    client: "Style Hub",
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
      body: "Style Hub's beta users loved the idea but abandoned the product. The dashboard buried critical numbers three clicks deep, and every feature shipped by a different contractor looked like it belonged to a different app. Support tickets were dominated by 'where do I find…' questions, and onboarding completion had stalled at 34%. The founding team knew the product was competitive; the experience wasn't.",
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
      company: "Style Hub",
    },
    relatedSlugs: ["trueman", "harrington-property-group", "zaiqa"],
  },
  {
    slug: "harrington-property-group",
    heroImage: "/images/Harington_house.png",
    imageAlt: "Harrington Property Group real estate website with a modern home",
    number: "02",
    title: "Harrington Property Group",
    client: "Harrington Property Group",
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
      body: "Harrington Property Group's legacy theme took over six seconds to render on a phone, and most of their traffic was phones. Every marketing experiment was locked behind a developer ticket, so campaigns died waiting for the backlog. Cart abandonment had climbed past 78% on mobile, and the previous agency's answer was 'buy a faster plan'. The business needed a storefront the marketing team could run, not just a faster version of the same cage.",
      challenges: [
        "6+ second mobile loads on the platform that paid the bills",
        "Every content change blocked behind a developer ticket",
        "78% cart abandonment on phones: the majority channel",
      ],
    },
    solution: {
      body: "We rebuilt Harrington Property Group as a headless Next.js storefront, rendering product pages at the edge so first paint lands in under a second on 4G. A component library with locked-down design tokens means the marketing team composes landing pages and campaign blocks themselves; no developer, no ticket, no drift. Product pages got Spline-powered 3D previews so shoppers can spin flagship items before buying, with a performance tier system that keeps them optional on weak connections. Checkout was rebuilt around Stripe with guest-first flow, address autocomplete and honest error states. Granular caching plus ISR keeps the catalog fresh without sacrificing speed.",
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
      company: "Harrington Property Group",
    },
    relatedSlugs: ["zaiqa", "rag-video-chatbot", "style-hub"],
  },
  {
    slug: "trueman",
    heroImage: "/images/True_man_sailor.png",
    imageAlt: "Trueman grooming website with a barber cutting hair",
    number: "04",
    title: "Trueman",
    client: "Trueman",
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
      body: "Trueman operated in 12 countries with 12 visual dialects: different logos, tones, color systems and booking flows, inherited from regional agencies. Patients didn't trust what they didn't recognize, and trust is the entire product when the service is healthcare. Internally, every new market launch re-litigated the same design decisions from zero. Compliance requirements varied per region, which had become the excuse for the inconsistency nobody wanted to fix.",
      challenges: [
        "12 markets, 12 visual dialects, no recognizable parent brand",
        "Booking completion varied wildly by region with no shared pattern",
        "Accessibility and compliance requirements fragmented per market",
      ],
    },
    solution: {
      body: "We unified Trueman around a single calm system: one accessible color architecture (WCAG AA verified on every surface combination), a warm typographic voice that translates without losing tone, and one booking flow pattern that localizes cleanly per market: language, imagery and compliance details are variables, never redesigns. Regional teams got a documented system with explicit local-variant slots, so launching market thirteen is a configuration task, not a committee. The identity shipped with a brand book, a Figma library and coded components so the system survives contact with future vendors.",
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
      company: "Trueman",
    },
    relatedSlugs: ["style-hub", "harrington-property-group", "zaiqa"],
  },
  {
    slug: "zaiqa",
    heroImage: "/images/Zaiqa.png",
    imageAlt: "Zaiqa restaurant website featuring chicken karahi",
    number: "05",
    title: "Zaiqa",
    client: "Zaiqa",
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
      body: "Zaiqa's work is jaw-dropping; their website was a grid of compressed thumbnails. Studios that win awards were losing pitches to prettier PDFs, because the site flattened cinematic work into a contact sheet. Every project needed its full-resolution plates streamed to prove what the studio could do, and the old site streamed none of them. Worse, the team couldn't update anything without a developer, so new work sat unpublished for weeks.",
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
      company: "Zaiqa",
    },
    relatedSlugs: ["harrington-property-group", "rag-video-chatbot", "style-hub"],
  },
   {
    slug: "rag-video-chatbot",
    number: "03",
    title: "RAG Video Chatbot — Built with Python",
    client: "Codefrem",
    year: "2026",
    category: "Data Science",
    tagline: "Context-aware answers from your documents through interactive video conversation.",
    description: "Python-powered video chatbot with RAG and a custom document knowledge base.",
    tags: ["Python", "RAG", "Video Chat"],
    stack: { backend: ["Python", "LangChain", "FAISS"], frontend: ["Streamlit", "WebRTC"] },
    duration: "Project-based",
    accentColor: "#0891b2",
    heroImage: "/images/data_science.png",
    imageAlt: "RAG Video Chatbot project overview showing document retrieval and video conversation",
    gallery: [],
    problem: {
      body: "Finding specific information inside large documents and video content can be time-consuming. Traditional chatbots often lack access to private or project-specific knowledge, which can lead to generic or unreliable answers. Users need a faster way to interact with their own data through natural conversation.",
      challenges: ["Information spread across large documents and video content", "Generic answers without project-specific context", "Slow manual searching through private knowledge"],
    },
    solution: {
      body: "We built a Python-powered RAG Video Chatbot that combines Retrieval-Augmented Generation with an interactive video-based chat experience. Users can upload their own documents, retrieve relevant information from a knowledge base, and ask questions through a conversational interface. The system uses retrieved context to generate grounded, context-aware responses.",
      deliverables: [
        { icon: "layers", title: "Custom knowledge base", description: "Upload documents for contextual retrieval." },
        { icon: "film", title: "Video conversation", description: "Interact with the assistant through a video-based chat experience." },
        { icon: "layout", title: "RAG responses", description: "Generate answers using relevant retrieved context." },
      ],
    },
    process: [],
    results: [
      { value: "RAG-powered", label: "Context-aware responses" },
      { value: "Real-time", label: "Interactive video conversation" },
      { value: "Custom Knowledge", label: "Answers from user documents" },
    ],
    relatedSlugs: ["style-hub", "harrington-property-group", "zaiqa"],
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
  "Data Science",
  "Brand",
];
