import { useEffect, useRef } from "preact/hooks";
import { observer } from "@ikas/component-utils";
import {
  IkasLanguageOption,
  IkasLocaleOption,
  IkasStorefrontConfig,
  baseStore,
  setLanguage,
  setLocalization,
} from "@ikas/bp-storefront";
import { cx } from "../../utils/cx";
import { useEscape, useScrollLock } from "../../utils/hooks";
import { TEXT, forceScheme } from "../../utils/tokens";
import Icon from "../Icon";

/** True when the store offers another country/currency or language (brief: hidden without data). */
export function hasLocaleAlternatives() {
  return (baseStore.localeOptions?.length ?? 0) > 1 || (baseStore.languageOptions?.length ?? 0) > 1;
}

/** True when the switcher has anything to list (at least the current country/currency). */
export function hasLocaleOptions() {
  return (baseStore.localeOptions?.length ?? 0) > 0 || (baseStore.languageOptions?.length ?? 0) > 1;
}

/** "TRY · ₺ · Türkçe"-style label of the current routing, or null before options load. */
export function currentLocaleLabel() {
  const routing = IkasStorefrontConfig.getCurrentRouting?.();
  if (!routing) return null;
  const lang = baseStore.languageOptions?.find((l) => l.isSelected)?.language;
  const currency = routing.currencySymbol || routing.currencyCode;
  const parts = [currency, lang].filter(Boolean);
  return parts.length ? parts.join(" · ") : null;
}

const cap = (s?: string | null) => (s ? s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1) : "");

interface Props {
  open: boolean;
  /** "anchored" = 320 panel above the footer button; "sheet" = bottom sheet (mobile, or opened from elsewhere). */
  mode: "anchored" | "sheet";
  onClose: () => void;
  localeTitle?: string;
  languageTitle?: string;
  id?: string;
}

/**
 * I/Overlay/LocaleSwitcher — Footer › Overlay. Country/currency (baseStore.localeOptions → setLocalization)
 * and language (baseStore.languageOptions → setLanguage). I-LCL-01 · M-06: panel unclips downward.
 */
const LocaleSwitcher = observer(function LocaleSwitcher({ open, mode, onClose, localeTitle, languageTitle, id }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  useEscape(open, onClose);
  useScrollLock(open && mode === "sheet");

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      const target =
        panelRef.current?.querySelector<HTMLElement>(".lcl__option--on") ?? panelRef.current?.querySelector<HTMLElement>(".lcl__option");
      target?.focus();
    }, 30);
    return () => clearTimeout(t);
  }, [open]);

  const locales: IkasLocaleOption[] = baseStore.localeOptions ?? [];
  const languages: IkasLanguageOption[] = baseStore.languageOptions ?? [];
  const currentId = IkasStorefrontConfig.getCurrentRouting?.()?.id;
  const matching = locales.filter((o) => o.routing?.id === currentId);
  const selectedLocale = matching.find((o) => o.isRecommended) ?? matching[0];

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>("button"));
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

  return (
    <div className={cx("lcl", `lcl--${mode}`, open && "lcl--open")} {...({ inert: !open ? true : undefined } as any)}>
      <div className="lcl__scrim" aria-hidden="true" onClick={onClose} />
      {/* I-LCL-01 · M-06 */}
      <div
        ref={panelRef}
        id={id}
        className={cx("lcl__panel", forceScheme("paper"))}
        role="dialog"
        aria-modal="true"
        aria-label={localeTitle || languageTitle}
        aria-hidden={!open}
        onKeyDown={onKeyDown as any}
      >
        {/* Country / currency list — drawn even for a single routing (current one, checked). */}
        {locales.length > 0 && (
          <div className="lcl__group">
            {localeTitle && <p className={cx("lcl__title", TEXT.label)}>{localeTitle}</p>}
            {locales.map((o) => {
              const on = o === selectedLocale;
              const currency = [o.routing?.currencyCode, o.routing?.currencySymbol].filter(Boolean).join(" · ");
              return (
                <button
                  key={o.id}
                  type="button"
                  className={cx("lcl__option", on && "lcl__option--on")}
                  aria-pressed={on}
                  onClick={() => (on ? onClose() : setLocalization(baseStore, o))}
                >
                  <span className="lcl__text">
                    <span className={cx("lcl__name", TEXT.ui)}>{o.countryName || o.routing?.locale}</span>
                    {currency && <span className={cx("lcl__meta", TEXT.label)}>{currency}</span>}
                  </span>
                  {on && <Icon name="check" size={16} className="lcl__check" />}
                </button>
              );
            })}
          </div>
        )}
        {languages.length > 1 && (
          <div className="lcl__group">
            {languageTitle && <p className={cx("lcl__title", TEXT.label)}>{languageTitle}</p>}
            {languages.map((l) => (
              <button
                key={l.id}
                type="button"
                className={cx("lcl__option", l.isSelected && "lcl__option--on")}
                aria-pressed={l.isSelected}
                onClick={() => (l.isSelected ? onClose() : setLanguage(baseStore, l))}
              >
                <span className="lcl__text">
                  <span className={cx("lcl__name", TEXT.ui)}>{cap(l.language)}</span>
                  {(l.currencyCode || l.currencySymbol) && (
                    <span className={cx("lcl__meta", TEXT.label)}>{[l.currencyCode, l.currencySymbol].filter(Boolean).join(" · ")}</span>
                  )}
                </span>
                {l.isSelected && <Icon name="check" size={16} className="lcl__check" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default LocaleSwitcher;
