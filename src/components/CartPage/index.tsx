import { useEffect, useRef, useState } from "preact/hooks";
import {
  IkasCart,
  cartStore,
  customerStore,
  formatCurrency,
  getCheckoutUrlFromCartStore,
  getCouponCodeForm,
  getIkasOrderDisplayedAdjustments,
  getIkasOrderFormattedShippingTotal,
  getIkasOrderFormattedTotalPrice,
  getIkasOrderGiftCardTotalPrice,
  getIkasOrderShippingTotal,
  getIkasOrderTotalItemCount,
  getOrderAdjustmentDisplayName,
  getOrderAdjustmentFormattedAmount,
  initCouponCodeForm,
  removeCouponCodeForm,
  setCouponCodeFormCouponCode,
  submitCouponCodeForm,
  withRoutePrefix,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import Button from "../../sub-components/Button";
import CartLineItem, { CartLineItemTexts } from "../../sub-components/CartLineItem";
import FormField from "../../sub-components/FormField";
import Icon from "../../sub-components/Icon";
import ProductCardSmall from "../../sub-components/ProductCardSmall";
import Skeleton from "../../sub-components/Skeleton";
import { cx } from "../../utils/cx";
import { useReveal } from "../../utils/hooks";
import { TEXT } from "../../utils/tokens";
import { Props } from "./types";

const fill = (tpl: string, key: string, value: string | number) => tpl.split(`{${key}}`).join(String(value));

/** Amount still due: total after adjustments minus applied gift cards (ikas: totalFinalPrice − gift card total). */
function formattedAmountDue(cart: IkasCart) {
  const due = Math.max(0, cart.totalFinalPrice - getIkasOrderGiftCardTotalPrice(cart));
  return formatCurrency(due, cart.currencyCode, cart.currencySymbol);
}

interface CouponTexts {
  couponLabel: string;
  couponPlaceholder: string;
  couponButtonText: string;
  couponApplyingText: string;
  couponErrorText: string;
  couponSuccessText: string;
  couponRemoveText: string;
}

/** coupon-form · coupon-message · coupon-applied — getCouponCodeForm → submit / remove. States: kupon hatası, uygulandı. */
const CouponBox = observer(function CouponBox({
  disabled,
  couponLabel,
  couponPlaceholder,
  couponButtonText,
  couponApplyingText,
  couponErrorText,
  couponSuccessText,
  couponRemoveText,
}: CouponTexts & { disabled?: boolean }) {
  const form = getCouponCodeForm(customerStore);
  const [message, setMessage] = useState<"success" | "error" | null>(null);
  const [removing, setRemoving] = useState(false);
  const appliedCode = cartStore.cart?.couponCode;

  useEffect(() => {
    initCouponCodeForm(form);
  }, [form]);

  const value = form.couponCode?.value ?? "";
  const submitting = !!form.isSubmitting && !removing;

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (disabled || submitting || !value.trim()) return;
    const ok = await submitCouponCodeForm(form);
    setMessage(ok ? "success" : "error");
    if (ok) setCouponCodeFormCouponCode(form, "");
  };

  const onRemove = async () => {
    if (removing) return;
    setRemoving(true);
    try {
      await removeCouponCodeForm(form);
      setMessage(null);
    } finally {
      setRemoving(false);
    }
  };

  const isError = message === "error";
  return (
    <div className="cartp__coupon">
      <form className="cartp__coupon-form" onSubmit={onSubmit as any} noValidate>
        <FormField
          className="cartp__coupon-field"
          label={couponLabel}
          name="couponCode"
          value={value}
          placeholder={couponPlaceholder}
          autoComplete="off"
          invalid={isError}
          disabled={disabled}
          onInput={(v) => {
            setCouponCodeFormCouponCode(form, v);
            if (message) setMessage(null);
          }}
        />
        <Button
          className="cartp__coupon-btn"
          type="submit"
          variant="outline"
          label={submitting ? couponApplyingText : couponButtonText}
          state={submitting ? "loading" : "idle"}
          disabled={disabled}
        />
      </form>
      {message && (
        <p className={cx("cartp__coupon-msg", isError ? "cartp__coupon-msg--error" : "cartp__coupon-msg--success", TEXT.uiSm)} role={isError ? "alert" : "status"}>
          {isError ? couponErrorText : couponSuccessText}
        </p>
      )}
      {appliedCode && (
        <div className={cx("cartp__coupon-applied", removing && "cartp__coupon-applied--busy")}>
          <Icon name="ticket" size={14} />
          <span className={cx("cartp__coupon-code", TEXT.label, "tabular")}>{appliedCode}</span>
          {couponRemoveText && (
            <button type="button" className={cx("cartp__coupon-remove", TEXT.uiSm)} onClick={onRemove} disabled={removing}>
              {couponRemoveText}
            </button>
          )}
        </div>
      )}
    </div>
  );
});

interface SummaryTexts extends CouponTexts {
  summaryTitle: string;
  subtotalLabel: string;
  shippingLabel: string;
  shippingFreeText: string;
  shippingPendingText: string;
  giftCardText: string;
  totalLabel: string;
  checkoutText: string;
  checkoutLoadingText: string;
  summaryNote: string;
}

interface SummaryProps extends SummaryTexts {
  loading: boolean;
  checkingOut: boolean;
  onCheckout: () => void;
  checkoutRef: { current: HTMLDivElement | null };
}

/** cart-summary — coupon, summary rows (+ cart-adjustments, gift cards), total, checkout (I-CRTP-01 via Button), note. */
const CartSummary = observer(function CartSummary({
  loading,
  checkingOut,
  onCheckout,
  checkoutRef,
  summaryTitle,
  subtotalLabel,
  shippingLabel,
  shippingFreeText,
  shippingPendingText,
  giftCardText,
  totalLabel,
  checkoutText,
  checkoutLoadingText,
  summaryNote,
  ...couponTexts
}: SummaryProps) {
  const cart = cartStore.cart;
  const ready = !loading && !!cart;
  const adjustments = (cart && getIkasOrderDisplayedAdjustments(cart)) || [];
  const giftCards = cart?.giftCardLines ?? [];

  let shipping = "";
  if (cart) {
    if (cart.shippingLines?.length) shipping = getIkasOrderShippingTotal(cart) > 0 ? getIkasOrderFormattedShippingTotal(cart) : shippingFreeText;
    else shipping = shippingPendingText;
  }

  const value = (text: string, big?: boolean) =>
    ready ? (
      <span className={cx("cartp__sum-value", big ? TEXT.h4 : TEXT.price, "tabular")}>{text}</span>
    ) : (
      <Skeleton width={big ? 96 : 72} height={big ? 22 : 16} />
    );

  return (
    <aside className="cartp__summary" aria-labelledby="cartp-summary-title" aria-busy={loading}>
      {summaryTitle && (
        <h2 id="cartp-summary-title" className={cx("cartp__sum-title", TEXT.h4)}>
          {summaryTitle}
        </h2>
      )}
      <CouponBox disabled={!ready} {...couponTexts} />
      <dl className="cartp__sum-rows">
        <div className="cartp__sum-row">
          <dt className={cx("cartp__sum-label", TEXT.ui)}>{subtotalLabel}</dt>
          <dd>{value(cart ? getIkasOrderFormattedTotalPrice(cart) : "")}</dd>
        </div>
        <div className="cartp__sum-row">
          <dt className={cx("cartp__sum-label", TEXT.ui)}>{shippingLabel}</dt>
          <dd>{value(shipping)}</dd>
        </div>
        {ready &&
          adjustments.map((adj, i) => (
            <div key={`adj-${adj.campaignId ?? adj.couponId ?? i}`} className="cartp__sum-row">
              <dt className={cx("cartp__sum-label", TEXT.ui)}>{getOrderAdjustmentDisplayName(adj)}</dt>
              <dd>{value(getOrderAdjustmentFormattedAmount(adj))}</dd>
            </div>
          ))}
        {ready &&
          cart &&
          giftCards.map((line) => (
            <div key={`gc-${line.id}`} className="cartp__sum-row">
              <dt className={cx("cartp__sum-label", TEXT.ui)}>{giftCardText}</dt>
              <dd>{value(`-${formatCurrency(line.amount, cart.currencyCode, cart.currencySymbol)}`)}</dd>
            </div>
          ))}
        <div className="cartp__sum-row cartp__sum-row--total">
          <dt className={cx("cartp__sum-total-label", TEXT.h4)}>{totalLabel}</dt>
          <dd>{value(cart ? formattedAmountDue(cart) : "", true)}</dd>
        </div>
      </dl>
      <div ref={checkoutRef} className="cartp__checkout">
        <Button
          fullWidth
          label={checkingOut ? checkoutLoadingText : checkoutText}
          state={checkingOut ? "loading" : "idle"}
          disabled={!ready}
          onClick={onCheckout}
        />
      </div>
      {summaryNote && <p className={cx("cartp__sum-note", TEXT.label)}>{summaryNote}</p>}
    </aside>
  );
});

/** Mobile sticky checkout bar — visible while the summary's checkout button is off-screen (mobile only, CSS). */
const StickyCheckout = observer(function StickyCheckout({
  visible,
  totalLabel,
  checkoutText,
  checkoutLoadingText,
  checkingOut,
  onCheckout,
}: {
  visible: boolean;
  totalLabel: string;
  checkoutText: string;
  checkoutLoadingText: string;
  checkingOut: boolean;
  onCheckout: () => void;
}) {
  const cart = cartStore.cart;
  if (!cart) return null;
  return (
    <div className={cx("cartp__bar", visible && "cartp__bar--visible")} aria-hidden={!visible}>
      <div className="cartp__bar-total">
        <span className={cx("cartp__bar-label", TEXT.uiSm)}>{totalLabel}</span>
        <span className={cx("cartp__bar-value", TEXT.price, "tabular")}>{formattedAmountDue(cart)}</span>
      </div>
      <Button
        className="cartp__bar-btn"
        label={checkingOut ? checkoutLoadingText : checkoutText}
        state={checkingOut ? "loading" : "idle"}
        disabled={!visible}
        onClick={onCheckout}
      />
    </div>
  );
});

/**
 * I/Section/CartPage — title + count, CartLineItem list (indirimli · hediye · set · kişiselleştirilmiş ·
 * güncelleniyor · adet sınırı states live in CartLineItem), 452 summary (380 laptop, full width below
 * on tablet/mobile), ProductCardSmall recommendations, empty / loading (skeleton) states, mobile
 * sticky checkout bar. Anims: I-CRTP-01 (checkout Button, M-11) · I-CRTP-02 (recommendations, M-01).
 */
export function CartPage({
  title = "Sepetin",
  itemCountText = "{count} ÜRÜN",
  emptyTitle = "Sepetin boş",
  emptyText = "Rotanı çiz, ekipmanını seç.",
  emptyButtonText = "Alışverişe başla",
  loadingText = "Sepet yükleniyor",
  removeText = "Kaldır",
  editText = "Düzenle",
  maxQuantityText = "En fazla {max} adet alabilirsin.",
  giftText = "HEDİYE",
  bundlePartsText = "{count} PARÇA",
  decreaseAriaLabel = "Adedi azalt",
  increaseAriaLabel = "Adedi artır",
  summaryTitle = "Sipariş özeti",
  couponLabel = "İNDİRİM KODU",
  couponPlaceholder = "Kodunu gir",
  couponButtonText = "Uygula",
  couponApplyingText = "Uygulanıyor",
  couponErrorText = "Bu kod geçerli değil.",
  couponSuccessText = "Kod uygulandı.",
  couponRemoveText = "Kaldır",
  subtotalLabel = "Ara toplam",
  shippingLabel = "Kargo",
  shippingFreeText = "Ücretsiz",
  shippingPendingText = "Ödeme adımında hesaplanır",
  giftCardText = "Hediye çeki",
  totalLabel = "Toplam",
  checkoutText = "Ödemeye geç",
  checkoutLoadingText = "Yönlendiriliyor",
  summaryNote = "GÜVENLİ ÖDEME · 14 GÜN İADE",
  recommendTitle = "Bunlar da işine yarar",
  recommendProducts,
  emptyButtonLink,
  backgroundColor,
}: Props) {
  const recsRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);
  const recsReveal = useReveal(recsRef);
  const [checkingOut, setCheckingOut] = useState(false);
  const [barVisible, setBarVisible] = useState(false);

  const cart = cartStore.cart;
  const loading = !cartStore.isCartInitialLoadFinished;
  const lines = (cart?.orderLineItems ?? []).filter((item) => !item.deleted);
  const isEmpty = !loading && lines.length === 0;
  const count = cart && !loading ? getIkasOrderTotalItemCount(cart) : 0;
  const recs = (recommendProducts?.data ?? []).slice(0, 4);
  const showBar = !loading && !isEmpty;

  // bfcache: coming back from checkout restores the page with the button still loading.
  useEffect(() => {
    const reset = () => setCheckingOut(false);
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  useEffect(() => {
    const el = checkoutRef.current;
    if (!showBar || !el || typeof IntersectionObserver === "undefined") {
      setBarVisible(false);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setBarVisible(!entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [showBar]);

  const onCheckout = () => {
    if (checkingOut) return;
    const url = getCheckoutUrlFromCartStore(cartStore);
    if (!url) return;
    setCheckingOut(true);
    window.location.href = url;
  };

  const lineTexts: CartLineItemTexts = {
    editText,
    removeText,
    maxQuantityText,
    giftText,
    decreaseAriaLabel,
    increaseAriaLabel,
    bundlePartsText,
  };

  return (
    <section
      className={cx("cartp", loading && "cartp--loading", isEmpty && "cartp--empty")}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="cartp__head">
        <h1 className={cx("cartp__title", TEXT.h2)}>{title}</h1>
        {!loading && itemCountText && (
          <span className={cx("cartp__count", TEXT.label, "tabular")}>{fill(itemCountText, "count", count)}</span>
        )}
      </div>

      <div className={cx("cartp__body", isEmpty && "cartp__body--solo")}>
        <div className="cartp__main">
          {loading ? (
            <div className="cartp__skeleton" role="status" aria-live="polite">
              <span className="sr-only">{loadingText}</span>
              {[0, 1, 2].map((i) => (
                <div key={i} className="cartp__skel-item">
                  <Skeleton className="cartp__skel-media" width="" height="" />
                  <div className="cartp__skel-col">
                    <Skeleton className="cartp__skel-title" width="" height={18} />
                    <Skeleton width={120} height={12} />
                    <Skeleton width={104} height={40} />
                  </div>
                </div>
              ))}
            </div>
          ) : isEmpty ? (
            <div className="cartp__empty">
              <Icon name="bag" size={32} className="cartp__empty-icon" />
              {emptyTitle && <h2 className={cx("cartp__empty-title", TEXT.h3)}>{emptyTitle}</h2>}
              {emptyText && <p className={cx("cartp__empty-text", TEXT.body)}>{emptyText}</p>}
              {emptyButtonText && (
                <Button className="cartp__empty-btn" label={emptyButtonText} href={emptyButtonLink?.href || withRoutePrefix("/")} />
              )}
            </div>
          ) : (
            <ul className="cartp__lines">
              {lines.map((item) => (
                <li key={item.id} className="cartp__line">
                  <CartLineItem item={item} {...lineTexts} />
                </li>
              ))}
            </ul>
          )}
        </div>

        {!isEmpty && (
          <CartSummary
            loading={loading}
            checkingOut={checkingOut}
            onCheckout={onCheckout}
            checkoutRef={checkoutRef}
            summaryTitle={summaryTitle}
            subtotalLabel={subtotalLabel}
            shippingLabel={shippingLabel}
            shippingFreeText={shippingFreeText}
            shippingPendingText={shippingPendingText}
            giftCardText={giftCardText}
            totalLabel={totalLabel}
            checkoutText={checkoutText}
            checkoutLoadingText={checkoutLoadingText}
            summaryNote={summaryNote}
            couponLabel={couponLabel}
            couponPlaceholder={couponPlaceholder}
            couponButtonText={couponButtonText}
            couponApplyingText={couponApplyingText}
            couponErrorText={couponErrorText}
            couponSuccessText={couponSuccessText}
            couponRemoveText={couponRemoveText}
          />
        )}

        {recs.length > 0 && (
          /* I-CRTP-02 · M-01: recommendation cards enter in sequence (y 16, 0.4s ease-out-soft, stagger 0.05) */
          <div className="cartp__recs">
            {recommendTitle && <h2 className={cx("cartp__recs-title", TEXT.h4)}>{recommendTitle}</h2>}
            <div ref={recsRef} className={cx("cartp__recs-list", recsReveal)}>
              {recs.map((product, i) => (
                <div key={product.id} className="cartp__rec" style={{ "--i": i } as any}>
                  <ProductCardSmall product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {showBar && (
        <StickyCheckout
          visible={barVisible}
          totalLabel={totalLabel}
          checkoutText={checkoutText}
          checkoutLoadingText={checkoutLoadingText}
          checkingOut={checkingOut}
          onCheckout={onCheckout}
        />
      )}
    </section>
  );
}

export default CartPage;
