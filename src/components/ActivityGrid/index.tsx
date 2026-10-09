import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { IkasComponentRenderer } from "@ikas/bp-storefront";
import ArrowLink from "../../sub-components/ArrowLink";
import SectionHeading from "../../sub-components/SectionHeading";
import { cx } from "../../utils/cx";
import { prefersReducedMotion, useReveal } from "../../utils/hooks";
import { BREAKPOINT } from "../../utils/tokens";
import { Props } from "./types";

/**
 * I/Section/ActivityGrid — heading + ArrowLink, then a strip of expanding ActivityCard children.
 * The section owns which card is open and writes `data-open` / `--i` onto the child `.acard`s.
 * Desktop: hover/focus opens a card, the last one stays open; the first opens after the entrance.
 * Tablet: plain horizontal strip. Mobile: scroll-snap strip, the centred card is open.
 */
export function ActivityGrid({ activities, ...props }: Props) {
  const {
    title = "Aktiviteye göre seç",
    subtitle = "Rotanı seç, gerisini birlikte hazırlayalım.",
    linkText = "Tüm aktiviteler",
    link,
    backgroundColor,
  } = props;
  const list = useMemo(
    () => (Array.isArray(activities) ? activities : activities ? [activities] : []).flat().filter(Boolean),
    [activities],
  );
  const rowRef = useRef<HTMLDivElement>(null);
  // I-ACT-03 · I-M-04: curtain entrance once 40% of the strip is visible
  const reveal = useReveal(rowRef, { threshold: 0.4, rootMargin: "0px" });
  const [open, setOpen] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const lockUntil = useRef(0);

  const cards = () => Array.from(rowRef.current?.querySelectorAll<HTMLElement>(".acard") ?? []);
  const indexOf = (target: EventTarget | null) => {
    const card = (target as HTMLElement | null)?.closest?.(".acard");
    return card ? cards().indexOf(card as HTMLElement) : -1;
  };

  // Write state onto the child cards; re-applied when the editor re-renders the children.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const apply = () =>
      cards().forEach((el, i) => {
        el.style.setProperty("--i", String(i));
        if (i === open) el.setAttribute("data-open", "");
        else el.removeAttribute("data-open");
      });
    apply();
    if (!ready) setReady(true);
    const mo = new MutationObserver(apply);
    mo.observe(row, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [open, list]);

  // I-ACT-04: the first card opens 0.2s after the entrance has finished (at once without motion).
  useEffect(() => {
    if (open !== null) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setOpen(0);
      return;
    }
    if (reveal !== "is-inview") return;
    const n = cards().length;
    const t = setTimeout(() => setOpen((o) => (o === null ? 0 : o)), 700 + 80 * Math.max(0, n - 1) + 200);
    return () => clearTimeout(t);
  }, [reveal]);

  // Mobile: open the card nearest to the strip centre once scrolling settles.
  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    let t = 0;
    const settle = () => {
      if (window.innerWidth > BREAKPOINT.mobile || Date.now() < lockUntil.current) return;
      const r = row.getBoundingClientRect();
      const mid = r.left + r.width / 2;
      let best = -1;
      let dist = Infinity;
      cards().forEach((el, i) => {
        const b = el.getBoundingClientRect();
        const d = Math.abs(b.left + b.width / 2 - mid);
        if (d < dist) {
          dist = d;
          best = i;
        }
      });
      if (best >= 0) {
        setOpen((o) => {
          if (o !== best) lockUntil.current = Date.now() + 550;
          return best;
        });
      }
    };
    const onScroll = () => {
      clearTimeout(t);
      t = window.setTimeout(settle, 120);
    };
    row.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      row.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  const onPointerOpen = (e: Event) => {
    if (typeof window === "undefined" || window.innerWidth <= BREAKPOINT.tablet) return;
    const i = indexOf(e.target);
    if (i >= 0 && i !== open) setOpen(i);
  };

  // Mobile: a tap on a closed card centres (and opens) it instead of following its link.
  const onClickCapture = (e: MouseEvent) => {
    if (window.innerWidth > BREAKPOINT.mobile) return;
    const i = indexOf(e.target);
    if (i < 0 || i === open) return;
    e.preventDefault();
    lockUntil.current = Date.now() + 700;
    setOpen(i);
    cards()[i]?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section className="act" style={backgroundColor ? { backgroundColor } : undefined}>
      <div className="act__head">
        {/* I-ACT-01 · M-01 via SectionHeading */}
        <SectionHeading title={title} subtitle={subtitle} align="left" className="act__heading" />
        {/* I-ACT-02 · M-10 via ArrowLink */}
        {linkText && link?.href && <ArrowLink label={linkText} href={link.href} className="act__link" />}
      </div>
      {list.length > 0 && (
        <div
          ref={rowRef}
          className={cx("act__row", reveal, ready && "is-ready", open !== null && "has-open")}
          onMouseOver={onPointerOpen}
          onFocusIn={onPointerOpen}
          onClickCapture={onClickCapture}
        >
          <IkasComponentRenderer id="activity-cards" className="act__renderer" components={list} parentProps={props} />
        </div>
      )}
    </section>
  );
}

export default ActivityGrid;
