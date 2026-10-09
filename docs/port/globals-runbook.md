# Globals runbook — İsmail (I)

`port-manifest.json` → `globals` için tek seferlik kurulum. Sıra: oku → tablo → **kullanıcı onayı** → oluştur → yeniden listele. Bu runbook bir kez çalıştırılır; tekrar çalıştırmak token'ları çoğaltır.

## Ön koşullar

- `ikas theme dev` çalışıyor ve editör bağlı.
- Oturum `.mcp.json` dosyasını taşıyan tema klasöründen başlatıldı (yoksa ikas MCP araçları görünmez).
- Kod yazılmaz, bileşen düzenlenmez; yalnızca tema global'leri kurulur.

## 1. Oku

`list_theme_globals` çağrılır; mevcut her renk, tipografi, kırılım, keyframe, renk şeması ve global değişken not edilir. Aynı ad ve değerdeki token yeniden kullanılır (`var (aynı)`); aynı ad farklı değer `çakışma` olur ve açık soru olarak kullanıcıya sorulur, üzerine yazılmaz.

## 2. Token tablosu

Tür başına sayı: breakpoint 3 · colorScheme 3 · typography 11 · globalVariable 1 · keyframe 3 · toplam 21.

| Tür | Ad | Değer | pen.dev kaynağı | Durum |
|---|---|---|---|---|
| breakpoint | Kırılım / Laptop | 1199 px | globals.md §4 (`laptop`) | _doldurulacak_ |
| breakpoint | Kırılım / Tablet | 991 px | globals.md §4 (`tablet`) | _doldurulacak_ |
| breakpoint | Kırılım / Mobil | 767 px | globals.md §4 (`mobile`) | _doldurulacak_ |
| colorScheme | İsmail / Kâğıt | Background #F4F4F1, Text #141414, Muted #5C5C57, Line #8A8A84, Surface #E8E8E3, PrimaryButton/Background #141414, PrimaryButton/Text #F4F4F1, Accent #F2541A, AccentText #141414, Danger #B3261E, Success #1E7A45, Scrim #13151499 | mode `kagit`: `color-bg`, `color-text`, `color-muted`, `color-line`, `color-surface`, `color-inverse-bg`, `color-inverse-text`, `color-accent`, `color-accent-text`, `color-danger`, `color-success`, `color-scrim` | _doldurulacak_ |
| colorScheme | İsmail / Mürekkep | Background #131514, Text #F4F4F1, Muted #A6A69F, Line #6E6E68, Surface #1F2120, PrimaryButton/Background #F4F4F1, PrimaryButton/Text #141414, Accent #F2541A, AccentText #141414, Danger #FF8A7A, Success #6FD49A, Scrim #131514B3 | mode `murekkep`: `color-bg`, `color-text`, `color-muted`, `color-line`, `color-surface`, `color-inverse-bg`, `color-inverse-text`, `color-accent`, `color-accent-text`, `color-danger`, `color-success`, `color-scrim` | _doldurulacak_ |
| colorScheme | İsmail / Şeffaf | Background #13151400, Text #F4F4F1, Muted #A6A69F, Line #6E6E68, Surface #F4F4F11A, PrimaryButton/Background #F4F4F1, PrimaryButton/Text #141414, Accent #F2541A, AccentText #141414, Danger #FF8A7A, Success #6FD49A, Scrim #131514B3 | mode `seffaf`: `color-bg`, `color-text`, `color-muted`, `color-line`, `color-surface`, `color-inverse-bg`, `color-inverse-text`, `color-accent`, `color-accent-text`, `color-danger`, `color-success`, `color-scrim` | _doldurulacak_ |
| typography | Tipografi / Display | Mona Sans · 500 · 96px / 80px / 64px / 48px (≥1200 / laptop / tablet / mobil) · satır 1.0 · harf -0.02em | `text-display` + `font-display` · globals.md §2a | _doldurulacak_ |
| typography | Tipografi / Başlık H2 | Mona Sans · 500 · 44px / 40px / 36px / 30px (≥1200 / laptop / tablet / mobil) · satır 1.1 · harf -0.02em | `text-h2` + `font-display` · globals.md §2a | _doldurulacak_ |
| typography | Tipografi / Başlık H3 | Mona Sans · 500 · 32px / 30px / 28px / 24px (≥1200 / laptop / tablet / mobil) · satır 1.15 · harf -0.015em | `text-h3` + `font-display` · globals.md §2a | _doldurulacak_ |
| typography | Tipografi / Başlık H4 | Mona Sans · 600 · 20px / 20px / 18px / 18px (≥1200 / laptop / tablet / mobil) · satır 1.2 · harf -0.01em | `text-h4` + `font-display` · globals.md §2a | _doldurulacak_ |
| typography | Tipografi / Ürün Adı | Mona Sans · 500 · 14px / 14px / 13px / 13px (≥1200 / laptop / tablet / mobil) · satır 1.25 | `text-title` + `font-ui` · globals.md §2a | _doldurulacak_ |
| typography | Tipografi / Arayüz | Mona Sans · 500 · 14px / 14px / 14px / 14px (≥1200 / laptop / tablet / mobil) · satır 1.25 | `text-ui` + `font-ui` · globals.md §2a | _doldurulacak_ |
| typography | Tipografi / Arayüz Küçük | Mona Sans · 400 · 13px / 13px / 12px / 12px (≥1200 / laptop / tablet / mobil) · satır 1.4 | `text-ui-sm` + `font-ui` · globals.md §2a | _doldurulacak_ |
| typography | Tipografi / Rozet | Inter Tight · 500 · 11px / 11px / 10px / 10px (≥1200 / laptop / tablet / mobil) · satır 1.2 · harf 0.04em · uppercase | `text-badge` + `font-mono` · globals.md §2a | _doldurulacak_ |
| typography | Tipografi / Etiket | Inter Tight · 400 · 12px / 12px / 11px / 11px (≥1200 / laptop / tablet / mobil) · satır 1.2 · harf 0.04em · uppercase | `text-label` + `font-mono` · globals.md §2a | _doldurulacak_ |
| typography | Tipografi / Gövde | Mona Sans · 400 · 15px / 15px / 14px / 14px (≥1200 / laptop / tablet / mobil) · satır 1.5 | `text-body` + `font-body` · globals.md §2a | _doldurulacak_ |
| typography | Tipografi / Fiyat | Inter Tight · 500 · 14px / 14px / 13px / 13px (≥1200 / laptop / tablet / mobil) · satır 1.2 | `text-price` + `font-price` · globals.md §2a | _doldurulacak_ |
| globalVariable | Çizgi / Varsayılan | BORDER `{"width": {"value": 1, "unit": "px"}, "style": "solid", "color": "#8A8A84"}` | `size-line`, `color-line` | _doldurulacak_ |
| keyframe | Animasyon / Favori pop | { filled.scale: 0.6, filled.opacity: 0 } → { filled.scale: 1, filled.opacity: 1 } | I-M-03 (I-CMP-07) | _doldurulacak_ |
| keyframe | Animasyon / Yükleme fade-up | { y: 40, opacity: 0 } → { y: 0, opacity: 1 } | M-01 (I-CMP-12, I-HERO-03, I-GRID-01, I-ACT-01, I-SPOT-01, I-BEST-01, I-MOS-01, I-COLL-01, I-REV-01, I-CRTP-02, I-BLP-01, I-TXT-01) | _doldurulacak_ |
| keyframe | Animasyon / Yükleme fade | { opacity: 0 } → { opacity: 1 } | M-02 (I-PREV-01, I-HERO-01) | _doldurulacak_ |

`Durum` adım 1'den sonra doldurulur: `yeni`, `var (aynı)` ya da `çakışma`.

## 3. Onay

**KULLANICI ONAYI BEKLE.** Tür başına sayılar ve yukarıdaki tablo kullanıcıya gösterilir. Açık bir "evet" gelmeden hiçbir `create_theme_global` çağrısı yapılmaz. `çakışma` satırları için karar kullanıcınındır.

## 4. Oluştur

`create_theme_global` aşağıdaki sırayla, her satır bir çağrı. Görünen adlar Türkçe `Grup / Ad`.

```json
{"kind": "breakpoint", "name": "Kırılım / Laptop", "width": 1199}
{"kind": "breakpoint", "name": "Kırılım / Tablet", "width": 991}
{"kind": "breakpoint", "name": "Kırılım / Mobil", "width": 767}
{"kind": "colorScheme", "name": "İsmail / Kâğıt", "colors": [{"newSlotName": "Background", "value": "#F4F4F1"}, {"newSlotName": "Text", "value": "#141414"}, {"newSlotName": "Muted", "value": "#5C5C57"}, {"newSlotName": "Line", "value": "#8A8A84"}, {"newSlotName": "Surface", "value": "#E8E8E3"}, {"newSlotName": "PrimaryButton/Background", "value": "#141414"}, {"newSlotName": "PrimaryButton/Text", "value": "#F4F4F1"}, {"newSlotName": "Accent", "value": "#F2541A"}, {"newSlotName": "AccentText", "value": "#141414"}, {"newSlotName": "Danger", "value": "#B3261E"}, {"newSlotName": "Success", "value": "#1E7A45"}, {"newSlotName": "Scrim", "value": "#13151499"}]}
```

Ara adım: `list_theme_globals` → ilk şemanın slot id'leri okunur; ikinci şema aynı slotlara `slotId` ile bağlanır.

```json
{"kind": "colorScheme", "name": "İsmail / Mürekkep", "colors": [{"slotId": "<Background slotId>", "value": "#131514"}, {"slotId": "<Text slotId>", "value": "#F4F4F1"}, {"slotId": "<Muted slotId>", "value": "#A6A69F"}, {"slotId": "<Line slotId>", "value": "#6E6E68"}, {"slotId": "<Surface slotId>", "value": "#1F2120"}, {"slotId": "<PrimaryButton/Background slotId>", "value": "#F4F4F1"}, {"slotId": "<PrimaryButton/Text slotId>", "value": "#141414"}, {"slotId": "<Accent slotId>", "value": "#F2541A"}, {"slotId": "<AccentText slotId>", "value": "#141414"}, {"slotId": "<Danger slotId>", "value": "#FF8A7A"}, {"slotId": "<Success slotId>", "value": "#6FD49A"}, {"slotId": "<Scrim slotId>", "value": "#131514B3"}]}
{"kind": "colorScheme", "name": "İsmail / Şeffaf", "colors": [{"slotId": "<Background slotId>", "value": "#13151400"}, {"slotId": "<Text slotId>", "value": "#F4F4F1"}, {"slotId": "<Muted slotId>", "value": "#A6A69F"}, {"slotId": "<Line slotId>", "value": "#6E6E68"}, {"slotId": "<Surface slotId>", "value": "#F4F4F11A"}, {"slotId": "<PrimaryButton/Background slotId>", "value": "#F4F4F1"}, {"slotId": "<PrimaryButton/Text slotId>", "value": "#141414"}, {"slotId": "<Accent slotId>", "value": "#F2541A"}, {"slotId": "<AccentText slotId>", "value": "#141414"}, {"slotId": "<Danger slotId>", "value": "#FF8A7A"}, {"slotId": "<Success slotId>", "value": "#6FD49A"}, {"slotId": "<Scrim slotId>", "value": "#131514B3"}]}
{"kind": "typography", "name": "Tipografi / Display", "font_family": "Mona Sans", "font_size": "96px", "font_weight": "500", "line_height": "1.0", "letter_spacing": "-0.02em", "breakpoints": [{"breakpoint_id": "<Kırılım / Laptop id>", "font_size": "80px"}, {"breakpoint_id": "<Kırılım / Tablet id>", "font_size": "64px"}, {"breakpoint_id": "<Kırılım / Mobil id>", "font_size": "48px"}]}
{"kind": "typography", "name": "Tipografi / Başlık H2", "font_family": "Mona Sans", "font_size": "44px", "font_weight": "500", "line_height": "1.1", "letter_spacing": "-0.02em", "breakpoints": [{"breakpoint_id": "<Kırılım / Laptop id>", "font_size": "40px"}, {"breakpoint_id": "<Kırılım / Tablet id>", "font_size": "36px"}, {"breakpoint_id": "<Kırılım / Mobil id>", "font_size": "30px"}]}
{"kind": "typography", "name": "Tipografi / Başlık H3", "font_family": "Mona Sans", "font_size": "32px", "font_weight": "500", "line_height": "1.15", "letter_spacing": "-0.015em", "breakpoints": [{"breakpoint_id": "<Kırılım / Laptop id>", "font_size": "30px"}, {"breakpoint_id": "<Kırılım / Tablet id>", "font_size": "28px"}, {"breakpoint_id": "<Kırılım / Mobil id>", "font_size": "24px"}]}
{"kind": "typography", "name": "Tipografi / Başlık H4", "font_family": "Mona Sans", "font_size": "20px", "font_weight": "600", "line_height": "1.2", "letter_spacing": "-0.01em", "breakpoints": [{"breakpoint_id": "<Kırılım / Tablet id>", "font_size": "18px"}, {"breakpoint_id": "<Kırılım / Mobil id>", "font_size": "18px"}]}
{"kind": "typography", "name": "Tipografi / Ürün Adı", "font_family": "Mona Sans", "font_size": "14px", "font_weight": "500", "line_height": "1.25", "breakpoints": [{"breakpoint_id": "<Kırılım / Tablet id>", "font_size": "13px"}, {"breakpoint_id": "<Kırılım / Mobil id>", "font_size": "13px"}]}
{"kind": "typography", "name": "Tipografi / Arayüz", "font_family": "Mona Sans", "font_size": "14px", "font_weight": "500", "line_height": "1.25"}
{"kind": "typography", "name": "Tipografi / Arayüz Küçük", "font_family": "Mona Sans", "font_size": "13px", "font_weight": "400", "line_height": "1.4", "breakpoints": [{"breakpoint_id": "<Kırılım / Tablet id>", "font_size": "12px"}, {"breakpoint_id": "<Kırılım / Mobil id>", "font_size": "12px"}]}
{"kind": "typography", "name": "Tipografi / Rozet", "font_family": "Inter Tight", "font_size": "11px", "font_weight": "500", "line_height": "1.2", "letter_spacing": "0.04em", "text_transform": "uppercase", "breakpoints": [{"breakpoint_id": "<Kırılım / Tablet id>", "font_size": "10px"}, {"breakpoint_id": "<Kırılım / Mobil id>", "font_size": "10px"}]}
{"kind": "typography", "name": "Tipografi / Etiket", "font_family": "Inter Tight", "font_size": "12px", "font_weight": "400", "line_height": "1.2", "letter_spacing": "0.04em", "text_transform": "uppercase", "breakpoints": [{"breakpoint_id": "<Kırılım / Tablet id>", "font_size": "11px"}, {"breakpoint_id": "<Kırılım / Mobil id>", "font_size": "11px"}]}
{"kind": "typography", "name": "Tipografi / Gövde", "font_family": "Mona Sans", "font_size": "15px", "font_weight": "400", "line_height": "1.5", "breakpoints": [{"breakpoint_id": "<Kırılım / Tablet id>", "font_size": "14px"}, {"breakpoint_id": "<Kırılım / Mobil id>", "font_size": "14px"}]}
{"kind": "typography", "name": "Tipografi / Fiyat", "font_family": "Inter Tight", "font_size": "14px", "font_weight": "500", "line_height": "1.2", "breakpoints": [{"breakpoint_id": "<Kırılım / Tablet id>", "font_size": "13px"}, {"breakpoint_id": "<Kırılım / Mobil id>", "font_size": "13px"}]}
{"kind": "globalVariable", "display_name": "Çizgi / Varsayılan", "type": "BORDER", "value": {"width": {"value": 1, "unit": "px"}, "style": "solid", "color": "#8A8A84"}}
{"kind": "keyframe", "name": "Animasyon / Yükleme fade-up", "points": [{"point": "0%", "styles": [{"property": "transform", "value": "translateY(40px)"}, {"property": "opacity", "value": "0"}]}, {"point": "100%", "styles": [{"property": "transform", "value": "translateY(0px)"}, {"property": "opacity", "value": "1"}]}]}
{"kind": "keyframe", "name": "Animasyon / Yükleme fade", "points": [{"point": "0%", "styles": [{"property": "opacity", "value": "0"}]}, {"point": "100%", "styles": [{"property": "opacity", "value": "1"}]}]}
```

Toplam 20 çağrı.

- Kırılımlar ilk sırada: CSS `@media (max-width: bp(<id>))` bunlara dayanır (`var()` medya sorgusunda çalışmaz).
- `mode` ekseni → palet başına bir renk şeması. İkinci şemadaki `<Slot slotId>` yer tutucuları, ilk şemadan sonra yapılan `list_theme_globals` çıktısıyla değiştirilir.
- Tipografi kırılım boyutları (`globals.md` §2a) `breakpoints` dizisiyle aynı çağrıda yazılır; `<Kırılım / … id>` yer tutucuları kırılımlar oluşturulduktan sonra `list_theme_globals` çıktısıyla değiştirilir.
- Varsayılan şema: `İsmail / Kâğıt` → oluşturulduktan sonra `update_theme_color_scheme` `is_default: true`.
- Bölümlerin varsayılan şeması (`globals.md` §1a):
  - **Kâğıt:** Header, HeroSlider altındaki bütün gövde bölümleri, ProductGrid, ActivityGrid başlığı, StoreSpotlight, Bestsellers, ProductList, ProductDetail, ProductReviews, CartPage, Account, AuthForms, NotFound, EmailVerification, Blog*, StoreList, ContactForm, StoreLocator, FaqList, RichText, OrderTracking; overlay'lerden CartDrawer, SearchOverlay, QuickBuy, FilterDrawer, LocaleSwitcher.
  - **Mürekkep:** Footer (CTA bandı dahil), MenuOverlay mobil paneli, CookieBar.
  - **Şeffaf:** Header `— şeffaf` hali (hero üstü), HeroSlider içerik katmanı, CollectionHero, CollectionMosaic ve ActivityGrid karo içerikleri, ImagePreview.
- Noktaları otomatik çıkarılamayan keyframe'ler (alt öğe anahtarları ya da serbest metin); noktalar elle yazılır ya da animasyon bileşen CSS'inde kalır: Animasyon / Favori pop (`{ filled.scale: 0.6, filled.opacity: 0 }` → `{ filled.scale: 1, filled.opacity: 1 }`).

## 5. `src/global.css`

Boşluk, ölçü, opaklık ve alfa renkler için ikas'ta tür yok; bunlar `src/global.css` içine yazılır (MCP çağrısı yapılmaz).

```css
:root {
  --color-transparent: #F4F4F100;
  --space-page: 32px;
  --space-grid: 24px;
  --space-card: 12px;
  --space-panel: 32px;
  --space-xs: 6px;
  --space-sm: 12px;
  --space-md: 24px;
  --space-section: 120px;
  --size-header: 72px;
  --size-line: 1px;
  --opacity-inactive: 0.4;
  --size-logo: 22px;
  --size-hero: 760px;
  --radius-card: 6px;
  --radius-pill: 999px;
}
@media (max-width: bp(<mobile id>)) {
  :root {
    --space-page: 16px;
    --space-grid: 12px;
    --space-card: 10px;
    --space-panel: 20px;
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-section: 64px;
    --size-header: 56px;
    --size-logo: 20px;
    --size-hero: 600px;
  }
}
/* İsmail / Mürekkep şemasının className'i ile */
.<murekkep className> {
  --color-transparent: #13151400;
}
```

## 6. Doğrula

`list_theme_globals` yeniden çağrılır; tablodaki her satır tam bir kez bulunmalı. Ardından aşağıdaki canlı tablo doldurulur. Kod canlı id'leri yalnızca buradan okur, görünen adlardan değil; `cssVar` dizesi aynen kopyalanır (büyük/küçük harf id'den farklı olabilir).

## 7. Canlı token tablosu

### Renkler (kind: color)

| Token adı | ID | cssVar |
|---|---|---|
| — | — | — |

### Tipografi (kind: typography)

| Token adı | ID | className |
|---|---|---|
| Tipografi / Display | _doldurulacak_ | _doldurulacak_ |
| Tipografi / Başlık H2 | _doldurulacak_ | _doldurulacak_ |
| Tipografi / Başlık H3 | _doldurulacak_ | _doldurulacak_ |
| Tipografi / Başlık H4 | _doldurulacak_ | _doldurulacak_ |
| Tipografi / Ürün Adı | _doldurulacak_ | _doldurulacak_ |
| Tipografi / Arayüz | _doldurulacak_ | _doldurulacak_ |
| Tipografi / Arayüz Küçük | _doldurulacak_ | _doldurulacak_ |
| Tipografi / Rozet | _doldurulacak_ | _doldurulacak_ |
| Tipografi / Etiket | _doldurulacak_ | _doldurulacak_ |
| Tipografi / Gövde | _doldurulacak_ | _doldurulacak_ |
| Tipografi / Fiyat | _doldurulacak_ | _doldurulacak_ |

### Global değişkenler

| Token adı | variableName | Tip |
|---|---|---|
| Çizgi / Varsayılan | _doldurulacak_ | BORDER |

### Kırılımlar (kind: breakpoint)

| Token adı | ID | Genişlik | Kullanım |
|---|---|---|---|
| Kırılım / Laptop | _doldurulacak_ | 1199 | `@media (max-width: bp(<id>))` |
| Kırılım / Tablet | _doldurulacak_ | 991 | `@media (max-width: bp(<id>))` |
| Kırılım / Mobil | _doldurulacak_ | 767 | `@media (max-width: bp(<id>))` |

### Renk şemaları (kind: colorScheme)

| Palet | ID | className |
|---|---|---|
| İsmail / Kâğıt | _doldurulacak_ | _doldurulacak_ |
| İsmail / Mürekkep | _doldurulacak_ | _doldurulacak_ |
| İsmail / Şeffaf | _doldurulacak_ | _doldurulacak_ |

| Slot | slotId | cssVar |
|---|---|---|
| Background | _doldurulacak_ | _doldurulacak_ |
| Text | _doldurulacak_ | _doldurulacak_ |
| Muted | _doldurulacak_ | _doldurulacak_ |
| Line | _doldurulacak_ | _doldurulacak_ |
| Surface | _doldurulacak_ | _doldurulacak_ |
| PrimaryButton/Background | _doldurulacak_ | _doldurulacak_ |
| PrimaryButton/Text | _doldurulacak_ | _doldurulacak_ |
| Accent | _doldurulacak_ | _doldurulacak_ |
| AccentText | _doldurulacak_ | _doldurulacak_ |
| Danger | _doldurulacak_ | _doldurulacak_ |
| Success | _doldurulacak_ | _doldurulacak_ |
| Scrim | _doldurulacak_ | _doldurulacak_ |

### Keyframe'ler (kind: keyframe)

| Token adı | ID | ref (animation-name) |
|---|---|---|
| Animasyon / Favori pop | _doldurulacak_ | _doldurulacak_ |
| Animasyon / Yükleme fade-up | _doldurulacak_ | _doldurulacak_ |
| Animasyon / Yükleme fade | _doldurulacak_ | _doldurulacak_ |
