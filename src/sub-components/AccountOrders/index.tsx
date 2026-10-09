import { useEffect, useRef, useState } from "preact/hooks";
import {
  IkasOrder,
  IkasOrderPackageStatus,
  customerStore,
  getIkasOrderFormattedOrderedAt,
  getIkasOrderFormattedTotalFinalPrice,
  getIkasOrderHref,
  getIkasOrderPackageStatusTranslation,
  getOrders,
} from "@ikas/bp-storefront";
import type { AccountTexts } from "../../components/Account/texts";
import { cx } from "../../utils/cx";
import { TEXT, upperTr } from "../../utils/tokens";
import AccountSkeleton from "../AccountSkeleton";
import ArrowLink from "../ArrowLink";
import Badge from "../Badge";
import Button from "../Button";
import Icon from "../Icon";

interface Props {
  texts: AccountTexts;
}

type BadgeTone = "default" | "new" | "sale" | "soldout";

/** In-progress statuses use the filled (inverse) badge like "KARGODA"; finished = outline; cancelled/refunded = muted. */
export function orderStatusTone(status?: IkasOrderPackageStatus | null): BadgeTone {
  switch (status) {
    case "DELIVERED":
    case "RETURN_DELIVERED":
      return "default";
    case "CANCELLED":
    case "REFUNDED":
    case "UNABLE_TO_DELIVER":
    case "REFUND_REJECTED":
    case "CANCEL_REJECTED":
    case "RETURN_REJECTED":
      return "soldout";
    default:
      return "new";
  }
}

/** I/Section/Account › orders-list / orders-empty / orders-error / account-skeleton. */
export default function AccountOrders({ texts: t }: Props) {
  const [orders, setOrders] = useState<IkasOrder[]>([]);
  const [state, setState] = useState<"loading" | "error" | "ready">("loading");
  const alive = useRef(true);

  const load = () => {
    setState("loading");
    getOrders(customerStore)
      .then((res) => {
        if (!alive.current) return;
        setOrders(res ?? []);
        setState("ready");
      })
      .catch(() => alive.current && setState("error"));
  };

  useEffect(() => {
    alive.current = true;
    load();
    return () => {
      alive.current = false;
    };
  }, []);

  const title = t.ordersTabText ? <h2 className={cx("acc-title", TEXT.h4)}>{t.ordersTabText}</h2> : null;

  if (state === "loading") return <AccountSkeleton label={t.loadingText} />;

  if (state === "error") {
    return (
      <div className="aord__error" role="alert">
        <Icon name="alert" size={24} className="acc-danger" />
        <p className={cx("aord__error-text", TEXT.ui)}>{t.errorText}</p>
        {t.retryText && <Button label={t.retryText} variant="outline" className="acc-btn--strong" onClick={load} />}
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="aord aord--empty">
        {title}
        <p className={cx("acc-muted", TEXT.body)}>{t.ordersEmptyText}</p>
        {t.shopText && <ArrowLink label={t.shopText} href="/" />}
      </div>
    );
  }

  const [colOrder, colDate, colStatus, colTotal] = t.ordersColumnLabels.split(",").map((s) => s.trim());

  return (
    <div className="aord">
      {title}
      <div className="aord__table" role="table">
        <div className="aord__head" role="row">
          <span className={cx("aord__th", TEXT.label)} role="columnheader">{colOrder}</span>
          <span className={cx("aord__th", "aord__date-col", TEXT.label)} role="columnheader">{colDate}</span>
          <span className={cx("aord__th", "aord__status-col", TEXT.label)} role="columnheader">{colStatus}</span>
          <span className={cx("aord__th", "aord__total-col", TEXT.label)} role="columnheader">{colTotal}</span>
        </div>
        {orders.map((order) => {
          const date = upperTr(getIkasOrderFormattedOrderedAt(order) ?? "");
          const status = getIkasOrderPackageStatusTranslation(order) ?? "";
          return (
            <a key={order.id} className="aord__row" href={getIkasOrderHref(order)} role="row">
              <span className="aord__meta" role="cell">
                <span className={cx("aord__number", TEXT.numeral, "tabular")}>{order.orderNumber ? `#${order.orderNumber}` : ""}</span>
                <span className={cx("aord__date", "aord__date--stacked", TEXT.label, "tabular")}>{date}</span>
              </span>
              <span className={cx("aord__date", "aord__date-col", TEXT.label, "tabular")} role="cell">
                {date}
              </span>
              <span className="aord__status-col" role="cell">
                <Badge text={status} tone={orderStatusTone(order.orderPackageStatus)} />
              </span>
              <span className={cx("aord__total", "aord__total-col", TEXT.price, "tabular")} role="cell">
                {getIkasOrderFormattedTotalFinalPrice(order)}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
