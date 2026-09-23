import { Box, Film, Layout, MousePointer2, Palette, Gauge, Layers, Code2 } from "lucide-react";
import type { Category, SubService } from "./subServices";

export const landingPages: SubService = {
  slug: "web-development/landing-pages",
  title: "Landing Pages",
  tagline: "One offer. One clear next step.",
  description: "A focused page for a product launch, campaign, or service. We connect your message, proof, and call to action in a responsive experience that helps visitors understand the offer and take the next step.",
  explanation: [
    "Start with the audience, the traffic source, and the action you want people to take: an inquiry, signup, booking, or purchase. We shape the page around those decisions, using your product information, brand assets, and genuine customer proof. You review the content structure and design before development begins.",
    "Delivery includes the agreed sections, mobile layouts, accessible forms, basic search metadata, and launch checks. We can connect your CRM, booking tool, or email platform and add consent-aware conversion tracking when included in the scope. Ad management, ongoing experiments, and third-party subscriptions are scoped separately; conversion improvements are measured after launch rather than promised in advance.",
  ],
  features: [
    { icon: Layout, title: "A focused page structure", body: "An opening offer, benefits, supporting proof, answers to objections, and a clear call to action arranged around your campaign." },
    { icon: Palette, title: "Your brand, consistently", body: "Custom visual design using your identity and supplied photos, with a review before implementation." },
    { icon: MousePointer2, title: "A working conversion path", body: "Connect the agreed form, booking flow, or checkout destination and verify success and error states." },
    { icon: Gauge, title: "Ready for mobile traffic", body: "Responsive imagery, keyboard navigation, readable content, and performance checks across screen sizes." },
  ],
  process: [
    { title: "Define the offer", body: "Agree the audience, campaign goal, content inputs, and primary conversion event." },
    { title: "Shape the page", body: "Review the content order, wireframe, and visual design with the actual offer." },
    { title: "Build and connect", body: "Implement the page and agreed integrations on a preview URL for feedback." },
    { title: "Check and launch", body: "Test devices, form delivery, metadata, and tracking before deploying to your domain." },
  ],
  tools: ["Next.js", "TypeScript", "Tailwind CSS", "Figma"],
  price: "On request",
  timeline: "Scoped together",
  plans: [
    { name: "Launch", price: "On request", blurb: "A single offer with a clear contact path.", features: ["One custom landing page", "Responsive layout", "Contact or signup form", "Launch and handover"] },
    { name: "Campaign", price: "On request", featured: true, blurb: "A campaign with connected lead capture.", features: ["Launch scope", "Agreed CRM or email integration", "Conversion event setup", "Campaign-specific content sections"] },
    { name: "Growth", price: "On request", blurb: "A reusable base for related offers.", features: ["Campaign scope", "Agreed page variants", "Reusable sections", "Experiment and reporting plan"] },
  ],
  faqs: [
    { q: "How is this different from a full website?", a: "A landing page focuses on one offer and one main action. A full website serves several audiences and services across multiple pages. We help decide which fits your goal before quoting." },
    { q: "What do I need to provide?", a: "Your offer, audience, brand assets, authentic photos, and any customer proof you have permission to use. We help organize and refine the copy and identify missing content." },
    { q: "Can you connect my existing marketing tools?", a: "Yes. We confirm each tool's integration options, account access, subscription costs, and data requirements before including it in the scope." },
  ],
};

export const studioDisciplines: Category = {
  id: "studio-disciplines",
  title: "Studio Disciplines",
  icon: Palette,
  description: "Design, 3D, and motion for digital experiences.",
  services: [
    {
      slug: "ui-ux-design",
      title: "UI/UX Design",
      tagline: "Clear journeys, considered interfaces.",
      description: "We turn complex requirements into understandable user journeys and consistent screens. From early wireframes to a documented design system, every decision supports what your users need to do.",
      explanation: [
        "This service is useful when a product is difficult to navigate, screens feel inconsistent, or a new idea needs to be tested before development. We review your existing experience, discuss user needs and business constraints, and map the most important journeys. The scope identifies which flows, screen states, and device sizes will be designed.",
        "You receive editable Figma files, an interactive prototype, and implementation notes covering components, responsive behavior, loading states, empty states, and errors. Accessibility considerations are part of design review. Research recruitment, formal usability studies, and production development can be added as separate work when needed.",
      ],
      features: [
        { icon: MousePointer2, title: "Mapped user journeys", body: "Flow diagrams and wireframes clarify navigation and remove avoidable steps from the agreed tasks." },
        { icon: Layout, title: "Responsive screen designs", body: "Desktop and mobile layouts include practical interface states so developers have more than a happy-path mockup." },
        { icon: Layers, title: "Reusable components", body: "A shared Figma library defines typography, colors, spacing, and component variants for consistent future screens." },
        { icon: Code2, title: "Developer handover", body: "Annotated files explain behavior and interactions, with a walkthrough to resolve implementation questions." },
      ],
      process: [
        { title: "Understand", body: "Review your product, users, goals, and existing feedback; agree the journeys in scope." },
        { title: "Structure", body: "Explore navigation and low-fidelity flows before committing to visual details." },
        { title: "Prototype", body: "Design the screens and connect a clickable prototype for review and agreed testing." },
        { title: "Document", body: "Refine the system and hand over editable files, states, and implementation guidance." },
      ],
      tools: ["Figma", "FigJam"],
      price: "On request",
      timeline: "Scoped together",
      plans: [
        { name: "Review", price: "On request", blurb: "Understand what needs to improve.", features: ["Experience audit", "Priority user journeys", "Annotated findings", "Improvement roadmap"] },
        { name: "Product", price: "On request", featured: true, blurb: "Design the agreed core experience.", features: ["Wireframes", "Responsive screen designs", "Clickable prototype", "Developer handover"] },
        { name: "System", price: "On request", blurb: "Give a growing product consistent foundations.", features: ["Product scope", "Component library", "Design tokens and variants", "Usage documentation"] },
      ],
      faqs: [
        { q: "Does this include development?", a: "This service delivers design files and handover documentation. We can quote development separately or work with your existing engineering team." },
        { q: "Can you improve an existing product?", a: "Yes. We can start with an audit and redesign only the agreed flows, preserving established patterns where they work." },
        { q: "How is feedback handled?", a: "We agree review milestones and revision rounds in the proposal. You review structure before visuals so major decisions happen early." },
      ],
    },
    {
      slug: "3d-designs",
      title: "3D Designs",
      tagline: "Give your product another dimension.",
      description: "Product visuals and interactive scenes that help people understand form, detail, and movement. We balance visual quality with the realities of browser performance and the devices your audience uses.",
      explanation: [
        "Use 3D for a product presentation, an interactive hero, or a scene that explains something a flat image cannot. We begin by checking existing models, reference materials, brand direction, and the intended placement. Modeling, materials, lighting, camera positions, and interactions are scoped according to the required output.",
        "For web delivery, we optimize geometry and textures, agree a loading budget, and provide a static fallback for devices that cannot run the scene comfortably. For rendered visuals, we agree resolution and export formats before production. Detailed configurators, additional model variants, and source-model ownership are specified in the proposal rather than assumed.",
      ],
      features: [
        { icon: Box, title: "Purpose-built scenes", body: "Models, materials, and lighting are prepared for your product and the agreed camera views." },
        { icon: MousePointer2, title: "Useful interaction", body: "Optional rotation, hotspots, or simple state changes help visitors explore the subject." },
        { icon: Gauge, title: "Performance-aware delivery", body: "Geometry, textures, and loading behavior are checked against the target device budget." },
        { icon: Layout, title: "Accessible fallbacks", body: "Static imagery and reduced-motion alternatives preserve the core message when an interactive scene is unsuitable." },
      ],
      process: [
        { title: "Brief", body: "Agree the scene's purpose, references, required models, and target output." },
        { title: "Build the scene", body: "Prepare geometry, materials, lighting, and camera composition for review." },
        { title: "Add behavior", body: "Implement agreed interactions or render the approved views and variants." },
        { title: "Optimize and deliver", body: "Check target devices, prepare fallbacks, and provide exports with integration notes." },
      ],
      tools: ["Blender", "Spline", "WebGL"],
      price: "On request",
      timeline: "Scoped together",
      plans: [
        { name: "Visual", price: "On request", blurb: "A carefully composed product view.", features: ["Agreed scene and camera", "Materials and lighting", "Rendered exports", "Review milestone"] },
        { name: "Interactive", price: "On request", featured: true, blurb: "A scene visitors can explore.", features: ["Web-ready scene", "Agreed interactions", "Performance checks", "Static fallback"] },
        { name: "Experience", price: "On request", blurb: "A broader product presentation.", features: ["Multiple agreed views or states", "Interaction planning", "Website integration scope", "Delivery documentation"] },
      ],
      faqs: [
        { q: "Do I need an existing 3D model?", a: "No, but supplying a usable model can reduce preparation work. We review your references and quote any modeling or cleanup required." },
        { q: "Will it work on phones?", a: "We agree target devices and test the scene within a performance budget. Static fallbacks keep the page usable where interactive 3D is unsuitable." },
        { q: "Can this be added to an existing website?", a: "Usually. We first check your platform and loading requirements, then define the integration and maintenance responsibilities." },
      ],
    },
    {
      slug: "motion-graphics",
      title: "Motion Graphics",
      tagline: "Movement with a clear purpose.",
      description: "Animation that explains a product, guides attention, or adds clarity to an interface. We build motion around your message and brand, from a short launch visual to reusable interface transitions.",
      explanation: [
        "We start with the message, audience, and destination: a website, presentation, social campaign, or product interface. Storyboards and style frames establish the sequence and visual direction before animation. Duration, aspect ratios, audio needs, and review rounds are agreed up front so the deliverables fit their actual placement.",
        "Delivery includes the agreed video or web animation exports and implementation guidance. Web motion includes loading and reduced-motion considerations; video delivery can include captions when part of the scope. Voiceover, music licensing, extra language versions, and editable source files are discussed before quoting, so usage rights and handover are clear.",
      ],
      features: [
        { icon: Film, title: "Story before animation", body: "A storyboard and timing plan make the message clear before production starts." },
        { icon: Palette, title: "Consistent visual direction", body: "Style frames carry your existing typography, colors, and illustration language into motion." },
        { icon: MousePointer2, title: "Considered interface motion", body: "Transitions and feedback explain state changes without interrupting the user's task." },
        { icon: Gauge, title: "Exports for the destination", body: "Agreed sizes, formats, and reduced-motion alternatives make delivery practical for your team." },
      ],
      process: [
        { title: "Define", body: "Agree the message, duration, audience, placements, and asset requirements." },
        { title: "Storyboard", body: "Review the sequence and style frames before animation work begins." },
        { title: "Animate", body: "Build timing and transitions, then refine through the agreed review rounds." },
        { title: "Export", body: "Check formats and playback, deliver the assets, and document usage or integration." },
      ],
      tools: ["After Effects", "Figma", "GSAP", "CSS"],
      price: "On request",
      timeline: "Scoped together",
      plans: [
        { name: "Essential", price: "On request", blurb: "A focused motion asset.", features: ["One agreed sequence", "Style frames", "Animation review", "Destination-ready export"] },
        { name: "Campaign", price: "On request", featured: true, blurb: "A coordinated set for launch.", features: ["Storyboard and animation", "Agreed aspect-ratio variants", "Campaign exports", "Usage guidance"] },
        { name: "Product", price: "On request", blurb: "Motion across an interface.", features: ["Interaction motion specification", "Reusable transitions", "Reduced-motion alternatives", "Developer handover"] },
      ],
      faqs: [
        { q: "Can you use our existing brand assets?", a: "Yes. We review the available files and usage permissions, then work within your established visual identity." },
        { q: "Do you include sound or voiceover?", a: "These can be included when requested. Production, licensing, and usage rights are agreed separately before work starts." },
        { q: "What formats will I receive?", a: "We choose formats for the agreed destination, such as video exports for campaigns or lightweight web assets and integration notes for websites." },
      ],
    },
  ],
};
