import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { IkasComponentRenderer } from "@ikas/bp-storefront";
import Counter from "../../sub-components/Counter";
import { cx } from "../../utils/cx";
import { prefersReducedMotion } from "../../utils/hooks";
import { BREAKPOINT, TEXT, forceScheme } from "../../utils/tokens";
import { Props } from "./types";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * I/Section/HeroSlider — full-bleed slides (HeroSlide children) under the transparent header.
 * The section owns the slide state: it writes `data-state` onto each child `.hslide`
 * (children are opaque to the parent), runs autoplay, the parallax scrub and the slide counter.
 * I-HERO-01/02/03/05/07 are drawn by HeroSlide's CSS from that state; I-HERO-04 via Button;
 * I-HERO-06 here via Counter.
 */
export function HeroSlider({ slides, ...props }: Props) {
  const {
    ariaLabel = "Öne çıkanlar",
    autoplaySeconds = 6,
    overlayOpacity = 100,
    heightMode = "theme",
    backgroundColor,
  } = props;
  const list = useMemo(
    () => (Array.isArray(slides) ? slides : slides ? [slides] : []).flat().filter(Boolean),
    [slides],
  );
  const count = list.length;
  const rootRef = useRef<HTMLElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef(-1);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const touchX = useRef<number | null>(null);

  const current = count > 0 ? Math.min(active, count - 1) : 0;
  const go = (index: number) => {
    if (count < 2) return;
    setActive((prev) => {
      const next = ((index % count) + count) % count;
      if (next !== prev) prevRef.current = prev;
      return next;
    });
  };

  // Write the slide state onto the child slides (re-applied when the editor re-renders children).
  useEffect(() => {
    const host = slidesRef.current;
    if (!host) return;
    const apply = () => {
      const els = host.querySelectorAll<HTMLElement>(".hslide");
      els.forEach((el, i) => {
        const state = i === current ? "active" : i === prevRef.current ? "prev" : "idle";
        if (el.getAttribute("data-state") !== state) el.setAttribute("data-state", state);
        if (i === current) {
          el.removeAttribute("aria-hidden");
          el.removeAttribute("inert");
        } else {
          el.setAttribute("aria-hidden", "true");
          el.setAttribute("inert", "");
        }
      });
    };
    apply();
    if (!ready) setReady(true);
    const mo = new MutationObserver(apply);
    mo.observe(host, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [current, count]);

  // Autoplay — paused on hover, while the tab is hidden, and for a single slide.
  useEffect(() => {
    const secs = Number(autoplaySeconds) || 0;
    if (count < 2 || secs <= 0 || hovered || tabHidden) return;
    const t = setTimeout(() => go(current + 1), secs * 1000);
    return () => clearTimeout(t);
  }, [current, count, autoplaySeconds, hovered, tabHidden]);

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // I-HERO-07 · M-27 scroll-scrub: --hero-parallax 0 → 1 while the hero scrolls out (desktop only).
  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (window.innerWidth <= BREAKPOINT.mobile) {
        root.style.setProperty("--hero-parallax", "0");
        return;
      }
      const rect = root.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)));
      root.style.setProperty("--hero-parallax", p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Mobile: the counter sits above the active slide's text block, so track that block's height.
  useEffect(() => {
    const root = rootRef.current;
    const host = slidesRef.current;
    if (!root || !host || typeof ResizeObserver === "undefined") return;
    const text = host.querySelectorAll<HTMLElement>(".hslide__text")[current];
    if (!text) return;
    const ro = new ResizeObserver(() => root.style.setProperty("--hero-text-h", `${text.offsetHeight}px`));
    ro.observe(text);
    return () => ro.disconnect();
  }, [current, count]);

  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? touchX.current) - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1));
  };

  const scrim = Math.min(100, Math.max(0, Number(overlayOpacity ?? 100))) / 100;
  const style: Record<string, string | number> = { "--hero-scrim-opacity": scrim };
  if (backgroundColor) style.backgroundColor = backgroundColor;

  return (
    <section
      ref={rootRef}
      className={cx("hero", `hero--${heightMode || "theme"}`, ready && "is-ready")}
      style={style as any}
      aria-label={ariaLabel || undefined}
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusIn={() => setHovered(true)}
      onFocusOut={() => setHovered(false)}
    >
      {/* I-HERO-05 · M-07: slides stacked, crossfaded by data-state */}
      <div ref={slidesRef} className="hero__slides" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <IkasComponentRenderer id="hero-slides" className="hero__renderer" components={list} parentProps={props} />
      </div>

      {count > 1 && (
        /* I-HERO-06 · I-M-01 via Counter: digits roll right-to-left on slide change */
        <div className={cx("hero__counter", forceScheme("clear"))}>
          <Counter value={pad(current + 1)} textClass={TEXT.label} />
          <span className={cx("hero__counter-total", TEXT.label, "tabular")} aria-hidden="true">
            {` / ${pad(count)}`}
          </span>
        </div>
      )}
    </section>
  );
}

export default HeroSlider;
