import {
  IkasDisplayedVariantValue,
  IkasImage,
  getIkasVariantValueThumbnailImage,
  getThumbnailSrc,
  isImageVariantValue,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { cx } from "../../utils/cx";

export interface VariantSwatchProps {
  /** Displayed variant value (colour / thumbnail / selected / stock are read from it); plain props override. */
  value?: IkasDisplayedVariantValue;
  /** Accessible name (defaults to the variant value name). */
  label?: string;
  color?: string | null;
  image?: IkasImage | null;
  selected?: boolean;
  /** stok yok — fill drops to inactive opacity and a diagonal strike is drawn. */
  soldOut?: boolean;
  disabled?: boolean;
  href?: string;
  role?: "radio" | "button";
  className?: string;
  onSelect?: (value?: IkasDisplayedVariantValue) => void;
}

/** I/Sub/VariantSwatch — 32px ring around a 24px colour/image dot. seçili, hover (I-CMP-14 · M-28), stok yok. */
const VariantSwatch = observer(function VariantSwatch({
  value,
  label,
  color,
  image,
  selected,
  soldOut,
  disabled,
  href,
  role = "button",
  className,
  onSelect,
}: VariantSwatchProps) {
  const vv = value?.variantValue;
  const name = label ?? vv?.name ?? "";
  const img = image !== undefined ? image : vv && isImageVariantValue(vv) ? getIkasVariantValueThumbnailImage(vv) ?? null : null;
  const fill = color !== undefined ? color : vv?.colorCode ?? null;
  const isSelected = selected ?? value?.isSelected ?? false;
  const isSoldOut = soldOut ?? (value ? !value.hasStock : false);
  const classes = cx("vswatch", isSelected && "vswatch--selected", isSoldOut && "vswatch--soldout", className);
  const inner = (
    <>
      <span className="vswatch__fill" style={!img && fill ? { background: fill } : undefined} aria-hidden="true">
        {img && <img className="vswatch__img" src={getThumbnailSrc(img)} alt="" loading="lazy" decoding="async" />}
      </span>
      {isSoldOut && <span className="vswatch__strike" aria-hidden="true" />}
    </>
  );
  const state = role === "radio" ? { role: "radio", "aria-checked": isSelected } : { "aria-pressed": isSelected };

  if (href && !disabled) {
    return (
      <a
        className={classes}
        href={href}
        aria-label={name}
        title={name}
        aria-current={isSelected ? "true" : undefined}
        onClick={(e) => {
          if (!onSelect) return;
          e.preventDefault();
          onSelect(value);
        }}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={classes} aria-label={name} title={name} disabled={disabled} onClick={() => onSelect?.(value)} {...(state as any)}>
      {inner}
    </button>
  );
});

export default VariantSwatch;
