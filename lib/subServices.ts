/**
 * Single source of truth for the sub-service pages.
 *
 * /services/<category>/<slug> pages, and the category cards on /services,
 * all read from this file. To add a service: add a `SubService` to the
 * matching category's `services` array, then create the 10-line page file
 * under app/services/<category>/<slug>/page.tsx.
 */

import type { LucideIcon } from "lucide-react";
import { landingPages, studioDisciplines } from "./studioServices";
export { studioDisciplines } from "./studioServices";
import {
  BarChart3,
  Bot,
  Brain,
  Code2,
  Database,
  Layout,
  LineChart,
  ShoppingCart,
  Wrench,
} from "lucide-react";

export interface ProcessStep {
  title: string;
  body: string;
}

export interface Feature {
  icon: LucideIcon;
  title: string;
  body: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Plan {
  name: string;
  price: string;
  /** One line: who this plan is for. */
  blurb: string;
  features: string[];
  /** The middle (Standard) plan gets the lime highlight treatment. */
  featured?: boolean;
}

export interface SubService {
  /** Path under /services/, e.g. "web-development/custom-website". */
  slug: string;
  /** Page H1. */
  title: string;
  /** Lime tagline, max 8 words. */
  tagline: string;
  /** Two-sentence hero description. */
  description: string;
  explanation: string[];
  /** 4-6 "what you get" cards, written from the client's perspective. */
  features: Feature[];
  /** 4-5 process steps specific to this service. */
  process: ProcessStep[];
  tools: string[];
  price: string;
  timeline: string;
  /** Starter / Standard / Premium tiers. */
  plans: Plan[];
  faqs: Faq[];
}

export interface Category {
  id: string;
  title: string;
  icon: LucideIcon;
  /** One-line description for the category card on /services. */
  description: string;
  services: SubService[];
}

/* ------------------------------------------------------------------ */
/* Category 1 - Web Development                                        */
/* ------------------------------------------------------------------ */

export const webDevelopment: Category = {
  id: "web-development",
  title: "Web Development",
  icon: Code2,
  description:
    "Fast, typed, reliable web products: from marketing sites to full platforms.",
  services: [
    landingPages,
    {
      slug: "web-development/custom-website",
      explanation: [
        "A custom website is useful when your content, customer journeys, or business workflows no longer fit a standard theme. We begin with your audience, page structure, and the actions visitors should take. The agreed scope identifies each page type, content responsibility, integration, and editing requirement before design starts.",
        "You review wireframes and visual designs before development, then use a preview site to check the actual experience. Delivery includes responsive pages, accessible navigation, metadata, image optimization, and testing of agreed forms and integrations. We hand over the code and deployment guidance; hosting subscriptions, additional content, and ongoing maintenance are discussed separately."
],
      title: "Custom Website",
      tagline: "Built like a product, not a template.",
      description:
        "We design and build your website from scratch around your business goals, not a theme with your logo on it. You get a fast, responsive site that loads instantly, ranks well, and turns visitors into inquiries.",
      features: [
        {
          icon: Layout,
          title: "Loads before they leave",
          body: "Built static-first on Next.js, so pages render in under a second. Speed is also a Google ranking factor; this is the cheapest SEO you can buy.",
        },
        {
          icon: LineChart,
          title: "Turns visitors into inquiries",
          body: "Every section is designed around one question: what should the visitor do next? Clear paths to contact, no dead ends.",
        },
        {
          icon: Code2,
          title: "You own everything",
          body: "Hand-written code, your repository, your hosting account. No monthly lock-in to an agency platform, ever.",
        },
        {
          icon: ShoppingCart,
          title: "Perfect on every phone",
          body: "Mobile-first layouts tested on real devices. Most of your visitors browse on a phone; the site is designed for thumbs, not cursors.",
        },
        {
          icon: Wrench,
          title: "Easy to update",
          body: "Optional CMS hookup so you can edit text and images yourself. No developer needed for day-to-day changes.",
        },
        {
          icon: Brain,
          title: "Ready to grow",
          body: "Start with a marketing site now, add a store, portal or booking system later, without rebuilding from zero.",
        },
      ],
      process: [
        {
          title: "Discover",
          body: "A 30-minute call to map your pages, content and goals, and define what 'working' means in numbers.",
        },
        {
          title: "Design",
          body: "Wireframes, then a full visual design in Figma. You approve every screen before a line of code is written.",
        },
        {
          title: "Build",
          body: "Typed, componentized Next.js with weekly preview links; you watch the site come alive, not a big-bang reveal.",
        },
        {
          title: "Launch",
          body: "Deploy to your domain with SEO, analytics and handover docs. A month of small fixes is included.",
        },
      ],
      tools: ["Next.js", "TypeScript", "Tailwind CSS", "Figma", "Sanity", "Vercel"],
      plans: [
        {
          name: "Starter",
          price: "$800",
          blurb: "A sharp landing presence to get you online.",
          features: [
            "Up to 3 pages",
            "Mobile-first responsive build",
            "SEO basics + analytics",
            "Contact form & hosting setup",
          ],
        },
        {
          name: "Standard",
          price: "$1,400",
          blurb: "The full small-business website.",
          featured: true,
          features: [
            "Up to 8 pages, custom-designed",
            "CMS: edit content yourself",
            "1 month of post-launch fixes",
            "Delivered in 2-3 weeks",
          ],
        },
        {
          name: "Premium",
          price: "$2,400",
          blurb: "A growth platform built to scale.",
          features: [
            "Up to 15 pages + blog",
            "Advanced SEO & structured data",
            "Custom animations & 3D accents",
            "3 months of priority support",
          ],
        },
      ],
      price: "$800",
      timeline: "2-3 weeks",
      faqs: [
        {
          q: "Will I be able to update the site myself?",
          a: "Yes, if you want to. We can wire the site to a headless CMS like Sanity so you edit content without touching code, or keep it fully static if you'd rather never think about it.",
        },
        {
          q: "Do you write the content?",
          a: "You provide the raw material; we shape it. We'll tell you exactly what to send for each page, then structure and polish the copy so it reads well and ranks.",
        },
        {
          q: "What happens after launch if I need changes?",
          a: "Small fixes in the first month are included. After that, most clients either book us per change or move to our maintenance plan for a fixed monthly rate.",
        },
        {
          q: "Why $800 and not $300?",
          a: "Because it's hand-built code, not a bought theme. You get a site that loads fast, ranks, and doesn't fall apart the first time you need it changed; the cheap version usually costs more in the end.",
        },
      ],
    },
    {
      slug: "web-development/backend-api",
      explanation: [
        "The backend manages the rules and data behind your application: who can access a record, how information is validated, and how systems communicate. We map these requirements with your team, review existing services, and define the data model and API contracts before implementation. This makes responsibilities clear for frontend developers and integration partners.",
        "The agreed implementation covers endpoints, authentication and authorization, validation, error responses, and relevant automated checks. Integrations include handling failed requests and safe retries where appropriate. Delivery includes API documentation, configuration guidance, and a handover; infrastructure costs, third-party limits, and ongoing operational support are confirmed in the scope."
],
      title: "Backend & API",
      tagline: "The engine room, built right.",
      description:
        "We build the server side your app deserves: clean APIs, reliable databases, and integrations that don't break at 2 a.m. You get documentation, typed contracts, and a system any future developer can pick up.",
      features: [
        {
          icon: Code2,
          title: "APIs that just work",
          body: "REST endpoints with clear contracts and typed responses. Your frontend team integrates in hours, not days of guessing.",
        },
        {
          icon: Database,
          title: "Data you can trust",
          body: "Proper schema design, migrations and backups on PostgreSQL. No 'spreadsheet-in-a-database' horror six months in.",
        },
        {
          icon: Bot,
          title: "Everything connected",
          body: "Stripe, email, auth, third-party tools, wired and tested, with retries for when networks misbehave.",
        },
        {
          icon: Wrench,
          title: "Secure by default",
          body: "Input validation, rate limiting, and sane secrets handling: the checklist most projects skip until it's too late.",
        },
        {
          icon: Layout,
          title: "Documented for the next dev",
          body: "Every endpoint documented with request examples. Hand the project to anyone, at any time, without a brain-dump call.",
        },
        {
          icon: LineChart,
          title: "Watched after launch",
          body: "Logging and error alerts included, so issues surface on our dashboard before your users find them.",
        },
      ],
      process: [
        {
          title: "Scope",
          body: "We map every endpoint, data entity and integration your product needs, in plain language you can review.",
        },
        {
          title: "Architect",
          body: "Schema design, API contracts and infrastructure choices, documented before implementation starts.",
        },
        {
          title: "Build",
          body: "Typed, tested implementation with integration tests on the critical paths. You get a staging URL early.",
        },
        {
          title: "Deliver",
          body: "Deployment, documentation, and a walkthrough call. Your team owns a system they actually understand.",
        },
      ],
      tools: ["Node.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "Docker"],
      plans: [
        {
          name: "Starter",
          price: "$600",
          blurb: "A first endpoint set for a new product.",
          features: [
            "Up to 5 endpoints",
            "PostgreSQL schema + migrations",
            "One integration (Stripe, email…)",
            "Docs for every endpoint",
          ],
        },
        {
          name: "Standard",
          price: "$1,000",
          blurb: "The backend a real product runs on.",
          featured: true,
          features: [
            "Up to 15 endpoints + auth",
            "2-3 integrations, tested",
            "Staging deployment included",
            "Delivered in 1-2 weeks",
          ],
        },
        {
          name: "Premium",
          price: "$1,800",
          blurb: "Platform-grade, ready for traffic.",
          features: [
            "Full platform backend",
            "Security hardening + rate limits",
            "Monitoring, alerts, CI/CD",
            "1 month of support",
          ],
        },
      ],
      price: "$600",
      timeline: "1-2 weeks",
      faqs: [
        {
          q: "Can you work with our existing codebase?",
          a: "Usually, yes. We start with a short audit of what's there, tell you honestly what can be kept versus rebuilt, and quote based on that reality, not a guess.",
        },
        {
          q: "REST or GraphQL?",
          a: "REST for most products; it's simpler, cacheable, and every developer knows it. If you have a genuine multi-client query-heavy product, we'll discuss GraphQL with the tradeoffs on the table.",
        },
        {
          q: "Do you handle deployment too?",
          a: "Yes. We deploy to Vercel, Railway or your own cloud, set up environment variables, and leave you a doc that explains how to ship a change.",
        },
        {
          q: "What about authentication?",
          a: "Covered. Session or token-based auth, OAuth providers, roles and permissions; we'll recommend the simplest option that meets your security needs.",
        },
      ],
    },
    {
      slug: "web-development/ecommerce",
      explanation: [
        "We map the complete buying journey, from discovering a product to receiving an order confirmation. Before selecting a platform or architecture, we review your catalog, variants, inventory sources, payment methods, shipping regions, and content needs. Existing stores can begin with a migration assessment so product data and established URLs are accounted for.",
        "Implementation covers the agreed catalog, product pages, cart, checkout integration, and order notifications. We test payment success and failure, mobile shopping, and the operational handover with your team. Tax configuration, fulfillment rules, payment-provider fees, and recurring platform costs depend on your business and are agreed before launch; ongoing merchandising is scoped separately."
],
      title: "E-commerce",
      tagline: "A store that sells while you sleep.",
      description:
        "We build online stores that load fast, feel trustworthy, and make checkout painless. From product catalog to payment confirmation, every step is tuned to turn browsers into buyers.",
      features: [
        {
          icon: ShoppingCart,
          title: "Checkout without friction",
          body: "Stripe payments, guest checkout, and clear error states. Every removed step is recovered revenue.",
        },
        {
          icon: Layout,
          title: "You manage products yourself",
          body: "Add products, prices and stock through a simple dashboard. No developer needed for daily operations.",
        },
        {
          icon: LineChart,
          title: "Speed that sells",
          body: "Product pages render in under a second. Every 100ms of delay measurably costs conversions; we don't accept slow stores.",
        },
        {
          icon: Brain,
          title: "Built for mobile buyers",
          body: "Most purchases start on a phone. Product grids, variants and checkout are designed for thumbs first.",
        },
        {
          icon: Database,
          title: "Found on Google",
          body: "Structured data so your products appear in search with prices and availability: free traffic for life.",
        },
        {
          icon: Bot,
          title: "Automated order emails",
          body: "Confirmations, receipts and shipping notifications sent automatically. Your inbox stays for real questions.",
        },
      ],
      process: [
        {
          title: "Catalog setup",
          body: "Products, variants, shipping rules and taxes configured: the unglamorous 20% that makes or breaks a store.",
        },
        {
          title: "Design storefront",
          body: "A storefront designed around your products and brand, with the buying flow mapped before build.",
        },
        {
          title: "Build & integrate",
          body: "Cart, Stripe payments, inventory sync and order emails, tested with real transactions.",
        },
        {
          title: "Launch",
          body: "Test orders, analytics, then go live on your domain. We stay through your first real sales.",
        },
      ],
      tools: ["Next.js", "Stripe", "Sanity", "PostgreSQL", "Tailwind CSS", "Vercel"],
      plans: [
        {
          name: "Starter",
          price: "$1,200",
          blurb: "Your first store, live in two weeks.",
          features: [
            "Up to 20 products",
            "Stripe checkout + order emails",
            "Mobile-first storefront",
            "Basic analytics wired",
          ],
        },
        {
          name: "Standard",
          price: "$2,000",
          blurb: "A store built for serious selling.",
          featured: true,
          features: [
            "Unlimited products, CMS-managed",
            "Inventory sync + variants",
            "Google-rich product SEO",
            "Delivered in 3-4 weeks",
          ],
        },
        {
          name: "Premium",
          price: "$3,500",
          blurb: "Scale, or migrate what you have.",
          features: [
            "Migration from Shopify/Woo",
            "Discounts + abandoned-cart emails",
            "Customer accounts",
            "3 months of priority support",
          ],
        },
      ],
      price: "$1200",
      timeline: "3-4 weeks",
      faqs: [
        {
          q: "I already have a store on Shopify/WooCommerce. Can you migrate it?",
          a: "Yes. We migrate products, customers and order history, set up redirects so your search rankings survive, and keep the old store running until the new one is proven.",
        },
        {
          q: "What accounts do I need to provide?",
          a: "A Stripe account for payments and your domain. We'll walk you through creating them if you don't have them yet; it takes about 15 minutes.",
        },
        {
          q: "Is there a product limit?",
          a: "No practical one. The catalog is database-driven, so 20 products and 2,000 cost the same to build around.",
        },
        {
          q: "What are the ongoing costs?",
          a: "Hosting (from $0-20/mo on Vercel), your domain, and Stripe's standard 2.9% + 30¢ per transaction. No license fees to us, ever.",
        },
      ],
    },
    {
      slug: "web-development/maintenance-support",
      explanation: [
        "Maintenance starts with understanding the application you already have. We review the codebase, deployment process, dependencies, access arrangements, and current issues, then agree which systems and environments the support plan covers. Existing projects may need an initial stabilization phase before recurring support begins.",
        "The plan defines included updates, monitoring, small changes, and how you report an issue. We prioritize faults by impact, test changes before release, and document what was changed. Response windows, backup responsibilities, emergency coverage, and monthly capacity are stated in your agreement; larger features and third-party outages require their own scope or provider response."
],
      title: "Maintenance & Support",
      tagline: "Your site, kept sharp every month.",
      description:
        "We keep your website fast, secure and up to date so you never have to think about it. Monthly checks, quick fixes, and a founder's direct line when something needs attention.",
      features: [
        {
          icon: LineChart,
          title: "Nothing breaks silently",
          body: "Uptime and error monitoring included. You hear from us before your customers notice something's wrong.",
        },
        {
          icon: Wrench,
          title: "Security patches, promptly",
          body: "Frameworks and dependencies patched as updates land. The boring work that prevents the expensive incidents.",
        },
        {
          icon: Layout,
          title: "Content changes included",
          body: "Small edits (text, images, new sections from your existing design) handled each month as part of the plan.",
        },
        {
          icon: Bot,
          title: "A founder on speed dial",
          body: "No ticket queues or account managers. You message the person who actually built your site.",
        },
        {
          icon: Code2,
          title: "Stays fast",
          body: "Quarterly performance audits keep load times where they were at launch, even as you add content.",
        },
        {
          icon: Database,
          title: "Plain-English report",
          body: "A short monthly summary: what we did, what we found, what we recommend. No jargon, no padding.",
        },
      ],
      process: [
        {
          title: "Audit",
          body: "First month: full review of your site's performance, security, dependencies and analytics setup.",
        },
        {
          title: "Stabilize",
          body: "We fix whatever the audit surfaced: the backlog of small issues every site accumulates.",
        },
        {
          title: "Maintain",
          body: "The monthly rhythm: updates, monitoring, your content changes, and quick fixes as you need them.",
        },
        {
          title: "Report",
          body: "A one-page summary each month, plus honest advice on what's worth improving next.",
        },
      ],
      tools: ["Vercel", "Next.js", "GitHub", "Sentry", "Google Analytics"],
      plans: [
        {
          name: "Starter",
          price: "$150/mo",
          blurb: "Covered: nothing breaks silently.",
          features: [
            "Uptime & error monitoring",
            "Security updates applied",
            "30 min of changes / month",
            "Monthly plain-English report",
          ],
        },
        {
          name: "Standard",
          price: "$250/mo",
          blurb: "Well kept, quarter after quarter.",
          featured: true,
          features: [
            "2 hours of changes / month",
            "Quarterly performance audit",
            "Same-day critical fixes",
            "Direct line to a founder",
          ],
        },
        {
          name: "Premium",
          price: "$450/mo",
          blurb: "A developer on retainer.",
          features: [
            "5 hours of changes / month",
            "Small features built monthly",
            "Priority response, 7 days a week",
            "Quarterly strategy call",
          ],
        },
      ],
      price: "$150/mo",
      timeline: "Ongoing",
      faqs: [
        {
          q: "Can I cancel anytime?",
          a: "Yes, month to month. No notice period, no cancellation fee. We hand over everything (repo access, docs, monitoring) so you're never hostage.",
        },
        {
          q: "What counts as a 'small change'?",
          a: "Anything that fits your existing design: text and image updates, new sections, new pages from the current template, form tweaks. Redesigns and new features are quoted separately, always with your approval first.",
        },
        {
          q: "Our site was built by someone else. Can you maintain it?",
          a: "Usually. We start with a one-time audit to check the codebase is maintainable, share what we find, and only take it on if we can honestly do a good job.",
        },
        {
          q: "What if something urgent breaks at night?",
          a: "Monitoring alerts us first, and critical outages get fixed same day, including weekends. That's the difference between a plan and a hope.",
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* Category 2 - Data Science                                           */
/* ------------------------------------------------------------------ */

export const dataScience: Category = {
  id: "data-science",
  title: "Data Science",
  icon: BarChart3,
  description:
    "From messy spreadsheets to dashboards, pipelines and AI that earns its keep.",
  services: [
    {
      slug: "data-science/analytics-bi",
      explanation: [
        "Analytics work begins with the decisions your team needs to make and the meaning of each business metric. We inventory your spreadsheets and systems, check data quality, and agree definitions for measures such as revenue, retention, or pipeline. A shared model reduces disagreements caused by reports using different filters or time periods.",
        "We build the agreed dashboards with useful filters, drill-downs, refresh schedules, and role-appropriate access. Figures are reconciled against source data before handover, and your team receives guidance on interpreting and maintaining the reports. Data-source availability, licensing, historical backfills, and new reporting requests are included only where specified in the proposal."
],
      title: "Analytics & BI",
      tagline: "See your numbers clearly, finally.",
      description:
        "We turn scattered spreadsheets and disconnected tools into one clear picture of your business. You get reports people actually open, and decisions you can defend with data.",
      features: [
        {
          icon: Database,
          title: "One source of truth",
          body: "Sales, operations and marketing data unified in one place. No more three versions of the same number in three files.",
        },
        {
          icon: LineChart,
          title: "Dashboards people open",
          body: "KPI views designed for decisions, not decoration. The number you need, visible in five seconds.",
        },
        {
          icon: Bot,
          title: "Reports that refresh themselves",
          body: "Automated updates on a schedule. Nobody exports CSVs on a Friday afternoon ever again.",
        },
        {
          icon: Brain,
          title: "Answers, not just charts",
          body: "We explain what the numbers mean for your business; the 'so what' is included, not extra.",
        },
        {
          icon: Layout,
          title: "Works with what you have",
          body: "We connect to your existing stack: Excel, Google Sheets, your CRM, your database. No forced migrations.",
        },
        {
          icon: Wrench,
          title: "Your team becomes self-sufficient",
          body: "A walkthrough session plus documentation, so you can tweak and extend dashboards without calling us.",
        },
      ],
      process: [
        {
          title: "Data audit",
          body: "We inventory every source, find the gaps and inconsistencies, and agree on the KPIs that matter.",
        },
        {
          title: "Model",
          body: "Data cleaned, joined and structured so every metric has one definition everyone trusts.",
        },
        {
          title: "Build dashboards",
          body: "Role-based views (owner, sales, operations) with automated refresh and mobile-friendly layouts.",
        },
        {
          title: "Handover & training",
          body: "A working session with your team, plus docs. You own the system, we're on call for questions.",
        },
      ],
      tools: ["Python", "Pandas", "Power BI", "SQL", "Excel", "Google Analytics"],
      plans: [
        {
          name: "Starter",
          price: "$700",
          blurb: "Your first dashboard people actually open.",
          features: [
            "Up to 3 data sources",
            "One KPI dashboard",
            "Automated weekly refresh",
            "Walkthrough session",
          ],
        },
        {
          name: "Standard",
          price: "$1,200",
          blurb: "The whole business in one place.",
          featured: true,
          features: [
            "Up to 6 sources unified",
            "Role-based dashboards (×3)",
            "Daily refresh + failure alerts",
            "Docs + team training",
          ],
        },
        {
          name: "Premium",
          price: "$2,200",
          blurb: "Data-driven operations, end to end.",
          features: [
            "Unlimited sources",
            "Custom metric warehouse layer",
            "Full history backfilled",
            "3 months of insight reviews",
          ],
        },
      ],
      price: "$700",
      timeline: "2-3 weeks",
      faqs: [
        {
          q: "How is our data kept safe?",
          a: "Your data stays in your accounts and infrastructure. We work with access you grant and can revoke, sign NDAs routinely, and never copy business data to our own machines.",
        },
        {
          q: "Do we need to change our systems?",
          a: "No. We build on top of what you already use: spreadsheets, CRMs, databases. The only change is that everything finally flows into one place.",
        },
        {
          q: "Can this connect to our CRM or billing tool?",
          a: "Almost certainly. We've connected CRMs, invoicing tools, ad platforms, e-commerce backends and plain old exports. If it has an API or a CSV, we can ingest it.",
        },
        {
          q: "What if our data is a mess?",
          a: "That's the normal starting point; cleaning it is half the job and fully included. We'll show you exactly what we fixed so the same mess doesn't regrow.",
        },
      ],
    },
    {
      slug: "data-science/machine-learning",
      explanation: [
        "Machine learning is appropriate when a repeatable prediction or classification can improve a real workflow and suitable data is available. We first assess feasibility, label quality, data permissions, and a simpler baseline. Success criteria are agreed around business usefulness as well as model performance, before investing in a more complex approach.",
        "Development includes preparation, training, and evaluation on held-out data, with checks for leakage and relevant error patterns. You receive a documented model or service, evaluation findings, limitations, and an integration plan. Production monitoring and retraining can be added to the scope. Accuracy is measured on the available data; we do not promise an arbitrary score or assume that a model is always the best solution."
],
      title: "Machine Learning",
      tagline: "Predictions that pay for themselves.",
      description:
        "We build machine learning models that solve real business problems: forecasting demand, scoring leads, spotting anomalies. No research papers, no hype: working systems measured by the money or time they save.",
      features: [
        {
          icon: Brain,
          title: "Starts with the problem",
          body: "We tell you honestly when ML is overkill and a spreadsheet rule works better. If we build, it's because the math pays off.",
        },
        {
          icon: Database,
          title: "Your data, working harder",
          body: "The history you already have (sales, tickets, logs) becomes forecasts, scores and early warnings.",
        },
        {
          icon: LineChart,
          title: "Measured honestly",
          body: "Accuracy and business impact baselined before we build, reported after. You'll know if it's working.",
        },
        {
          icon: Bot,
          title: "Integrated, not a demo",
          body: "Predictions land inside the tools your team already uses: dashboards, your app, email alerts.",
        },
        {
          icon: Layout,
          title: "Explained in plain English",
          body: "We document what drives each prediction. No black boxes your team can't reason about.",
        },
        {
          icon: Wrench,
          title: "Handover without mystery",
          body: "Code, docs and a retraining pipeline included. The system keeps working long after we're gone.",
        },
      ],
      process: [
        {
          title: "Feasibility",
          body: "A short paid study: is there signal in your data, and is the payoff worth it? You get a go/no-go with evidence.",
        },
        {
          title: "Data preparation",
          body: "Historical data cleaned, labeled and structured: typically half the project, always the part that decides quality.",
        },
        {
          title: "Model & validate",
          body: "Train, compare, and validate against the baseline. We ship the simplest model that beats it meaningfully.",
        },
        {
          title: "Deploy & monitor",
          body: "Integrated into your workflow with monitoring for drift, plus a retraining plan on a schedule you choose.",
        },
      ],
      tools: ["Python", "scikit-learn", "TensorFlow", "Pandas", "OpenAI API", "LangChain"],
      plans: [
        {
          name: "Starter",
          price: "$1,500",
          blurb: "Feasibility first: know before you build.",
          features: [
            "Signal study on your data",
            "Working prototype",
            "Go / no-go report",
            "Baseline comparison",
          ],
        },
        {
          name: "Standard",
          price: "$2,600",
          blurb: "A production model in your workflow.",
          featured: true,
          features: [
            "Full model build + validation",
            "Integrated into your tool",
            "Drift monitoring",
            "Retraining script + docs",
          ],
        },
        {
          name: "Premium",
          price: "$4,500",
          blurb: "Measured impact, not just accuracy.",
          features: [
            "Multiple models / ensembles",
            "Production API + auto-retraining",
            "A/B measurement of impact",
            "3 months of priority support",
          ],
        },
      ],
      price: "$1500",
      timeline: "4-6 weeks",
      faqs: [
        {
          q: "How much data do we need?",
          a: "Depends on the problem, but usually months of history are enough to start. The feasibility study answers this precisely for your case before you commit to the full build.",
        },
        {
          q: "What if it doesn't work?",
          a: "That's what the feasibility phase is for; we check signal quality before the big spend. If there's no signal, we tell you early and you've spent a fraction of the budget learning it.",
        },
        {
          q: "Where do the models run?",
          a: "Wherever suits your setup: a small cloud VM, a serverless function, or inside your existing infrastructure. We size it for cost, not for a demo.",
        },
        {
          q: "Do we need to hire an ML engineer afterwards?",
          a: "No. Handover includes docs, retraining automation and a training session. Most clients run the system themselves and call us only when their business changes.",
        },
      ],
    },
    {
      slug: "data-science/data-engineering",
      explanation: [
        "Data engineering connects scattered sources into a dependable foundation for reporting or applications. We document each source, owner, format, update frequency, and access requirement, then agree a destination model and freshness needs. The design considers both current volume and expected growth so infrastructure remains understandable and proportionate.",
        "Pipelines include agreed extraction and transformation steps, validation checks, scheduling, and failure reporting. We document lineage and recovery procedures so your team can trace a number to its source and respond when a feed changes. Historical migration, sensitive-data handling, retention rules, cloud costs, and ongoing operation are explicitly scoped before implementation."
],
      title: "Data Engineering",
      tagline: "Pipelines that never drop your data.",
      description:
        "We build the plumbing that moves your data from wherever it lives to wherever it's needed, automatically, reliably, on time. Clean pipelines today are what make cheap analytics and AI possible tomorrow.",
      features: [
        {
          icon: Database,
          title: "Everything in one place",
          body: "Sources consolidated into a single warehouse. Your analysts stop playing 'which export is current?'",
        },
        {
          icon: Bot,
          title: "Fresh data, automatically",
          body: "Scheduled ingestion with alerting on failure. No nightly manual exports, no silently stale reports.",
        },
        {
          icon: Wrench,
          title: "Built to be trusted",
          body: "Validation checks catch broken rows before they pollute reports. You find out from an alert, not a client.",
        },
        {
          icon: LineChart,
          title: "Cheap to run",
          body: "Right-sized infrastructure with no surprise cloud bills. We've seen what over-engineered pipelines cost: it's not pretty.",
        },
        {
          icon: Layout,
          title: "Documented lineage",
          body: "Every metric traceable to its source. When a number looks wrong, you can find out why in minutes.",
        },
        {
          icon: Brain,
          title: "Ready for AI",
          body: "Clean, structured, centralized data is the prerequisite for every analytics and AI project you'll want next.",
        },
      ],
      process: [
        {
          title: "Source inventory",
          body: "Every system, export and API your data lives in: mapped, with volumes and update frequencies.",
        },
        {
          title: "Design",
          body: "Pipeline architecture and warehouse schema, designed around how your business actually asks questions.",
        },
        {
          title: "Build & orchestrate",
          body: "Ingestion, transformation and scheduling implemented, with monitoring and failure alerts from day one.",
        },
        {
          title: "Monitor & document",
          body: "Runbooks and lineage docs handed over. The pipeline keeps flowing whether or not we're watching.",
        },
      ],
      tools: ["Python", "Apache Airflow", "PostgreSQL", "SQL", "Docker"],
      plans: [
        {
          name: "Starter",
          price: "$1,000",
          blurb: "One reliable pipeline, end to end.",
          features: [
            "2-3 sources → one warehouse",
            "Daily scheduled loads",
            "Validation + failure alerts",
            "Lineage documentation",
          ],
        },
        {
          name: "Standard",
          price: "$1,700",
          blurb: "A small but serious data platform.",
          featured: true,
          features: [
            "Up to 6 sources",
            "Transformations + quality tests",
            "Airflow orchestration, retries",
            "Runbooks + handover",
          ],
        },
        {
          name: "Premium",
          price: "$3,000",
          blurb: "Always-on, at any scale.",
          features: [
            "Legacy & complex sources",
            "Hourly / real-time pipelines",
            "Cost-optimized infrastructure",
            "1 month of tuning included",
          ],
        },
      ],
      price: "$1000",
      timeline: "3-5 weeks",
      faqs: [
        {
          q: "Who pays for the cloud infrastructure?",
          a: "You do, directly to the provider; we keep it in your account with cost alerts configured. For most small businesses this runs between $10 and $50 a month.",
        },
        {
          q: "Can you work with our existing warehouse?",
          a: "Yes. If it's structurally sound we build on it; if it's a mess we'll show you exactly why and quote a migration honestly. No rebuilding for rebuilding's sake.",
        },
        {
          q: "What data sources can you connect?",
          a: "Anything with an API, a database connection, or even recurring file exports: CRMs, billing systems, ad platforms, e-commerce, sensors, spreadsheets.",
        },
        {
          q: "What about compliance and privacy?",
          a: "We design for it from the start: access controls, retention rules and PII handling agreed before build. We're happy to work within GDPR or your industry's requirements.",
        },
      ],
    },
    {
      slug: "data-science/ai-integration",
      explanation: [
        "AI integration starts with one useful workflow, such as answering questions from approved documents or assisting with repetitive text tasks. We map the input data, permissions, acceptable outputs, and situations that require human review. A small prototype helps test whether the approach adds value before it becomes part of a production application.",
        "The build can include document retrieval, structured outputs, application integration, evaluation examples, and fallback behavior. We review latency, usage costs, and how the system behaves when relevant context is missing. Your team receives configuration and operating guidance. Provider subscriptions, data retention choices, ongoing evaluation, and updates to the knowledge base are agreed in the scope; generated answers still require appropriate verification."
],
      title: "AI Integration",
      tagline: "AI features your users actually use.",
      description:
        "We add practical AI to your product (chat assistants, document search, content generation) without turning it into a science project. Shipped in weeks, cost-controlled, and useful from day one.",
      features: [
        {
          icon: Bot,
          title: "Solves a real job",
          body: "Support deflection, faster drafting, instant document search. We pick one job and do it well, not a chatbot that does ten badly.",
        },
        {
          icon: Brain,
          title: "Knows your business",
          body: "Grounded on your documents and data, with sources cited. Far fewer confident nonsense answers.",
        },
        {
          icon: LineChart,
          title: "Costs under control",
          body: "Token budgets, response caching and right-sized models per task. Predictable monthly bills, not roulette.",
        },
        {
          icon: Database,
          title: "Private where it matters",
          body: "Your data handled according to your policy: API providers don't train on it, and sensitive cases get self-hosted options.",
        },
        {
          icon: Wrench,
          title: "Graceful when AI fails",
          body: "Fallback paths for when the model misfires or the API is down. Your product never breaks because of someone else's servers.",
        },
        {
          icon: Layout,
          title: "Ship in weeks",
          body: "A focused MVP live fast, then iterate on real usage. No six-month AI roadmap that's obsolete at launch.",
        },
      ],
      process: [
        {
          title: "Use-case selection",
          body: "We score candidate features by value and feasibility, and pick the one worth building first.",
        },
        {
          title: "Prototype",
          body: "A working prototype on your real data within the first week, so you can judge usefulness, not slides.",
        },
        {
          title: "Build & ground",
          body: "Production build: your data indexed, prompts engineered, guardrails and evaluation tests in place.",
        },
        {
          title: "Launch & measure",
          body: "Shipped with usage analytics, so the next iteration is driven by evidence rather than vibes.",
        },
      ],
      tools: ["OpenAI API", "LangChain", "TypeScript", "Next.js", "Python", "PostgreSQL"],
      plans: [
        {
          name: "Starter",
          price: "$1,200",
          blurb: "Your first AI feature, shipped properly.",
          features: [
            "One focused MVP feature",
            "Prototype on your data, week 1",
            "Cost guardrails from day one",
            "Usage analytics at launch",
          ],
        },
        {
          name: "Standard",
          price: "$2,000",
          blurb: "Grounded, tested, production-ready.",
          featured: true,
          features: [
            "Grounded on your documents",
            "Evaluation tests + fallbacks",
            "Caching & budget controls",
            "One iteration round included",
          ],
        },
        {
          name: "Premium",
          price: "$3,500",
          blurb: "A suite of AI capabilities.",
          features: [
            "Multi-feature / agent workflows",
            "Self-hosted model option",
            "Eval suite + safety testing",
            "3 months of priority support",
          ],
        },
      ],
      price: "$1200",
      timeline: "3-4 weeks",
      faqs: [
        {
          q: "Which AI models do you use?",
          a: "Whatever serves the job best: OpenAI, Anthropic or open-weight models, often mixed. A cheap model for simple tasks, a strong one where it matters. We're vendor-neutral and it's easy to swap later.",
        },
        {
          q: "Will our data be used to train models?",
          a: "No. Major API providers don't train on customer API traffic, and we configure zero-retention options where available. For strict requirements we self-host open models.",
        },
        {
          q: "What will the AI feature cost per month to run?",
          a: "We estimate it before building and design for a budget; caching and model choice make a huge difference. Most small-business features run $10-100/month at realistic usage.",
        },
        {
          q: "Can this be added to our existing website or app?",
          a: "Yes, as an embedded UI, an API your team consumes, or a standalone internal tool. We integrate with what you have rather than replacing it.",
        },
      ],
    },
    {
      slug: "data-science/data-visualization",
      explanation: [
        "A useful visualization starts with a question and a clear audience. We review the data, identify what it can support, and select charts that make the comparison or trend understandable. Definitions, units, time periods, uncertainty, and missing values are considered before choosing colors or adding interaction.",
        "Delivery can include presentation-ready graphics or interactive web charts with agreed filters, labels, and tooltips. We check readability, color contrast, mobile behavior, and the underlying calculations, then provide exports and usage guidance. Live data connections, automated refreshes, additional formats, and future updates are defined separately so the finished visuals remain maintainable."
],
      title: "Data Visualization",
      tagline: "Charts that change minds.",
      description:
        "We design interactive charts, dashboards and infographics that make complex data obvious in seconds. For your team or your investors: your numbers finally look as sharp as they are.",
      features: [
        {
          icon: LineChart,
          title: "Understood in five seconds",
          body: "Design first, decoration never. The takeaway is visible before anyone reads a label.",
        },
        {
          icon: Layout,
          title: "Interactive where it helps",
          body: "Filters and drill-downs only when they answer real questions. No gimmicks hiding a weak story.",
        },
        {
          icon: Brain,
          title: "On brand, presentation-ready",
          body: "Your colors, your fonts, export-ready for decks and screens. It looks like your company made it, because you did.",
        },
        {
          icon: Database,
          title: "Live or static",
          body: "Connected to live data for ongoing use, or a polished one-off for a board meeting. Both get the same care.",
        },
        {
          icon: Bot,
          title: "Any format",
          body: "Web dashboards, slide decks, PDFs, embeds for your site. The same visual language across all of them.",
        },
        {
          icon: Wrench,
          title: "Templates that stick around",
          body: "Reusable chart templates and a style guide, so your team's next report matches without hiring us again.",
        },
      ],
      process: [
        {
          title: "Data review",
          body: "We dig into your data and find the story worth telling, or the question the visualization must answer.",
        },
        {
          title: "Story & sketch",
          body: "Chart selection and layout sketched first. You approve the narrative before any pixel-polish.",
        },
        {
          title: "Build",
          body: "Interactive or static visuals built and refined against real data, never lorem-ipsum charts.",
        },
        {
          title: "Deliver",
          body: "Final files in every format you need, plus templates and a mini style guide for reuse.",
        },
      ],
      tools: ["Power BI", "Tableau", "D3.js", "Python", "Figma"],
      plans: [
        {
          name: "Starter",
          price: "$600",
          blurb: "A sharp one-off for your next meeting.",
          features: [
            "Up to 5 charts",
            "Static PNG/PDF export",
            "Your brand colors & fonts",
            "One revision round",
          ],
        },
        {
          name: "Standard",
          price: "$1,000",
          blurb: "An interactive story on the web.",
          featured: true,
          features: [
            "Web dashboard, up to 10 visuals",
            "Two revision rounds",
            "Embeddable on your site",
            "Reusable templates + style guide",
          ],
        },
        {
          name: "Premium",
          price: "$1,800",
          blurb: "Boardroom-ready, on a deadline.",
          features: [
            "Dashboard + deck package",
            "Live data connection",
            "Presentation-ready PDF versions",
            "1-week priority delivery",
          ],
        },
      ],
      price: "$600",
      timeline: "1-2 weeks",
      faqs: [
        {
          q: "Can you work from an Excel file?",
          a: "Yes, most projects start from exactly that. Send us whatever you have; organizing it is part of the job, and we'll flag anything the data genuinely can't support.",
        },
        {
          q: "Our data is confidential. How do you handle it?",
          a: "We sign NDAs as standard, work with anonymized samples where possible, and return or delete raw files after delivery. Your data never leaves your chosen storage without a reason you approve.",
        },
        {
          q: "Can the charts be embedded on our website?",
          a: "Yes, interactive charts ship as embeddable web components that inherit your site's fonts and colors, so they look native wherever they land.",
        },
        {
          q: "How many revision rounds are included?",
          a: "Two structured rounds are built into every quote (after the story sketch and after the first build). Small tweaks after that are usually just absorbed; we're not counting pixels.",
        },
      ],
    },
  ],
};

export const allCategories: Category[] = [webDevelopment, dataScience];

export const allSubServices: SubService[] = [...allCategories, studioDisciplines].flatMap(
  (category) => category.services
);

/** Look up a sub-service by its path under /services/, e.g. "web-development/ecommerce". */
export function getSubServiceBySlug(slug: string): SubService | undefined {
  return allSubServices.find((service) => service.slug === slug);
}
