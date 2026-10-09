import { useEffect, useRef, useState } from "preact/hooks";
import type { RefObject } from "preact";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/**
 * io-hook: SSR renders the end state; after hydration the element gets `is-pending`
 * (start state) until it scrolls into view, then `is-inview`. Returns the class to apply.
 */
export function useReveal<T extends Element>(ref: RefObject<T>, options?: { threshold?: number; rootMargin?: string }) {
  const [state, setState] = useState<"idle" | "pending" | "inview">("idle");
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
      setState("pending");
      requestAnimationFrame(() => requestAnimationFrame(() => setState("inview")));
      return;
    }
    setState("pending");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("inview");
          io.disconnect();
        }
      },
      { threshold: options?.threshold ?? 0.15, rootMargin: options?.rootMargin ?? "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return state === "pending" ? "is-pending" : state === "inview" ? "is-inview" : "";
}

/** Locks body scroll while `active` (overlays, drawers). */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [active]);
}

/** Calls `onClose` on Escape while `active`. */
export function useEscape(active: boolean, onClose: () => void) {
  const cb = useRef(onClose);
  cb.current = onClose;
  useEffect(() => {
    if (!active) return;
    const h = (e: KeyboardEvent) => e.key === "Escape" && cb.current();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active]);
}

/** Remaining time to `target` as HH:MM:SS parts, ticking every second (client only). */
export function useCountdown(target?: Date | string | null) {
  const end = target ? new Date(target).getTime() : NaN;
  const calc = () => {
    if (Number.isNaN(end)) return null;
    const diff = Math.max(0, end - Date.now());
    const s = Math.floor(diff / 1000);
    return { h: Math.floor(s / 3600), m: Math.floor((s % 3600) / 60), s: s % 60, done: diff === 0 };
  };
  const [left, setLeft] = useState<ReturnType<typeof calc>>(null);
  useEffect(() => {
    if (Number.isNaN(end)) return;
    setLeft(calc());
    const t = setInterval(() => setLeft(calc()), 1000);
    return () => clearInterval(t);
  }, [end]);
  return left;
}

/** True after hydration; use to defer client-only UI. */
export function useMounted() {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  return m;
}
