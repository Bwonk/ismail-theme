import { useEffect, useState } from "preact/hooks";
import { Router, customerStore, logout, waitForCustomerStoreInit } from "@ikas/bp-storefront";
import AccountAddresses from "../../sub-components/AccountAddresses";
import AccountInfo from "../../sub-components/AccountInfo";
import AccountOrderDetail from "../../sub-components/AccountOrderDetail";
import AccountOrders from "../../sub-components/AccountOrders";
import AccountSettings from "../../sub-components/AccountSettings";
import AccountSkeleton from "../../sub-components/AccountSkeleton";
import Tabs, { type TabItem } from "../../sub-components/Tabs";
import { cx } from "../../utils/cx";
import { BREAKPOINT, TEXT } from "../../utils/tokens";
import { resolveAccountTexts } from "./texts";
import { Props } from "./types";

type View = "info" | "orders" | "addresses" | "settings" | "detail";

/** ikas routes ACCOUNT (/account), ORDERS (/account/orders), ORDER_DETAIL (/account/orders/:id), ADDRESSES (/account/addresses). */
function viewFromPath(): View {
  const path = Router.getCurrentPath() || "";
  if (/\/orders\/[^/?#]+/.test(path)) return "detail";
  if (path.includes("/orders")) return "orders";
  if (path.includes("/addresses")) return "addresses";
  return "info";
}

function useMedia(maxWidth: number) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [maxWidth]);
  return match;
}

/**
 * I/Section/Account — greeting, Tabs (dikey 280 / laptop 220 / tablet+mobil üstte yatay kaydırma)
 * + panel: bilgilerim, siparişler (+ detay, iade), adresler, hesap ayarları.
 * Used on ACCOUNT, ORDERS, ADDRESSES and ORDER_DETAIL; the initial panel follows the URL.
 * I-ACC-01 · M-28 (tab colour muted → text) via Tabs (I-CMP-09).
 */
export function Account(props: Props) {
  const { backgroundColor } = props;
  const t = resolveAccountTexts(props);
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<View>("info");
  const [loggingOut, setLoggingOut] = useState(false);
  // Tabs sit on top (horizontal scroll) from the tablet breakpoint down; CSS does the layout, this fixes aria/keyboard.
  const stacked = useMedia(BREAKPOINT.tablet);
  const mobile = useMedia(BREAKPOINT.mobile);

  useEffect(() => {
    let cancelled = false;
    waitForCustomerStoreInit(customerStore).then(() => {
      if (cancelled) return;
      if (!customerStore.customer) {
        Router.navigateToPage("LOGIN");
        return;
      }
      setView(viewFromPath());
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const firstName = customerStore.customer?.firstName ?? "";

  const tabs: TabItem[] = [
    { value: "info", label: t.infoTabText, panelId: "acc-panel" },
    { value: "orders", label: t.ordersTabText, panelId: "acc-panel" },
    { value: "addresses", label: t.addressesTabText, panelId: "acc-panel" },
    { value: "favorites", label: t.favoritesTabText },
  ].filter((i) => i.label);

  const activeTab = view === "detail" ? "orders" : view === "settings" ? null : view;

  const onTab = (value: string) => {
    if (value === "favorites") {
      Router.navigateToPage("FAVORITE_PRODUCTS");
      return;
    }
    setView(value as View);
  };

  const onLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    await logout(customerStore);
    Router.navigateToPage("INDEX");
  };

  let panel = null;
  if (!ready) panel = <AccountSkeleton label={t.loadingText} />;
  else if (view === "info") panel = <AccountInfo texts={t} />;
  else if (view === "orders") panel = <AccountOrders texts={t} />;
  else if (view === "detail") panel = <AccountOrderDetail texts={t} onBack={() => setView("orders")} />;
  else if (view === "addresses") panel = <AccountAddresses texts={t} />;
  else if (view === "settings") panel = <AccountSettings texts={t} />;

  return (
    <section className="acc" style={backgroundColor ? { backgroundColor } : undefined}>
      <h1 className={cx("acc__header", TEXT.h2)}>
        {t.greetingText && <span className="acc__greeting">{t.greetingText}</span>}
        {firstName && <span className="acc__name">{firstName}</span>}
      </h1>
      <div className="acc__body">
        <nav className="acc__nav" aria-label={t.tabsAriaLabel || undefined}>
          {/* I-ACC-01 · M-28 */}
          <Tabs
            items={tabs}
            value={activeTab}
            onChange={onTab}
            orientation={stacked ? "horizontal" : "vertical"}
            ariaLabel={t.tabsAriaLabel || undefined}
            idPrefix="acc-tab"
            className="acc__tabs"
          />
          {t.settingsTabText && (
            <button
              type="button"
              className={cx("acc__link", view === "settings" && "acc__link--active", mobile ? TEXT.uiSm : TEXT.ui)}
              aria-current={view === "settings" ? "page" : undefined}
              onClick={() => setView("settings")}
            >
              {t.settingsTabText}
            </button>
          )}
          {t.logoutText && (
            <button
              type="button"
              className={cx("acc__link", mobile ? TEXT.uiSm : TEXT.ui)}
              disabled={loggingOut}
              aria-busy={loggingOut}
              onClick={onLogout}
            >
              {t.logoutText}
            </button>
          )}
        </nav>
        <div
          id="acc-panel"
          key={ready ? view : "loading"}
          className="acc__panel"
          role={activeTab ? "tabpanel" : undefined}
          aria-labelledby={activeTab ? `acc-tab-${activeTab}` : undefined}
        >
          {panel}
        </div>
      </div>
    </section>
  );
}

export default Account;
