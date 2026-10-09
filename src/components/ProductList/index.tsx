import { useEffect, useRef, useState } from "preact/hooks";
import {
  IkasProduct,
  IkasProductList,
  IkasProductListSortType,
  Router,
  clearProductListFilter,
  clearProductListFilters,
  customerStore,
  getCategoryPath,
  getFavoriteProducts,
  getFilterDisplayedValues,
  getIkasCategoryHref,
  getProductListFilterCategories,
  getProductListNextPage,
  getProductListPrevPage,
  getProductListSortOptions,
  getProductVariantFinalPrice,
  getSelectedProductVariant,
  handleFilterValueClick,
  handleNumberRangeOptionClick,
  hasCustomer,
  hasProductListAppliedFilters,
  hasProductListNextPage,
  hasProductListPrevPage,
  isProductListSearch,
  onFilterCategoryClick,
  setSortType,
  waitForCustomerStoreInit,
  withRoutePrefix,
} from "@ikas/bp-storefront";
import Breadcrumbs, { type BreadcrumbItem } from "../../sub-components/Breadcrumbs";
import Button from "../../sub-components/Button";
import FilterDrawer from "../../sub-components/FilterDrawer";
import FilterPanel, { currencyFormatter, filterValueLabel, formatRange, type FilterPanelTexts } from "../../sub-components/FilterPanel";
import Icon from "../../sub-components/Icon";
import ProductCard from "../../sub-components/ProductCard";
import { cx } from "../../utils/cx";
import { prefersReducedMotion } from "../../utils/hooks";
import { BREAKPOINT, TEXT } from "../../utils/tokens";
import { UI_EVENT, onUi } from "../../utils/ui";
import { Props } from "./types";

type Mode = "category" | "search" | "favorites";
type Chip = { key: string; label: string; remove: () => void };
type FavSort = "default" | "price-asc" | "price-desc";
type SortOption = { value: string; label: string; isSelected: boolean };

const finalPrice = (p: IkasProduct) => {
  const v = getSelectedProductVariant(p);
  return v ? (getProductVariantFinalPrice(v) as unknown as number) : 0;
};

/** Active filter chips (desktop/tablet filter bar) — one per selected value / range / sub-category. */
function activeChips(list: IkasProductList, texts: Pick<FilterPanelTexts, "inStockText" | "outOfStockText">): Chip[] {
  const chips: Chip[] = [];
  if (list.pageType !== "CATEGORY") {
    for (const cat of getProductListFilterCategories(list)) {
      if (cat.isSelected) chips.push({ key: `cat-${cat.id}`, label: cat.name, remove: () => onFilterCategoryClick(list, cat, true) });
    }
  }
  for (const f of list.filters ?? []) {
    const fmt = currencyFormatter(list, f);
    if (f.displayType === "NUMBER_RANGE") {
      if (f.numberRange)
        chips.push({
          key: `rng-${f.id}`,
          label: `${f.name}: ${formatRange(fmt, f.numberRange.from, f.numberRange.to)}`,
          remove: () => clearProductListFilter(list, f),
        });
    } else if (f.displayType === "NUMBER_RANGE_LIST") {
      for (const opt of f.numberRangeListOptions ?? []) {
        if (opt.isSelected)
          chips.push({
            key: `opt-${f.id}-${opt.key}`,
            label: `${f.name}: ${formatRange(fmt, opt.from, opt.to)}`,
            remove: () => handleNumberRangeOptionClick(list, f, opt),
          });
      }
    } else {
      for (const v of getFilterDisplayedValues(f)) {
        if (v.isSelected)
          chips.push({
            key: `val-${f.id}-${v.id || v.name}`,
            label: f.displayType === "SWATCH" ? v.name : `${f.name}: ${filterValueLabel(f, v.name, texts)}`,
            remove: () => handleFilterValueClick(list, f, v),
          });
      }
    }
  }
  return chips;
}

function hasVisibleFilters(list: IkasProductList) {
  if (getProductListFilterCategories(list).length) return true;
  return (list.filters ?? []).some((f) =>
    f.displayType === "NUMBER_RANGE"
      ? !!f.numberRangeLimit && f.numberRangeLimit.to != null && f.numberRangeLimit.from !== f.numberRangeLimit.to
      : f.displayType === "NUMBER_RANGE_LIST"
        ? !!f.numberRangeListOptions?.length
        : f.displayType !== "DATE_RANGE" && getFilterDisplayedValues(f).length > 0,
  );
}

/**
 * I/Section/ProductList — PLP for category, collection, search and favourites pages.
 * Header (breadcrumbs, title, count) · sticky filter bar (I-PLP-01) with active chips and sort ·
 * 280 filter sidebar (240 laptop; tablet/mobile → FilterDrawer) · ProductCard grid (I-PLP-02) ·
 * "load more" with progress (I-PLP-03) · empty / loading / favourites-login states.
 */
export function ProductList(props: Props) {
  const {
    productList,
    pageMode = "category",
    columns = 3,
    showTitle = true,
    inStockText = "Stokta var",
    outOfStockText = "Stokta yok",
    breadcrumbHomeText = "Mağaza",
    breadcrumbAriaLabel = "Sayfa konumu",
    allProductsTitle = "Tüm ürünler",
    searchTitle = "“{query}” için sonuçlar",
    favoritesTitle = "Favorilerin",
    resultsLabel = "ÜRÜN",
    searchResultsLabel = "SONUÇ",
    filterButtonText = "Filtrele",
    hideFiltersText = "Filtreyi gizle",
    showFiltersText = "Filtreyi göster",
    sortLabel = "Sırala",
    clearFiltersText = "Tümünü temizle",
    removeFilterAriaLabel = "Filtreyi kaldır",
    categoryFilterTitle = "Kategori",
    priceMinAriaLabel = "En düşük fiyat",
    priceMaxAriaLabel = "En yüksek fiyat",
    loadMoreText = "Daha fazla göster",
    loadingMoreText = "Yükleniyor…",
    loadPreviousText = "Önceki ürünleri göster",
    emptyTitle = "Burada henüz ürün yok",
    emptyText = "Filtreleri değiştirmeyi ya da başka bir kategoriye bakmayı dene.",
    emptyButtonText = "Tüm ürünler",
    searchEmptyTitle = "“{query}” için sonuç bulunamadı",
    searchEmptyText = "Başka bir kelimeyle aramayı dene.",
    favoritesEmptyText = "Beğendiğin ürünleri kalbe dokunarak buraya ekle.",
    favoritesLoginText = "Favorilerini görmek için giriş yap",
    favoritesLoginSubtext = "Beğendiğin ürünleri kaydet, her cihazdan ulaş.",
    favoritesLoginButtonText = "Giriş yap",
    addToCartAriaLabel = "Sepete ekle",
    favoriteAriaLabel = "Favorilere ekle",
    soldOutText = "Tükendi",
    filterTitle = "Filtrele",
    closeAriaLabel = "Kapat",
    drawerClearText = "Temizle",
    applyFiltersText = "{count} ürünü göster",
    favoritesSortDefaultText = "Önerilen",
    favoritesSortPriceAscText = "Fiyat: Düşükten yükseğe",
    favoritesSortPriceDescText = "Fiyat: Yüksekten düşüğe",
    emptyButtonLink,
    backgroundColor,
  } = props;

  const list = productList ?? null;
  const mode: Mode =
    pageMode === "favorites" ? "favorites" : pageMode === "search" || (list && isProductListSearch(list)) ? "search" : "category";

  const sectionRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [favSort, setFavSort] = useState<FavSort>("default");
  const [fav, setFav] = useState<{ status: "loading" | "guest" | "ready"; items: IkasProduct[] }>({ status: "loading", items: [] });

  // Favourites: a fetched snapshot (no store field); re-fetched when the customer changes.
  const customerId = customerStore.customer?.id ?? null;
  useEffect(() => {
    if (mode !== "favorites") return;
    let cancelled = false;
    (async () => {
      await waitForCustomerStoreInit(customerStore);
      if (cancelled) return;
      if (!hasCustomer(customerStore)) {
        setFav({ status: "guest", items: [] });
        return;
      }
      setFav((f) => ({ ...f, status: "loading" }));
      const items = await getFavoriteProducts(customerStore).catch(() => [] as IkasProduct[]);
      if (!cancelled) setFav({ status: "ready", items: items ?? [] });
    })();
    return () => {
      cancelled = true;
    };
  }, [mode, customerId]);

  // Any element can open the drawer (e.g. a header shortcut).
  useEffect(() => onUi(UI_EVENT.openFilter, () => setDrawerOpen(true)), []);

  // I-PLP-01 · M-18: the bar sticks under the header; `is-stuck` swaps in the opaque bar style.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      const top = parseFloat(getComputedStyle(bar).top) || 0;
      const rect = bar.getBoundingClientRect();
      setStuck(rect.top <= top + 0.5 && window.scrollY > 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [mode]);

  const isTouchLayout = () => window.matchMedia(`(max-width: ${BREAKPOINT.tablet}px)`).matches;

  const scrollToGrid = () => {
    const el = bodyRef.current;
    if (!el || el.getBoundingClientRect().top >= 0) return;
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  };

  const onFilterButton = () => {
    if (isTouchLayout()) setDrawerOpen(true);
    else setSidebarOpen((v) => !v);
  };

  const onLoadMore = async () => {
    if (!list || loadingMore) return;
    setLoadingMore(true);
    try {
      await getProductListNextPage(list);
    } finally {
      setLoadingMore(false);
    }
  };

  // ---- data -----------------------------------------------------------------------------------
  const isFav = mode === "favorites";
  const favItems =
    favSort === "default"
      ? fav.items
      : fav.items.slice().sort((a, b) => (favSort === "price-asc" ? 1 : -1) * (finalPrice(a) - finalPrice(b)));
  const items: IkasProduct[] = isFav ? favItems : list?.data ?? [];
  const keyword = list?.searchKeyword ?? "";
  const category = list?.category ?? null;
  const brand = list?.brand ?? null;
  const total = isFav ? (fav.status === "ready" ? fav.items.length : 0) : list?.count ?? 0;
  const initialLoading = isFav ? fav.status === "loading" : !!list && !list.isInitialized;
  // yükleniyor: the grid dims to 0.4 for any refetch, "load more" included.
  const refreshing = !isFav && !!list?.isLoading;
  const showFilters = !isFav && !!list && hasVisibleFilters(list);
  const applied = !isFav && !!list && hasProductListAppliedFilters(list);
  const chips = !isFav && list ? activeChips(list, { inStockText, outOfStockText }) : [];
  // Favourites get no ikas list (no filters, no sort) — the canvas bar's sort is done client-side.
  const sortOptions: SortOption[] = isFav
    ? ([
        ["default", favoritesSortDefaultText],
        ["price-asc", favoritesSortPriceAscText],
        ["price-desc", favoritesSortPriceDescText],
      ] as const)
        .filter(([, label]) => !!label)
        .map(([value, label]) => ({ value, label, isSelected: value === favSort }))
    : list
      ? getProductListSortOptions(list)
      : [];
  const selectedSort = sortOptions.find((o) => o.isSelected) ?? sortOptions[0];
  const onSort = (value: string) => {
    if (isFav) setFavSort(value as FavSort);
    else if (list) setSortType(list, value as IkasProductListSortType);
  };
  const cols = Math.min(Math.max(Math.round(columns || 3), 2), 4);

  const title =
    mode === "favorites"
      ? favoritesTitle
      : mode === "search"
        ? keyword
          ? searchTitle.replace("{query}", keyword)
          : allProductsTitle
        : category?.name || brand?.name || allProductsTitle;
  const countLabel = `${total} ${mode === "search" ? searchResultsLabel : resultsLabel}`;

  const home: BreadcrumbItem = { label: breadcrumbHomeText, href: withRoutePrefix("/") };
  let crumbs: BreadcrumbItem[] = [home, { label: title }];
  if (mode === "category" && category) {
    const path = getCategoryPath(category);
    const trail: BreadcrumbItem[] = path.map((p) => ({ label: p.name, href: getIkasCategoryHref(p as any) }));
    if (!path.length || path[path.length - 1].id !== category.id) trail.push({ label: category.name });
    crumbs = [home, ...trail];
  }

  const panelTexts: FilterPanelTexts = { categoryFilterTitle, priceMinAriaLabel, priceMaxAriaLabel, resultsLabel, inStockText, outOfStockText };

  // ---- empty states ---------------------------------------------------------------------------
  const isEmpty = !initialLoading && !refreshing && items.length === 0;
  let empty: { title: string; text: string; button: string; href?: string; onClick?: () => void } | null = null;
  if (isEmpty) {
    if (isFav && fav.status === "guest")
      empty = {
        title: favoritesLoginText,
        text: favoritesLoginSubtext,
        button: favoritesLoginButtonText,
        onClick: () => Router.navigateToPage("LOGIN"),
      };
    else if (isFav) empty = { title: emptyTitle, text: favoritesEmptyText, button: emptyButtonText, href: emptyButtonLink?.href };
    else
      empty = {
        title: mode === "search" && keyword ? searchEmptyTitle.replace("{query}", keyword) : emptyTitle,
        text: mode === "search" ? searchEmptyText : emptyText,
        button: emptyButtonText,
        ...(applied && list ? { onClick: () => clearProductListFilters(list) } : { href: emptyButtonLink?.href }),
      };
  }

  const shown = items.length;
  const progress = total > 0 ? Math.min(1, shown / total) : 0;

  return (
    <section
      ref={sectionRef}
      className={cx("plp", showFilters && sidebarOpen && "plp--sidebar")}
      style={{ ...(backgroundColor ? { backgroundColor } : {}), "--plp-cols": cols } as any}
    >
      {/* list-header */}
      <header className="plp__header">
        <Breadcrumbs items={crumbs} ariaLabel={breadcrumbAriaLabel} />
        <div className="plp__title-row">
          {/* Off when a cover (CollectionHero, its own h1) above already shows the title. */}
          {showTitle && <h1 className={cx("plp__title", TEXT.h2)}>{title}</h1>}
          {!initialLoading && <span className={cx("plp__count", TEXT.label, "tabular")}>{countLabel}</span>}
        </div>
      </header>

      {/* filter-bar · I-PLP-01 · M-18 */}
      {(isFav || (list && (showFilters || sortOptions.length > 1))) && (
        <div ref={barRef} className={cx("plp__bar", stuck && "is-stuck")}>
          <div className="plp__bar-left">
            {showFilters && (
              <button
                type="button"
                className="plp__fbtn"
                aria-controls="plp-sidebar"
                aria-expanded={sidebarOpen}
                onClick={onFilterButton}
              >
                <Icon name="sliders" size={16} />
                <span className={cx("plp__fbtn-desktop", TEXT.ui)}>{sidebarOpen ? hideFiltersText : showFiltersText}</span>
                <span className={cx("plp__fbtn-touch", TEXT.ui)}>{filterButtonText}</span>
              </button>
            )}
            {chips.map((chip) => (
              <span key={chip.key} className="plp__chip">
                <span className={cx("plp__chip-label", TEXT.uiSm)}>{chip.label}</span>
                <button
                  type="button"
                  className="plp__chip-x"
                  aria-label={`${removeFilterAriaLabel}: ${chip.label}`}
                  onClick={() => {
                    chip.remove();
                    scrollToGrid();
                  }}
                >
                  <Icon name="x" size={12} />
                </button>
              </span>
            ))}
            {applied && (
              <button type="button" className={cx("plp__clear", TEXT.uiSm)} onClick={() => list && clearProductListFilters(list)}>
                {clearFiltersText}
              </button>
            )}
          </div>
          {sortOptions.length > 1 && (
            <label className="plp__sort">
              <span className={cx("plp__sort-label", TEXT.ui)} aria-hidden="true">
                <span className="plp__sort-desktop">
                  {sortLabel}
                  {selectedSort ? `: ${selectedSort.label}` : ""}
                </span>
                <span className="plp__sort-touch">{sortLabel}</span>
              </span>
              <Icon name="chevron-down" size={14} />
              <select
                className="plp__sort-select"
                aria-label={sortLabel}
                value={selectedSort?.value}
                onChange={(e) => onSort((e.currentTarget as HTMLSelectElement).value)}
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>
      )}

      {/* list-body */}
      <div ref={bodyRef} className="plp__body">
        {showFilters && list && (
          <aside id="plp-sidebar" className="plp__sidebar" aria-label={filterTitle}>
            <FilterPanel productList={list} texts={panelTexts} variant="sidebar" idPrefix="plp-side" onChange={scrollToGrid} />
          </aside>
        )}

        <div className="plp__main">
          {!isFav && list && hasProductListPrevPage(list) && items.length > 0 && (
            <div className="plp__prev">
              <Button
                label={list.isLoading ? loadingMoreText : loadPreviousText}
                variant="outline"
                size="sm"
                state={list.isLoading ? "loading" : "idle"}
                onClick={() => getProductListPrevPage(list)}
              />
            </div>
          )}

          {initialLoading ? (
            /* no skeleton on the canvas: the grid area stays empty until the first page arrives */
            <div className="plp__grid is-refreshing" aria-busy="true" aria-label={loadingMoreText} />
          ) : empty ? (
            /* list-empty */
            <div className="plp__empty">
              <h2 className={cx("plp__empty-title", TEXT.h3)}>{empty.title}</h2>
              {empty.text && <p className={cx("plp__empty-text", TEXT.body)}>{empty.text}</p>}
              {empty.button && (empty.href || empty.onClick) && (
                <Button label={empty.button} href={empty.href} onClick={empty.onClick ? () => empty?.onClick?.() : undefined} />
              )}
            </div>
          ) : (
            /* list-grid · I-PLP-02 · M-01: grid dims to 0.4 while a filter refetch runs */
            <div className={cx("plp__grid", refreshing && "is-refreshing")} aria-busy={refreshing || undefined}>
              {items.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCartAriaLabel={addToCartAriaLabel}
                  favoriteAriaLabel={favoriteAriaLabel}
                  soldOutText={soldOutText}
                  priority={i < cols}
                  sizes="(max-width: 767px) 50vw, (max-width: 991px) 33vw, 25vw"
                  onFavoriteRemove={
                    isFav ? () => setFav((f) => ({ ...f, items: f.items.filter((p) => p.id !== product.id) })) : undefined
                  }
                />
              ))}
            </div>
          )}

          {/* list-pagination */}
          {!isFav && list && !initialLoading && shown > 0 && total > 0 && (
            <div className="plp__pagination">
              <span className={cx("plp__progress", TEXT.label, "tabular")}>{`${shown} / ${total}`}</span>
              <span className="plp__progress-bar" aria-hidden="true">
                <span className="plp__progress-fill" style={{ transform: `scaleX(${progress})` }} />
              </span>
              {hasProductListNextPage(list) && (
                /* load-more-button · I-PLP-03 · M-11 via Button */
                <Button
                  label={loadingMore ? loadingMoreText : loadMoreText}
                  variant="outline"
                  state={loadingMore ? "loading" : "idle"}
                  onClick={onLoadMore}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {showFilters && list && (
        <FilterDrawer
          productList={list}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          idPrefix="plp-drawer"
          panelTexts={panelTexts}
          texts={{
            filterTitle,
            closeAriaLabel,
            clearText: drawerClearText,
            applyText: applyFiltersText,
            loadingText: loadingMoreText,
          }}
        />
      )}
    </section>
  );
}

export default ProductList;
