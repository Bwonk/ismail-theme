import {
  IkasDisplayedVariantType,
  IkasDisplayedVariantValue,
  IkasProduct,
  getDisplayedProductVariantTypes,
  isIkasVariantTypeColorSelection,
  selectVariantValue,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { cx } from "../../utils/cx";
import { TEXT, upperTr } from "../../utils/tokens";
import ArrowLink from "../ArrowLink";
import Icon from "../Icon";
import VariantChip from "../VariantChip";
import VariantSwatch from "../VariantSwatch";

export interface VariantPickerProps {
  product: IkasProduct;
  /** Don't push the selection into the URL (QuickBuy on listing pages). */
  disableRoute?: boolean;
  /**
   * Explicit-choice mode (QuickBuy "seçim eksik"): variant type ids the shopper has picked.
   * Types not in the set show no selection and no value in the label.
   */
  chosen?: Set<string>;
  /** Variant type id that is missing a choice → danger message under its row. */
  missingTypeId?: string | null;
  missingText?: string;
  /** "Beden rehberi" link next to the first text-type group label. */
  sizeGuideText?: string;
  sizeGuideHref?: string;
  /** Opens the size guide sheet; when set the link becomes a button (href is the fallback). */
  onSizeGuide?: () => void;
  onSelect?: (type: IkasDisplayedVariantType, value: IkasDisplayedVariantValue) => void;
  className?: string;
}

/**
 * Variant groups: colour types → VariantSwatch row, others → VariantChip row (I-CMP-10/14 · M-28).
 * Label "RENK · SİYAH" (mono). Out-of-stock values stay selectable (back-in-stock).
 */
const VariantPicker = observer(function VariantPicker({
  product,
  disableRoute,
  chosen,
  missingTypeId,
  missingText,
  sizeGuideText,
  sizeGuideHref,
  onSizeGuide,
  onSelect,
  className,
}: VariantPickerProps) {
  const types = getDisplayedProductVariantTypes(product).filter((t) => t.displayedVariantValues.length > 0);
  if (!types.length) return null;
  const firstTextType = types.find((t) => !isIkasVariantTypeColorSelection(t.variantType));

  return (
    <div className={cx("vpick", className)}>
      {types.map((dvt) => {
        const typeId = dvt.variantType.id;
        const isColor = isIkasVariantTypeColorSelection(dvt.variantType);
        const isChosen = !chosen || chosen.has(typeId);
        const selected = isChosen ? dvt.displayedVariantValues.find((v) => v.isSelected) : undefined;
        const label = upperTr(selected ? `${dvt.variantType.name} · ${selected.variantValue.name}` : dvt.variantType.name);
        const showGuide = !!sizeGuideText && (!!onSizeGuide || !!sizeGuideHref) && dvt === firstTextType;
        const missing = missingTypeId === typeId;
        const labelId = `vpick-${typeId}`;
        const pick = (dvv: IkasDisplayedVariantValue) => {
          selectVariantValue(product, dvv.variantValue, disableRoute);
          onSelect?.(dvt, dvv);
        };
        return (
          <div key={typeId} className={cx("vpick__group", missing && "vpick__group--missing")}>
            <div className="vpick__head">
              <span id={labelId} className={cx("vpick__label", TEXT.label)}>
                {label}
              </span>
              {showGuide &&
                (onSizeGuide ? (
                  <ArrowLink className="vpick__guide" size="uiSm" label={sizeGuideText!} onClick={() => onSizeGuide()} />
                ) : (
                  <ArrowLink className="vpick__guide" size="uiSm" label={sizeGuideText!} href={sizeGuideHref} />
                ))}
            </div>
            <div className={cx("vpick__row", isColor && "vpick__row--swatch")} role="radiogroup" aria-labelledby={labelId}>
              {dvt.displayedVariantValues.map((dvv) =>
                isColor ? (
                  <VariantSwatch
                    key={dvv.variantValue.id}
                    value={dvv}
                    role="radio"
                    selected={isChosen ? dvv.isSelected : false}
                    onSelect={() => pick(dvv)}
                  />
                ) : (
                  <VariantChip
                    key={dvv.variantValue.id}
                    value={dvv}
                    role="radio"
                    selected={isChosen ? dvv.isSelected : false}
                    onSelect={() => pick(dvv)}
                  />
                ),
              )}
            </div>
            {missing && missingText && (
              <p className={cx("vpick__error", TEXT.uiSm)} role="alert">
                <Icon name="alert" size={16} />
                {missingText}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
});

export default VariantPicker;
