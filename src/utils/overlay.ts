// Overlay plumbing shared by Header's overlays (MenuOverlay, SearchOverlay, CartDrawer) and QuickBuy.
import { useEffect, useRef, useState } from "preact/hooks";
import type { RefObject } from "preact";
import { prefersReducedMotion } from "./hooks";

/**
 * Mount/transition state for an overlay. `mounted` keeps the DOM alive through the exit
 * transition; `shown` flips one frame after mount so CSS transitions run from the start state.
 */
export function usePresence(open: boolean, exitMs = 450) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (open) {
      setMounted(true);
      let r2 = 0;
      const r1 = requestAnimationFrame(() => {
        r2 = requestAnimationFrame(() => setShown(true));
      });
      return () => {
        cancelAnimationFrame(r1);
        cancelAnimationFrame(r2);
      };
    }
    setShown(false);
    const t = setTimeout(() => setMounted(false), prefersReducedMotion() ? 0 : exitMs);
    return () => clearTimeout(t);
  }, [open]);
  return { mounted, shown };
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * While `active`: moves focus into `ref` (to `initial` when given), keeps Tab inside it and
 * restores focus to the previously focused element when it deactivates.
 */
export function useFocusTrap(ref: RefObject<HTMLElement>, active: boolean, initial?: RefObject<HTMLElement>) {
  const prev = useRef<Element | null>(null);
  useEffect(() => {
    if (!active) return;
    prev.current = document.activeElement;
    const root = ref.current;
    const t = setTimeout(() => {
      const target = initial?.current ?? root?.querySelector<HTMLElement>(FOCUSABLE) ?? root;
      target?.focus({ preventScroll: true });
    }, 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !root) return;
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      (prev.current as HTMLElement | null)?.focus?.({ preventScroll: true });
    };
  }, [active]);
}

/** Replaces `{key}` tokens in merchant text ("{count} SONUÇ"). */
export const fillText = (tpl: string | undefined, values: Record<string, string | number>) =>
  Object.keys(values).reduce((s, k) => s.split(`{${k}}`).join(String(values[k])), tpl ?? "");
