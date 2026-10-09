import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { IkasComponentRenderer } from "@ikas/bp-storefront";
import ArrowLink from "../../sub-components/ArrowLink";
import SectionHeading from "../../sub-components/SectionHeading";
import Tabs from "../../sub-components/Tabs";
import { cx } from "../../utils/cx";
import { useReveal } from "../../utils/hooks";
import { Props } from "./types";

/**
 * I/Section/Bestsellers — heading + tab bar, then the active BestsellerTab panel: ranked rows
 * with a 560 preview that follows the hovered row (440 laptop · hidden on tablet · on top on mobile).
 * Children are opaque, so the section reads each panel's `data-btab-label` from the DOM for the
 * Tabs bar and writes `data-state="active"` onto the shown panel (same pattern as HeroSlider).
 * I-BEST-01 via SectionHeading · I-BEST-02 via Tabs · I-BEST-03 · M-01 row stagger (here) ·
 * I-BEST-04/05/06 in BestsellerTab · I-BEST-07 via ArrowLink.
 */
export function Bestsellers({ tabs, ...props }: Props) {
  const {
    title = "Çok satanlar",
    subtitle = "Bu ay en çok sepete girenler.",
    linkText = "Tüm çok satanlar",
    tabsAriaLabel = "Çok satan kategorileri",
    link,
    maxItems = 5,
    backgroundColor,
  } = props;
  const list = useMemo(() => (Array.isArray(tabs) ? tabs : tabs ? [tabs] : []).flat().filter(Boolean), [tabs]);
  const bodyRef = useRef<HTMLDivElement>(null);
  const reveal = useReveal(bodyRef);
  const [labels, setLabels] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const current = labels.length ? Math.min(active, labels.length - 1) : 0;
  const max = Math.min(Math.max(Math.round(maxItems || 5), 1), 10);

  // Sync labels + active panel with the rendered children (re-applied when the editor re-renders them).
  useEffect(() => {
    const host = bodyRef.current;
    if (!host) return;
    const apply = () => {
      const panels = Array.from(host.querySelectorAll<HTMLElement>(".btab"));
      const next = panels.map((p, i) => p.getAttribute("data-btab-label") || String(i + 1));
      setLabels((prev) => (prev.length === next.length && prev.every((l, i) => l === next[i]) ? prev : next));
      panels.forEach((p, i) => {
        const on = i === current;
        if (p.getAttribute("data-state") !== (on ? "active" : "idle")) p.setAttribute("data-state", on ? "active" : "idle");
        if (on) {
          p.removeAttribute("aria-hidden");
          p.removeAttribute("inert");
        } else {
          p.setAttribute("aria-hidden", "true");
          p.setAttribute("inert", "");
        }
      });
      setReady(true);
    };
    apply();
    const mo = new MutationObserver(apply);
    mo.observe(host, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [current, list.length]);

  return (
    <section
      className={cx("best", ready && "is-ready")}
      data-max={max}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="best__head">
        <SectionHeading title={title} subtitle={subtitle} align="left" className="best__heading" />
        {labels.length > 1 && (
          <Tabs
            className="best__tabs"
            ariaLabel={tabsAriaLabel}
            items={labels.map((label, i) => ({ value: String(i), label }))}
            value={String(current)}
            onChange={(v) => setActive(Number(v))}
          />
        )}
      </div>

      {list.length > 0 && (
        /* bestsellers-body · I-BEST-03 · M-01: rows rise in sequence; again on every tab change */
        <div ref={bodyRef} className={cx("best__body", reveal)}>
          <IkasComponentRenderer id="best-tabs" className="best__panels" components={list} parentProps={props} />
          {linkText && link?.href && (
            <div className="best__actions">
              <ArrowLink label={linkText} href={link.href} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default Bestsellers;
