import { useRef } from "preact/hooks";
import Button from "../../sub-components/Button";
import ProductCard from "../../sub-components/ProductCard";
import SectionHeading from "../../sub-components/SectionHeading";
import { cx } from "../../utils/cx";
import { useReveal } from "../../utils/hooks";
import { Props } from "./types";

/** I/Section/ProductGrid — heading, 4×2 card grid (3×2 tablet, 2 cols mobile), "see all" button. */
export function ProductGrid({
  title = "Yeni gelenler",
  subtitle = "Rüzgâra, yağmura ve uzun günlere göre seçildi.",
  buttonText = "Tümünü gör",
  addToCartAriaLabel = "Sepete ekle",
  favoriteAriaLabel = "Favorilere ekle",
  soldOutText = "Tükendi",
  products,
  buttonLink,
  maxItems = 8,
  mobileMaxItems = 4,
  columns = 4,
  showSubtitle = true,
  showButton = true,
  backgroundColor,
}: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const reveal = useReveal(listRef);
  const items = (products?.data ?? []).slice(0, Math.max(1, maxItems));
  const cols = Math.min(Math.max(columns || 4, 2), 6);

  return (
    <section className="pgrid" style={backgroundColor ? { backgroundColor } : undefined}>
      <SectionHeading title={title} subtitle={showSubtitle ? subtitle : undefined} />
      {items.length > 0 && (
        <div
          ref={listRef}
          className={cx("pgrid__list", reveal)}
          style={{ "--pgrid-cols": cols, "--pgrid-mobile-max": mobileMaxItems } as any}
        >
          {items.map((product, i) => (
            <div
              key={product.id}
              className={cx("pgrid__item", i >= mobileMaxItems && "pgrid__item--desktop", i >= 6 && "pgrid__item--wide")}
              style={{ "--i": i } as any}
            >
              <ProductCard
                product={product}
                addToCartAriaLabel={addToCartAriaLabel}
                favoriteAriaLabel={favoriteAriaLabel}
                soldOutText={soldOutText}
                priority={i < 4}
              />
            </div>
          ))}
        </div>
      )}
      {showButton && buttonText && buttonLink?.href && (
        <div className="pgrid__actions">
          <Button label={buttonText} href={buttonLink.href} />
        </div>
      )}
    </section>
  );
}

export default ProductGrid;
