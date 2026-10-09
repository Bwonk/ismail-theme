# Globals — referans token'ları ve motion tarifleri

Kaynak: ekran görüntüleri: 1 adet (`docs/referans/girdi/01-anasayfa-desktop.jpg`, masaüstü ana sayfa). 1440 genişlikte tasarlandığı varsayıldı [tahmini]. Dosya 752×2314 px boyutunda ve gri bir sunum çerçevesi içinde. Sayfa içeriği görselde yaklaşık 677 px genişliğinde, bu yüzden ölçek **1 görsel px ≈ 2,13 CSS px**. Mobil referans yok; mobil değerler masaüstünden türetildi ve tamamı [tahmini].
Bu dosya referansın **ölçülen** değerlerini verir. İsmail'in kendi kimlik değerleri pen.dev planının "Değişkenler" bölümündedir; buradaki **token adları** sabittir, sadece değerler değişir.

Etiketler: **[ölçüldü]** = siteden/CSS'ten/modülden okundu · **[tahmini]** = gözlemle kestirildi, aktarımda ayarlanacak.

Ekran görüntüsü modunda hiçbir değer ölçülmedi; bu dosyadaki **tüm** değerler [tahmini]. Renkler JPEG sıkıştırmasından okunduğu için ±1–2 ton sapabilir.

Sütunlar: referans değeri → pen.dev değişkeni (`$ad`) → ikas karşılığı.

---

## 1. Renk

Referans iki palet kullanıyor. Açık palet sayfa gövdesinde, koyu palet bülten ve footer bandında. Brief'teki "ters bölümler" kararı bu yapıyla örtüşüyor: koyu palet `mode: dark` olur.

| Token | Referans | pen.dev | ikas |
|---|---|---|---|
| Zemin (açık) | **Kar Beyazı** `#FFFFFF` [tahmini] | `color-bg` | colorScheme slot `Background` |
| Zemin (koyu: footer) | **Gece Kayası** `#161616` [tahmini] | `color-bg` (`mode: dark`) | ikinci palet `Background` |
| Metin (açık) | **Grafit** `#111111` [tahmini] | `color-text` | slot `Text` |
| Metin (koyu) | **Kar Beyazı** `#FFFFFF` [tahmini] | `color-text` (`mode: dark`) | ikinci palet `Text` |
| İkincil metin (açık) | **Sis Grisi** `#8C8C8C` [tahmini]; beyaz üstünde kontrastı ≈ 3,4:1, plan aşamasında koyulaştırılmalı | `color-muted` | tema rengi `Muted` |
| İkincil metin (koyu) | **Duman** `#A3A3A3` [tahmini] (footer linkleri) | `color-muted` (`mode: dark`) | ikinci palet `Muted` |
| Çizgi | **Buz Çizgisi** `#DADADA` [tahmini]; çizgi neredeyse hiç yok: kart sepet ikonunun halkası ve bülten alanının çerçevesi | `color-line` | tema rengi `Line` |
| Yüzey | **Kaya Tozu** `#F0F0F0` [tahmini] (ürün görseli zemini) | `color-surface` | tema rengi `Surface` |
| Ters zemin (buton, hover dolgu) | **Grafit** `#111111` [tahmini] ("See All", "See On Maps" hap butonları) | `color-inverse-bg` | slot `PrimaryButton/Background` |
| Ters metin | **Kar Beyazı** `#FFFFFF` [tahmini] | `color-inverse-text` | slot `PrimaryButton/Text` |
| Pasif öğe opaklığı | `0.4` [tahmini]; referansta pasif sekme ya da thumbnail görünmüyor | `opacity-inactive` | `global.css` `--opacity-inactive` |
| Overlay karartma | **Kar Gecesi** `#000000` %55 → `#0000008C` [tahmini] (bülten görseli üstü); hero görselinde ≈ %20 karartma | `color-scrim` | `global.css` `--color-scrim` |
| Vurgu | **Sinyal Kırmızısı** `#E0262F` [tahmini]; yalnızca dolu favori kalbinde | `color-accent` | tema rengi `Accent` |
| Vurgu üstü metin | `#FFFFFF` [tahmini]; referansta vurgu zemininde metin yok | `color-accent-text` | tema rengi `AccentText` |
| Gradyan başlangıcı (saydam zemin) | `#FFFFFF00` [tahmini]; referansta gradyan yok, yalnızca düz karartma var | `color-transparent` | `global.css` `--color-transparent` |
| Hata | referansta yok; öneri `#C62828` [tahmini] | `color-danger` | tema rengi `Danger` |
| Başarı | referansta yok; öneri `#1F7A3E` [tahmini] | `color-success` | tema rengi `Success` |

Kurallar [tahmini]:
- **Çizgi neredeyse yok.** Bölümler zemin, boşluk ve görsel kenarlarıyla ayrılıyor. 1px çizgi yalnızca kart sepet ikonunun halkasında ve bülten giriş alanının çerçevesinde var.
- **Köşe yarıçapı iki tane:** ürün görsel kutusu, koleksiyon karoları ve mağaza görseli ≈ 12; butonlar, giriş alanı, rozet ve geri sayım çipi tam hap (999). Çekirdek değişkenlerde radius yok; planda `radius-card` ve `radius-pill` ek değişken olarak §3'te listelenir.
- **Gölge yok.** Derinlik iki yolla veriliyor: görsel üstüne düz karartma (hero, bülten) ve açık gri yüzey üstünde dekupe ürün fotoğrafı.
- Koleksiyon karolarının fotoğrafları siyah-beyaz; üstlerinde beyaz büyük etiket, görselin ortasında.
- Ürün fotoğrafları `color-surface` zemininde, düz ışıkta, ortalanmış ve dekupe stüdyo çekimi.

ikas notu: renkler `create_theme_global` (kind `color` / `colorScheme`) ile açılır. Açık ve koyu iki palet tek colorScheme'in iki paleti olur. Kodda `cssVar` kullanılır (canlı güncellenir). Her section ayrıca `backgroundColor` prop'u taşır.

### 1a. Renk şemaları (ikas colorScheme, canvas `I/DS/Colors` → "RENK ŞEMALARI")

Mağaza sahibi editörde her bölüme bir şema seçer; bölüm kökü `_<schemeId>` sınıfını alır. Değerler canvas değişkenlerinden (son hâli, analiz tahminleri değil).

| ikas slot | pen.dev token | Kâğıt (varsayılan, açık) | Mürekkep (koyu) | Şeffaf (görsel üstü) |
|---|---|---|---|---|
| background | `color-bg` | `#F4F4F1` | `#131514` | `#13151400` (saydam) |
| text | `color-text` | `#141414` | `#F4F4F1` | `#F4F4F1` |
| muted | `color-muted` | `#5C5C57` | `#A6A69F` | `#A6A69F` |
| line | `color-line` | `#8A8A84` | `#6E6E68` | `#6E6E68` |
| surface | `color-surface` | `#E8E8E3` | `#1F2120` | `#F4F4F11A` |
| button-bg | `color-inverse-bg` | `#141414` | `#F4F4F1` | `#F4F4F1` |
| button-text | `color-inverse-text` | `#F4F4F1` | `#141414` | `#141414` |
| accent | `color-accent` | `#F2541A` | `#F2541A` | `#F2541A` |
| accent-text | `color-accent-text` | `#141414` | `#141414` | `#141414` |
| danger | `color-danger` | `#B3261E` | `#FF8A7A` | `#FF8A7A` |
| success | `color-success` | `#1E7A45` | `#6FD49A` | `#6FD49A` |
| scrim | `color-scrim` | `#13151499` | `#131514B3` | `#131514B3` |

Varsayılan şema eşleşmesi:
- **Kâğıt:** Header, HeroSlider altındaki bütün gövde bölümleri, ProductGrid, ActivityGrid başlığı, StoreSpotlight, Bestsellers, ProductList, ProductDetail, ProductReviews, CartPage, Account, AuthForms, NotFound, EmailVerification, Blog*, StoreList, ContactForm, StoreLocator, FaqList, RichText, OrderTracking; overlay'lerden CartDrawer, SearchOverlay, QuickBuy, FilterDrawer, LocaleSwitcher.
- **Mürekkep:** Footer (CTA bandı dahil), MenuOverlay mobil paneli, CookieBar.
- **Şeffaf:** Header `— şeffaf` hali (hero üstü), HeroSlider içerik katmanı, CollectionHero, CollectionMosaic ve ActivityGrid karo içerikleri, ImagePreview.

Port: önce slotlar (`rename_theme_color_scheme_slot` ile adlar), sonra üç palet `update_theme_color_scheme`; bölümlerin varsayılan şeması yukarıdaki eşleşmeyle. Kontrast çiftleri `I/DS/Colors` "KONTRAST ÇİFTLERİ" satırlarında doğrulandı.


---

## 2. Tipografi

Referans font: **neo-grotesk sans**. Başlıklar orta kalınlıkta (≈ 500), harf aralığı dar (≈ −2%), büyük harf kullanılmıyor. Fiyat aynı ailede yarı kalın. Gövde ve UI aynı ailenin normal ağırlığında. Geri sayım çipinde tabular rakam var. Tek aile, tek ses: yazı karakteri ön planda değil, fotoğrafa alan bırakıyor. Tam yüz tespit edilemedi [tahmini].

**pen.dev kısıtı:** Google Fonts adayları latin-ext içermeli (`İ ı Ş ş Ğ ğ`). Display ve UI için adaylar: `Instrument Sans`, `Hanken Grotesk`, `Schibsted Grotesk`, `Onest`. Hiçbiri pen.dev'de henüz doğrulanmadı; DS adımında ilk `Insert` ile denenecek. Geçersiz çıkarsa doğrulanmış yedek `Barlow` kullanılır. Mono için `JetBrains Mono` pen.dev'de doğrulanmış. **Karar (2026-10-08, kullanıcı):** etiket/fiyat/sayaç rolü (`font-mono`, `font-price`) için JetBrains Mono yerine `Inter Tight` seçildi (orantılı; kodda `tabular-nums`). pen.dev'de geçerli, Türkçe karakterleri tam. Inter/Roboto bilinçli olarak dışarıda bırakıldı (`08-quality.md` "Safe fonts").

### Preset'ler [tahmini] — GEÇERSİZ, bkz. §2a

> **Geçersiz (analiz tahmini, 2026-10-08):** bu tablo ilk analizdeki tahmindir ve artık kullanılmaz. Port ve canvas için geçerli değerler **§2a ikas metin stilleri** tablosundadır.

| Token | Kullanım | ≥1200 | 992–1199 | 768–991 | <768 | Ağırlık | Satır |
|---|---|---|---|---|---|---|---|
| `text-display` | Hero başlığı; mağaza bloğundaki büyük yüzde rakamı | 88 | 76 | 64 | 44 | 500 | 1.0 |
| `text-h2` | Bölüm başlığı (Yeni gelenler, Koleksiyonlar, Bülten); koleksiyon karosu etiketi | 44 | 40 | 36 | 30 | 500 | 1.1 |
| `text-h3` | Mağaza bloğu başlığı (3 satır) | 36 | 34 | 30 | 26 | 500 | 1.15 |
| `text-h4` | Panel ara başlığı ("indirim" satırı), çekmece başlığı | 20 | 20 | 18 | 18 | 600 | 1.2 |
| `text-title` | Ürün adı | 14 | 14 | 13 | 13 | 500 | 1.25 |
| `text-ui` | Nav linki, buton etiketi, header aksiyonları | 14 | 14 | 14 | 14 | 500 | 1.2 |
| `text-ui-sm` | Footer linki, footer sütun başlığı, alt satır | 13 | 13 | 12 | 12 | 400 | 1.4 |
| `text-badge` | "Sınırlı" türü rozet, sepet sayacı | 11 | 11 | 10 | 10 | 500 | 1.0 |
| `text-label` | Duyuru bandı metni, geri sayım rakamları (mono), breadcrumb | 12 | 12 | 11 | 11 | 400 | 1.2 |
| `text-body` | Hero açıklaması, bölüm alt metni, mağaza paragrafı, bülten açıklaması | 15 | 15 | 14 | 14 | 400 | 1.5 |
| `text-price` | Fiyat | 15 | 15 | 14 | 14 | 600 | 1.2 |

Notlar:
- Başlıklarda harf aralığı ≈ −0.02em, diğerlerinde 0 [tahmini].
- İkincil renkli varyantlar ayrı preset değil; aynı preset `color-muted` ile kullanılır (bölüm alt metni, mağaza paragrafı).
- Üstü çizili eski fiyat = `text-price` + `color-muted` + üstü çizili. Referansta indirimli fiyat görünmüyor.
- Ölçek bilinçli olarak dar: display 88 ile body 15 arasında yalnızca iki büyük adım var (44 ve 36). Plan bu ölçeği koruyabilir ya da imza olarak tek bir yerde büyütebilir.

| | pen.dev | ikas |
|---|---|---|
| Boyutlar | `device` eksenli sayı değişkenleri (`desktop` = ≥1200 sütunu, `mobile` = <768 sütunu) | preset başına `create_theme_global` kind `typography`; uygularken `className` |
| Aile | `font-display`, `font-ui`, `font-body`, `font-price` (aynı sans) + `font-mono` | `font_family` alanı |
| Ara kırılımlar | tasarlanmaz | 992–1199 ve 768–991 değerleri bileşen CSS'inde `@media (max-width: bp(<id>))` ile |

**Açık soru (font yükleme):** ikas typography token'ının `font_family` alanı Google Fonts adını doğrudan kabul ediyor mu, ve seçilen ailenin ağırlıkları (400/500/600) `supportedFontWeights` ile eşleşiyor mu? Port'un ilk adımında editörde denenmeli.

### 2a. ikas metin stilleri (son değerler, canvas `I/DS/Typography` → "ikas METİN STİLLERİ")

§2'deki tablo analiz tahminidir; port bu tabloyu kullanır. Punto px; masaüstü değerleri varsayılan stil, diğer üç sütun `update_text_style` + `breakpoint_id` (laptop 1199 · tablet 991 · mobile 767) üzerine yazılır.

| ikas stil | Token | Aile · ağırlık | ≥1200 | 992–1199 | 768–991 | <768 | Satır | Harf |
|---|---|---|---|---|---|---|---|---|
| Display | `text-display` | Mona Sans · 500 | 96 | 80 | 64 | 48 | 1.0 | −0.02em |
| Başlık 2 | `text-h2` | Mona Sans · 500 | 44 | 40 | 36 | 30 | 1.1 | −0.02em |
| Başlık 3 | `text-h3` | Mona Sans · 500 | 32 | 30 | 28 | 24 | 1.15 | −0.015em |
| Başlık 4 | `text-h4` | Mona Sans · 600 | 20 | 20 | 18 | 18 | 1.2 | −0.01em |
| Ürün adı | `text-title` | Mona Sans · 500 | 14 | 14 | 13 | 13 | 1.25 | 0 |
| Arayüz | `text-ui` | Mona Sans · 500 | 14 | 14 | 14 | 14 | 1.25 | 0 |
| Arayüz küçük | `text-ui-sm` | Mona Sans · 400 | 13 | 13 | 12 | 12 | 1.4 | 0 |
| Rozet | `text-badge` | Inter Tight · 500 · BÜYÜK HARF | 11 | 11 | 10 | 10 | 1.2 | +0.04em |
| Etiket | `text-label` | Inter Tight · 400 · BÜYÜK HARF | 12 | 12 | 11 | 11 | 1.2 | +0.04em |
| Gövde | `text-body` | Mona Sans · 400 | 15 | 15 | 14 | 14 | 1.5 | 0 |
| Fiyat | `text-price` | Inter Tight · 500 · tabular-nums | 14 | 14 | 13 | 13 | 1.2 | 0 |


---

## 3. Boşluk, grid, ölçü

| Token | Referans [tahmini] | pen.dev | ikas |
|---|---|---|---|
| Sayfa kenar boşluğu | 32 [tahmini] (içerik genişliği 1376) | `space-page` | `--space-page` |
| Grid aralığı | 24 [tahmini] (ürün ızgarası ve koleksiyon mozaiği) | `space-grid` | `--space-grid` |
| Kart iç boşluğu | 12 [tahmini] (kalp ikonu ve rozetin görsel kenarına uzaklığı) | `space-card` | `--space-card` |
| Panel iç boşluğu | 32 [tahmini] (mağaza bloğunda görselle metin sütunu arası) | `space-panel` | `--space-panel` |
| Küçük aralık | 4 [tahmini] (ürün adı ↔ fiyat) | `space-xs` | `--space-xs` |
| Orta aralık | 12 / 24 [tahmini] (başlık ↔ alt metin 12; alt metin ↔ ızgara 24) | `space-sm`, `space-md` | aynı adlar |
| Bölüm üst boşluğu | 120 [tahmini] (ızgara sonu ↔ sonraki bölüm ≈ 140–160; hero ↔ ilk başlık ≈ 56) | `space-section` | `--space-section` |
| Header yüksekliği | 72 [tahmini] (hero üstüne biniyor) + duyuru bandı 36 | `size-header` | `--size-header` |
| Logo boyutu | 22 [tahmini] (header wordmark yüksekliği); footer'da ≈ 44 | `size-logo` | `--size-logo` |
| Çizgi kalınlığı | 1 [tahmini] | `size-line` | `--size-line` |
| Hero yüksekliği | ≈ 730 [tahmini] (header dahil, duyuru bandı hariç) | `size-hero` (ek değişken) | `min(100svh, 760px)` |
| İçerik genişliği | tam genişlik eksi 2 × 32 [tahmini]; metin blokları ortalı, en fazla ≈ 640 | — | bileşen CSS |

Grid düzenleri [tahmini, 1440]:
- **Duyuru bandı:** 36 yükseklik, beyaz zemin, ortalı tek satır metin ve siyah hap içinde `SS:DD` geri sayım.
- **Header:** hero üstünde şeffaf, beyaz metin. Solda logo, logonun yanında 5 nav linki; sağda arama, sepet (sayaçlı) ve giriş (ikon + etiket).
- **Hero:** tam genişlik fotoğraf, ≈ 730 yüksek. Başlık, açıklama (en fazla ≈ 640) ve ortada beyaz hap CTA (200×48) var. CTA alt kenara yakın, başlıktan ayrı duruyor.
- **Ürün ızgarası:** 4 sütun × 326, aralık 24, 2 satır, satır aralığı ≈ 32. Görsel kutusu 326×400 (≈ 4:5), `color-surface`, radius 12. Bilgi satırında solda ad + fiyat, sağda 32'lik halkalı sepet ikonu. Kalp sağ üstte (28'lik beyaz daire). Rozet sol üstte. Altta ortalı siyah hap "tümünü gör" butonu (200×46).
- **Mağaza bloğu:** solda 910×530 görsel (≈ 16:9, radius 12), sağda 434'lük metin sütunu. Sütun dikey olarak 3 grup halinde: başlık + paragraf · küçük kalın etiket + dev yüzde rakamı · siyah hap buton.
- **Koleksiyon mozaiği:** 3 eşit sütun × ≈ 440, aralık 24, her sütunda 2 karo. Toplam yükseklik ≈ 845. Yükseklik deseni: sütun 1 kısa (325) + uzun (500), sütun 2 uzun + kısa, sütun 3 kısa + uzun. Bir karo "öne çıkan" (başlık + açıklama + beyaz hap buton). Görseller siyah-beyaz, etiketler `text-h2` beyaz ve ortalı.
- **Bülten:** ≈ 345 yükseklik, tam genişlik koyu fotoğraf + karartma, ortalı başlık + açıklama + satır içi form. Alan 360×48 (1px çizgi, hap), buton 160×48 (beyaz hap).
- **Footer:** ≈ 380, koyu zemin. Solda logo + 3 satır tanıtım metni (≈ 300); ortada 3 link sütunu; sağda 4 sosyal ikon. Alt satırda sağda "iletişim" ve "para birimi | dil", en altta ortalı telif.

Mobil (<768) [tahmini; referansta yok, masaüstünden türetildi]:
- Header: solda menü ikonu, ortada logo, sağda arama ve sepet. Giriş ve nav linkleri MenuOverlay'e taşınır. Duyuru bandı korunur (metin kısalır, geri sayım kalır).
- Hero: ≈ 560 yükseklik, başlık `text-display` mobil (44), CTA tam genişlik değil, ortalı.
- Ürün ızgarası: 2 sütun, aralık 12; 8 ürün 4 satır olur. Kalp ve sepet ikonu korunur.
- Mağaza bloğu: önce görsel (4:3, tam genişlik), sonra metin sütunu.
- Koleksiyon mozaiği: 2 sütun. Öne çıkan karo tam genişlik, diğerleri ikili.
- Bülten: form dikey (alan + buton tam genişlik).
- Footer: logo + metin, link sütunları akordeon (M-22), sosyal ikonlar, alt satırlar alt alta.

---

## 4. Kırılımlar

| Ad | Aralık [tahmini] | pen.dev | ikas |
|---|---|---|---|
| desktop | ≥ 1200 [tahmini] | frame 1440, `device: desktop` | varsayılan stil |
| laptop | 992–1199 [tahmini] | tasarlanmaz | `create_theme_global` breakpoint `laptop` 1199 |
| tablet | 768–991 [tahmini] | tasarlanmaz | breakpoint `tablet` 991 |
| mobile | < 768 [tahmini] | frame 390, `device: mobile` | breakpoint `mobile` 767 |

CSS'te `@media (max-width: bp(<breakpointId>))` yazılır; `var()` medya sorgusunda çalışmaz.

### 4a. Ara kırılım davranışı (laptop · tablet; tasarlanmaz, port CSS'inde uygulanır)

≥1200 ve <768 sütunları canvas'taki çizimdir; 992–1199 ve 768–991 sütunları `@media (max-width: bp(laptop|tablet))` kurallarının kaynağıdır.

| Bölüm | ≥1200 (masaüstü) | 992–1199 (laptop) | 768–991 (tablet) | <768 (mobil) |
|---|---|---|---|---|
| Header | logo + 5 nav + etiketli arama/sepet/hesap | nav aralığı 24; eylemlerde yalnız ikon + sayaç | nav gizli → menü düğmesi (MenuOverlay mobil paneli, soldan 420); logo solda | menü · logo · sepet (çizili) |
| Duyuru bandı | tek satır ortalı + geri sayım | aynı | metin kısalır, geri sayım kalır | 32 yükseklik (çizili) |
| HeroSlider | display 96, içerik sol altta, sayaç sağda | display 80 | display 64; görsel 4:3 kırpma; sayaç alta | display 48 (çizili) |
| ProductGrid | 4 sütun × 2 satır | 4 sütun, kart ≈ 230 | 3 sütun × 2 satır (6 kart) | 2 sütun (çizili) |
| ActivityGrid | 5 genişleyen kart | 5 kart, açık kart 420 | yatay kaydırmalı şerit (mobil davranışı), genişleme kapalı | şerit 240 / 88 (çizili) |
| StoreSpotlight | görsel + metin 50/50 | 50/50, rakam display 80 | alt alta: görsel 16:9 üstte | alt alta (çizili) |
| Bestsellers | sıralı liste + 560 önizleme | liste + 440 önizleme | önizleme gizli, liste tam genişlik (96 görsel) | önizleme üstte + liste (çizili) |
| CollectionMosaic | 3 sütun mozaik, dikey akordeon hover | aynı | 2 sütun mozaik, hover kapalı (dokunmatik) | 2 sütun + tam genişlik karolar (çizili) |
| ProductList | 280 filtre kenarı + 3 sütun | 240 kenar + 3 sütun | kenar yok → FilterDrawer (soldan 420); 3 sütun | 2 sütun + çekmece (çizili) |
| CollectionHero | 480 yükseklik | 440 | 400, display 64 | 360 (çizili) |
| ProductDetail | 2 sütun galeri + 452 yapışkan bilgi | tek sütun galeri + 400 bilgi | galeri yatay kaydırma üstte, bilgi altta; birlikte al kartları 2'li | + alt yapışkan satın alma çubuğu (çizili) |
| ProductReviews | 420 özet + liste | 360 özet + liste | özet üstte (puan ve çubuklar yan yana), liste altta | alt alta (çizili) |
| CartPage | satırlar + 452 özet | satırlar + 380 özet | özet altta tam genişlik; öneriler 2 sütun | + yapışkan ödeme (çizili) |
| Account | 280 sekme sütunu + panel | 220 sekme + panel | sekmeler üstte yatay kaydırma; adres kartları 2'li | çizili |
| AuthForms | görsel 720 + form 400 | görsel %50 + form | görsel gizli, form ortada 480 | çizili |
| NotFound · EmailVerification | ortalı / sola yaslı blok | aynı | 404 display 64 | çizili |
| BlogList | 3 sütun | 3 sütun | 2 sütun | 1 sütun (çizili) |
| BlogPost | 760 metin, tam kapak | aynı | metin 640, kapak 16:9 | çizili |
| BlogRelated · StoreList | 3 kart | 3 kart | 2 kart | 1 kart / şerit (çizili) |
| ContactForm | form + kanal kartları sütunu | kanal sütunu 320 | kanallar formun altında 2 sütun | çizili |
| StoreLocator | öne çıkan mağaza + liste | aynı | liste altta | çizili |
| FaqList | 420 başlık + akordeon | 360 + akordeon | başlık üstte | çizili |
| RichText | 280 içindekiler + 760 metin | 220 + metin | içindekiler açılır kutu, metin 640 | çizili |
| OrderTracking | form + sonuç yan yana | aynı | alt alta | çizili |
| Footer | CTA bandı + iki kart yan yana; 3 link sütunu; tek satır alt bilgi | kartlar 1fr / 420 | kartlar alt alta; link sütunları 3 dar sütun; alt bilgi iki satır | akordeon (çizili) |
| CartDrawer | sağdan 440 | 440 | 440 | tam genişlik (çizili) |
| SearchOverlay | üstten 520 panel, 4'lü sonuç | 4'lü | 3'lü | tam ekran liste (çizili) |
| MenuOverlay | megamenu | megamenu | soldan 420 panel (mobil düzeni) | tam ekran (çizili) |
| QuickBuy | ortada 960 pencere | 880 | 640 pencere, görsel 280 | alt sayfa (çizili) |
| FilterDrawer | — (kenar çubuğu) | — | soldan 420 çekmece | tam ekran (çizili) |
| CookieBar · LocaleSwitcher · ImagePreview | alt şerit · footer üstünde 320 panel · 640 görsel + oklar | aynı | şerit iki satır · aynı · görsel tam genişlik | kart · alt sayfa · çizili |


---

## 5. Katman sırası

| Katman | z | Not |
|---|---|---|
| Sayfa içeriği | 1 | opak zemin |
| Hero görseli + karartma | 1 | header'ın altında kalır |
| Ürün kartı üst katmanı (kalp, rozet) | 2 | görsel kutusunun içinde |
| Duyuru bandı | 10 | akışta, header'ın üstünde |
| Header (hero üstünde şeffaf; kaydırınca opak zemin) | 10 | scroll davranışı [tahmini]; plan karar verir |
| MenuOverlay / megamenu | 15 | header'ın altında açılır |
| Scrim + çekmeceler (sepet, filtre) + arama | 20 | M-20, M-21 |

---

## 6. İkonlar

Referans: tek set, **çizgi ikon**, ≈ 1.5 px kontur, 16–20 px. Görülenler: arama (büyüteç), sepet (çanta), hesap (daire içinde kişi), kalp (boş = çizgi, favori = `color-accent` dolu), kart içi sepet (32'lik 1px halka içinde 16'lık çanta). Footer'daki sosyal ikonlar dolu (4 adet, 20 px). Ok ve caret görünmüyor. Gerekenler (menü, kapat, ok, caret, artı, eksi, onay) aynı çizgi setten seçilir: pen.dev'de `icon` node'u (lucide). Logo ve wordmark `Generate("svg")` ile özgün üretilir; referans logosu kullanılmaz. ikas'ta ikonlar sub-component içinde inline SVG olur. Logoyu tüccar değiştireceği için logo `SVG` prop'tur; sosyal ikonlar `SVG` prop'lu çocuk component olur.

---

## 7. Motion

Durağan görüntüden hareket ölçülemez. Aşağıdaki değerler, referanstaki ipuçlarından (geri sayım, hover'a açık kartlar, çekmece gerektiren sepet) ve brief'teki "orta" motion seviyesinden türetildi. Tümü [tahmini].

### 7.1 Token'lar

| Token | Değer | Kullanım |
|---|---|---|
| `ease-standard` | `cubic-bezier(.4, 0, .2, 1)` [tahmini] | yükleme, genel tween |
| `ease-out-soft` | `cubic-bezier(.22, 1, .36, 1)` [tahmini] | görsel zoom, reveal, çekmece |
| `dur-fast` | 0.2s [tahmini] | renk, ikon, kalp |
| `dur-base` | 0.4s [tahmini] | buton dolgu, kart görsel değişimi |
| `dur-slow` | 0.8s [tahmini] | hero giriş, koleksiyon karosu zoom |
| `spring-soft` | spring bounce 0.2, 0.4s [tahmini] | kalp "pop", sepet sayacı |
| `spring-drawer` | stiffness 300, damping 40, mass 1 [tahmini] | çekmece |
| `spring-search` | stiffness 600, damping 50 [tahmini] | arama paneli |
| `dur-countdown` | 1s tik [tahmini] | duyuru geri sayımı |

CSS karşılıkları (AnimeJS kullanılmayan yerde): bounce 0 → `cubic-bezier(.22, 1, .36, 1)`; bounce 0.2 → `cubic-bezier(.34, 1.3, .64, 1)`.

### 7.2 Uygulama yolları (ikas)

| Kısa ad | Ne | Ne zaman |
|---|---|---|
| `css-transition` | `:hover` / durum sınıfı + `transition` | hover, aç/kapa, renk |
| `css-keyframes` | bileşen `styles.css` içinde `@keyframes` | sonsuz döngü (marquee, pulse). Ad bileşene göre yeniden adlandırılır → **her bileşen kendi keyframe'ini tanımlar** |
| `theme-keyframe` | `create_theme_global` kind `keyframe`, `animation-name: <ref>` | birden çok bileşenin paylaştığı keyframe |
| `io-hook` | `useEffect` içinde `IntersectionObserver` → `is-inview` sınıfı | görünürlükte bir kez tetiklenen giriş |
| `animejs` | `import { AnimeJS } from "@ikas/bp-storefront"`, `useEffect` içinde | stagger, timeline, spring, kelime bölme |
| `scroll-scrub` | `useEffect` içinde scroll dinleyici + `requestAnimationFrame` → CSS değişkeni | scroll'a bağlı ilerleme |
| `layout` | `position: sticky` | animasyon değil, düzen davranışı |

Ortak kurallar: tarayıcı API'si sadece `useEffect` içinde (SSR var); SSR çıktısı **bitiş halini** göstermeli, başlangıç hali JS yüklenince sınıfla verilir; `prefers-reduced-motion: reduce` altında döngüler durur, girişler anında olur; dışarıdan paket yok (sadece `animejs`, `three`).

### 7.3 Tarif kataloğu

Her tarif için "Katman yapısı" sütunu pen.dev tasarımında **zorunlu** olan yapıdır. ID'ler ve adlar sabittir (`references/03-motion.md`). Referansta görülmeyen tariflerin değer sütununda "referansta yok" yazar. Kapsamdaki sayfalar için önerilenler "öneri" olarak işaretlendi.

| ID | Ad | Hareket ve değerler | Katman yapısı | Uygulama | Mobil / azaltılmış hareket |
|---|---|---|---|---|---|
| **M-01** | Yükleme fade-up | öneri: hero açıklaması ve CTA, bölüm başlıkları; `y 40→0`, `opacity 0→1`, 0.5s `ease-standard`, gecikme 0.2s [tahmini] | hedef öğe tek katman | `css-keyframes` + `io-hook` | aynı / anında |
| **M-02** | Yükleme fade | öneri: hero görseli; `opacity 0→1`, 1.2s [tahmini] | tek katman | `css-keyframes` | aynı / anında |
| **M-03** | Kelime kelime başlık reveal | öneri: yalnızca hero başlığı; değerler katalogdaki gibi [tahmini] | başlık satırı kendi `clip` maske frame'inde; her satır ayrı metin node'u | `animejs` + `io-hook` | sadece y + opacity / anında |
| **M-04** | Duyuru metin döngüsü | referansta yok: bant tek metin + geri sayım. Birden çok duyuru girilirse dikey kayma, 4s [tahmini] | `announcement-mask` (clip) içinde metinler üst üste | `css-keyframes` | ilk metin sabit / ilk metin sabit |
| **M-05** | Nav hover dolgu + etiket roll | referansta yok; nav linkleri yalın metin. Yerine M-28 kullanılır | — | — | — |
| **M-06** | Megamenu aç/kapa | öneri: "Kategoriler" linki kalın görünüyor, açılır menü sinyali [tahmini]; panel aşağı açılır, 0.4s `ease-out-soft` | `megamenu` ayrı overlay frame: link sütunları + görsel kart | `css-transition` | akordeon / anında |
| **M-07** | Hero slayt geçişi | referansta tek slayt. Tüccar birden çok slayt girerse çapraz geçiş 0.8s + görsel `scale 1.08→1` [tahmini] | `hero-slides` içinde slaytlar kardeş: `hero-slide-mask` (clip) → `hero-slide-image` → `hero-scrim`; metin ayrı `hero-text` | `animejs` | çapraz geçiş / anında değişim |
| **M-08** | Thumbnail ilerleme | referansta yok | — | — | — |
| **M-09** | Ürün kartı hover | öneri: ön görsel → arka görsel 0.4s; sepet halkası `color-inverse-bg` ile dolar [tahmini] | `card-media` (clip) içinde üst üste `image-front` + `image-back`; `card-cart` halka + ikon | `css-transition` | dokunmatikte kapalı / anında |
| **M-10** | Oklu link hover | öneri: footer ve blog linkleri; alt çizgi `0→100%` 0.3s [tahmini] | `link` içinde metin + `link-line` (1px) | `css-transition` | kapalı / anında |
| **M-11** | Buton hover dolgu | öneri: hap butonlar; zemin `inverse-bg ↔ bg` yer değiştirir, 0.4s [tahmini] | `button` (clip) içinde `top` + `bottom` kopya | `css-transition` | kapalı / anında renk değişimi |
| **M-12** | Hotspot pulse + kart | referansta yok | — | — | — |
| **M-13** | Sticky panel | öneri: ürün detayında bilgi sütunu sticky [tahmini; referansta PDP yok] | sticky öğe ve kabı gerçek yükseklikte | `layout` | sticky yok |
| **M-14** | Metin marquee | referansta yok | — | — | — |
| **M-15** | Görsel ticker | referansta yok | — | — | — |
| **M-16** | Footer reveal | referansta yok; footer normal akışta | — | — | — |
| **M-17** | Yumuşak kaydırma | referansta yok | — | ikas'ta Lenis **kullanılamaz** (paket izni yok). Varsayılan: uygulanmaz | — |
| **M-18** | Filtre barı | öneri: kategori sayfasında sticky filtre/sıralama barı, sekme rengi 0.3s [tahmini] | `filter-bar` ayrı katman; aktif ve pasif stiller ayrı | `layout` + `css-transition` | yatay kaydırma / anında |
| **M-19** | PDP galeri scrollspy | öneri: galeri alt alta, bilgi sütunu sticky, aktif thumbnail çerçevesi [tahmini] | `pdp-details` (sticky), `pdp-gallery` (gerçek yükseklik), `pdp-thumbs` | `layout` + `io-hook` | yatay galeri + noktalar / anında |
| **M-20** | Çekmece | öneri: sepet ve mobil filtre; `x 100%→0`, `spring-drawer`, scrim fade 0.3s [tahmini] | ayrı overlay frame: `scrim` + `drawer` (başlık, gövde, alt ayrı katmanlar) | `css-transition` + `animejs` | tam genişlik / anında |
| **M-21** | Arama | öneri: header altından açılan panel, `spring-search` [tahmini] | ayrı overlay frame: `search-panel` (alan + sonuç ızgarası); boş ve dolu hali ayrı | `css-transition` | tam ekran / anında |
| **M-22** | Akordeon | öneri: mobil footer sütunları, PDP açıklama/iade, SSS; yükseklik 0.4s, artı 45° [tahmini] | `accordion-item`: `accordion-head` + `accordion-body`; açık ve kapalı hali ayrı | `css-transition` | aynı / anında |
| **M-23** | Scroll-scrub görsel | referansta yok | — | — | — |
| **M-24** | Scroll-scrub metin | referansta yok | — | — | — |
| **M-25** | Scrollspy gezinme | referansta yok | — | — | — |
| **M-26** | Alıntı slider | referansta yok | — | — | — |
| **M-27** | Hero parallax | öneri: hero görseli içerikten yavaş kayar, `bg.y 0→15%` [tahmini] | `hero-bg` ayrı katman, kabından %15 yüksek | `scroll-scrub` | kapalı / kapalı |
| **M-28** | Durum rengi | öneri: nav linkleri, footer linkleri, sekmeler, varyant çipi; `muted→text` 0.2s [tahmini] | aktif / pasif / hover stilleri ayrı | `css-transition` | aynı / anında |

Plan'da yerel tarif olarak eklenecekler (katalogda karşılığı yok):
- **Geri sayım** (duyuru bandı): `{code:countdown}` metni saniyede bir güncellenir. Animasyon yok, rakamlar tabular mono.
- **Koleksiyon karosu hover**: görsel `scale 1→1.05`, `dur-slow`, `ease-out-soft`; siyah-beyaz → renkli geçiş opsiyonel. Katman yapısı: `tile-media` (clip) → `tile-image`.
- **Favori kalp pop**: `scale 1→1.25→1`, `spring-soft`, renk `color-text → color-accent`. Katman yapısı: `fav-button` içinde `fav-icon-outline` + `fav-icon-filled` üst üste.
- **Perde girişi** (`I-M-04`, 2026-10-08 revizyonu, ActivityGrid): kartlar soldan sağa 0.08s arayla `clip-path: inset(100% 0 0 0 round 6px) → inset(0 round 6px)`, görsel `scale 1.1→1`, 0.7s `ease-out-soft`; perde yükselirken köşeler yuvarlak kalır. `animejs` + `io-hook`; azaltılmış harekette anında.
- **Genişleyen kart** (`I-M-05`, ActivityGrid): `flex-grow 1→2.6`, açıklama ve "Keşfet →" 0.15s gecikmeyle belirir, 0.5s `ease-out-soft`; giriş bitince ilk kart 0.2s sonra açılır, imleç çıkınca son açılan kart açık kalır. `css-transition`; mobilde scroll-snap şeritte ortadaki kart açık.
- **Dikey akordeon** (`I-M-06`, CollectionMosaic): imlecin geldiği karo sütun içinde uzar (326/510 → 600), aynı sütundaki komşu karo daralır (236); sütun yüksekliği sabit, alt kenarlar hizalı. Uzayan karoda açıklama ve buton 0.15s gecikmeyle belirir; 0.6s `ease-out-soft`, `css-transition` (sütun flex, `flex-grow 1 → 2.6`). Mobil: kapalı. Azaltılmış hareket: anında.

### 7.4 Referansta ölçülemeyenler

- Hiçbir süre, eğri ya da gecikme ölçülemedi; referans durağan bir sunum görseli.
- Header'ın kaydırma davranışı (sabit / gizlenen / opaklaşan) görünmüyor.
- Hover, açık menü, dolu sepet, arama ve hata durumları referansta yok.
- Mobil düzen referansta yok; §3'teki mobil satırları türetme.
- Ürün detay, kategori, sepet, hesap, blog ve mağazalar sayfaları referansta yok. Bu sayfalarda yapı ikas şablonlarından, görünüm bu token'lardan gelir.

---

## 8. Kapsama denetimi

- **Header** → `color-bg`, `color-text`, `color-inverse-bg`, `color-inverse-text`, `font-ui`, `font-mono`, `text-ui`, `text-label`, `text-badge`, `space-page`, `space-sm`, `size-header`, `size-logo`, M-06, M-28, geri sayım (yerel)
- **HeroSlider** → `color-scrim`, `color-inverse-text`, `color-bg`, `color-text`, `font-display`, `text-display`, `text-body`, `text-ui`, `space-page`, `space-md`, `size-hero`, M-01, M-02, M-03, M-07, M-27, M-11
- **ProductGrid** → `color-bg`, `color-text`, `color-muted`, `font-display`, `text-h2`, `text-body`, `space-page`, `space-grid`, `space-sm`, `space-md`, `space-section`, M-01, M-11
- **StoreSpotlight** → `color-bg`, `color-text`, `color-muted`, `font-display`, `text-h3`, `text-h4`, `text-display`, `text-body`, `space-panel`, `space-md`, `space-section`, M-01, M-11
- **CollectionMosaic** → `color-bg`, `color-scrim`, `color-inverse-text`, `font-display`, `text-h2`, `text-body`, `space-grid`, `space-section`, koleksiyon karosu hover (yerel), M-11
- **Newsletter** (kaldırıldı, 2026-10-08; bülten Footer'da) → `color-bg` (koyu), `color-text` (koyu), `color-muted` (koyu), `color-line`, `color-scrim`, `color-danger`, `color-success`, `text-h2`, `text-body`, `text-ui`, `space-md`, M-11
- **Footer** (+ görselli CTA bandı ve e-posta bildirim kartı: `color-scrim`, `color-transparent`, `color-surface`, `color-success`, `color-danger`, M-11, M-01) → `color-bg` (koyu), `color-text` (koyu), `color-muted` (koyu), `font-ui`, `text-ui-sm`, `text-body`, `size-logo`, `space-page`, `space-panel`, M-10, M-22, M-28
- **ProductList** (kategori, arama, favoriler) → `color-bg`, `color-text`, `color-muted`, `color-line`, `color-surface`, `text-h2`, `text-label`, `text-ui`, `space-grid`, `space-page`, `opacity-inactive`, M-18, M-20, M-28
- **CollectionHero** → `color-scrim`, `color-inverse-text`, `text-display`, `text-body`, `space-page`, M-01
- **ProductDetail** → `color-surface`, `color-text`, `color-muted`, `color-line`, `color-danger`, `color-success`, `text-h3`, `text-price`, `text-body`, `text-label`, `space-panel`, `space-grid`, `opacity-inactive`, M-13, M-19, M-22, M-28 · mağaza blokları (birlikte al, set, kademeli indirim, kişiselleştirme, haber ver, Hızlı Öde): `color-surface`, `color-line`, `color-inverse-bg`, `color-accent`, `color-accent-text`, `color-success`, `radius-card`, `radius-pill`, `text-h4`, `text-title`, `text-label`, `text-price`, M-28, M-11
- **ProductReviews** → `color-bg`, `color-line`, `color-text`, `color-muted`, `color-surface`, `font-display`, `font-mono`, `text-h2`, `text-display`, `text-body`, `text-label`, `space-section`, `space-panel`, `radius-card`, `radius-pill`, M-01, M-11
- **CartPage** → `color-surface`, `color-line`, `color-danger`, `color-success`, `text-h2`, `text-title`, `text-price`, `text-ui`, `space-panel`, `space-md`
- **Account** → `color-line`, `color-muted`, `color-danger`, `color-success`, `text-h2`, `text-h4`, `text-ui`, `text-body`, `space-panel`, M-28
- **AuthForms** → `color-line`, `color-danger`, `color-success`, `text-h2`, `text-body`, `text-ui`, `space-panel`, `space-md`
- **NotFound** → `text-display`, `text-body`, `space-section`, M-01
- **EmailVerification** → `color-danger`, `color-success`, `text-h2`, `text-body`, `space-section`
- **BlogList** / **BlogPost** / **BlogRelated** → `color-surface`, `color-muted`, `text-h2`, `text-h3`, `text-h4`, `text-label`, `text-body`, `space-grid`, `space-section`, M-10
- **StoreList** → `color-line`, `color-muted`, `text-h4`, `text-body`, `text-label`, `space-grid`, `space-panel`, M-10
- **ProductCard** (sub) → `color-surface`, `color-text`, `color-line`, `color-accent`, `color-inverse-bg`, `font-ui`, `font-price`, `text-title`, `text-price`, `text-badge`, `space-card`, `space-xs`, `size-line`, M-09, favori kalp pop (yerel)
- **Button** (sub) → `color-inverse-bg`, `color-inverse-text`, `color-bg`, `color-text`, `text-ui`, `opacity-inactive`, M-11
- **OfferCard** / **BundleItem** / **RatingStars** / **ReviewCard** (sub) → `color-bg`, `color-surface`, `color-line`, `color-text`, `color-muted`, `color-inverse-bg`, `color-inverse-text`, `color-accent`, `color-success`, `color-danger`, `radius-card`, `text-title`, `text-label`, `text-price`, `text-body`, M-28
- **FormField** (sub) → `color-line`, `color-text`, `color-muted`, `color-danger`, `size-line`, `text-ui`, `text-label`
- **Badge** (sub) → `color-surface`, `color-text`, `color-accent`, `color-accent-text`, `text-badge`
- **CartDrawer** / **SearchOverlay** / **MenuOverlay** / **FilterDrawer** (overlay) → `color-scrim`, `color-bg`, `color-line`, `color-transparent`, `space-panel`, `text-h4`, `text-ui`, M-20, M-21, M-06
- **QuickBuy** (overlay) → `color-scrim`, `color-bg`, `color-line`, `color-danger`, `color-accent`, `radius-card`, `radius-pill`, `space-panel`, `text-h3`, `text-h4`, `text-price`, `text-label`, `text-ui`, M-20, M-02, M-28, M-11, M-10
- **CookieBar** / **LocaleSwitcher** / **ImagePreview** (overlay) → `color-scrim`, `color-bg`, `color-line`, `color-surface`, `color-success`, `color-danger`, `color-inverse-bg`, `color-inverse-text`, `radius-card`, `radius-pill`, `space-page`, `text-h4`, `text-ui`, `text-ui-sm`, `text-label`, M-20, M-06, M-02
- **RichText** / **OrderTracking** → `color-bg`, `color-text`, `color-muted`, `color-line`, `color-surface`, `color-accent`, `text-h2`, `text-h4`, `text-body`, `text-label`, `space-section`, `space-page`, `radius-card`, M-01, M-11

Token denetimi:
- Çekirdek token'ların tamamı en az bir satırda kullanılıyor. `color-transparent` referansta gradyan olmadığı için yalnızca overlay listelerinin kaydırma maskesinde kullanılıyor.
- Ek değişken önerileri (çekirdek 41'in dışında, plan §3'te listelenecek): `size-hero`, `radius-card`, `radius-pill`.
