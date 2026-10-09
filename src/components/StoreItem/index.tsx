import { useEffect, useRef, useState } from "preact/hooks";
import { IkasImage, createMediaSrcset, getDefaultSrc } from "@ikas/bp-storefront";
import ArrowLink from "../../sub-components/ArrowLink";
import Icon from "../../sub-components/Icon";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import { SCOPED_EVENT, emitScoped, onScoped } from "../../utils/ui";
import { Props } from "./types";

export type StoreStatusKind = "open" | "closed" | "note";

export interface StoreSelectDetail {
  el: Element;
  user: boolean;
  image?: IkasImage | null;
  name?: string;
  district?: string;
  address?: string;
  hours?: string;
  mapHref?: string;
  status: { kind: StoreStatusKind; text: string } | null;
}

/** "Her gün 10:00–21:00" → open/closed now (first time range found; overnight ranges supported). */
function isOpenNow(hours?: string): boolean | null {
  const m = hours?.match(/(\d{1,2})[:.](\d{2})\s*[–—-]\s*(\d{1,2})[:.](\d{2})/);
  if (!m) return null;
  const [o, c] = [+m[1] * 60 + +m[2], +m[3] * 60 + +m[4]];
  const d = new Date();
  const now = d.getHours() * 60 + d.getMinutes();
  return c > o ? now >= o && now < c : now >= o || now < c;
}

/**
 * Store child shared by StoreList (card: image 4:3, name, address, hours, ArrowLink — I-STOR-02) and
 * StoreLocator (row: name + district, address, computed status, arrow — I-LOC-01). Both markups are
 * rendered; the parent's CSS shows one. In a locator the row announces itself with SCOPED_EVENT.storeSelect
 * and the status ("storeStatus") is computed from `hours` on the client (statusNote overrides).
 */
export function StoreItem({
  image,
  name = "Kadıköy",
  district = "Moda",
  address = "Caferağa Mah. Moda Cad. No: 12, Kadıköy / İstanbul",
  hours = "10:00–21:00",
  statusNote,
  hoursLabel = "SAAT",
  mapLinkText = "Haritada aç",
  mapLink,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(false);
  const [status, setStatus] = useState<StoreSelectDetail["status"]>(null);
  const mapHref = mapLink?.href;

  const detail = (user: boolean, st = status): StoreSelectDetail | null =>
    rootRef.current ? { el: rootRef.current, user, image, name, district, address, hours, mapHref, status: st } : null;

  useEffect(() => {
    const el = rootRef.current;
    const scope = el?.closest<HTMLElement>('[data-scope="store-locator"]');
    if (!el || !scope) return;
    const note = statusNote?.trim();
    const open = note ? null : isOpenNow(hours);
    const st: StoreSelectDetail["status"] = note
      ? { kind: "note", text: note }
      : open === null
        ? null
        : open
          ? { kind: "open", text: scope.dataset.openText || "" }
          : { kind: "closed", text: scope.dataset.closedText || "" };
    setStatus(st);
    const off = onScoped<StoreSelectDetail>(scope, SCOPED_EVENT.storeSelect, (d) => setSelected(!!d && d.el === el));
    // The first store is the initial selection; a selected store re-announces itself when its props change.
    // Deferred so the section's listener (attached in its own effect) is in place.
    const t = setTimeout(() => {
      const isInitial = scope.querySelector(".sitem") === el && !scope.dataset.selected;
      if (isInitial || el.classList.contains("sitem--on")) {
        const d = detail(false, st);
        if (d) emitScoped(el, SCOPED_EVENT.storeSelect, d);
      }
    }, 0);
    return () => {
      clearTimeout(t);
      off();
    };
  }, [image, name, district, address, hours, statusNote, mapHref]);

  const select = () => {
    const d = detail(true);
    if (d) emitScoped(d.el, SCOPED_EVENT.storeSelect, d);
  };

  return (
    <div ref={rootRef} className={cx("sitem", selected && "sitem--on")}>
      {/* StoreList card */}
      <article className="sitem__card">
        <div className="sitem__media">
          {image && (
            <img
              className="sitem__img"
              src={getDefaultSrc(image)}
              srcSet={createMediaSrcset(image)}
              sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
              alt={image.altText ?? name ?? ""}
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        {name && <h3 className={cx("sitem__name", TEXT.h4)}>{name}</h3>}
        {address && <p className={cx("sitem__address", TEXT.body)}>{address}</p>}
        {hours && (
          <p className="sitem__hours">
            {hoursLabel && <span className={cx("sitem__hours-label", TEXT.label)}>{hoursLabel}</span>}
            <span className={cx("sitem__hours-value", TEXT.uiSm)}>{hours}</span>
          </p>
        )}
        {mapLinkText && mapHref && (
          <div className="sitem__link">
            {/* I-STOR-02 · M-10 via ArrowLink */}
            <ArrowLink label={mapLinkText} href={mapHref} external />
          </div>
        )}
      </article>

      {/* StoreLocator row — I-LOC-01 · M-28 */}
      <button type="button" className="sitem__row" aria-pressed={selected} onClick={select}>
        <span className="sitem__row-text">
          <span className="sitem__row-name">
            {name && <span className={cx("sitem__row-title", TEXT.h4)}>{name}</span>}
            {district && <span className={cx("sitem__row-district", TEXT.uiSm)}>{district}</span>}
          </span>
          {address && <span className={cx("sitem__row-address", TEXT.uiSm)}>{address}</span>}
        </span>
        {status && status.text && (
          <span className={cx("sitem__row-status", TEXT.uiSm, `sitem__row-status--${status.kind}`)}>{status.text}</span>
        )}
        <span className="sitem__row-arrow" aria-hidden="true">
          <Icon name="arrow-right" size={16} />
        </span>
      </button>
    </div>
  );
}

export default StoreItem;
