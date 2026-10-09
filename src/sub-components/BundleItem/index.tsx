import {
  IkasBundleProduct,
  createMediaSrcset,
  getBundleProductFormattedFinalPriceWithQuantity,
  getDefaultSrc,
  getProductHref,
  getProductVariantMainImage,
  getSelectedProductVariant,
  hasProductVariantStock,
  isBundleProductQuantityEditable,
  setBundleProductQuantity,
  shouldDisplayBundleProductPrice,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { cx } from "../../utils/cx";
import { TEXT, upperTr } from "../../utils/tokens";
import Icon from "../Icon";
import QuantitySelector from "../QuantitySelector";

export interface BundleItemTexts {
  /** "TÜKENDİ". */
  outOfStockText: string;
  /** "Sete dahil" — shown instead of a price when the item does not add to the set price. */
  includedText: string;
  decreaseAriaLabel: string;
  increaseAriaLabel: string;
}

interface Props extends BundleItemTexts {
  bundleProduct: IkasBundleProduct;
  /** Link the media/title to the product page (default true). */
  withLink?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * I/Sub/BundleItem — set contents row: 64×80 media, title, variant, and a 104px side column with
 * the stepper (or ×qty when adet sabit) over the price (+250 TL / Sete dahil). tükendi: muted
 * title, danger status, no side column.
 */
const BundleItem = observer(function BundleItem({
  bundleProduct,
  outOfStockText,
  includedText,
  decreaseAriaLabel,
  increaseAriaLabel,
  withLink = true,
  sizes = "64px",
  className,
}: Props) {
  const product = bundleProduct.product;
  if (!product) return null;

  const variant = getSelectedProductVariant(product);
  const inStock = variant ? (hasProductVariantStock(variant) as unknown as boolean) : false;
  const media = variant ? getProductVariantMainImage(variant)?.image ?? null : null;
  const href = withLink ? getProductHref(product) : undefined;
  const variantText = (variant?.variantValues ?? []).map((vv) => vv.name).join(" · ");
  const editable = isBundleProductQuantityEditable(bundleProduct);
  const showPrice = shouldDisplayBundleProductPrice(bundleProduct);

  const min = bundleProduct.minQuantity ?? 0;
  let max = bundleProduct.maxQuantity ?? undefined;
  if (variant && !variant.sellIfOutOfStock && typeof variant.stock === "number") {
    max = max == null ? variant.stock : Math.min(max, variant.stock);
  }

  const Title = href ? "a" : "span";

  return (
    <div className={cx("bitem", !inStock && "bitem--soldout", className)}>
      <a className="bitem__media" href={href} tabIndex={-1} aria-hidden="true">
        {media ? (
          <img
            className="bitem__img"
            src={getDefaultSrc(media)}
            srcSet={createMediaSrcset(media)}
            sizes={sizes}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <Icon name="mountain" size={20} className="bitem__placeholder" />
        )}
      </a>

      <div className="bitem__info">
        <Title className={cx("bitem__title", TEXT.title)} href={href}>
          {product.name}
        </Title>
        {variantText && <span className={cx("bitem__variant", TEXT.label)}>{upperTr(variantText)}</span>}
        {!inStock && <span className={cx("bitem__status", TEXT.label)}>{upperTr(outOfStockText)}</span>}
      </div>

      {/* bundle-side keeps its 104px column; tükendi hides the stepper and the price */}
      {!inStock && <div className="bitem__side" aria-hidden="true" />}
      {inStock && (
        <div className="bitem__side">
          {editable ? (
            <QuantitySelector
              value={bundleProduct.quantity}
              min={min}
              max={max}
              decreaseAriaLabel={decreaseAriaLabel}
              increaseAriaLabel={increaseAriaLabel}
              onChange={(q) => setBundleProductQuantity(bundleProduct, q)}
            />
          ) : (
            <span className={cx("bitem__qty-static", TEXT.label, "tabular")}>×{bundleProduct.quantity}</span>
          )}
          {showPrice ? (
            <span className={cx("bitem__price", TEXT.price, "tabular")}>
              +{getBundleProductFormattedFinalPriceWithQuantity(bundleProduct)}
            </span>
          ) : (
            includedText && <span className={cx("bitem__price bitem__price--included", TEXT.price)}>{includedText}</span>
          )}
        </div>
      )}
    </div>
  );
});

export default BundleItem;
