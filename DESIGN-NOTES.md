# Codefrem reference redesign

## Visual system

- Canvas: cool silver-gray `#E9EAEE`.
- Ink: near-black `#16181B`.
- Display accent: acid lime `#AFF45D`.
- Small-text accent: `#527A24`, a darker companion for readability.
- Muted copy: `#64676F`.
- Panels: translucent white, fine white borders, restrained shadows.
- Large uppercase display type, widely spaced micro-labels, compact service cards and illustrated project previews.

The shared palette, cards, typography, buttons, forms and page introductions cover Home, About, Services, Projects, Contact, nine service-detail routes and five project-detail routes. The homepage uses the reference composition with Codefrem content. Its numbered strip describes the process, and its quotation is the studio's own statement rather than an invented customer testimonial. Existing contact delivery remains deferred, as requested.

## Hero image

- Tool: built-in image generation, using the supplied screenshot as a visual reference.
- Source: `public/images/editorial-portrait.png`.
- Optimized website asset: `public/images/editorial-portrait.webp` (960 pixels wide, approximately 50 KB).
- Decorative editorial image; it does not represent a named team member. It has empty alternative text on the page.

### Generation prompt

Create a photorealistic editorial portrait asset for a website matching the supplied reference's hero photo. Use the reference only for composition and visual style. Generate ONLY the photograph, no website, no typography, no graphics, no rings, no logos. A young adult woman in left-facing side profile, dark hair in a loose bun, a sculptural white high-collar technical jacket, upper torso visible, elegant monochrome black and white photograph. Figure positioned in right two thirds, looking into empty space to the left, head near top, torso cropped along bottom. Soft high-key studio lighting with crisp detailed dark hair and delicate facial profile. Seamless very pale cool gray background #E9EAED blending into soft gray around figure, no hard horizon. Fashion editorial mood, realistic anatomy. Portrait 1024x1280 image. This is decorative campaign imagery, not a real team member.

## Preview

Run `npm run build` and `npm run start -- --port 3001`, then open http://localhost:3001. Changes have not been deployed to Vercel.
