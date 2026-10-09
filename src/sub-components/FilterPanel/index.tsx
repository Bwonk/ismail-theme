import { useState } from "preact/hooks";
import {
  IkasApplicableProductFilterValue,
  IkasFilterCategory,
  IkasProductFilter,
  IkasProductList,
  formatCurrency,
  getFilterDisplayedValues,
  getIkasFilterThumbnailImage,
  getProductListCurrencyCode,
  getProductListCurrencySymbol,
  getProductListFilterCategories,
  getProductListInitialData,
  handleFilterValueClick,
  isStockFilter,
  handleNumberRangeOptionClick,
  onFilterCategoryClick,
  onNumberRangeFilterChange,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { cx } from "../../utils/cx";
import { TEXT, upperTr } from "../../utils/tokens";
import AccordionItem from "../AccordionItem";
import Checkbox from "../Checkbox";
import PriceRange from "../PriceRange";
import VariantChip from "../VariantChip";
import VariantSwatch from "../VariantSwatch";

export interface FilterPanelTexts {
  categoryFilterTitle: string;
  priceMinAriaLabel: string;
  priceMaxAriaLabel: string;
  /** "ÜRÜN" — appended to the swatch value count ("SİYAH · 24 ÜRÜN"). */
  resultsLabel: string;
  /** Labels for the stock filter's raw values ("in-stock" / "out-of-stock"). */
  inStockText: string;
  outOfStockText: string;
}

/** Readable label of a filter value; the stock filter's values arrive as raw keys. */
export function filterValueLabel(filter: IkasProductFilter, name: string, texts: Pick<FilterPanelTexts, "inStockText" | "outOfStockText">) {
  if (!isStockFilter(filter)) return name;
  if (name === "in-stock") return texts.inStockText;
  if (name === "out-of-stock") return texts.outOfStockText;
  return name;
}

interface Props {
  productList: IkasProductList;
  texts: FilterPanelTexts;
  /** sidebar: category group first, open per desktop settings · drawer: category last, mobile settings. */
  variant: "sidebar" | "drawer";
  idPrefix: string;
  /** Called after any filter change (e.g. scroll the grid into view). */
  onChange?: () => void;
  className?: string;
}

type Fmt = (n: number) => string;

/** Range label for NUMBER_RANGE_LIST options and active chips: "%10+", "750 TL – 1.500 TL". */
export function formatRange(fmt: Fmt, from: number, to?: number | null) {
  return to != null ? `${fmt(from)} – ${fmt(to)}` : `${fmt(from)}+`;
}

export function currencyFormatter(list: IkasProductList, filter: IkasProductFilter): Fmt {
  if (filter.type === "PRICE") {
    const code = getProductListCurrencyCode(list);
    const symbol = getProductListCurrencySymbol(list);
    return (n) => formatCurrency(n, code, symbol);
  }
  if (filter.type === "DISCOUNT_RATIO") return (n) => `%${n}`;
  return (n) => String(n);
}

/** filter-swatch-values — VariantSwatch row + mono label of the hovered / selected value. */
const SwatchValues = observer(function SwatchValues({
  list,
  filter,
  values,
  resultsLabel,
  onChange,
}: {
  list: IkasProductList;
  filter: IkasProductFilter;
  values: IkasApplicableProductFilterValue[];
  resultsLabel: string;
  onChange?: () => void;
}) {
  const [hover, setHover] = useState<IkasApplicableProductFilterValue | null>(null);
  const shown = hover ?? values.find((v) => v.isSelected) ?? null;
  return (
    <div className="fpanel__swatches">
      <div className="fpanel__swatch-row" onMouseLeave={() => setHover(null)}>
        {values.map((fv) => (
          <span key={fv.id || fv.name} onMouseEnter={() => setHover(fv)} onFocusCapture={() => setHover(fv)} onBlurCapture={() => setHover(null)}>
            <VariantSwatch
              label={fv.name}
              color={fv.colorCode ?? null}
              image={getIkasFilterThumbnailImage(fv) ?? null}
              selected={fv.isSelected === true}
              soldOut={fv.resultCount === 0}
              onSelect={() => {
                handleFilterValueClick(list, filter, fv);
                onChange?.();
              }}
            />
          </span>
        ))}
      </div>
      {shown && (
        <span className={cx("fpanel__swatch-label", TEXT.label, "tabular")} aria-live="polite">
          {upperTr(shown.name)}
          {shown.resultCount != null ? ` · ${shown.resultCount} ${resultsLabel}` : ""}
        </span>
      )}
    </div>
  );
});

/** filter-range — NUMBER_RANGE through PriceRange (two boxes + slider). */
const RangeValues = observer(function RangeValues({
  list,
  filter,
  texts,
  idPrefix,
  fmt,
  onChange,
}: {
  list: IkasProductList;
  filter: IkasProductFilter;
  texts: FilterPanelTexts;
  idPrefix: string;
  fmt: Fmt;
  onChange?: () => void;
}) {
  const limit = filter.numberRangeLimit;
  if (!limit || limit.to == null || limit.from === limit.to) return null;
  const min = limit.from;
  const max = limit.to;
  return (
    <PriceRange
      min={min}
      max={max}
      valueMin={filter.numberRange?.from ?? null}
      valueMax={filter.numberRange?.to ?? null}
      formatValue={fmt}
      minAriaLabel={texts.priceMinAriaLabel}
      maxAriaLabel={texts.priceMaxAriaLabel}
      idPrefix={idPrefix}
      disabled={list.isLoading}
      onChange={(v) => {
        onNumberRangeFilterChange(filter, v.min == null && v.max == null ? null : { from: v.min ?? min, to: v.max ?? max });
        getProductListInitialData(list);
        onChange?.();
      }}
    />
  );
});

const FilterGroup = observer(function FilterGroup({
  list,
  filter,
  texts,
  variant,
  idPrefix,
  fmt,
  onChange,
}: {
  list: IkasProductList;
  filter: IkasProductFilter;
  texts: FilterPanelTexts;
  variant: Props["variant"];
  idPrefix: string;
  fmt: Fmt;
  onChange?: () => void;
}) {
  const values = getFilterDisplayedValues(filter);
  const rangeOptions = filter.numberRangeListOptions ?? [];
  const settings = filter.settings;
  const defaultOpen = settings ? !(variant === "sidebar" ? settings.showCollapsedOnDesktop : settings.showCollapsedOnMobile) : true;

  let body = null;
  switch (filter.displayType) {
    case "SWATCH":
      if (values.length)
        body = <SwatchValues list={list} filter={filter} values={values} resultsLabel={texts.resultsLabel} onChange={onChange} />;
      break;
    case "BOX":
      if (values.length)
        body = (
          <div className="fpanel__chips">
            {values.map((fv) => (
              <VariantChip
                key={fv.id || fv.name}
                label={filterValueLabel(filter, fv.name, texts)}
                selected={fv.isSelected === true}
                soldOut={fv.resultCount === 0}
                onSelect={() => {
                  handleFilterValueClick(list, filter, fv);
                  onChange?.();
                }}
              />
            ))}
          </div>
        );
      break;
    case "NUMBER_RANGE_LIST":
      if (rangeOptions.length)
        body = (
          <div className="fpanel__chips">
            {rangeOptions.map((opt) => (
              <VariantChip
                key={opt.key || `${opt.from}-${opt.to}`}
                label={formatRange(fmt, opt.from, opt.to)}
                selected={opt.isSelected}
                onSelect={() => {
                  handleNumberRangeOptionClick(list, filter, opt);
                  onChange?.();
                }}
              />
            ))}
          </div>
        );
      break;
    case "NUMBER_RANGE":
      body = <RangeValues list={list} filter={filter} texts={texts} idPrefix={`${idPrefix}-${filter.id}`} fmt={fmt} onChange={onChange} />;
      break;
    case "LIST":
      if (values.length)
        body = (
          <div className="fpanel__checks">
            {values.map((fv) => (
              <Checkbox
                key={fv.id || fv.name}
                id={`${idPrefix}-${filter.id}-${fv.id || fv.name}`}
                checked={fv.isSelected === true}
                disabled={fv.resultCount === 0 && !fv.isSelected}
                label={
                  <span className="fpanel__check-label">
                    <span>{filterValueLabel(filter, fv.name, texts)}</span>
                    {fv.resultCount != null && <span className={cx("fpanel__count", TEXT.label, "tabular")}>{fv.resultCount}</span>}
                  </span>
                }
                onChange={() => {
                  handleFilterValueClick(list, filter, fv);
                  onChange?.();
                }}
              />
            ))}
          </div>
        );
      break;
    default:
      body = null;
  }
  if (!body) return null;

  return (
    <AccordionItem id={`${idPrefix}-${filter.id}`} title={filter.name} defaultOpen={defaultOpen} headingLevel={3} className="fpanel__group">
      {body}
    </AccordionItem>
  );
});

/** filter-category-list — sub-categories with result counts; selected = semi-bold. */
const CategoryGroup = observer(function CategoryGroup({
  list,
  categories,
  title,
  defaultOpen,
  idPrefix,
  onChange,
}: {
  list: IkasProductList;
  categories: IkasFilterCategory[];
  title: string;
  defaultOpen: boolean;
  idPrefix: string;
  onChange?: () => void;
}) {
  // On a category page a sub-category navigates; elsewhere (search, brand) it filters in place.
  const disableRoute = list.pageType !== "CATEGORY";
  return (
    <AccordionItem id={`${idPrefix}-categories`} title={title} defaultOpen={defaultOpen} headingLevel={3} className="fpanel__group">
      <ul className="fpanel__cats">
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              type="button"
              className={cx("fpanel__cat", cat.isSelected && "fpanel__cat--on")}
              aria-pressed={cat.isSelected}
              onClick={() => {
                onFilterCategoryClick(list, cat, disableRoute);
                onChange?.();
              }}
            >
              <span className={cx("fpanel__cat-name", TEXT.uiSm)}>{cat.name}</span>
              {cat.resultCount != null && <span className={cx("fpanel__count", TEXT.label, "tabular")}>{cat.resultCount}</span>}
            </button>
          </li>
        ))}
      </ul>
    </AccordionItem>
  );
});

/**
 * Filter groups shared by the ProductList sidebar and FilterDrawer. Every ikas display type is
 * drawn separately: SWATCH → VariantSwatch, BOX → VariantChip, NUMBER_RANGE → PriceRange,
 * NUMBER_RANGE_LIST → range chips, LIST → Checkbox, plus the sub-category list.
 */
const FilterPanel = observer(function FilterPanel({ productList, texts, variant, idPrefix, onChange, className }: Props) {
  const categories = getProductListFilterCategories(productList);
  const filters = (productList.filters ?? []).slice().sort((a, b) => a.order - b.order);
  const categoryGroup =
    categories.length > 0 ? (
      <CategoryGroup
        key="categories"
        list={productList}
        categories={categories}
        title={texts.categoryFilterTitle}
        defaultOpen={variant === "sidebar"}
        idPrefix={idPrefix}
        onChange={onChange}
      />
    ) : null;

  return (
    <div className={cx("fpanel", `fpanel--${variant}`, className)}>
      {variant === "sidebar" && categoryGroup}
      {filters.map((filter, i) => (
        <div key={filter.id} className="fpanel__item" style={{ "--i": i + (variant === "sidebar" && categoryGroup ? 1 : 0) } as any}>
          <FilterGroup
            list={productList}
            filter={filter}
            texts={texts}
            variant={variant}
            idPrefix={idPrefix}
            fmt={currencyFormatter(productList, filter)}
            onChange={onChange}
          />
        </div>
      ))}
      {variant === "drawer" && categoryGroup}
    </div>
  );
});

export default FilterPanel;
