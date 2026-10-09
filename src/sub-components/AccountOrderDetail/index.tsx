import { useEffect, useRef, useState } from "preact/hooks";
import {
  IkasOrder,
  IkasOrderAddress,
  IkasOrderLineItem,
  createMediaSrcset,
  customerStore,
  getDefaultSrc,
  getIkasOrderDisplayedAdjustments,
  getIkasOrderDisplayedPackages,
  getIkasOrderFormattedOrderedAt,
  getIkasOrderFormattedShippingTotal,
  getIkasOrderFormattedTotalFinalPrice,
  getIkasOrderFormattedTotalPrice,
  getIkasOrderLineVariantMainImage,
  getIkasOrderPackageStatusTranslation,
  getIkasOrderRefundableItems,
  getIkasOrderShippingTotal,
  getOrderAddressText,
  getOrderAdjustmentDisplayName,
  getOrderAdjustmentFormattedAmount,
  getOrderDetailsOfPage,
  getOrderLineItemFormattedFinalPriceWithQuantity,
  getOrderRefundSettings,
  getOrderTransactionPaymentMethodTranslation,
  isIkasOrderRefundable,
  refundOrder,
  setOrderLineItemRefundQuantity,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { fill, type AccountTexts } from "../../components/Account/texts";
import { cx } from "../../utils/cx";
import { TEXT, upperTr } from "../../utils/tokens";
import AccountSkeleton from "../AccountSkeleton";
import Button from "../Button";
import Checkbox from "../Checkbox";
import FormField from "../FormField";
import Icon from "../Icon";
import QuantitySelector from "../QuantitySelector";

interface Props {
  texts: AccountTexts;
  /** "← Siparişlerim" — back to the orders list (in place). */
  onBack: () => void;
}

function LineMedia({ item }: { item: IkasOrderLineItem }) {
  const image = item.variant ? getIkasOrderLineVariantMainImage(item.variant) : null;
  return (
    <span className="aodet__media">
      {image ? (
        image.isVideo ? (
          <video className="aodet__img" src={getDefaultSrc(image)} muted loop autoPlay playsInline />
        ) : (
          <img
            className="aodet__img"
            src={getDefaultSrc(image)}
            srcSet={createMediaSrcset(image)}
            sizes="56px"
            alt={item.variant?.name ?? ""}
            loading="lazy"
            decoding="async"
          />
        )
      ) : null}
    </span>
  );
}

const variantText = (item: IkasOrderLineItem) =>
  upperTr((item.variant?.variantValues ?? []).map((v) => v.variantValueName).filter(Boolean).join(" · "));

function AddressCard({ label, address }: { label: string; address: IkasOrderAddress | null }) {
  if (!address) return null;
  const name = [address.firstName, address.lastName].filter(Boolean).join(" ");
  const head = [name, address.phone].filter(Boolean).join(" · ");
  return (
    <div className="aodet__card aodet__address">
      {label && <span className={cx("acc-muted", TEXT.label)}>{label}</span>}
      <p className={cx("aodet__address-text", TEXT.uiSm)}>
        {head && (
          <>
            {head}
            <br />
          </>
        )}
        {getOrderAddressText(address)}
      </p>
    </div>
  );
}

/**
 * I/Section/Account › order-detail (+ return-form) — head (back, title + number, date, status pill),
 * packages (cargo, tracking + copy, lines), addresses, payment, summary (subtotal, adjustments, shipping, total),
 * iade talebi: line selection (Checkbox + QuantitySelector) + reason + submit.
 */
const AccountOrderDetail = observer(function AccountOrderDetail({ texts: t, onBack }: Props) {
  const [order, setOrder] = useState<IkasOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"detail" | "return">("detail");
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<"success" | "error" | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getOrderDetailsOfPage(customerStore), getOrderRefundSettings(customerStore).catch(() => undefined)])
      .then(([res]) => !cancelled && setOrder(res ?? null))
      .catch(() => !cancelled && setOrder(null))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  const backLink = (label: string, onClick: () => void) =>
    label ? (
      <button type="button" className={cx("acc-textbtn", "aodet__back", "acc-muted", TEXT.uiSm)} onClick={onClick}>
        {/* od-back — the canvas draws the arrow as a text glyph: "← Siparişlerim" */}
        <span aria-hidden="true">←</span> {label}
      </button>
    ) : null;

  if (loading) return <AccountSkeleton label={t.loadingText} />;

  if (!order) {
    return (
      <div className="aodet aodet--missing" role="alert">
        {backLink(t.ordersTabText, onBack)}
        <Icon name="alert" size={24} className="acc-danger" />
        <p className={cx("aodet__missing-text", TEXT.ui)}>{t.orderNotFoundText}</p>
      </div>
    );
  }

  const number = order.orderNumber ? `#${order.orderNumber}` : "";
  const refundable = getIkasOrderRefundableItems(order);
  const canReturn = isIkasOrderRefundable(order) && refundable.length > 0;

  const copy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(null), 2000);
    } catch {
      /* clipboard blocked — the number stays selectable */
    }
  };

  const head = (
    <div className="aodet__head">
      <div className="aodet__title-block">
        {backLink(t.ordersTabText, onBack)}
        <h2 className="aodet__title-row">
          <span className={cx("acc-title", TEXT.h4)}>{t.orderDetailTitle}</span>
          {number && <span className={cx("aodet__number", TEXT.h4, "tabular")}>{number}</span>}
        </h2>
        <span className={cx("acc-muted", TEXT.label, "tabular")}>{upperTr(getIkasOrderFormattedOrderedAt(order) ?? "")}</span>
      </div>
      <span className="aodet__status">
        <span className="aodet__status-dot" aria-hidden="true" />
        <span className={TEXT.label}>{upperTr(getIkasOrderPackageStatusTranslation(order) ?? "")}</span>
      </span>
    </div>
  );

  /* ── İade talebi ─────────────────────────────────────────── */
  if (mode === "return") {
    const selected = refundable.filter((i) => (quantities[i.id] ?? 0) > 0);
    const setQty = (item: IkasOrderLineItem, next: number) => {
      const value = Math.max(0, Math.min(item.quantity, next));
      setOrderLineItemRefundQuantity(value || null, item);
      setQuantities((q) => ({ ...q, [item.id]: value }));
    };
    const onSubmit = async (e: Event) => {
      e.preventDefault();
      if (submitting || !selected.length) return;
      setSubmitting(true);
      setResult(null);
      try {
        const ok = await refundOrder(customerStore, order);
        setResult(ok ? "success" : "error");
      } catch {
        setResult("error");
      } finally {
        setSubmitting(false);
      }
    };
    const done = result === "success";

    return (
      /* return-form: title + intro, no order head (canvas return-form-stage) */
      <form className="aodet" onSubmit={onSubmit} noValidate>
        {t.returnTitle && <h2 className={cx("acc-title", TEXT.h4)}>{t.returnTitle}</h2>}
        {t.returnIntroText && <p className={cx("aodet__intro", "acc-muted", TEXT.body)}>{t.returnIntroText}</p>}
        {refundable.length === 0 && <p className={cx("acc-muted", TEXT.body)}>{t.returnEmptyText}</p>}
        <div className="aodet__return-list">
          {refundable.map((item) => {
            const qty = quantities[item.id] ?? 0;
            const on = qty > 0;
            return (
              <div key={item.id} className={cx("aodet__return-item", on && "aodet__return-item--on")}>
                <Checkbox
                  checked={on}
                  disabled={done}
                  ariaLabel={item.variant?.name ?? ""}
                  onChange={(checked) => setQty(item, checked ? Math.max(1, qty) : 0)}
                />
                <LineMedia item={item} />
                <span className="aodet__item-info">
                  <span className={cx("aodet__item-title", TEXT.title)}>{item.variant?.name}</span>
                  <span className={cx("acc-muted", TEXT.label)}>{variantText(item)}</span>
                </span>
                <QuantitySelector
                  value={Math.max(1, qty)}
                  min={1}
                  max={item.quantity}
                  disabled={!on || done}
                  onChange={(v) => setQty(item, v)}
                  decreaseAriaLabel={t.decreaseAriaLabel}
                  increaseAriaLabel={t.increaseAriaLabel}
                />
              </div>
            );
          })}
        </div>
        {/* Reason is collected for the customer; refundOrder() has no reason parameter (see port report). */}
        {t.returnReasonLabel && (
          <FormField label={t.returnReasonLabel} name="returnReason" value={reason} disabled={done} onInput={(v) => setReason(v)} />
        )}
        <div className="aodet__return-actions">
          <Button
            type="submit"
            label={submitting ? t.returnSubmittingText : t.returnSubmitText}
            state={submitting ? "loading" : "idle"}
            disabled={!selected.length || done}
          />
          {result && (
            <p
              className={cx(result === "success" ? "acc-success" : "acc-danger", TEXT.uiSm)}
              role={result === "success" ? "status" : "alert"}
            >
              {result === "success" ? t.returnSuccessText : t.returnErrorText}
            </p>
          )}
        </div>
      </form>
    );
  }

  /* ── Sipariş detayı ──────────────────────────────────────── */
  const packages = getIkasOrderDisplayedPackages(order);
  const adjustments = getIkasOrderDisplayedAdjustments(order) ?? [];
  const shippingFree = getIkasOrderShippingTotal(order) === 0;
  const transactions = order.transactions ?? [];

  return (
    <div className="aodet">
      {head}

      {packages.map((pkg, index) => {
        const tracking = pkg.trackingInfo;
        return (
          <div key={pkg.id} className="aodet__card">
            <span className={cx("aodet__package-title", TEXT.label)}>
              {[fill(t.packageTitleText, "n", index + 1), upperTr(pkg.statusTranslation)].filter(Boolean).join(" · ")}
            </span>
            {tracking?.cargoCompany && (
              <div className="aodet__row">
                <span className={cx("acc-muted", TEXT.uiSm)}>{t.cargoLabel}</span>
                <span className={cx("aodet__value", TEXT.uiSm)}>{tracking.cargoCompany}</span>
              </div>
            )}
            {tracking?.trackingNumber && (
              <div className="aodet__row">
                <span className={cx("acc-muted", TEXT.uiSm)}>{t.trackingLabel}</span>
                <span className="aodet__tracking">
                  {tracking.trackingLink ? (
                    <a
                      className={cx("aodet__value", "aodet__link", TEXT.uiSm, "tabular")}
                      href={tracking.trackingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {tracking.trackingNumber}
                    </a>
                  ) : (
                    <span className={cx("aodet__value", TEXT.uiSm, "tabular")}>{tracking.trackingNumber}</span>
                  )}
                  <button
                    type="button"
                    className="acc-textbtn aodet__copy"
                    aria-label={t.copyAriaLabel || undefined}
                    onClick={() => copy(tracking.trackingNumber as string)}
                  >
                    <Icon name="copy" size={14} />
                  </button>
                  {copied === tracking.trackingNumber && (
                    <span className={cx("aodet__copied", "acc-success", TEXT.label)} role="status">
                      {t.copiedText}
                    </span>
                  )}
                </span>
              </div>
            )}
            <div className="aodet__items">
              {pkg.orderLineItems.map((item) => {
                const meta = [variantText(item), fill(t.quantityText, "count", item.quantity)].filter(Boolean).join(" · ");
                return (
                  <div key={item.id} className="aodet__item">
                    <LineMedia item={item} />
                    <span className="aodet__item-info">
                      <span className={cx("aodet__item-title", TEXT.title)}>{item.variant?.name}</span>
                      <span className={cx("acc-muted", TEXT.label)}>{meta}</span>
                    </span>
                    <span className={cx("aodet__item-price", TEXT.price, "tabular")}>
                      {getOrderLineItemFormattedFinalPriceWithQuantity(item)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <div className="aodet__addresses">
        <AddressCard label={t.shippingAddressLabel} address={order.shippingAddress} />
        <AddressCard label={t.billingAddressLabel} address={order.billingAddress} />
      </div>

      {transactions.length > 0 && (
        <div className="aodet__card">
          {transactions.map((tr, i) => {
            const d = tr.paymentMethodDetail;
            const count = d?.installment?.installmentCount ?? 0;
            const value = [
              getOrderTransactionPaymentMethodTranslation(tr),
              d?.lastFourDigits ? `**** ${d.lastFourDigits}` : "",
              count > 1 ? fill(t.installmentText, "count", count) : "",
            ]
              .filter(Boolean)
              .join(" · ");
            return (
              <div key={tr.id ?? i} className="aodet__row">
                <span className={cx("acc-muted", TEXT.uiSm)}>{t.paymentLabel}</span>
                <span className={cx("aodet__value", TEXT.uiSm)}>{value}</span>
              </div>
            );
          })}
        </div>
      )}

      <div className="aodet__card">
        <div className="aodet__row">
          <span className={cx("acc-muted", TEXT.uiSm)}>{t.subtotalLabel}</span>
          <span className={cx("aodet__value", TEXT.uiSm, "tabular")}>{getIkasOrderFormattedTotalPrice(order)}</span>
        </div>
        {adjustments.map((adj, i) => (
          <div key={`${adj.name}-${i}`} className="aodet__row">
            <span className={cx("acc-muted", TEXT.uiSm)}>{getOrderAdjustmentDisplayName(adj)}</span>
            <span className={cx("aodet__value", TEXT.uiSm, "tabular")}>{getOrderAdjustmentFormattedAmount(adj)}</span>
          </div>
        ))}
        <div className="aodet__row">
          <span className={cx("acc-muted", TEXT.uiSm)}>{t.shippingLabel}</span>
          <span className={cx("aodet__value", TEXT.uiSm, "tabular")}>
            {shippingFree && t.freeShippingText ? t.freeShippingText : getIkasOrderFormattedShippingTotal(order)}
          </span>
        </div>
        <div className="aodet__row aodet__total">
          <span className={cx("acc-title", TEXT.h4)}>{t.totalLabel}</span>
          <span className={cx("aodet__total-value", TEXT.h4, "tabular")}>{getIkasOrderFormattedTotalFinalPrice(order)}</span>
        </div>
      </div>

      {canReturn && t.returnButtonText && (
        <div className="aodet__actions">
          <Button
            label={t.returnButtonText}
            variant="outline"
            className="acc-btn--strong"
            onClick={() => {
              setResult(null);
              setMode("return");
            }}
          />
        </div>
      )}
    </div>
  );
});

export default AccountOrderDetail;
