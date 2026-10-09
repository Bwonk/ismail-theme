import { useId } from "preact/hooks";
import { normalizeSvg } from "@ikas/bp-storefront";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import { Props } from "./types";

/** I/Section/ProductDetail › pdp-highlight — 20px line icon + title (ui, 600) + muted text. */
export function ServiceHighlight({ icon, title = "Ücretsiz kargo", text = "1.500 TL üzeri siparişte" }: Props) {
  const uid = useId();
  const svg = icon ? normalizeSvg(icon, { idPrefix: `shl-${uid}` }) : "";
  if (!svg && !title && !text) return null;
  return (
    <div className="shl">
      {svg && <span className="shl__icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: svg }} />}
      <div className="shl__text">
        {title && <span className={cx("shl__title", TEXT.ui)}>{title}</span>}
        {text && <span className={cx("shl__desc", TEXT.uiSm)}>{text}</span>}
      </div>
    </div>
  );
}

export default ServiceHighlight;
