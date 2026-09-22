# Codefrem reference redesign

## Visual system

- Canvas: cool silver-gray `#E9EAEE`.
- Ink: near-black `#16181B`.
- Display accent: acid lime `#AFF45D`.
- Small-text accent: `#A0E34F`, a darker companion for readability.
- Muted copy: `#64676F`.
- Panels: translucent white, fine white borders, restrained shadows.
- Large uppercase display type, widely spaced micro-labels, compact service cards and illustrated project previews.

The shared palette, cards, typography, buttons, forms and page introductions cover Home, About, Services, Projects, Contact, nine service-detail routes and five project-detail routes. The homepage uses the reference composition with Codefrem content. Its hero artwork lives at `public/images/hero-tech-reference.webp`. Existing contact delivery remains deferred, as requested.

## Hero artwork generation prompt

The hero artwork was generated with the supplied screenshot as a strict visual reference, recreating only the technical collage on the right half of the reference: large tilted desktop dashboard upper right with dark sidebar and pale analytics panels; narrow white mobile screen upper left; dark mobile screen center foreground; angled dark rectangular dashboard lower left; small pale and dark interface cards scattered lower right. All planes share the reference's receding isometric perspective, tilted about 23 degrees clockwise, with delicate triangulated lime wireframe network interconnects, tiny luminous lime nodes, and a subtle lime elliptical orbit along the lower edge. Palette: pale cool silver `#E9EAEE` backdrop, charcoal `#16181B` screens, pale off-white and lime `#AFF45D` highlights, soft diffuse shadows, refined reference look; square 1024x1024 asset with the collage filling the central 90%, fading seamlessly to `#E9EAEE` at all edges. No headline, nav bar, outside labels, human, watermark, outer frame, or contact card.

## Preview

Run `npm run build` and `npm run start -- --port 3001`, then open http://localhost:3001. Changes have not been deployed to Vercel.
