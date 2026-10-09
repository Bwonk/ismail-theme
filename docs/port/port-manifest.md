# Port manifest — İsmail (I, contract 2)

Kaynak: `port-manifest.json` (schema 1). Bu dosya ondan üretilir; elle düzenlenmez. Canlı token eşleşmeleri `globals-runbook.md` sonundaki tablodadır.

## Özet

| Section | Sub | Sayfa | Overlay | Anim hedefi | Açık soru |
|---|---|---|---|---|---|
| 26 | 27 | 21 | 8 | 108 | 0 |

## Tema global'leri

### Renkler

| Ad | pen.dev | Açık | Koyu | ikas |
|---|---|---|---|---|
| Renk / Zemin | `color-bg` | `#F4F4F1` | `#131514` | colorScheme slot `Background` |
| Renk / Metin | `color-text` | `#141414` | `#F4F4F1` | colorScheme slot `Text` |
| Renk / Soluk Metin | `color-muted` | `#5C5C57` | `#A6A69F` | colorScheme slot `Muted` |
| Renk / Çizgi | `color-line` | `#8A8A84` | `#6E6E68` | colorScheme slot `Line` |
| Renk / Yüzey | `color-surface` | `#E8E8E3` | `#1F2120` | colorScheme slot `Surface` |
| Renk / Ters Zemin | `color-inverse-bg` | `#141414` | `#F4F4F1` | colorScheme slot `PrimaryButton/Background` |
| Renk / Ters Metin | `color-inverse-text` | `#F4F4F1` | `#141414` | colorScheme slot `PrimaryButton/Text` |
| Renk / Vurgu | `color-accent` | `#F2541A` | `#F2541A` | colorScheme slot `Accent` |
| Renk / Vurgu Üstü Metin | `color-accent-text` | `#141414` | `#141414` | colorScheme slot `AccentText` |
| Renk / Perde | `color-scrim` | `#13151499` | `#131514B3` | colorScheme slot `Scrim` |
| Renk / Şeffaf | `color-transparent` | `#F4F4F100` | `#13151400` | `global.css` `--color-transparent` |
| Renk / Hata | `color-danger` | `#B3261E` | `#FF8A7A` | colorScheme slot `Danger` |
| Renk / Başarı | `color-success` | `#1E7A45` | `#6FD49A` | colorScheme slot `Success` |

### Tipografi

| Ad | pen.dev | Aile | Ağırlık | Satır | Masaüstü | Laptop | Tablet | Mobil |
|---|---|---|---|---|---|---|---|---|
| Tipografi / Display | `text-display` | Mona Sans | 500 | 1.0 | 96 | 80 | 64 | 48 |
| Tipografi / Başlık H2 | `text-h2` | Mona Sans | 500 | 1.1 | 44 | 40 | 36 | 30 |
| Tipografi / Başlık H3 | `text-h3` | Mona Sans | 500 | 1.15 | 32 | 30 | 28 | 24 |
| Tipografi / Başlık H4 | `text-h4` | Mona Sans | 600 | 1.2 | 20 | 20 | 18 | 18 |
| Tipografi / Ürün Adı | `text-title` | Mona Sans | 500 | 1.25 | 14 | 14 | 13 | 13 |
| Tipografi / Arayüz | `text-ui` | Mona Sans | 500 | 1.25 | 14 | 14 | 14 | 14 |
| Tipografi / Arayüz Küçük | `text-ui-sm` | Mona Sans | 400 | 1.4 | 13 | 13 | 12 | 12 |
| Tipografi / Rozet | `text-badge` | Inter Tight | 500 | 1.2 | 11 | 11 | 10 | 10 |
| Tipografi / Etiket | `text-label` | Inter Tight | 400 | 1.2 | 12 | 12 | 11 | 11 |
| Tipografi / Gövde | `text-body` | Mona Sans | 400 | 1.5 | 15 | 15 | 14 | 14 |
| Tipografi / Fiyat | `text-price` | Inter Tight | 500 | 1.2 | 14 | 14 | 13 | 13 |

### Renk şemaları (`globals.md` §1a)

| Slot | pen.dev | İsmail / Kâğıt | İsmail / Mürekkep | İsmail / Şeffaf |
|---|---|---|---|---|
| `Background` | `color-bg` | `#F4F4F1` | `#131514` | `#13151400` |
| `Text` | `color-text` | `#141414` | `#F4F4F1` | `#F4F4F1` |
| `Muted` | `color-muted` | `#5C5C57` | `#A6A69F` | `#A6A69F` |
| `Line` | `color-line` | `#8A8A84` | `#6E6E68` | `#6E6E68` |
| `Surface` | `color-surface` | `#E8E8E3` | `#1F2120` | `#F4F4F11A` |
| `PrimaryButton/Background` | `color-inverse-bg` | `#141414` | `#F4F4F1` | `#F4F4F1` |
| `PrimaryButton/Text` | `color-inverse-text` | `#F4F4F1` | `#141414` | `#141414` |
| `Accent` | `color-accent` | `#F2541A` | `#F2541A` | `#F2541A` |
| `AccentText` | `color-accent-text` | `#141414` | `#141414` | `#141414` |
| `Danger` | `color-danger` | `#B3261E` | `#FF8A7A` | `#FF8A7A` |
| `Success` | `color-success` | `#1E7A45` | `#6FD49A` | `#6FD49A` |
| `Scrim` | `color-scrim` | `#13151499` | `#131514B3` | `#131514B3` |

### Kırılımlar

| Ad | Genişlik |
|---|---|
| Kırılım / Laptop | 1199 |
| Kırılım / Tablet | 991 |
| Kırılım / Mobil | 767 |

### Keyframe'ler

| Ad | Kullanan hedefler |
|---|---|
| Animasyon / Favori pop (noktalar elle) | I-CMP-07 |
| Animasyon / Yükleme fade-up | I-CMP-12, I-HERO-03, I-GRID-01, I-ACT-01, I-SPOT-01, I-BEST-01, I-MOS-01, I-COLL-01, I-REV-01, I-CRTP-02, I-BLP-01, I-TXT-01 |
| Animasyon / Yükleme fade | I-PREV-01, I-HERO-01 |

### global.css

| Custom property | Masaüstü | Mobil |
|---|---|---|
| `--color-transparent` | `#F4F4F100` / `#13151400` | (mod: light / dark) |
| `--space-page` | 32 | 16 |
| `--space-grid` | 24 | 12 |
| `--space-card` | 12 | 10 |
| `--space-panel` | 32 | 20 |
| `--space-xs` | 6 | 4 |
| `--space-sm` | 12 | 8 |
| `--space-md` | 24 | 16 |
| `--space-section` | 120 | 64 |
| `--size-header` | 72 | 56 |
| `--size-line` | 1 | 1 |
| `--opacity-inactive` | 0.4 | 0.4 |
| `--size-logo` | 22 | 20 |
| `--size-hero` | 760 | 600 |
| `--radius-card` | 6 | 6 |
| `--radius-pill` | 999 | 999 |

### Global değişkenler

| Ad | Tip | Değer |
|---|---|---|
| Çizgi / Varsayılan | BORDER | `{"width": {"value": 1, "unit": "px"}, "style": "solid", "color": "#8A8A84"}` |

## Sub-component'ler

| Ad | Durumlar | Prop'lar | Animasyonlar |
|---|---|---|---|
| `ProductCard` | hover · stok yok · indirimli · favoride · 309 · 177 mobil | — | I-CMP-01, I-CMP-02 |
| `ProductCardSmall` | hover | — | I-CMP-03 |
| `BlogCard` | hover | — | I-CMP-04 |
| `Button` | açık · hover · çerçeveli · pasif · küçük · yükleniyor · eklendi · stok yok | `label` TEXT | I-CMP-05 |
| `ArrowLink` | hover | `label` TEXT | I-CMP-06 |
| `Badge` | YENİ · %20 · TÜKENDİ | — | — |
| `FavoriteButton` | hover · dolu | — | I-CMP-07 |
| `Counter` | yuvarlanırken | — | I-CMP-08 |
| `Breadcrumbs` | — | — | — |
| `Tabs` | dikey · hover | `label` TEXT | I-CMP-09 |
| `VariantChip` | seçili · hover · stok yok | — | I-CMP-10 |
| `FormField` | hata · pasif · dolu · odak | `label` TEXT, `placeholder` TEXT, `errorText` TEXT | — |
| `Checkbox` | işaretli | `label` TEXT | — |
| `AccordionItem` | kapalı | `title` TEXT, `body` RICH_TEXT | I-CMP-11 |
| `QuantitySelector` | üst sınır · alt sınır | — | — |
| `SectionHeading` | açıklamasız · sola yaslı | `title` TEXT, `subtitle` TEXT | I-CMP-12 |
| `IconButton` | hover | — | — |
| `Spinner` | — | — | — |
| `CartLineItem` | indirimli · güncelleniyor · hediye · adet sınırı · set · kişiselleştirilmiş | `editText` TEXT, `maxQuantityText` TEXT, `removeText` TEXT | — |
| `OfferCard` | seçili · sepette · tükendi | `offerInCartText` TEXT | I-CMP-13 |
| `BundleItem` | adet sabit · tükendi | `outOfStockText` TEXT | — |
| `RatingStars` | yorumsuz | — | — |
| `ReviewCard` | görselli · mağaza yanıtlı · doğrulanmamış | `verifiedText` TEXT, `merchantReplyLabel` TEXT | — |
| `VariantSwatch` | stok yok · seçili · hover | — | I-CMP-14 |
| `PriceRange` | değer girilmiş | — | — |
| `SocialLoginButton` | Facebook · hover | `googleText` TEXT | — |
| `Skeleton` | — | — | — |

## Section'lar

### Header

- **Şablon:** `header-section` · **Bayraklar:** `isHeader`, `container`
- **Frame'ler:** `I/Section/Header@desktop` (IPhRF) · `I/Section/Header@mobile` (CuGQ7)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `logo` | SVG | — | Marka | `header-logo` |
| `logoAltText` | TEXT | — | Metinler | `header-logo` |
| `showAnnouncement` | BOOLEAN | — | Ayarlar | — |
| `transparentOnHero` | BOOLEAN | — | Ayarlar | — |
| `announcementText` | TEXT | — | Metinler | `announcement-text` |
| `announcementLink` | LINK | — | Bağlantılar | — |
| `announcements` | COMPONENT_LIST | — | Bileşenler | `announcement-pager` |
| `stickyEnabled` | BOOLEAN | — | Ayarlar | — |
| `countdownTarget` | DATE | — | Ayarlar | — |
| `navLinks` | LIST_OF_LINK | — | Bağlantılar | `header-nav` |
| `megamenuColumns` | COMPONENT_LIST | — | Bileşenler | — |
| `searchLabel` | TEXT | — | Metinler | `search-button` |
| `cartLabel` | TEXT | — | Metinler | `cart-button` |
| `accountLabel` | TEXT | — | Metinler | `account-button` |
| `menuAriaLabel` | TEXT | — | Metinler | — |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** `announcements` COMPONENT_LIST → AnnouncementItem (`text` TEXT, `link` LINK), `megamenuColumns` COMPONENT_LIST → MegamenuColumn
- **Veri bağlı metinler:** `cart-count` = `cart.itemCount`
- **Kod metinleri:** `countdown-value` (countdown), `countdown`, `pager-count`
- **Animasyonlar:** I-HDR-01, I-HDR-02, I-HDR-03, I-HDR-04
- **Overlay'ler:** `MenuOverlay` (açık), `CartDrawer` (dolu · yükleniyor · boş), `SearchOverlay` (yazarken · sonuçsuz · boş), `CookieBar` (açık)
- **Yalnız masaüstü katmanlar:** `.header-nav`, `.search-button-label`, `.cart-button-label`, `.account-button` — mobilde render edilmez ya da `@media (max-width: bp(<mobile id>))` altında `display: none`

#### Header › Overlay MenuOverlay

- **Cihazlar:** desktop, mobile · **Frame'ler:** `I/Overlay/MenuOverlay@desktop — açık` (peyPC) · `I/Overlay/MenuOverlay@mobile — açık` (f2f70)
- **Animasyonlar:** I-MENU-01, I-MENU-02
- **Yalnız masaüstü katmanlar:** `.menu-column-title`, `.menu-feature` — mobilde render edilmez ya da `@media (max-width: bp(<mobile id>))` altında `display: none`

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `closeAriaLabel` | TEXT | — | Metinler | `close-button` |
| `megamenuColumns` | COMPONENT_LIST | — | Bileşenler | `menu-columns` |
| `title` | TEXT | — | Metinler | `menu-column` |
| `links` | LIST_OF_LINK | — | Bağlantılar | `menu-column` |
| `image` | IMAGE | — (merchant verisi) | Görseller | `menu-feature` |
| `loginText` | TEXT | — | Metinler | `menu-auth` |
| `registerText` | TEXT | — | Metinler | `menu-auth` |
| `logoutText` | TEXT | — | Metinler | `menu-auth` |
| `accountLabel` | TEXT | — | Metinler | `menu-footer` |
| `favoritesLabel` | TEXT | — | Metinler | `menu-footer` |
| `localeText` | TEXT | — | Metinler | `menu-footer` |

#### Header › Overlay CartDrawer

- **Cihazlar:** desktop, mobile · **Frame'ler:** `I/Overlay/CartDrawer@desktop — dolu` (I34BT) · `I/Overlay/CartDrawer@desktop — yükleniyor` (LMgj7) · `I/Overlay/CartDrawer@desktop — boş` (hXKOd) · `I/Overlay/CartDrawer@mobile — boş` (E64O6) · `I/Overlay/CartDrawer@mobile — dolu` (Co0mn) · `I/Overlay/CartDrawer@mobile — yükleniyor` (W9I6x)
- **Animasyonlar:** I-CART-01, I-CART-02, I-CART-03, I-CART-04

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `cartTitleText` | TEXT | — | Metinler | `drawer-header` |
| `closeAriaLabel` | TEXT | — | Metinler | `drawer-header` |
| `cartEmptyTitle` | TEXT | — | Metinler | `cart-empty` |
| `cartEmptyText` | TEXT | — | Metinler | `cart-empty` |
| `cartEmptyButtonText` | TEXT | — | Metinler | `cart-empty` |
| `drawerRecommendTitle` | TEXT | — | Metinler | `drawer-recommend` |
| `couponToggleText` | TEXT | — | Metinler | `coupon-toggle` |
| `couponPlaceholder` | TEXT | — | Metinler | `coupon-toggle` |
| `couponButtonText` | TEXT | — | Metinler | `coupon-toggle` |
| `cartSubtotalLabel` | TEXT | — | Metinler | `subtotal-row` |
| `cartShippingNote` | TEXT | — | Metinler | `shipping-note` |
| `checkoutButtonText` | TEXT | — | Metinler | `checkout-button` |
| `checkoutLoadingText` | TEXT | — | Metinler | `checkout-button` |
| `cartViewButtonText` | TEXT | — | Metinler | `view-cart-link` |

#### Header › Overlay SearchOverlay

- **Cihazlar:** desktop, mobile · **Frame'ler:** `I/Overlay/SearchOverlay@desktop — yazarken` (x5QP6T) · `I/Overlay/SearchOverlay@desktop — sonuçsuz` (PeXpB) · `I/Overlay/SearchOverlay@desktop — boş` (gX940) · `I/Overlay/SearchOverlay@mobile — boş` (sG07N) · `I/Overlay/SearchOverlay@mobile — yazarken` (pIJs1) · `I/Overlay/SearchOverlay@mobile — sonuçsuz` (A104l)
- **Animasyonlar:** I-SRCH-01, I-SRCH-02, I-SRCH-03

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `searchPlaceholder` | TEXT | — | Metinler | `search-field` |
| `closeAriaLabel` | TEXT | — | Metinler | `search-field` |
| `searchEmptyTitle` | TEXT | — | Metinler | `search-suggestions` |
| `searchNoResultText` | TEXT | — | Metinler | `search-empty` |
| `searchNoResultHint` | TEXT | — | Metinler | `search-empty` |
| `searchAllResultsText` | TEXT | — | Metinler | `link` |

#### Header › Overlay CookieBar

- **Cihazlar:** desktop, mobile · **Frame'ler:** `I/Overlay/CookieBar@desktop — açık` (x50lWX) · `I/Overlay/CookieBar@mobile — açık` (FfBol)
- **Animasyonlar:** I-CKE-01

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `cookieContent` | RICH_TEXT | — | Metinler | `cookie-text` |
| `cookieAcceptText` | TEXT | — | Metinler | `cookie-accept` |
| `closeAriaLabel` | TEXT | — | Metinler | `cookie-close` |

### Footer

- **Şablon:** `footer-section` · **Bayraklar:** `isFooter`, `container`
- **Frame'ler:** `I/Section/Footer@desktop` (OLtep) · `I/Section/Footer@mobile` (XJbJV)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `ctaImage` | IMAGE | — (merchant verisi) | Görseller | `footer-cta-image` |
| `ctaTitle` | TEXT | — | Metinler | `footer-cta-card` |
| `ctaButtonText` | TEXT | — | Metinler | `footer-cta-button` |
| `notifyTitle` | TEXT | — | Metinler | `footer-cta-notify` |
| `notifyText` | TEXT | — | Metinler | `footer-cta-notify` |
| `notifyPlaceholder` | TEXT | — | Metinler | `cta-notify-form` |
| `notifyButtonText` | TEXT | — | Metinler | `cta-notify-button` |
| `notifySubmittingText` | TEXT | — | Metinler | `cta-notify-button` |
| `notifySuccessText` | TEXT | — | Metinler | `cta-notify-message` |
| `notifyErrorText` | TEXT | — | Metinler | `cta-notify-message` |
| `ctaButtonLink` | LINK | — | Bağlantılar | `footer-cta-button` |
| `logo` | SVG | — | Marka | `footer-brand` |
| `aboutText` | TEXT | — | Metinler | `footer-brand` |
| `columns` | COMPONENT_LIST | — | Bileşenler | `footer-columns` |
| `socialLinks` | COMPONENT_LIST | — | Bileşenler | `footer-brand` |
| `contactText` | TEXT | — | Metinler | `footer-bottom` |
| `localeText` | TEXT | — | Metinler | `footer-bottom` |
| `copyrightText` | TEXT | — | Metinler | `footer-bottom` |
| `coordinateText` | TEXT | — | Metinler | `footer-bottom` |
| `backgroundColor` | COLOR | — | Renkler | — |
| `title` | TEXT | — | Metinler | `footer-column` |
| `links` | LIST_OF_LINK | — | Bağlantılar | `footer-column` |

- **Çocuklar:** `columns` COMPONENT_LIST → FooterColumn, `socialLinks` COMPONENT_LIST → SocialLink
- **Veri bağlı metinler:** —
- **Kod metinleri:** —
- **Animasyonlar:** I-FTR-01, I-FTR-02, I-FTR-03, I-FTR-04
- **Overlay'ler:** `LocaleSwitcher` (açık)
- **Yalnız masaüstü katmanlar:** `.footer-column-title`, `.footer-link` — mobilde render edilmez ya da `@media (max-width: bp(<mobile id>))` altında `display: none`

#### Footer › Overlay LocaleSwitcher

- **Cihazlar:** desktop, mobile · **Frame'ler:** `I/Overlay/LocaleSwitcher@desktop — açık` (bqyM9) · `I/Overlay/LocaleSwitcher@mobile — açık` (Ohmtu)
- **Animasyonlar:** I-LCL-01

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `localeTitle` | TEXT | — | Metinler | `locale-title` |

### HeroSlider

- **Şablon:** `hero-slider-section` · **Bayraklar:** `container`
- **Frame'ler:** `I/Section/HeroSlider@desktop` (kewJH) · `I/Section/HeroSlider@mobile` (dxdG3)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `slides` | COMPONENT_LIST | — | Bileşenler | `hero-slides` |
| `autoplaySeconds` | NUMBER | — | Ayarlar | — |
| `overlayOpacity` | NUMBER | — | Ayarlar | — |
| `heightMode` | ENUM | — | Ayarlar | — |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** `slides` COMPONENT_LIST → HeroSlide (`image` IMAGE, `mobileImage` IMAGE, `title` TEXT, `text` TEXT, `buttonText` TEXT, `buttonLink` LINK, `metaText` TEXT)
- **Veri bağlı metinler:** —
- **Kod metinleri:** `hero-counter` (slideCounter), `digit-reel`, `digit-sep`
- **Animasyonlar:** I-HERO-01, I-HERO-02, I-HERO-03, I-HERO-04, I-HERO-05, I-HERO-06, I-HERO-07
- **Overlay'ler:** —
- **Yalnız masaüstü katmanlar:** `.hero-meta` — mobilde render edilmez ya da `@media (max-width: bp(<mobile id>))` altında `display: none`

### ProductGrid

- **Şablon:** `product-slider-section` · **Bayraklar:** —
- **Frame'ler:** `I/Section/ProductGrid@desktop` (wllla) · `I/Section/ProductGrid@mobile` (h3WYM)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `title` | TEXT | — | Metinler | `section-title` |
| `subtitle` | TEXT | — | Metinler | `section-subtitle` |
| `buttonText` | TEXT | — | Metinler | `grid-button` |
| `products` | PRODUCT_LIST | — (merchant verisi) | İçerik | `product-grid-list` |
| `maxItems` | NUMBER | — | Ayarlar | — |
| `mobileMaxItems` | NUMBER | — | Ayarlar | — |
| `columns` | NUMBER | — | Ayarlar | — |
| `buttonLink` | LINK | — | Bağlantılar | `grid-button` |
| `addToCartAriaLabel` | TEXT | — | Metinler | `image-front` |
| `favoriteAriaLabel` | TEXT | — | Metinler | `image-front` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** —
- **Veri bağlı metinler:** `image-front` = `product.name`, `image-front` = `product.price`
- **Kod metinleri:** —
- **Animasyonlar:** I-GRID-01, I-GRID-02, I-GRID-03, I-GRID-04
- **Overlay'ler:** —

### ActivityGrid

- **Şablon:** `category-images-section` · **Bayraklar:** `container`, `custom`
- **Frame'ler:** `I/Section/ActivityGrid@desktop` (PZ9xS) · `I/Section/ActivityGrid@mobile` (CYlV9)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `title` | TEXT | — | Metinler | `section-title` |
| `subtitle` | TEXT | — | Metinler | `section-subtitle` |
| `linkText` | TEXT | — | Metinler | `link` |
| `link` | LINK | — | Bağlantılar | `link` |
| `activities` | COMPONENT_LIST | — | Bileşenler | `activity-row` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** `activities` COMPONENT_LIST → ActivityCard (`image` IMAGE, `title` TEXT, `text` TEXT, `countText` TEXT, `buttonText` TEXT, `link` LINK)
- **Veri bağlı metinler:** —
- **Kod metinleri:** —
- **Animasyonlar:** I-ACT-01, I-ACT-02, I-ACT-03, I-ACT-04
- **Overlay'ler:** —

### StoreSpotlight

- **Şablon:** (özel) · **Bayraklar:** `custom`
- **Frame'ler:** `I/Section/StoreSpotlight@desktop` (s5rxiu) · `I/Section/StoreSpotlight@mobile` (G1rmg)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `image` | IMAGE | — (merchant verisi) | Görseller | `spotlight-media` |
| `title` | TEXT | — | Metinler | `spotlight-title` |
| `text` | TEXT | — | Metinler | `spotlight-text` |
| `offerLabel` | TEXT | — | Metinler | `offer-label` |
| `offerValue` | TEXT | — | Metinler | `offer-value` |
| `offerNote` | TEXT | — | Metinler | `offer-note` |
| `buttonText` | TEXT | — | Metinler | `spotlight-button` |
| `buttonLink` | LINK | — | Bağlantılar | `spotlight-button` |
| `imagePosition` | ENUM | — | Ayarlar | — |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** —
- **Veri bağlı metinler:** —
- **Kod metinleri:** —
- **Animasyonlar:** I-SPOT-01, I-SPOT-02, I-SPOT-03
- **Overlay'ler:** —

### Bestsellers

- **Şablon:** `product-slider-section` · **Bayraklar:** `container`
- **Frame'ler:** `I/Section/Bestsellers@desktop` (r0oljq) · `I/Section/Bestsellers@mobile` (S8jPp)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `title` | TEXT | — | Metinler | `section-title` |
| `subtitle` | TEXT | — | Metinler | `section-subtitle` |
| `linkText` | TEXT | — | Metinler | `link` |
| `addToCartAriaLabel` | TEXT | — | Metinler | `row-cart` |
| `favoriteAriaLabel` | TEXT | — | Metinler | `bestsellers-preview` |
| `link` | LINK | — | Bağlantılar | `link` |
| `tabs` | COMPONENT_LIST | — | Bileşenler | `bestsellers-tabs` |
| `maxItems` | NUMBER | — | Ayarlar | — |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** `tabs` COMPONENT_LIST → BestsellerTab (`label` TEXT, `products` PRODUCT_LIST)
- **Veri bağlı metinler:** `bestseller-media` = `product.image`, `bestseller-info` = `product.name`, `bestseller-info` = `product.price`, `bestsellers-preview` = `product.image`
- **Kod metinleri:** `bestseller-rank` (rank), `rank`
- **Animasyonlar:** I-BEST-01, I-BEST-02, I-BEST-03, I-BEST-04, I-BEST-05, I-BEST-06, I-BEST-07
- **Overlay'ler:** `QuickBuy` (açık · seçim eksik · ekleniyor)

#### Bestsellers › Overlay QuickBuy

- **Cihazlar:** desktop, mobile · **Frame'ler:** `I/Overlay/QuickBuy@desktop — açık` (cBTGM) · `I/Overlay/QuickBuy@desktop — seçim eksik` (BmEMQ) · `I/Overlay/QuickBuy@desktop — ekleniyor` (QYob5) · `I/Overlay/QuickBuy@mobile — açık` (i8ctGE) · `I/Overlay/QuickBuy@mobile — seçim eksik` (yZWjk) · `I/Overlay/QuickBuy@mobile — ekleniyor` (CYAvK)
- **Animasyonlar:** I-QB-01, I-QB-02, I-QB-03, I-QB-04, I-QB-05
- **Yalnız masaüstü katmanlar:** `.qb-media-nav`, `.qb-media-count`, `.qb-media-arrows`, `.qb-rule`, `.qb-spacer` — mobilde render edilmez ya da `@media (max-width: bp(<mobile id>))` altında `display: none`

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `closeAriaLabel` | TEXT | — | Metinler | `qb-head` |
| `chooseOptionText` | TEXT | — | Metinler | `qb-variant-error` |
| `addText` | TEXT | — | Metinler | `qb-actions` |
| `addingText` | TEXT | — | Metinler | `qb-actions` |
| `soldOutText` | TEXT | — | Metinler | `qb-actions` |
| `showPayWithIkas` | BOOLEAN | — | Ayarlar | `qb-pay` |
| `detailLinkText` | TEXT | — | Metinler | `qb-foot` |

### CollectionMosaic

- **Şablon:** `category-images-section` · **Bayraklar:** `container`
- **Frame'ler:** `I/Section/CollectionMosaic@desktop` (G5ICRw) · `I/Section/CollectionMosaic@mobile` (xAP4U)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `title` | TEXT | — | Metinler | `section-title` |
| `subtitle` | TEXT | — | Metinler | `section-subtitle` |
| `tiles` | COMPONENT_LIST | — | Bileşenler | `mosaic-grid` |
| `grayscaleImages` | BOOLEAN | — | Ayarlar | — |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** `tiles` COMPONENT_LIST → CollectionTile (`image` IMAGE, `title` TEXT, `text` TEXT, `buttonText` TEXT, `link` LINK)
- **Veri bağlı metinler:** —
- **Kod metinleri:** —
- **Animasyonlar:** I-MOS-01, I-MOS-02, I-MOS-03, I-MOS-04, I-MOS-05
- **Overlay'ler:** —

### ProductList

- **Şablon:** `category-list-section` · **Bayraklar:** —
- **Frame'ler:** `I/Section/ProductList@desktop` (iEonR) · `I/Section/ProductList@mobile` (BRP3L)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `pageMode` | ENUM | — | Ayarlar | — |
| `columns` | NUMBER | — | Ayarlar | — |
| `searchTitle` | TEXT | — | Metinler | `list-title` |
| `favoritesTitle` | TEXT | — | Metinler | `list-title` |
| `resultsLabel` | TEXT | — | Metinler | `list-count` |
| `filterButtonText` | TEXT | — | Metinler | `filter-bar` |
| `sortLabel` | TEXT | — | Metinler | `filter-bar` |
| `clearFiltersText` | TEXT | — | Metinler | `filter-bar` |
| `loadMoreText` | TEXT | — | Metinler | `load-more-button` |
| `loadingMoreText` | TEXT | — | Metinler | `load-more-button` |
| `emptyTitle` | TEXT | — | Metinler | `list-empty` |
| `emptyText` | TEXT | — | Metinler | `list-empty` |
| `emptyButtonText` | TEXT | — | Metinler | `list-empty` |
| `favoritesLoginText` | TEXT | — | Metinler | `list-empty` |
| `favoritesLoginButtonText` | TEXT | — | Metinler | `list-empty` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** —
- **Veri bağlı metinler:** `breadcrumbs` = `category.path`, `list-title` = `category.name`, `list-title` = `search.query`, `list-count` = `category.productCount`, `filter-chip-label` = `filter.value`, `filter-group-title` = `filter.name`, `filter-category-name` = `filter.category.name`, `filter-category-count` = `filter.category.count`
- **Kod metinleri:** `page-progress` (pageProgress), `pageProgress`
- **Animasyonlar:** I-PLP-01, I-PLP-02, I-PLP-03
- **Overlay'ler:** `FilterDrawer` (açık)
- **Yalnız masaüstü katmanlar:** `.filter-sidebar`, `.filter-chip`, `.filter-clear-all` — mobilde render edilmez ya da `@media (max-width: bp(<mobile id>))` altında `display: none`

#### ProductList › Overlay FilterDrawer

- **Cihazlar:** mobile · **Frame'ler:** `I/Overlay/FilterDrawer@mobile — açık` (ZAPOC)
- **Animasyonlar:** I-FILT-01, I-FILT-02

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `filterTitle` | TEXT | — | Metinler | `filter-header` |
| `closeAriaLabel` | TEXT | — | Metinler | `filter-header` |
| `clearFiltersText` | TEXT | — | Metinler | `clear-button` |
| `applyFiltersText` | TEXT | — | Metinler | `apply-button` |

### CollectionHero

- **Şablon:** (özel) · **Bayraklar:** `custom`
- **Frame'ler:** `I/Section/CollectionHero@desktop` (e25Ed) · `I/Section/CollectionHero@mobile` (WuZ6v)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `image` | IMAGE | — (merchant verisi) | Görseller | `collection-hero-media` |
| `category` | CATEGORY | — (merchant verisi) | İçerik | — |
| `description` | TEXT | — | Metinler | `collection-hero-description` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** —
- **Veri bağlı metinler:** `collection-hero-title` = `category.name`
- **Kod metinleri:** —
- **Animasyonlar:** I-COLL-01
- **Overlay'ler:** —

### ProductDetail

- **Şablon:** `product-detail-section` · **Bayraklar:** `container`
- **Frame'ler:** `I/Section/ProductDetail@desktop` (NDft6) · `I/Section/ProductDetail@mobile` (rXdWm)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `product` | PRODUCT | — (merchant verisi) | İçerik | — |
| `addToCartText` | TEXT | — | Metinler | `add-to-cart-button` |
| `addingText` | TEXT | — | Metinler | `add-to-cart-button` |
| `addedText` | TEXT | — | Metinler | `add-to-cart-button` |
| `outOfStockText` | TEXT | — | Metinler | `add-to-cart-button` |
| `sizeGuideText` | TEXT | — | Metinler | `pdp-variants` |
| `lowStockText` | TEXT | — | Metinler | `pdp-stock-note` |
| `descriptionTitle` | TEXT | — | Metinler | `pdp-accordions` |
| `shippingTitle` | TEXT | — | Metinler | `pdp-accordions` |
| `skuLabel` | TEXT | — | Metinler | `pdp-sku` |
| `reviewsLinkText` | TEXT | — | Metinler | `pdp-rating` |
| `tiersTitle` | TEXT | — | Metinler | `pdp-tiers` |
| `groupLabel` | TEXT | — | Metinler | `pdp-group` |
| `optionsTitle` | TEXT | — | Metinler | `pdp-options` |
| `fileUploadText` | TEXT | — | Metinler | `option-file` |
| `bundleTitle` | TEXT | — | Metinler | `pdp-bundle` |
| `offersAddText` | TEXT | — | Metinler | `offers-summary` |
| `offerInCartText` | TEXT | — | Metinler | `pdp-offers` |
| `offerSoldOutText` | TEXT | — | Metinler | `pdp-offers` |
| `backInStockTitle` | TEXT | — | Metinler | `pdp-back-in-stock` |
| `backInStockPlaceholder` | TEXT | — | Metinler | `pdp-back-in-stock` |
| `backInStockButtonText` | TEXT | — | Metinler | `pdp-back-in-stock` |
| `backInStockSuccessText` | TEXT | — | Metinler | `pdp-back-in-stock` |
| `backInStockLoginText` | TEXT | — | Metinler | `pdp-back-in-stock` |
| `showPayWithIkas` | BOOLEAN | — | Ayarlar | `pdp-pay` |
| `shippingText` | RICH_TEXT | — | Metinler | `pdp-accordions` |
| `highlights` | COMPONENT_LIST | — | Bileşenler | `pdp-highlights` |
| `backgroundColor` | COLOR | — | Renkler | — |
| `updateCartText` | TEXT | — | Metinler | `add-to-cart-button` |
| `updatingCartText` | TEXT | — | Metinler | `add-to-cart-button` |
| `stockLocationsTitle` | TEXT | — | Metinler | `pdp-stock-locations` |
| `pickupText` | TEXT | — | Metinler | `pdp-stock-locations` |
| `optionSetErrorText` | TEXT | — | Metinler | `pdp-options` |

- **Çocuklar:** `highlights` COMPONENT_LIST → ServiceHighlight (`icon` SVG, `title` TEXT, `text` TEXT)
- **Veri bağlı metinler:** `breadcrumbs` = `category.path`, `pdp-video` = `product.video`, `pdp-badges` = `product.badge`, `pdp-title` = `product.name`, `pdp-rating` = `product.stars`, `pdp-rating` = `product.reviewCount`, `pdp-sku` = `variant.sku`, `pdp-price` = `product.price`, `pdp-price` = `product.compareAtPrice`, `pdp-campaign` = `campaign.title`, `pdp-tiers` = `tier.range`, `pdp-tiers` = `tier.unitPrice`, `pdp-group` = `productGroup.image`, `pdp-variants` = `variant.value`, `pdp-variant-swatches` = `variant.thumbnail`, `pdp-options` = `option.name`, `pdp-options` = `option.price`, `pdp-stock-note` = `variant.stockCount`, `pdp-stock-locations` = `stockLocation.name`, `pdp-stock-locations` = `stockLocation.stock`, `pdp-offers` = `offer.title`, `offers-summary` = `offers.compareTotal`, `offers-summary` = `offers.total`, `offers-summary` = `offers.discount`, `pdp-accordions` = `product.description`, `pdp-video-time` = `product.video.duration`, `pdp-group-value` = `productGroup.current`, `pdp-variant-label` = `variant.name`, `option-input-text` = `option.placeholder`, `option-select-value` = `option.value`, `pdp-bundle-count` = `bundle.count`, `pdp-pay-label` = `payWithIkas.label`, `pdp-offers-text` = `offer.description`
- **Kod metinleri:** `option-text` (charCount), `option-select` (selectionLimit), `charCount`, `option-limit`, `option-textarea-count`, `selectionLimit`
- **Animasyonlar:** I-PDP-01, I-PDP-02, I-PDP-03, I-PDP-04, I-PDP-05, I-PDP-06, I-PDP-07
- **Overlay'ler:** `ImagePreview` (açık)

#### ProductDetail › Overlay ImagePreview

- **Cihazlar:** desktop, mobile · **Frame'ler:** `I/Overlay/ImagePreview@desktop — açık` (jXdI6) · `I/Overlay/ImagePreview@mobile — açık` (y2P4iK)
- **Animasyonlar:** I-PREV-01
- **Yalnız masaüstü katmanlar:** `.preview-nav` — mobilde render edilmez ya da `@media (max-width: bp(<mobile id>))` altında `display: none`

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `closeAriaLabel` | TEXT | — | Metinler | `close-button` |

### ProductReviews

- **Şablon:** `product-reviews-section` · **Bayraklar:** —
- **Frame'ler:** `I/Section/ProductReviews@desktop` (LaMVj) · `I/Section/ProductReviews@mobile` (Aqk9L)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `title` | TEXT | — | Metinler | `reviews-title` |
| `reviewsCountText` | TEXT | — | Metinler | `reviews-score` |
| `writeReviewText` | TEXT | — | Metinler | `write-review-button` |
| `verifiedText` | TEXT | — | Metinler | `reviews-list` |
| `emptyTitle` | TEXT | — | Metinler | `reviews-empty` |
| `emptyText` | TEXT | — | Metinler | `reviews-empty` |
| `formTitle` | TEXT | — | Metinler | `review-form` |
| `ratingLabel` | TEXT | — | Metinler | `review-form` |
| `reviewTitleLabel` | TEXT | — | Metinler | `review-form` |
| `reviewTextLabel` | TEXT | — | Metinler | `review-form` |
| `submitText` | TEXT | — | Metinler | `review-form` |
| `submittingText` | TEXT | — | Metinler | `review-form` |
| `successText` | TEXT | — | Metinler | `review-form` |
| `loginRequiredText` | TEXT | — | Metinler | `review-form` |
| `backgroundColor` | COLOR | — | Renkler | — |
| `merchantReplyLabel` | TEXT | — | Metinler | `merchant-reply` |

- **Çocuklar:** —
- **Veri bağlı metinler:** `reviews-score` = `product.stars`, `reviews-score` = `product.reviewCount`, `reviews-bars` = `review.countByStar`, `reviews-list` = `review.title`, `reviews-list` = `review.comment`, `reviews-list` = `review.author`, `reviews-list` = `review.date`, `review-images` = `review.images`, `merchant-reply` = `review.reply`
- **Kod metinleri:** `reviews-bars` (star), `reviews-pagination` (page), `page`, `page-gap`, `page-label`, `rating-bar-star`, `star`
- **Animasyonlar:** I-REV-01, I-REV-02
- **Overlay'ler:** —

### CartPage

- **Şablon:** `cart-section` · **Bayraklar:** —
- **Frame'ler:** `I/Section/CartPage@desktop` (WG5MX) · `I/Section/CartPage@mobile` (KiCFp)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `title` | TEXT | — | Metinler | `cart-title` |
| `emptyTitle` | TEXT | — | Metinler | `cart-empty` |
| `emptyText` | TEXT | — | Metinler | `cart-empty` |
| `emptyButtonText` | TEXT | — | Metinler | `cart-empty` |
| `couponPlaceholder` | TEXT | — | Metinler | `coupon-form` |
| `couponButtonText` | TEXT | — | Metinler | `coupon-form` |
| `couponErrorText` | TEXT | — | Metinler | `coupon-message` |
| `couponSuccessText` | TEXT | — | Metinler | `coupon-message` |
| `couponRemoveText` | TEXT | — | Metinler | `coupon-applied` |
| `subtotalLabel` | TEXT | — | Metinler | `summary-rows` |
| `shippingLabel` | TEXT | — | Metinler | `summary-rows` |
| `totalLabel` | TEXT | — | Metinler | `summary-rows` |
| `checkoutText` | TEXT | — | Metinler | `checkout-button` |
| `checkoutLoadingText` | TEXT | — | Metinler | `checkout-button` |
| `removeText` | TEXT | — | Metinler | `cart-lines` |
| `summaryTitle` | TEXT | — | Metinler | — |
| `summaryNote` | TEXT | — | Metinler | — |
| `recommendTitle` | TEXT | — | Metinler | `cart-recommendations` |
| `recommendProducts` | PRODUCT_LIST | — (merchant verisi) | İçerik | `cart-recommendations` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** —
- **Veri bağlı metinler:** `cart-title` = `cart.itemCount`, `coupon-applied` = `cart.couponCode`, `summary-rows` = `cart.subtotal`, `summary-rows` = `cart.shipping`, `summary-rows` = `cart.total`, `cart-adjustments` = `adjustment.name`, `cart-adjustments` = `adjustment.amount`
- **Kod metinleri:** —
- **Animasyonlar:** I-CRTP-01, I-CRTP-02
- **Overlay'ler:** —

### Account

- **Şablon:** `account-info-section` · **Bayraklar:** —
- **Frame'ler:** `I/Section/Account@desktop` (Gc7le) · `I/Section/Account@mobile` (y1RlC)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `greetingText` | TEXT | — | Metinler | `account-header` |
| `infoTabText` | TEXT | — | Metinler | `account-tabs` |
| `ordersTabText` | TEXT | — | Metinler | `account-tabs` |
| `addressesTabText` | TEXT | — | Metinler | `account-tabs` |
| `favoritesTabText` | TEXT | — | Metinler | `account-tabs` |
| `logoutText` | TEXT | — | Metinler | `account-tabs` |
| `saveText` | TEXT | — | Metinler | `info-form` |
| `savingText` | TEXT | — | Metinler | `info-form` |
| `savedText` | TEXT | — | Metinler | `info-form` |
| `ordersEmptyText` | TEXT | — | Metinler | `orders-empty` |
| `addressesEmptyText` | TEXT | — | Metinler | `addresses-list` |
| `addAddressText` | TEXT | — | Metinler | `addresses-list` |
| `ordersColumnLabels` | TEXT | — | Metinler | — |
| `orderDetailTitle` | TEXT | — | Metinler | `order-detail` |
| `cargoLabel` | TEXT | — | Metinler | `order-packages` |
| `trackingLabel` | TEXT | — | Metinler | `order-packages` |
| `copiedText` | TEXT | — | Metinler | `order-packages` |
| `returnTitle` | TEXT | — | Metinler | `return-form` |
| `returnButtonText` | TEXT | — | Metinler | `order-summary` |
| `returnSuccessText` | TEXT | — | Metinler | `return-form` |
| `settingsTabText` | TEXT | — | Metinler | `account-settings` |
| `marketingText` | TEXT | — | Metinler | `account-settings` |
| `phoneLabel` | TEXT | — | Metinler | `account-settings` |
| `deleteAccountText` | TEXT | — | Metinler | `account-settings` |
| `exportDataText` | TEXT | — | Metinler | `account-settings` |
| `errorText` | TEXT | — | Metinler | `orders-error` |
| `retryText` | TEXT | — | Metinler | `orders-error` |
| `editText` | TEXT | — | Metinler | `address-card-actions` |
| `deleteText` | TEXT | — | Metinler | `address-card-actions` |
| `makeDefaultText` | TEXT | — | Metinler | `address-card-actions` |
| `defaultBadgeText` | TEXT | — | Metinler | `address-card-actions` |
| `confirmDeleteText` | TEXT | — | Metinler | `address-delete-confirm` |
| `cancelText` | TEXT | — | Metinler | `address-delete-confirm` |
| `addressFormTitle` | TEXT | — | Metinler | `address-form` |
| `accountDeleteConfirmText` | TEXT | — | Metinler | `account-delete-confirm` |
| `passwordLabel` | TEXT | — | Metinler | `account-delete-confirm` |
| `backgroundColor` | COLOR | — | Renkler | — |
| `subtotalLabel` | TEXT | — | Metinler | `order-summary` |
| `corporateText` | TEXT | — | Metinler | `ilçe` |
| `defaultAddressText` | TEXT | — | Metinler | `ilçe` |

- **Çocuklar:** —
- **Veri bağlı metinler:** `account-header` = `customer.firstName`, `orders-list` = `order.number`, `orders-list` = `order.date`, `orders-list` = `order.status`, `orders-list` = `order.total`, `addresses-list` = `customer.address`, `order-detail` = `order.number`, `order-detail` = `order.status`, `order-packages` = `package.status`, `order-packages` = `package.cargoCompany`, `order-packages` = `package.trackingNumber`, `order-items` = `order.line.title`, `order-items` = `order.line.price`, `order-addresses` = `order.shippingAddress`, `order-addresses` = `order.billingAddress`, `order-summary` = `order.subtotal`, `order-summary` = `order.total`, `address-form` = `addressForm.fields`, `address-title` = `customer.addressTitle`, `field-label` = `addressForm.label`, `address-select-value` = `addressForm.value`, `od-item-variant` = `order.line.variant`, `od-value` = `order.payment`, `od-value` = `order.adjustment`, `od-value` = `order.shipping`
- **Kod metinleri:** `od-address-label`
- **Animasyonlar:** I-ACC-01
- **Overlay'ler:** —

### AuthForms

- **Şablon:** `login-section` · **Bayraklar:** —
- **Frame'ler:** `I/Section/AuthForms@desktop` (jnyOb) · `I/Section/AuthForms@mobile` (QVD4w)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `variant` | ENUM | — | Ayarlar | — |
| `image` | IMAGE | — (merchant verisi) | Görseller | `auth-media` |
| `loginTitle` | TEXT | — | Metinler | `auth-title` |
| `registerTitle` | TEXT | — | Metinler | `auth-title` |
| `forgotTitle` | TEXT | — | Metinler | `auth-title` |
| `recoverTitle` | TEXT | — | Metinler | `auth-title` |
| `loginText` | TEXT | — | Metinler | `auth-text` |
| `registerText` | TEXT | — | Metinler | `auth-text` |
| `forgotText` | TEXT | — | Metinler | `auth-text` |
| `recoverText` | TEXT | — | Metinler | `auth-text` |
| `submitText` | TEXT | — | Metinler | `auth-button` |
| `submittingText` | TEXT | — | Metinler | `auth-button` |
| `emailLabel` | TEXT | — | Metinler | `FormField` |
| `passwordLabel` | TEXT | — | Metinler | `FormField` |
| `firstNameLabel` | TEXT | — | Metinler | `FormField` |
| `lastNameLabel` | TEXT | — | Metinler | `FormField` |
| `consentText` | TEXT | — | Metinler | `auth-extra-stage` |
| `marketingConsentText` | TEXT | — | Metinler | `register-consents` |
| `agreementConsentText` | TEXT | — | Metinler | `register-consents` |
| `socialDividerText` | TEXT | — | Metinler | `social-login` |
| `googleText` | TEXT | — | Metinler | `social-login` |
| `facebookText` | TEXT | — | Metinler | `social-login` |
| `smsLoginText` | TEXT | — | Metinler | `sms-login` |
| `phoneLabel` | TEXT | — | Metinler | `FormField` |
| `codeLabel` | TEXT | — | Metinler | `FormField` |
| `resendCodeText` | TEXT | — | Metinler | `FormField` |
| `successText` | TEXT | — | Metinler | `auth-message` |
| `errorText` | TEXT | — | Metinler | `auth-message` |
| `invalidTokenText` | TEXT | — | Metinler | `auth-message` |
| `switchText` | TEXT | — | Metinler | `auth-switch` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** —
- **Veri bağlı metinler:** —
- **Kod metinleri:** —
- **Animasyonlar:** I-AUTH-01, I-AUTH-02
- **Overlay'ler:** —
- **Yalnız masaüstü katmanlar:** `.auth-media` — mobilde render edilmez ya da `@media (max-width: bp(<mobile id>))` altında `display: none`

### NotFound

- **Şablon:** `not-found-section` · **Bayraklar:** —
- **Frame'ler:** `I/Section/NotFound@desktop` (t5Hl1z) · `I/Section/NotFound@mobile` (r2HnVM)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `title` | TEXT | — | Metinler | `not-found-title` |
| `text` | TEXT | — | Metinler | `not-found-text` |
| `buttonText` | TEXT | — | Metinler | `not-found-button` |
| `buttonLink` | LINK | — | Bağlantılar | `not-found-button` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** —
- **Veri bağlı metinler:** —
- **Kod metinleri:** `not-found-code` (statusCode), `digit-reel`
- **Animasyonlar:** I-NF-01, I-NF-02
- **Overlay'ler:** —

### EmailVerification

- **Şablon:** `email-verification-section` · **Bayraklar:** —
- **Frame'ler:** `I/Section/EmailVerification@desktop` (YJHrE) · `I/Section/EmailVerification@mobile` (TmA1J)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `verifyingText` | TEXT | — | Metinler | `verify-title` |
| `successTitle` | TEXT | — | Metinler | `verify-title` |
| `successText` | TEXT | — | Metinler | `verify-text` |
| `errorTitle` | TEXT | — | Metinler | `verify-title` |
| `errorText` | TEXT | — | Metinler | `verify-text` |
| `buttonText` | TEXT | — | Metinler | `verify-button` |
| `resendTitle` | TEXT | — | Metinler | `resend-form` |
| `resendButtonText` | TEXT | — | Metinler | `resend-form` |
| `resendSuccessText` | TEXT | — | Metinler | `resend-form` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** —
- **Veri bağlı metinler:** —
- **Kod metinleri:** —
- **Animasyonlar:** I-EMV-01
- **Overlay'ler:** —

### BlogList

- **Şablon:** `blog-home-section` · **Bayraklar:** —
- **Frame'ler:** `I/Section/BlogList@desktop` (bWa5p) · `I/Section/BlogList@mobile` (OLmDR)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `title` | TEXT | — | Metinler | `section-title` |
| `subtitle` | TEXT | — | Metinler | `section-subtitle` |
| `allTabText` | TEXT | — | Metinler | `blog-tabs` |
| `loadMoreText` | TEXT | — | Metinler | `blog-more-button` |
| `emptyText` | TEXT | — | Metinler | `blog-empty` |
| `blogs` | BLOG_LIST | — (merchant verisi) | İçerik | `blog-grid` |
| `categories` | BLOG_CATEGORY_LIST | — (merchant verisi) | İçerik | `blog-grid` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** —
- **Veri bağlı metinler:** `blog-tabs` = `blog.category`, `BlogCard` = `blog.title`, `BlogCard` = `blog.date`
- **Kod metinleri:** —
- **Animasyonlar:** I-BLOG-01, I-BLOG-02
- **Overlay'ler:** —

### BlogPost

- **Şablon:** `blog-post-section` · **Bayraklar:** —
- **Frame'ler:** `I/Section/BlogPost@desktop` (x0lR5E) · `I/Section/BlogPost@mobile` (p5cyj6)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `backLinkText` | TEXT | — | Metinler | `link` |
| `shareText` | TEXT | — | Metinler | `post-share` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** —
- **Veri bağlı metinler:** `post-meta` = `blog.category`, `post-meta` = `blog.date`, `post-meta` = `blog.author`, `post-title` = `blog.title`, `post-paragraph` = `blog.content`
- **Kod metinleri:** —
- **Animasyonlar:** I-BLP-01, I-BLP-02
- **Overlay'ler:** —

### BlogRelated

- **Şablon:** `blog-home-section` · **Bayraklar:** —
- **Frame'ler:** `I/Section/BlogRelated@desktop` (ipZRD) · `I/Section/BlogRelated@mobile` (oxYSJ)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `title` | TEXT | — | Metinler | `related-title` |
| `blogs` | BLOG_LIST | — (merchant verisi) | İçerik | `related-grid` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** —
- **Veri bağlı metinler:** —
- **Kod metinleri:** —
- **Animasyonlar:** I-BREL-01
- **Overlay'ler:** —

### StoreList

- **Şablon:** (özel) · **Bayraklar:** `container`, `custom`
- **Frame'ler:** `I/Section/StoreList@desktop` (be2Kh) · `I/Section/StoreList@mobile` (w1SRI)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `title` | TEXT | — | Metinler | `section-title` |
| `subtitle` | TEXT | — | Metinler | `section-subtitle` |
| `mapLinkText` | TEXT | — | Metinler | `link` |
| `hoursLabel` | TEXT | — | Metinler | `store-hours` |
| `stores` | COMPONENT_LIST | — | Bileşenler | `store-grid` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** `stores` COMPONENT_LIST → StoreItem (`image` IMAGE, `name` TEXT, `address` TEXT, `hours` TEXT, `mapLink` LINK)
- **Veri bağlı metinler:** —
- **Kod metinleri:** —
- **Animasyonlar:** I-STOR-01, I-STOR-02
- **Overlay'ler:** —

### ContactForm

- **Şablon:** (özel) · **Bayraklar:** `container`, `custom`
- **Frame'ler:** `I/Section/ContactForm@desktop` (HIO49) · `I/Section/ContactForm@mobile` (yw9lH)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `title` | TEXT | — | Metinler | `contact-title` |
| `intro` | TEXT | — | Metinler | `contact-intro` |
| `responseText` | TEXT | — | Metinler | `contact-intro` |
| `formTitle` | TEXT | — | Metinler | `contact-form-title` |
| `topicLabel` | TEXT | — | Metinler | `topic-group` |
| `firstNameLabel` | TEXT | — | Metinler | `contact-row` |
| `lastNameLabel` | TEXT | — | Metinler | `contact-row` |
| `emailLabel` | TEXT | — | Metinler | `contact-row` |
| `phoneLabel` | TEXT | — | Metinler | `contact-row` |
| `orderLabel` | TEXT | — | Metinler | `contact-row` |
| `messageLabel` | TEXT | — | Metinler | `contact-message-field` |
| `messagePlaceholder` | TEXT | — | Metinler | `contact-message-field` |
| `consentText` | TEXT | — | Metinler | `contact-submit-row` |
| `submitText` | TEXT | — | Metinler | `contact-button` |
| `submittingText` | TEXT | — | Metinler | `contact-button` |
| `successText` | TEXT | — | Metinler | `contact-message` |
| `errorText` | TEXT | — | Metinler | `contact-message` |
| `socialTitle` | TEXT | — | Metinler | `contact-social` |
| `topics` | COMPONENT_LIST | — | Bileşenler | `topic-group` |
| `channels` | COMPONENT_LIST | — | Bileşenler | `contact-channels` |
| `socialLinks` | COMPONENT_LIST | — | Bileşenler | `contact-social` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** `topics` COMPONENT_LIST → ContactTopic (`label` TEXT), `channels` COMPONENT_LIST → ContactChannel (`icon` SVG, `value` TEXT, `hint` TEXT, `link` LINK, `dark` BOOLEAN), `socialLinks` COMPONENT_LIST → SocialLink
- **Veri bağlı metinler:** —
- **Kod metinleri:** —
- **Animasyonlar:** I-CONT-01, I-CONT-02, I-CONT-03, I-CONT-04
- **Overlay'ler:** —

### StoreLocator

- **Şablon:** (özel) · **Bayraklar:** `container`, `custom`
- **Frame'ler:** `I/Section/StoreLocator@desktop` (G6eqZ) · `I/Section/StoreLocator@mobile` (lAyJ2)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `title` | TEXT | — | Metinler | `locator-head` |
| `text` | TEXT | — | Metinler | `locator-head` |
| `allStoresText` | TEXT | — | Metinler | `locator-head` |
| `directionsText` | TEXT | — | Metinler | `store-feature-card` |
| `openNowText` | TEXT | — | Metinler | `store-feature-card` |
| `closedText` | TEXT | — | Metinler | `store-row` |
| `allStoresLink` | LINK | — | Bağlantılar | `locator-head` |
| `stores` | COMPONENT_LIST | — | Bileşenler | `store-rows` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** `stores` COMPONENT_LIST → StoreItem (`image` IMAGE, `name` TEXT, `district` TEXT, `address` TEXT, `hours` TEXT, `statusNote` TEXT, `mapLink` LINK)
- **Veri bağlı metinler:** —
- **Kod metinleri:** `store-row` (storeStatus), `store-row-status`, `storeStatus`
- **Animasyonlar:** I-LOC-01, I-LOC-02
- **Overlay'ler:** —

### FaqList

- **Şablon:** (özel) · **Bayraklar:** `container`, `custom`
- **Frame'ler:** `I/Section/FaqList@desktop` (gzY1F) · `I/Section/FaqList@mobile` (Fbo5v)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `title` | TEXT | — | Metinler | `faq-intro` |
| `text` | TEXT | — | Metinler | `faq-intro` |
| `items` | COMPONENT_LIST | — | Bileşenler | `faq-items` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** `items` COMPONENT_LIST → FaqItem (`question` TEXT, `answer` RICH_TEXT)
- **Veri bağlı metinler:** —
- **Kod metinleri:** —
- **Animasyonlar:** I-FAQ-01
- **Overlay'ler:** —

### RichText

- **Şablon:** `rich-text-section` · **Bayraklar:** —
- **Frame'ler:** `I/Section/RichText@desktop` (p5WWnV) · `I/Section/RichText@mobile` (GI9ks)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `title` | TEXT | — | Metinler | `rich-title` |
| `updatedText` | TEXT | — | Metinler | `rich-meta` |
| `content` | RICH_TEXT | — | Metinler | `rich-body` |
| `showToc` | BOOLEAN | — | Ayarlar | — |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** —
- **Veri bağlı metinler:** —
- **Kod metinleri:** `rich-toc` (headings), `headings`, `rich-toc-item`, `rich-toc-label`
- **Animasyonlar:** I-TXT-01
- **Overlay'ler:** —
- **Yalnız masaüstü katmanlar:** `.rich-toc-item` — mobilde render edilmez ya da `@media (max-width: bp(<mobile id>))` altında `display: none`

### OrderTracking

- **Şablon:** (özel) · **Bayraklar:** `custom`
- **Frame'ler:** `I/Section/OrderTracking@desktop` (hYnvw) · `I/Section/OrderTracking@mobile` (d72xJ)

| Prop | Tip | Varsayılan | Grup | Katman |
|---|---|---|---|---|
| `title` | TEXT | — | Metinler | `tracking-intro` |
| `text` | TEXT | — | Metinler | `tracking-intro` |
| `emailLabel` | TEXT | — | Metinler | `tracking-form` |
| `orderNumberLabel` | TEXT | — | Metinler | `tracking-form` |
| `submitText` | TEXT | — | Metinler | `tracking-form` |
| `submittingText` | TEXT | — | Metinler | `tracking-form` |
| `notFoundText` | TEXT | — | Metinler | `tracking-not-found` |
| `statusTitle` | TEXT | — | Metinler | `tracking-result` |
| `backgroundColor` | COLOR | — | Renkler | — |

- **Çocuklar:** —
- **Veri bağlı metinler:** `tracking-result` = `order.status`, `tracking-result` = `package.trackingNumber`, `tracking-order-number` = `order.number`, `tracking-step-label` = `order.statusStep`, `tracking-step-date` = `order.statusDate`, `tracking-row-value` = `package.cargoCompany`, `tracking-item-title` = `order.line.title`, `tracking-item-variant` = `order.line.variant`, `tracking-item-price` = `order.line.price`
- **Kod metinleri:** `tracking-row-label`
- **Animasyonlar:** I-TRK-01
- **Overlay'ler:** —

## Sayfalar

| Sayfa | ikas sayfa tipi | Section'lar (sırayla) |
|---|---|---|
| `Home` | `INDEX` | Header · HeroSlider · ProductGrid · ActivityGrid · StoreSpotlight · Bestsellers · CollectionMosaic · Footer |
| `Category` | `CATEGORY` | Header · ProductList · Footer |
| `Collection` | `COLLECTION` | Header · CollectionHero · ProductList · Footer |
| `Product` | `PRODUCT_DETAIL` | Header · ProductDetail · ProductReviews · ProductGrid · ProductGrid · Footer |
| `Cart` | `CART` | Header · CartPage · Footer |
| `Account` | `ACCOUNT` | Header · Account · Footer |
| `Login` | `LOGIN` | Header · AuthForms · Footer |
| `Register` | `REGISTER` | Header · AuthForms · Footer |
| `ForgotPassword` | `FORGOT_PASSWORD` | Header · AuthForms · Footer |
| `RecoverPassword` | `RECOVER_PASSWORD` | Header · AuthForms · Footer |
| `NotFound` | `NOT_FOUND` | Header · NotFound · ProductGrid · Footer |
| `Search` | `SEARCH` | Header · ProductList · Footer |
| `Favorites` | `FAVORITES` | Header · ProductList · Footer |
| `Blog` | `BLOG` | Header · BlogList · Footer |
| `BlogPost` | `BLOG_POST` | Header · BlogPost · BlogRelated · Footer |
| `EmailVerification` | `CUSTOMER_EMAIL_VERIFICATION` | Header · EmailVerification · Footer |
| `Stores` | `CUSTOM` | Header · StoreSpotlight · StoreList · Footer |
| `Contact` | `CUSTOM` | Header · ContactForm · StoreLocator · FaqList · Footer |
| `Policy` | `CUSTOM` | Header · RichText · Footer |
| `OrderTracking` | `CUSTOM` | Header · OrderTracking · Footer |
| `OrderDetail` | `ORDER_DETAIL` | Header · Account · Footer |

## Animasyon hedefleri

| impl | Hedef |
|---|---|
| `css-transition` | 69 |
| `animejs + io-hook` | 14 |
| `css-keyframes` | 12 |
| `css-keyframes + io-hook` | 3 |
| `css-transition + animejs` | 3 |
| `animejs` | 2 |
| `io-hook + css-transition` | 1 |
| `layout` | 1 |
| `layout + css-transition` | 1 |
| `layout + io-hook` | 1 |
| `scroll-scrub` | 1 |

Tam liste `port-manifest.json` → `animTargets`.

## Kapsama denetimi

- **Header** → kullanılan token'lar: Renk / Zemin (şema slotu Background), Tipografi / Etiket, Renk / Vurgu (şema slotu Accent), `--size-logo`, Tipografi / Arayüz, Tipografi / Rozet, Renk / Çizgi (şema slotu Line)
- **MenuOverlay** → kullanılan token'lar: Tipografi / Etiket, Tipografi / Arayüz, Tipografi / Başlık H4, Renk / Zemin (şema slotu Background), Renk / Perde (şema slotu Scrim), Tipografi / Başlık H3
- **CartDrawer** → kullanılan token'lar: Tipografi / Başlık H4, Tipografi / Gövde, `--space-panel`, Tipografi / Fiyat, Tipografi / Etiket, Renk / Zemin (şema slotu Background), Renk / Perde (şema slotu Scrim)
- **SearchOverlay** → kullanılan token'lar: Tipografi / Başlık H3, Tipografi / Etiket, Tipografi / Başlık H4, Renk / Zemin (şema slotu Background)
- **CookieBar** → kullanılan token'lar: Renk / Ters Zemin (şema slotu PrimaryButton/Background)
- **LocaleSwitcher** → kullanılan token'lar: —
- **ImagePreview** → kullanılan token'lar: —
- **Footer** → kullanılan token'lar: Renk / Perde (şema slotu Scrim), Renk / Şeffaf (global.css), Renk / Zemin (şema slotu Background), Tipografi / Başlık H2, Tipografi / Başlık H4, Renk / Başarı (şema slotu Success), Renk / Hata (şema slotu Danger), Tipografi / Etiket, Tipografi / Arayüz Küçük
- **HeroSlider** → kullanılan token'lar: Renk / Perde (şema slotu Scrim), Tipografi / Display, Tipografi / Gövde, Tipografi / Etiket, `--size-hero`, `--space-page`
- **ProductGrid** → kullanılan token'lar: Tipografi / Başlık H2, Tipografi / Gövde, `--space-section`, `--space-grid`
- **ActivityGrid** → kullanılan token'lar: Tipografi / Başlık H2, Tipografi / Gövde, Renk / Şeffaf (global.css), Renk / Perde (şema slotu Scrim), Tipografi / Başlık H3, Tipografi / Başlık H4, Tipografi / Arayüz Küçük, `--space-section`, `--space-page`
- **StoreSpotlight** → kullanılan token'lar: Tipografi / Başlık H3, Tipografi / Gövde, Tipografi / Etiket, Tipografi / Display, Tipografi / Arayüz Küçük, `--space-section`, `--space-panel`
- **Bestsellers** → kullanılan token'lar: Tipografi / Başlık H2, Tipografi / Gövde, Tipografi / Başlık H4, Tipografi / Fiyat, `--space-section`, `--space-panel`, Renk / Yüzey (şema slotu Surface)
- **QuickBuy** → kullanılan token'lar: Tipografi / Başlık H3, Tipografi / Başlık H4, Tipografi / Etiket, Renk / Hata (şema slotu Danger), Renk / Zemin (şema slotu Background), Renk / Perde (şema slotu Scrim), `--space-panel`
- **CollectionMosaic** → kullanılan token'lar: Tipografi / Başlık H2, Tipografi / Gövde, Renk / Perde (şema slotu Scrim), Renk / Şeffaf (global.css), `--space-section`, `--space-grid`, `--space-panel`, Tipografi / Başlık H3
- **ProductList** → kullanılan token'lar: Tipografi / Başlık H2, Tipografi / Etiket, Tipografi / Başlık H3
- **FilterDrawer** → kullanılan token'lar: Tipografi / Başlık H4
- **CollectionHero** → kullanılan token'lar: Renk / Perde (şema slotu Scrim), Tipografi / Display, Tipografi / Gövde
- **ProductDetail** → kullanılan token'lar: Tipografi / Başlık H3, Tipografi / Etiket, Tipografi / Fiyat, Tipografi / Arayüz Küçük, Renk / Hata (şema slotu Danger), Tipografi / Başlık H4, Renk / Yüzey (şema slotu Surface), Tipografi / Arayüz
- **ProductReviews** → kullanılan token'lar: Tipografi / Başlık H2, Tipografi / Display, `--space-section`
- **CartPage** → kullanılan token'lar: Tipografi / Başlık H2, Tipografi / Başlık H3, Tipografi / Başlık H4, Renk / Hata (şema slotu Danger), Renk / Başarı (şema slotu Success), Renk / Yüzey (şema slotu Surface), `--space-panel`
- **Account** → kullanılan token'lar: Tipografi / Başlık H2
- **AuthForms** → kullanılan token'lar: Tipografi / Başlık H2, Tipografi / Gövde, Renk / Başarı (şema slotu Success), Renk / Hata (şema slotu Danger)
- **NotFound** → kullanılan token'lar: Tipografi / Display, Tipografi / Başlık H2, Tipografi / Gövde
- **EmailVerification** → kullanılan token'lar: Renk / Başarı (şema slotu Success), Renk / Hata (şema slotu Danger), Tipografi / Başlık H3, Tipografi / Gövde
- **BlogList** → kullanılan token'lar: Tipografi / Başlık H2, Tipografi / Gövde
- **BlogPost** → kullanılan token'lar: Tipografi / Etiket, Tipografi / Başlık H2, Tipografi / Gövde, Tipografi / Başlık H4
- **BlogRelated** → kullanılan token'lar: Tipografi / Başlık H2, `--space-section`
- **StoreList** → kullanılan token'lar: Tipografi / Başlık H2, Tipografi / Gövde, Tipografi / Başlık H4, Tipografi / Arayüz Küçük, `--space-section`
- **ContactForm** → kullanılan token'lar: Tipografi / Display, Tipografi / Gövde, Tipografi / Başlık H3, Renk / Başarı (şema slotu Success), Renk / Hata (şema slotu Danger), Tipografi / Başlık H4, Tipografi / Arayüz Küçük, `--space-section`
- **StoreLocator** → kullanılan token'lar: Tipografi / Başlık H2, `--space-section`
- **FaqList** → kullanılan token'lar: Tipografi / Başlık H2, Tipografi / Gövde, `--space-section`
- **RichText** → kullanılan token'lar: Tipografi / Başlık H2, Tipografi / Etiket, `--space-section`
- **OrderTracking** → kullanılan token'lar: Tipografi / Başlık H2
- **Sub/ProductCard** → kullanılan token'lar: Renk / Yüzey (şema slotu Surface), Tipografi / Ürün Adı, Tipografi / Fiyat
- **Sub/ProductCardSmall** → kullanılan token'lar: Renk / Yüzey (şema slotu Surface), Tipografi / Ürün Adı, Tipografi / Fiyat
- **Sub/BlogCard** → kullanılan token'lar: Tipografi / Etiket, Tipografi / Başlık H4
- **Sub/Button** → kullanılan token'lar: Tipografi / Arayüz, Renk / Ters Zemin (şema slotu PrimaryButton/Background), Renk / Zemin (şema slotu Background), Renk / Çizgi (şema slotu Line)
- **Sub/ArrowLink** → kullanılan token'lar: Tipografi / Arayüz
- **Sub/Badge** → kullanılan token'lar: Tipografi / Rozet, Renk / Zemin (şema slotu Background), Renk / Ters Zemin (şema slotu PrimaryButton/Background), Renk / Vurgu (şema slotu Accent), Renk / Vurgu Üstü Metin (şema slotu AccentText), Renk / Yüzey (şema slotu Surface)
- **Sub/FavoriteButton** → kullanılan token'lar: Renk / Zemin (şema slotu Background), Renk / Metin (şema slotu Text), Renk / Vurgu (şema slotu Accent)
- **Sub/Counter** → kullanılan token'lar: `font-mono` (Inter Tight), Tipografi / Etiket, Tipografi / Display, Tipografi / Rozet
- **Sub/Breadcrumbs** → kullanılan token'lar: Tipografi / Etiket, Renk / Metin (şema slotu Text)
- **Sub/Tabs** → kullanılan token'lar: Renk / Metin (şema slotu Text), Tipografi / Arayüz
- **Sub/VariantChip** → kullanılan token'lar: Renk / Çizgi (şema slotu Line), Renk / Ters Zemin (şema slotu PrimaryButton/Background)
- **Sub/FormField** → kullanılan token'lar: Tipografi / Etiket, Renk / Çizgi (şema slotu Line), Tipografi / Arayüz, Renk / Hata (şema slotu Danger)
- **Sub/Checkbox** → kullanılan token'lar: Renk / Çizgi (şema slotu Line), Renk / Ters Zemin (şema slotu PrimaryButton/Background), Tipografi / Arayüz Küçük
- **Sub/AccordionItem** → kullanılan token'lar: Tipografi / Arayüz, Tipografi / Gövde
- **Sub/QuantitySelector** → kullanılan token'lar: Renk / Çizgi (şema slotu Line)
- **Sub/SectionHeading** → kullanılan token'lar: Tipografi / Başlık H2, Tipografi / Gövde
- **Sub/IconButton** → kullanılan token'lar: Tipografi / Arayüz
- **Sub/Spinner** → kullanılan token'lar: Renk / Vurgu (şema slotu Accent)
- **Sub/CartLineItem** → kullanılan token'lar: Renk / Yüzey (şema slotu Surface), Tipografi / Ürün Adı, Tipografi / Etiket, Tipografi / Fiyat, Tipografi / Arayüz Küçük
- **Sub/OfferCard** → kullanılan token'lar: Renk / Çizgi (şema slotu Line), Renk / Ters Zemin (şema slotu PrimaryButton/Background), Tipografi / Ürün Adı
- **Sub/BundleItem** → kullanılan token'lar: Tipografi / Ürün Adı
- **Sub/RatingStars** → kullanılan token'lar: Renk / Metin (şema slotu Text), Renk / Çizgi (şema slotu Line)
- **Sub/ReviewCard** → kullanılan token'lar: Tipografi / Ürün Adı, Tipografi / Gövde, Renk / Yüzey (şema slotu Surface)
- **Sub/VariantSwatch** → kullanılan token'lar: Renk / Metin (şema slotu Text)
- **Sub/PriceRange** → kullanılan token'lar: Renk / Çizgi (şema slotu Line), Renk / Metin (şema slotu Text)
- **Sub/SocialLoginButton** → kullanılan token'lar: Renk / Çizgi (şema slotu Line)
- **Sub/Skeleton** → kullanılan token'lar: Renk / Yüzey (şema slotu Surface)

| Kontrol | Sonuç | Not |
|---|---|---|
| Her global en az bir bileşende kullanılıyor | kaldı | kullanılmayan: `color-muted`, `color-inverse-text`, `space-card`, `space-xs`, `space-sm`, `space-md`, `size-header`, `size-line`, `opacity-inactive`, `radius-card`, `radius-pill` |
| Canvas'taki her `$değişken` bir global'e ya da `global.css`'e eşleniyor | geçti | plan ağacı üzerinden denetlendi (canvas dump'ı değişken taşımaz) |
| Kapsamdaki her sayfa tipinin sayfası ve section'ı var | geçti | varsayılan kapsam tam (brief okunmadı; 06-page-coverage §2 varsayılan kapsamı) |
| Her anim hedefinin izinli bir `impl`'i (ve gerekiyorsa keyframe'i) var | kaldı | keyframe noktaları elle doldurulacak: I-CMP-07 |

## Açık sorular

Açık soru yok.
