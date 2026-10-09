import { useState } from "preact/hooks";
import {
  IkasProduct,
  Router,
  addIkasProductToFavorites,
  createMediaSrcset,
  customerStore,
  getDefaultSrc,
  getProductHref,
  getProductVariantFormattedFinalPrice,
  getProductVariantMainImage,
  getSelectedProductVariant,
  hasCustomer,
  isFavoriteIkasProduct,
  removeIkasProductFromFavorites,
} from "@ikas/bp-storefront";
import FavoriteButton from "../../sub-components/FavoriteButton";
import Icon from "../../sub-components/Icon";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import { UI_EVENT, emitUi } from "../../utils/ui";
import { Props } from "./types";

const pad = (n: number) => String(n).padStart(2, "0");

function mainImage(product: IkasProduct) {
  const variant = getSelectedProductVariant(product);
  return variant ? getProductVariantMainImage(variant)?.image ?? null : null;
}

/**
 * I/Section/Bestsellers › BestsellerTab — one tab of the Bestsellers COMPONENT_LIST: ranked rows
 * (bestseller-row) + the preview of the active row (bestsellers-preview). The parent reads
 * `data-btab-label` for its Tabs bar and writes `data-state="active"` onto the shown panel.
 * I-BEST-04 · M-28 row hover · I-BEST-05 · M-02 preview cross-fade · I-BEST-06 · M-28 cart ring.
 */
export function BestsellerTab({
  label = "Giyim",
  addToCartAriaLabel = "Sepete ekle",
  favoriteAriaLabel = "Favorilere ekle",
  products,
}: Props) {
  const items = products?.data ?? [];
  const [active, setActive] = useState(0);
  const current = items[Math.min(active, Math.max(items.length - 1, 0))] ?? null;

  const onFavorite = async (product: IkasProduct) => {
    if (!hasCustomer(customerStore)) {
      Router.navigateToPage("LOGIN");
      return;
    }
    if (isFavoriteIkasProduct(product)) await removeIkasProductFromFavorites(product);
    else await addIkasProductToFavorites(product);
  };

  return (
    <div className="btab" data-btab-label={label}>
      {/* bestsellers-rows */}
      <ol className="btab__rows">
        {items.map((product, i) => {
          const variant = getSelectedProductVariant(product);
          const image = mainImage(product);
          const price = variant ? (getProductVariantFormattedFinalPrice(variant) as unknown as string) : "";
          const isActive = product === current;
          return (
            <li
              key={product.id}
              className={cx("btab__row", isActive && "is-active")}
              style={{ "--i": i } as any}
              onMouseEnter={() => setActive(i)}
              onFocusCapture={() => setActive(i)}
            >
              <a className="btab__link" href={getProductHref(product)}>
                <span className={cx("btab__rank", TEXT.label, "tabular")}>{pad(i + 1)}</span>
                <span className="btab__media">
                  {image ? (
                    <img
                      className="btab__img"
                      src={getDefaultSrc(image)}
                      srcSet={createMediaSrcset(image)}
                      sizes="(max-width: 991px) 96px, 80px"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <Icon name="mountain" size={20} />
                  )}
                </span>
                <span className="btab__info">
                  <span className={cx("btab__name", TEXT.h4)}>{product.name}</span>
                  <span className={cx("btab__price", TEXT.price, "tabular")}>{price}</span>
                </span>
              </a>
              <button
                type="button"
                className="btab__cart"
                aria-label={addToCartAriaLabel}
                onClick={(e) => {
                  e.preventDefault();
                  emitUi(UI_EVENT.openQuickBuy, { product });
                }}
              >
                <Icon name="bag" size={16} />
              </button>
            </li>
          );
        })}
      </ol>

      {/* bestsellers-preview — follows the active row */}
      {current && (
        <div className="btab__preview">
          <a className="btab__preview-link" href={getProductHref(current)} aria-label={current.name} tabIndex={-1}>
            {items.map((product) => {
              const image = mainImage(product);
              if (!image) return null;
              return (
                <img
                  key={product.id}
                  className={cx("btab__preview-img", product === current && "is-active")}
                  src={getDefaultSrc(image)}
                  srcSet={createMediaSrcset(image)}
                  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 440px, 560px"
                  alt={product === current ? product.name : ""}
                  loading={product === current ? "eager" : "lazy"}
                  decoding="async"
                />
              );
            })}
          </a>
          <FavoriteButton
            className="btab__fav"
            active={isFavoriteIkasProduct(current)}
            ariaLabel={favoriteAriaLabel}
            onToggle={() => onFavorite(current)}
          />
        </div>
      )}
    </div>
  );
}

export default BestsellerTab;
