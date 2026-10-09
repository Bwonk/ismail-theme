// Per-cart quantity limits for cart lines (adet sınırı).
// IkasOrderLineVariant carries neither salesChannels nor stock, so the full products are
// batch-fetched once with bs_searchProductsById and cached for the session.
import { useEffect, useState } from "preact/hooks";
import { IkasProduct, IkasStorefrontConfig, baseStore, bs_searchProductsById } from "@ikas/bp-storefront";

export interface CartLineLimits {
  min: number;
  max?: number;
}

const products = new Map<string, IkasProduct>();
const requested = new Set<string>();
const listeners = new Set<() => void>();
let pending: string[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;

async function flush() {
  timer = null;
  const batch = pending;
  pending = [];
  const res = await bs_searchProductsById(baseStore, { productIds: batch }).catch(() => null);
  if (!res?.isSuccess || !res.products) {
    batch.forEach((id) => requested.delete(id));
    return;
  }
  res.products.forEach((p) => products.set(p.id, p));
  listeners.forEach((l) => l());
}

function request(productId: string) {
  if (requested.has(productId)) return;
  requested.add(productId);
  pending.push(productId);
  if (!timer) timer = setTimeout(flush, 0);
}

function resolve(productId?: string | null, variantId?: string | null): CartLineLimits | undefined {
  const product = productId ? products.get(productId) : undefined;
  if (!product) return undefined;
  const channel = product.salesChannels?.find((sc) => sc.id === IkasStorefrontConfig.salesChannelId);
  let max = channel?.maxQuantityPerCart ?? undefined;
  const variant = variantId ? product.variants?.find((v) => v.id === variantId) : undefined;
  if (variant && !variant.sellIfOutOfStock && typeof variant.stock === "number" && variant.stock > 0) {
    max = max == null ? variant.stock : Math.min(max, variant.stock);
  }
  return { min: Math.max(1, channel?.minQuantityPerCart ?? 1), max };
}

/** Resolved limits for one cart line — undefined until the batched fetch lands. */
export function useCartLineLimits(productId?: string | null, variantId?: string | null) {
  const [, setVersion] = useState(0);
  const limits = resolve(productId, variantId);
  useEffect(() => {
    if (!productId) return;
    const listener = () => setVersion((v) => v + 1);
    listeners.add(listener);
    request(productId);
    if (!limits && products.has(productId)) listener();
    return () => {
      listeners.delete(listener);
    };
  }, [productId]);
  return limits;
}
