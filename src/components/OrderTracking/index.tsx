import { useEffect, useState } from "preact/hooks";
import {
  type IkasOrder,
  type IkasOrderLineItem,
  createMediaSrcset,
  customerStore,
  getDefaultSrc,
  getIkasOrderLineVariantMainImage,
  getIkasOrderPackageStatusTranslation,
  getOrderLineItemFormattedFinalPriceWithQuantity,
  getOrderTrackingForm,
  initOrderTrackingForm,
  setOrderTrackingFormEmail,
  setOrderTrackingFormOrderNumber,
  submitOrderTrackingForm,
} from "@ikas/bp-storefront";
import Button from "../../sub-components/Button";
import FormField from "../../sub-components/FormField";
import Icon from "../../sub-components/Icon";
import { cx } from "../../utils/cx";
import { TEXT, upperTr } from "../../utils/tokens";
import { Props } from "./types";

type View = "empty" | "result" | "notFound";

/** Package status → step index (0 alındı · 1 hazırlanıyor · 2 kargoda · 3 teslim edildi); -1 = off the happy path. */
const STEP_OF: Record<string, number> = {
  UNFULFILLED: 0,
  PARTIALLY_READY_FOR_SHIPMENT: 1,
  READY_FOR_SHIPMENT: 1,
  PARTIALLY_FULFILLED: 1,
  FULFILLED: 2,
  PARTIALLY_DELIVERED: 2,
  READY_FOR_PICK_UP: 2,
  DELIVERED: 3,
};

const pad = (n: number) => (n < 10 ? `0${n}` : String(n));
const shortDate = (ts?: number | null) => {
  if (!ts) return "";
  const d = new Date(ts);
  return Number.isNaN(d.getTime()) ? "" : `${pad(d.getDate())}.${pad(d.getMonth() + 1)}`;
};

function lineVariantText(item: IkasOrderLineItem) {
  const values = [...(item.variant?.variantValues ?? [])].sort((a, b) => a.order - b.order);
  const text = upperTr(values.map((v) => v.variantValueName).filter(Boolean).join(" · "));
  return item.quantity > 1 ? `${item.quantity} ×${text ? ` ${text}` : ""}` : text;
}

/** I/Section/OrderTracking — guest order lookup (e-mail + order number); form and result side by side, stacked ≤991. */
export function OrderTracking({
  title = "Siparişim nerede?",
  text = "Üye olmadan verdiğin siparişin durumunu e-posta adresin ve sipariş numaranla sorgula.",
  emailLabel = "E-POSTA",
  emailPlaceholder = "ornek@eposta.com",
  orderNumberLabel = "SİPARİŞ NUMARASI",
  submitText = "Sorgula",
  submittingText = "Sorgulanıyor…",
  placeholderText = "Bilgileri girince siparişinin durumu burada görünecek.",
  notFoundText = "Bu bilgilerle bir sipariş bulamadık. E-posta adresini ve sipariş numarasını kontrol et.",
  statusTitle = "Sipariş",
  stepReceivedText = "Alındı",
  stepPreparingText = "Hazırlanıyor",
  stepShippedText = "Kargoda",
  stepDeliveredText = "Teslim edildi",
  cancelledText = "İptal edildi",
  cargoCompanyLabel = "Kargo firması",
  trackingNumberLabel = "Takip numarası",
  trackingLinkText = "Kargoyu takip et",
  backgroundColor,
}: Props) {
  const form = getOrderTrackingForm(customerStore);
  const [order, setOrder] = useState<IkasOrder | null>(null);
  const [view, setView] = useState<View>("empty");

  useEffect(() => {
    initOrderTrackingForm(form);
  }, []);

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    const found = await submitOrderTrackingForm(form);
    if (found) {
      setOrder(found);
      setView("result");
    } else if (!form.email?.hasError && !form.orderNumber?.hasError) {
      setOrder(null);
      setView("notFound");
    }
  };

  const steps = [stepReceivedText, stepPreparingText, stepShippedText, stepDeliveredText];
  let result = null;
  if (view === "result" && order) {
    const packageStatus = order.orderPackageStatus ?? "UNFULFILLED";
    const cancelled = order.status === "CANCELLED" || !(packageStatus in STEP_OF);
    const current = cancelled ? 0 : STEP_OF[packageStatus];
    const packages = order.orderPackages ?? [];
    const tracked = packages.find((p) => p.trackingInfo?.trackingNumber || p.trackingInfo?.cargoCompany) ?? null;
    const info = tracked?.trackingInfo ?? null;
    const lastUpdate = packages.reduce((max, p) => Math.max(max, p.updatedAt || 0), 0) || order.updatedAt;
    const statusText = cancelled
      ? order.status === "CANCELLED"
        ? cancelledText
        : getIkasOrderPackageStatusTranslation(order) || cancelledText
      : steps[current];
    const lines = (order.orderLineItems ?? []).filter((l) => !l.deleted);

    result = (
      /* tracking-result */
      <div className="trk__result" key={order.id}>
        <div className="trk__result-head">
          <h2 className="trk__result-title">
            <span className={TEXT.h4}>{statusTitle}</span>
            {order.orderNumber && <span className={cx("trk__number", TEXT.h4, "tabular")}>#{order.orderNumber}</span>}
          </h2>
          <span className={cx("trk__status", cancelled && "trk__status--danger")}>
            <span className="trk__status-dot" aria-hidden="true" />
            <span className={TEXT.label}>{upperTr(statusText)}</span>
          </span>
        </div>

        <ol className="trk__steps">
          {steps.map((label, i) => {
            const done = !cancelled && i <= current;
            let date = "";
            if (i === 0) date = shortDate(order.orderedAt ?? order.createdAt);
            else if (done && i === current) date = shortDate(lastUpdate);
            return (
              <li key={i} className={cx("trk__step", done && "trk__step--done", !cancelled && i === current && "trk__step--current")}>
                <span className="trk__step-bar" aria-hidden="true" />
                <span className={cx("trk__step-label", TEXT.uiSm)}>{label}</span>
                <span className={cx("trk__step-date", TEXT.label, "tabular")}>{date || "—"}</span>
              </li>
            );
          })}
        </ol>

        {info && (
          /* tracking-package */
          <div className="trk__package">
            {info.cargoCompany && (
              <div className="trk__row">
                <span className={cx("trk__row-label", TEXT.uiSm)}>{cargoCompanyLabel}</span>
                <span className={cx("trk__row-value", TEXT.label)}>{info.cargoCompany}</span>
              </div>
            )}
            {info.trackingNumber && (
              <div className="trk__row">
                <span className={cx("trk__row-label", TEXT.uiSm)}>{trackingNumberLabel}</span>
                <span className={cx("trk__row-value", TEXT.label, "tabular")}>{info.trackingNumber}</span>
              </div>
            )}
            {info.trackingLink && trackingLinkText && (
              <a className={cx("trk__track-link", TEXT.uiSm)} href={info.trackingLink} target="_blank" rel="noopener noreferrer">
                {trackingLinkText}
                <Icon name="arrow-up-right" size={14} />
              </a>
            )}
          </div>
        )}

        {lines.length > 0 && (
          <ul className="trk__items">
            {lines.map((item) => {
              const image = item.variant ? getIkasOrderLineVariantMainImage(item.variant) : null;
              const variantText = lineVariantText(item);
              return (
                <li key={item.id} className="trk__item">
                  <span className="trk__item-media">
                    {image && !image.isVideo ? (
                      <img
                        className="trk__item-img"
                        src={getDefaultSrc(image)}
                        srcSet={createMediaSrcset(image)}
                        sizes="48px"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <Icon name="mountain" size={18} className="trk__item-placeholder" />
                    )}
                  </span>
                  <span className="trk__item-info">
                    <span className={cx("trk__item-title", TEXT.title)}>{item.variant?.name}</span>
                    {variantText && <span className={cx("trk__item-variant", TEXT.label)}>{variantText}</span>}
                  </span>
                  <span className={cx("trk__item-price", TEXT.price, "tabular")}>{getOrderLineItemFormattedFinalPriceWithQuantity(item)}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }

  return (
    <section className="trk" style={backgroundColor ? { backgroundColor } : undefined}>
      <div className="trk__body">
        {/* tracking-intro */}
        <div className="trk__intro">
          {title && <h1 className={cx("trk__title", TEXT.h2)}>{title}</h1>}
          {text && <p className={cx("trk__text", TEXT.body)}>{text}</p>}
          <form className="trk__form" onSubmit={onSubmit} noValidate>
            <FormField
              label={emailLabel}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder={emailPlaceholder}
              value={form.email?.value ?? ""}
              error={form.email?.hasError ? form.email.message || undefined : undefined}
              onInput={(v) => setOrderTrackingFormEmail(form, v)}
            />
            <FormField
              label={orderNumberLabel}
              name="order-number"
              autoComplete="off"
              value={form.orderNumber?.value ?? ""}
              error={form.orderNumber?.hasError ? form.orderNumber.message || undefined : undefined}
              onInput={(v) => setOrderTrackingFormOrderNumber(form, v)}
            />
            {/* tracking-button · I-TRK-01 · M-11 */}
            <Button
              type="submit"
              fullWidth
              label={form.isSubmitting ? submittingText : submitText}
              state={form.isSubmitting ? "loading" : "idle"}
            />
          </form>
        </div>

        <div className="trk__side" aria-live="polite">
          {view === "result" && result}
          {view === "notFound" && (
            /* tracking-not-found */
            <div className="trk__card trk__card--danger" role="alert">
              <Icon name="search-x" size={24} className="trk__card-icon" />
              <p className={cx("trk__card-text", TEXT.ui)}>{notFoundText}</p>
            </div>
          )}
          {view === "empty" && placeholderText && (
            /* tracking-placeholder */
            <div className="trk__card trk__card--empty">
              <Icon name="package-search" size={24} className="trk__card-icon" />
              <p className={cx("trk__card-text", TEXT.ui)}>{placeholderText}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default OrderTracking;
