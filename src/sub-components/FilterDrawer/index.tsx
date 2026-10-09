import { useEffect, useRef, useState } from "preact/hooks";
import { IkasProductList, clearProductListFilters, hasProductListAppliedFilters } from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { cx } from "../../utils/cx";
import { useEscape, useScrollLock } from "../../utils/hooks";
import { BREAKPOINT, TEXT } from "../../utils/tokens";
import Button from "../Button";
import FilterPanel, { type FilterPanelTexts } from "../FilterPanel";
import IconButton from "../IconButton";

export interface FilterDrawerTexts {
  filterTitle: string;
  closeAriaLabel: string;
  clearText: string;
  /** "{count} ürünü göster" */
  applyText: string;
  loadingText: string;
}

interface Props {
  productList: IkasProductList;
  open: boolean;
  onClose: () => void;
  texts: FilterDrawerTexts;
  panelTexts: FilterPanelTexts;
  idPrefix: string;
}

const CLOSE_MS = 450;

/**
 * I/Overlay/FilterDrawer — ProductList's filter drawer (tablet: 420 from the left, mobile: full
 * screen). Filters apply immediately (ikas refetches on every click); "apply" just closes and
 * shows the live count. I-FILT-01 · M-20 slide + scrim + row stagger · I-FILT-02 · M-22 via AccordionItem.
 */
const FilterDrawer = observer(function FilterDrawer({ productList, open, onClose, texts, panelTexts, idPrefix }: Props) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      returnFocus.current = (document.activeElement as HTMLElement) ?? null;
      setMounted(true);
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)));
      return () => cancelAnimationFrame(raf);
    }
    setShown(false);
    const t = setTimeout(() => {
      setMounted(false);
      returnFocus.current?.focus?.();
    }, CLOSE_MS);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (shown) closeRef.current?.querySelector<HTMLElement>("button")?.focus();
  }, [shown]);

  // Desktop has the sidebar instead — close if the viewport grows past tablet.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia(`(min-width: ${BREAKPOINT.tablet + 1}px)`);
    const h = () => mq.matches && onClose();
    mq.addEventListener?.("change", h);
    return () => mq.removeEventListener?.("change", h);
  }, [open]);

  useScrollLock(open);
  useEscape(open, onClose);

  // Simple focus trap.
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const els = panelRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const visible = Array.from(els).filter((el) => el.offsetParent !== null);
    if (!visible.length) return;
    const first = visible[0];
    const last = visible[visible.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  if (!mounted) return null;

  const loading = productList.isLoading;
  const applyLabel = loading ? texts.loadingText : texts.applyText.replace("{count}", String(productList.count ?? 0));
  const titleId = `${idPrefix}-title`;

  return (
    <div className={cx("fdrawer", shown && "fdrawer--open")}>
      {/* I-FILT-01 · M-20: scrim fades in */}
      <div className="fdrawer__scrim" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className="fdrawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={onKeyDown as any}
      >
        <div className="fdrawer__header">
          <h2 id={titleId} className={cx("fdrawer__title", TEXT.h4)}>
            {texts.filterTitle}
          </h2>
          <div ref={closeRef}>
            <IconButton icon="x" iconSize={20} ariaLabel={texts.closeAriaLabel} onClick={onClose} />
          </div>
        </div>
        <div className="fdrawer__body">
          <FilterPanel productList={productList} texts={panelTexts} variant="drawer" idPrefix={`${idPrefix}-panel`} />
        </div>
        <div className="fdrawer__actions">
          <Button
            label={texts.clearText}
            variant="outline"
            fullWidth
            disabled={!hasProductListAppliedFilters(productList) || loading}
            onClick={() => clearProductListFilters(productList)}
          />
          <Button label={applyLabel} fullWidth state={loading ? "loading" : "idle"} onClick={onClose} />
        </div>
      </div>
    </div>
  );
});

export default FilterDrawer;
