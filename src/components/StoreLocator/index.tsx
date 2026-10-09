import { useEffect, useRef, useState } from "preact/hooks";
import { IkasComponentRenderer, createMediaSrcset, getDefaultSrc } from "@ikas/bp-storefront";
import Button from "../../sub-components/Button";
import Icon from "../../sub-components/Icon";
import Skeleton from "../../sub-components/Skeleton";
import { cx } from "../../utils/cx";
import { BREAKPOINT, TEXT } from "../../utils/tokens";
import { SCOPED_EVENT, onScoped } from "../../utils/ui";
import type { StoreSelectDetail } from "../StoreItem";
import { Props } from "./types";

const toList = (v: any) => (Array.isArray(v) ? v : v ? [v] : []).flat().filter(Boolean);

/**
 * I/Section/StoreLocator — heading row + featured store (image + info card) beside the StoreItem rows.
 * Children are opaque, so the selected StoreItem sends its data with SCOPED_EVENT.storeSelect; the first
 * row is selected initially. I-LOC-01 (rows, StoreItem CSS) · I-LOC-02 (feature image fades on change).
 */
export function StoreLocator(props: Props) {
  const {
    title = "Mağazalarımızı ziyaret et",
    text = "Tüm koleksiyonu dene, bedenini ekibimizle birlikte bul.",
    allStoresText = "Tüm mağazalar",
    allStoresLink,
    directionsText = "Yol tarifi al",
    openNowText = "Şu an açık",
    closedText = "Şu an kapalı",
    stores,
    backgroundColor,
  } = props;
  const rowsRef = useRef<HTMLDivElement>(null);
  const featureRef = useRef<HTMLDivElement>(null);
  const [store, setStore] = useState<StoreSelectDetail | null>(null);
  const [version, setVersion] = useState(0);
  const storeRef = useRef<StoreSelectDetail | null>(null);
  const list = toList(stores);

  useEffect(() => {
    const scope = rowsRef.current;
    if (!scope) return;
    return onScoped<StoreSelectDetail>(scope, SCOPED_EVENT.storeSelect, (d) => {
      if (!d) return;
      if (d.user) scope.dataset.selected = "1";
      const prev = storeRef.current;
      if (!prev || prev.el !== d.el || prev.image?.id !== d.image?.id) setVersion((v) => v + 1);
      storeRef.current = d;
      setStore(d);
      if (d.user && window.innerWidth <= BREAKPOINT.tablet) {
        featureRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }, []);

  const name = store ? [store.name, store.district].filter(Boolean).join(" · ") : "";
  const status = store?.status;

  return (
    <section className="sloc" style={backgroundColor ? { backgroundColor } : undefined}>
      <div className="sloc__head">
        <div className="sloc__head-text">
          {title && <h2 className={cx("sloc__title", TEXT.h2)}>{title}</h2>}
          {text && <p className={cx("sloc__text", TEXT.body)}>{text}</p>}
        </div>
        {allStoresText && allStoresLink?.href && (
          <Button label={allStoresText} href={allStoresLink.href} variant="outline" size="sm" className="sloc__all" />
        )}
      </div>

      {list.length > 0 && (
        <div className="sloc__body">
          {/* I-LOC-02 · M-02: selected store image fades in (0.5s) */}
          <div ref={featureRef} className="sloc__feature" aria-live="polite">
            <div className="sloc__media">
              {store?.image ? (
                <img
                  key={version}
                  className="sloc__img"
                  src={getDefaultSrc(store.image)}
                  srcSet={createMediaSrcset(store.image)}
                  sizes="(max-width: 991px) 100vw, 64vw"
                  alt={store.image.altText ?? name}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                !store && <Skeleton height="100%" className="sloc__skel" />
              )}
            </div>
            {store && (
              <div key={`card-${version}`} className="sloc__card">
                <div className="sloc__card-head">
                  {name && <h3 className={cx("sloc__card-name", TEXT.h4)}>{name}</h3>}
                  {status?.text && (
                    <span className={cx("sloc__pill", `sloc__pill--${status.kind}`)}>
                      <span className="sloc__pill-dot" aria-hidden="true" />
                      <span className={TEXT.badge}>{status.kind === "open" ? openNowText : status.kind === "closed" ? closedText : status.text}</span>
                    </span>
                  )}
                </div>
                {store.address && (
                  <p className="sloc__line">
                    <Icon name="map-pin" size={14} className="sloc__line-icon" />
                    <span className={TEXT.uiSm}>{store.address}</span>
                  </p>
                )}
                {store.hours && (
                  <p className="sloc__line">
                    <Icon name="clock" size={14} className="sloc__line-icon" />
                    <span className={TEXT.uiSm}>{store.hours}</span>
                  </p>
                )}
                {directionsText && store.mapHref && (
                  <div className="sloc__actions">
                    <Button label={directionsText} href={store.mapHref} size="sm" />
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            ref={rowsRef}
            className="sloc__rows"
            data-scope="store-locator"
            data-open-text={openNowText}
            data-closed-text={closedText}
          >
            <IkasComponentRenderer id="store-locator-rows" components={list} parentProps={props} />
          </div>
        </div>
      )}
    </section>
  );
}

export default StoreLocator;
