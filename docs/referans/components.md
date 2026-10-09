# Components — bileşen envanteri ve ikas eşlemesi

Kaynak: ekran görüntüsü `docs/referans/girdi/01-anasayfa-desktop.jpg` (masaüstü ana sayfa, 1440 varsayımı, ölçek ≈ 2,13). Tüm ölçüler görselden kestirildi [tahmini]. Mobil referans yok.
Token adları ve motion tarifleri (`M-xx`) için: [`globals.md`](./globals.md).

Üç seviye:
- **Section** — ikas `type: section`; `src/components/` altında; editörde sayfaya eklenir. pen.dev'de `I/Section/<Ad>@desktop` + `@mobile`.
- **Component** — bir section'ın `COMPONENT_LIST` slotuna giren çocuk; `src/components/` altında, `type` yok. pen.dev'de slot grubunun öğe katmanı (`{slot:COMPONENT_LIST}`).
- **Sub** — sadece kod içinde kullanılan yardımcı; `src/sub-components/`; `ikas.config.json`'da yer almaz. pen.dev'de `I/Sub/<Ad>`.

Ağaç notasyonu: `{ad:TİP}` = prop (30 tipten biri) · `{data:kaynak}` = mağaza verisinden gelen metin (ör. `product.name`) · `{code:ad}` = kodun ürettiği metin (sayaç, rakam).

Prop tabloları **öneridir**; prop'lar CLI ile eklenir (`npx ikas-component config add-component --props '[...]'`), dosyalar elle düzenlenmez. Varsayılan metinler İsmail için yazılmış örnek Türkçe metinlerdir; referansın hiçbir metni kullanılmadı. Kesin metinler planda belirlenir.

---


> **2026-10-09 · prop yerleşimi:** port için güncel prop listesi plan §6.2 ağaçları ve `docs/port/port-manifest.json`'dır. Overlay prop'ları (kapat etiketleri, arama ve sepet metinleri, `applyFiltersText`, `localeTitle`) sahibi olan section'ın bileşeninde yaşar; tablolarda sahibin altında listelenir. `notifyMeText` kaldırıldı (`backInStockButtonText` aynı düğmeyi anlatır).
## 1. Sayfa → section bileşimi

| Sayfa (ikas sayfa tipi) | Referans URL | Section'lar (sırayla) |
|---|---|---|
| Ana sayfa (INDEX) | `01-anasayfa-desktop.jpg` | HeroSlider · ProductGrid · ActivityGrid · StoreSpotlight · Bestsellers · CollectionMosaic (2026-10-08 revizyonu: ürün ve görsel blokları dönüşümlü) |
| Kategori (CATEGORY) | — | ProductList |
| Koleksiyon (COLLECTION) | — | CollectionHero · ProductList |
| Ürün detay (PRODUCT_DETAIL) | — | ProductDetail · ProductReviews · ProductGrid (birlikte alınanlar) · ProductGrid (son baktıkların) |
| Sepet (CART) | — | CartPage |
| Metin sayfası: hakkımızda, gizlilik, iade (CUSTOM) | — | RichText |
| Sipariş takibi (CUSTOM) | — | OrderTracking |
| Sipariş detayı (ORDER_DETAIL) | — | Account (sipariş detayı hali) |
| Hesabım (ACCOUNT) | — | Account |
| Giriş · Kayıt · Şifremi unuttum · Şifre yenile (LOGIN, REGISTER, FORGOT_PASSWORD, RECOVER_PASSWORD) | — | AuthForms (4 varyant) |
| 404 (NOT_FOUND) | — | NotFound · ProductGrid |
| Arama (SEARCH) | — | ProductList (arama modu) |
| Favoriler (FAVORITES) | — | ProductList (favori modu) |
| Blog (BLOG) | — | BlogList |
| Blog yazısı (BLOG_POST) | — | BlogPost · BlogRelated |
| E-posta doğrulama (CUSTOMER_EMAIL_VERIFICATION) | — | EmailVerification |
| Mağazalar (özel sayfa) | — | StoreSpotlight · StoreList |
| İletişim (özel sayfa) | — | ContactForm · StoreLocator · FaqList |
| Her sayfa | — | Header (üstte) · Footer (altta) |
| Overlay'ler | — | MenuOverlay, CartDrawer, SearchOverlay (Header içinde) · QuickBuy (Bestsellers içinde, ana sayfa) · FilterDrawer (ProductList içinde, mobil) |

**Referansta olmayan ama ikas'ta gereken sayfalar** (tasarımda ayrıca üretilecek, aynı dil ile):

| Sayfa | ikas şablonu | Not |
|---|---|---|
| Kategori (CATEGORY) | `category-list-section` | Ana sayfadaki ürün kartı ve ızgara düzeni aynen kullanılır |
| Koleksiyon (COLLECTION) | `category-list-section` + (özel) kapak | Kapak, koleksiyon karosunun büyütülmüş hali |
| Ürün detay (PRODUCT_DETAIL) | `product-detail-section` + `variant-selection`, `add-to-cart`, `product-pricing`, `image-handling` | Galeri `color-surface` zeminde, radius 12 |
| Sepet (CART) | `cart-section` | Satırlar + sağda özet paneli |
| Hesabım (ACCOUNT) | `account-info-section` | Sekmeler: bilgiler, siparişler, adresler, favoriler, sipariş detayı |
| Giriş / Kayıt / Şifremi unuttum / Şifre yenile | `login-section`, `register-section`, `forgot-password-section`, `recover-password-section` | Tek `AuthForms` section'ı, 4 varyant |
| 404 (NOT_FOUND) | `not-found-section` | Büyük başlık + ana sayfa linki + öneri ızgarası |
| Arama (SEARCH) | `category-list-section` | ProductList, arama başlığıyla |
| Favoriler (FAVORITES) | `favorites` deseni + `category-list-section` | ProductList, favori başlığıyla |
| Blog / Blog yazısı | `blog-home-section`, `blog-post-section` | Referansın menüsünde blog bağlantısı var |
| E-posta doğrulama | `email-verification-section` | Durum mesajı |
| Mağazalar (özel sayfa) | (özel) | Referansın mağaza bloğunun sayfa hali |
| İletişim (özel sayfa) | (özel) + iletişim formu API'si | ikas'ta sayfa tipi ve section şablonu yok; `create_page` ile açılır, form `getContactForm` / `submitContactForm` |

---

## 2. Global section'lar

### Header  `--isHeader`
Referans: duyuru bandı 1440×36 (beyaz zemin, ortalı metin + siyah hap geri sayım). Altında ana satır 1440×72; hero üstünde şeffaf ve beyaz metinli. ikas şablonu: `header-section`.

```
header
├─ announcement-bar           36, color-bg; ortalı
│   ├─ announcement-text      {announcementText:TEXT} text-label
│   └─ countdown-chip         hap, color-inverse-bg
│       └─ countdown-text     {code:countdown} font-mono text-label  ← geri sayım (yerel)
└─ header-main                72, şeffaf (hero üstünde) / color-bg (diğer sayfalar)
    ├─ header-left
    │   ├─ header-logo        {logo:SVG} yükseklik size-logo
    │   └─ header-nav         {navLinks:LIST_OF_LINK} text-ui, aralık 24  ← M-28, M-06 (ilk link)
    └─ header-actions         aralık 24
        ├─ search-button      ikon 16 + {searchLabel:TEXT}
        ├─ cart-button        ikon 16 + {cartLabel:TEXT} + cart-count {data:cart.itemCount}
        └─ account-button     ikon 16 + {accountLabel:TEXT}
(mobil) header-main: menu-button · header-logo (orta) · search-button · cart-button (yalnızca ikon)
```

Durumlar: hero üstünde şeffaf · opak (kaydırınca ya da hero'suz sayfada) · link hover · megamenu açık · mobil menü açık · sepet sayacı 0 / dolu.
Mobil: hamburger solda, logo ortada, arama ve sepet sağda. Nav linkleri ve hesap MenuOverlay'e taşınır. Duyuru bandı kalır; metin tek satıra kısalır.

| Prop | Tip | Varsayılan | Grup |
|---|---|---|---|
| `logo` | SVG | özgün İsmail wordmark | Marka |
| `logoAltText` | TEXT | "İsmail" | Marka |
| `showAnnouncement` | BOOLEAN | true | Duyuru |
| `announcementText` | TEXT | "Kış koleksiyonu yayında — ilk siparişte kargo bizden" | Duyuru |
| `announcementLink` | LINK | — | Duyuru |
| `countdownTarget` | DATE | — | Duyuru |
| `navLinks` | LIST_OF_LINK | Kategoriler, Koleksiyonlar, Mağaza, Blog, Mağazalarımız | Menü |
| `megamenuColumns` | COMPONENT_LIST (`MegamenuColumn`) | 2 sütun | Menü |
| `transparentOnHero` | BOOLEAN | true | Görünüm |
| `searchLabel`, `cartLabel`, `accountLabel` | TEXT | "Ara", "Sepet", "Giriş" | Metinler |
| `menuAriaLabel`, `closeAriaLabel` | TEXT | "Menüyü aç", "Kapat" | Metinler |
| `searchPlaceholder`, `searchEmptyTitle`, `searchNoResultText`, `searchNoResultHint`, `searchAllResultsText` | TEXT | "Ürün, kategori ya da koleksiyon ara", "Ne arıyorsun?", "Sonuç bulunamadı", "Yazımı kontrol et ya da aşağıdaki önerilere göz at.", "Tüm sonuçları gör" | Arama metinleri |
| `cartTitleText`, `cartEmptyTitle`, `cartEmptyText`, `cartEmptyButtonText`, `cartSubtotalLabel`, `cartShippingNote`, `checkoutButtonText`, `checkoutLoadingText`, `cartViewButtonText` | TEXT | "Sepetin", "Sepetin boş", "Rotanı çiz, ekipmanını seç.", "Alışverişe başla", "Ara toplam", "Kargo ödeme adımında hesaplanır", "Ödemeye geç", "Yönlendiriliyor…", "Sepete git" | Sepet metinleri |
| `backgroundColor` | COLOR | `#FFFFFF` | Görünüm |

Çocuk component'ler: `MegamenuColumn` (title TEXT, links LIST_OF_LINK, image IMAGE).
Sub: `IconButton`, `CountdownChip`, `MenuOverlay`, `CartDrawer`, `CartLineItem`, `SearchOverlay`, `ProductCardSmall`, `Button`, `Spinner`.
Motion: M-28 (nav), M-06 (megamenu), M-20 (sepet), M-21 (arama), geri sayım (yerel).

### MenuOverlay (Header overlay)  — M-06
Referans: yok. "Kategoriler" linki kalın ve açılır menü izlenimi veriyor [tahmini].
Masaüstü: header altında tam genişlik megamenu. Sütunlarda link listeleri, sağda bir koleksiyon görseli (radius 12).
Mobil: tam ekran panel. Linkler `text-h3`, alt kategoriler akordeon (M-22). Altta hesap ve favori linkleri, en altta para birimi / dil satırı.

```
menu-overlay
├─ menu-columns       {megamenuColumns:COMPONENT_LIST} → menu-column-title {title:TEXT} + menu-links {links:LIST_OF_LINK}
└─ menu-feature       {image:IMAGE} + {title:TEXT}
```
Durumlar: açık (masaüstü megamenu) · açık (mobil).

### CartDrawer (Header overlay)  — M-20
Referans: yok (header'da yalnızca "Sepet (0)" var). Sağdan açılır, genişlik 440, tam yükseklik, `color-scrim` arka plan.

```
cart-drawer
├─ drawer-header      {cartTitleText:TEXT} + {data:cart.itemCount} + kapat
├─ drawer-body        boş: {cartEmptyTitle:TEXT} {cartEmptyText:TEXT} + buton  |  dolu: CartLineItem ×N (hediye satırı dahil) + drawer-recommend {drawerRecommendTitle:TEXT} ProductCardSmall ×2
└─ drawer-footer      coupon-toggle {couponToggleText:TEXT} · drawer-adjustments {data:adjustment.name} {data:adjustment.amount} · {cartSubtotalLabel:TEXT} {data:cart.subtotal} · {cartShippingNote:TEXT} · ödeme butonu · sepete git linki
```
Durumlar: boş · dolu · yükleniyor (satır güncellenirken).

### SearchOverlay (Header overlay)  — M-21
Referans: yok. Header altından açılan beyaz panel. Büyük arama alanı (`text-h3`, alt çizgili), altında 4'lü ürün sonuç satırı (`ProductCardSmall`) ve "tüm sonuçlar" linki.
Durumlar: boş (öneri kategorileri) · yazarken (sonuçlar) · sonuçsuz.

### QuickBuy (Bestsellers overlay)  — M-20
Referans: yok. Skill standardı: her temada çizilir (06-page-coverage §3a). İsmail'de ana sayfadaki Çok satanlar (Bestsellers) satırında sepet düğmesine basınca açılır. Ürün listesinden çıkmadan varyant seçip sepete eklemeyi sağlar.
- **Masaüstü:** ortada 960 × 600 pencere, `radius-card`. Solda 480 × 600 görsel; üstünde rozet, altında `1 / 4` sayacı ve oklar. Sağda ad, fiyat, renk yuvarlakları (VariantSwatch) ve beden çipleri (VariantChip), adet + Sepete ekle + favori, Hızlı Öde yuvası (PayWithIkas), stok notu ve ürün detayı linki.
- **Mobil:** alttan açılan alt sayfa. Tutamak; 96 × 120 görsel + ad + fiyat + kapat; ardından renk yuvarlakları ve beden çipleri, eylemler, Hızlı Öde ve alt satır.

```
quickbuy-overlay
├─ scrim
└─ quickbuy-panel
    ├─ qb-media           {data:product.image} + Badge + {code:index} + qb-prev / qb-next
    └─ qb-details
        ├─ qb-head        {data:product.name} + kapat {closeAriaLabel:TEXT}
        ├─ qb-price       {data:product.price} + {data:product.compareAtPrice}
        ├─ qb-variants
        │   ├─ qb-variant-group  renk: {data:variant.name} + qb-variant-swatches → VariantSwatch ×N {data:variant.thumbnail}
        │   └─ qb-variant-group  beden: {data:variant.name} + qb-variant-row → VariantChip ×N · qb-variant-error {chooseOptionText:TEXT}
        ├─ qb-actions     QuantitySelector + Button {addText:TEXT} / {addingText:TEXT} / {soldOutText:TEXT} + FavoriteButton
        ├─ qb-pay         PayWithIkas yuvası {showPayWithIkas:BOOLEAN}
        └─ qb-foot        {data:variant.stockCount} + ArrowLink {detailLinkText:TEXT}
```
| Prop | Tip | Varsayılan |
|---|---|---|
| `addText` | TEXT | Sepete ekle |
| `addingText` | TEXT | Ekleniyor… |
| `soldOutText` | TEXT | Tükendi |
| `chooseOptionText` | TEXT | Önce beden seç. |
| `detailLinkText` | TEXT | Ürün detayına git |
| `closeAriaLabel` | TEXT | Kapat |
| `showPayWithIkas` | BOOLEAN | true |

Durumlar: açık (beden seçili) · seçim eksik (beden etiketi ve uyarı `color-danger`) · ekleniyor (Button yükleniyor). Ekleme bitince pencere kapanır, CartDrawer dolu haliyle açılır.
ikas: `getDisplayedProductVariantTypes`, `selectVariantValue`, `hasProductVariantStock`, `addItemToCart`, `isAddToCartEnabled`, `PayWithIkas`, `getProductHref`.
Motion: M-20 (pencere / alt sayfa), M-02 (görsel geçişi), M-28 (swatch ve çip), M-11 (buton), M-10 (link).

### Footer  `--isFooter`

> **2026-10-08 revizyonu:** Footer artık görselli bir CTA bandıyla açılıyor (G4 seçeneği): kenardan kenara fotoğraf + karartma, alt kenarda zemine akan gradyan ve arka plan bulanıklığı; buzlu cam iletişim kartı ("Bize ulaş" → İletişim sayfası) ve açık zeminli e-postayla bildirim kartı (alan + Kaydol, başarılı/hata). Yeni prop'lar: `ctaImage` IMAGE, `ctaTitle`, `ctaButtonText` TEXT, `ctaButtonLink` LINK, `notifyTitle`, `notifyText`, `notifyPlaceholder`, `notifyButtonText`, `notifySubmittingText`, `notifySuccessText`, `notifyErrorText` TEXT. Güncel yapı plan §6.2 Footer'dadır; aşağıdaki ilk analiz tarihsel kayıttır.
Referans: 1440×≈380, koyu zemin (`mode: dark`). Üstteki bülten bandına bitişik. ikas şablonu: `footer-section`.

```
footer
├─ footer-top
│   ├─ footer-brand              ≈ 300 genişlik
│   │   ├─ footer-logo           {logo:SVG} ≈ 44 yükseklik
│   │   └─ footer-about          {aboutText:TEXT} text-ui-sm color-muted
│   ├─ footer-columns            {columns:COMPONENT_LIST} 3 sütun, aralık 48
│   │   └─ footer-column         {title:TEXT} text-ui-sm + {links:LIST_OF_LINK} text-ui-sm color-muted  ← M-28, M-10
│   └─ footer-social             {socialLinks:COMPONENT_LIST} 4 ikon 20, aralık 16
├─ footer-meta                   sağa yaslı: {contactText:TEXT} · {localeText:TEXT}
└─ footer-bottom                 ortalı: {copyrightText:TEXT} text-ui-sm
```
Mobil: logo + metin üstte. Link sütunları akordeon (M-22). Sosyal ikonlar yan yana. Meta ve telif satırları alt alta, sola yaslı.

| Prop | Tip | Varsayılan | Grup |
|---|---|---|---|
| `logo` | SVG | özgün İsmail wordmark | Marka |
| `aboutText` | TEXT | "Dağda da şehirde de aynı ekipman. İsmail, rotanı kendin çizmen için tasarlar." | Marka |
| `columns` | COMPONENT_LIST (`FooterColumn`) | Kategoriler, Müşteri hizmetleri, Kurumsal | Linkler |
| `socialLinks` | COMPONENT_LIST (`SocialLink`) | 4 öğe | Linkler |
| `contactText` | TEXT | "Bize ulaş: 0850 000 00 00" | Alt |
| `localeText` | TEXT | "TL · Türkçe" | Alt |
| `copyrightText` | TEXT | "© 2026 İsmail. Tüm hakları saklıdır." | Alt |
| `backgroundColor` | COLOR | `#161616` | Görünüm |

Çocuk component'ler: `FooterColumn` (title TEXT, links LIST_OF_LINK) · `SocialLink` (icon SVG, link LINK, ariaLabel TEXT).
Sub: `AccordionItem` (mobil).
Motion: M-10, M-22, M-28.

---

## 3. Ana sayfa section'ları

### HeroSlider
Referans: 1440×≈730 tam genişlik fotoğraf (header altına uzanıyor), ≈ %20 düz karartma. Ortada başlık (`text-display`) ve en fazla 640 genişlikte açıklama. CTA beyaz hap (200×48), alt kenardan ≈ 48 yukarıda. ikas şablonu: `hero-slider-section`.

```
hero-slider
├─ hero-slides                    {slides:COMPONENT_LIST}  ← M-07 (birden çok slayt)
│   └─ hero-slide
│       ├─ hero-slide-mask (clip)
│       │   └─ hero-bg            {image:IMAGE} + {mobileImage:IMAGE}  ← M-02, M-27
│       └─ hero-scrim             color-scrim
├─ hero-text                      ortalı
│   ├─ hero-title-mask (clip)
│   │   └─ hero-title             {title:TEXT} text-display color-inverse-text  ← M-03
│   └─ hero-description           {text:TEXT} text-body  ← M-01
└─ hero-cta                       Button (açık varyant) {buttonText:TEXT} {buttonLink:LINK}  ← M-01, M-11
```
Durumlar: tek slayt (referans) · çok slayt (slayt göstergesi görünür: `{code:slide-counter}`).
Mobil: yükseklik ≈ 560. Başlık 2 satıra kırılır. CTA ortada kalır, alt kenardan 32 yukarıda. `mobileImage` varsa o kullanılır.

| Prop | Tip | Varsayılan | Grup |
|---|---|---|---|
| `slides` | COMPONENT_LIST (`HeroSlide`) | 1 slayt | İçerik |
| `autoplaySeconds` | NUMBER | 6 | Davranış |
| `heightMode` | ENUM | ekran (`screen`) / sabit (`fixed`) | Görünüm |
| `overlayOpacity` | NUMBER | 20 | Görünüm |
| `backgroundColor` | COLOR | `#111111` | Görünüm |

Çocuk component'ler: `HeroSlide` (image IMAGE, mobileImage IMAGE, title TEXT, text TEXT, buttonText TEXT, buttonLink LINK).
Sub: `Button`.
Motion: M-01, M-02, M-03, M-07, M-11, M-27.

### ProductGrid
Referans: başlık (`text-h2`) + ortalı açıklama (`text-body` muted). 4 sütun × 2 satır `ProductCard` ızgarası, aralık 24, satır aralığı 32. Altta ortalı siyah hap "tümünü gör" butonu. ikas şablonu: `product-slider-section` (kart düzeni) / (özel; ızgara).

```
product-grid
├─ SectionHeading                 {title:TEXT} {subtitle:TEXT}  ← M-01
├─ product-grid-list              {products:PRODUCT_LIST} 4 sütun  ← M-01 (stagger)
│   └─ ProductCard ×8
└─ product-grid-action            Button (koyu) {buttonText:TEXT} {buttonLink:LINK}
```
Durumlar: dolu · yükleniyor (iskelet kartlar) · boş (section gizlenir).
Mobil: 2 sütun, aralık 12. Ürün sayısı `mobileMaxItems` ile sınırlanır. Buton tam genişlik değil, ortalı.

| Prop | Tip | Varsayılan | Grup |
|---|---|---|---|
| `title` | TEXT | "Yeni gelenler" | İçerik |
| `subtitle` | TEXT | "Rüzgâra, yağmura ve uzun günlere göre seçildi." | İçerik |
| `products` | PRODUCT_LIST | — | İçerik |
| `maxItems` | NUMBER | 8 | Düzen |
| `mobileMaxItems` | NUMBER | 4 | Düzen |
| `columns` | NUMBER | 4 | Düzen |
| `buttonText` | TEXT | "Tümünü gör" | İçerik |
| `buttonLink` | LINK | — | İçerik |
| `badgeText` | TEXT | "Sınırlı" | Metinler |
| `addToCartAriaLabel`, `favoriteAriaLabel` | TEXT | "Sepete ekle", "Favorilere ekle" | Metinler |
| `backgroundColor` | COLOR | `#FFFFFF` | Görünüm |

Sub: `SectionHeading`, `ProductCard`, `Button`, `Badge`, `FavoriteButton`.
Motion: M-01, M-09, M-11, favori kalp pop (yerel).

### ActivityGrid
Referansta yok; 2026-10-08 revizyonunda ana sayfaya eklendi (kullanıcı onayı, geçici frame seçeneği "5 · genişleyen kart + sıralı giriş"). Ürün ızgarasıyla mağaza bloğu arasında görsel bir şerit: aktiviteye göre kategoriye giriş. ikas şablonu: (özel).

```
activity-grid
├─ activity-head
│   ├─ section-heading            SectionHeading (sola yaslı) {title:TEXT} {subtitle:TEXT}  ← M-01
│   └─ link                       ArrowLink {linkText:TEXT} {link:LINK}  ← M-10
└─ activity-row                   {activities:COMPONENT_LIST}  ← I-M-04 (perde girişi)
    └─ activity-card ×5 (clip)    radius-card; ilk kart açık  ← I-M-05 (genişleyen kart)
        ├─ activity-image         {image:IMAGE}
        ├─ activity-scrim         alttan gradyan (iki katman)
        └─ activity-content       {title:TEXT} · {text:TEXT} (açık kart) · {countText:TEXT} · {buttonText:TEXT} + ok
```
Durumlar: giriş (perde) · ilk kart açık · imlecin altındaki kart açık.
Mobil: başlık ve link alt alta; şerit yatay kaydırılır (scroll-snap), açık kart 240, diğerleri 88.

| Prop | Tip | Varsayılan | Grup |
|---|---|---|---|
| `title` | TEXT | "Aktiviteye göre seç" | İçerik |
| `subtitle` | TEXT | "Rotanı seç, gerisini birlikte hazırlayalım." | İçerik |
| `linkText` | TEXT | "Tüm aktiviteler" | İçerik |
| `link` | LINK | — | İçerik |
| `activities` | COMPONENT_LIST | ActivityCard: `image` IMAGE, `title`, `text`, `countText`, `buttonText` TEXT, `link` LINK | Kartlar |
| `backgroundColor` | COLOR | `#F4F4F1` | Görünüm |

Sub: `SectionHeading`, `ArrowLink`.
Motion: M-01, M-10, I-M-04, I-M-05.

### StoreSpotlight
Referans: solda 910×530 görsel (radius 12), sağda 434'lük metin sütunu, aralık 32. Sütunda üç grup var: başlık (`text-h3`, 3 satır) + paragraf (`text-body` muted) · küçük kalın etiket (`text-h4`) + dev yüzde rakamı (`text-display`) · siyah hap buton. ikas şablonu: (özel).

```
store-spotlight
├─ spotlight-media (clip)         {image:IMAGE} radius 12
└─ spotlight-content
    ├─ spotlight-intro
    │   ├─ spotlight-title        {title:TEXT} text-h3  ← M-01
    │   └─ spotlight-text         {text:TEXT} text-body color-muted
    ├─ spotlight-offer
    │   ├─ spotlight-offer-label  {offerLabel:TEXT} text-h4
    │   └─ spotlight-offer-value  {offerValue:TEXT} text-display
    └─ spotlight-cta              Button (koyu, küçük) {buttonText:TEXT} {buttonLink:LINK}
```
Durumlar: varsayılan · ters yerleşim (`imagePosition` sağ).
Mobil: önce görsel (4:3, tam genişlik), sonra metin sütunu. Teklif rakamı `text-display` mobil boyutunda.

| Prop | Tip | Varsayılan | Grup |
|---|---|---|---|
| `image` | IMAGE | — | İçerik |
| `title` | TEXT | "Kadıköy mağazamız kapılarını açtı" | İçerik |
| `text` | TEXT | "Kamp ekipmanından kentsel katmanlara kadar tüm koleksiyon tek çatı altında. Gel, dene, rotanı birlikte çizelim." | İçerik |
| `offerLabel` | TEXT | "Açılışa özel" | Teklif |
| `offerValue` | TEXT | "%30" | Teklif |
| `buttonText` | TEXT | "Yol tarifi al" | İçerik |
| `buttonLink` | LINK | — | İçerik |
| `imagePosition` | ENUM | sol (`left`) / sağ (`right`) | Düzen |
| `backgroundColor` | COLOR | `#FFFFFF` | Görünüm |

Sub: `Button`.
Motion: M-01, M-11.

### Bestsellers
Referansta yok; 2026-10-08 revizyonunda eklendi. ProductGrid'in kart ızgarasını tekrarlamamak için sıralı liste + önizleme düzeni; görsel StoreSpotlight'ın tersine sağda. ikas şablonu: product-slider-section (uyarlanır).

```
bestsellers
├─ bestsellers-head
│   ├─ section-heading            SectionHeading (sola yaslı) {title:TEXT} {subtitle:TEXT}  ← M-01
│   └─ bestsellers-tabs           Tabs {tabs:COMPONENT_LIST} → {label:TEXT}  ← M-28
└─ bestsellers-body
    ├─ bestsellers-list           {products:PRODUCT_LIST} (etkin sekme)  ← M-01
    │   ├─ bestseller-row ×5      {code:rank} · {data:product.image} · {data:product.name} · {data:product.price} · row-cart (QuickBuy'ı açar)  ← M-28
    │   └─ link                   ArrowLink {linkText:TEXT} {link:LINK}  ← M-10
    └─ bestsellers-preview (clip) {data:product.image} etkin satır + FavoriteButton  ← M-02
```
Durumlar: 1. satır etkin · satır hover (önizleme değişir) · sekme değişimi.
Mobil: 1 numara tam genişlik önizleme + satırı, ardından 02–05 satırları (64×80 görsel), link en altta.

| Prop | Tip | Varsayılan | Grup |
|---|---|---|---|
| `title` | TEXT | "Çok satanlar" | İçerik |
| `subtitle` | TEXT | "Bu ay en çok sepete girenler." | İçerik |
| `tabs` | COMPONENT_LIST | BestsellerTab: `label` TEXT, `products` PRODUCT_LIST | Ürünler |
| `maxItems` | NUMBER | 5 | Ürünler |
| `linkText` | TEXT | "Tüm çok satanlar" | İçerik |
| `link` | LINK | — | İçerik |
| `addToCartAriaLabel` | TEXT | "Sepete ekle" | Erişilebilirlik |
| `favoriteAriaLabel` | TEXT | "Favorilere ekle" | Erişilebilirlik |
| `backgroundColor` | COLOR | `#F4F4F1` | Görünüm |

Sub: `SectionHeading`, `Tabs`, `ArrowLink`, `FavoriteButton`.
Motion: M-01, M-02, M-10, M-28.

### CollectionMosaic
Referans: başlık + açıklama, altında 3 sütunlu mozaik (sütun ≈ 440, aralık 24, toplam yükseklik ≈ 845). Karo yükseklikleri dönüşümlü: kısa 325 / uzun 500. Siyah-beyaz fotoğraf, ortada beyaz `text-h2` etiket. Bir karo "öne çıkan": başlık + açıklama + beyaz hap buton. ikas şablonu: `category-images-section`.

```
collection-mosaic
├─ SectionHeading                     {title:TEXT} {subtitle:TEXT}  ← M-01
└─ mosaic-grid                        3 sütun; sütun içinde 2 karo
    └─ collection-tile ×6             {tiles:COMPONENT_LIST}
        ├─ tile-media (clip)          radius 12  ← karo hover (yerel)
        │   └─ tile-image             {image:IMAGE}
        ├─ tile-scrim                 color-scrim (yalnızca öne çıkanda)
        └─ tile-content               ortalı
            ├─ tile-title             {title:TEXT} text-h2 color-inverse-text
            ├─ tile-text              {text:TEXT} text-body (opsiyonel)
            └─ tile-cta               Button (açık) {buttonText:TEXT} (opsiyonel)
```
Durumlar: karo varsayılan · karo hover (dikey akordeon: uzayan karo 600, komşusu 236; ayrı frame `— hover`) · öne çıkan karo.
Mobil: 2 sütun, aralık 12. Öne çıkan karo tam genişlik ve 4:5; diğerleri 1:1.

| Prop | Tip | Varsayılan | Grup |
|---|---|---|---|
| `title` | TEXT | "Öne çıkan koleksiyonlar" | İçerik |
| `subtitle` | TEXT | "Katman katman giyin, her havaya hazır ol." | İçerik |
| `tiles` | COMPONENT_LIST (`CollectionTile`) | 6 karo | İçerik |
| `grayscaleImages` | BOOLEAN | true | Görünüm |
| `backgroundColor` | COLOR | `#FFFFFF` | Görünüm |

Çocuk component'ler: `CollectionTile` (image IMAGE, title TEXT, text TEXT, buttonText TEXT, link LINK, category CATEGORY).
Sub: `SectionHeading`, `Button`.
Motion: M-01, M-11, koleksiyon karosu hover (yerel I-M-02), dikey akordeon (yerel I-M-06).

---

## 4. Mağaza section'ları

### ProductList
Referans: yok; ana sayfa ızgarasının sayfa hali. ikas şablonu: `category-list-section` (+ `favorites` deseni).

```
product-list
├─ list-header
│   ├─ Breadcrumbs                {data:category.path}
│   ├─ list-title                 {data:category.name} | {searchTitle:TEXT} + {data:search.query} | {favoritesTitle:TEXT}
│   └─ list-count                 {data:category.productCount} + {resultsLabel:TEXT}
├─ filter-bar (sticky)            filtre butonu {filterButtonText:TEXT} · aktif filtre çipleri · sıralama {sortLabel:TEXT}  ← M-18
├─ list-body
│   ├─ filter-sidebar             (masaüstü) AccordionItem ×N + Checkbox
│   └─ list-grid                  ProductCard, 3 sütun (filtre açık) / 4 sütun
└─ list-pagination                {loadMoreText:TEXT} + {code:page-progress}
```
Durumlar: dolu · yükleniyor (iskelet) · boş ({emptyTitle:TEXT}, {emptyText:TEXT}, link) · filtre uygulanmış · favoriler: giriş yapılmamış uyarısı.
Mobil: 2 sütun. Filtreler FilterDrawer'a taşınır. Filtre barı yapışkan, yatay kaydırmalı.

| Prop | Tip | Varsayılan | Grup |
|---|---|---|---|
| `pageMode` | ENUM | kategori (`category`) / arama (`search`) / favoriler (`favorites`) | Düzen |
| `columns` | NUMBER | 4 | Düzen |
| `searchTitle`, `favoritesTitle`, `resultsLabel` | TEXT | "Arama sonuçları", "Favorilerin", "ürün" | Metinler |
| `filterButtonText`, `sortLabel`, `clearFiltersText`, `applyFiltersText` | TEXT | "Filtrele", "Sırala", "Temizle", "Sonuçları göster" | Metinler |
| `loadMoreText`, `loadingMoreText` | TEXT | "Daha fazla göster", "Yükleniyor…" | Metinler |
| `emptyTitle`, `emptyText`, `emptyButtonText` | TEXT | "Burada henüz ürün yok", "Filtreleri değiştirmeyi ya da başka bir kategoriye bakmayı dene.", "Tüm ürünler" | Boş durum |
| `favoritesLoginText`, `favoritesLoginButtonText` | TEXT | "Favorilerini görmek için giriş yap.", "Giriş yap" | Boş durum |
| `backgroundColor` | COLOR | `#FFFFFF` | Görünüm |

Sub: `Breadcrumbs`, `ProductCard`, `AccordionItem`, `Checkbox`, `Tabs`, `Button`, `Spinner`, `FilterDrawer`.
Motion: M-18, M-20 (mobil filtre), M-28.

### FilterDrawer (ProductList overlay)  — M-20
Mobil: soldan açılan tam ekran çekmece. Akordeon filtre grupları, altta yapışkan "temizle" ve "sonuçları göster" butonları. Durum: açık.

### CollectionHero
Referans: yok; koleksiyon karosunun büyütülmüşü. Tam genişlik, 1440×480 siyah-beyaz görsel, ortada beyaz başlık ve açıklama. ikas şablonu: (özel).

```
collection-hero
├─ collection-hero-media (clip)   {image:IMAGE}
├─ collection-hero-scrim          color-scrim
└─ collection-hero-text           {data:category.name} text-display + {description:TEXT} text-body  ← M-01
```
Mobil: yükseklik 360, başlık `text-display` mobil.

| Prop | Tip | Varsayılan |
|---|---|---|
| `image` | IMAGE | — |
| `category` | CATEGORY | — |
| `description` | TEXT | "Rüzgâr geçirmeyen katmanlar, şehirde de dağda da." |
| `backgroundColor` | COLOR | `#111111` |

Motion: M-01.

### ProductDetail
Referans: yok. Solda galeri (görseller alt alta, `color-surface` zeminde, radius 12), sağda yapışkan bilgi sütunu. ikas şablonu: `product-detail-section` + `variant-selection`, `add-to-cart`, `product-pricing`, `image-handling`.

```
product-detail
├─ Breadcrumbs                    {data:category.path}
├─ pdp-gallery                    görseller alt alta, 2 sütun  ← M-19
│   └─ pdp-image ×N               ürün görselleri (mağaza verisi)
└─ pdp-details (sticky)           ← M-13
    ├─ pdp-badges                 Badge {data:product.badge}
    ├─ pdp-title                  {data:product.name} text-h3
    ├─ pdp-rating                 RatingStars {data:product.stars} {data:product.reviewCount} + {reviewsLinkText:TEXT}
    ├─ pdp-price                  {data:product.price} text-price + {data:product.compareAtPrice} (üstü çizili)
    ├─ pdp-campaign               {data:campaign.title} (kampanya varsa: "2 al, ikincisi %50 indirimli")
    ├─ pdp-tiers                  {tiersTitle:TEXT} + tier-row ×3 {data:tier.range} {data:tier.unitPrice} (kademeli indirim varsa)
    ├─ pdp-group                  {groupLabel:TEXT} + group-swatch ×N {data:productGroup.image} (ürün grubu varsa)
    ├─ pdp-variants               VariantChip ×N {data:variant.value} + {sizeGuideText:TEXT}
    ├─ pdp-options                {optionsTitle:TEXT} + ikas seçenek türlerinin hepsi: option-text · option-textarea · option-select · option-box (+ option-limit) · option-swatch · option-image · option-checkbox (+ ücret) · option-color · option-date · option-file {fileUploadText:TEXT} · option-child (option set varsa)
    ├─ pdp-bundle                 {bundleTitle:TEXT} + BundleItem ×N (set ürünse)
    ├─ pdp-quantity               QuantitySelector
    ├─ pdp-actions                Button {addToCartText:TEXT} / {addingText:TEXT} / {addedText:TEXT} / {outOfStockText:TEXT} + FavoriteButton
    ├─ pdp-pay                    PayWithIkas yuvası {showPayWithIkas:BOOLEAN}
    ├─ pdp-back-in-stock          {backInStockTitle:TEXT} + e-posta {backInStockPlaceholder:TEXT} + {backInStockButtonText:TEXT} · {backInStockSuccessText:TEXT} · {backInStockLoginText:TEXT}
    ├─ pdp-stock-note             {data:variant.stockCount} + {lowStockText:TEXT}
    ├─ pdp-offers                 birlikte al (kampanya teklifi CROSS_SELL/UPSELL): {data:offer.title} + OfferCard ×N + offers-summary {data:offers.total} + {offersAddText:TEXT}
    └─ pdp-accordions             AccordionItem: {descriptionTitle:TEXT} {data:product.description} · {shippingTitle:TEXT} {shippingText:RICH_TEXT}  ← M-22
```
Durumlar: varyant seçili · varyant yok · stok yok (+ haber ver formu) · sepete ekleniyor · eklendi · indirimli fiyat · set ürün · kişiselleştirme · kademeli indirim · ürün grubu · haber ver kaydedildi · haber ver giriş gerekli. Birlikte al ve kampanya mesajı varsayılan görünümde; diğer mağaza blokları ayarlandıysa görünür.
ikas: `product.offers` + `acceptProductOffer` / `rejectProductOffer` + `get…FinalPriceWithCampaignOffers`; `initBundleProducts`; `getProductVariantTieredDiscountProducts`; `getProductOptionSet` / `initIkasProductOptionSet`; `initBackInStockNotificationForm` / `submitBackInStockNotificationForm`; `PayWithIkas`; `product.productGroup`.
Mobil: galeri yatay kaydırmalı, altında noktalar. Bilgi sütunu altta, yapışkan değil. Alt kenarda sabit "sepete ekle" çubuğu.

| Prop | Tip | Varsayılan | Grup |
|---|---|---|---|
| `product` | PRODUCT | — | İçerik |
| `addToCartText`, `addingText`, `addedText`, `outOfStockText` | TEXT | "Sepete ekle", "Ekleniyor…", "Sepete eklendi", "Stokta yok" | Metinler |
| `updateCartText`, `updatingCartText` | TEXT | "Sepeti güncelle", "Güncelleniyor…" | Metinler |
| `optionSetErrorText` | TEXT | "Devam etmek için seçenekleri tamamla." | Metinler |
| `sizeGuideText`, `lowStockText` | TEXT | "Beden rehberi", "Son birkaç ürün" | Metinler |
| `descriptionTitle`, `shippingTitle` | TEXT | "Ürün detayı", "Kargo ve iade" | Metinler |
| `reviewsLinkText`, `tiersTitle`, `groupLabel`, `optionsTitle`, `fileUploadText`, `bundleTitle` | TEXT | "Değerlendirmeleri gör", "Çok al, az öde", "Model", "Kişiselleştir", "Dosya seç ya da sürükle", "Set içeriği" | Mağaza blokları |
| `offersAddText`, `offerInCartText`, `offerSoldOutText` | TEXT | "Birlikte sepete ekle", "Sepette", "Tükendi" | Birlikte al |
| `backInStockTitle`, `backInStockPlaceholder`, `backInStockButtonText`, `backInStockSuccessText`, `backInStockLoginText` | TEXT | "Bu beden tükendi. Gelince haber verelim.", "E-posta adresin", "Haber ver", "Kaydettik. Stoka girince e-posta göndereceğiz.", "Hatırlatma için giriş yapmalısın." | Haber ver |
| `showPayWithIkas` | BOOLEAN | true | Ayarlar |
| `shippingText` | RICH_TEXT | "<p>2 iş gününde kargoda. 14 gün içinde ücretsiz iade.</p>" | İçerik |
| `backgroundColor` | COLOR | `#FFFFFF` | Görünüm |

Sub: `Breadcrumbs`, `Badge`, `VariantChip`, `QuantitySelector`, `Button`, `FavoriteButton`, `AccordionItem`, `RatingStars`, `OfferCard`, `BundleItem`.
Motion: M-13, M-19, M-22, M-28 (+ teklif kartı seçimi M-28, birlikte sepete ekle M-11).

### ProductReviews
Referans: yok. ikas şablonu: `product-reviews-section` (`IkasCustomerReviewList`, mağazanın yorum ayarları: giriş / satın alma şartı). Ürün detayın hemen altında.
Masaüstü: üstte 1px çizgi; solda 420'lik özet (text-h2 başlık, büyük mono puan + RatingStars + değerlendirme sayısı, 5→1 dağılım çubukları, çerçeveli "Yorum yaz"); sağda ReviewCard listesi + "Daha fazla yorum". Mobil: özet üstte, liste altta.

```
product-reviews
├─ reviews-summary    {title:TEXT} · {data:product.stars} + RatingStars + {data:product.reviewCount} {reviewsCountText:TEXT} · rating-bar ×5 · Button {writeReviewText:TEXT}
├─ reviews-list       ReviewCard ×N ({data:review.title} {data:review.comment} {data:review.author} {data:review.date} {verifiedText:TEXT}) + Button {moreReviewsText:TEXT}  ← M-01
├─ reviews-empty      {emptyTitle:TEXT} + {emptyText:TEXT}
└─ review-form        {formTitle:TEXT} · {ratingLabel:TEXT} · FormField {reviewTitleLabel:TEXT} {reviewTextLabel:TEXT} · {submitText:TEXT} / {submittingText:TEXT} · {successText:TEXT} · {loginRequiredText:TEXT}
```
Durumlar: yorumlu · boş · yorum formu.
Sub: `RatingStars`, `ReviewCard`, `FormField`, `Button`.

### CartPage
Referans: yok. Solda satırlar (görsel 96×120 `color-surface`, ad, varyant, adet, fiyat, kaldır), sağda 400'lük özet paneli (`color-surface`, radius 12): kupon alanı, ara toplam, kargo, toplam, ödeme butonu. ikas şablonu: `cart-section`.

```
cart-page
├─ cart-title                     {title:TEXT} text-h2 + {data:cart.itemCount}
├─ cart-lines                     CartLineItem ×N  ({data:cart.line.title} {data:cart.line.variant} {data:cart.line.quantity} {data:cart.line.price}); indirimli · hediye · set · kişiselleştirilmiş satırlar
├─ cart-recommendations           {recommendTitle:TEXT} + ProductCardSmall ×4 {recommendProducts:PRODUCT_LIST} (boş sepette de)
└─ cart-summary
    ├─ coupon-form                FormField {couponPlaceholder:TEXT} + Button {couponButtonText:TEXT}
    ├─ coupon-applied             {data:cart.couponCode} + {couponRemoveText:TEXT}
    ├─ summary-rows               {subtotalLabel:TEXT} {data:cart.subtotal} · {shippingLabel:TEXT} {data:cart.shipping} · cart-adjustments ({data:adjustment.name} {data:adjustment.amount}: kampanya · kupon · hediye çeki) · {totalLabel:TEXT} {data:cart.total}
    └─ Button                     {checkoutText:TEXT} / {checkoutLoadingText:TEXT}
```
Durumlar: boş · dolu · satır güncelleniyor · kupon hatası · kupon uygulandı.
Mobil: satırlar üstte, özet altta. Ödeme butonu altta sabit.

| Prop | Tip | Varsayılan | Grup |
|---|---|---|---|
| `title` | TEXT | "Sepetin" | Metinler |
| `emptyTitle`, `emptyText`, `emptyButtonText` | TEXT | "Sepetin boş", "Rotanı çiz, ekipmanını seç.", "Alışverişe başla" | Boş durum |
| `couponPlaceholder`, `couponButtonText`, `couponErrorText`, `couponSuccessText` | TEXT | "İndirim kodu", "Uygula", "Bu kod geçerli değil.", "Kod uygulandı." | Kupon |
| `subtotalLabel`, `shippingLabel`, `totalLabel` | TEXT | "Ara toplam", "Kargo", "Toplam" | Özet |
| `checkoutText`, `checkoutLoadingText` | TEXT | "Ödemeye geç", "Yönlendiriliyor…" | Özet |
| `removeText` | TEXT | "Kaldır" | Metinler |
| `couponRemoveText`, `recommendTitle` | TEXT | "Kaldır", "Bunlar da işine yarar" | Metinler |
| `recommendProducts` | PRODUCT_LIST | — | İçerik |
| `backgroundColor` | COLOR | `#FFFFFF` | Görünüm |

Sub: `CartLineItem`, `QuantitySelector`, `FormField`, `Button`, `Spinner`, `Badge`, `ProductCardSmall`.
ikas: `getIkasOrderDisplayedAdjustments`, `getOrderAdjustmentDisplayName` / `…FormattedAmount`, `isOrderLineItemAutoCreated` (hediye satırı), `item.variant.bundleProducts`, `item.options` + `editOrderLineItem`, `removeCouponCodeForm`, `cart.giftCardLines`.
Motion: M-28, M-01 (öneriler).

### Account
Referans: yok. Solda dikey sekme listesi (`Tabs`), sağda içerik paneli. ikas şablonu: `account-info-section`.

```
account
├─ account-header                 {greetingText:TEXT} + {data:customer.firstName}
├─ account-tabs                   Tabs: {infoTabText:TEXT} {ordersTabText:TEXT} {addressesTabText:TEXT} {favoritesTabText:TEXT} {logoutText:TEXT}  ← M-28
└─ account-panel
    ├─ info-form                  FormField ×4 + Button {saveText:TEXT} / {savingText:TEXT}
    ├─ orders-list                satır: {data:order.number} {data:order.date} {data:order.status} {data:order.total}
    ├─ order-detail               {data:order.line.title} …
    └─ addresses-list             {data:customer.address} + {addAddressText:TEXT}
```
Durumlar: her sekme · siparişler boş · adresler boş · form kaydediliyor / başarılı / hata.
Mobil: sekmeler üstte yatay kaydırmalı.

| Prop | Tip | Varsayılan | Grup |
|---|---|---|---|
| `greetingText` | TEXT | "Merhaba," | Metinler |
| `infoTabText`, `ordersTabText`, `addressesTabText`, `favoritesTabText`, `logoutText` | TEXT | "Bilgilerim", "Siparişlerim", "Adreslerim", "Favorilerim", "Çıkış yap" | Sekmeler |
| `saveText`, `savingText`, `savedText` | TEXT | "Kaydet", "Kaydediliyor…", "Bilgilerin güncellendi." | Form |
| `ordersEmptyText`, `addressesEmptyText`, `addAddressText` | TEXT | "Henüz siparişin yok.", "Kayıtlı adresin yok.", "Yeni adres ekle" | Boş durum |
| `corporateText`, `defaultAddressText` | TEXT | "Kurumsal fatura istiyorum", "Varsayılan teslimat adresim olsun" | Adres formu |
| `subtotalLabel` | TEXT | "Ara toplam" | Sipariş detayı |
| `backgroundColor` | COLOR | `#FFFFFF` | Görünüm |

Sub: `Tabs`, `FormField`, `Checkbox`, `Button`, `Spinner`.
Motion: M-28.

### AuthForms
Referans: yok. Ortalı tek sütun (en fazla 440): başlık, açıklama, form, alt link. Masaüstünde solda yarım genişlik siyah-beyaz görsel (koleksiyon dili). ikas şablonu: `login-section`, `register-section`, `forgot-password-section`, `recover-password-section`.

```
auth-forms
├─ auth-media                     {image:IMAGE} (masaüstü)
└─ auth-panel
    ├─ auth-title                 {loginTitle:TEXT} | {registerTitle:TEXT} | {forgotTitle:TEXT} | {recoverTitle:TEXT}
    ├─ auth-text                  {…Text:TEXT}
    ├─ auth-form                  FormField ×N + Checkbox (kayıt onayı) + Button {submitText:TEXT} / {submittingText:TEXT}
    ├─ auth-message               {successText:TEXT} color-success | {errorText:TEXT} color-danger
    └─ auth-switch                {switchText:TEXT} + link
```
Durumlar (her varyantta): varsayılan · alan hatası · gönderiliyor · başarılı (şifremi unuttum, şifre yenile) · geçersiz bağlantı (şifre yenile).
Mobil: görsel gizlenir, form tam genişlik.

| Prop | Tip | Varsayılan | Grup |
|---|---|---|---|
| `variant` | ENUM | giriş (`login`) / kayıt (`register`) / şifremi unuttum (`forgot`) / şifre yenile (`recover`) | Düzen |
| `image` | IMAGE | — | Görünüm |
| `loginTitle`, `registerTitle`, `forgotTitle`, `recoverTitle` | TEXT | "Giriş yap", "Hesap oluştur", "Şifreni mi unuttun?", "Yeni şifre belirle" | Metinler |
| `submitText`, `submittingText` | TEXT | "Devam et", "Gönderiliyor…" | Metinler |
| `emailLabel`, `passwordLabel`, `firstNameLabel`, `lastNameLabel` | TEXT | "E-posta", "Şifre", "Ad", "Soyad" | Alanlar |
| `successText`, `errorText`, `invalidTokenText` | TEXT | "E-postanı kontrol et.", "Bilgiler eşleşmedi.", "Bu bağlantının süresi dolmuş." | Mesajlar |
| `switchText` | TEXT | "Hesabın yok mu? Kaydol" | Metinler |
| `backgroundColor` | COLOR | `#FFFFFF` | Görünüm |

Sub: `FormField`, `Checkbox`, `Button`, `Spinner`.

### NotFound
Referans: yok. Ortalı dev "404" (`text-display` × büyük kullanım), kısa metin, ana sayfa butonu. Altında ProductGrid öneri satırı. ikas şablonu: `not-found-section`.

```
not-found
├─ not-found-code                 {code:status-code} text-display  ← M-01
├─ not-found-title                {title:TEXT} text-h2
├─ not-found-text                 {text:TEXT} text-body color-muted
└─ Button                         {buttonText:TEXT} {buttonLink:LINK}
```

| Prop | Tip | Varsayılan |
|---|---|---|
| `title` | TEXT | "Bu patika bir yere çıkmıyor" |
| `text` | TEXT | "Aradığın sayfa taşınmış ya da hiç var olmamış olabilir." |
| `buttonText` | TEXT | "Ana sayfaya dön" |
| `buttonLink` | LINK | — |
| `backgroundColor` | COLOR | `#FFFFFF` |

Motion: M-01.

### EmailVerification
Referans: yok. Ortalı durum kartı (ikon + başlık + metin + buton). ikas şablonu: `email-verification-section`.

| Prop | Tip | Varsayılan |
|---|---|---|
| `verifyingText` | TEXT | "E-postan doğrulanıyor…" |
| `successTitle`, `successText` | TEXT | "Hesabın hazır", "Artık giriş yapabilirsin." |
| `errorTitle`, `errorText` | TEXT | "Doğrulama başarısız", "Bağlantının süresi dolmuş olabilir." |
| `buttonText` | TEXT | "Giriş yap" |
| `backgroundColor` | COLOR | `#FFFFFF` |

Durumlar: doğrulanıyor · başarılı · hata.

---

## 5. İçerik section'ları

### BlogList
Referans: yok (menüde blog bağlantısı var). Başlık, kategori sekmeleri (`Tabs`), 3 sütun `BlogCard` ızgarası (görsel 4:3 radius 12, etiket, başlık `text-h4`, tarih), "daha fazla" butonu. ikas şablonu: `blog-home-section`.

| Prop | Tip | Varsayılan |
|---|---|---|
| `title` | TEXT | "Rota notları" |
| `subtitle` | TEXT | "Sahadan notlar, rehberler ve ekip hikâyeleri." |
| `blogs` | BLOG_LIST | — |
| `categories` | BLOG_CATEGORY_LIST | — |
| `allTabText`, `loadMoreText`, `emptyText` | TEXT | "Tümü", "Daha fazla yazı", "Bu kategoride henüz yazı yok." |
| `backgroundColor` | COLOR | `#FFFFFF` |

Durumlar: dolu · kategori boş. Mobil: tek sütun, sekmeler yatay kaydırmalı. Motion: M-10, M-28.

### BlogPost
Referans: yok. Ortalı 720'lik okuma sütunu: kategori etiketi, başlık (`text-h2`), tarih + yazar, kapak görseli (16:9, radius 12, tam içerik genişliği), zengin metin. ikas şablonu: `blog-post-section`.

```
blog-post
├─ post-meta        {data:blog.category} · {data:blog.date} · {data:blog.author}
├─ post-title       {data:blog.title}
├─ post-cover       blog kapak görseli (mağaza verisi)
└─ post-body        blog içeriği (RICH_TEXT, mağaza verisi)
```

| Prop | Tip | Varsayılan |
|---|---|---|
| `backLinkText` | TEXT | "Tüm yazılar" |
| `shareText` | TEXT | "Paylaş" |
| `backgroundColor` | COLOR | `#FFFFFF` |

### BlogRelated
Referans: yok. Başlık + 3 `BlogCard`. ikas şablonu: `blog-home-section` (kart düzeni).

| Prop | Tip | Varsayılan |
|---|---|---|
| `title` | TEXT | "Okumaya devam et" |
| `blogs` | BLOG_LIST | — |
| `backgroundColor` | COLOR | `#FFFFFF` |

### StoreList
Referans: yok; referanstaki mağaza bloğunun liste hali. Başlık + 3 sütun mağaza kartı. Her kartta görsel (4:3, radius 12), mağaza adı `text-h4`, adres, çalışma saatleri ve oklu "haritada aç" linki (M-10) var. ikas şablonu: (özel).

```
store-list
├─ SectionHeading                 {title:TEXT} {subtitle:TEXT}
└─ store-grid                     {stores:COMPONENT_LIST}
    └─ store-card                 {image:IMAGE} {name:TEXT} {address:TEXT} {hours:TEXT} {mapLink:LINK} + {mapLinkText:TEXT}  ← M-10
```
Mobil: tek sütun.

| Prop | Tip | Varsayılan |
|---|---|---|
| `title` | TEXT | "Mağazalarımız" |
| `subtitle` | TEXT | "Ekipmanı elinle tut, denedikten sonra karar ver." |
| `stores` | COMPONENT_LIST (`StoreItem`) | 3 mağaza |
| `mapLinkText` | TEXT | "Haritada aç" |
| `backgroundColor` | COLOR | `#FFFFFF` |

Çocuk component'ler: `StoreItem` (image IMAGE, name TEXT, address TEXT, hours TEXT, mapLink LINK).
Motion: M-10.


### ContactForm
Referans: `02-iletisim-referans.png` (kullanıcının paylaştığı yapı örneği; metin, görsel ve marka kullanılmadı). Tam genişlik: üstte iki satırlık text-display başlık + sağda açıklama ve yanıt süresi hapı; altında 880'lik form kartı (konu çipleri, ad, soyad, e-posta, telefon, sipariş no, mesaj, onay, gönder) ve 472'lik kanal sütunu (e-posta, telefon, koyu WhatsApp kartı, sosyal). ikas şablonu: (özel; `getContactForm`, `setContactForm*`, `submitContactForm` → `Promise<boolean>`; konu ve sipariş no kodda mesajın başına eklenir; API dosya almaz, ek yükleme alanı yok).

Durumlar: varsayılan · gönderiliyor · başarılı · hata.
Mobil: tek sütun; konu çipleri yatay kaydırmalı.

| Prop | Tip | Varsayılan |
|---|---|---|
| `title`, `intro`, `responseText`, `formTitle`, `topicLabel` | TEXT | "Yaz, birlikte çözelim.", "Siparişin, bedenin ya da mağazalarımızla ilgili bir sorun mu var? …", "Ortalama yanıt süresi: 2 saat", "Mesaj gönder", "Ne hakkında yazıyorsun?" |
| `topics` | COMPONENT_LIST (`ContactTopic`) | 6 konu |
| `firstNameLabel`, `lastNameLabel`, `emailLabel`, `phoneLabel`, `orderLabel`, `messageLabel`, `messagePlaceholder` | TEXT | "Ad", "Soyad", "E-posta", "Telefon (isteğe bağlı)", "Sipariş numarası (isteğe bağlı)", "Mesaj", "Talebini biraz anlatır mısın?" |
| `consentText`, `submitText`, `submittingText`, `successText`, `errorText`, `socialTitle` | TEXT | "Aydınlatma metnini okudum, kabul ediyorum.", "Mesajı gönder", "Gönderiliyor…", "Mesajın bize ulaştı. …", "İşaretli alanları kontrol et.", "Rotamızı takip et" |
| `channels` | COMPONENT_LIST (`ContactChannel`) | e-posta, telefon, WhatsApp |
| `socialLinks` | COMPONENT_LIST (`SocialLink`) | 4 öğe |
| `backgroundColor` | COLOR | `#F4F4F1` |

Çocuk component'ler: `ContactTopic` (label TEXT) · `ContactChannel` (icon SVG, value TEXT, hint TEXT, link LINK, dark BOOLEAN).
Sub: `FormField`, `Checkbox`, `Button`.
Motion: M-11, M-01, M-28.

### StoreLocator
Referans: `02-iletisim-referans.png` yapısı. Başlık + açıklama, sağda "tüm mağazalar"; solda 880 × 520 öne çıkan mağaza görseli ve bilgi kartı (ad + açık rozeti, adres, saat, yol tarifi), sağda seçilebilir mağaza listesi (durum kodda saatlerden). ikas şablonu: (özel).

| Prop | Tip | Varsayılan |
|---|---|---|
| `title`, `text`, `allStoresText`, `directionsText`, `openNowText`, `closedText` | TEXT | "Mağazalarımızı ziyaret et", "Tüm koleksiyonu dene, bedenini ekibimizle birlikte bul.", "Tüm mağazalar", "Yol tarifi al", "Şu an açık", "Kapalı" |
| `allStoresLink` | LINK | — |
| `stores` | COMPONENT_LIST (`StoreItem`) | 4 mağaza |
| `backgroundColor` | COLOR | `#F4F4F1` |

Motion: M-28, M-02.

### FaqList
Referans: `02-iletisim-referans.png` yapısı. Solda başlık + açıklama, sağda akordeon (ilki açık). ikas şablonu: (özel).

| Prop | Tip | Varsayılan |
|---|---|---|
| `title`, `text` | TEXT | "Hızlı yanıtlar", "Soruların çoğunun yanıtı burada. Bulamazsan yukarıdan yaz." |
| `items` | COMPONENT_LIST (`FaqItem`) | 5 soru |
| `backgroundColor` | COLOR | `#F4F4F1` |

Sub: `AccordionItem`. Motion: M-22.

---

### RichText
Referans: yok. ikas şablonu: `rich-text-section`. Hakkımızda, KVKK ve politika sayfaları.
Masaüstü: solda 280 içindekiler, sağda 760 metin sütunu. Mobil: içindekiler açılır kutu, metin tek sütun.

```
rich-text
├─ rich-toc           {code:headings}
├─ rich-title         {title:TEXT} text-h2  ← M-01
├─ rich-meta          {updatedText:TEXT}
└─ rich-body          {content:RICH_TEXT}: h3 · paragraf · liste · link
```
| Prop | Tip | Varsayılan |
|---|---|---|
| `title` | TEXT | Kişisel verilerin korunması |
| `updatedText` | TEXT | Son güncelleme · 01.09.2026 |
| `content` | RICH_TEXT | `<h3>Veri sorumlusu</h3><p>…</p>` |
| `showToc` | BOOLEAN | true |
| `backgroundColor` | COLOR | `#FFFFFF` |

### OrderTracking
Referans: yok. Üye olmadan verilen siparişin e-posta + sipariş no ile sorgulanması (`getOrderByEmail`).
Masaüstü: solda form, sağda sonuç kartı (durum adımları, kargo + takip no, ürünler). Durumlar: sonuç · boş · bulunamadı.

```
order-tracking
├─ tracking-intro     {title:TEXT} + {text:TEXT}
├─ tracking-form      FormField {emailLabel:TEXT} {orderNumberLabel:TEXT} + {submitText:TEXT} / {submittingText:TEXT}  ← M-11
├─ tracking-result    {statusTitle:TEXT} + {data:order.status} adımları + {data:package.trackingNumber} + satırlar
└─ tracking-not-found {notFoundText:TEXT}
```
| Prop | Tip | Varsayılan |
|---|---|---|
| `title`, `text` | TEXT | Siparişim nerede?, Üye olmadan verdiğin siparişin durumunu sorgula. |
| `emailLabel`, `orderNumberLabel` | TEXT | E-posta, Sipariş numarası |
| `submitText`, `submittingText` | TEXT | Sorgula, Sorgulanıyor… |
| `statusTitle`, `notFoundText` | TEXT | Sipariş, Bu bilgilerle bir sipariş bulamadık. |
| `backgroundColor` | COLOR | `#FFFFFF` |

### Mağaza tamamlama (MCP taraması, 2026-10-08)
- **Overlay'ler:** CookieBar (açık, {cookieContent:RICH_TEXT}) · LocaleSwitcher (footer alt satırındaki dil düğmesinden açılır; başlık `localeTitle` TEXT "Ülke ve para birimi") · ImagePreview (galeri ve yorum görselleri). Toast, ConfirmModal, AddressModal, AccountMenu koşullu; İsmail'de seçilmedi (2026-10-08, kaldırıldı).
- **ProductList / FilterDrawer:** alt kategori listesi, renk swatch, beden kutusu, fiyat aralığı (PriceRange), indirim aralığı çipleri, Checkbox listesi, "Tümünü temizle".
- **ProductDetail:** galeride video karesi, renk varyantı swatch, gizli "mağazada stok"; durumlar: sepeti güncelle · yükleniyor · mağazada stok. ProductCard'a renk noktaları, QuickBuy'da swatch.
- **Header:** duyuru sayfalayıcı; durumlar: yapışkan · duyurular. Mobil menüde giriş/kayıt.
- **Footer:** alt satırda dil/para birimi düğmesi (dünya ikonu + TL · Türkçe + ok), LocaleSwitcher'ı her zaman buradan açar.
- **AuthForms:** Google/Facebook düğmeleri + telefonla giriş; SMS telefon · SMS kod durumları; kayıtta iki ayrı onay.
- **Account:** sipariş detayı (paket, kargo, takip no kopyala, adresler, ödeme, özet), iade talebi, hesap ayarları (telefon, kampanya izni, verilerimi indir, hesabımı sil), hata, yükleniyor. Adres kartlarında VARSAYILAN rozeti + Düzenle · Sil · Varsayılan yap; satır içi adres formu (ülke → il → ilçe, kurumsal fatura, varsayılan); kart içinde adres silme onayı; şifreyle hesap silme onayı. Durumlar: adres ekle · adres sil onayı · hesap silme onayı.
- **EmailVerification:** hata halinde tekrar gönder formu; tekrar gönderildi durumu.
- **ProductReviews:** yorum görselleri, mağaza yanıtı, numaralı sayfalama. **CartPage:** yükleniyor iskeleti; CartLineItem adet sınırı.
- Koşullu (çizilmedi): bildirim (toast), onay penceresi, adres penceresi, hesap menüsü, sadakat, çekiliş, marka sayfası, teknik özellik tablosu, ek kişiselleştirme tipleri, kayıtta ek alanlar, blog etiket/yazar, sütun seçimi.

## 6. Sub-component'ler

| Sub | Referans ölçüsü | Durumlar | Motion |
|---|---|---|---|
| `ProductCard` | 326 genişlik; görsel 326×400 `color-surface` radius 12; bilgi satırı: ad (`text-title`) + fiyat (`text-price`) solda, 32'lik halkalı sepet ikonu sağda [tahmini] | varsayılan · hover · stok yok · indirimli · favoride · rozetli | M-09, favori kalp pop |
| `ProductCardSmall` | 72×88 görsel + ad + fiyat (arama, sepet) | varsayılan · hover | M-28 |
| `BlogCard` | 4:3 görsel radius 12, etiket, başlık, tarih | varsayılan · hover | M-10 |
| `Button` | hap; büyük 200×48, küçük 160×40; koyu (`color-inverse-bg`) ve açık (beyaz) varyant [tahmini] | varsayılan · hover · pasif · yükleniyor · eklendi · stok yok | M-11 |
| `ArrowLink` | metin + ok + 1px alt çizgi | varsayılan · hover | M-10 |
| `Badge` | hap, `color-surface` zemin, `text-badge`, 8×3 iç boşluk [tahmini] | sınırlı · yeni · indirim (`color-accent`) · stok yok | — |
| `FavoriteButton` | 28'lik beyaz daire + 14'lük kalp [tahmini] | boş · dolu (`color-accent`) · hover | favori kalp pop |
| `CountdownChip` | hap, `color-inverse-bg`, mono rakam [tahmini] | — | geri sayım |
| `Breadcrumbs` | `text-label` muted, ayraç `/` | — | — |
| `Tabs` | yatay ve dikey | aktif · pasif · hover | M-28 |
| `VariantChip` | hap, 1px çizgi; seçili = ters dolgu | seçili · pasif · hover · stok yok (üstü çizili) | M-28 |
| `FormField` | hap, 48 yükseklik, 1px `color-line` [tahmini] | boş · dolu · odak · hata (+ mesaj) · pasif | — |
| `Checkbox` | 18 kare, radius 4 | işaretli · boş | — |
| `AccordionItem` | başlık satırı + artı ikonu, alt çizgi | açık · kapalı | M-22 |
| `QuantitySelector` | hap, eksi / sayı / artı | varsayılan · alt sınır · üst sınır | — |
| `SectionHeading` | ortalı `text-h2` + `text-body` muted, aralık 12 [tahmini] | açıklamalı · açıklamasız | M-01 |
| `IconButton` | 40 dokunma alanı, 16–20 ikon | varsayılan · hover | M-28 |
| `Spinner` | 16 / 20 çizgi daire | — | — |
| `CartLineItem` | 96×120 görsel + bilgiler + adet + kaldır | varsayılan · güncelleniyor · indirimli · hediye (HEDİYE rozeti, adet sabit, kaldır yok) · set (içerik listesi) · kişiselleştirilmiş (seçenekler + Düzenle) | — |
| `OfferCard` | 1px çerçeve, radius-card; onay kutusu + 64×80 görsel + ad + varyant seçimi + fiyat + indirim rozeti | seçili değil · seçili · sepette · tükendi | M-28 |
| `BundleItem` | 64×80 görsel + ad + varyant + adet / ×N + ek fiyat | adet düzenlenebilir · adet sabit · tükendi | — |
| `RatingStars` | 5 × 14 yıldız + mono puan + sayı | puanlı · yorumsuz | — |
| `ReviewCard` | yıldız + başlık + yorum + ad · tarih + doğrulanmış alıcı | doğrulanmış alıcı · doğrulanmamış · görselli · mağaza yanıtlı | — |
| `VariantSwatch` | 32 halka içinde 24 renk/görsel dolgu | varsayılan · seçili · hover · stok yok | M-28 |
| `PriceRange` | iki alan + kaydırıcı (iz, dolgu, iki tutamak) | varsayılan · değer girilmiş | — |
| `SocialLoginButton` | 48 yükseklik, çerçeveli, marka ikonu + etiket | Google · Facebook · hover | — |
| `Skeleton` | `color-surface` bloklar | — | — |

---

## 7. ikas'a aktarım kuralları

**Proje:** `ismail-theme/` (Preact + TS). MCP sunucusu `ismail-theme/.mcp.json` içinde tanımlı → Claude Code'u o klasörde başlat; aksi halde MCP araçları bağlanmaz.

**MCP ne sağlar:**
- Doküman: `get_section_template` (28 şablon), `get_section_child`, `get_framework_guide`, `get_model_guide`, `get_function_doc`, `get_prop_types`, `search_docs`.
- Canlı editör (`ikas theme dev` + editörde Connect gerekir): `import_section`, `add_sections_to_page`, `update_section_prop`, `upload_image(s)`, `search_products`, `list_categories`, `create_page`, `publish_theme` (`confirm: true` olmadan kuru çalışma).
- Tema global'leri: `list_theme_globals`, `create_theme_global` (color, typography, breakpoint, keyframe, colorScheme, globalVariable).

**Sıra:**
1. Tema global'lerini aç (`docs/port/globals-runbook.md`; kullanıcı onayıyla).
2. `src/global.css` içine boşluk/ölçü/motion custom property'leri.
3. Sub-component'ler (`src/sub-components/<Ad>/index.tsx` + `styles.css`; mağaza verisi okuyan alt bileşen `observer(function Ad(){})`).
4. Section başına: `get_section_template` → ENUM gerekiyorsa önce `config add-enum` → `config add-component --type section --props '[...]'` → `index.tsx` + `styles.css` → `npx ikas-component check --json` → `npx ikas-component build`.
5. Header `--isHeader`, Footer `--isFooter`.
6. Editörde sayfalara yerleştir, içerik/görsel yükle; Mağazalar sayfası `create_page` ile açılır.
7. Animasyon turu (planın 8. bölümü).

**Kısıtlar:**
- `ikas.config.json`, `types.ts`, `global-types.ts`, `src/components/index.ts` elle düzenlenmez.
- JSX'te sabit metin yok: her metin TEXT prop (buton yükleme durumu için iki ayrı prop). Mağaza verisinden gelen metinler (`{data:…}`) ve kodun ürettiği metinler (`{code:…}`) prop olmaz.
- Her section'da `backgroundColor` COLOR prop'u; 5+ prop varsa prop grubu.
- Kök bileşen `observer()` ile sarılmaz; alt bileşenler sarılır.
- CSS sadece sınıf seçicileriyle (otomatik `.cc_<id>` öneki); element seçici sızar.
- `@keyframes` / `@font-face` adları bileşene göre yeniden adlandırılır → bileşenler arası paylaşılamaz (paylaşım için tema keyframe token'ı).
- İzinli paketler: `preact`, `mobx`, `@ikas/bp-storefront*`, `@ikas/component-utils`, `animejs`, `three`. Diğerleri build hatası.
- SSR var: `window` / `document` / `IntersectionObserver` sadece `useEffect` içinde. Geri sayım SSR'da hedef tarihten hesaplanan sabit değeri gösterir, saniye tiki `useEffect` içinde başlar.
- Ürün görseli zinciri: `getSelectedProductVariant` → `getProductVariantMainImage` → `.image` → `getDefaultSrc` / `createMediaSrcset`; para biçimi `formatCurrency` (`1.850 TL`).
- Tüccar verisi prop'larında (IMAGE, PRODUCT_LIST, CATEGORY…) `defaultValue` olmaz.
- Büyük harf `text-transform` ile değil, `lang="tr"` kökü ile; rozet ve bant metinleri metnin kendisinde büyük yazılır.
