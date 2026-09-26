/**
 * Single source of truth for every project on the site.
 *
 * The homepage horizontal showcase, the /projects grid, and every
 * /projects/[slug] case study all read from this one array.
 *
 * Preview assets come from public/images. The four self-initiated projects
 * below use real case-study content; the RAG project uses the supplied brief
 * and capabilities rather than measured results.
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
  process: ProjectProcessStep[]; results: ProjectResult[];

  /** Real feature bullets shown in the case-study "Highlights" section. */
  highlights: string[];

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
    category: "Web Dev",
    tagline: "A fashion storefront with real product browsing and cart, not a demo shell.",
    description:
      "A fashion storefront with real product browsing and cart, not a demo shell.",
    tags: ["E-Commerce", "Fashion"],
    stack: {
      // TODO: confirm the real stack — user will supply it.
      frontend: ["React"],
    },
    duration: "Self-initiated project",
    accentColor: "#a855f7",
    gallery: [
      { caption: "Product listings across clothing and accessories" },
      { caption: "Product detail with add-to-cart" },
      { caption: "Cart and checkout flow" },
    ],
    problem: {
      body: "Fashion brands need a storefront where browsing, product detail and checkout all feel as smooth as a hosted platform, without the recurring platform fees.",
      challenges: [
        "Shoppers expect the browse → product → cart → checkout path to feel like a hosted platform",
        "Hosted commerce platforms deliver that experience but charge recurring fees",
        "The storefront had to be built from scratch as a real React application",
      ],
    },
    solution: {
      body: "Built as a clothing and accessories storefront with product listings, a cart, and a checkout flow, built as a React application from scratch.",
      deliverables: [
        {
          icon: "layout",
          title: "Product listings",
          description: "Browsing across clothing and accessories.",
        },
        {
          icon: "shopping-bag",
          title: "Cart and checkout",
          description: "A complete flow from add-to-cart to order.",
        },
        {
          icon: "globe",
          title: "Live storefront",
          description: "Built and deployed end-to-end.",
        },
      ],
    },
    process: [
      {
        step: "01",
        title: "Plan",
        description:
          "Mapped the catalog and the pages a clothing storefront needs: listings, product detail, cart and checkout.",
      },
      {
        step: "02",
        title: "Build",
        description:
          "Built the React application from scratch: product data, listings and the cart state behind them.",
      },
      {
        step: "03",
        title: "Checkout",
        description:
          "Wired the cart into a checkout flow and walked the full path from product page to completed order.",
      },
      {
        step: "04",
        title: "Polish",
        description:
          "Responsive passes and edge-case clean-up across the catalog, cart and checkout.",
      },
      {
        step: "05",
        title: "Deploy",
        description:
          "Shipped the storefront live and verified the full purchase path.",
      },
    ],
    results: [],
    highlights: [
      "Full storefront and cart flow",
      "Built and deployed end-to-end",
      // TODO: swap in the confirmed stack bullet once the user supplies it.
    ],
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
    tagline: "A luxury property site built to work across four regions at once.",
    description:
      "A luxury property site built to work across four regions at once.",
    tags: ["Real Estate", "Multi-Region"],
    stack: {
      // TODO: confirm the real stack — user will supply it.
      frontend: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
    duration: "Self-initiated project",
    accentColor: "#7c3aed",
    gallery: [
      { caption: "Property listings across four regions" },
      { caption: "Listing detail presentation" },
      { caption: "Homepage tuned for luxury buyers" },
    ],
    problem: {
      body: "Real estate agents working across multiple countries need one site that reads as credible to very different buyers (AU, US, UK, Gulf).",
      challenges: [
        "Four very different buyer markets: AU, US, UK and the Gulf",
        "Luxury buyers judge credibility within seconds of landing",
        "One site has to read as credible in all four markets at once",
      ],
    },
    solution: {
      body: "Built as a real-estate platform for a luxury/residential specialist, with property listings presented to read as credible across all four markets.",
      deliverables: [
        {
          icon: "layout",
          title: "Property listings",
          description: "Luxury and residential listings in one place.",
        },
        {
          icon: "globe",
          title: "Four-region presentation",
          description: "Reads as credible to AU, US, UK and Gulf buyers.",
        },
        {
          icon: "zap",
          title: "Built and deployed end-to-end",
          description: "From empty repo to a live site.",
        },
      ],
    },
    process: [
      {
        step: "01",
        title: "Plan",
        description:
          "Planned the platform around four buyer regions (AU, US, UK, Gulf) and the property listing types they expect.",
      },
      {
        step: "02",
        title: "Build",
        description:
          "Built the real-estate platform: property listings and the detail presentation around them.",
      },
      {
        step: "03",
        title: "Regionalise",
        description:
          "Tuned how listings are presented so the site reads as credible across all four markets.",
      },
      {
        step: "04",
        title: "Polish",
        description:
          "Responsive passes and clean-up across the listings and marketing pages.",
      },
      {
        step: "05",
        title: "Deploy",
        description:
          "Shipped the site live and reviewed it against all four regions.",
      },
    ],
    results: [],
    highlights: [
      "Multi-region property showcase",
      "Built and deployed end-to-end",
      // TODO: swap in the confirmed stack bullet once the user supplies it.
    ],
    relatedSlugs: ["zaiqa", "rag-video-chatbot", "style-hub"],
  },
  {
    slug: "trueman",
    heroImage: "/images/True_man_sailor.png",
    imageAlt: "Trueman grooming website with a barber cutting hair",
    number: "04",
    title: "Trueman",
    client: "Trueman Grooming Co.",
    year: "2024",
    category: "Web Dev",
    tagline: "Online booking for a barbershop, so chairs fill without a phone call.",
    description:
      "Online booking for a barbershop, so chairs fill without a phone call.",
    tags: ["Booking System", "Service Business"],
    stack: {
      // TODO: confirm the real stack — user will supply it.
      frontend: ["Next.js", "Tailwind CSS"],
    },
    duration: "Self-initiated project",
    accentColor: "#d97706",
    gallery: [
      { caption: "Service catalog: haircuts, hot towel shaves, beard work" },
      { caption: "Live online scheduling flow" },
      { caption: "Booking-first homepage" },
    ],
    problem: {
      body: "Appointment-based businesses lose bookings when customers can only reserve a slot by phone during business hours.",
      challenges: [
        "Bookings only by phone, during business hours",
        "Every missed call is an empty chair later that week",
        "The site had to lead with booking, not just barbershop information",
      ],
    },
    solution: {
      body: "Built as a booking-first site with a service catalog (haircuts, hot towel shaves, beard work) and a live online scheduling flow.",
      deliverables: [
        {
          icon: "layout",
          title: "Service catalog",
          description: "Haircuts, hot towel shaves, beard work.",
        },
        {
          icon: "trending-up",
          title: "Live scheduling",
          description: "Customers reserve a slot online, any time.",
        },
        {
          icon: "shield",
          title: "Booking-first structure",
          description: "Every page routes toward booking a chair.",
        },
      ],
    },
    process: [
      {
        step: "01",
        title: "Plan",
        description:
          "Defined the service catalog (haircuts, hot towel shaves, beard work) and the booking flow around it.",
      },
      {
        step: "02",
        title: "Build",
        description:
          "Built the booking-first site: service pages that lead straight into scheduling.",
      },
      {
        step: "03",
        title: "Schedule",
        description:
          "Wired the live scheduling flow so customers pick a service and reserve a slot online.",
      },
      {
        step: "04",
        title: "Polish",
        description:
          "Responsive passes and clean-up across the catalog and booking flow.",
      },
      {
        step: "05",
        title: "Deploy",
        description:
          "Shipped the site live and verified the booking path end to end.",
      },
    ],
    results: [],
    highlights: [
      "Live booking flow",
      "Service catalog",
      // TODO: swap in the confirmed stack bullet once the user supplies it.
    ],
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
    tagline: "A local food ordering site built for how people actually order in Lahore.",
    description:
      "A local food ordering site built for how people actually order in Lahore.",
    tags: ["Full-Stack", "Food & Delivery"],
    stack: {
      // TODO: confirm the real stack — user will supply it.
      frontend: ["Next.js", "TypeScript"],
      backend: ["Node.js"],
    },
    duration: "Self-initiated project",
    accentColor: "#4f46e5",
    gallery: [
      { caption: "Browsable menu: desi food, BBQ, fast food" },
      { caption: "Cart and order flow" },
      { caption: "Listings and order management backend" },
    ],
    problem: {
      body: "Small local restaurants are stuck between expensive delivery apps and no online presence, losing direct orders to commission fees.",
      challenges: [
        "Delivery apps take a commission on every order they route",
        "No online presence means direct orders go to whoever picks up the phone",
        "Menu and orders needed to be manageable day to day",
      ],
    },
    solution: {
      body: "Built as a standalone ordering platform with a browsable menu (desi food, BBQ, fast food), a cart/order flow, and a backend to manage listings and orders.",
      deliverables: [
        {
          icon: "layout",
          title: "Browsable menu",
          description: "Desi food, BBQ and fast food, categorised for ordering.",
        },
        {
          icon: "shopping-bag",
          title: "Cart and order flow",
          description: "From menu to a placed order.",
        },
        {
          icon: "layers",
          title: "Listings and orders backend",
          description: "Menu and orders managed from one place.",
        },
      ],
    },
    process: [
      {
        step: "01",
        title: "Plan",
        description:
          "Structured the menu into browsable categories — desi food, BBQ, fast food — around how people actually order.",
      },
      {
        step: "02",
        title: "Build",
        description:
          "Built the standalone ordering platform: menu pages, cart and the order flow.",
      },
      {
        step: "03",
        title: "Backend",
        description:
          "Built the backend that manages listings and orders.",
      },
      {
        step: "04",
        title: "Polish",
        description:
          "Responsive passes and clean-up across the menu and ordering flow.",
      },
      {
        step: "05",
        title: "Deploy",
        description:
          "Shipped the platform live and verified ordering end to end.",
      },
    ],
    results: [],
    highlights: [
      "Full menu and ordering flow",
      "Built and deployed end-to-end",
      // TODO: swap in the confirmed stack bullet once the user supplies it.
    ],
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
    heroImage: "/images/rag-chatbot.png",
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
    results: [],
    highlights: [
      "RAG-powered, context-aware responses",
      "Real-time interactive video conversation",
      "Answers grounded in the user's own documents",
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
  "Data Science",
];
