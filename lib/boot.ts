/**
 * Boot-sequence handshake between the Preloader and anything that needs to
 * wait for the intro overlay before doing expensive work.
 *
 * The intro is the first thing the browser paints, and the WebGL hero
 * (components/SplineRobot.tsx) is by far the most expensive thing on the page.
 * Booting the 3D runtime *while* the intro played put hundreds of milliseconds
 * of main-thread work (GL context creation, extension probing, shader
 * compilation) inside the animated sequence, which is what made the reveal
 * stutter. These helpers let the hero subscribe to "the intro is over"
 * without either component importing the other.
 */

const BOOT_COMPLETE_EVENT = "codefrem:boot-complete";

/** sessionStorage flag: repeat visits get the short (1.75x) cut. */
const BOOT_SESSION_KEY = "codefrem:booted";

/** True once the intro for *this* page load has finished. */
let complete = false;

/** Called by the Preloader when its timeline ends. */
export function signalBootComplete() {
  if (complete) return;
  complete = true;

  try {
    sessionStorage.setItem(BOOT_SESSION_KEY, "1");
  } catch {
    /* private mode — the short-cut flag is a nicety, not a requirement */
  }

  window.dispatchEvent(new Event(BOOT_COMPLETE_EVENT));
}

/**
 * True while the intro overlay is still on screen — and therefore still
 * about to announce when it leaves. Consumers that mount after the boot may
 * have already finished should check this rather than listening blindly.
 */
export function isBootPending(): boolean {
  return (
    !complete &&
    typeof document !== "undefined" &&
    !!document.getElementById("codefrem-preloader")
  );
}

/** Fires once the intro has finished (immediately if it already has). */
export function onBootComplete(cb: () => void): () => void {
  if (complete) {
    cb();
    return () => {};
  }

  const handler = () => {
    window.removeEventListener(BOOT_COMPLETE_EVENT, handler);
    cb();
  };
  window.addEventListener(BOOT_COMPLETE_EVENT, handler);

  return () => window.removeEventListener(BOOT_COMPLETE_EVENT, handler);
}

/** Has the cinematic cut already played in this browser session? */
export function bootedThisSession(): boolean {
  try {
    return sessionStorage.getItem(BOOT_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}
