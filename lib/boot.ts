/**
 * Boot-sequence handshake between the Preloader and the 3D robot hero.
 *
 * The Spline robot (components/SplineRobot.tsx) starts loading its WebGL
 * scene the moment it mounts — in parallel with the preloader's terminal /
 * counter animation — instead of waiting for the intro to finish. That way
 * the robot gets the entire length of the intro (and a little extra, if it
 * needs it) to finish loading, so by the time the curtain opens the robot is
 * already sitting there, fully loaded.
 *
 * These helpers let the two communicate "the robot is ready" without either
 * component importing the other:
 * - `SplineRobot` calls `signalRobotReady()` the moment its scene is done
 *   loading — or the moment it bails out for any reason (load error, low-end
 *   device fallback, reduced motion) — so the preloader is never left
 *   waiting on something that will never resolve.
 * - `Preloader` calls `onRobotReady()` / `isRobotReady()` to know when it's
 *   safe to finish its 0→100 counter and open the curtain.
 */

const ROBOT_READY_EVENT = "codefrem:robot-ready";

/** sessionStorage flag: repeat visits get the short (1.75x) terminal cut. */
const BOOT_SESSION_KEY = "codefrem:booted";

/** True once the robot has finished loading (or bailed out) this page load. */
let robotReady = false;

/** Called by SplineRobot once its scene has settled — success or failure. */
export function signalRobotReady() {
  if (robotReady) return;
  robotReady = true;
  window.dispatchEvent(new Event(ROBOT_READY_EVENT));
}

/** True while the robot hasn't finished loading (or bailing out) yet. */
export function isRobotReady(): boolean {
  return robotReady;
}

/** Fires once the robot is ready (immediately if it already is). */
export function onRobotReady(cb: () => void): () => void {
  if (robotReady) {
    cb();
    return () => {};
  }

  const handler = () => {
    window.removeEventListener(ROBOT_READY_EVENT, handler);
    cb();
  };
  window.addEventListener(ROBOT_READY_EVENT, handler);

  return () => window.removeEventListener(ROBOT_READY_EVENT, handler);
}

/** Called by the Preloader once its full sequence has finished. */
export function markSessionBooted() {
  try {
    sessionStorage.setItem(BOOT_SESSION_KEY, "1");
  } catch {
    /* private mode — the short-cut flag is a nicety, not a requirement */
  }
}

/** Has the cinematic cut already played in this browser session? */
export function bootedThisSession(): boolean {
  try {
    return sessionStorage.getItem(BOOT_SESSION_KEY) === "1";
  } catch {
    return false;
  }
}
