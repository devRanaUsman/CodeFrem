/**
 * Team members for the /about page grid.
 *
 * To tweak anything (roles, bios, avatars, links) this is the ONLY file to
 * edit. Avatar: drop a photo into /public (e.g. /team/usman.jpg) and set
 * `avatar`, or leave it undefined to keep the styled monogram fallback.
 */

export interface TeamMember {
  name: string;
  role: string;
  /** One human line (not a corporate bio). */
  bio: string;
  /** Path to a photo in /public, or undefined for the monogram fallback. */
  avatar?: string;
  /** Social links (all optional). */
  links?: { label: string; href: string }[];
}

export const team: TeamMember[] = [
  {
    name: "Rana Muhammad Usman",
    role: "Founder & Lead Engineer",
    bio: "Designs the things you see, and the reasons you stay. Believes a brand is a promise delivered one scroll at a time.",
    links: [
      { label: "Twitter/X", href: "https://twitter.com" },
      { label: "Dribbble", href: "https://dribbble.com" },
    ],
  },
  {
    name: "Talha Shahid",
    role: "Co-Founder & Creative Director",
    bio: "Builds the things that must never break. Treats 60fps as a feature and 'it works on my machine' as a bug report.",
    links: [
      { label: "Twitter/X", href: "https://twitter.com" },
      { label: "GitHub", href: "https://github.com" },
    ],
  },
];
