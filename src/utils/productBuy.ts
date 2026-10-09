// Shared buy logic for ProductDetail and QuickBuy: media, price, stock, cart limits,
// bundle stock and the add-to-cart flow (option-set validation → addItemToCart → reset).
import { useEffect, useRef, useState } from "preact/hooks";
import {
  IkasBundleProduct,
  IkasBundleSettings,
  IkasImage,
  IkasProduct,
  IkasProductVariant,
  IkasStorefrontConfig,
  addItemToCart,
  getProductVariantDiscountPercentage,
  getProductVariantFormattedFinalPrice,
  getProductVariantFormattedSellPrice,
  getSelectedProductVariant,
  hasProductStock,
  hasProductVariantDiscount,
  hasProductVariantStock,
  hasValidProductOptionSetValues,
  initProductOptionSetValues,
  isAddToCartEnabled,
  setBundleProductQuantity,
} from "@ikas/bp-storefront";

/** Replaces `{key}` placeholders in merchant copy ("SON {n} ÜRÜN"). */
export function fill(text: string | undefined | null, vars: Record<string, string | number>) {
  return (text ?? "").replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

/** Variant images and videos in merchant order (falls back to nothing → placeholder). */
export function getVariantMedia(variant?: IkasProductVariant | null): IkasImage[] {
  const list = variant?.images ? [...variant.images].sort((a, b) => a.order - b.order) : [];
  return list.map((pi) => pi.image).filter((img): img is IkasImage => !!img);
}

export interface PriceInfo {
  price: string;
  compare: string;
  discount: number;
}

export function getPriceInfo(variant?: IkasProductVariant | null): PriceInfo {
  if (!variant) return { price: "", compare: "", discount: 0 };
  const hasDiscount = hasProductVariantDiscount(variant);
  return {
    price: getProductVariantFormattedFinalPrice(variant),
    compare: hasDiscount ? getProductVariantFormattedSellPrice(variant) : "",
    discount: hasDiscount ? Math.round(Number(getProductVariantDiscountPercentage(variant)) || 0) : 0,
  };
}

/**
 * Per-cart quantity limits of the active sales channel, tightened by the variant stock when
 * overselling is off. `addItemToCart` only clamps new lines, so the stepper enforces them.
 */
export function getProductCartLimits(product: IkasProduct, variant?: IkasProductVariant | null) {
  const channel = product.salesChannels?.find((sc) => sc.id === IkasStorefrontConfig.salesChannelId);
  const min = Math.max(1, channel?.minQuantityPerCart ?? 1);
  let max = channel?.maxQuantityPerCart ?? undefined;
  if (variant && !variant.sellIfOutOfStock && typeof variant.stock === "number" && variant.stock > 0) {
    max = max == null ? variant.stock : Math.min(max, variant.stock);
  }
  return { min, max: max != null ? Math.max(min, max) : undefined };
}

export function adjustBundleProductQuantity(bp: IkasBundleProduct) {
  if (!bp.product) return;
  const variant = getSelectedProductVariant(bp.product);
  const stock = variant.stock ?? 0;
  if (bp.minQuantity === 0 && !hasProductVariantStock(variant)) {
    setBundleProductQuantity(bp, 0);
    return;
  }
  if (stock < 10 && bp.quantity > stock && !variant.sellIfOutOfStock) {
    setBundleProductQuantity(bp, Math.max(stock, bp.minQuantity ?? 0));
  }
}

export function isBundleOutOfStock(settings: IkasBundleSettings) {
  const { products, minBundleQuantity, maxBundleQuantity } = settings;
  if (!products.some((bp) => !!bp.product)) return false;
  const requiredMissing = products.some((bp) => {
    if (!bp.product) return false;
    const v = getSelectedProductVariant(bp.product);
    return !(v ? hasProductVariantStock(v) : false) && bp.minQuantity !== 0;
  });
  if (requiredMissing) return true;
  if (products.every((p) => p.quantity === 0)) return true;
  const total = products.reduce((s, p) => s + p.quantity, 0);
  if (minBundleQuantity != null && total < minBundleQuantity) return true;
  if (maxBundleQuantity != null && total > maxBundleQuantity) return true;
  if (products.some((bp) => bp.minQuantity != null && bp.quantity < bp.minQuantity)) return true;
  if (products.some((bp) => bp.maxQuantity != null && bp.quantity > bp.maxQuantity)) return true;
  return false;
}

/** Sold out for the selected variant (bundle-aware). */
export function isSoldOut(product: IkasProduct, variant?: IkasProductVariant | null) {
  if (!variant) return true;
  if (variant.bundleSettings) return isBundleOutOfStock(variant.bundleSettings) || !isAddToCartEnabled(product);
  return !hasProductStock(product) || !hasProductVariantStock(variant);
}

/** `?editLineID=` — the cart line being edited ("sepeti güncelle"). Client only. */
export function getEditLineId() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("editLineID");
}

/** Pay with ikas is only offered for the TR / TRY routing when the merchant enabled it. */
export function canPayWithIkas() {
  const routing = IkasStorefrontConfig.getCurrentRouting();
  return !!IkasStorefrontConfig.getPayWithIkasUrl() && routing?.locale === "tr" && routing?.currencyCode === "TRY";
}

export type AddResult = "ok" | "options" | "error";

/**
 * Add-to-cart state machine shared by PDP and QuickBuy: busy → added (1.6s) | error.
 * Returns "options" without calling the API when the option set is incomplete.
 */
export function useAddToCart() {
  const [busy, setBusy] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const add = async (product: IkasProduct, variant: IkasProductVariant, quantity: number): Promise<AddResult> => {
    if (busy) return "error";
    setError(false);
    if (product.productOptionSet && !hasValidProductOptionSetValues(product.productOptionSet)) return "options";
    setBusy(true);
    try {
      const result = await addItemToCart(variant, product, quantity);
      if (!result?.success) {
        setError(true);
        return "error";
      }
      if (product.productOptionSet) initProductOptionSetValues(product.productOptionSet);
      setAdded(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setAdded(false), 1600);
      return "ok";
    } catch {
      setError(true);
      return "error";
    } finally {
      setBusy(false);
    }
  };

  return { busy, added, error, add, clearError: () => setError(false) };
}
