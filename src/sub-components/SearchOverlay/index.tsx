import { useEffect, useRef, useState } from "preact/hooks";
import { IkasNavigationLink, IkasProduct, Router, apiSearchProducts, withRoutePrefix } from "@ikas/bp-storefront";
import { cx } from "../../utils/cx";
import { useEscape, useScrollLock } from "../../utils/hooks";
import { fillText, useFocusTrap, usePresence } from "../../utils/overlay";
import { TEXT } from "../../utils/tokens";
import ArrowLink from "../ArrowLink";
import Icon from "../Icon";
import IconButton from "../IconButton";
import ProductCardSmall from "../ProductCardSmall";
import Spinner from "../Spinner";

export interface SearchOverlayTexts {
  searchPlaceholder: string;
  closeAriaLabel: string;
  searchEmptyTitle: string;
  searchResultCountText: string;
  searchNoResultText: string;
  searchNoResultHint: string;
  searchAllResultsText: string;
}

interface Props extends SearchOverlayTexts {
  open: boolean;
  onClose: () => void;
  /** Viewport y of the header bar's bottom edge — the desktop panel opens from there. */
  top?: number;
  suggestions: IkasNavigationLink[];
}

const DEBOUNCE_MS = 300;
const PER_PAGE = 4;

/**
 * I/Overlay/SearchOverlay — panel under the header (desktop, 4-up results; 3-up on tablet),
 * full screen on mobile (single column list).
 * States: boş (suggestion chips) · yazarken (count + results + all-results link) · sonuçsuz.
 * I-SRCH-01 (M-21) panel drops in and the field focuses · I-SRCH-02 results stagger ·
 * I-SRCH-03 via ArrowLink.
 */
export default function SearchOverlay({
  open,
  onClose,
  top = 0,
  suggestions,
  searchPlaceholder,
  closeAriaLabel,
  searchEmptyTitle,
  searchResultCountText,
  searchNoResultText,
  searchNoResultHint,
  searchAllResultsText,
}: Props) {
  const { mounted, shown } = usePresence(open);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reqId = useRef(0);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IkasProduct[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState("");
  useScrollLock(open);
  useEscape(open, onClose);
  useFocusTrap(panelRef, open && mounted, inputRef);

  const q = query.trim();

  useEffect(() => {
    if (!q) {
      reqId.current++;
      setResults([]);
      setCount(0);
      setLoading(false);
      setSearched("");
      return;
    }
    setLoading(true);
    const id = ++reqId.current;
    const t = setTimeout(async () => {
      try {
        const res = await apiSearchProducts({ input: { query: q, perPage: PER_PAGE } });
        if (id !== reqId.current) return;
        const data = (res?.data?.data ?? []) as IkasProduct[];
        setResults(data);
        setCount(res?.data?.totalCount ?? res?.data?.count ?? data.length);
      } catch {
        if (id !== reqId.current) return;
        setResults([]);
        setCount(0);
      }
      setSearched(q);
      setLoading(false);
    }, DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [q]);

  if (!mounted) return null;

  const goSearch = () => {
    if (!q) return;
    onClose();
    Router.navigateToPage("SEARCH", undefined, { q });
  };

  const state: "empty" | "results" | "none" = !q ? "empty" : results.length ? "results" : searched === q && !loading ? "none" : "empty";
  const chips = suggestions.filter((l) => l?.label);

  const suggestionsBlock = chips.length > 0 && (
    <div className="srch__suggest">
      {searchEmptyTitle && <p className={cx("srch__suggest-title", TEXT.label)}>{searchEmptyTitle}</p>}
      <ul className="srch__chips">
        {chips.map((l, i) => (
          <li key={`${l.label}-${i}`}>
            <a className={cx("srch__chip", TEXT.ui)} href={l.href} onClick={onClose}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={cx("srch", shown && "is-open")} style={{ "--srch-top": `${Math.max(0, top)}px` } as any}>
      <div className="srch__scrim" onClick={onClose} aria-hidden="true" />
      <div ref={panelRef} className="srch__panel" role="dialog" aria-modal="true" aria-label={searchPlaceholder}>
        <div className="srch__inner">
          <form
            className="srch__field"
            role="search"
            action={withRoutePrefix("/search")}
            onSubmit={(e) => {
              e.preventDefault();
              goSearch();
            }}
          >
            <Icon name="search" size={24} className="srch__icon" />
            <input
              ref={inputRef}
              className={cx("srch__input", TEXT.h3)}
              type="search"
              name="q"
              value={query}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              autoComplete="off"
              enterKeyHint="search"
              onInput={(e) => setQuery((e.currentTarget as HTMLInputElement).value)}
            />
            {loading && <Spinner size={18} className="srch__spinner" />}
            <IconButton icon="x" iconSize={20} ariaLabel={closeAriaLabel} onClick={onClose} className="srch__close" />
          </form>

          {state === "results" && (
            <div className={cx("srch__results", loading && "is-busy")} aria-live="polite">
              <p className={cx("srch__count", TEXT.label, "tabular")}>{fillText(searchResultCountText, { count })}</p>
              <ul key={searched} className="srch__grid">
                {results.slice(0, PER_PAGE).map((p, i) => (
                  <li key={p.id} className="srch__item" style={{ "--i": i } as any}>
                    <ProductCardSmall product={p} onClick={onClose} />
                  </li>
                ))}
              </ul>
              {searchAllResultsText && (
                <ArrowLink
                  className="srch__all"
                  label={searchAllResultsText}
                  href={withRoutePrefix(`/search?q=${encodeURIComponent(q)}`)}
                  onClick={(e) => {
                    e.preventDefault();
                    goSearch();
                  }}
                />
              )}
            </div>
          )}

          {state === "none" && (
            <div className="srch__none" role="status">
              {searchNoResultText && <p className={cx("srch__none-title", TEXT.h4)}>{searchNoResultText}</p>}
              {searchNoResultHint && <p className={cx("srch__none-hint", TEXT.body)}>{searchNoResultHint}</p>}
            </div>
          )}

          {state !== "results" && suggestionsBlock}
        </div>
      </div>
    </div>
  );
}
