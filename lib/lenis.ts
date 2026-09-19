import type Lenis from "lenis";

/**
 * Module-level handle to the global Lenis instance managed by
 * SmoothScrollProvider. Lets any client component (e.g. the Footer's
 * back-to-top button) scroll with the same inertia without prop-drilling
 * or creating a second Lenis instance.
 */
let instance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenisInstance(): Lenis | null {
  return instance;
}
