import { useRef, useState } from "preact/hooks";
import {
  IkasProductList,
  Router,
  cartStore,
  getCheckoutUrlFromCartStore,
  getIkasOrderDisplayedAdjustments,
  getIkasOrderFormattedTotalFinalPrice,
  getIkasOrderTotalItemCount,
  getOrderAdjustmentDisplayName,
  getOrderAdjustmentFormattedAmount,
  hasCart,
  removeCouponCode,
  saveCouponCode,
  withRoutePrefix,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { cx } from "../../utils/cx";
import { useEscape, useScrollLock } from "../../utils/hooks";
import { fillText, useFocusTrap, usePresence } from "../../utils/overlay";
import { TEXT } from "../../utils/tokens";
import ArrowLink from "../ArrowLink";
import Button from "../Button";
import CartLineItem, { type CartLineItemTexts } from "../CartLineItem";
import FormField from "../FormField";
import Icon from "../Icon";
import IconButton from "../IconButton";
import ProductCardSmall from "../ProductCardSmall";
import Skeleton from "../Skeleton";

export interface CartDrawerTexts extends CartLineItemTexts {
  cartTitleText: string;
  closeAriaLabel: string;
  cartEmptyTitle: string;
  cartEmptyText: string;
  cartEmptyButtonText: string;
  drawerRecommendTitle: string;
  couponToggleText: string;
  couponPlaceholder: string;
  couponButtonText: string;
  couponErrorText: string;
  couponAppliedText: string;
  couponRemoveText: string;
  cartSubtotalLabel: string;
  cartShippingNote: string;
  checkoutButtonText: string;
  checkoutLoadingText: string;
  cartViewButtonText: string;
}

interface Props extends CartDrawerTexts {
  open: boolean;
  onClose: () => void;
  recommendProducts?: IkasProductList | null;
}

/** Coupon toggle → FormField + apply; applied code row with remove. */
const Coupon = observer(function Coupon(t: {
  couponToggleText: string;
  couponPlaceholder: string;
  couponButtonText: string;
  couponErrorText: string;
  couponAppliedText: string;
  couponRemoveText: string;
}) {
  const cart = cartStore.cart;
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  if (!cart) return null;
  const applied = cart.couponCode;

  const apply = async () => {
    const value = code.trim();
    if (!value || busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await saveCouponCode(cart, value);
      if (res?.success && cartStore.cart?.couponCode) {
        setCode("");
        setOpen(false);
      } else setError(t.couponErrorText);
    } catch {
      setError(t.couponErrorText);
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await removeCouponCode(cart);
    } finally {
      setBusy(false);
    }
  };

  if (applied) {
    return (
      <div className="cdrw__coupon-applied">
        <span className={cx("cdrw__coupon-code", TEXT.uiSm)}>
          <Icon name="tag" size={14} />
          {fillText(t.couponAppliedText, { code: applied })}
        </span>
        <button type="button" className={cx("cdrw__text-btn", TEXT.uiSm)} onClick={remove} disabled={busy}>
          {t.couponRemoveText}
        </button>
      </div>
    );
  }

  return (
    <div className="cdrw__coupon">
      <button type="button" className="cdrw__coupon-toggle" aria-expanded={open} aria-controls="cdrw-coupon" onClick={() => setOpen(!open)}>
        <span className={TEXT.uiSm}>{t.couponToggleText}</span>
        <Icon name={open ? "minus" : "plus"} size={16} />
      </button>
      <div id="cdrw-coupon" className={cx("cdrw__coupon-body", open && "is-open")}>
        <form
          className="cdrw__coupon-form"
          onSubmit={(e) => {
            e.preventDefault();
            apply();
          }}
        >
          <FormField
            className="cdrw__coupon-field"
            name="couponCode"
            ariaLabel={t.couponPlaceholder}
            placeholder={t.couponPlaceholder}
            value={code}
            error={error || undefined}
            disabled={!open}
            autoComplete="off"
            onInput={(v) => {
              setCode(v);
              if (error) setError("");
            }}
          />
          <Button label={t.couponButtonText} size="sm" variant="outline" type="submit" state={busy ? "loading" : "idle"} disabled={!open || !code.trim()} />
        </form>
      </div>
    </div>
  );
});

/**
 * I/Overlay/CartDrawer — right drawer 440 (full width on mobile).
 * States: dolu (lines + recommendations + footer) · yükleniyor (skeleton lines while the cart
 * loads; line updates dim via CartLineItem) · boş (icon, text, button; footer hidden).
 * I-CART-01 (M-20) drawer slides in, scrim fades, rows stagger · I-CART-02 lines enter ·
 * I-CART-03 via Button · I-CART-04 via ArrowLink.
 */
const CartDrawer = observer(function CartDrawer({ open, onClose, recommendProducts, ...t }: Props) {
  const { mounted, shown } = usePresence(open, 500);
  const panelRef = useRef<HTMLDivElement>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  useScrollLock(open);
  useEscape(open, onClose);
  useFocusTrap(panelRef, open && mounted);
  if (!mounted) return null;

  const cart = cartStore.cart;
  const loading = !cart && (cartStore.isCartLoading || !cartStore.isCartInitialLoadFinished);
  const filled = hasCart(cartStore) && !!cart;
  const count = cart ? getIkasOrderTotalItemCount(cart) : 0;
  const lines = cart?.orderLineItems?.filter((l) => !l.deleted && l.quantity > 0) ?? [];
  const adjustments = cart ? getIkasOrderDisplayedAdjustments(cart) ?? [] : [];
  const inCart = new Set(lines.map((l) => l.variant?.productId));
  const recommended = (recommendProducts?.data ?? []).filter((p) => !inCart.has(p.id)).slice(0, 2);

  const lineTexts: CartLineItemTexts = {
    editText: t.editText,
    removeText: t.removeText,
    maxQuantityText: t.maxQuantityText,
    giftText: t.giftText,
    decreaseAriaLabel: t.decreaseAriaLabel,
    increaseAriaLabel: t.increaseAriaLabel,
    bundlePartsText: t.bundlePartsText,
  };

  const checkout = () => {
    const url = getCheckoutUrlFromCartStore(cartStore);
    if (!url) return;
    setCheckingOut(true);
    window.location.href = url;
  };

  return (
    <div className={cx("cdrw", shown && "is-open")}>
      <div className="cdrw__scrim" onClick={onClose} aria-hidden="true" />
      <div ref={panelRef} className="cdrw__panel" role="dialog" aria-modal="true" aria-labelledby="cdrw-title">
        <div className="cdrw__head cdrw__stage" style={{ "--d": "0.2s" } as any}>
          <div className="cdrw__title">
            <h2 id="cdrw-title" className={cx("cdrw__title-text", TEXT.h4)}>
              {t.cartTitleText}
            </h2>
            <span className={cx("cdrw__count", TEXT.label, "tabular")}>({count})</span>
          </div>
          <IconButton icon="x" iconSize={20} ariaLabel={t.closeAriaLabel} onClick={onClose} />
        </div>

        <div className="cdrw__body cdrw__stage" style={{ "--d": "0.3s" } as any}>
          {loading ? (
            <div className="cdrw__lines" aria-busy="true">
              {[0, 1].map((i) => (
                <div key={i} className="cdrw__skel">
                  <Skeleton width={88} height={110} />
                  <div className="cdrw__skel-info">
                    <Skeleton width="70%" height={14} />
                    <Skeleton width="40%" height={10} />
                    <div className="cdrw__skel-row">
                      <Skeleton width={104} height={40} />
                      <Skeleton width={64} height={14} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filled ? (
            <>
              <ul className="cdrw__lines">
                {lines.map((item, i) => (
                  <li key={item.id} className="cdrw__line" style={{ "--i": i } as any}>
                    <CartLineItem item={item} {...lineTexts} />
                  </li>
                ))}
              </ul>
              {recommended.length > 0 && (
                <div className="cdrw__recommend">
                  {t.drawerRecommendTitle && <p className={cx("cdrw__recommend-title", TEXT.label)}>{t.drawerRecommendTitle}</p>}
                  <div className="cdrw__recommend-row">
                    {recommended.map((p) => (
                      <ProductCardSmall key={p.id} product={p} size="sm" onClick={onClose} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="cdrw__empty">
              <Icon name="bag" size={32} className="cdrw__empty-icon" />
              {t.cartEmptyTitle && <p className={cx("cdrw__empty-title", TEXT.h4)}>{t.cartEmptyTitle}</p>}
              {t.cartEmptyText && <p className={cx("cdrw__empty-text", TEXT.body)}>{t.cartEmptyText}</p>}
              {t.cartEmptyButtonText && (
                <div className="cdrw__empty-action">
                  <Button
                    label={t.cartEmptyButtonText}
                    href={withRoutePrefix("/")}
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      Router.navigateToPage("INDEX");
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {(filled || loading) && (
          <div className="cdrw__foot cdrw__stage" style={{ "--d": "0.4s" } as any}>
            {filled && <Coupon {...t} />}
            {adjustments.length > 0 && (
              <ul className="cdrw__adjustments">
                {adjustments.map((adj, i) => (
                  <li key={i} className="cdrw__row">
                    <span className={cx("cdrw__adj-name", TEXT.uiSm)}>{getOrderAdjustmentDisplayName(adj)}</span>
                    <span className={cx("cdrw__adj-amount", TEXT.price, "tabular")}>{getOrderAdjustmentFormattedAmount(adj)}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="cdrw__row">
              <span className={cx("cdrw__subtotal-label", TEXT.ui)}>{t.cartSubtotalLabel}</span>
              {cart ? (
                <span className={cx("cdrw__subtotal", TEXT.price, "tabular")}>{getIkasOrderFormattedTotalFinalPrice(cart)}</span>
              ) : (
                <Skeleton width={72} height={14} />
              )}
            </div>
            {/* shipping-note */}
            {t.cartShippingNote && <p className={cx("cdrw__note", TEXT.uiXs)}>{t.cartShippingNote}</p>}
            <Button
              className="cdrw__checkout"
              label={checkingOut ? t.checkoutLoadingText : t.checkoutButtonText}
              fullWidth
              state={checkingOut ? "loading" : "idle"}
              disabled={!filled}
              onClick={checkout}
            />
            <div className="cdrw__view">
              <ArrowLink
                label={t.cartViewButtonText}
                href={withRoutePrefix("/cart")}
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  Router.navigateToPage("CART");
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default CartDrawer;
