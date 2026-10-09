import { useEffect, useRef, useState } from "preact/hooks";
import {
  IkasComponentRenderer,
  IkasImage,
  IkasProductStockLocations,
  IkasStorefrontConfig,
  PayWithIkas,
  Router,
  acceptProductOffer,
  addIkasProductToFavorites,
  createMediaSrcset,
  customerStore,
  formatCurrency,
  getBundleProductsOfVariant,
  getDefaultSrc,
  getDisplayedProductGroups,
  getIkasCategoryPathItemHref,
  getProductAvailableStockLocations,
  getProductCampaigns,
  getProductCategoryPath,
  getProductVariantFinalPriceWithCampaignOffers,
  getProductVariantFormattedFinalPriceWithCampaignOffers,
  getProductVariantFormattedSellPriceWithCampaignOffers,
  getProductVariantIsBackInStockCustomerLoginRequired,
  getProductVariantIsBackInStockEnabled,
  getProductVariantPrice,
  getProductVariantSellPriceWithCampaignOffers,
  getProductVariantTieredDiscountProducts,
  getSelectedProductVariant,
  getThumbnailSrc,
  hasCustomer,
  initBundleProducts,
  isAcceptedProductOffer,
  isFavoriteIkasProduct,
  rejectProductOffer,
  removeIkasProductFromFavorites,
  saveProductVariantBackInStockReminder,
  withRoutePrefix,
} from "@ikas/bp-storefront";
import AccordionItem from "../../sub-components/AccordionItem";
import ArrowLink from "../../sub-components/ArrowLink";
import Badge from "../../sub-components/Badge";
import Breadcrumbs from "../../sub-components/Breadcrumbs";
import BundleItem from "../../sub-components/BundleItem";
import Button, { type ButtonState } from "../../sub-components/Button";
import FavoriteButton from "../../sub-components/FavoriteButton";
import FormField from "../../sub-components/FormField";
import Icon from "../../sub-components/Icon";
import ImagePreview from "../../sub-components/ImagePreview";
import OfferCard from "../../sub-components/OfferCard";
import ProductOptions from "../../sub-components/ProductOptions";
import QuantitySelector from "../../sub-components/QuantitySelector";
import RatingStars from "../../sub-components/RatingStars";
import Skeleton from "../../sub-components/Skeleton";
import VariantPicker from "../../sub-components/VariantPicker";
import { cx } from "../../utils/cx";
import { useMounted } from "../../utils/hooks";
import {
  adjustBundleProductQuantity,
  canPayWithIkas,
  fill,
  getEditLineId,
  getPriceInfo,
  getProductCartLimits,
  getVariantMedia,
  isSoldOut,
  useAddToCart,
} from "../../utils/productBuy";
import { TEXT, upperTr } from "../../utils/tokens";
import { UI_EVENT, emitUi } from "../../utils/ui";
import { Props } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatDuration(sec?: number) {
  if (!sec || !Number.isFinite(sec)) return "";
  const s = Math.round(sec);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * I/Section/ProductDetail — gallery (2 columns desktop · 1 column + thumb rail laptop ·
 * horizontal track + dots tablet/mobile) beside a 452 sticky info column (I-PDP-01 · M-13).
 * Every merchant block (campaign, tiers, product group, options, bundle, offers, stock
 * locations, back-in-stock) renders only when the product carries that data.
 * States: yükleniyor (skeleton), ekleniyor, eklendi, stok yok, sepeti güncelle / sepet
 * güncelleniyor (?editLineID), haber ver (form · kaydedildi · giriş gerekli).
 */
export function ProductDetail(props: Props) {
  const {
    product,
    homeText = "Ana sayfa",
    breadcrumbAriaLabel = "Sayfa konumu",
    skuLabel = "ÜRÜN KODU",
    reviewsLinkText = "Değerlendirmeleri gör",
    ratingAriaLabel = "5 üzerinden {n} puan",
    soldOutBadgeText = "Tükendi",
    tiersTitle = "ÇOK AL, AZ ÖDE",
    tierQuantityText = "{range} adet",
    tierUnitPriceText = "{price} / adet",
    groupLabel = "MODEL ·",
    sizeGuideText = "Beden rehberi",
    addToCartText = "Sepete ekle",
    addingText = "Ekleniyor…",
    addedText = "Sepete eklendi",
    outOfStockText = "Stokta yok",
    updateCartText = "Sepeti güncelle",
    updatingCartText = "Güncelleniyor…",
    addToCartErrorText = "Sepete eklenemedi, tekrar dene.",
    favoriteAriaLabel = "Favorilere ekle",
    quantityAriaLabel = "Adet",
    decreaseAriaLabel = "Azalt",
    increaseAriaLabel = "Artır",
    optionsTitle = "KİŞİSELLEŞTİR",
    optionSetErrorText = "Devam etmek için seçenekleri tamamla.",
    optionRequiredText = "Bu alanı doldurmalısın.",
    optionOptionalText = "(isteğe bağlı)",
    optionSelectPlaceholder = "Seç",
    optionLimitText = "EN FAZLA {max} SEÇİM · {count}/{max}",
    optionMinText = "EN AZ {min} SEÇİM",
    fileUploadText = "Dosya seç ya da sürükle (PNG, en fazla 5 MB)",
    fileUploadingText = "Yükleniyor…",
    fileUploadErrorText = "Dosya yüklenemedi.",
    fileRemoveAriaLabel = "Dosyayı kaldır",
    bundleTitle = "SET İÇERİĞİ ·",
    bundleCountText = "{n} PARÇA",
    bundleIncludedText = "Sete dahil",
    offerInCartText = "Sepette",
    offerSoldOutText = "Tükendi",
    offerVariantAriaLabel = "Seçenek",
    offersAddText = "Birlikte sepete ekle ({n})",
    offersSavingText = "{amount} KAZANÇ",
    lowStockText = "SON {n} ÜRÜN · 2 İŞ GÜNÜNDE KARGODA",
    inStockText,
    outOfStockNoteText = "STOKTA YOK",
    backInStockTitle = "Bu beden tükendi. Gelince haber verelim.",
    backInStockPlaceholder = "E-posta adresin",
    backInStockButtonText = "Haber ver",
    backInStockSendingText = "Kaydediliyor…",
    backInStockSuccessText = "Kaydettik. Stoka girince e-posta göndereceğiz.",
    backInStockErrorText = "Geçerli bir e-posta adresi gir.",
    backInStockLoginText = "Hatırlatma için giriş yapmalısın.",
    backInStockLoginLinkText = "Giriş yap",
    stockLocationsTitle = "MAĞAZADA STOK",
    stockCountText = "{n} ADET",
    stockLastText = "SON {n}",
    pickupText = "Bugün mağazadan teslim alabilirsin.",
    descriptionTitle = "Ürün detayı",
    shippingTitle = "Kargo ve iade",
    careTitle = "Malzeme ve bakım",
    shippingText,
    careText,
    closeAriaLabel = "Kapat",
    prevAriaLabel = "Önceki görsel",
    nextAriaLabel = "Sonraki görsel",
    zoomAriaLabel = "Görseli büyüt",
    playVideoAriaLabel = "Videoyu oynat",
    galleryDotAriaLabel = "{n}. görsele git",
    sizeGuideLink,
    showPayWithIkas = true,
    preselectOffers = false,
    lowStockThreshold = 5,
    highlights,
    backgroundColor,
  } = props;

  const mounted = useMounted();
  const cart = useAddToCart();
  const [quantity, setQuantity] = useState(1);
  const [showOptionErrors, setShowOptionErrors] = useState(false);
  const [preview, setPreview] = useState<number | null>(null);
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  const [durations, setDurations] = useState<Record<number, number>>({});
  const [locations, setLocations] = useState<IkasProductStockLocations[]>([]);
  const [, setTick] = useState(0);
  const [bisEmail, setBisEmail] = useState("");
  const [bisStatus, setBisStatus] = useState<"idle" | "sending" | "saved" | "error">("idle");
  const galleryRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const variant = product ? getSelectedProductVariant(product) : null;
  const variantId = variant?.id;
  const media: IkasImage[] = getVariantMedia(variant);
  const mediaKey = media.map((m) => m.id).join("|");
  const limits = product ? getProductCartLimits(product, variant) : { min: 1, max: undefined };

  useEffect(() => {
    setQuantity((q) => Math.min(Math.max(q, limits.min), limits.max ?? Number.MAX_SAFE_INTEGER));
  }, [product?.id, variantId, limits.min, limits.max]);

  // Campaign data (pdp-campaign, pdp-tiers) is attached to the variants by getProductCampaigns.
  useEffect(() => {
    if (!product || product.campaigns !== undefined) return;
    let alive = true;
    getProductCampaigns(product)
      .then(() => alive && setTick((t) => t + 1))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [product?.id]);

  // pdp-stock-locations: hidden when the merchant has no pickup locations / no data.
  useEffect(() => {
    if (!product) return;
    let alive = true;
    getProductAvailableStockLocations(product)
      .then((res) => alive && setLocations(res ?? []))
      .catch(() => alive && setLocations([]));
    return () => {
      alive = false;
    };
  }, [product?.id]);

  useEffect(() => {
    product?.offers?.forEach((offer) => {
      if (isAcceptedProductOffer(offer)) return;
      if (preselectOffers) acceptProductOffer(offer);
      else rejectProductOffer(offer);
    });
  }, [product?.id, preselectOffers]);

  // Set ürün: load bundle products for the selected variant, clamp quantities to stock.
  useEffect(() => {
    if (!product || !variant?.bundleSettings) return;
    let alive = true;
    (async () => {
      try {
        await getBundleProductsOfVariant(product, variant);
        await initBundleProducts(product);
        if (alive) variant.bundleSettings?.products.forEach(adjustBundleProductQuantity);
      } catch {
        /* bundle list stays empty */
      } finally {
        if (alive) setTick((t) => t + 1);
      }
    })();
    return () => {
      alive = false;
    };
  }, [product?.id, variantId]);

  useEffect(() => {
    setBisStatus(variant?.isBackInStockReminderSaved ? "saved" : "idle");
    setShowOptionErrors(false);
  }, [variantId]);

  // I-PDP-02 · M-19: the most visible media drives the thumb rail / mobile dots.
  useEffect(() => {
    setActive(0);
    setPlaying(null);
    const root = galleryRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const ratios = new Map<number, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratios.set(Number((e.target as HTMLElement).dataset.mediaIndex), e.intersectionRatio));
        let best = 0;
        let bestRatio = -1;
        ratios.forEach((r, i) => {
          if (r > bestRatio + 0.01) {
            bestRatio = r;
            best = i;
          }
        });
        setActive(best);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    root.querySelectorAll("[data-media-index]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [mediaKey]);

  /* ---------- yükleniyor ---------- */
  if (!product || !variant) {
    return (
      <section className="pdp pdp--loading" style={backgroundColor ? { backgroundColor } : undefined} aria-busy="true">
        <div className="pdp__main">
          <div className="pdp__skel-gallery" />
          <div className="pdp__details pdp__skel">
            <Skeleton width={64} height={20} />
            <Skeleton width="80%" height={32} />
            <Skeleton width={120} height={12} />
            <Skeleton width={140} height={24} />
            <Skeleton height={40} />
            <Skeleton height={48} />
            <Skeleton height={120} />
          </div>
        </div>
      </section>
    );
  }

  const editMode = mounted && !!getEditLineId();
  const soldOut = isSoldOut(product, variant);
  const price = getPriceInfo(variant);
  const isFavorite = isFavoriteIkasProduct(product);
  const loggedIn = hasCustomer(customerStore);

  /* ---------- breadcrumbs ---------- */
  const crumbs = [
    { label: homeText, href: withRoutePrefix("/") },
    ...getProductCategoryPath(product).map((c) => ({ label: c.name, href: getIkasCategoryPathItemHref(c) })),
  ];

  /* ---------- badges ---------- */
  const badges: { text: string; tone: "default" | "new" | "sale" | "soldout" }[] = [];
  if (soldOut) badges.push({ text: soldOutBadgeText, tone: "soldout" });
  else if (price.discount > 0) badges.push({ text: `%${price.discount}`, tone: "sale" });
  (product.tags ?? []).slice(0, 2).forEach((t) => t?.name && badges.push({ text: t.name, tone: "new" }));

  /* ---------- campaign + tiers ---------- */
  const tiers = getProductVariantTieredDiscountProducts(variant).filter(
    (t) => !t.salesChannelIds?.length || t.salesChannelIds.includes(IkasStorefrontConfig.salesChannelId ?? ""),
  );
  const campaignTitle = (variant.campaigns ?? product.campaigns ?? [])
    .map((c) => c.campaign)
    .find((c) => c && !c.deleted && !c.tieredDiscount && c.title)?.title;

  /* ---------- groups, bundle, offers, stock ---------- */
  const groups = getDisplayedProductGroups(product).filter((g) => g.items.length > 0);
  const bundle = variant.bundleSettings ? [...variant.bundleSettings.products].sort((a, b) => a.order - b.order) : [];
  const offers = product.offers ?? [];
  const selectedOffers = offers.filter((o) => o.isSelected && !isAcceptedProductOffer(o)).length;
  const currency = getProductVariantPrice(variant);
  const offersSaving = offers.length
    ? getProductVariantSellPriceWithCampaignOffers(variant) - getProductVariantFinalPriceWithCampaignOffers(variant)
    : 0;
  const offersTotal = offers.length ? getProductVariantFormattedFinalPriceWithCampaignOffers(variant) : "";
  const offersCompare = offersSaving > 0 ? getProductVariantFormattedSellPriceWithCampaignOffers(variant) : "";
  const stores = locations.filter(
    (l) => l.variantId === variant.id && l.stockCount > 0 && l.stockLocation?.type !== "VIRTUAL",
  );
  const tracked = !variant.sellIfOutOfStock && !variant.bundleSettings;
  let stockNote: { text: string; tone: "low" | "out" | "in" } | null = null;
  if (soldOut) stockNote = outOfStockNoteText ? { text: outOfStockNoteText, tone: "out" } : null;
  else if (tracked && variant.stock > 0 && variant.stock <= lowStockThreshold && lowStockText)
    stockNote = { text: fill(lowStockText, { n: variant.stock }), tone: "low" };
  else if (inStockText) stockNote = { text: inStockText, tone: "in" };

  /* ---------- back in stock ---------- */
  const bisEnabled = soldOut && getProductVariantIsBackInStockEnabled(variant);
  const bisLoginRequired = !!getProductVariantIsBackInStockCustomerLoginRequired(variant);
  const bisNeedsLogin = bisLoginRequired && !loggedIn;
  const onBackInStock = async (e: Event) => {
    e.preventDefault();
    if (bisStatus === "sending") return;
    const email = (bisEmail || customerStore.customer?.email || "").trim();
    if (!EMAIL_RE.test(email)) {
      setBisStatus("error");
      return;
    }
    setBisStatus("sending");
    const ok = await saveProductVariantBackInStockReminder(variant, email).catch(() => false);
    setBisStatus(ok ? "saved" : "error");
  };

  /* ---------- cart ---------- */
  const buttonState: ButtonState = soldOut ? "soldout" : cart.busy ? "loading" : cart.added ? "added" : "idle";
  const buttonLabel = soldOut
    ? outOfStockText
    : cart.busy
      ? editMode
        ? updatingCartText
        : addingText
      : cart.added
        ? addedText
        : editMode
          ? updateCartText
          : addToCartText;

  const onAdd = async () => {
    if (soldOut || cart.busy) return;
    const result = await cart.add(product, variant, quantity);
    if (result === "options") {
      setShowOptionErrors(true);
      optionsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (result === "ok") {
      setShowOptionErrors(false);
      emitUi(UI_EVENT.openCart);
    }
  };

  const onFavorite = async () => {
    if (!loggedIn) {
      Router.navigateToPage("LOGIN");
      return;
    }
    if (isFavorite) await removeIkasProductFromFavorites(product);
    else await addIkasProductToFavorites(product);
  };

  /* ---------- gallery ---------- */
  const goTo = (i: number) => {
    const root = galleryRef.current;
    const el = root?.querySelector<HTMLElement>(`[data-media-index="${i}"]`);
    if (!root || !el) return;
    const horizontal = root.scrollWidth > root.clientWidth + 1;
    el.scrollIntoView({ behavior: "smooth", block: horizontal ? "nearest" : "start", inline: "start" });
  };

  const playVideo = (i: number, e: Event) => {
    const video = (e.currentTarget as HTMLElement).parentElement?.querySelector("video");
    if (!video) return;
    video.controls = true;
    video.play().catch(() => undefined);
    setPlaying(i);
  };

  const renderMedia = (img: IkasImage, i: number) => {
    if (img.isVideo) {
      return (
        <div key={img.id || i} className="pdp__media pdp__media--video" data-media-index={i}>
          <video
            className="pdp__img"
            src={getDefaultSrc(img)}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedMetadata={(e) => {
              const d = (e.currentTarget as HTMLVideoElement).duration;
              setDurations((m) => (m[i] === d ? m : { ...m, [i]: d }));
            }}
          >
            <track kind="captions" />
          </video>
          {playing !== i && (
            <button type="button" className="pdp__play" aria-label={playVideoAriaLabel} onClick={(e) => playVideo(i, e as any)}>
              <span className="pdp__play-icon">
                <Icon name="play" size={24} />
              </span>
            </button>
          )}
          {playing !== i && durations[i] ? (
            <span className={cx("pdp__duration", TEXT.label, "tabular")}>{formatDuration(durations[i])}</span>
          ) : null}
        </div>
      );
    }
    return (
      <button
        key={img.id || i}
        type="button"
        className="pdp__media"
        data-media-index={i}
        aria-label={`${zoomAriaLabel} ${i + 1}`}
        onClick={() => setPreview(i)}
      >
        <img
          className="pdp__img"
          src={getDefaultSrc(img)}
          srcSet={createMediaSrcset(img)}
          sizes="(max-width: 767px) 82vw, (max-width: 991px) 60vw, (max-width: 1199px) 50vw, 432px"
          alt={img.altText || `${product.name} ${i + 1}`}
          loading={i < 2 ? "eager" : "lazy"}
          decoding={i === 0 ? "sync" : "async"}
          {...({ fetchpriority: i === 0 ? "high" : undefined } as any)}
        />
      </button>
    );
  };

  const optionTexts = {
    optionsTitle,
    optionSetErrorText,
    optionRequiredText,
    optionOptionalText,
    optionSelectPlaceholder,
    optionLimitText,
    optionMinText,
    fileUploadText,
    fileUploadingText,
    fileUploadErrorText,
    fileRemoveAriaLabel,
  };

  const highlightList = (highlights as any[]) ?? [];

  return (
    <section className="pdp" style={backgroundColor ? { backgroundColor } : undefined}>
      <div className="pdp__crumbs">
        <Breadcrumbs items={crumbs} ariaLabel={breadcrumbAriaLabel} />
      </div>

      <div className="pdp__main">
        {/* I-PDP-02 · M-19 */}
        <div className="pdp__gallery-wrap">
          {media.length > 1 && (
            <div className="pdp__rail" aria-hidden="true">
              {media.map((img, i) => (
                <button
                  key={img.id || i}
                  type="button"
                  tabIndex={-1}
                  className={cx("pdp__rail-thumb", i === active && "pdp__rail-thumb--on")}
                  onClick={() => goTo(i)}
                >
                  {img.isVideo ? (
                    <Icon name="play" size={14} />
                  ) : (
                    <img src={getThumbnailSrc(img)} alt="" loading="lazy" decoding="async" />
                  )}
                </button>
              ))}
            </div>
          )}
          <div ref={galleryRef} className={cx("pdp__gallery", media.length < 2 && "pdp__gallery--single")}>
            {media.length ? (
              media.map(renderMedia)
            ) : (
              <div className="pdp__media pdp__media--empty" data-media-index={0}>
                <Icon name="mountain" size={40} />
              </div>
            )}
          </div>
          {media.length > 1 && (
            <div className="pdp__dots">
              {media.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={cx("pdp__dot", i === active && "pdp__dot--on")}
                  aria-label={fill(galleryDotAriaLabel, { n: i + 1 })}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* I-PDP-01 · M-13 */}
        <div className="pdp__details">
          {badges.length > 0 && (
            <div className="pdp__badges">
              {badges.map((b, i) => (
                <Badge key={i} text={b.text} tone={b.tone} />
              ))}
            </div>
          )}

          <div className="pdp__title-block">
            <h1 className={cx("pdp__title", TEXT.h3)}>{product.name}</h1>
            {variant.sku && (
              <p className={cx("pdp__sku", TEXT.label)}>
                <span>{skuLabel}</span> <span className="tabular">{variant.sku}</span>
              </p>
            )}
          </div>

          {(product.reviewCount ?? 0) > 0 && (
            <div className="pdp__rating">
              <RatingStars
                rating={product.averageRating}
                count={product.reviewCount}
                ariaLabel={fill(ratingAriaLabel, { n: (product.averageRating ?? 0).toFixed(1).replace(".", ",") })}
              />
              {reviewsLinkText && (
                <a className={cx("pdp__rating-link", TEXT.uiSm)} href="#product-reviews">
                  {reviewsLinkText}
                </a>
              )}
            </div>
          )}

          <div className="pdp__price">
            <span className={cx("pdp__price-value", TEXT.h4, "tabular")}>{price.price}</span>
            {price.compare && <s className={cx("pdp__price-compare", TEXT.h4, "tabular")}>{price.compare}</s>}
          </div>

          {campaignTitle && tiers.length === 0 && (
            <div className="pdp__campaign">
              <Icon name="tag" size={16} className="pdp__campaign-icon" />
              <span className={TEXT.uiSm}>{campaignTitle}</span>
            </div>
          )}

          {tiers.length > 0 && (
            <div className="pdp__tiers">
              {tiersTitle && <span className={cx("pdp__block-title", TEXT.label)}>{tiersTitle}</span>}
              <div className="pdp__tiers-table">
                {tiers.map((t, i) => {
                  const { min, max } = t.lineItemQuantityRange;
                  const range = max === 0 ? `${min}+` : min === max ? `${min}` : `${min}–${max}`;
                  const on = quantity >= min && (max === 0 || quantity <= max);
                  return (
                    <div key={i} className={cx("pdp__tier", on && "pdp__tier--on")}>
                      <span className={TEXT.ui}>{fill(tierQuantityText, { range })}</span>
                      <span className={cx(TEXT.price, "tabular")}>{fill(tierUnitPriceText, { price: t.formattedFinalPrice })}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {groups.map((g, gi) => {
            const current = g.items.find((it) => it.isSelected);
            return (
              <div key={g.name || gi} className="pdp__group">
                <span className={cx("pdp__block-title", TEXT.label)}>
                  {gi === 0 && groupLabel ? groupLabel : `${upperTr(g.name)} ·`} {upperTr(current?.value)}
                </span>
                <div className="pdp__group-row">
                  {g.items.map((it) => (
                    <a
                      key={it.href}
                      href={it.href}
                      className={cx("pdp__group-item", it.isSelected && "pdp__group-item--on")}
                      aria-label={it.value}
                      title={it.value}
                      aria-current={it.isSelected ? "page" : undefined}
                    >
                      {it.image ? (
                        <img src={getThumbnailSrc(it.image)} alt="" loading="lazy" decoding="async" />
                      ) : (
                        <span className={TEXT.badge}>{it.value}</span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}

          {/* I-PDP-03 · M-28 via VariantChip / VariantSwatch */}
          <VariantPicker product={product} sizeGuideText={sizeGuideText} sizeGuideHref={sizeGuideLink?.href} />

          <div ref={optionsRef} className="pdp__options-anchor">
            <ProductOptions product={product} showError={showOptionErrors} texts={optionTexts} />
          </div>

          {bundle.length > 0 && (
            <div className="pdp__bundle">
              <span className={cx("pdp__block-title", TEXT.label)}>
                {bundleTitle} {fill(bundleCountText, { n: bundle.length })}
              </span>
              {bundle.map((bp) => (
                <BundleItem
                  key={bp.id}
                  bundleProduct={bp}
                  outOfStockText={offerSoldOutText}
                  includedText={bundleIncludedText}
                  decreaseAriaLabel={decreaseAriaLabel}
                  increaseAriaLabel={increaseAriaLabel}
                />
              ))}
            </div>
          )}

          {!soldOut && (
            <div className="pdp__quantity">
              <QuantitySelector
                value={quantity}
                min={limits.min}
                max={limits.max}
                onChange={setQuantity}
                valueAriaLabel={quantityAriaLabel}
                decreaseAriaLabel={decreaseAriaLabel}
                increaseAriaLabel={increaseAriaLabel}
              />
            </div>
          )}

          {/* I-PDP-04 · M-11 via Button */}
          <div className="pdp__actions">
            <Button label={buttonLabel} state={buttonState} fullWidth className="pdp__cart-btn" onClick={onAdd} />
            <span className="pdp__fav">
              <FavoriteButton active={isFavorite} ariaLabel={favoriteAriaLabel} size="md" onToggle={onFavorite} />
            </span>
          </div>
          {cart.error && addToCartErrorText && (
            <p className={cx("pdp__error", TEXT.uiSm)} role="alert">
              {addToCartErrorText}
            </p>
          )}

          {showPayWithIkas && mounted && !soldOut && canPayWithIkas() && (
            <div className="pdp__pay">
              <PayWithIkas product={product} quantity={quantity} />
            </div>
          )}

          {bisEnabled && (
            <div className="pdp__bis">
              {bisStatus === "saved" ? (
                <p className={cx("pdp__bis-success", TEXT.uiSm)} role="status">
                  <Icon name="circle-check" size={16} className="pdp__bis-icon" />
                  {backInStockSuccessText}
                </p>
              ) : bisNeedsLogin ? (
                <div className="pdp__bis-login">
                  <span className={TEXT.uiSm}>{backInStockLoginText}</span>
                  <ArrowLink label={backInStockLoginLinkText} onClick={() => Router.navigateToPage("LOGIN")} />
                </div>
              ) : (
                <>
                  {backInStockTitle && <p className={cx("pdp__bis-title", TEXT.ui)}>{backInStockTitle}</p>}
                  <form className="pdp__bis-form" onSubmit={onBackInStock as any} noValidate>
                    <FormField
                      className="pdp__bis-field"
                      type="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      ariaLabel={backInStockPlaceholder}
                      placeholder={backInStockPlaceholder}
                      value={bisEmail || customerStore.customer?.email || ""}
                      error={bisStatus === "error" ? backInStockErrorText : null}
                      onInput={(v) => {
                        setBisEmail(v);
                        if (bisStatus === "error") setBisStatus("idle");
                      }}
                    />
                    <Button
                      type="submit"
                      className="pdp__bis-btn"
                      label={bisStatus === "sending" ? backInStockSendingText : backInStockButtonText}
                      state={bisStatus === "sending" ? "loading" : "idle"}
                    />
                  </form>
                </>
              )}
            </div>
          )}

          {stockNote && (
            <p className={cx("pdp__stock", `pdp__stock--${stockNote.tone}`, TEXT.label)}>
              <span className="pdp__stock-dot" aria-hidden="true" />
              {stockNote.text}
            </p>
          )}

          {stores.length > 0 && (
            <div className="pdp__stores">
              {stockLocationsTitle && <span className={cx("pdp__block-title", TEXT.label)}>{stockLocationsTitle}</span>}
              {stores.map((s) => {
                const last = s.stockCount <= 1;
                return (
                  <div key={s.stockLocation.id} className="pdp__store">
                    <span className={TEXT.uiSm}>{s.stockLocation.name}</span>
                    <span className={cx("pdp__store-count", last && "pdp__store-count--last", TEXT.label, "tabular")}>
                      <span className="pdp__stock-dot" aria-hidden="true" />
                      {fill(last ? stockLastText : stockCountText, { n: s.stockCount })}
                    </span>
                  </div>
                );
              })}
              {pickupText && <p className={cx("pdp__pickup", TEXT.uiSm)}>{pickupText}</p>}
            </div>
          )}

          {offers.length > 0 && (
            <div className="pdp__offers">
              {(product.appliedCampaignOffer?.title || product.appliedCampaignOffer?.description) && (
                <div className="pdp__offers-head">
                  {product.appliedCampaignOffer?.title && <h2 className={cx("pdp__offers-title", TEXT.h4)}>{product.appliedCampaignOffer.title}</h2>}
                  {product.appliedCampaignOffer?.description && (
                    <p className={cx("pdp__offers-text", TEXT.uiSm)}>{product.appliedCampaignOffer.description}</p>
                  )}
                </div>
              )}
              {/* I-PDP-06 · M-28 via OfferCard */}
              <div className="pdp__offers-list">
                {offers.map((offer) => (
                  <OfferCard
                    key={offer.campaignOfferProductId}
                    offer={offer}
                    offerInCartText={offerInCartText}
                    soldOutText={offerSoldOutText}
                    variantAriaLabel={offerVariantAriaLabel}
                  />
                ))}
              </div>
              <div className="pdp__offers-summary">
                <div className="pdp__offers-total-row">
                  <div className="pdp__offers-total">
                    {offersCompare && <s className={cx("pdp__offers-compare", TEXT.uiSm, "tabular")}>{offersCompare}</s>}
                    <span className={cx(TEXT.h4, "tabular")}>{offersTotal}</span>
                  </div>
                  {offersSaving > 0 && offersSavingText && (
                    <span className={cx("pdp__offers-saving", TEXT.badge, "tabular")}>
                      {fill(offersSavingText, { amount: formatCurrency(offersSaving, currency.currency ?? "", currency.currencySymbol ?? null) })}
                    </span>
                  )}
                </div>
                {/* I-PDP-07 · M-11 via Button */}
                <Button
                  label={fill(offersAddText, { n: 1 + selectedOffers })}
                  state={soldOut ? "soldout" : cart.busy ? "loading" : "idle"}
                  fullWidth
                  onClick={onAdd}
                />
              </div>
            </div>
          )}

          {highlightList.length > 0 && (
            <div className="pdp__highlights">
              <IkasComponentRenderer id="pdp-highlights" className="pdp__highlights-list" components={highlightList} parentProps={props} />
            </div>
          )}

          {/* I-PDP-05 · M-22 via AccordionItem */}
          <div className="pdp__accordions">
            {product.description && <AccordionItem title={descriptionTitle} body={product.description} defaultOpen headingLevel={2} />}
            {shippingText && <AccordionItem title={shippingTitle} body={shippingText} headingLevel={2} />}
            {careText && <AccordionItem title={careTitle} body={careText} headingLevel={2} />}
          </div>
        </div>
      </div>

      {/* mobile sticky buy bar — same button state as the main CTA */}
      <div className="pdp__buybar">
        <div className="pdp__buybar-info">
          <span className={cx("pdp__buybar-title", TEXT.uiSm)}>{product.name}</span>
          <span className={cx("pdp__buybar-price", TEXT.price, "tabular")}>{price.price}</span>
        </div>
        <Button label={buttonLabel} state={buttonState} fullWidth className="pdp__buybar-btn" onClick={onAdd} />
      </div>

      <ImagePreview
        open={preview !== null}
        images={media}
        index={preview ?? 0}
        altText={product.name}
        onClose={() => setPreview(null)}
        closeAriaLabel={closeAriaLabel}
        prevAriaLabel={prevAriaLabel}
        nextAriaLabel={nextAriaLabel}
        zoomAriaLabel={zoomAriaLabel}
      />
    </section>
  );
}

export default ProductDetail;
