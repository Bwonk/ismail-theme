import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "preact/hooks";
import {
  IkasComponentRenderer,
  Router,
  cartStore,
  customerStore,
  getIkasOrderTotalItemCount,
  hasCustomer,
  normalizeSvg,
  withRoutePrefix,
} from "@ikas/bp-storefront";
import CartDrawer from "../../sub-components/CartDrawer";
import CookieBar from "../../sub-components/CookieBar";
import Counter from "../../sub-components/Counter";
import Icon from "../../sub-components/Icon";
import IconButton from "../../sub-components/IconButton";
import QuickBuy from "../../sub-components/QuickBuy";
import { Megamenu, MenuPanel, subLinkColumns } from "../../sub-components/MenuOverlay";
import SearchOverlay from "../../sub-components/SearchOverlay";
import { LOGO_SVG } from "../../utils/brand";
import { cx } from "../../utils/cx";
import { prefersReducedMotion, useCountdown, useMounted } from "../../utils/hooks";
import { fillText, usePresence } from "../../utils/overlay";
import { BREAKPOINT, TEXT, forceScheme } from "../../utils/tokens";
import { UI_EVENT, onUi } from "../../utils/ui";
import { Props } from "./types";

type OverlayName = "menu" | "search" | "cart";

const pad = (n: number) => String(n).padStart(2, "0");
const toList = (v: any): any[] => (Array.isArray(v) ? v : v ? [v] : []).flat().filter(Boolean);
/** First section that may sit under the transparent header (HeroSlider root, or any [data-ism-hero]). */
const HERO_SELECTOR = "[data-ism-hero], .hero";

/**
 * I/Section/Header — announcement bar (countdown chip / rotating announcements) + 72 main bar
 * (logo, nav with megamenu, search / cart / account). Owns MenuOverlay, SearchOverlay,
 * CartDrawer and CookieBar (opened via UI events from src/utils/ui.ts and the header buttons).
 * States: şeffaf (over a hero, Şeffaf scheme) · yapışkan (fixed bar 60/52, announcement scrolled
 * away) · duyurular (pager). Laptop: icon-only actions · tablet: nav → menu button, left panel.
 */
export function Header(props: Props) {
  const {
    logo = LOGO_SVG,
    logoAltText = "İsmail",
    logoMonochrome = true,
    showAnnouncement = true,
    transparentOnHero = true,
    stickyEnabled = true,
    countdownTarget,
    announcementInterval = 4,
    announcementText = "KIŞ 26 SAHA SERİSİ · KARGO BİZDEN",
    countdownAriaLabel = "Kampanyanın bitmesine kalan süre: {time}",
    countdownDaysText = "{d}G",
    announcementPrevAriaLabel = "Önceki duyuru",
    announcementNextAriaLabel = "Sonraki duyuru",
    searchLabel = "Ara",
    cartLabel = "Sepet",
    accountLabel = "Giriş",
    menuAriaLabel = "Menü",
    closeAriaLabel = "Kapat",
    menuFeatureTitle = "Kış 26 saha serisi",
    menuFeatureLinkText = "Koleksiyona git",
    loginText = "Giriş yap",
    registerText = "Kaydol",
    logoutText = "Çıkış yap",
    menuGreetingText = "Merhaba, {name}",
    menuAccountLabel = "Hesabım",
    favoritesLabel = "Favorilerim",
    localeText = "TL · TÜRKÇE",
    searchPlaceholder = "Ürün, kategori ya da koleksiyon ara",
    searchEmptyTitle = "NE ARIYORSUN?",
    searchResultCountText = "{count} SONUÇ",
    searchNoResultText = "Sonuç bulunamadı",
    searchNoResultHint = "Yazımı kontrol et ya da aşağıdaki önerilere göz at.",
    searchAllResultsText = "Tüm sonuçları gör",
    cartTitleText = "Sepetin",
    cartEmptyTitle = "Sepetin boş",
    cartEmptyText = "Rotanı çiz, ekipmanını seç.",
    cartEmptyButtonText = "Alışverişe başla",
    drawerRecommendTitle = "BİRLİKTE İYİ GİDER",
    couponToggleText = "İndirim kodun var mı?",
    couponPlaceholder = "İndirim kodu",
    couponButtonText = "Uygula",
    couponErrorText = "Bu kod geçerli değil.",
    couponAppliedText = "Kod uygulandı: {code}",
    couponRemoveText = "Kaldır",
    cartSubtotalLabel = "Ara toplam",
    cartShippingNote = "Kargo ödeme adımında hesaplanır",
    checkoutButtonText = "Ödemeye geç",
    checkoutLoadingText = "Yönlendiriliyor…",
    cartViewButtonText = "Sepete git",
    editText = "Düzenle",
    removeText = "Kaldır",
    maxQuantityText = "En fazla {max} adet alabilirsin.",
    giftText = "HEDİYE",
    decreaseAriaLabel = "Adedi azalt",
    increaseAriaLabel = "Adedi artır",
    bundlePartsText = "{count} PARÇA",
    cookieContent,
    cookieAcceptText = "Kabul et",
    announcementLink,
    navLinks,
    menuFeatureLink,
    searchSuggestions,
    menuFeatureImage,
    drawerRecommendProducts,
    announcements,
    megamenuColumns,
    backgroundColor,
  } = props;

  const mountedClient = useMounted();
  const rootRef = useRef<HTMLElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const annMaskRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [overlay, setOverlay] = useState<OverlayName | null>(null);
  const [searchTop, setSearchTop] = useState(0);
  const [mega, setMega] = useState<number | null>(null);
  const [lastMega, setLastMega] = useState<number | null>(null);
  const [onHero, setOnHero] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [clear, setClear] = useState(false);
  const [annIndex, setAnnIndex] = useState(0);
  const [annReady, setAnnReady] = useState(false);
  const [annPaused, setAnnPaused] = useState(false);
  const megaPresence = usePresence(mega !== null, 400);

  const links = (navLinks?.links ?? []).filter((l) => l?.label);
  const columns = useMemo(() => toList(megamenuColumns), [megamenuColumns]);
  const annList = useMemo(() => toList(announcements), [announcements]);
  const megaIndex = columns.length ? 0 : -1;
  const pagerMode = annList.length > 1;
  const annCurrent = annList.length ? Math.min(annIndex, annList.length - 1) : 0;

  // ---- logo (SVG prop, normalised; monochrome follows the scheme text colour)
  const svgOptions = (prefix: string) => ({ idPrefix: prefix, ...(logoMonochrome ? { color: "currentColor" as const } : {}) });
  const logoHtml = useMemo(() => (logo ? normalizeSvg(logo, svgOptions("hdr-logo")) : ""), [logo, logoMonochrome]);
  const panelLogoHtml = useMemo(() => (logo ? normalizeSvg(logo, svgOptions("mpanel-logo")) : ""), [logo, logoMonochrome]);

  // ---- store data (root is reactive: the runtime wraps it in autorun)
  const cart = cartStore.cart;
  const itemCount = cart ? getIkasOrderTotalItemCount(cart) : 0;
  const loggedIn = hasCustomer(customerStore);

  // ---- countdown (I-HDR-01 · I-M-01 via Counter)
  const left = useCountdown(countdownTarget || null);
  const showCountdown = !!left && !left.done && !pagerMode;
  const days = left ? Math.floor(left.h / 24) : 0;
  const clock = left ? `${pad(left.h % 24)}:${pad(left.m)}:${pad(left.s)}` : "";
  const countdownValue = left ? (days > 0 ? `${fillText(countdownDaysText, { d: days })} ${clock}` : clock) : "";

  // ---- overlays opened through UI events (ProductCard → openCart, etc.)
  const openOverlay = (name: OverlayName) => {
    if (name === "menu" && window.innerWidth > BREAKPOINT.tablet) return;
    if (name === "search") setSearchTop(barRef.current?.getBoundingClientRect().bottom ?? 0);
    setMega(null);
    setOverlay(name);
  };
  const closeOverlay = () => setOverlay(null);

  useEffect(() => {
    const offs = [
      onUi(UI_EVENT.openCart, () => openOverlay("cart")),
      onUi(UI_EVENT.openSearch, () => openOverlay("search")),
      onUi(UI_EVENT.openMenu, () => openOverlay("menu")),
      onUi(UI_EVENT.closeAll, () => {
        setOverlay(null);
        setMega(null);
      }),
    ];
    return () => offs.forEach((off) => off());
  }, []);

  // ---- transparent over hero: only when a hero section directly follows the header
  useLayoutEffect(() => {
    if (!transparentOnHero) {
      heroRef.current = null;
      setOnHero(false);
      return;
    }
    const root = rootRef.current;
    const hero = document.querySelector<HTMLElement>(HERO_SELECTOR);
    if (!root || !hero) return;
    const gap = hero.getBoundingClientRect().top - root.getBoundingClientRect().bottom;
    if (Math.abs(gap) <= 4 && root.compareDocumentPosition(hero) & Node.DOCUMENT_POSITION_FOLLOWING) {
      heroRef.current = hero;
      setOnHero(true);
    }
  }, [transparentOnHero]);

  // ---- scroll: yapışkan (I-HDR-04 layout) + şeffaf → opak (I-HDR-04 · M-28)
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const slot = slotRef.current;
      const bar = barRef.current;
      if (!slot || !bar) return;
      const slotRect = slot.getBoundingClientRect();
      const isStuck = !!stickyEnabled && slotRect.top < 0;
      setStuck(isStuck);
      const hero = heroRef.current;
      if (onHero && hero) {
        const barBottom = isStuck ? bar.offsetHeight : slotRect.top + slot.offsetHeight;
        setClear(hero.getBoundingClientRect().bottom > barBottom + 1);
      } else setClear(false);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [stickyEnabled, onHero]);

  // ---- announcement rotation (M-04): items stacked in a clip mask, state written on .annc
  useEffect(() => {
    const host = annMaskRef.current;
    if (!host || !pagerMode) return;
    host.querySelectorAll<HTMLElement>(".annc").forEach((el, i) => {
      const prev = (annCurrent - 1 + annList.length) % annList.length;
      const state = i === annCurrent ? "active" : i === prev ? "prev" : "idle";
      el.setAttribute("data-state", state);
      if (i === annCurrent) el.removeAttribute("aria-hidden");
      else el.setAttribute("aria-hidden", "true");
    });
    setAnnReady(true);
  });

  useEffect(() => {
    if (!pagerMode || annPaused || prefersReducedMotion()) return;
    const ms = Math.max(2, Number(announcementInterval) || 4) * 1000;
    const t = setInterval(() => setAnnIndex((i) => (i + 1) % annList.length), ms);
    return () => clearInterval(t);
  }, [pagerMode, annPaused, annList.length, announcementInterval]);

  const stepAnn = (dir: 1 | -1) => setAnnIndex((i) => (i + dir + annList.length) % annList.length);

  // ---- megamenu hover intent (I-MENU-01)
  const openMega = (i: number) => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMega(i);
    setLastMega(i);
  };
  const closeMegaSoon = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    megaTimer.current = setTimeout(() => setMega(null), 150);
  };
  useEffect(() => {
    if (mega === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMega(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mega]);

  const activePath = mountedClient ? window.location.pathname : "";
  const isActive = (href?: string) => {
    if (!href || !activePath) return false;
    try {
      const p = new URL(href, window.location.origin).pathname;
      return p !== "/" && (activePath === p || activePath.startsWith(`${p}/`));
    } catch {
      return false;
    }
  };

  const shownMega = mega ?? lastMega;
  const isClear = clear && !megaPresence.mounted && overlay !== "search";
  const hasAnnouncement = showAnnouncement && (annList.length > 0 || !!announcementText);
  const accountHref = withRoutePrefix(loggedIn ? "/account" : "/account/login");
  const cartAria = `${cartLabel} (${itemCount})`;

  const logoNode = (
    <a
      className="hdr__logo"
      href={withRoutePrefix("/")}
      aria-label={logoAltText}
      onMouseEnter={closeMegaSoon}
      onClick={(e) => {
        e.preventDefault();
        Router.navigateToPage("INDEX");
      }}
    >
      {logoHtml ? <span className="hdr__logo-svg" aria-hidden="true" dangerouslySetInnerHTML={{ __html: logoHtml }} /> : <span className={TEXT.h4}>{logoAltText}</span>}
    </a>
  );

  return (
    <header
      ref={rootRef}
      className={cx("hdr", onHero && "hdr--on-hero", stickyEnabled && "hdr--sticky")}
      style={backgroundColor ? ({ "--hdr-bg": backgroundColor } as any) : undefined}
    >
      {hasAnnouncement && (
        <div
          className={cx("hdr__ann", pagerMode && "hdr__ann--pager")}
          onMouseEnter={() => setAnnPaused(true)}
          onMouseLeave={() => setAnnPaused(false)}
          onFocusIn={() => setAnnPaused(true)}
          onFocusOut={() => setAnnPaused(false)}
        >
          {annList.length > 0 ? (
            <div ref={annMaskRef} className={cx("hdr__ann-mask", pagerMode && "is-stacked", annReady && "is-ready")} aria-live={pagerMode ? "polite" : undefined}>
              <IkasComponentRenderer id="hdr-announcements" className="hdr__ann-renderer" components={annList} parentProps={props} />
            </div>
          ) : announcementLink?.href ? (
            <a className={cx("hdr__ann-text hdr__ann-link", TEXT.label)} href={announcementLink.href}>
              {announcementText}
            </a>
          ) : (
            <span className={cx("hdr__ann-text", TEXT.label)}>{announcementText}</span>
          )}

          {showCountdown && (
            <span className="hdr__countdown">
              <Counter value={countdownValue} textClass={TEXT.label} ariaLabel={fillText(countdownAriaLabel, { time: countdownValue })} />
            </span>
          )}

          {pagerMode && (
            <div className="hdr__pager">
              <button type="button" className="hdr__pager-btn" aria-label={announcementPrevAriaLabel} onClick={() => stepAnn(-1)}>
                <Icon name="chevron-left" size={14} />
              </button>
              <span className={cx("hdr__pager-count", TEXT.label, "tabular")} aria-hidden="true">
                {annCurrent + 1} / {annList.length}
              </span>
              <button type="button" className="hdr__pager-btn" aria-label={announcementNextAriaLabel} onClick={() => stepAnn(1)}>
                <Icon name="chevron-right" size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      <div ref={slotRef} className="hdr__slot">
        <div
          ref={barRef}
          className={cx("hdr__bar", stuck && "is-stuck", isClear && "is-clear", isClear && forceScheme("clear"))}
          onMouseLeave={closeMegaSoon}
        >
          <div className="hdr__main">
            <div className="hdr__left">
              <IconButton icon="menu" iconSize={20} ariaLabel={menuAriaLabel} className="hdr__menu-btn" onClick={() => openOverlay("menu")} />
              {logoNode}
              {links.length > 0 && (
                <nav className="hdr__nav header-nav" aria-label={menuAriaLabel}>
                  <ul className="hdr__nav-list">
                    {links.map((link, i) => {
                      const hasMega = i === megaIndex || (link.subLinks?.length ?? 0) > 0;
                      return (
                        <li
                          key={`${link.label}-${i}`}
                          className="hdr__nav-item"
                          onMouseEnter={() => (hasMega ? openMega(i) : closeMegaSoon())}
                        >
                          {/* I-HDR-02 · M-28: muted → text, active page underlined */}
                          <a
                            className={cx("hdr__nav-link", TEXT.ui, isActive(link.href) && "is-active", mega === i && "is-open")}
                            href={link.href}
                            aria-current={isActive(link.href) ? "page" : undefined}
                            aria-haspopup={hasMega ? "true" : undefined}
                            aria-expanded={hasMega ? mega === i : undefined}
                            aria-controls={hasMega ? "hdr-mega" : undefined}
                            onFocus={() => (hasMega ? openMega(i) : setMega(null))}
                            onKeyDown={(e) => {
                              if (hasMega && e.key === "ArrowDown") {
                                e.preventDefault();
                                openMega(i);
                                requestAnimationFrame(() => document.querySelector<HTMLElement>("#hdr-mega a")?.focus());
                              }
                            }}
                            {...(link.openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          >
                            {link.label}
                            {hasMega && <Icon name="chevron-down" size={14} className="hdr__caret" />}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>
              )}
            </div>

            <div className="hdr__actions" onMouseEnter={closeMegaSoon} onFocusIn={() => setMega(null)}>
              <button type="button" className="hdr__action hdr__action--search" aria-label={searchLabel} onClick={() => openOverlay("search")}>
                <Icon name="search" size={18} className="hdr__action-icon" />
                <span className={cx("hdr__action-label search-button-label", TEXT.ui)} aria-hidden="true">
                  {searchLabel}
                </span>
              </button>
              <button type="button" className="hdr__action hdr__action--cart" aria-label={cartAria} onClick={() => openOverlay("cart")}>
                <Icon name="bag" size={18} className="hdr__action-icon" />
                <span className={cx("hdr__action-label cart-button-label", TEXT.ui)} aria-hidden="true">
                  {cartLabel}
                </span>
                {itemCount > 0 && (
                  <span className="hdr__count" aria-hidden="true">
                    {/* I-HDR-03 · I-M-01: digits roll on change */}
                    <Counter value={itemCount} textClass={TEXT.badge} />
                  </span>
                )}
              </button>
              <a
                className="hdr__action hdr__action--account account-button"
                href={accountHref}
                aria-label={loggedIn ? menuAccountLabel : accountLabel}
                onClick={(e) => {
                  e.preventDefault();
                  Router.navigateToPage(loggedIn ? "ACCOUNT" : "LOGIN");
                }}
              >
                <Icon name="user" size={18} className="hdr__action-icon" />
                <span className={cx("hdr__action-label", TEXT.ui)} aria-hidden="true">
                  {loggedIn ? menuAccountLabel : accountLabel}
                </span>
              </a>
            </div>
          </div>

          <Megamenu
            id="hdr-mega"
            open={mega !== null}
            columns={shownMega === megaIndex ? columns : null}
            linkColumns={shownMega !== null && shownMega !== megaIndex ? subLinkColumns(links[shownMega]) : []}
            feature={{ image: menuFeatureImage, title: menuFeatureTitle, linkText: menuFeatureLinkText, href: menuFeatureLink?.href }}
            parentProps={props}
            onMouseEnter={() => shownMega !== null && openMega(shownMega)}
            onMouseLeave={closeMegaSoon}
            onClose={() => setMega(null)}
          />
        </div>
      </div>

      <div className={cx("hdr__scrim", mega !== null && "is-open")} onClick={() => setMega(null)} aria-hidden="true" />

      <MenuPanel
        open={overlay === "menu"}
        onClose={closeOverlay}
        logoHtml={panelLogoHtml}
        logoAltText={logoAltText}
        navLinks={links}
        megaIndex={megaIndex}
        columns={columns}
        parentProps={props}
        closeAriaLabel={closeAriaLabel}
        loginText={loginText}
        registerText={registerText}
        logoutText={logoutText}
        menuGreetingText={menuGreetingText}
        menuAccountLabel={menuAccountLabel}
        favoritesLabel={favoritesLabel}
        localeText={localeText}
      />

      <SearchOverlay
        open={overlay === "search"}
        onClose={closeOverlay}
        top={searchTop}
        suggestions={searchSuggestions?.links ?? []}
        searchPlaceholder={searchPlaceholder}
        closeAriaLabel={closeAriaLabel}
        searchEmptyTitle={searchEmptyTitle}
        searchResultCountText={searchResultCountText}
        searchNoResultText={searchNoResultText}
        searchNoResultHint={searchNoResultHint}
        searchAllResultsText={searchAllResultsText}
      />

      <CartDrawer
        open={overlay === "cart"}
        onClose={closeOverlay}
        recommendProducts={drawerRecommendProducts}
        closeAriaLabel={closeAriaLabel}
        cartTitleText={cartTitleText}
        cartEmptyTitle={cartEmptyTitle}
        cartEmptyText={cartEmptyText}
        cartEmptyButtonText={cartEmptyButtonText}
        drawerRecommendTitle={drawerRecommendTitle}
        couponToggleText={couponToggleText}
        couponPlaceholder={couponPlaceholder}
        couponButtonText={couponButtonText}
        couponErrorText={couponErrorText}
        couponAppliedText={couponAppliedText}
        couponRemoveText={couponRemoveText}
        cartSubtotalLabel={cartSubtotalLabel}
        cartShippingNote={cartShippingNote}
        checkoutButtonText={checkoutButtonText}
        checkoutLoadingText={checkoutLoadingText}
        cartViewButtonText={cartViewButtonText}
        editText={editText}
        removeText={removeText}
        maxQuantityText={maxQuantityText}
        giftText={giftText}
        decreaseAriaLabel={decreaseAriaLabel}
        increaseAriaLabel={increaseAriaLabel}
        bundlePartsText={bundlePartsText}
      />

      {/* QuickBuy listens to UI_EVENT.openQuickBuy itself and hands over to CartDrawer after a successful add. */}
      <QuickBuy
        showPayWithIkas={props.quickBuyPayWithIkas ?? true}
        texts={{
          closeAriaLabel,
          chooseOptionText: props.qbChooseOptionText,
          addText: props.qbAddText,
          addingText: props.qbAddingText,
          addedText: props.qbAddedText,
          soldOutText: props.qbSoldOutText,
          addErrorText: props.qbAddErrorText,
          detailLinkText: props.qbDetailLinkText,
          lowStockText: props.qbLowStockText,
          prevAriaLabel: props.qbPrevAriaLabel,
          nextAriaLabel: props.qbNextAriaLabel,
          favoriteAriaLabel: props.qbFavoriteAriaLabel,
          quantityAriaLabel: props.qbQuantityAriaLabel,
          decreaseAriaLabel: props.qbDecreaseAriaLabel,
          increaseAriaLabel: props.qbIncreaseAriaLabel,
        }}
      />

      <CookieBar content={cookieContent} acceptText={cookieAcceptText} closeAriaLabel={closeAriaLabel} />
    </header>
  );
}

export default Header;
