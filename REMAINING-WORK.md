# Codefrem — Final Handoff & Remaining Work

## Current status

The reference-inspired visual redesign is implemented locally. The latest update adds the supplied homepage content and rebuilds the mobile layout. The site has **not been deployed to Vercel**.

Local preview: http://localhost:3001/

## Completed

- [x] Cool silver-gray, near-black and lime visual system across the homepage, main pages, service details and case studies.
- [x] Lightweight editorial hero image and illustrated project previews.
- [x] Mobile hero now places the portrait below the introduction, with no text over the photo.
- [x] Readable mobile typography, single-column cards on narrow phones, larger buttons and form controls.
- [x] Tablet headline wrapping corrected; service cards adapt to one, two or four columns.
- [x] Pricing cards remain stacked until larger screens.
- [x] Supplied homepage content organized into introduction, four service areas, four delivery stages, audience, work, pricing, studio, technology, guides, FAQs and contact.
- [x] Homepage communicates fixed-scope custom software projects starting from **$2,500 USD**.
- [x] Five supplied FAQ answers implemented.
- [x] Three guide titles included as **Coming soon**, without dead links.
- [x] Existing portfolio examples labeled as concepts, rather than presented as verified client work.

## Remaining work — in priority order

### 1. Reconcile pricing throughout the site

**Status: content decision needed before publication.**

The homepage now uses your supplied $2,500 starting price. Older service pages still contain package prices, delivery estimates and FAQs based on the previous offer, including custom websites from $800.

Decide whether the $2,500 minimum applies to all new custom software projects, and whether maintenance or smaller standalone services have separate prices. Then update every visible service price, package, FAQ, page description and contact budget option consistently.

Relevant files:

- lib/subServices.ts
- components/services/SubServiceTemplate.tsx
- components/services/PricingPlans.tsx
- app/services/page.tsx
- app/services/**/page.tsx
- lib/contactValidation.ts

**Done when:** a visitor sees consistent pricing and scope expectations from the homepage through the service page and enquiry form.

### 2. Connect enquiry delivery

**Status: intentionally deferred at your request.**

The existing contact action validates and logs submissions, then returns a success state. It does not deliver enquiries to an email inbox. The displayed hello@codefrem.com address is marked as a placeholder in the source.

Needed:

- Confirm the real receiving email address.
- Choose and configure delivery.
- Replace the placeholder address wherever it appears.
- Show success only after delivery is accepted; preserve the form and show a useful error if delivery fails.
- Test an actual enquiry end to end after configuration.

Relevant files:

- app/contact/actions.ts
- app/contact/page.tsx
- components/contact/ContactForm.tsx
- components/contact/ContactInfoCards.tsx

**Done when:** a test enquiry reaches the confirmed inbox and the success/error states reflect the actual delivery outcome.

### 3. Replace or verify portfolio material

**Status: real project content needed.**

The five current case studies are identified as fictionalized placeholders in data/projects.ts. The supplied homepage copy describes real and in-house projects, so the homepage currently explains that verified work still needs to be added.

For each real project, provide:

- Project name and whether it is client work or an in-house build.
- The problem, requirements, implementation and delivered result.
- Actual screenshots.
- Public project URL, if available.
- Verified results and permission to publish any client attribution or testimonial.

Relevant files:

- data/projects.ts
- components/ProjectsSection.tsx
- components/projects/ProjectPreview.tsx
- components/projects/ProjectGallery.tsx
- app/projects/page.tsx
- app/projects/[slug]/page.tsx

Also replace the older confidentiality note in the project gallery once the final portfolio status is settled.

**Done when:** every published claim, image and attribution reflects the actual project, and concept work remains labeled accordingly.

### 4. Align About and Contact copy with the new positioning

**Status: business details need confirmation.**

The homepage now uses your founder-and-lead-developer description. Some older pages still refer to a two-person studio, two founders, 30+ projects, three years of experience and 24/7 response time. Contact copy also contains specific response times, payment terms and availability claims.

Confirm the team structure, names, roles, experience, project count, location, working hours and actual commercial terms. Then update the older pages and metadata to match.

Relevant files:

- app/about/page.tsx
- app/contact/page.tsx
- app/services/page.tsx
- lib/team.ts
- components/contact/ContactInfoCards.tsx

**Done when:** the homepage, About, Services and Contact pages describe the same business accurately.

### 5. Replace booking and social placeholders

**Status: real URLs needed.**

The booking link currently uses #. Several social links go to platform homepages rather than Codefrem profiles.

Provide actual destinations or remove unavailable channels.

Relevant files:

- components/contact/ContactInfoCards.tsx
- lib/team.ts

**Done when:** every booking and social link opens the intended destination.

### 6. Write and publish the guides

**Status: titles supplied; article content and URLs not supplied.**

Planned guides:

1. How Much Does a Custom Website Cost?
2. Shopify vs WooCommerce vs a Custom Store
3. What Is a Tech Stack and How to Choose One

Create the articles and their routes, verify their factual claims, then replace the Coming soon labels with links.

Relevant files:

- New article routes, to be created. The planned guide titles in data/home.ts were removed with the unused homepage sections; recreate them alongside the article routes when the guides are written.

**Done when:** all three cards link to complete, reviewed articles.

### 7. Complete final release checks and deploy

**Status: not deployed.**

Before publishing:

- Resolve the pricing, enquiry-delivery and factual-content items above.
- Review the final site on a real iPhone and Android phone; the current responsive checks used browser viewport emulation.
- Check production loading performance and image delivery.
- Confirm production metadata, social preview image, sitemap and robots settings.
- Deploy through the existing Vercel project and verify the public domain.
- Repeat the enquiry-delivery check on the live deployment.

No public deployment was performed during this work.

### 8. Source cleanup

**Status: done.**

- Unused legacy robot/preloader/motion components and their support modules (boot, lenis, device-capability hook) were removed after confirming nothing imports them.
- Unused public assets (Spline scene, unused SVGs/mockups/portraits) and an unused `framer-motion`/`gsap`/`lenis` dependency set were removed; the production build passes.

## Verification performed

- Production build and TypeScript compilation: passed.
- Latest changed TypeScript/TSX files: lint check passed.
- Homepage visually reviewed at 320, 390, 768 and 1366 pixel viewport widths.
- No horizontal document overflow at 320 pixels on Home, About, Services, Projects, Contact, a service-detail page and a project-detail page.
- Mobile contact dropdown opened and visually checked for readable options and larger controls.
- Earlier redesign checks covered navigation, project filtering and FAQ expansion.
- No actual email delivery test was performed because that integration remains deferred.
- No claim is made that every physical device or browser has been tested.

## Main files for future edits

| Area | File |
| --- | --- |
| Homepage composition | app/page.tsx |
| Hero | components/HeroSection.tsx |
| Services | components/ServicesSection.tsx |
| Selected work | components/ProjectsSection.tsx |
| Shared styling and breakpoints | app/globals.css |
| Navigation | components/Navbar.tsx |
| Contact close | components/ContactSection.tsx |
| Earlier visual system and image-generation notes | DESIGN-NOTES.md |

## Recommended next action

Confirm the pricing rules and business details first, then connect enquiry delivery. Those are the most important remaining steps before publishing a business website intended to bring in clients.
