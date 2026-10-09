import { useState } from "preact/hooks";
import {
  IkasOrderLineItem,
  IkasOrderLineItemOption,
  cartStore,
  changeCartItemQuantity,
  createMediaSrcset,
  editOrderLineItem,
  getDefaultSrc,
  getIkasOrderLineVariantHref,
  getIkasOrderLineVariantMainImage,
  getOrderLineItemFormattedFinalPriceWithQuantity,
  getOrderLineItemFormattedOverridenPriceWithQuantity,
  getOrderLineItemOptionValueFormattedPrice,
  getOrderLineItemOverridenPriceWithQuantity,
  hasOrderLineItemDiscount,
  isOrderLineItemAutoCreated,
  removeItem,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { cx } from "../../utils/cx";
import { TEXT, upperTr } from "../../utils/tokens";
import { useCartLineLimits } from "../../utils/cartLineLimits";
import Badge from "../Badge";
import Icon from "../Icon";
import QuantitySelector from "../QuantitySelector";
import Spinner from "../Spinner";

export interface CartLineItemTexts {
  /** "Düzenle" — personalised line → editOrderLineItem. */
  editText: string;
  /** "Kaldır". */
  removeText: string;
  /** "En fazla 2 adet alabilirsin." — `{max}` is replaced with the limit when present. */
  maxQuantityText: string;
  /** "HEDİYE" — badge on campaign-created (gift) lines. */
  giftText: string;
  decreaseAriaLabel: string;
  increaseAriaLabel: string;
  /** Optional "{count} PARÇA" under the title of a set line (no variant values). */
  bundlePartsText?: string;
}

interface Props extends CartLineItemTexts {
  item: IkasOrderLineItem;
  sizes?: string;
  className?: string;
  /** Called after a quantity change / removal resolves (success flag from the cart API). */
  onUpdated?: (success: boolean) => void;
}

const fill = (tpl: string, key: string, value: string | number) => tpl.split(`{${key}}`).join(String(value));

/** One personalisation option: `.values` is an ARRAY (multi-select / checkbox / file). */
function OptionLine({ item, option }: { item: IkasOrderLineItem; option: IkasOrderLineItemOption }) {
  const type = option.type as string;
  const values = option.values ?? [];
  const prices = values
    .filter((v) => (v.price ?? 0) > 0)
    .map((v) => getOrderLineItemOptionValueFormattedPrice(item, v))
    .filter(Boolean);
  const priceText = prices.length ? ` · +${prices.join(" + ")}` : "";
  return (
    <span className={cx("cline__option", TEXT.label)}>
      {upperTr(option.name)}
      {type === "CHECKBOX" ? null : type === "COLOR_PICKER" ? (
        <>
          {": "}
          {values.map((v, i) => (
            <span key={i} className="cline__option-color" style={{ backgroundColor: v.value }} aria-label={v.name || v.value} />
          ))}
        </>
      ) : type === "FILE" ? (
        <>
          {": "}
          {values.map((v, i) => (
            <a key={i} className="cline__option-file" href={v.value} target="_blank" rel="noopener noreferrer">
              {v.name || decodeURIComponent(v.value.split("/").pop() || v.value)}
            </a>
          ))}
        </>
      ) : (
        `: ${values.map((v) => upperTr(v.name || v.value)).join(", ")}`
      )}
      {priceText}
    </span>
  );
}

/**
 * I/Sub/CartLineItem — 88×110 media + title, variant, options / set contents, stepper and price.
 * States: indirimli (overridden price struck), güncelleniyor (dimmed + spinner while the cart call
 * runs), hediye (campaign line: badge, static ×qty, no remove), adet sınırı (plus inactive +
 * danger message), set (bundle contents), kişiselleştirilmiş (options + edit link).
 * Same frame in CartDrawer and CartPage (both use the instance at fill width).
 */
const CartLineItem = observer(function CartLineItem({
  item,
  editText,
  removeText,
  maxQuantityText,
  giftText,
  decreaseAriaLabel,
  increaseAriaLabel,
  bundlePartsText,
  sizes = "88px",
  className,
  onUpdated,
}: Props) {
  const [busy, setBusy] = useState(false);
  const cart = cartStore.cart;
  const variant = item.variant;
  const limits = useCartLineLimits(variant?.productId, variant?.id);

  const isGift = !!cart && isOrderLineItemAutoCreated(cart, item);
  const image = variant ? getIkasOrderLineVariantMainImage(variant) : null;
  const href = variant ? getIkasOrderLineVariantHref(variant) : undefined;
  const price = getOrderLineItemFormattedFinalPriceWithQuantity(item);
  const overridden = getOrderLineItemOverridenPriceWithQuantity(item);
  const hasDiscount = hasOrderLineItemDiscount(item) || !!overridden;
  const comparePrice = hasDiscount ? getOrderLineItemFormattedOverridenPriceWithQuantity(item) : "";

  const variantValues = [...(variant?.variantValues ?? [])].sort((a, b) => a.order - b.order);
  const bundleProducts = (variant?.bundleProducts ?? []).filter((bp) => !bp.deleted && bp.quantity > 0);
  const options = (item.options ?? []).filter((o) => o.values?.length);
  let variantText = variantValues.map((vv) => vv.variantValueName).filter(Boolean).join(" · ");
  if (!variantText && bundleProducts.length && bundlePartsText) variantText = fill(bundlePartsText, "count", bundleProducts.length);

  const max = limits?.max;
  const atMax = !isGift && max != null && item.quantity >= max;

  const run = async (task: () => Promise<{ success: boolean } | undefined | null>) => {
    if (busy) return;
    setBusy(true);
    try {
      const res = await task();
      onUpdated?.(!!res?.success);
    } finally {
      setBusy(false);
    }
  };

  const onQuantity = (qty: number) => {
    if (!cart) return;
    run(() => changeCartItemQuantity(cart, item, qty) as any);
  };
  const onRemove = () => run(() => removeItem(item) as any);

  return (
    <div className={cx("cline", busy && "cline--busy", isGift && "cline--gift", className)} aria-busy={busy}>
      <a className="cline__media cline__dim" href={href} tabIndex={-1} aria-hidden="true">
        {image ? (
          image.isVideo ? (
            <video className="cline__img" src={getDefaultSrc(image)} muted loop autoPlay playsInline />
          ) : (
            <img
              className="cline__img"
              src={getDefaultSrc(image)}
              srcSet={createMediaSrcset(image)}
              sizes={sizes}
              alt=""
              loading="lazy"
              decoding="async"
            />
          )
        ) : (
          <Icon name="mountain" size={24} className="cline__placeholder" />
        )}
      </a>

      <div className="cline__info">
        <div className="cline__head cline__dim">
          <a className={cx("cline__title", TEXT.title)} href={href}>
            {variant?.name}
          </a>
          {isGift && giftText && <Badge text={giftText} tone="sale" className="cline__badge" />}
          {variantText && <span className={cx("cline__variant", TEXT.label)}>{upperTr(variantText)}</span>}

          {options.length > 0 && (
            <div className="cline__options">
              {options.map((option) => (
                <OptionLine key={option.productOptionId} item={item} option={option} />
              ))}
              {!isGift && editText && (
                <button type="button" className={cx("cline__edit", TEXT.uiSm)} onClick={() => editOrderLineItem(item)}>
                  {editText}
                </button>
              )}
            </div>
          )}

          {bundleProducts.length > 0 && (
            <ul className="cline__bundle">
              {bundleProducts.map((bp) => {
                const values = (bp.variant?.variantValues ?? [])
                  .map((vv) => vv.variantValueName)
                  .filter(Boolean)
                  .join(" · ");
                return (
                  <li key={bp.id} className={cx("cline__bundle-item", TEXT.label, "tabular")}>
                    {`${bp.quantity} × ${bp.variant?.name ?? ""}${values ? ` · ${values}` : ""}`}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="cline__row">
          {isGift ? (
            <span className={cx("cline__qty-static cline__dim", TEXT.label, "tabular")}>×{item.quantity}</span>
          ) : (
            <QuantitySelector
              className="cline__dim"
              value={item.quantity}
              min={limits?.min ?? 1}
              max={max}
              disabled={busy}
              decreaseAriaLabel={decreaseAriaLabel}
              increaseAriaLabel={increaseAriaLabel}
              onChange={onQuantity}
            />
          )}
          <div className="cline__prices">
            <Spinner size={16} className="cline__spinner" />
            {comparePrice && <s className={cx("cline__compare cline__dim", TEXT.price, "tabular")}>{comparePrice}</s>}
            <span className={cx("cline__price cline__dim", TEXT.price, "tabular")}>{price}</span>
          </div>
        </div>

        {atMax && maxQuantityText && (
          <p className={cx("cline__limit", TEXT.uiSm)} role="status">
            {fill(maxQuantityText, "max", max as number)}
          </p>
        )}

        {!isGift && removeText && (
          <button type="button" className={cx("cline__remove cline__dim", TEXT.uiSm)} onClick={onRemove} disabled={busy}>
            {removeText}
          </button>
        )}
      </div>
    </div>
  );
});

export default CartLineItem;
