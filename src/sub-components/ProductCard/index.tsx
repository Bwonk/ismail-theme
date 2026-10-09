import { useState } from "preact/hooks";
import {
  IkasProduct,
  addSelectedtedVariantToCart,
  addIkasProductToFavorites,
  createMediaSrcset,
  customerStore,
  getDefaultSrc,
  getDisplayedProductVariantTypes,
  getProductHref,
  getProductVariantDiscountPercentage,
  getProductVariantFormattedFinalPrice,
  getProductVariantFormattedSellPrice,
  getSelectedProductVariant,
  hasCustomer,
  hasProductVariantDiscount,
  hasProductVariantStock,
  hasProductVariant,
  isAddToCartEnabled,
  isColorVariantValue,
  isFavoriteIkasProduct,
  removeIkasProductFromFavorites,
  Router,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import { UI_EVENT, emitUi } from "../../utils/ui";
import Badge from "../Badge";
import FavoriteButton from "../FavoriteButton";
import Icon from "../Icon";
import Spinner from "../Spinner";

export interface ProductCardTexts {
  addToCartAriaLabel: string;
  favoriteAriaLabel: string;
  soldOutText: string;
  newText?: string;
}

interface Props extends ProductCardTexts {
  product: IkasProduct;
  sizes?: string;
  priority?: boolean;
  showSwatches?: boolean;
  maxSwatches?: number;
  className?: string;
  onFavoriteRemove?: () => void;
}

/**
 * I/Sub/ProductCard — 4:5 media with front/back image (I-CMP-01, M-09), badges, favourite,
 * title/price/colour dots and a cart ring (I-CMP-02) that adds directly or opens QuickBuy.
 */
const ProductCard = observer(function ProductCard({
  product,
  addToCartAriaLabel,
  favoriteAriaLabel,
  soldOutText,
  newText,
  sizes = "(max-width: 767px) 50vw, (max-width: 1199px) 33vw, 25vw",
  priority = false,
  showSwatches = true,
  maxSwatches = 3,
  className,
  onFavoriteRemove,
}: Props) {
  const [adding, setAdding] = useState(false);
  const variant = getSelectedProductVariant(product);
  const images = variant?.images ? [...variant.images].sort((a, b) => a.order - b.order) : [];
  const front = images[0]?.image ?? null;
  const back = images[1]?.image ?? null;
  const inStock = variant ? (hasProductVariantStock(variant) as unknown as boolean) : false;
  const hasDiscount = variant ? (hasProductVariantDiscount(variant) as unknown as boolean) : false;
  const discount = hasDiscount && variant ? (getProductVariantDiscountPercentage(variant) as unknown as number) : 0;
  const price = variant ? (getProductVariantFormattedFinalPrice(variant) as unknown as string) : "";
  const comparePrice = hasDiscount && variant ? (getProductVariantFormattedSellPrice(variant) as unknown as string) : "";
  const href = getProductHref(product);
  const isFavorite = isFavoriteIkasProduct(product);
  const tagName = product.tags?.[0]?.name;

  const colorType = getDisplayedProductVariantTypes(product).find((vt) =>
    vt.displayedVariantValues.some((dvv) => isColorVariantValue(dvv.variantValue)),
  );
  const swatches = colorType?.displayedVariantValues ?? [];

  const onFavorite = async () => {
    if (!hasCustomer(customerStore)) {
      Router.navigateToPage("LOGIN");
      return;
    }
    if (isFavorite) {
      await removeIkasProductFromFavorites(product);
      onFavoriteRemove?.();
    } else {
      await addIkasProductToFavorites(product);
    }
  };

  const onCart = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (adding || !inStock) return;
    const needsChoice = hasProductVariant(product) || !!product.productOptionSetId || !!variant?.bundleSettings;
    if (needsChoice || !isAddToCartEnabled(product)) {
      emitUi(UI_EVENT.openQuickBuy, { product });
      return;
    }
    setAdding(true);
    try {
      const result = await addSelectedtedVariantToCart(product, 1);
      if (result?.success) emitUi(UI_EVENT.openCart);
      else emitUi(UI_EVENT.openQuickBuy, { product });
    } finally {
      setAdding(false);
    }
  };

  let badge: { text: string; tone: "default" | "new" | "sale" | "soldout" } | null = null;
  if (!inStock) badge = { text: soldOutText, tone: "soldout" };
  else if (hasDiscount && discount) badge = { text: `%${Math.round(discount)}`, tone: "sale" };
  else if (newText) badge = { text: newText, tone: "new" };
  else if (tagName) badge = { text: tagName, tone: "default" };

  return (
    <article className={cx("pcard", !inStock && "pcard--soldout", back && "pcard--has-back", className)}>
      <a className="pcard__media" href={href} aria-label={product.name}>
        {front && (
          <>
            {back && !back.isVideo && (
              <img
                className="pcard__img pcard__img--back"
                src={getDefaultSrc(back)}
                srcSet={createMediaSrcset(back)}
                sizes={sizes}
                alt=""
                loading="lazy"
                decoding="async"
              />
            )}
            <img
              className="pcard__img pcard__img--front"
              src={getDefaultSrc(front)}
              srcSet={createMediaSrcset(front)}
              sizes={sizes}
              alt={product.name}
              loading={priority ? "eager" : "lazy"}
              decoding={priority ? "sync" : "async"}
            />
          </>
        )}
      </a>
      {badge && (
        <div className="pcard__badges">
          <Badge text={badge.text} tone={badge.tone} />
        </div>
      )}
      <FavoriteButton className="pcard__fav" active={isFavorite} ariaLabel={favoriteAriaLabel} onToggle={onFavorite} />
      <div className="pcard__info">
        <div className="pcard__text">
          <a className={cx("pcard__title", TEXT.title)} href={href}>
            {product.name}
          </a>
          <div className="pcard__prices">
            <span className={cx("pcard__price", TEXT.price, "tabular")}>{price}</span>
            {comparePrice && <s className={cx("pcard__compare", TEXT.price, "tabular")}>{comparePrice}</s>}
          </div>
          {showSwatches && swatches.length > 1 && (
            <div className="pcard__swatches" aria-hidden="true">
              {swatches.slice(0, maxSwatches).map((dvv) => (
                <span
                  key={dvv.variantValue.id}
                  className="pcard__swatch"
                  style={{ background: dvv.variantValue.colorCode ?? undefined }}
                />
              ))}
              {swatches.length > maxSwatches && (
                <span className={cx("pcard__swatch-more", TEXT.badge, "tabular")}>+{swatches.length - maxSwatches}</span>
              )}
            </div>
          )}
        </div>
        <button
          type="button"
          className="pcard__cart"
          aria-label={addToCartAriaLabel}
          onClick={onCart as any}
          disabled={!inStock}
          aria-busy={adding}
        >
          {adding ? <Spinner size={14} /> : <Icon name="bag" size={16} />}
        </button>
      </div>
    </article>
  );
});

export default ProductCard;
