import {
  IkasProductOffer,
  acceptProductOffer,
  createMediaSrcset,
  getDefaultSrc,
  getProductHref,
  getProductVariantDiscountPercentage,
  getProductVariantFormattedFinalPrice,
  getProductVariantFormattedSellPrice,
  getProductVariantMainImage,
  getSelectedProductVariant,
  hasProductVariantDiscount,
  hasProductVariantStock,
  isAcceptedProductOffer,
  rejectProductOffer,
  selectVariantValue,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { cx } from "../../utils/cx";
import { TEXT, upperTr } from "../../utils/tokens";
import Badge from "../Badge";
import Icon from "../Icon";

export interface OfferCardTexts {
  /** "SEPETTE" — offer already accepted in the cart. */
  offerInCartText: string;
  /** "TÜKENDİ" — selected variant has no stock. */
  soldOutText: string;
  /** aria-label of the variant select (e.g. "Seçenek"). */
  variantAriaLabel?: string;
}

interface Props extends OfferCardTexts {
  offer: IkasProductOffer;
  sizes?: string;
  className?: string;
}

/**
 * I/Sub/OfferCard — "birlikte al" row: checkbox, 64×80 media, title + discount badge, variant
 * select pill, prices. States: seçili (dark border + filled box), sepette (surface + SEPETTE),
 * tükendi (surface, muted, TÜKENDİ). I-CMP-13 · M-28: border and box darken on select.
 */
const OfferCard = observer(function OfferCard({
  offer,
  offerInCartText,
  soldOutText,
  variantAriaLabel,
  sizes = "64px",
  className,
}: Props) {
  const product = offer.product;
  if (!product) return null;

  const variant = getSelectedProductVariant(product);
  const inStock = variant ? (hasProductVariantStock(variant) as unknown as boolean) : false;
  const inCart = isAcceptedProductOffer(offer);
  const selected = !!offer.isSelected && !inCart && inStock;
  const media = variant ? getProductVariantMainImage(variant)?.image ?? null : null;
  const hasDiscount = variant ? (hasProductVariantDiscount(variant) as unknown as boolean) : false;
  const discount = hasDiscount && variant ? Math.round(Number(getProductVariantDiscountPercentage(variant))) : 0;
  const price = variant ? getProductVariantFormattedFinalPrice(variant) : "";
  const comparePrice = hasDiscount && variant ? getProductVariantFormattedSellPrice(variant) : "";
  const href = getProductHref(product);

  const variants = (product.variants ?? []).filter((v) => v.isActive !== false && v.variantValues?.length);
  const labelOf = (v: (typeof variants)[number]) => v.variantValues.map((vv) => vv.name).join(" · ");
  const locked = inCart;
  const interactive = !locked && inStock;

  const toggle = () => {
    if (!interactive) return;
    if (offer.isSelected) rejectProductOffer(offer);
    else acceptProductOffer(offer);
  };

  const onCardClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("a, select, button")) return;
    toggle();
  };

  const onVariant = (e: Event) => {
    const id = (e.currentTarget as HTMLSelectElement).value;
    const next = variants.find((v) => v.id === id);
    next?.variantValues.forEach((vv) => selectVariantValue(product, vv, true));
  };

  const status = inCart
    ? { icon: "check" as const, text: offerInCartText, tone: "in-cart" }
    : !inStock
      ? { icon: "circle-slash" as const, text: soldOutText, tone: "soldout" }
      : null;

  return (
    <div
      className={cx(
        "ocard",
        selected && "ocard--selected",
        inCart && "ocard--in-cart",
        !inStock && !inCart && "ocard--soldout",
        interactive && "ocard--interactive",
        className,
      )}
      onClick={onCardClick as any}
    >
      <button
        type="button"
        role="checkbox"
        className="ocard__toggle"
        aria-checked={selected || inCart}
        aria-disabled={!interactive}
        aria-label={product.name}
        onClick={toggle}
      >
        <Icon name="check" size={14} strokeWidth={2} className="ocard__check" />
      </button>

      <a className="ocard__media" href={href} tabIndex={-1} aria-hidden="true">
        {media ? (
          <img
            className="ocard__img"
            src={getDefaultSrc(media)}
            srcSet={createMediaSrcset(media)}
            sizes={sizes}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ) : (
          <Icon name="mountain" size={20} className="ocard__placeholder" />
        )}
      </a>

      <div className="ocard__info">
        <div className="ocard__head">
          <a className={cx("ocard__title", TEXT.title)} href={href}>
            {product.name}
          </a>
          {discount > 0 && inStock && <Badge text={`%${discount}`} tone="sale" className="ocard__badge" />}
        </div>

        {variants.length > 1 && variant && (
          <label className={cx("ocard__variant", locked && "ocard__variant--locked")}>
            <span className={cx("ocard__variant-text", TEXT.uiSm)}>{labelOf(variant as any)}</span>
            <Icon name="chevron-down" size={14} className="ocard__variant-icon" />
            <select
              className="ocard__select"
              value={variant.id}
              disabled={locked}
              aria-label={variantAriaLabel}
              onChange={onVariant as any}
            >
              {variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {labelOf(v)}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className="ocard__prices">
          <span className={cx("ocard__price", TEXT.price, "tabular")}>{price}</span>
          {comparePrice && <s className={cx("ocard__compare", TEXT.price, "tabular")}>{comparePrice}</s>}
          {status && (
            <span className={cx("ocard__status", `ocard__status--${status.tone}`, TEXT.label)}>
              <Icon name={status.icon} size={12} strokeWidth={2} />
              {upperTr(status.text)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

export default OfferCard;
