# Tuval → ikas parite denetimi

Kural: tuvalde ne varsa ikas'ta aynen olur — eksik yok, fazla yok. Tuval (`/Users/yigitozen/Documents/ismail.pen`) tek doğru kaynaktır; kod ve editör içeriği tuvale uydurulur. Sapmalar "açık karar" olarak raporlanmaz, tuvale göre düzeltilir.

## 1. Kod paritesi (bileşen başına)

Her section / overlay / sub için tuvaldeki bütün kökleri oku (`@desktop`, `@mobile`, `— <durum>` kareleri; liste: `docs/port/canvas-dump.txt`) ve kodla karşılaştır:

- Katman yapısı, sıra, hizalama, ölçüler (genişlik, yükseklik, boşluk, padding, köşe), renk token'ı, tipografi stili, ikon, kenarlık, görsel oranı ve kırpma, opaklık, gizli/görünür katmanlar.
- Tuvalde olmayan görsel öğe → kaldır (ekstra çubuk, ekstra fiyat, ekstra halka, ekstra metin…).
- Tuvalde olup kodda olmayan öğe → ekle.
- Durum kareleri (boş, yükleniyor, hata, seçili, hover, stok yok…) birebir.
- Ara kırılımlar (laptop/tablet) `docs/referans/globals.md` §4a'ya göre.
- İşlevsel zorunluluklar: ikas akışının çalışması için gereken ama tuvalde çizilmeyen durum (ör. API hata mesajı) kalabilir; en sade haliyle, tuvaldeki en yakın durumun görsel diliyle. Bunları raporda "tuvalde yok, işlev için gerekli" diye listele.
- Bir alt bileşen (sub) sapıyorsa ve sahibi sensen düzelt; sahibi başkasıysa raporla (sahiplik: §4).

Yöntem: pencil MCP ile yalnızca okuma (`Get`, `Print`, `TakeScreenshot`, `Export`). Kompakt döküm: `/private/tmp/claude-501/-Users-yigitozen-orca-ismail-theme/dfa24521-93fb-44a5-85c3-4b4fdac92a6c/scratchpad/tools/dump.js` (başına `const ROOTS=[...]`). Kesin değerler için `Export([id],"html-css",<scratchpad yolu>)` de kullanılabilir.

## 2. İçerik paritesi (editör)

Tuvalde sayfa kareleri `I/Page/<Ad>@desktop|@mobile` (id'ler `docs/port/canvas-dump.txt`). Her sayfadaki her section için:

- `get_section_values` ile mevcut değerleri oku; tuvaldeki metin, görsel, bağlantı, alt öğe (COMPONENT_LIST) ile karşılaştır.
- Eksik görsel: tuvaldeki görsel düğümünü `Export([nodeId],"jpeg","/Users/yigitozen/orca/ismail-theme/.demo-urunler/<grup>/<ad>",{scale:N,quality:88})` ile dışa al (her Export kendi klasörüne; instance içi yol `inst/child` override değil ana bileşen görselini verir — düz frame'i ya da `I/DS/Imagery` kütüphanesini kullan), `upload_images` ile yükle, `update_page_sections` ile ata.
- Eksik/yanlış metin ve alt öğe: tuvaldeki içerikle doldur (COMPONENT_LIST'te oku-değiştir-yaz: tüm diziyi id'leriyle gönder).
- Header ve Footer ortak bölümdür: değerleri INDEX sayfasındaki yerleşimde durur; yalnızca Header/Footer grubu yazar.
- Ürün, kategori, blog gibi mağaza verisi tuvaldeki örnekle birebir olmak zorunda değil (veri mağazadan gelir); ama tuvalde görünen kurgu (kaç kart, hangi liste tipi, hangi başlık) aynı olur.

## 3. Ortak kurallar

- `docs/port/kod-kurallari.md` geçerli (token'lar, CLI kilidi `cfg.sh`, `tr-groups.sh`, `build` yok, `check --json` var).
- Yalnızca kendi bileşenlerinin dosyalarını ve kendi sayfalarını değiştir.
- Bitti tanımı: kendi dosyalarında `npx ikas-component check --json` 0 hata; değiştirdiğin her bileşen için `import_section` (section id) çağrıldı; rapor yazıldı.

## 4. Gruplar, sahiplik, sayfalar

| Grup | Bileşenler (kod sahibi) | Editör sayfaları (pageId · elementId) |
|---|---|---|
| A Header/Footer | Header, AnnouncementItem, MegamenuColumn, MenuOverlay, SearchOverlay, CartDrawer, CookieBar, Footer, FooterColumn, SocialLink, LocaleSwitcher, CartLineItem, QuantitySelector | INDEX `EQYVweqaDC` · Header `DT4Az0qvdK`, Footer `ZGsTQfd03d` |
| B Ana sayfa | HeroSlider, HeroSlide, ProductGrid, ActivityGrid, ActivityCard, StoreSpotlight, Bestsellers, BestsellerTab, CollectionMosaic, CollectionTile, SectionHeading, Counter, Button, ArrowLink | INDEX `EQYVweqaDC` · HeroSlider `mYfALFHdWy`, ProductGrid `qJz9YgUwEJ`, ActivityGrid `Hjc7JbLC5T`, StoreSpotlight `jUS5Cc68YN`, Bestsellers `kydFyljSAv`, CollectionMosaic `bRcPOHrr4n` |
| C Katalog | ProductList, FilterPanel, FilterDrawer, CollectionHero, ProductCard, ProductCardSmall, Badge, FavoriteButton, VariantSwatch, VariantChip, PriceRange, Checkbox, Breadcrumbs | CATEGORY `1VjE3nuSC4`, SEARCH `mexXgVjUp1`, FAVORITE_PRODUCTS `MDQtmcSDVt` |
| D Ürün | ProductDetail, ServiceHighlight, ProductReviews, QuickBuy, ImagePreview, VariantPicker, ProductOptions, OfferCard, BundleItem, RatingStars, ReviewCard, AccordionItem | PRODUCT `RzQTXVfg8g` |
| E Hesap | CartPage, Account (+ Account* sub'ları), AuthForms, EmailVerification, OrderTracking, FormField, SocialLoginButton, Tabs, Skeleton, Spinner | CART `EEs1iD9jcp`, ACCOUNT `ykDiOezlqp`, ORDERS `F0DR8FljOf`, ORDER_DETAIL `pkphCjE4A9`, ADDRESSES `isTuzgyjcU`, LOGIN `GMX14Spc9h`, REGISTER `BbVIPbdobx`, FORGOT_PASSWORD `yk9zpqxqqC`, RECOVER_PASSWORD `i2FjG52vgm`, ACTIVATE_CUSTOMER `jU08LXkZiu`, Sipariş takibi `bXiiG5dI2Z` |
| F İçerik | BlogList, BlogPost, BlogRelated, BlogCard, NotFound, RichText, FaqList, FaqItem, ContactForm, ContactTopic, ContactChannel, StoreLocator, StoreList, StoreItem | BLOG_INDEX `4Y9yRsnwSW`, BLOG `neMpxHRfaW`, BLOG_CATEGORY `xikZxCsOuh`, NOT_FOUND `XQUkP`, Mağazalarımız `iv8j7Jtdx5`, İletişim `ir7zkHt922`, Gizlilik `5Mkt4gcgf2` |

`Icon` ortak: yeni ikon eklemek serbest, var olanı değiştirmek yasak. `src/utils/*` ortak: ekleme serbest, var olan imzayı değiştirme.

## 5. Bilinen sapmalar (başlangıç listesi; tamamı değil)

- E · CartPage: mobil yapışkan ödeme çubuğu tuvalde yok → kaldır.
- F · BlogPost: metin sütunu tuvalde 720 → 760'tan 720'ye.
- C · ProductCardSmall: indirimde üstü çizili eski fiyat tuvalde yok → kaldır. VariantSwatch: tuvalde olmayan iç halka → kaldır.
- C · ProductList favoriler modu: tuval filtre çubuğu ve kenar çubuğu çiziyor; favorilerde ikas filtre vermiyor → tuvaldeki çubuğu (başlık satırı, sayaç, sıralama) çiz, olmayan filtreler için ne yapılacağını raporla.
- A · CookieBar: tuvaldeki perde (scrim) çizilmemiş → kontrol et, tuvaldeki gibi yap. Header megamenü öne çıkan görsel (menuFeatureImage) boş → doldur.
- B · HeroSlider: `overlayOpacity` varsayılanı (100) ile tuvaldeki perde opaklığını karşılaştır.
- E · AuthForms: sol görsel boş → tuvaldeki görselle doldur (4 sayfa); görselin siyah-beyaz filtresi tuvalde var mı kontrol et.
- E · Account: favoriler sekmesi ayrı sayfaya gidiyor (tuvalde hesap içinde panel yok) → tuvale göre doğrula.
