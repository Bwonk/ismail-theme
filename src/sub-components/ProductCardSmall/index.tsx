import {
  IkasProduct,
  createMediaSrcset,
  getDefaultSrc,
  getProductHref,
  getProductVariantFormattedFinalPrice,
  getProductVariantMainImage,
  getSelectedProductVariant,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";

interface Props {
  product: IkasProduct;
  /** md = 72×88 media (search, cart page, lists) · sm = 56×70 (CartDrawer recommendations). */
  size?: "md" | "sm";
  /** @deprecated No effect — the canvas card shows the final price only (kept for API compatibility). */
  showComparePrice?: boolean;
  sizes?: string;
  className?: string;
  /** e.g. close the search overlay / drawer before navigating. */
  onClick?: (e: MouseEvent) => void;
}

/** I/Sub/ProductCardSmall — horizontal media + name + final price (no compare price on canvas); I-CMP-03 (M-28): name muted → text on hover. */
const ProductCardSmall = observer(function ProductCardSmall({
  product,
  size = "md",
  sizes,
  className,
  onClick,
}: Props) {
  const variant = getSelectedProductVariant(product);
  const media = variant ? getProductVariantMainImage(variant)?.image ?? null : null;
  const price = variant ? getProductVariantFormattedFinalPrice(variant) : "";
  const href = getProductHref(product);

  return (
    <a className={cx("pcsm", `pcsm--${size}`, className)} href={href} onClick={onClick as any}>
      <span className="pcsm__media">
        {media && (
          <img
            className="pcsm__img"
            src={getDefaultSrc(media)}
            srcSet={createMediaSrcset(media)}
            sizes={sizes ?? (size === "sm" ? "56px" : "72px")}
            alt=""
            loading="lazy"
            decoding="async"
          />
        )}
      </span>
      <span className="pcsm__info">
        <span className={cx("pcsm__title", TEXT.title)}>{product.name}</span>
        <span className={cx("pcsm__price", TEXT.price, "tabular")}>{price}</span>
      </span>
    </a>
  );
});

export default ProductCardSmall;
