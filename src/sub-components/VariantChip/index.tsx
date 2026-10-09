import { IkasDisplayedVariantValue } from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";

export interface VariantChipProps {
  /** Displayed variant value (label/selected/stock are read from it); plain props override. */
  value?: IkasDisplayedVariantValue;
  label?: string;
  selected?: boolean;
  /** stok yok — stays clickable (e.g. back-in-stock), drawn inactive. */
  soldOut?: boolean;
  disabled?: boolean;
  href?: string;
  ariaLabel?: string;
  role?: "radio" | "button";
  className?: string;
  onSelect?: (value?: IkasDisplayedVariantValue) => void;
}

/** I/Sub/VariantChip — 40px text chip. seçili (inverse fill), hover (I-CMP-10 · M-28), stok yok. */
const VariantChip = observer(function VariantChip({
  value,
  label,
  selected,
  soldOut,
  disabled,
  href,
  ariaLabel,
  role = "button",
  className,
  onSelect,
}: VariantChipProps) {
  const text = label ?? value?.variantValue.name ?? "";
  const isSelected = selected ?? value?.isSelected ?? false;
  const isSoldOut = soldOut ?? (value ? !value.hasStock : false);
  const classes = cx("vchip", isSelected && "vchip--selected", isSoldOut && "vchip--soldout", className);
  const inner = <span className={cx("vchip__label", TEXT.price, "tabular")}>{text}</span>;
  const state = role === "radio" ? { role: "radio", "aria-checked": isSelected } : { "aria-pressed": isSelected };

  if (href && !disabled) {
    return (
      <a
        className={classes}
        href={href}
        aria-label={ariaLabel}
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
    <button type="button" className={classes} aria-label={ariaLabel} disabled={disabled} onClick={() => onSelect?.(value)} {...(state as any)}>
      {inner}
    </button>
  );
});

export default VariantChip;
