# Plan I — Rakım: saha defteri kadar net bir outdoor mağazası
<!-- ikas-pendev contract:2 -->

Tema: **İsmail** (outdoor ekipman ve kentsel giyim) · Hedef: pen.dev canvas → ikas Code Components · Dil: tr-TR · Para birimi: TRY

Referansın iskeleti korunur: duyuru bandı, hero üstünde şeffaf header, 4×2 ürün ızgarası, mağaza tanıtım bloğu, kısa/uzun dönüşümlü koleksiyon mozaiği, koyu footer; bülten aboneliği footer'ın görselli CTA bandına taşındı. Yeniden tasarlananlar: palet (kar beyazı zemin + tek kurtarma turuncusu), tipografi (grotesk + sıkı Inter Tight etiket katmanı), köşe dili (6'lık tek yarıçap), görsel dili, tüm metinler ve imza hareketi.

## 0. Bu dosya nasıl kullanılır

Bu dosya pen.dev'de tasarım üretecek ajana (ya da tasarımcıya) verilen **tek başına yeterli** brifdir. Ölçülerin kaynağı ve motion tariflerinin ayrıntısı için `docs/referans/globals.md`, prop listeleri için `docs/referans/components.md`.

**Sıra:** 3 → 6.0 → 6.1 → 6.2 → 6.3 → 6.4 → 6.5. Her adımın sonunda o adımın kontrol listesi ve ekran görüntüsü.

**Nereye çizilir:** tercihen bu varyant için yeni bir .pen dosyası (`/Users/yigitozen/Documents/ismail.pen`). Aynı dosyada çalışılacaksa tüm kök frame adları `I/` ile başlar ve `FindEmptySpace` ile boş alana yerleştirilir. Referans görseli canvas'a alınmaz; yalnızca `docs/referans/girdi/` altında bakmak için durur.

**Ajan için hazır komutlar** (sırayla, her biri ayrı tur):
1. `docs/pendev/plan-I-ismail.md dosyasını oku. 3. bölümdeki değişkenleri tanımla ve 6.0'daki Design System frame'lerini üret.`
2. `Aynı planın 6.1 bölümündeki bileşenleri, durumlarıyla birlikte üret.`
3. `6.2'den <bölüm adı> bölümünü desktop ve mobil olarak üret; katman adları ve metadata plandaki gibi olsun.` (bölüm bölüm tekrarla)
4. `6.3'teki sayfaları section instance'larından kur.`
5. `6.4 overlay'lerini ve 6.5 Motion States karelerini üret.`
6. `9. bölümdeki bitiş kontrolünü çalıştır ve eksikleri raporla.`

## 1. Yön ve kimlik

**Konsept: "RAKIM".** İsmail bir saha defteri gibi konuşur: kısa, ölçülü, işe yarar. Kar beyazı zemin ve grafit metin üstüne tek bir kurtarma turuncusu; başlıklar sakin bir groteskle, teknik veriler (rakım, kod, saat, fiyat) sıkı bir Inter Tight etiket katmanıyla, büyük harf ve açık aralıkla yazılır. Fotoğraf sahneyi taşır; arayüz geri çekilir.

**İmza (tek cesaret noktası): Altimetre sayacı (`I-M-01`).** Rakamlar bir altimetre gibi hane hane yuvarlanarak yerine oturur: duyuru bandındaki geri sayım, mağaza bloğundaki dev teklif rakamı (`%30`), sepet sayacı, 404 kodu ve hero slayt sayacı. Başka hiçbir yerde gösterişli hareket yok; diğer her şey sade fade, renk ve dolgu geçişi.

**Referanstan farklar:**
- **Palet:** saf beyaz yerine soğuk kar beyazı `#F4F4F1`; tek vurgu kurtarma turuncusu `#F2541A` (rozet, favori, geri sayım çipi, odak halkası). Referanstaki kırmızı kalp ve saf siyah-beyaz monokrom bırakılır.
- **Ters palet (`mode: dark`):** Footer (görselli CTA bandı + e-posta bildirim kartı) ve MenuOverlay (mobil); hero görsel üstü metni de koyu modun metin token'ıyla çizilir.
- **Tipografi:** başlık ve arayüz `Mona Sans` (500, dar harf aralığı); etiket, kod, fiyat ve sayaçlar `Inter Tight` (sıkı grotesk, `tabular-nums`; 2026-10-08 kullanıcı kararıyla JetBrains Mono yerine). İkinci ses mono değil: teknik ton büyük harf, açık harf aralığı ve koordinat/meta satırlarıyla taşınır. Etiketler ve rozetler BÜYÜK HARF, başlıklar cümle düzeninde.
- **Köşe dili:** referansın 12'lik kart + hap buton ikilisi yerine tek yarıçap 6 (kart, buton, alan, karo); hap biçim yalnızca çip, rozet ve geri sayımda.
- **Başlık üstü etiket yok:** bölüm başlıkları doğrudan başlıkla açılır; üstte indeks, kategori ya da `01 / …` biçiminde küçük etiket kullanılmaz (kullanıcı kararı, 2026-10-08).
- **Hero:** başlık ortadan sol alta iner, sağ altta koordinat/rakam satırı ve slayt sayacı; CTA başlığın hemen altında. Görsel üstünde düz karartma, gradyan yok.
- **Görsel dili:** soğuk gün ışığında, hafif grenli, doğal renkli saha fotoğrafları (kar, kaya, orman, şehir kenarı). Ürünler `color-surface` zeminde dekupe. Koleksiyon karoları siyah-beyaz, hover'da renge döner. Hepsi `Generate("ai" | "stock")` ile özgün üretilir; logo `Generate("svg")` ile İsmail wordmark.
- Metinler Türkçe; etiketler büyük harf (`İ Ş Ğ Ü Ö Ç` kontrolü).

**Örnek içerik:** duyuru `KIŞ 26 SAHA SERİSİ · KARGO BİZDEN` + geri sayım `02:14:36` · hero `Rotanı kendin çiz.` / mono `41°N 29°E · 2.140 M` · buton `Koleksiyonu keşfet` · ürünler `Buzul Şişme Yelek — 3.250 TL`, `Yamaç Ripstop Rüzgârlık — 2.890 TL`, `Patika Karabina Seti — 340 TL`, `Kamp Çelik Termos 500 ml — 890 TL`, `Moren Katlanır Sandalye — 1.950 TL`, `Çığ Kamp Terliği — 1.150 TL`, `Kuzey Panel Şapka — 690 TL`, `Sırt Polar Ceket — 2.450 TL` · rozet `SINIRLI`, `YENİ`, `%20` · mağaza bloğu `Kadıköy mağazası açıldı` + `%30`.

## 2. Canvas organizasyonu

Her şey **ayrı kök frame**. Kök frame adları sabit kalıpta; ikas'a aktarımda bu adlardan bileşen listesi çıkarılır.

| Sıra (yukarıdan aşağı) | Kök frame adı | İçerik | Boyut |
|---|---|---|---|
| 00 | `I/DS/Colors`, `I/DS/Typography`, `I/DS/Spacing`, `I/DS/Icons`, `I/DS/Motion`, `I/DS/Imagery` | Design system sayfaları | serbest |
| 01 | `I/Sub/<Ad>` (reusable) ve `I/Sub/<Ad> — <durum>` | Bileşenler ve durumları | içeriğe göre |
| 02 | `I/Section/<Ad>@desktop` ve `I/Section/<Ad>@mobile` (ikisi de reusable) | Bölümler | 1440 / 390 genişlik |
| 03 | `I/Page/<Ad>@desktop` ve `I/Page/<Ad>@mobile` | Sayfalar (section instance'ları) | 1440 / 390 |
| 04 | `I/Overlay/<Ad>@desktop — <durum>` ve `…@mobile — <durum>` | Menü, sepet, arama, paneller | 1440×900 / 390×844 |
| 05 | `I/Motion/<tarif> <bölüm>` | Animasyon kareleri (başlangıç / ara / bitiş) | içeriğe göre |

Yerleşim: her sıra bir yatay bant; bantlar arası 800, frame'ler arası 200 boşluk. Bir bölümün desktop ve mobil frame'i **yan yana**. Kök seviyede metin, ikon ya da serbest şekil bırakılmaz; açıklamalar `note` node'u olarak ilgili frame'in yanına konur.

Kurallar:
- Desktop kök frame'lerinde `theme: {device: "desktop"}`, mobil olanlarda `theme: {device: "mobile"}`; koyu bölümlerde ayrıca `mode: "dark"` (varsayılan `mode: "light"`). Boyut değişkenleri buna göre kendiliğinden değişir; mobil frame'de ayrıca sayı yazılmaz.
- Bölüm frame'leri `layout: "vertical"` ya da `"horizontal"`, `clip: true`. `layout: "none"` sadece gerçekten üst üste binen katmanlarda (slaytlar, görsel + gradyan + metin, hotspot).
- Tekrarlanan her şey `reusable` bileşenin `ref` instance'ıdır (ProductCard, Button, ArrowLink…). Sayfalar yalnızca section `ref`'lerinden oluşur.
- Çalışılan kök frame `placeholder: true`; bitince kaldırılır.
- Değer yazarken sayı yerine değişken: renk, font, yazı boyutu, boşluk hep `$…`.
- Görsel ve logo `Generate("ai" | "stock" | "svg")` ile üretilir; referansın görsel adresleri hiçbir `fill`'de kullanılmaz.
- Kök frame `metadata`'sı **oluşturulurken** yazılır (sonradan eklenen metadata kaybolabilir); ayrıntı 4. bölümde.

## 3. Değişkenler

İlk iş olarak tanımlanır. Değerler İsmail'in kimliğidir; token adları sabittir. Renkler `mode: light | dark` eksenli (ters bölümler: Footer, mobil MenuOverlay). Boyutlar `device: desktop | mobile` eksenli. Çekirdek 41'den sonra üç ek değişken: `size-hero`, `radius-card`, `radius-pill`.

```js
SetVariables({
  "color-bg": {type:"color", value:[{value:"#F4F4F1", theme:{mode:"light"}}, {value:"#131514", theme:{mode:"dark"}}]},
  "color-text": {type:"color", value:[{value:"#141414", theme:{mode:"light"}}, {value:"#F4F4F1", theme:{mode:"dark"}}]},
  "color-muted": {type:"color", value:[{value:"#5C5C57", theme:{mode:"light"}}, {value:"#A6A69F", theme:{mode:"dark"}}]},
  "color-line": {type:"color", value:[{value:"#8A8A84", theme:{mode:"light"}}, {value:"#6E6E68", theme:{mode:"dark"}}]},
  "color-surface": {type:"color", value:[{value:"#E8E8E3", theme:{mode:"light"}}, {value:"#1F2120", theme:{mode:"dark"}}]},
  "color-inverse-bg": {type:"color", value:[{value:"#141414", theme:{mode:"light"}}, {value:"#F4F4F1", theme:{mode:"dark"}}]},
  "color-inverse-text": {type:"color", value:[{value:"#F4F4F1", theme:{mode:"light"}}, {value:"#141414", theme:{mode:"dark"}}]},
  "color-accent": {type:"color", value:[{value:"#F2541A", theme:{mode:"light"}}, {value:"#F2541A", theme:{mode:"dark"}}]},
  "color-accent-text": {type:"color", value:[{value:"#141414", theme:{mode:"light"}}, {value:"#141414", theme:{mode:"dark"}}]},
  "color-scrim": {type:"color", value:[{value:"#13151499", theme:{mode:"light"}}, {value:"#131514B3", theme:{mode:"dark"}}]},
  "color-transparent": {type:"color", value:[{value:"#F4F4F100", theme:{mode:"light"}}, {value:"#13151400", theme:{mode:"dark"}}]},
  "color-danger": {type:"color", value:[{value:"#B3261E", theme:{mode:"light"}}, {value:"#FF8A7A", theme:{mode:"dark"}}]},
  "color-success": {type:"color", value:[{value:"#1E7A45", theme:{mode:"light"}}, {value:"#6FD49A", theme:{mode:"dark"}}]},
  "font-display": {type:"string", value:"Mona Sans"},
  "font-ui": {type:"string", value:"Mona Sans"},
  "font-body": {type:"string", value:"Mona Sans"},
  "font-price": {type:"string", value:"Inter Tight"},
  "font-mono": {type:"string", value:"Inter Tight"},
  "text-display": {type:"number", value:[{value:96, theme:{device:"desktop"}}, {value:48, theme:{device:"mobile"}}]},
  "text-h2": {type:"number", value:[{value:44, theme:{device:"desktop"}}, {value:30, theme:{device:"mobile"}}]},
  "text-h3": {type:"number", value:[{value:32, theme:{device:"desktop"}}, {value:24, theme:{device:"mobile"}}]},
  "text-h4": {type:"number", value:[{value:20, theme:{device:"desktop"}}, {value:18, theme:{device:"mobile"}}]},
  "text-title": {type:"number", value:[{value:14, theme:{device:"desktop"}}, {value:13, theme:{device:"mobile"}}]},
  "text-ui": {type:"number", value:[{value:14, theme:{device:"desktop"}}, {value:14, theme:{device:"mobile"}}]},
  "text-ui-sm": {type:"number", value:[{value:13, theme:{device:"desktop"}}, {value:12, theme:{device:"mobile"}}]},
  "text-badge": {type:"number", value:[{value:11, theme:{device:"desktop"}}, {value:10, theme:{device:"mobile"}}]},
  "text-label": {type:"number", value:[{value:12, theme:{device:"desktop"}}, {value:11, theme:{device:"mobile"}}]},
  "text-body": {type:"number", value:[{value:15, theme:{device:"desktop"}}, {value:14, theme:{device:"mobile"}}]},
  "text-price": {type:"number", value:[{value:14, theme:{device:"desktop"}}, {value:13, theme:{device:"mobile"}}]},
  "space-page": {type:"number", value:[{value:32, theme:{device:"desktop"}}, {value:16, theme:{device:"mobile"}}]},
  "space-grid": {type:"number", value:[{value:24, theme:{device:"desktop"}}, {value:12, theme:{device:"mobile"}}]},
  "space-card": {type:"number", value:[{value:12, theme:{device:"desktop"}}, {value:10, theme:{device:"mobile"}}]},
  "space-panel": {type:"number", value:[{value:32, theme:{device:"desktop"}}, {value:20, theme:{device:"mobile"}}]},
  "space-xs": {type:"number", value:[{value:6, theme:{device:"desktop"}}, {value:4, theme:{device:"mobile"}}]},
  "space-sm": {type:"number", value:[{value:12, theme:{device:"desktop"}}, {value:8, theme:{device:"mobile"}}]},
  "space-md": {type:"number", value:[{value:24, theme:{device:"desktop"}}, {value:16, theme:{device:"mobile"}}]},
  "space-section": {type:"number", value:[{value:120, theme:{device:"desktop"}}, {value:64, theme:{device:"mobile"}}]},
  "size-header": {type:"number", value:[{value:72, theme:{device:"desktop"}}, {value:56, theme:{device:"mobile"}}]},
  "size-line": {type:"number", value:1},
  "opacity-inactive": {type:"number", value:0.4},
  "size-logo": {type:"number", value:[{value:22, theme:{device:"desktop"}}, {value:20, theme:{device:"mobile"}}]},
  "size-hero": {type:"number", value:[{value:760, theme:{device:"desktop"}}, {value:600, theme:{device:"mobile"}}]},
  "radius-card": {type:"number", value:6},
  "radius-pill": {type:"number", value:999},
})
```

Çekirdek set **41 değişken**dir ve adları değişmez (aktarım bu adlara güvenir). Sözleşme 2 ekleri: `color-transparent` (gradyan başlangıcı, `#RRGGBB00`), `size-logo` (logo yüksekliği, `device` ekseni), `color-danger` ve `color-success` (form ve stok durumları). Eksenler: `device: desktop | mobile`, `mode: light | dark`.

Font doğrulama: `execute` yanıtında "Font family … is invalid" uyarısı çıkarsa o değişkeni değiştir. Canvas üzerinde denenip geçerli çıkan aileler: `Anton`, `Antonio`, `Archivo Narrow`, `Barlow`, `Barlow Condensed`, `Bebas Neue`, `Inter Tight`, `JetBrains Mono`, `Mona Sans`, `Oswald`, `Sofia Sans Extra Condensed`, `Space Mono`. Geçersiz çıkanlar: `Mona Sans Condensed`, `Big Shoulders Display`. ikas yalnızca Google Fonts (latin-ext) yükler; seçilen her aile orada da bulunmalı.

Yazı stili eşlemesi: `text-display`, `text-h2`, `text-h3`, `text-h4` → `$font-display` (Mona Sans) 500, satır 1.0–1.1, harf aralığı −0.02em, cümle düzeni · `text-title`, `text-ui`, `text-ui-sm` → `$font-ui` (Mona Sans) 500 (`text-ui-sm` 400), satır 1.25, cümle düzeni · `text-badge`, `text-label` → `$font-mono` (Inter Tight) 500 / 400, satır 1.2, harf aralığı +0.04em, BÜYÜK HARF; rakamlar `tabular-nums` · `text-body` → `$font-body` (Mona Sans) 400, satır 1.5 · `text-price` → `$font-price` (Inter Tight) 500, satır 1.2, `tabular-nums` (`1.850 TL`). `font-mono` rolü artık Inter Tight (orantılı); sayaç, fiyat ve geri sayımda kodda `font-variant-numeric: tabular-nums` zorunlu, yoksa altimetre sayacında hane genişliği oynar. Büyük harf yalnızca etiket ve rozetlerde; metnin kendisinde büyük yazılır (`lang="tr"`), `text-transform` kullanılmaz.

## 4. Adlandırma ve metadata sözleşmesi

Amaç: tasarımdan koda çeviri mekanik olsun.

| pen.dev | ikas / kod |
|---|---|
| Kök frame `I/Section/HeroSlider@desktop` | section bileşeni **HeroSlider** (`src/components/HeroSlider/`) |
| Kök frame `I/Sub/ProductCard` | sub-component **ProductCard** (`src/sub-components/ProductCard/`) |
| Kök frame `I/Overlay/CartDrawer…` | ilgili section'ın alt bileşeni |
| Katman adı `hero-title` (kebab-case) | CSS sınıfı `.hero-title` |
| `ref` instance adı = bileşen adı (`ProductCard`) | JSX `<ProductCard />` |
| Metin katmanı + `metadata.prop` | TEXT prop (JSX'te sabit metin olmaz) |
| Görsel dolgulu frame + `metadata.prop` | IMAGE / PRODUCT / CATEGORY prop |
| Tekrarlanan çocuk grubu + `metadata.prop` | COMPONENT_LIST ya da *_LIST prop |
| Metin katmanı + `metadata.textClass: "data"` + `source` | mağaza verisi (ör. `product.name`); prop değil, JSX'te veri bağlamasıdır |
| Metin katmanı + `metadata.textClass: "code"` | kodda üretilen metin (sayaç, biçimli tutar, durum etiketi) |
| Section kök frame'i + `prop: "backgroundColor"` | her section'da zorunlu `backgroundColor` COLOR prop'u |
| `metadata.anim` | 7. bölümdeki animasyon hedefi |

Katman ağaçlarındaki `{ad:TİP}` notasyonu o katmanın `metadata.prop` ve `metadata.propType` değeridir. `{data:kaynak}` metnin mağaza verisinden geldiğini (`textClass: "data"`, `source: "kaynak"`), `{code:ad}` metnin kodda üretildiğini (`textClass: "code"`) gösterir. Ağaçta tırnak içinde yazılan her örnek metin bu üç işaretten birini taşır; işaretsiz sabit metin yoktur.

**Metadata (düz anahtarlar; iç içe nesne kullanma):**

```js
// kök frame
metadata: {type:"ismail", role:"section", ikas:"HeroSlider", device:"desktop", variant:"I", contract:2, prop:"backgroundColor", propType:"COLOR"}
// role: "ds" | "sub" | "section" | "overlay" | "page" | "motion"

// prop'a bağlı katman
metadata: {type:"ismail", role:"prop", prop:"title", propType:"TEXT", textClass:"prop"}

// mağaza verisi gösteren metin (prop değil)
metadata: {type:"ismail", textClass:"data", source:"product.name"}

// kodda üretilen metin
metadata: {type:"ismail", textClass:"code"}

// animasyonlu katman (prop'a da bağlıysa aynı nesnede)
metadata: {type:"ismail", role:"anim", anim:"I-HERO-02", recipe:"M-07", trigger:"state-change", prop:"title", propType:"TEXT", textClass:"prop"}
context: "I-HERO-02 · M-07 · başlık slaytla birlikte değişir"
```

- Bir katmanda birden çok hedef varsa `anim` virgülle ayrılır: `"I-HERO-01,I-HERO-07"`.
- `context` hem insan için kısa açıklamadır hem de katmandaki **tüm** anim id'lerini içermek zorundadır. pen.dev instance ve override'larda `metadata` saklamaz; makine `metadata.anim` ∪ `context` okur.
- Metadata yalnızca node **oluşturulurken** güvenle yazılır. Sonradan değişecekse yeni node eklenir, eskisi silinir.
- Her metin node'unda `textClass` zorunludur: `"prop"` → `prop` + `propType`; `"data"` → `source`; `"code"` → ek alan yok.
- Section kök frame'leri `prop: "backgroundColor"`, `propType: "COLOR"` taşır; kök `contract: 2` yazar.

## 5. Animasyona hazır tasarım kuralları

pen.dev hareket göstermez. Aşağıdaki yapılar çizilmezse aktarımda katmanları yeniden kurmak gerekir.

1. **Bitiş hali çizilir.** Bölüm ve sayfa frame'leri animasyon bittikten sonraki görünümü gösterir. Başlangıç ve ara haller sadece `I/Motion/…` frame'lerinde.
2. **Maske = `clip: true` frame.** Kayarak giren her metin satırı kendi `…-mask` frame'inin içindedir; maske metinle aynı boyutta. Çok satırlı başlıkta her satır ayrı metin node'u ve ayrı maske.
3. **Roll eden öğeler çift kopyadır.** Buton, nav linki ve ok ikonunda `top` (görünen) ve `bottom` (maske dışında bekleyen) kopyaları birlikte çizilir; kap `clip: true`.
4. **Sonsuz kayanlar track + kopya.** `marquee` / `ticker` kabı `clip: true`; içindeki `…-track` içerik setini en az iki kez barındırır ve kabın dışına taşar.
5. **Yer değiştirenler kardeş frame.** Slaytlar, sekme içerikleri, ön/arka ürün görseli aynı ebeveynde üst üste (`layout: "none"`); görünmeyenler `opacity: 0` ile durur, silinmez.
6. **İlerleme göstergesi ayrı katman.** `progress-bar` dolgusu ebeveyninden ayrı bir dikdörtgen; yarı dolu çizilir.
7. **Sticky alanlar gerçek yükseklikte.** Sabit kalan öğenin kabı, kaydırma boyunca kat edeceği yükseklikte çizilir (ör. 4 görsellik galeri yanında tek detay sütunu).
8. **Overlay ayrı frame.** Menü, çekmece, arama: `scrim` + panel, sayfa frame'inin kopyası üzerinde değil, kendi kök frame'inde; açık ve boş/dolu halleri ayrı.
9. **Kaydırmaya bağlı öğeler serbest katman.** Dönen/kayan görsel ya da parallax arka plan, akıştan bağımsız (`layoutPosition: "absolute"`) ve kabından büyük çizilir.
10. **Hover hali ayrı frame.** Her etkileşimli bileşenin hover hali `I/Sub/<Ad> — hover` olarak çizilir; bölüm içinde tekrar çizilmez.
11. **Her hedef işaretli.** 6. bölümde `anim-targets` bloğunda geçen her `layer`, tasarımda aynı adla bulunur ve `metadata.anim` taşır; id'ler `context` alanında da yazılıdır.
12. **Mobil hali kararlaştırılmış.** Hedefin `mobile` alanı "kapalı" ya da farklıysa mobil frame o hale göre çizilir (ör. sticky yok → normal akış).

### 5.1 Bu plana özgü motion tarifleri

`globals.md` kataloğuna ek olarak (M-xx tarifleri orada):

| ID | Ad | Hareket | Zorunlu katman yapısı | Uygulama | Mobil | Azaltılmış hareket |
|---|---|---|---|---|---|---|
| **I-M-01** | Altimetre sayacı | Rakamlar hane hane dikey yuvarlanarak yeni değere oturur; sağdaki hane önce, soldakiler 0.04s gecikmeyle. Markanın imza hareketi. `{ reel.y: önceki rakam } → { reel.y: yeni rakam }`, `{ duration: 0.6, ease: ease-out-soft, stagger: 0.04, direction: sağdan-sola }` | `counter` içinde her hane kendi `digit-mask` (clip) frame'inde; içinde `digit-reel` (o anki rakam görünür, üst/alt komşular maskenin dışında); ayraçlar (`:`, `%`, `.`) ayrı metin node'u; tabular mono font | animejs + io-hook | aynı | anında son değer |
| **I-M-02** | Karo renk + yakınlaşma | Koleksiyon karosunda görsel hafif büyür ve siyah-beyazdan renge döner. `{ image.scale: 1, mono.opacity: 1 } → { image.scale: 1.05, mono.opacity: 0 }`, `{ duration: 0.8, ease: ease-out-soft }` | `tile-media` (clip) içinde `tile-image` (renkli) + `tile-image-mono` (siyah-beyaz kopya, üstte) | css-transition | kapalı (renkli değil, siyah-beyaz kalır) | yalnızca renk, büyüme yok |
| **I-M-03** | Favori pop | Kalp dolarken bir kez büyüyüp oturur, renk turuncuya döner. `{ filled.scale: 0.6, filled.opacity: 0 } → { filled.scale: 1, filled.opacity: 1 }`, `{ spring: spring-soft, overshoot: 1.25 }` | `fav-button` içinde `fav-icon-outline` + `fav-icon-filled` üst üste | css-keyframes | aynı | anında renk değişimi |
| **I-M-04** | Perde girişi | Kartlar soldan sağa sırayla alttan açılan perdeyle girer; perde yükselirken dört köşe de radius-card yuvarlak kalır, kesik kenar yok. `{ clipPath: inset(100% 0 0 0 round 6px), image.scale: 1.1 } → { clipPath: inset(0 0 0 0 round 6px), image.scale: 1 }`, `{ duration: 0.7, ease: ease-out-soft, stagger: 0.08, threshold: 0.4, once: true }` | `activity-row` içinde her kart kendi `activity-card` (clip, radius-card) frame'inde; görsel, karartma ve metin kartın içinde, perde kartın kendisine uygulanır | animejs + io-hook | aynı (yalnız ekranda görünen kartlar) | anında görünür |
| **I-M-05** | Genişleyen kart | Üzerine gelinen kart genişler, diğerleri daralır; açılan kartta açıklama ve 'Keşfet →' belirir. Giriş bitince ilk kart kendiliğinden açılır; imleç bölümden çıkınca son açılan kart açık kalır. `{ card.flexGrow: 1, text.opacity: 0 } → { card.flexGrow: 2.6, text.opacity: 1 }`, `{ duration: 0.5, ease: ease-out-soft, text.delay: 0.15, autoOpen.delay: 0.2 }` | `activity-row` yatay flex; her `activity-card` flex-grow ile boyutlanır; `activity-text` ve `activity-link` yalnız açık kartta görünür (kapalıda opacity 0) | css-transition | scroll-snap şerit; ortaya oturan kart açık (240), diğerleri 88 | anında genişlik değişimi |
| **I-M-06** | Dikey akordeon | İmlecin geldiği koleksiyon karosu sütun içinde uzar, aynı sütundaki komşu karo daralır; sütun yüksekliği sabit, alt kenarlar hizalı kalır. Uzayan karoda açıklama ve buton belirir, daralan karoda yalnız başlık kalır. İmleç bölümden çıkınca kısa/uzun düzen geri gelir. `{ tile.flexGrow: 1, sibling.flexGrow: 1, text.opacity: 0 } → { tile.flexGrow: 2.6, sibling.flexGrow: 1, text.opacity: 1 }`, `{ duration: 0.6, ease: ease-out-soft, text.delay: 0.15 }` | `mosaic-column` dikey flex; her `collection-tile` flex-grow ile boyutlanır (kısa 326 / uzun 510 → uzayan 600 / daralan 236); `tile-text` ve `tile-actions` yalnız uzayan karoda görünür | css-transition | kapalı (mozaik sabit) | anında yükseklik değişimi |

## 6. Yapım sırası

### 6.0 Design System frame'leri

| Kök frame | İçerik |
|---|---|
| `I/DS/Colors` | Her renk değişkeni için örnek kare + ad + hex; metin/zemin kontrast çiftleri (metin, muted, vurgu üzerinde metin) |
| `I/DS/Typography` | 11 yazı stili, her biri desktop ve mobil boyutunda örnek satırla (Türkçe karakterli: "ZİRVEDE ŞIK ÇÖZÜM · Ğ Ü Ö Ç ı · 1.850 TL") |
| `I/DS/Spacing` | Boşluk ölçeği çubukları; 1440 ve 390 için ızgara şeması (kenar boşluğu, sütunlar, aralık); çizgi kalınlığı |
| `I/DS/Icons` | Kullanılan tüm ikonlar 20×20 (arama, hesap, sepet (çanta), kalp (boş / dolu), menü, kapat, filtre, ok →, caret, artı, eksi, onay, konum, saat; sosyal: instagram, youtube, x, strava) + logo ve işaret |
| `I/DS/Motion` | Kullanılan tarif ID'leri, kısa açıklama ve tetikleyici simgeleri; `note` node'ları ile. Bu frame animasyon "lejantı"dır |
| `I/DS/Imagery` | Hero: soğuk gün ışığında karlı yamaç / kaya sırtı, insan küçük ve hareket halinde, 16:9 ve mobil 4:5 · Ürün: `color-surface` zeminde dekupe, düz ışık, 4:5 · Koleksiyon karosu: siyah-beyaz yakın plan (ayakkabı, ceket, aksesuar), 1:1 ve 3:4 · Mağaza: cam cepheli şehir mağazası, sıcak iç ışık, 16:9 · Footer CTA bandı: dağ kasabası mağazası, sıcak iç ışık, karartma + zemine akan bulanık geçiş · Blog: saha günlüğü, 4:3 · Logo: `İSMAİL` wordmark (geometrik grotesk, kuyruklu İ noktası küçük bir zirve işareti) + tek harf işaret. |

### 6.1 Bileşenler (`I/Sub/…`)

Her bileşen `reusable` kök frame; durumlar yanında ayrı frame. Önce bunlar, çünkü bölümler bunların instance'larını kullanır.

| Bileşen | Yapı | Durumlar (ayrı frame) |
|---|---|---|
| `ProductCard` | `card-media` (clip, 4:5, `color-surface`, radius-card): `image-front` + `image-back` · sol üstte `card-badges` (Badge) · sağ üstte `fav-button` (FavoriteButton) · `card-info` satırı: solda `card-title` (text-title) + `card-price` (text-price, mono) + `card-price-compare` (muted, üstü çizili), sağda `card-cart` (32'lik 1px halka + çanta ikonu) · `card-swatches`: renk noktaları (12) + {code:moreColors} (+2) | varsayılan · hover (arka görsel + dolu sepet halkası) · stok yok (görsel soluk, rozet) · indirimli (eski fiyat) · favoride · genişlikler: 326 (4 sütun) / 309 (ProductList 3 sütun + filtre) / 177 (mobil 2 sütun) |
| `ProductCardSmall` | `card-small`: 72×88 `card-small-media` (color-surface, radius-card) · `card-small-info`: `card-small-title` (text-title) + `card-small-price` (text-price) | varsayılan · hover |
| `BlogCard` | `blog-card`: `blog-card-media` (clip, 4:3, radius-card) → `blog-card-image` · `blog-card-meta` (text-label mono: kategori · tarih) · `blog-card-title` (text-h4) · `link` (ArrowLink) | varsayılan · hover |
| `Button` | `button` (clip, radius-card) içinde `top` + `bottom` kopya; yükseklik 48 (küçük 40); text-ui; türler: koyu (`color-inverse-bg`), açık (`color-bg`, görsel üstü), çerçeveli (1px `color-line`); yükleniyor halinde `Spinner` + `…ingText` | varsayılan · hover · pasif · yükleniyor · eklendi (onay ikonu + `color-success` metin) · stok yok (pasif, üstü çizili değil, metin değişir) |
| `ArrowLink` | `link`: etiket text-ui + `link-arrow` (→, clip: `arrow-top` + `arrow-bottom`) + `link-line` (1px) | varsayılan · hover |
| `Badge` | `badge`: hap (radius-pill), iç boşluk 8×3, text-badge mono BÜYÜK HARF; türler: `badge-limited` (color-bg zemin), `badge-new` (color-inverse-bg), `badge-sale` (color-accent + color-accent-text), `badge-soldout` (color-surface + muted) | SINIRLI · YENİ · %20 (indirim) · TÜKENDİ |
| `FavoriteButton` | `fav-button`: 28'lik `color-bg` daire; içinde `fav-icon-outline` (14, color-text) + `fav-icon-filled` (14, color-accent) üst üste | boş · dolu · hover |
| `Counter` | `counter`: her hane bir `digit-mask` (clip, sabit genişlik) → `digit-reel`; ayraçlar ayrı metin; font-mono tabular; boyut kullanım yerinden gelir (text-label / text-display / text-badge) | durgun · yuvarlanırken |
| `Breadcrumbs` | `breadcrumbs`: text-label mono muted, ayraç `/`, son öğe color-text | — |
| `Tabs` | `tabs`: yatay (sekme altı 1px çizgi; aktif = 2px color-text alt çizgi) ve dikey (Account); `tab-item` text-ui | aktif · hover · dikey |
| `VariantChip` | `variant-chip`: 40 yükseklik, min 48 genişlik, radius-card, 1px color-line; seçili = color-inverse-bg dolgu | varsayılan · seçili · hover · stok yok (üstü çizili, opacity-inactive) |
| `FormField` | `form-field`: `field-label` (text-label mono) · `field-input` 48 yükseklik, radius-card, 1px color-line, text-ui · `field-message` (text-label; hata = color-danger) | boş · dolu · odak (2px color-accent halka) · hata (+ mesaj, `$color-danger`) · pasif |
| `Checkbox` | `checkbox`: 18 kare, radius 3, 1px color-line; işaretli = color-inverse-bg + onay ikonu · `checkbox-label` text-ui-sm | boş · işaretli |
| `AccordionItem` | `accordion-item`: `accordion-head` (text-ui + artı ikonu, alt 1px çizgi) · `accordion-body` (text-body muted) | açık · kapalı |
| `QuantitySelector` | `quantity`: 40 yükseklik, radius-card, 1px color-line; `qty-minus` · `qty-value` (mono) · `qty-plus` | varsayılan · alt sınır (eksi pasif) · üst sınır (artı pasif) |
| `SectionHeading` | `section-heading` (ortalı): `section-title` (text-h2) · `section-subtitle` (text-body muted); başlık üstü etiket yok | açıklamalı · açıklamasız · sola yaslı |
| `IconButton` | `icon-button`: 40 dokunma alanı, 18'lik çizgi ikon, isteğe bağlı etiket text-ui | varsayılan · hover |
| `Spinner` | `spinner`: 16 / 20 çizgi daire, 1.5px, çeyrek yay color-accent | — |
| `CartLineItem` | `cart-line`: 88×110 `cart-line-media` (color-surface, radius-card) · `cart-line-info`: ad (text-title) · varyant (text-label muted) · `cart-line-badge` (HEDİYE rozeti, yalnız hediye satırında) · `cart-line-options` (kişiselleştirme değerleri + Düzenle) · `cart-line-bundle` (set içeriği alt listesi) · QuantitySelector ya da sabit `cart-line-qty-static` ×N · `cart-line-price` (text-price) + `cart-line-compare` (üstü çizili, indirimde) · `cart-line-remove` (text-ui-sm, alt çizgili; hediyede yok) | varsayılan · güncelleniyor (soluk + Spinner) · indirimli (eski fiyat üstü çizili) · hediye (HEDİYE rozeti, adet sabit, kaldır yok) · set (içerik alt listesi) · kişiselleştirilmiş (seçenek satırları + Düzenle) · adet sınırı (artı pasif + uyarı) |
| `OfferCard` | `offer-card` (1px color-line, radius-card, iç boşluk 12): 20'lik `offer-toggle` (seçili = color-inverse-bg + onay) · 64×80 `offer-media` · `offer-info`: ad (text-title) + küçük varyant çipleri + fiyat (indirimli + eski, mono) · sağ üstte `offer-badge` (Badge, indirim yüzdesi) | seçili değil · seçili · sepette (seçim kilitli, Sepette etiketi) · tükendi (soluk metin, Tükendi) |
| `BundleItem` | `bundle-item`: 64×80 `bundle-media` · `bundle-info`: ad (text-title) + küçük varyant çipleri · sağda adet (QuantitySelector ya da sabit `bundle-qty-static` ×N) + `bundle-price` (+ ek fiyat, mono) | adet düzenlenebilir (varsayılan) · adet sabit (×N, Sete dahil) · tükendi (soluk metin, Tükendi) |
| `RatingStars` | `rating`: 5 × 14 `rating-star` (dolu color-text, boş color-line) + `rating-score` (mono) + `rating-count` (muted) | puanlı · yorumsuz |
| `ReviewCard` | `review-card` (alt 1px çizgi, dikey boşluk 24): RatingStars · `review-title` (text-title) · `review-text` (text-body) · `review-meta` (mono: ad · tarih) + `review-verified` (onay ikonu + doğrulanmış alıcı) · `review-images` (56'lık görseller) · `merchant-reply` (color-surface kutu: mağaza yanıtı) | doğrulanmış alıcı (varsayılan) · doğrulanmamış · görselli · mağaza yanıtlı |
| `VariantSwatch` | `variant-swatch`: 28'lik daire, renk ya da görsel dolgu (`swatch-fill`), seçili = 2px dış halka color-text, stok yok = çapraz çizgi | varsayılan · seçili · hover · stok yok |
| `PriceRange` | `price-range`: iki alan (en az · en çok) + `range-track` (2px color-line) + `range-fill` (color-text) + iki `range-thumb` | varsayılan · değer girilmiş |
| `SocialLoginButton` | `social-button`: 48 yükseklik, 1px color-line, radius-card; marka ikonu + etiket | Google · Facebook · hover |
| `Skeleton` | `skeleton`: color-surface bloklar (görsel, satır, buton) radius-card; yükleniyor hallerinde gerçek düzenin yerine | — |

Sözleşme 2 zorunlu ekleri (lint ve `pendev_checks.js` arar):
- `Button` durumları arasında `eklendi` ve `stok yok` var (sepete ekle akışı; ProductDetail ve hızlı ekle bunları kullanır).
- `I/Overlay/FilterDrawer@mobile` (mobil filtre çekmecesi) 6.2'de Overlay olarak tanımlı ve 6.4'te çizili.
- `I/Overlay/QuickBuy@desktop` ve `@mobile` (hızlı al penceresi: açık · seçim eksik · ekleniyor) 6.2'de Overlay olarak tanımlı ve 6.4'te çizili; ProductCard'ın sepet düğmesi açar.
- Ürün detayda ikas mağaza blokları (`pdp-rating`, `pdp-campaign`, `pdp-offers`, `pdp-pay`, `pdp-bundle`, `pdp-tiers`, `pdp-options`, `pdp-group`, `pdp-back-in-stock`), ayrı `ProductReviews` section'ı; sepet sayfası ve çekmecede kampanya satırları, uygulanan kupon, öneri şeridi; `OfferCard`, `BundleItem`, `RatingStars`, `ReviewCard` Sub'ları ve CartLineItem'ın indirimli · hediye · set · kişiselleştirilmiş halleri (06-page-coverage §3b).
- Mağaza tamamlama (06-page-coverage §3c): CookieBar, ImagePreview, LocaleSwitcher overlay'leri (dil düğmesi footer alt satırında); Toast, ConfirmModal, AddressModal, AccountMenu koşullu; RichText ve OrderTracking section'ları; filtre tipleri, varyant swatch'ları, galeride video, sosyal/SMS giriş, sipariş detayı ve hesap ayarları katmanları; VariantSwatch, PriceRange, SocialLoginButton, Skeleton Sub'ları.
- Her section kök frame'i `backgroundColor` COLOR prop'unu taşır; her metin node'u `textClass` taşır.

Bileşen animasyon hedefleri (bölümlerde `via` ile anılır, kodu bileşenin içinde yazılır):

<!-- anim-targets:start -->
```yaml
- id: I-CMP-01
  section: Sub/ProductCard
  layer: image-back
  recipe: M-09
  trigger: hover
  what: "Ön görsel arka görsele geçer"
  from: { front.opacity: 1, back.opacity: 0 }
  to: { front.opacity: 0, back.opacity: 1 }
  timing: { duration: 0.4, ease: ease-standard, arrow.spring: spring-soft }
  impl: css-transition
  mobile: kapalı (dokunmatik)
  reducedMotion: anında
  done: false
- id: I-CMP-02
  section: Sub/ProductCard
  layer: card-cart
  recipe: M-28
  trigger: hover
  what: "Sepet halkası grafit dolguya döner, ikon kar beyazı olur"
  from: { ring.fill: transparent, icon: color-text }
  to: { ring.fill: color-inverse-bg, icon: color-inverse-text }
  timing: { duration: 0.2 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-CMP-03
  section: Sub/ProductCardSmall
  layer: card-small-title
  recipe: M-28
  trigger: hover
  what: "Ad muted'dan metin rengine geçer"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-CMP-04
  section: Sub/BlogCard
  layer: blog-card-image
  recipe: M-09
  trigger: hover
  what: "Görsel hafif büyür"
  from: { scale: 1 }
  to: { scale: 1.04 }
  timing: { duration: 0.6, ease: ease-out-soft }
  impl: css-transition
  mobile: kapalı (dokunmatik)
  reducedMotion: anında
  done: false
- id: I-CMP-05
  section: Sub/Button
  layer: button
  recipe: M-11
  trigger: hover
  what: "Ters dolgu alttan kayar, etiket yukarı yuvarlanır"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
- id: I-CMP-06
  section: Sub/ArrowLink
  layer: link
  recipe: M-10
  trigger: hover
  what: "Alt çizgi soldan uzar, ok sağa kayıp yenisi gelir"
  from: { line.width: 0%, arrow: top }
  to: { line.width: 100%, arrow: bottom }
  timing: { duration: 0.4, spring: spring-soft }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında
  done: false
- id: I-CMP-07
  section: Sub/FavoriteButton
  layer: fav-icon-filled
  recipe: I-M-03
  trigger: click
  what: "Kalp dolarken bir kez büyüyüp oturur"
  from: { filled.scale: 0.6, filled.opacity: 0 }
  to: { filled.scale: 1, filled.opacity: 1 }
  timing: { spring: spring-soft, overshoot: 1.25 }
  impl: css-keyframes
  mobile: aynı
  reducedMotion: anında renk değişimi
  done: false
- id: I-CMP-08
  section: Sub/Counter
  layer: digit-reel
  recipe: I-M-01
  trigger: state-change
  what: "Rakam değişince hane yuvarlanır"
  from: { reel.y: önceki rakam }
  to: { reel.y: yeni rakam }
  timing: { duration: 0.6, ease: ease-out-soft, stagger: 0.04, direction: sağdan-sola }
  impl: animejs + io-hook
  mobile: aynı
  reducedMotion: anında son değer
  done: false
- id: I-CMP-09
  section: Sub/Tabs
  layer: tab-item
  recipe: M-28
  trigger: hover
  what: "Sekme rengi muted → metin"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-CMP-10
  section: Sub/VariantChip
  layer: variant-chip
  recipe: M-28
  trigger: hover
  what: "Çerçeve ve metin koyulaşır"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-CMP-11
  section: Sub/AccordionItem
  layer: accordion-body
  recipe: M-22
  trigger: click
  what: "Gövde açılır, artı 45° döner"
  from: { height: 0, icon.rotate: 0 }
  to: { height: auto, icon.rotate: 45 }
  timing: { spring: "bounce 0, 0.5s" }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-CMP-12
  section: Sub/SectionHeading
  layer: section-title
  recipe: M-01
  trigger: inview
  what: "Başlık ve alt metin sırayla yukarı belirir"
  from: { y: 40, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.5, ease: ease-standard, stagger: 0.08 }
  impl: css-keyframes + io-hook
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-CMP-13
  section: Sub/OfferCard
  layer: offer-card
  recipe: M-28
  trigger: click
  what: "Seçilince çerçeve ve onay kutusu koyulaşır"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-CMP-14
  section: Sub/VariantSwatch
  layer: variant-swatch
  recipe: M-28
  trigger: hover
  what: "Dış halka belirir"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

### 6.2 Bölümler ve overlay'ler

Her başlık bir kök frame çiftidir (`@desktop` + `@mobile`). "ikas" satırı aktarımda başlanacak şablonu gösterir.

#### Section/Header
- **Kullanıldığı yer:** tüm sayfalar
- **ikas:** header-section (--isHeader) + navigation
- **Prop'lar:** `logo` SVG · `logoAltText` TEXT · `showAnnouncement`, `transparentOnHero` BOOLEAN · `announcementText` TEXT · `announcementLink` LINK · `announcements` COMPONENT_LIST (AnnouncementItem: text TEXT, link LINK) · `stickyEnabled` BOOLEAN · `countdownTarget` DATE · `navLinks` LIST_OF_LINK · `megamenuColumns` COMPONENT_LIST (MegamenuColumn) · `searchLabel`, `cartLabel`, `accountLabel`, `menuAriaLabel` TEXT · arama ve sepet metinleri (components.md Header ile aynı) · `backgroundColor` COLOR
- **Desktop:** İki satır. Üstte 36'lık duyuru bandı (`color-bg`, ortalı mono metin + turuncu hap içinde geri sayım `Counter`). Altında 72'lik ana satır: varsayılan `color-bg` + alt 1px `color-line`; hero'lu sayfada kodda hero'nun üstüne biner ve şeffaf + koyu mod metin rengine geçer (`— şeffaf` durum frame'i). Sayfa frame'lerinde section'lar alt alta durduğu için kök opak çizilir. Solda wordmark (yükseklik `$size-logo`) ve 32 aralıkla 5 nav linki; sağda arama, sepet (mono sayaçlı) ve giriş: ikon + etiket.
- **Mobil:** Duyuru bandı 32: geri sayım + kısa metin. Ana satır 56: solda menü ikonu, ortada wordmark, sağda arama ve sepet ikonu (sayaç rozetli). Nav, hesap ve favoriler MenuOverlay'de.
- **Yalnız masaüstü katmanlar:** `header-nav`, `search-button-label`, `cart-button-label`, `account-button`

```
header
├─ announcement-bar                  36, $color-bg, ortalı
│   ├─ announcement-text             {announcementText:TEXT} text-label mono
│   └─ countdown-chip                hap, $color-accent; Counter
│       └─ countdown-value           {code:countdown} text-label mono, SS:DD:SS
│   └─ announcement-pager            {announcements:COMPONENT_LIST} birden fazlaysa nokta + oklar
└─ header-main                       72; şeffaf (hero üstü) | $color-bg + alt çizgi
    ├─ header-left
    │   ├─ header-logo               {logo:SVG} yükseklik $size-logo + {logoAltText:TEXT} (görsel alt metni)
    │   └─ header-nav                {navLinks:LIST_OF_LINK}
    │       └─ nav-link ×5           text-ui; ilki megamenu açar
    └─ header-actions                aralık 24
        ├─ search-button             ikon 18 + {searchLabel:TEXT}
        ├─ cart-button               ikon 18 + {cartLabel:TEXT}
        │   └─ cart-count            {data:cart.itemCount} text-badge mono; Counter
        └─ account-button            ikon 18 + {accountLabel:TEXT}
```

Kontrol: varsayılan kök opak (`$color-bg` + alt çizgi); hero üstü şeffaf hali ayrı durum frame'i: `I/Section/Header@desktop — şeffaf` (header-main koyu mod, zemin `$color-transparent`) · geri sayım haneleri sabit genişlikte (tabular) · mobilde menü butonu 40×40 dokunma alanı · kaydırınca yapışkan hal ayrı frame: `— yapışkan` (72 → 60, alt çizgi, duyuru gizli); birden fazla duyuruda `— duyurular`

<!-- anim-targets:start -->
```yaml
- id: I-HDR-01
  section: Header
  layer: countdown-value
  via: Counter
  recipe: I-M-01
  trigger: auto-loop
  what: "Geri sayım her saniye son haneyi yuvarlar"
  from: { reel.y: önceki rakam }
  to: { reel.y: yeni rakam }
  timing: { interval: 1, duration: 0.35, ease: ease-out-soft }
  impl: animejs + io-hook
  mobile: aynı
  reducedMotion: anında son değer
  done: false
- id: I-HDR-02
  section: Header
  layer: nav-link
  recipe: M-28
  trigger: hover
  what: "Link rengi muted → metin; aktif sayfa altı 1px çizgili"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-HDR-03
  section: Header
  layer: cart-count
  via: Counter
  recipe: I-M-01
  trigger: state-change
  what: "Sepet sayısı değişince hane yuvarlanır"
  from: { reel.y: önceki rakam }
  to: { reel.y: yeni rakam }
  timing: { duration: 0.6, ease: ease-out-soft, stagger: 0.04, direction: sağdan-sola }
  impl: animejs + io-hook
  mobile: aynı
  reducedMotion: anında son değer
  done: false
- id: I-HDR-04
  section: Header
  layer: header-main
  recipe: M-28
  trigger: scroll
  what: "Hero geçilince şeffaf zemin $color-bg'ye, metin koyuya döner"
  from: { bg: transparent, text: color-inverse-text }
  to: { bg: color-bg, text: color-text }
  timing: { duration: 0.3, ease: ease-standard }
  impl: io-hook + css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Overlay/MenuOverlay
- **Kullanıldığı yer:** Header
- **ikas:** Header sub-component (navigation deseni)
- **Desktop:** Megamenu: header altında 1440 × 420, `color-bg`, üst 1px çizgi. Solda 3 link sütunu (`MegamenuColumn`), sağda 440'lık görsel kart (radius-card, alt kenarda başlık). Arkada `color-scrim`.
- **Mobil:** Tam ekran, `mode: dark`. Linkler text-h3 alt alta; alt kategoriler akordeon. Altta hesap / favori / mağazalar satırı ve mono `TL · TÜRKÇE`.
- **Yalnız masaüstü katmanlar:** `menu-column-title`, `menu-feature`

```
menu-overlay
├─ scrim
└─ menu-panel
    ├─ close-button                  {closeAriaLabel:TEXT} (mobil tam ekran panelde)
    ├─ menu-columns                  {megamenuColumns:COMPONENT_LIST}
    │   └─ menu-column ×3            {title:TEXT} text-label mono + {links:LIST_OF_LINK} text-ui
    ├─ menu-feature                  {image:IMAGE} radius-card + {title:TEXT} text-h4
    ├─ menu-auth                     (mobil) misafir: {loginText:TEXT} + {registerText:TEXT} · üye: {data:customer.firstName} + {logoutText:TEXT}
    └─ menu-footer                   (mobil) {accountLabel:TEXT} · {favoritesLabel:TEXT} · {localeText:TEXT}
```

Kontrol: masaüstü megamenu ve mobil tam ekran ayrı frame · mobil panel koyu modda

<!-- anim-targets:start -->
```yaml
- id: I-MENU-01
  section: MenuOverlay
  layer: menu-panel
  recipe: M-06
  trigger: hover
  what: "Panel aşağı doğru açılır, scrim belirir"
  from: { clipHeight: 0, caret.rotate: 0 }
  to: { clipHeight: 100%, caret.rotate: 180 }
  timing: { duration: 0.4, ease: ease-out-soft }
  impl: css-transition
  mobile: akordeon
  reducedMotion: anında
  done: false
- id: I-MENU-02
  section: MenuOverlay
  layer: menu-column
  recipe: M-01
  trigger: state-change
  what: "Sütunlar 0.05 aralıkla belirir"
  from: { y: 12, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.4, ease: ease-out-soft, stagger: 0.05 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Overlay/CartDrawer
- **Kullanıldığı yer:** Header
- **ikas:** Header sub-component (cart patterns)
- **Desktop:** Sağdan 440 × 900 çekmece, `color-bg`, sol 1px çizgi; arkada `color-scrim`. Başlık 72, gövde kaydırmalı, alt bölüm üst çizgili.
- **Mobil:** 390 tam genişlik çekmece.

```
cart-overlay
├─ scrim
└─ cart-drawer
    ├─ drawer-header                 {cartTitleText:TEXT} text-h4 + {data:cart.itemCount} mono + close-button {closeAriaLabel:TEXT}
    ├─ drawer-body
    │   ├─ cart-empty                {cartEmptyTitle:TEXT} text-h4 + {cartEmptyText:TEXT} text-body muted + {cartEmptyButtonText:TEXT}
    │   ├─ cart-line ×N              CartLineItem (biri hediye)
    │   └─ drawer-recommend          {drawerRecommendTitle:TEXT} + ProductCardSmall ×2
    └─ drawer-footer                 üst çizgi, boşluk $space-panel
        ├─ coupon-toggle             {couponToggleText:TEXT} + FormField {couponPlaceholder:TEXT} + {couponButtonText:TEXT}
        ├─ drawer-adjustments        adjustment-row ×N {data:adjustment.name} + {data:adjustment.amount}
        ├─ subtotal-row              {cartSubtotalLabel:TEXT} + {data:cart.subtotal} text-price
        ├─ shipping-note             {cartShippingNote:TEXT} text-label muted
        ├─ checkout-button           {checkoutButtonText:TEXT} / {checkoutLoadingText:TEXT}
        └─ view-cart-link            {cartViewButtonText:TEXT}
```

Kontrol: boş · dolu (2 ürün + hediye satırı, kampanya satırı) · yükleniyor halleri ayrı frame · ödeme butonu boşken gizli

<!-- anim-targets:start -->
```yaml
- id: I-CART-01
  section: CartDrawer
  layer: cart-drawer
  recipe: M-20
  trigger: click
  what: "Çekmece sağdan kayar, scrim belirir"
  from: { x: 100%, scrim.opacity: 0 }
  to: { x: 0, scrim.opacity: 1 }
  timing: { spring: spring-drawer, scrim.duration: 0.4, rows.stagger: [0.2, 0.3, 0.4, 0.5] }
  impl: css-transition + animejs
  mobile: tam genişlik
  reducedMotion: anında
  done: false
- id: I-CART-02
  section: CartDrawer
  layer: cart-line
  recipe: M-20
  trigger: state-change
  what: "Satırlar gecikmeli girer"
  from: { opacity: 0, y: 16 }
  to: { opacity: 1, y: 0 }
  timing: { duration: 0.4, ease: ease-out-soft, stagger: [0.15, 0.2, 0.25] }
  impl: animejs
  mobile: tam genişlik
  reducedMotion: anında
  done: false
- id: I-CART-03
  section: CartDrawer
  layer: checkout-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
- id: I-CART-04
  section: CartDrawer
  layer: view-cart-link
  via: ArrowLink
  recipe: M-10
  trigger: hover
  what: "Alt çizgi uzar"
  from: { line.width: 0%, arrow: top }
  to: { line.width: 100%, arrow: bottom }
  timing: { duration: 0.4, spring: spring-soft }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Overlay/SearchOverlay
- **Kullanıldığı yer:** Header
- **ikas:** Header sub-component (search)
- **Desktop:** Header altından açılan 1440 × 520 panel, `color-bg`; arkada scrim. Büyük arama alanı (text-h3, alt 1px çizgi), altında öneri etiketleri ya da 4'lü `ProductCardSmall` sonuç satırı ve tüm sonuçlar linki.
- **Mobil:** Tam ekran; alan üstte, sonuçlar tek sütun liste.

```
search-overlay
├─ scrim
└─ search-panel
    ├─ search-field                  {searchPlaceholder:TEXT} text-h3 + kapat; alt çizgi {closeAriaLabel:TEXT}
    ├─ search-suggestions            {searchEmptyTitle:TEXT} text-label mono + öneri çipleri (kategoriler)
    ├─ search-results                ProductCardSmall ×4
    │   └─ result-count              {data:search.resultCount} mono
    ├─ search-empty                  {searchNoResultText:TEXT} text-h4 + search-empty-text {searchNoResultHint:TEXT} muted
    └─ link                          {searchAllResultsText:TEXT}
```

Kontrol: boş · yazarken (sonuçlu) · sonuçsuz halleri ayrı frame

<!-- anim-targets:start -->
```yaml
- id: I-SRCH-01
  section: SearchOverlay
  layer: search-panel
  recipe: M-21
  trigger: click
  what: "Panel üstten iner, alan odaklanır"
  from: { y: -100%, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { spring: spring-search }
  impl: css-transition
  mobile: tam ekran
  reducedMotion: anında
  done: false
- id: I-SRCH-02
  section: SearchOverlay
  layer: search-results
  recipe: M-01
  trigger: state-change
  what: "Sonuçlar sırayla belirir"
  from: { y: 12, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.3, ease: ease-out-soft, stagger: 0.04 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-SRCH-03
  section: SearchOverlay
  layer: link
  via: ArrowLink
  recipe: M-10
  trigger: hover
  what: "Ok kayar, alt çizgi uzar"
  from: { line.width: 0%, arrow: top }
  to: { line.width: 100%, arrow: bottom }
  timing: { duration: 0.4, spring: spring-soft }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Overlay/CookieBar
- **Kullanıldığı yer:** tüm sayfalar (Header içinde)
- **ikas:** Header child CookieBar (handleCustomerConsentGrant)
- **Desktop:** Alt kenarda 1440 şerit, $color-inverse-bg; metin solda, butonlar sağda.
- **Mobil:** Alt kenarda kart; metin üstte, butonlar altta tam genişlik.

```
cookie-layer
└─ cookie-bar
    ├─ cookie-text                   {cookieContent:RICH_TEXT}
    ├─ cookie-accept                 {cookieAcceptText:TEXT}; açık Button
    └─ cookie-close                  {closeAriaLabel:TEXT}
```

Kontrol: açık hali; kabul edilince kaybolur

<!-- anim-targets:start -->
```yaml
- id: I-CKE-01
  section: CookieBar
  layer: cookie-bar
  recipe: M-20
  trigger: state-change
  what: "Şerit alttan kayarak gelir"
  from: { y: 100% }
  to: { y: 0 }
  timing: { spring: spring-drawer, scrim.duration: 0.4, rows.stagger: [0.2, 0.3, 0.4, 0.5] }
  impl: css-transition + animejs
  mobile: tam genişlik
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Overlay/LocaleSwitcher
- **Kullanıldığı yer:** Footer (alt satırdaki dil/para birimi düğmesi)
- **ikas:** Footer sub-component (setLocalization, baseStore.localeOptions)
- **Desktop:** Footer'daki dil düğmesinin üstünde açılan 320 panel.
- **Mobil:** Alttan açılan sayfa.

```
locale-overlay
├─ scrim
└─ locale-panel
    ├─ locale-title                  {localeTitle:TEXT}
    └─ locale-option ×N              {data:locale.countryName} + {data:locale.currency} + seçili işareti
```

Kontrol: açık hali, bir seçenek seçili

<!-- anim-targets:start -->
```yaml
- id: I-LCL-01
  section: LocaleSwitcher
  layer: locale-panel
  recipe: M-06
  trigger: click
  what: "Panel aşağı doğru açılır"
  from: { clipHeight: 0, caret.rotate: 0 }
  to: { clipHeight: 100%, caret.rotate: 180 }
  timing: { spring: spring-soft, ease: ease-nav, duration: 0.4 }
  impl: css-transition
  mobile: akordeon
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Overlay/ImagePreview
- **Kullanıldığı yer:** Ürün detay (galeri), yorum görselleri
- **ikas:** ProductDetail sub-component (ImagePreviewModal)
- **Desktop:** Tam ekran koyu zemin; ortada büyük görsel, sağ/sol oklar, üstte sayaç + kapat, altta küçük resimler.
- **Mobil:** Tam ekran, kaydırmalı; noktalar.
- **Yalnız masaüstü katmanlar:** `preview-nav`

```
preview-overlay
├─ scrim
└─ preview-panel
    ├─ close-button                  {closeAriaLabel:TEXT}
    ├─ preview-image                 {data:product.image}; yakınlaştırılabilir
    ├─ preview-nav                   preview-prev / preview-next + {code:index}
    └─ preview-thumbs                küçük resim ×N
```

Kontrol: açık hali

<!-- anim-targets:start -->
```yaml
- id: I-PREV-01
  section: ImagePreview
  layer: preview-image
  recipe: M-02
  trigger: click
  what: "Görsel büyüyerek açılır, geçişte yumuşakça değişir"
  from: { opacity: 0 }
  to: { opacity: 1 }
  timing: { spring: "bounce 0, 1.2s", delay: 0.3 }
  impl: css-keyframes
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/Footer
- **Kullanıldığı yer:** tüm sayfalar
- **ikas:** footer-section (--isFooter) + form-handling (bülten aboneliği)
- **Prop'lar:** `ctaImage` IMAGE · `ctaTitle`, `ctaButtonText`, `notifyTitle`, `notifyText`, `notifyPlaceholder`, `notifyButtonText`, `notifySubmittingText`, `notifySuccessText`, `notifyErrorText` TEXT · `ctaButtonLink` LINK · `logo` SVG · `aboutText` TEXT · `columns` COMPONENT_LIST (FooterColumn) · `socialLinks` COMPONENT_LIST (SocialLink) · `contactText`, `localeText`, `copyrightText`, `coordinateText` TEXT · `backgroundColor` COLOR
- **Mod:** `mode: "dark"`
- **Desktop:** 1440, koyu mod. Üstte 560 yüksekliğinde kenardan kenara görsel bant: fotoğraf + %60 karartma; alt 260'ta zemine akan gradyan ve 180'lik arka plan bulanıklığı şeridi (sert çizgi yok). Bandın altına yaslı iki kart: solda buzlu cam iletişim kartı (yarı saydam `color-scrim`, arka plan bulanıklığı, 1px çizgi; text-h2 iki satır + açık "Bize ulaş" butonu), sağda 480'lik açık zeminli e-posta bildirim kartı (başlık, açıklama, alan + koyu Kaydol, sonuç mesajı). Altında logo + sosyal (halkalı butonlar), 3 link sütunu, alt satır (koordinat · telif · TL · Türkçe).
- **Mobil:** Görsel bant 390 × 640, kartlar alt alta (iletişim kartı, bildirim kartı; form dikey, buton tam genişlik). Altında logo + metin, akordeon link sütunları, sosyal, alt satırlar alt alta.
- **Yalnız masaüstü katmanlar:** `footer-column-title`, `footer-link`

```
footer
├─ footer-cta-band                   kenardan kenara; kodda backdrop-filter
│   ├─ footer-cta-image              {ctaImage:IMAGE}
│   ├─ footer-cta-tint · footer-cta-fade · footer-cta-blur   $color-scrim, $color-transparent → $color-bg gradyan, arka plan bulanıklığı
│   └─ footer-cta
│       ├─ footer-cta-card           buzlu cam: {ctaTitle:TEXT} text-h2 + footer-cta-button
│       │   └─ footer-cta-button (clip)   {ctaButtonText:TEXT} {ctaButtonLink:LINK}; açık Button
│       └─ footer-cta-notify         açık mod kart: {notifyTitle:TEXT} text-h4 + {notifyText:TEXT}
│           ├─ cta-notify-form       FormField {notifyPlaceholder:TEXT} + cta-notify-button
│           │   └─ cta-notify-button (clip)   {notifyButtonText:TEXT} / {notifySubmittingText:TEXT}; koyu Button
│           └─ cta-notify-message    {notifySuccessText:TEXT} $color-success | {notifyErrorText:TEXT} $color-danger
└─ footer-lower
    ├─ footer-brand                  {logo:SVG} 44 + {aboutText:TEXT} + footer-social {socialLinks:COMPONENT_LIST}
    ├─ footer-columns                {columns:COMPONENT_LIST}
    │   └─ footer-column ×3          {title:TEXT} text-label mono + {links:LIST_OF_LINK} text-ui-sm muted
    └─ footer-bottom                 {coordinateText:TEXT} · {copyrightText:TEXT} · {contactText:TEXT} · locale-button {localeText:TEXT} (dünya ikonu + ok; LocaleSwitcher'ı her zaman buradan açar)
```

Kontrol: görsel ile footer zemini arasında sert çizgi yok (gradyan + bulanıklık) · bildirim formu başarılı ve hata durum frame'leri · koyu modda kontrast

<!-- anim-targets:start -->
```yaml
- id: I-FTR-01
  section: Footer
  layer: footer-column
  recipe: M-28
  trigger: hover
  what: "Link rengi muted → metin"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-FTR-02
  section: Footer
  layer: footer-social
  recipe: M-28
  trigger: hover
  what: "İkon rengi turuncuya döner"
  from: { color: color-muted }
  to: { color: color-accent }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-FTR-03
  section: Footer
  layer: footer-cta-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
- id: I-FTR-04
  section: Footer
  layer: cta-notify-message
  recipe: M-01
  trigger: state-change
  what: "Bildirim sonucu belirir"
  from: { y: 8, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.3, ease: ease-standard }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/HeroSlider
- **Kullanıldığı yer:** Ana sayfa
- **ikas:** hero-slider-section (uyarlanır)
- **Prop'lar:** `slides` COMPONENT_LIST (HeroSlide: image IMAGE, mobileImage IMAGE, title TEXT, text TEXT, buttonText TEXT, buttonLink LINK, metaText TEXT) · `autoplaySeconds`, `overlayOpacity` NUMBER · `heightMode` ENUM · `backgroundColor` COLOR
- **Desktop:** 1440 × $size-hero (760), header altına uzanır. Tam kaplama görsel + %35 düz karartma (`color-scrim`). Metin bloğu sol altta, kenardan $space-page, alttan 64: text-display başlık (en fazla 2 satır, 880 genişlik), text-body açıklama (520), 24 aralıkla açık Button. Sağ altta mono meta satırı (koordinat · rakım) ve slayt sayacı `01 / 03`.
- **Mobil:** 390 × 600; görsel `mobileImage` (4:5). Metin sol altta, başlık text-display mobil (48), buton tam genişlik değil. Meta satırı gizli; sayaç başlığın üstüne çıkar.
- **Yalnız masaüstü katmanlar:** `hero-meta`

```
hero-slider
├─ hero-slides                       {slides:COMPONENT_LIST}
│   └─ hero-slide ×N
│       ├─ hero-slide-mask (clip)
│       │   └─ hero-bg               {image:IMAGE} + {mobileImage:IMAGE}, kabından %15 yüksek
│       └─ hero-scrim                $color-scrim
├─ hero-text                         sol alt
│   ├─ hero-title-mask (clip) → hero-title   {title:TEXT} text-display, koyu mod metin
│   ├─ hero-description              {text:TEXT} text-body
│   └─ hero-button (clip)            {buttonText:TEXT} {buttonLink:LINK}; açık Button
└─ hero-meta                         sağ alt
    ├─ hero-meta-text                {metaText:TEXT} text-label mono
    └─ hero-counter                  {code:slideCounter} text-label mono; Counter
```

Kontrol: başlık kendi clip maskesinde, satır başına bir metin node'u · hero-bg kabından %15 yüksek · metin kontrastı karartma üstünde ≥ 4.5

<!-- anim-targets:start -->
```yaml
- id: I-HERO-01
  section: HeroSlider
  layer: hero-bg
  recipe: M-02
  trigger: load
  what: "Görsel yumuşakça belirir"
  from: { opacity: 0 }
  to: { opacity: 1 }
  timing: { duration: 1.0, ease: ease-standard }
  impl: css-keyframes
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-HERO-02
  section: HeroSlider
  layer: hero-title
  recipe: M-03
  trigger: load
  what: "Başlık kelime kelime açılır (yalnızca y + opacity)"
  from: { opacity: 0, y: 50 }
  to: { opacity: 1, y: 0 }
  timing: { duration: 0.7, ease: ease-out-soft, stagger: 0.06, delay: 0.2 }
  impl: animejs + io-hook
  mobile: sadece y + opacity
  reducedMotion: anında
  done: false
- id: I-HERO-03
  section: HeroSlider
  layer: hero-description
  recipe: M-01
  trigger: load
  what: "Açıklama yukarı belirir"
  from: { y: 40, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.5, ease: ease-standard, delay: 0.5 }
  impl: css-keyframes
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-HERO-04
  section: HeroSlider
  layer: hero-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
- id: I-HERO-05
  section: HeroSlider
  layer: hero-slides
  recipe: M-07
  trigger: auto-loop
  what: "Birden çok slaytta çapraz geçiş + görsel 1.08 → 1"
  from: { opacity: 0, image.scale: 1.08 }
  to: { opacity: 1, image.scale: 1 }
  timing: { duration: 0.8, ease: ease-out-soft, interval: autoplaySeconds }
  impl: animejs
  mobile: çapraz geçiş 0.6s
  reducedMotion: anında değişim
  done: false
- id: I-HERO-06
  section: HeroSlider
  layer: hero-counter
  via: Counter
  recipe: I-M-01
  trigger: state-change
  what: "Slayt sayacı hane hane yuvarlanır"
  from: { reel.y: önceki rakam }
  to: { reel.y: yeni rakam }
  timing: { duration: 0.6, ease: ease-out-soft, stagger: 0.04, direction: sağdan-sola }
  impl: animejs + io-hook
  mobile: aynı
  reducedMotion: anında son değer
  done: false
- id: I-HERO-07
  section: HeroSlider
  layer: hero-bg
  recipe: M-27
  trigger: scroll-scrub
  what: "Görsel içerikten yavaş kayar"
  from: { bg.y: 0 }
  to: { bg.y: 15% }
  timing: { scrub: true }
  impl: scroll-scrub
  mobile: kapalı
  reducedMotion: kapalı
  done: false
```
<!-- anim-targets:end -->

#### Section/ProductGrid
- **Kullanıldığı yer:** Ana sayfa, ürün detay (benzer ürünler), 404 (öneriler)
- **ikas:** product-slider-section (ızgara düzenine uyarlanır)
- **Prop'lar:** `title`, `subtitle`, `buttonText` TEXT · `products` PRODUCT_LIST · `maxItems`, `mobileMaxItems`, `columns` NUMBER · `buttonLink` LINK · `addToCartAriaLabel`, `favoriteAriaLabel` TEXT · `backgroundColor` COLOR
- **Desktop:** 1440; üst $space-section (ilk bölümde 96). SectionHeading ortalı (başlık + alt metin), 40 boşluk, 4 sütun × 326 ProductCard, aralık $space-grid (24), satır aralığı 40. 2 satır = 8 kart. Altta 48 boşlukla ortalı koyu Button.
- **Mobil:** 2 sütun × 177, aralık 12; `mobileMaxItems` (4). Buton ortalı.

```
product-grid
├─ section-heading                   SectionHeading
│   ├─ section-title                 {title:TEXT} text-h2
│   └─ section-subtitle              {subtitle:TEXT} text-body muted
├─ product-grid-list                 {products:PRODUCT_LIST} 4 sütun
│   └─ ProductCard ×8                card-media → image-front + image-back · card-title {data:product.name} · card-price {data:product.price} · card-cart {addToCartAriaLabel:TEXT} · FavoriteButton {favoriteAriaLabel:TEXT}
└─ grid-button (clip)                {buttonText:TEXT} {buttonLink:LINK}; koyu Button
```

Kontrol: en az 8 kart, isimler 1 satıra sığıyor · rozetli (SINIRLI), favoride ve indirimli kart örnekleri var

<!-- anim-targets:start -->
```yaml
- id: I-GRID-01
  section: ProductGrid
  layer: section-title
  via: SectionHeading
  recipe: M-01
  trigger: inview
  what: "Başlık grubu sırayla yukarı belirir"
  from: { y: 40, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.5, ease: ease-standard, delay: 0.2 }
  impl: css-keyframes
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-GRID-02
  section: ProductGrid
  layer: product-grid-list
  recipe: M-01
  trigger: inview
  what: "Kartlar sırayla girer"
  from: { y: 40, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.5, ease: ease-standard, stagger: 0.05 }
  impl: animejs + io-hook
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-GRID-03
  section: ProductGrid
  layer: image-back
  via: ProductCard
  recipe: M-09
  trigger: hover
  what: "Ön görsel arka görsele geçer"
  from: { front.opacity: 1, back.opacity: 0 }
  to: { front.opacity: 0, back.opacity: 1 }
  timing: { duration: 0.4, ease: ease-standard, arrow.spring: spring-soft }
  impl: css-transition
  mobile: kapalı (dokunmatik)
  reducedMotion: anında
  done: false
- id: I-GRID-04
  section: ProductGrid
  layer: grid-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
```
<!-- anim-targets:end -->

#### Section/ActivityGrid
- **Kullanıldığı yer:** Ana sayfa
- **ikas:** (özel; category-images-section yerine aktivite şeridi)
- **Prop'lar:** `title`, `subtitle`, `linkText` TEXT · `link` LINK · `activities` COMPONENT_LIST (ActivityCard: image IMAGE, title TEXT, text TEXT, countText TEXT, buttonText TEXT, link LINK) · `backgroundColor` COLOR
- **Desktop:** 1440; üst $space-section, alt 0 (ardından StoreSpotlight). Başlık satırı: solda sola yaslı SectionHeading, sağda ArrowLink; 40 boşluk. Altında 480 yüksekliğinde 5 kartlık şerit, aralık 12: açık kart 524, kapalılar 201 (flex 2.6 : 1). Kartlar radius-card, görsel + alttan gradyan karartma; metin sol altta (kar beyazı): başlık text-h3 (kapalıda text-h4), açık kartta açıklama + adet + 'Keşfet →'.
- **Mobil:** Başlık ve ArrowLink alt alta ($space-page içte). Şerit sağa taşar (yatay kaydırma, scroll-snap), yükseklik 400: açık kart 240, diğerleri 88, aralık 8.

```
activity-grid
├─ activity-head
│   ├─ section-heading               SectionHeading (sola yaslı)
│   │   ├─ section-title             {title:TEXT} text-h2
│   │   └─ section-subtitle          {subtitle:TEXT} text-body muted
│   └─ link                          ArrowLink {linkText:TEXT} {link:LINK}
└─ activity-row                      {activities:COMPONENT_LIST} yatay şerit
    └─ activity-card ×5 (clip)       radius-card; ilk kart açık
        ├─ activity-image            {image:IMAGE}
        ├─ activity-scrim            alttan gradyan $color-transparent → $color-scrim
        └─ activity-content          sol alt, kar beyazı
            ├─ activity-title        {title:TEXT} text-h3 (kapalıda text-h4)
            ├─ activity-text         {text:TEXT} text-ui-sm (yalnız açık kart)
            ├─ activity-count        {countText:TEXT} text-ui-sm
            └─ activity-link         {buttonText:TEXT} + ok ikonu (yalnız açık kart)
```

Kontrol: açık kart 524, kapalılar eşit 201 · kapalı kartlarda başlık tek satıra sığıyor · metinler karartma üstünde okunur

<!-- anim-targets:start -->
```yaml
- id: I-ACT-01
  section: ActivityGrid
  layer: section-title
  via: SectionHeading
  recipe: M-01
  trigger: inview
  what: "Başlık grubu sırayla yukarı belirir"
  from: { y: 40, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.5, ease: ease-standard, delay: 0.2 }
  impl: css-keyframes
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-ACT-02
  section: ActivityGrid
  layer: link
  via: ArrowLink
  recipe: M-10
  trigger: hover
  what: "Alt çizgi uzar, ok kayar"
  from: { line.width: 0%, arrow: top }
  to: { line.width: 100%, arrow: bottom }
  timing: { duration: 0.4, spring: spring-soft }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında
  done: false
- id: I-ACT-03
  section: ActivityGrid
  layer: activity-row
  recipe: I-M-04
  trigger: inview
  what: "Kartlar sırayla perdeden çıkar, köşeler yuvarlak kalır"
  from: { clipPath: inset(100% 0 0 0 round 6px), image.scale: 1.1 }
  to: { clipPath: inset(0 0 0 0 round 6px), image.scale: 1 }
  timing: { duration: 0.7, ease: ease-out-soft, stagger: 0.08, threshold: 0.4, once: true }
  impl: animejs + io-hook
  mobile: aynı (yalnız ekranda görünen kartlar)
  reducedMotion: anında görünür
  done: false
- id: I-ACT-04
  section: ActivityGrid
  layer: activity-card
  recipe: I-M-05
  trigger: hover
  what: "Kart genişler, açıklama ve 'Keşfet →' belirir; giriş bitince ilk kart kendiliğinden açılır"
  from: { card.flexGrow: 1, text.opacity: 0 }
  to: { card.flexGrow: 2.6, text.opacity: 1 }
  timing: { duration: 0.5, ease: ease-out-soft, text.delay: 0.15, autoOpen.delay: 0.2 }
  impl: css-transition
  mobile: scroll-snap şerit; ortaya oturan kart açık (240), diğerleri 88
  reducedMotion: anında genişlik değişimi
  done: false
```
<!-- anim-targets:end -->

#### Section/StoreSpotlight
- **Kullanıldığı yer:** Ana sayfa, mağazalar
- **ikas:** (özel)
- **Prop'lar:** `image` IMAGE · `title`, `text`, `offerLabel`, `offerValue`, `offerNote`, `buttonText` TEXT · `buttonLink` LINK · `imagePosition` ENUM · `backgroundColor` COLOR
- **Desktop:** 1440; üst $space-section. Solda 900 × 560 görsel (radius-card); sağda 452'lik sütun, aralık $space-panel. Sütun dikeyde iki uca yaslı: üstte text-h3 başlık (3 satır) + text-body muted paragraf; altta mono etiket, **dev teklif rakamı** (`text-display` 96, mono değil, Counter ile yuvarlanır), küçük not ve koyu Button. Teklif rakamı sayfanın tek büyük tipografi anı.
- **Mobil:** Görsel üstte 390 × 292 (4:3, kenar boşluksuz); sütun altta, teklif rakamı text-display mobil (48).

```
store-spotlight
├─ spotlight-media (clip)            {image:IMAGE} radius-card
└─ spotlight-content
    ├─ spotlight-intro
    │   ├─ spotlight-title           {title:TEXT} text-h3
    │   └─ spotlight-text            {text:TEXT} text-body muted
    └─ spotlight-offer
        ├─ offer-label               {offerLabel:TEXT} text-label mono
        ├─ offer-value               {offerValue:TEXT} text-display; Counter
        ├─ offer-note                {offerNote:TEXT} text-ui-sm muted
        └─ spotlight-button (clip)   {buttonText:TEXT} {buttonLink:LINK}; koyu Button
```

Kontrol: teklif rakamı hane maskeleri sabit genişlikte · görsel ve sütun alt kenarları hizalı

<!-- anim-targets:start -->
```yaml
- id: I-SPOT-01
  section: StoreSpotlight
  layer: spotlight-title
  recipe: M-01
  trigger: inview
  what: "Başlık ve paragraf yukarı belirir"
  from: { y: 40, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.5, ease: ease-standard, delay: 0.2 }
  impl: css-keyframes
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-SPOT-02
  section: StoreSpotlight
  layer: offer-value
  via: Counter
  recipe: I-M-01
  trigger: inview
  what: "Teklif rakamı 00'dan hedef değere yuvarlanır (imza)"
  from: { value: 0 }
  to: { value: offerValue }
  timing: { duration: 1.1, ease: ease-out-soft, stagger: 0.06, threshold: 0.6, once: true }
  impl: animejs + io-hook
  mobile: aynı
  reducedMotion: anında son değer
  done: false
- id: I-SPOT-03
  section: StoreSpotlight
  layer: spotlight-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
```
<!-- anim-targets:end -->

#### Section/Bestsellers
- **Kullanıldığı yer:** Ana sayfa
- **ikas:** product-slider-section (sıralı liste + önizleme düzenine uyarlanır)
- **Prop'lar:** `title`, `subtitle`, `linkText`, `addToCartAriaLabel`, `favoriteAriaLabel` TEXT · `link` LINK · `tabs` COMPONENT_LIST (BestsellerTab: label TEXT, products PRODUCT_LIST) · `maxItems` NUMBER · `backgroundColor` COLOR
- **Desktop:** 1440; üst $space-section, alt 0 (ardından CollectionMosaic). Başlık satırı: solda sola yaslı SectionHeading, sağda Tabs; 40 boşluk. Gövde iki parça, aralık $space-panel: solda sıralı liste (5 satır × 128, satırlar arası 1px çizgi; sıra no text-h4 mono muted, 80×100 görsel, ad text-h4, fiyat text-price, sağda 36'lık sepet halkası; etkin satır color-surface zemin), altında ArrowLink; sağda 560 × 680 önizleme (radius-card, color-surface) etkin satırın ürün görselini ve FavoriteButton'ı gösterir. StoreSpotlight'ın tersine görsel sağda.
- **Mobil:** Başlık, Tabs (yatay kaydırma). 1 numara tam genişlik 358 × 448 önizleme + altında ad ve fiyat; 02–05 satır listesi (64×80 görsel). ArrowLink en altta.

```
bestsellers
├─ bestsellers-head
│   ├─ section-heading               SectionHeading (sola yaslı)
│   │   ├─ section-title             {title:TEXT} text-h2
│   │   └─ section-subtitle          {subtitle:TEXT} text-body muted
│   └─ bestsellers-tabs              Tabs {tabs:COMPONENT_LIST}
│       └─ tab-item ×4               {label:TEXT}; etkin = 2px alt çizgi
└─ bestsellers-body
    ├─ bestsellers-list              {products:PRODUCT_LIST} (etkin sekmenin)
    │   ├─ bestseller-row ×5
    │   │   ├─ bestseller-rank       {code:rank} text-h4 mono muted (01–05)
    │   │   ├─ bestseller-media      {data:product.image} 80×100 radius-card
    │   │   ├─ bestseller-info       {data:product.name} text-h4 · {data:product.price} text-price
    │   │   └─ row-cart              36 halka + çanta ikonu; {addToCartAriaLabel:TEXT}; tıklanınca QuickBuy açılır
    │   └─ link                      ArrowLink {linkText:TEXT} {link:LINK}
    └─ bestsellers-preview (clip)    {data:product.image} etkin satırın ürünü; FavoriteButton {favoriteAriaLabel:TEXT}
```

Kontrol: etkin satır ve önizleme aynı ürün · sıra numaraları kodda üretilir (01–05) · liste ve önizleme alt kenarları hizalı

<!-- anim-targets:start -->
```yaml
- id: I-BEST-01
  section: Bestsellers
  layer: section-title
  via: SectionHeading
  recipe: M-01
  trigger: inview
  what: "Başlık grubu sırayla yukarı belirir"
  from: { y: 40, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.5, ease: ease-standard, delay: 0.2 }
  impl: css-keyframes
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-BEST-02
  section: Bestsellers
  layer: tab-item
  via: Tabs
  recipe: M-28
  trigger: hover
  what: "Sekme rengi muted → metin"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-BEST-03
  section: Bestsellers
  layer: bestsellers-list
  recipe: M-01
  trigger: inview
  what: "Satırlar sırayla yukarı belirir; sekme değişince liste yeniden sıralı girer"
  from: { y: 16, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.45, ease: ease-standard, stagger: 0.05 }
  impl: animejs + io-hook
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-BEST-04
  section: Bestsellers
  layer: bestseller-row
  recipe: M-28
  trigger: hover
  what: "Satır color-surface zemine geçer, ad muted → metin"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-BEST-05
  section: Bestsellers
  layer: bestsellers-preview
  recipe: M-02
  trigger: state-change
  what: "Önizleme görseli etkin satırın ürününe yumuşakça geçer"
  from: { opacity: 0 }
  to: { opacity: 1 }
  timing: { duration: 0.4, ease: ease-standard }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-BEST-06
  section: Bestsellers
  layer: row-cart
  recipe: M-28
  trigger: hover
  what: "Sepet halkası grafit dolguya döner, ikon kar beyazı olur"
  from: { ring.fill: transparent, icon: color-text }
  to: { ring.fill: color-inverse-bg, icon: color-inverse-text }
  timing: { duration: 0.2 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-BEST-07
  section: Bestsellers
  layer: link
  via: ArrowLink
  recipe: M-10
  trigger: hover
  what: "Alt çizgi uzar, ok kayar"
  from: { line.width: 0%, arrow: top }
  to: { line.width: 100%, arrow: bottom }
  timing: { duration: 0.4, spring: spring-soft }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Overlay/QuickBuy
- **Kullanıldığı yer:** Ana sayfa · Bestsellers (satırdaki sepet düğmesi açar)
- **ikas:** Bestsellers sub-component, temaya özel (hızlı al: variant-selection + add-to-cart + PayWithIkas)
- **Desktop:** 1440 × 900 frame; ortada 960 × 600 pencere, `color-bg`, radius-card, clip; arkada `color-scrim`. Solda 480 × 600 ürün görseli (4:5), sol üstte rozet, altta görsel sayacı ve oklar. Sağda $space-panel boşluklu bilgi sütunu: ad (text-h3) + kapat, fiyat satırı, renk yuvarlakları (VariantSwatch) ve beden çipleri (VariantChip), adet + Sepete ekle + favori, Hızlı Öde (PayWithIkas) yuvası, en altta stok notu ve ürün detayı linki.
- **Mobil:** 390 × 844 frame; alttan açılan alt sayfa (üst köşeler radius-card) ve tutamak. Üstte 96 × 120 görsel + ad + fiyat + kapat; altında renk yuvarlakları ve beden çipleri, adet + Sepete ekle, Hızlı Öde, stok notu ve detay linki.
- **Yalnız masaüstü katmanlar:** `qb-media-nav`, `qb-media-count`, `qb-media-arrows`, `qb-rule`, `qb-spacer`

```
quickbuy-overlay
├─ scrim
└─ quickbuy-panel                    masaüstünde pencere, mobilde alt sayfa
    ├─ qb-media                      {data:product.image} 4:5; Badge + qb-media-count {code:index} + qb-prev / qb-next
    └─ qb-details
        ├─ qb-head                   {data:product.name} text-h3 + close-button {closeAriaLabel:TEXT}
        ├─ qb-price                  {data:product.price} text-h4 + {data:product.compareAtPrice} muted
        ├─ qb-variants
        │   ├─ qb-variant-group       renk: {data:variant.name} text-label mono + qb-variant-swatches → variant-swatch ×N (VariantSwatch) {data:variant.thumbnail}
        │   └─ qb-variant-group       beden: {data:variant.name} text-label mono + qb-variant-row → variant-chip ×N (VariantChip)
        │       └─ qb-variant-error  {chooseOptionText:TEXT} color-danger (yalnız seçim eksik halinde)
        ├─ qb-actions                QuantitySelector + add-to-cart-button {addText:TEXT} / {addingText:TEXT} / {soldOutText:TEXT} + FavoriteButton
        ├─ qb-pay                    PayWithIkas yuvası {showPayWithIkas:BOOLEAN}; iframe'i ikas çizer
        └─ qb-foot                   {data:variant.stockCount} mono + detail-link {detailLinkText:TEXT}
```

Kontrol: açık (beden seçili) · seçim eksik · ekleniyor halleri iki cihazda ayrı frame · eklenince pencere kapanır, CartDrawer dolu haliyle açılır · renk VariantSwatch, beden VariantChip; renk için çip kullanılmaz · tükenen beden çipi soluk (opacity-inactive) ve seçilemez

<!-- anim-targets:start -->
```yaml
- id: I-QB-01
  section: QuickBuy
  layer: quickbuy-panel
  recipe: M-20
  trigger: click
  what: "Masaüstünde pencere ortada %96'dan büyüyerek belirir, mobilde alt sayfa alttan kayar; scrim belirir"
  from: { opacity: 0, scale: 0.96, mobile.y: 100% }
  to: { opacity: 1, scale: 1, mobile.y: 0 }
  timing: { duration: 0.35, ease: ease-out-soft }
  impl: css-transition
  mobile: alt sayfa alttan kayar (y 100% → 0)
  reducedMotion: anında açılır
  done: false
- id: I-QB-02
  section: QuickBuy
  layer: qb-media
  recipe: M-02
  trigger: state-change
  what: "Renk seçilince görsel yumuşakça değişir"
  from: { opacity: 0 }
  to: { opacity: 1 }
  timing: { duration: 0.4, ease: ease-standard }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-QB-03
  section: QuickBuy
  layer: variant-chip
  via: VariantChip
  recipe: M-28
  trigger: hover
  what: "Çerçeve ve metin koyulaşır"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-QB-04
  section: QuickBuy
  layer: add-to-cart-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
- id: I-QB-05
  section: QuickBuy
  layer: detail-link
  via: ArrowLink
  recipe: M-10
  trigger: hover
  what: "Alt çizgi uzar"
  from: { line.width: 0%, arrow: top }
  to: { line.width: 100%, arrow: bottom }
  timing: { duration: 0.4, spring: spring-soft }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/CollectionMosaic
- **Kullanıldığı yer:** Ana sayfa
- **ikas:** category-images-section (mozaik düzenine uyarlanır)
- **Prop'lar:** `title`, `subtitle` TEXT · `tiles` COMPONENT_LIST (CollectionTile: image IMAGE, title TEXT, text TEXT, buttonText TEXT, link LINK) · `grayscaleImages` BOOLEAN · `backgroundColor` COLOR
- **Desktop:** 1440; üst $space-section. SectionHeading, 40 boşluk, 3 sütun × 442 mozaik, aralık $space-grid, toplam 860. Sütunlar: kısa 326 + uzun 510 · uzun + kısa · kısa + uzun. Karolar radius-card, siyah-beyaz; etiket text-h2 kar beyazı, sol altta (ortada değil), kenardan $space-panel. Öne çıkan karo (sütun 1 alt) ek olarak text-body + açık küçük Button.
- **Mobil:** 2 sütun, aralık 12. Öne çıkan karo tam genişlik 4:5; diğer 5 karo 1:1 (sonuncu tam genişlik 16:9). Etiket text-h3 mobil.

```
collection-mosaic
├─ section-heading                   SectionHeading
│   ├─ section-title                 {title:TEXT} text-h2
│   └─ section-subtitle              {subtitle:TEXT} text-body muted
└─ mosaic-grid                       {tiles:COMPONENT_LIST} 3 sütun
    └─ collection-tile ×6
        ├─ tile-media (clip)         radius-card
        │   ├─ tile-image            {image:IMAGE} renkli
        │   └─ tile-image-mono       siyah-beyaz kopya (üstte)
        ├─ tile-scrim                öne çıkanda düz $color-scrim; diğerlerinde alttan gradyan $color-transparent → $color-scrim (etiket kontrastı)
        └─ tile-content              sol alt
            ├─ tile-title            {title:TEXT} text-h2 kar beyazı
            ├─ tile-text             {text:TEXT} text-body (öne çıkan karoda ve hover'da uzayan karoda görünür)
            └─ tile-button (clip)    {buttonText:TEXT} {link:LINK}; açık küçük Button (opsiyonel)
```

Kontrol: yükseklik deseni kısa/uzun dönüşümlü, alt kenarlar hizalı · etiketler sol altta, ortalı değil · hover hali ayrı frame: Aksesuar uzamış (600), Pantolon daralmış (236)

<!-- anim-targets:start -->
```yaml
- id: I-MOS-01
  section: CollectionMosaic
  layer: section-title
  via: SectionHeading
  recipe: M-01
  trigger: inview
  what: "Başlık grubu sırayla yukarı belirir"
  from: { y: 40, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.5, ease: ease-standard, delay: 0.2 }
  impl: css-keyframes
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-MOS-02
  section: CollectionMosaic
  layer: mosaic-grid
  recipe: M-01
  trigger: inview
  what: "Karolar sütun sırasıyla belirir"
  from: { y: 24, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.6, ease: ease-out-soft, stagger: 0.08 }
  impl: animejs + io-hook
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-MOS-03
  section: CollectionMosaic
  layer: tile-image-mono
  recipe: I-M-02
  trigger: hover
  what: "Karo renge döner ve hafif büyür"
  from: { image.scale: 1, mono.opacity: 1 }
  to: { image.scale: 1.05, mono.opacity: 0 }
  timing: { duration: 0.8, ease: ease-out-soft }
  impl: css-transition
  mobile: kapalı (renkli değil, siyah-beyaz kalır)
  reducedMotion: yalnızca renk, büyüme yok
  done: false
- id: I-MOS-04
  section: CollectionMosaic
  layer: tile-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
- id: I-MOS-05
  section: CollectionMosaic
  layer: collection-tile
  recipe: I-M-06
  trigger: hover
  what: "Karo sütun içinde uzar (326/510 → 600), komşusu daralır (236); uzayan karoda açıklama ve buton belirir"
  from: { tile.flexGrow: 1, sibling.flexGrow: 1, text.opacity: 0 }
  to: { tile.flexGrow: 2.6, sibling.flexGrow: 1, text.opacity: 1 }
  timing: { duration: 0.6, ease: ease-out-soft, text.delay: 0.15 }
  impl: css-transition
  mobile: kapalı (mozaik sabit)
  reducedMotion: anında yükseklik değişimi
  done: false
```
<!-- anim-targets:end -->

#### Section/ProductList
- **Kullanıldığı yer:** Kategori, koleksiyon, arama, favoriler
- **ikas:** category-list-section + favorites
- **Prop'lar:** `pageMode` ENUM · `columns` NUMBER · `searchTitle`, `favoritesTitle`, `resultsLabel`, `filterButtonText`, `sortLabel`, `clearFiltersText`, `loadMoreText`, `loadingMoreText`, `emptyTitle`, `emptyText`, `emptyButtonText`, `favoritesLoginText`, `favoritesLoginButtonText` TEXT · `backgroundColor` COLOR
- **Desktop:** 1440. Başlık bloğu (üst 48): Breadcrumbs, text-h2 başlık + mono ürün sayısı. Yapışkan filtre barı 56 (üst/alt 1px çizgi): solda filtre butonu + aktif filtre çipleri, sağda sıralama. Gövde: solda 280'lik filtre kenar çubuğu (akordeonlar), sağda 3 sütun ProductCard (309), aralık 24. Altta mono ilerleme `24 / 96` + çerçeveli "daha fazla" butonu.
- **Mobil:** 2 sütun × 177; filtre barı yapışkan, filtre butonu FilterDrawer'ı açar; kenar çubuğu yok.
- **Yalnız masaüstü katmanlar:** `filter-sidebar`, `filter-chip`, `filter-clear-all`

```
product-list
├─ list-header
│   ├─ breadcrumbs                   Breadcrumbs {data:category.path}
│   ├─ list-title                    {data:category.name} text-h2 | {searchTitle:TEXT} + {data:search.query} | {favoritesTitle:TEXT}
│   └─ list-count                    {data:category.productCount} + {resultsLabel:TEXT} text-label mono
├─ filter-bar                        yapışkan; {filterButtonText:TEXT} · filtre çipleri + filter-clear-all {clearFiltersText:TEXT} · {sortLabel:TEXT}
├─ list-body
│   ├─ filter-sidebar                AccordionItem ×6: filter-category-list (alt kategoriler) · filter-swatch-values (VariantSwatch) · filter-box-values (VariantChip) · filter-range (PriceRange) · filter-range-list (aralık çipleri) · Checkbox listesi
│   └─ list-grid                     ProductCard ×9, 3 sütun
├─ list-empty                        {emptyTitle:TEXT} text-h3 + {emptyText:TEXT} + {emptyButtonText:TEXT} · favoriler (misafir): {favoritesLoginText:TEXT} + {favoritesLoginButtonText:TEXT}
└─ list-pagination
    ├─ page-progress                 {code:pageProgress} text-label mono
    └─ load-more-button (clip)       {loadMoreText:TEXT} / {loadingMoreText:TEXT}; çerçeveli Button
```

Kontrol: dolu · boş · yükleniyor (iskelet) · filtre uygulanmış · favoriler-giriş halleri · arama ve favori modu başlıkları ayrı frame · filtre tipleri ayrı ayrı çizili: renk swatch, beden kutusu, fiyat aralığı, aralık çipleri, alt kategori listesi; hepsi checkbox değil

<!-- anim-targets:start -->
```yaml
- id: I-PLP-01
  section: ProductList
  layer: filter-bar
  recipe: M-18
  trigger: scroll
  what: "Bar header altında yapışır, sekme rengi değişir"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: layout + css-transition
  mobile: yatay kaydırma
  reducedMotion: anında
  done: false
- id: I-PLP-02
  section: ProductList
  layer: list-grid
  recipe: M-01
  trigger: state-change
  what: "Filtre değişince ızgara kısa fade ile yenilenir"
  from: { opacity: 0.4 }
  to: { opacity: 1 }
  timing: { duration: 0.25 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-PLP-03
  section: ProductList
  layer: load-more-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
```
<!-- anim-targets:end -->

#### Overlay/FilterDrawer
- **Kullanıldığı yer:** ProductList (mobil)
- **ikas:** ProductList sub-component
- **Desktop:** Masaüstü karşılığı yok (filtreler kenar çubuğunda).
- **Mobil:** 390 × 844 tam ekran çekmece, soldan; başlık + kapat, akordeon filtre grupları, altta yapışkan iki buton (temizle · sonuçları göster).

```
filter-overlay
├─ scrim
└─ filter-drawer
    ├─ filter-header                 {filterTitle:TEXT} text-h4 + close-button {closeAriaLabel:TEXT}
    ├─ filter-group ×5               AccordionItem; filter-swatch-values · filter-box-values · filter-range · Checkbox
    └─ filter-actions
        ├─ clear-button (clip)       {clearFiltersText:TEXT}; çerçeveli Button
        └─ apply-button (clip)       {applyFiltersText:TEXT}; koyu Button
```

Kontrol: açık hali, bir grup açık ve seçimli

<!-- anim-targets:start -->
```yaml
- id: I-FILT-01
  section: FilterDrawer
  layer: filter-drawer
  recipe: M-20
  trigger: click
  what: "Çekmece soldan kayar, scrim belirir"
  from: { x: -100%, scrim.opacity: 0 }
  to: { x: 0, scrim.opacity: 1 }
  timing: { spring: spring-drawer, scrim.duration: 0.4, rows.stagger: [0.2, 0.3, 0.4, 0.5] }
  impl: css-transition + animejs
  mobile: tam genişlik
  reducedMotion: anında
  done: false
- id: I-FILT-02
  section: FilterDrawer
  layer: filter-group
  via: AccordionItem
  recipe: M-22
  trigger: click
  what: "Filtre grubu akordeon açılır"
  from: { height: 0, icon.rotate: 0 }
  to: { height: auto, icon.rotate: 45 }
  timing: { spring: "bounce 0, 0.5s" }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/CollectionHero
- **Kullanıldığı yer:** Koleksiyon
- **ikas:** (özel)
- **Prop'lar:** `image` IMAGE · `category` CATEGORY · `description` TEXT · `backgroundColor` COLOR
- **Desktop:** 1440 × 480; siyah-beyaz tam kaplama görsel + karartma. Sol altta text-display koleksiyon adı, text-body açıklama (520).
- **Mobil:** 390 × 360; başlık text-display mobil.

```
collection-hero
├─ collection-hero-media (clip)      {image:IMAGE}
├─ collection-hero-scrim             $color-scrim
└─ collection-hero-text
    ├─ collection-hero-title         {data:category.name} text-display
    └─ collection-hero-description   {description:TEXT} text-body
```

Kontrol: metin kontrastı karartma üstünde

<!-- anim-targets:start -->
```yaml
- id: I-COLL-01
  section: CollectionHero
  layer: collection-hero-title
  recipe: M-01
  trigger: load
  what: "Başlık ve açıklama yukarı belirir"
  from: { y: 40, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.5, ease: ease-standard, delay: 0.2 }
  impl: css-keyframes
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/ProductDetail
- **Kullanıldığı yer:** Ürün detay
- **ikas:** product-detail-section + variant-selection, add-to-cart, product-pricing, image-handling, bundle-products, campaign offers (CROSS_SELL/UPSELL), product-options, back-in-stock, PayWithIkas
- **Prop'lar:** `product` PRODUCT · `addToCartText`, `addingText`, `addedText`, `outOfStockText`, `sizeGuideText`, `lowStockText`, `descriptionTitle`, `shippingTitle`, `skuLabel`, `reviewsLinkText`, `tiersTitle`, `groupLabel`, `optionsTitle`, `fileUploadText`, `bundleTitle`, `offersAddText`, `offerInCartText`, `offerSoldOutText`, `backInStockTitle`, `backInStockPlaceholder`, `backInStockButtonText`, `backInStockSuccessText`, `backInStockLoginText` TEXT · `showPayWithIkas` BOOLEAN · `shippingText` RICH_TEXT · `highlights` COMPONENT_LIST (ServiceHighlight: icon SVG, title TEXT, text TEXT) · `backgroundColor` COLOR · `updateCartText`, `updatingCartText`, `stockLocationsTitle`, `pickupText`, `optionSetErrorText` TEXT
- **Desktop:** 1440. Breadcrumbs üstte. Solda 2 sütun galeri (görseller 4:5, `color-surface`, radius-card, aralık 12; toplam 880), sağda 452'lik yapışkan bilgi sütunu: rozetler, text-h3 ad, mono SKU, fiyat (+ eski fiyat), renk ve beden VariantChip'leri, beden rehberi linki, adet + koyu Button (tam genişlik) + FavoriteButton, stok notu, hizmet şeridi (ücretsiz kargo · 14 gün iade · 2 yıl garanti; yüzey renkli kutu, ikon + başlık + açıklama, yan yana), akordeonlar.
- **Mobil:** Galeri yatay kaydırmalı tek görsel + nokta göstergesi; bilgiler altta; alt kenarda sabit sepete ekle çubuğu (fiyat + buton).

```
product-detail
├─ breadcrumbs                       Breadcrumbs {data:category.path}
├─ pdp-gallery                       2 sütun, gerçek yükseklik
│   └─ pdp-image ×6                  ürün görselleri
│   └─ pdp-video                     {data:product.video}; oynat ikonu + süre, görsellerle karışık sırada
└─ pdp-details                       yapışkan
    ├─ pdp-badges                    Badge {data:product.badge}
    ├─ pdp-title                     {data:product.name} text-h3
    ├─ pdp-rating                    RatingStars {data:product.stars} + {data:product.reviewCount} {reviewsLinkText:TEXT}
    ├─ pdp-sku                       {skuLabel:TEXT} + {data:variant.sku} text-label mono
    ├─ pdp-price                     {data:product.price} text-price + {data:product.compareAtPrice}
    ├─ pdp-campaign                  {data:campaign.title} text-ui-sm + etiket ikonu (kampanya yoksa gizli)
    ├─ pdp-tiers                     {tiersTitle:TEXT} + tier-row ×3 {data:tier.range} {data:tier.unitPrice} (kademeli indirim varsa)
    ├─ pdp-group                     {groupLabel:TEXT} + group-swatch ×3 {data:productGroup.image} (ürün grubu varsa)
    ├─ pdp-variants                  variant-chip ×N (VariantChip) {data:variant.value} + link {sizeGuideText:TEXT}
    ├─ pdp-variant-swatches          renk tipi varyantta VariantSwatch ×N {data:variant.thumbnail}; beden gibi metin tiplerinde VariantChip
    ├─ pdp-options                   {optionsTitle:TEXT} + {data:option.name} {data:option.price}; ikas seçenek türlerinin hepsi tema stiliyle · option-error (gizli, seçim eksikse) {optionSetErrorText:TEXT} color-danger
    │   ├─ option-text · option-textarea   kısa / uzun metin, sayaç {code:charCount}
    │   ├─ option-select · option-box · option-swatch · option-image   açılır liste · kutu (VariantChip) · yuvarlak (VariantSwatch) · görsel; option-limit {code:selectionLimit}
    │   ├─ option-checkbox · option-color · option-date   onay kutusu + ek ücret · renk seçici · tarih
    │   ├─ option-file                {fileUploadText:TEXT}
    │   └─ option-child               bağlı seçenek: üst seçim işaretlenince açılır
    ├─ pdp-bundle                    {bundleTitle:TEXT} + BundleItem ×3 (set ürünse)
    ├─ pdp-quantity                  QuantitySelector
    ├─ pdp-actions
    │   ├─ add-to-cart-button (clip) {addToCartText:TEXT} / {addingText:TEXT} / {addedText:TEXT} / {outOfStockText:TEXT} / {updateCartText:TEXT} / {updatingCartText:TEXT} (sepeti güncelle · sepet güncelleniyor)
    │   └─ pdp-fav                   FavoriteButton
    ├─ pdp-pay                       PayWithIkas yuvası {showPayWithIkas:BOOLEAN}; iframe'i ikas çizer
    ├─ pdp-back-in-stock             {backInStockTitle:TEXT} + FormField {backInStockPlaceholder:TEXT} + {backInStockButtonText:TEXT} · {backInStockSuccessText:TEXT} · {backInStockLoginText:TEXT} (varyant tükendiyse)
    ├─ pdp-stock-note                {lowStockText:TEXT} + {data:variant.stockCount} text-label mono
    ├─ pdp-stock-locations           {stockLocationsTitle:TEXT} + mağaza ×N {data:stockLocation.name} {data:stockLocation.stock} + {pickupText:TEXT} (teslim noktası tanımlıysa)
    ├─ pdp-offers                    birlikte al: {data:offer.title} text-h4 + offer-card ×2 (OfferCard) {offerInCartText:TEXT} {offerSoldOutText:TEXT}
    │   └─ offers-summary            {data:offers.compareTotal} + {data:offers.total} + {data:offers.discount} + offers-add-button {offersAddText:TEXT}
    ├─ pdp-highlights                {highlights:COMPONENT_LIST}; $color-surface, radius-card; masaüstü yan yana, mobil alt alta
    │   └─ pdp-highlight ×3          {icon:SVG} + {title:TEXT} text-ui + {text:TEXT} text-ui-sm muted
    └─ pdp-accordions                AccordionItem: {descriptionTitle:TEXT} {data:product.description} · {shippingTitle:TEXT} {shippingText:RICH_TEXT}
```

Kontrol: varyant seçili · stok yok · ekleniyor · eklendi · indirimli halleri · birlikte al (varsayılanda görünür) · set ürün · kişiselleştirme · kademeli indirim · ürün grubu · haber ver kaydedildi · haber ver giriş gerekli halleri ayrı frame · galeri gerçek yükseklikte, bilgi sütunu ilk ekranda · sepeti güncelle (editLineID) · sepet güncelleniyor (düğme yükleniyor + updatingCartText) · yükleniyor (iskelet) · mağazada stok halleri ayrı frame; mobilde yapışkan satın alma çubuğunun düğmesi her durumda ana düğmeyle aynı

<!-- anim-targets:start -->
```yaml
- id: I-PDP-01
  section: ProductDetail
  layer: pdp-details
  recipe: M-13
  trigger: scroll
  what: "Bilgi sütunu header altında sabit kalır"
  from: {}
  to: { position: sticky, top: size-header }
  timing: {}
  impl: layout
  mobile: sticky yok
  reducedMotion: aynı
  done: false
- id: I-PDP-02
  section: ProductDetail
  layer: pdp-gallery
  recipe: M-19
  trigger: scroll
  what: "Görünen görsele göre mobil nokta göstergesi güncellenir"
  from: { thumb.border: none, bar.y: 100% }
  to: { thumb.border: color-text, bar.y: 0 }
  timing: { duration: 0.3, bar.spring: spring-soft }
  impl: layout + io-hook
  mobile: yatay galeri + noktalar
  reducedMotion: anında
  done: false
- id: I-PDP-03
  section: ProductDetail
  layer: variant-chip
  via: VariantChip
  recipe: M-28
  trigger: hover
  what: "Çip çerçevesi ve metni koyulaşır"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-PDP-04
  section: ProductDetail
  layer: add-to-cart-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
- id: I-PDP-05
  section: ProductDetail
  layer: pdp-accordions
  via: AccordionItem
  recipe: M-22
  trigger: click
  what: "Akordeon açılır"
  from: { height: 0, icon.rotate: 0 }
  to: { height: auto, icon.rotate: 45 }
  timing: { spring: "bounce 0, 0.5s" }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-PDP-06
  section: ProductDetail
  layer: offer-card
  via: OfferCard
  recipe: M-28
  trigger: click
  what: "Teklif seçilince kart çerçevesi ve onay kutusu koyulaşır, toplam yeniden hesaplanır"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-PDP-07
  section: ProductDetail
  layer: offers-add-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
```
<!-- anim-targets:end -->

#### Section/ProductReviews
- **Kullanıldığı yer:** Ürün detay
- **ikas:** product-reviews-section (IkasCustomerReviewList, customerReviewSettings)
- **Prop'lar:** `title`, `reviewsCountText`, `writeReviewText`, `verifiedText`, `emptyTitle`, `emptyText`, `formTitle`, `ratingLabel`, `reviewTitleLabel`, `reviewTextLabel`, `submitText`, `submittingText`, `successText`, `loginRequiredText` TEXT · `backgroundColor` COLOR · `merchantReplyLabel` TEXT
- **Desktop:** 1440; üst ve alt $space-section, üstte 1px çizgi. Solda 420'lik özet: text-h2 başlık, büyük puan (text-display, mono) + RatingStars + değerlendirme sayısı, 5→1 dağılım çubukları, çerçeveli Yorum yaz butonu. Sağda alt çizgili ReviewCard listesi (3) + çerçeveli Daha fazla yorum butonu.
- **Mobil:** Özet üstte (puan + yıldız + çubuklar + buton), liste altta.

```
product-reviews
├─ reviews-summary
│   ├─ reviews-title                 {title:TEXT} text-h2
│   ├─ reviews-score                 {data:product.stars} text-display mono + RatingStars + {data:product.reviewCount} {reviewsCountText:TEXT}
│   ├─ reviews-bars                  rating-bar ×5 {code:star} + çubuk + {data:review.countByStar}
│   └─ write-review-button           {writeReviewText:TEXT}; çerçeveli Button
├─ reviews-list                      review-card ×3 (ReviewCard): {data:review.title} {data:review.comment} {data:review.author} {data:review.date} {verifiedText:TEXT}
│   ├─ review-images                 yorum görselleri {data:review.images}; tıklayınca ImagePreview
│   ├─ merchant-reply                {merchantReplyLabel:TEXT} + {data:review.reply} (ReviewCard)
│   └─ reviews-pagination            {code:page} numaralı sayfalama
├─ reviews-empty                     {emptyTitle:TEXT} + {emptyText:TEXT}
└─ review-form                       {formTitle:TEXT} + {ratingLabel:TEXT} yıldız seçimi + FormField {reviewTitleLabel:TEXT} {reviewTextLabel:TEXT} + {submitText:TEXT} / {submittingText:TEXT} · {successText:TEXT} · {loginRequiredText:TEXT}
```

Kontrol: yorumlu · boş · yorum formu halleri ayrı frame · yorum için giriş ya da satın alma şartı mağaza ayarından gelir (loginRequiredText)

<!-- anim-targets:start -->
```yaml
- id: I-REV-01
  section: ProductReviews
  layer: review-card
  recipe: M-01
  trigger: inview
  what: "Yorumlar sırayla yukarı belirir"
  from: { y: 16, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.5, ease: ease-out-soft, stagger: 0.06 }
  impl: css-keyframes + io-hook
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-REV-02
  section: ProductReviews
  layer: write-review-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
```
<!-- anim-targets:end -->

#### Section/CartPage
- **Kullanıldığı yer:** Sepet
- **ikas:** cart-section + campaign adjustments, gift lines, coupon, gift card
- **Prop'lar:** `title`, `emptyTitle`, `emptyText`, `emptyButtonText`, `couponPlaceholder`, `couponButtonText`, `couponErrorText`, `couponSuccessText`, `couponRemoveText`, `subtotalLabel`, `shippingLabel`, `totalLabel`, `checkoutText`, `checkoutLoadingText`, `removeText`, `summaryTitle`, `summaryNote`, `recommendTitle` TEXT · `recommendProducts` PRODUCT_LIST · `backgroundColor` COLOR
- **Desktop:** 1440. Başlık text-h2 + mono adet. Solda satır listesi (CartLineItem, alt çizgili, 880); sağda 420'lik `color-surface` özet paneli (radius-card, $space-panel): kupon alanı + buton, ara toplam / kargo / toplam satırları (mono tutarlar), koyu tam genişlik ödeme butonu.
- **Mobil:** Satırlar üstte; özet altta; ödeme butonu alt kenarda sabit.

```
cart-page
├─ cart-title                        {title:TEXT} text-h2 + {data:cart.itemCount} mono
├─ cart-lines                        CartLineItem ×3 (biri indirimli, biri hediye) · satır silme {removeText:TEXT}
├─ cart-empty                        {emptyTitle:TEXT} text-h3 + {emptyText:TEXT} + {emptyButtonText:TEXT}
├─ cart-recommendations              {recommendTitle:TEXT} text-h4 + ProductCardSmall ×4 {recommendProducts:PRODUCT_LIST}
└─ cart-summary
    ├─ coupon-form                   FormField {couponPlaceholder:TEXT} + {couponButtonText:TEXT}
    ├─ coupon-message                {couponErrorText:TEXT} $color-danger | {couponSuccessText:TEXT} $color-success
    ├─ coupon-applied                {data:cart.couponCode} mono + {couponRemoveText:TEXT}
    ├─ summary-rows                  {subtotalLabel:TEXT} {data:cart.subtotal} · {shippingLabel:TEXT} {data:cart.shipping} · {totalLabel:TEXT} {data:cart.total}
    ├─ cart-adjustments              adjustment-row ×N {data:adjustment.name} + {data:adjustment.amount} (kampanya · kupon · hediye çeki)
    └─ checkout-button (clip)        {checkoutText:TEXT} / {checkoutLoadingText:TEXT}
```

Kontrol: boş · dolu · satır güncelleniyor · kupon hatası halleri · dolu halde kampanya satırları, uygulanan kupon ve hediye satırı görünür; boş halde öneriler kalır · yükleniyor (iskelet) hali ayrı frame; adet üst sınırı uyarısı CartLineItem durumunda

<!-- anim-targets:start -->
```yaml
- id: I-CRTP-01
  section: CartPage
  layer: checkout-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
- id: I-CRTP-02
  section: CartPage
  layer: cart-recommendations
  recipe: M-01
  trigger: inview
  what: "Öneri kartları sırayla belirir"
  from: { y: 16, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.4, ease: ease-out-soft, stagger: 0.05 }
  impl: css-keyframes + io-hook
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/Account
- **Kullanıldığı yer:** Hesabım
- **ikas:** account-info-section
- **Prop'lar:** `greetingText`, `infoTabText`, `ordersTabText`, `addressesTabText`, `favoritesTabText`, `logoutText`, `saveText`, `savingText`, `savedText`, `ordersEmptyText`, `addressesEmptyText`, `addAddressText`, `ordersColumnLabels` TEXT, `orderDetailTitle`, `cargoLabel`, `trackingLabel`, `copiedText`, `returnTitle`, `returnButtonText`, `returnSuccessText`, `settingsTabText`, `marketingText`, `phoneLabel`, `deleteAccountText`, `exportDataText`, `errorText`, `retryText`, `editText`, `deleteText`, `makeDefaultText`, `defaultBadgeText`, `confirmDeleteText`, `cancelText`, `addressFormTitle`, `accountDeleteConfirmText`, `passwordLabel` TEXT · `backgroundColor` COLOR
- **Desktop:** 1440. Solda 280'lik dikey Tabs + selamlama; sağda içerik paneli (880): bilgiler formu (2 sütun FormField), sipariş tablosu (mono numara, tarih, durum rozeti, tutar), sipariş detayı, adres kartları (1px çizgi, radius-card).
- **Mobil:** Sekmeler üstte yatay kaydırmalı; içerik tek sütun.

```
account
├─ account-header                    {greetingText:TEXT} + {data:customer.firstName} text-h2
├─ account-tabs                      tab-item ×5: {infoTabText:TEXT} {ordersTabText:TEXT} {addressesTabText:TEXT} {favoritesTabText:TEXT} {logoutText:TEXT}
└─ account-panel
    ├─ info-form                     FormField ×4 + save-button {saveText:TEXT} / {savingText:TEXT} + {savedText:TEXT}
    ├─ orders-list                   {data:order.number} · {data:order.date} · {data:order.status} · {data:order.total}
    ├─ orders-empty                  {ordersEmptyText:TEXT}
    └─ addresses-list                {data:customer.address} + {addAddressText:TEXT} | {addressesEmptyText:TEXT}
    ├─ order-detail                  {orderDetailTitle:TEXT} + {data:order.number} + {data:order.status}
    │   ├─ order-packages            paket ×N: {data:package.status} + {cargoLabel:TEXT} {data:package.cargoCompany} + {trackingLabel:TEXT} {data:package.trackingNumber} kopyala {copiedText:TEXT}
    │   ├─ order-items               satır ×N {data:order.line.title} {data:order.line.price}
    │   ├─ order-addresses           {data:order.shippingAddress} · {data:order.billingAddress}
    │   └─ order-summary             {data:order.subtotal} · indirim satırları · {data:order.total} + {returnButtonText:TEXT} · {subtotalLabel:TEXT}
    ├─ return-form                   {returnTitle:TEXT} + satır seçimi (Checkbox + QuantitySelector) + gönder + {returnSuccessText:TEXT}
    ├─ account-settings              {settingsTabText:TEXT}: {marketingText:TEXT} anahtar · FormField {phoneLabel:TEXT} · {exportDataText:TEXT} · {deleteAccountText:TEXT} (onay adımıyla)
    ├─ address-card-actions          adres kartında {editText:TEXT} · {deleteText:TEXT} · {makeDefaultText:TEXT} + {defaultBadgeText:TEXT} rozeti
    ├─ address-delete-confirm        kart içinde satır içi onay: {confirmDeleteText:TEXT} + {cancelText:TEXT} / {deleteText:TEXT}
    ├─ address-form                  satır içi: {addressFormTitle:TEXT} + FormField ×N {data:addressForm.fields} (ülke → il → ilçe) + kurumsal fatura + varsayılan + {saveText:TEXT} / {cancelText:TEXT} · kurumsal fatura {corporateText:TEXT} · varsayılan {defaultAddressText:TEXT}
    ├─ account-delete-confirm        {deleteAccountText:TEXT} + {accountDeleteConfirmText:TEXT} + FormField {passwordLabel:TEXT} + {cancelText:TEXT}
    └─ orders-error                  {errorText:TEXT} + {retryText:TEXT}
```

Kontrol: her sekme ayrı durum frame'i · siparişler boş hali · sipariş detayı · iade talebi · hesap ayarları · yükleniyor (iskelet) · hata · adres ekle · adres sil onayı · hesap silme onayı halleri ayrı frame; formlar ve silme düğmeleri tema stiliyle

<!-- anim-targets:start -->
```yaml
- id: I-ACC-01
  section: Account
  layer: tab-item
  via: Tabs
  recipe: M-28
  trigger: hover
  what: "Sekme rengi muted → metin"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/AuthForms
- **Kullanıldığı yer:** Giriş, kayıt, şifremi unuttum, şifre yenile
- **ikas:** login-section, register-section, forgot-password-section, recover-password-section
- **Prop'lar:** `variant` ENUM · `image` IMAGE · `loginTitle`, `registerTitle`, `forgotTitle`, `recoverTitle`, `loginText`, `registerText`, `forgotText`, `recoverText`, `submitText`, `submittingText`, `emailLabel`, `passwordLabel`, `firstNameLabel`, `lastNameLabel`, `consentText`, `marketingConsentText`, `agreementConsentText`, `socialDividerText`, `googleText`, `facebookText`, `smsLoginText`, `phoneLabel`, `codeLabel`, `resendCodeText`, `successText`, `errorText`, `invalidTokenText`, `switchText` TEXT · `backgroundColor` COLOR
- **Desktop:** 1440 × 760. Sol yarı siyah-beyaz görsel (720, kenar boşluksuz); sağ yarıda ortalı 400'lük form: text-h2 başlık, text-body açıklama, alanlar, koyu tam genişlik Button, alt link.
- **Mobil:** Görsel gizli; form tam genişlik, üst 48.
- **Yalnız masaüstü katmanlar:** `auth-media`

```
auth-forms
    │   ├─ social-login              SocialLoginButton ×2 {googleText:TEXT} {facebookText:TEXT} + {socialDividerText:TEXT} ayraç
    │   ├─ sms-login                 {smsLoginText:TEXT} · FormField {phoneLabel:TEXT} → FormField {codeLabel:TEXT} + {resendCodeText:TEXT}
    │   ├─ register-consents         kayıtta iki ayrı Checkbox: {marketingConsentText:TEXT} · {agreementConsentText:TEXT}
├─ auth-media                        {image:IMAGE}
└─ auth-panel
    ├─ auth-title                    {loginTitle:TEXT} | {registerTitle:TEXT} | {forgotTitle:TEXT} | {recoverTitle:TEXT} text-h2
    ├─ auth-text                     {loginText:TEXT} | {registerText:TEXT} | {forgotText:TEXT} | {recoverText:TEXT} text-body muted
    ├─ auth-form
    │   ├─ auth-name-stage           kayıtta görünür: FormField {firstNameLabel:TEXT} {lastNameLabel:TEXT}
    │   ├─ email-field · password-field   FormField {emailLabel:TEXT} {passwordLabel:TEXT}
    │   └─ auth-extra-stage          kayıtta Checkbox {consentText:TEXT}; şifre yenilede tekrar alanı
    ├─ auth-button (clip)            {submitText:TEXT} / {submittingText:TEXT}; koyu Button
    ├─ auth-message                  {successText:TEXT} $color-success | {errorText:TEXT} $color-danger | {invalidTokenText:TEXT}
    └─ auth-switch                   {switchText:TEXT} + link
```

Kontrol: 4 varyant × (varsayılan, alan hatası) frame'i; şifremi unuttum başarılı; şifre yenile geçersiz bağlantı · SMS telefon · SMS kod halleri ayrı frame; kayıt halinde iki ayrı onay

<!-- anim-targets:start -->
```yaml
- id: I-AUTH-01
  section: AuthForms
  layer: auth-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
- id: I-AUTH-02
  section: AuthForms
  layer: auth-message
  recipe: M-01
  trigger: state-change
  what: "Mesaj belirir"
  from: { y: 8, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/NotFound
- **Kullanıldığı yer:** 404
- **ikas:** not-found-section
- **Prop'lar:** `title`, `text`, `buttonText` TEXT · `buttonLink` LINK · `backgroundColor` COLOR
- **Desktop:** 1440 × 560. Sola yaslı: dev `404` (text-display × Counter, 00'dan yuvarlanır), text-h2 başlık, text-body muted metin, koyu Button. Altında ProductGrid öneri satırı ayrı section.
- **Mobil:** 390; aynı sıra, 404 text-display mobil.

```
not-found
├─ not-found-code                    {code:statusCode} text-display; Counter
├─ not-found-title                   {title:TEXT} text-h2
├─ not-found-text                    {text:TEXT} text-body muted
└─ not-found-button (clip)           {buttonText:TEXT} {buttonLink:LINK}; koyu Button
```

Kontrol: 404 haneleri sabit genişlikte

<!-- anim-targets:start -->
```yaml
- id: I-NF-01
  section: NotFound
  layer: not-found-code
  via: Counter
  recipe: I-M-01
  trigger: load
  what: "404 hane hane yuvarlanır"
  from: { value: 000 }
  to: { value: 404 }
  timing: { duration: 0.6, ease: ease-out-soft, stagger: 0.04, direction: sağdan-sola }
  impl: animejs + io-hook
  mobile: aynı
  reducedMotion: anında son değer
  done: false
- id: I-NF-02
  section: NotFound
  layer: not-found-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
```
<!-- anim-targets:end -->

#### Section/EmailVerification
- **Kullanıldığı yer:** E-posta doğrulama
- **ikas:** email-verification-section
- **Prop'lar:** `verifyingText`, `successTitle`, `successText`, `errorTitle`, `errorText`, `buttonText`, `resendTitle`, `resendButtonText`, `resendSuccessText` TEXT · `backgroundColor` COLOR
- **Desktop:** 1440 × 520; ortalı 440'lık blok: durum ikonu (Spinner / onay / uyarı), text-h3 başlık, text-body metin, koyu Button.
- **Mobil:** 390; aynı.

```
email-verification
├─ verify-icon                       Spinner | onay ($color-success) | uyarı ($color-danger)
├─ verify-title                      {verifyingText:TEXT} | {successTitle:TEXT} | {errorTitle:TEXT} text-h3
├─ verify-text                       {successText:TEXT} | {errorText:TEXT} text-body muted
└─ verify-button (clip)              {buttonText:TEXT}; koyu Button
└─ resend-form                       hata halinde: {resendTitle:TEXT} + FormField + {resendButtonText:TEXT} · {resendSuccessText:TEXT}
```

Kontrol: doğrulanıyor · başarılı · hata (tekrar gönder formu) halleri

<!-- anim-targets:start -->
```yaml
- id: I-EMV-01
  section: EmailVerification
  layer: verify-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
```
<!-- anim-targets:end -->

#### Section/BlogList
- **Kullanıldığı yer:** Blog
- **ikas:** blog-home-section
- **Prop'lar:** `title`, `subtitle`, `allTabText`, `loadMoreText`, `emptyText` TEXT · `blogs` BLOG_LIST · `categories` BLOG_CATEGORY_LIST · `backgroundColor` COLOR
- **Desktop:** 1440. Sola yaslı SectionHeading (text-h2), altında yatay Tabs (kategoriler). İlk yazı geniş (2 sütun, görsel 16:9), diğerleri 3 sütun BlogCard, aralık 24. Altta çerçeveli daha fazla butonu.
- **Mobil:** Tek sütun; sekmeler yatay kaydırmalı.

```
blog-list
├─ section-heading                   SectionHeading sola yaslı
│   ├─ section-title                 {title:TEXT} text-h2
│   └─ section-subtitle              {subtitle:TEXT} text-body muted
├─ blog-tabs                         tab-item: {allTabText:TEXT} + {data:blog.category} ×N
├─ blog-grid                         {blogs:BLOG_LIST} {categories:BLOG_CATEGORY_LIST}
│   └─ BlogCard ×7                   blog-card-title {data:blog.title} · {data:blog.date}
├─ blog-empty                        {emptyText:TEXT}
└─ blog-more-button (clip)           {loadMoreText:TEXT}; çerçeveli Button
```

Kontrol: dolu ve kategori boş halleri

<!-- anim-targets:start -->
```yaml
- id: I-BLOG-01
  section: BlogList
  layer: blog-grid
  recipe: M-01
  trigger: inview
  what: "Kartlar sırayla girer"
  from: { y: 40, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.5, ease: ease-standard, stagger: 0.06 }
  impl: animejs + io-hook
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-BLOG-02
  section: BlogList
  layer: tab-item
  via: Tabs
  recipe: M-28
  trigger: hover
  what: "Sekme rengi muted → metin"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/BlogPost
- **Kullanıldığı yer:** Blog yazısı
- **ikas:** blog-post-section
- **Prop'lar:** `backLinkText`, `shareText` TEXT · `backgroundColor` COLOR
- **Desktop:** 1440. Ortalı 720'lik okuma sütunu: geri linki, mono meta (kategori · tarih · yazar), text-h2 başlık; kapak görseli 1376 × 640 (radius-card); gövde 720, text-body 1.6 satır, ara başlıklar text-h4.
- **Mobil:** Sütun tam genişlik; kapak 4:3.

```
blog-post
├─ link                              {backLinkText:TEXT}
├─ post-meta                         {data:blog.category} · {data:blog.date} · {data:blog.author} text-label mono
├─ post-title                        {data:blog.title} text-h2
├─ post-cover                        blog kapak görseli, radius-card
├─ post-body                         blog içeriği (zengin metin)
└─ post-share                        {shareText:TEXT} + ikonlar
```

Kontrol: uzun Türkçe başlık 3 satıra kadar taşmadan kırılıyor

<!-- anim-targets:start -->
```yaml
- id: I-BLP-01
  section: BlogPost
  layer: post-title
  recipe: M-01
  trigger: load
  what: "Başlık ve meta yukarı belirir"
  from: { y: 40, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.5, ease: ease-standard, delay: 0.2 }
  impl: css-keyframes
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-BLP-02
  section: BlogPost
  layer: link
  via: ArrowLink
  recipe: M-10
  trigger: hover
  what: "Ok kayar, alt çizgi uzar"
  from: { line.width: 0%, arrow: top }
  to: { line.width: 100%, arrow: bottom }
  timing: { duration: 0.4, spring: spring-soft }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/BlogRelated
- **Kullanıldığı yer:** Blog yazısı
- **ikas:** blog-home-section (kart düzeni)
- **Prop'lar:** `title` TEXT · `blogs` BLOG_LIST · `backgroundColor` COLOR
- **Desktop:** 1440; üst $space-section; sola yaslı text-h2 başlık + 3 BlogCard.
- **Mobil:** Yatay kaydırmalı kartlar (300).

```
blog-related
├─ related-title                     {title:TEXT} text-h2
└─ related-grid                      {blogs:BLOG_LIST}
    └─ BlogCard ×3
```

<!-- anim-targets:start -->
```yaml
- id: I-BREL-01
  section: BlogRelated
  layer: related-grid
  recipe: M-01
  trigger: inview
  what: "Kartlar sırayla girer"
  from: { y: 40, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.5, ease: ease-standard, stagger: 0.06 }
  impl: animejs + io-hook
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/StoreList
- **Kullanıldığı yer:** Mağazalar
- **ikas:** (özel)
- **Prop'lar:** `title`, `subtitle`, `mapLinkText`, `hoursLabel` TEXT · `stores` COMPONENT_LIST (StoreItem: image IMAGE, name TEXT, address TEXT, hours TEXT, mapLink LINK) · `backgroundColor` COLOR
- **Desktop:** 1440; üst $space-section. SectionHeading ortalı; 3 sütun mağaza kartı (442): görsel 4:3 radius-card, text-h4 ad, adres, saatler, ArrowLink. Kartlar arasında 1px dikey çizgi yok; aralık 24.
- **Mobil:** Tek sütun.

```
store-list
├─ section-heading                   SectionHeading
│   ├─ section-title                 {title:TEXT} text-h2
│   └─ section-subtitle              {subtitle:TEXT} text-body muted
└─ store-grid                        {stores:COMPONENT_LIST}
    └─ store-card ×3
        ├─ store-media               {image:IMAGE} radius-card
        ├─ store-name                {name:TEXT} text-h4
        ├─ store-address             {address:TEXT} text-body muted
        ├─ store-hours               {hoursLabel:TEXT} + {hours:TEXT} text-ui-sm
        └─ link                      {mapLinkText:TEXT} {mapLink:LINK}
```

Kontrol: adres ve saat satırları aynı hizada

<!-- anim-targets:start -->
```yaml
- id: I-STOR-01
  section: StoreList
  layer: store-grid
  recipe: M-01
  trigger: inview
  what: "Kartlar sırayla girer"
  from: { y: 40, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.5, ease: ease-standard, stagger: 0.08 }
  impl: animejs + io-hook
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-STOR-02
  section: StoreList
  layer: link
  via: ArrowLink
  recipe: M-10
  trigger: hover
  what: "Ok kayar, alt çizgi uzar"
  from: { line.width: 0%, arrow: top }
  to: { line.width: 100%, arrow: bottom }
  timing: { duration: 0.4, spring: spring-soft }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/ContactForm
- **Kullanıldığı yer:** İletişim (özel sayfa)
- **ikas:** (özel; form-handling + getContactForm / setContactForm* / submitContactForm; konu ve sipariş no mesajın başına eklenir, dosya eki yok)
- **Prop'lar:** `title`, `intro`, `responseText`, `formTitle`, `topicLabel`, `firstNameLabel`, `lastNameLabel`, `emailLabel`, `phoneLabel`, `orderLabel`, `messageLabel`, `messagePlaceholder`, `consentText`, `submitText`, `submittingText`, `successText`, `errorText`, `socialTitle` TEXT · `topics` COMPONENT_LIST (ContactTopic: label TEXT) · `channels` COMPONENT_LIST (ContactChannel: icon SVG, value TEXT, hint TEXT, link LINK, dark BOOLEAN) · `socialLinks` COMPONENT_LIST (SocialLink) · `backgroundColor` COLOR
- **Desktop:** 1440; üst 64, alt $space-section. Üstte iki sütunlu açılış: solda iki satırlık text-display başlık (880), sağda 420'lik açıklama + yanıt süresi hapı (yeşil nokta). Altında 24 aralıkla: solda 880'lik form kartı (1px çizgi, radius-card, padding 40): text-h3 form başlığı, konu çipleri (seçili = koyu), Ad · Soyad, E-posta · Telefon, Sipariş numarası, 160'lık mesaj, altta onay + gönder butonu yan yana, sonuç mesajı. Sağda 472'lik kanal sütunu: e-posta ve telefon kartları (yüzey), WhatsApp kartı (koyu), sosyal kartı (çizgili). Kanal kartlarında değer başlık, açıklama altında; üstte etiket yok (kural 11).
- **Mobil:** Başlık text-display mobil (3 satır), açıklama ve hap altta; form kartı tam genişlik (alanlar alt alta, konu çipleri yatay kaydırmalı `topic-track`), kanal kartları formun altında.

```
contact-form-section
├─ contact-hero
│   ├─ contact-title                 {title:TEXT} text-display, iki satır
│   └─ contact-intro                 {intro:TEXT} text-body muted + response-pill {responseText:TEXT}
└─ contact-body
    ├─ contact-panel                 1px çizgi, radius-card
    │   ├─ contact-form-title        {formTitle:TEXT} text-h3
    │   ├─ topic-group               {topicLabel:TEXT} + {topics:COMPONENT_LIST}
    │   │   └─ topic-chip ×6         {label:TEXT}; seçili koyu
    │   ├─ contact-row ×3            FormField {firstNameLabel:TEXT} {lastNameLabel:TEXT} {emailLabel:TEXT} {phoneLabel:TEXT} {orderLabel:TEXT}
    │   ├─ contact-message-field     FormField {messageLabel:TEXT} {messagePlaceholder:TEXT}; 160
    │   ├─ contact-submit-row        Checkbox {consentText:TEXT} + contact-button
    │   │   └─ contact-button (clip) {submitText:TEXT} / {submittingText:TEXT}; koyu Button
    │   └─ contact-message           {successText:TEXT} $color-success | {errorText:TEXT} $color-danger
    └─ contact-channels              {channels:COMPONENT_LIST}
        ├─ contact-channel ×3        {icon:SVG} + {value:TEXT} text-h4 + {hint:TEXT} text-ui-sm + {link:LINK}
        └─ contact-social            {socialTitle:TEXT} + {socialLinks:COMPONENT_LIST}
```

Kontrol: varsayılan · gönderiliyor · başarılı · hata durum frame'leri · geniş form kartı (dar tek sütun değil) · kanal kartlarında üstte etiket yok (kural 11)

<!-- anim-targets:start -->
```yaml
- id: I-CONT-01
  section: ContactForm
  layer: contact-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
- id: I-CONT-02
  section: ContactForm
  layer: contact-message
  recipe: M-01
  trigger: state-change
  what: "Sonuç mesajı belirir"
  from: { y: 8, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.3, ease: ease-standard }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-CONT-03
  section: ContactForm
  layer: contact-channel
  recipe: M-28
  trigger: hover
  what: "Kart zemini koyulaşır, ok sağ üste kayar"
  from: { bg: color-surface, arrow.x: 0 }
  to: { bg: color-line, arrow.x: 2 }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-CONT-04
  section: ContactForm
  layer: topic-chip
  recipe: M-28
  trigger: click
  what: "Seçilen konu koyu dolguya geçer"
  from: { bg: transparent, color: color-text }
  to: { bg: color-inverse-bg, color: color-inverse-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/StoreLocator
- **Kullanıldığı yer:** İletişim
- **ikas:** (özel)
- **Prop'lar:** `title`, `text`, `allStoresText`, `directionsText`, `openNowText`, `closedText` TEXT · `allStoresLink` LINK · `stores` COMPONENT_LIST (StoreItem: image IMAGE, name TEXT, district TEXT, address TEXT, hours TEXT, statusNote TEXT, mapLink LINK) · `backgroundColor` COLOR
- **Desktop:** 1440; üst $space-section. Başlık satırı: solda text-h2 başlık + altında açıklama, sağda çerçeveli "tüm mağazalar" butonu. Altında 520 yüksekliğinde iki parça: solda 880'lik öne çıkan mağaza görseli (radius-card), sol altta bilgi kartı (ad + açık rozeti, adres, saat, yol tarifi butonu); sağda mağaza listesi (4 satır, seçili satır yüzey renkli, diğerleri çizgili; ad + semt, adres, sağda durum + ok butonu).
- **Mobil:** Başlık ve buton alt alta; görsel 358 × 260, bilgi kartı görselin altında; liste tek sütun.

```
store-locator
├─ locator-head                      {title:TEXT} text-h2 + {text:TEXT} + {allStoresText:TEXT} {allStoresLink:LINK}
└─ locator-body
    ├─ store-feature                 {image:IMAGE} radius-card
    │   └─ store-feature-card        {name:TEXT} + {openNowText:TEXT} rozet · {address:TEXT} · {hours:TEXT} · {directionsText:TEXT} {mapLink:LINK}
    └─ store-rows                    {stores:COMPONENT_LIST}
        └─ store-row ×4              {name:TEXT} {district:TEXT} · {address:TEXT} · {code:storeStatus} · ok butonu · kapalıysa {closedText:TEXT}
```

Kontrol: seçili satır ve görsel aynı mağaza · durum metni kodda saatlerden hesaplanır

<!-- anim-targets:start -->
```yaml
- id: I-LOC-01
  section: StoreLocator
  layer: store-row
  recipe: M-28
  trigger: click
  what: "Seçilen satır yüzey rengine geçer, ok butonu koyulaşır"
  from: { color: color-muted }
  to: { color: color-text }
  timing: { duration: 0.3 }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
- id: I-LOC-02
  section: StoreLocator
  layer: store-feature
  recipe: M-02
  trigger: state-change
  what: "Seçilen mağazanın görseli yumuşakça değişir"
  from: { opacity: 0 }
  to: { opacity: 1 }
  timing: { duration: 0.5, ease: ease-standard }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/FaqList
- **Kullanıldığı yer:** İletişim
- **ikas:** (özel; rich-text yerine akordeon)
- **Prop'lar:** `title`, `text` TEXT · `items` COMPONENT_LIST (FaqItem: question TEXT, answer RICH_TEXT) · `backgroundColor` COLOR
- **Desktop:** 1440; üst $space-section, alt $space-section. Solda 420'lik sütun: text-h2 başlık + altında kısa açıklama; sağda akordeon listesi (ilki açık, diğerleri kapalı).
- **Mobil:** Başlık ve açıklama üstte, akordeon tam genişlik.

```
faq-list
├─ faq-intro                         {title:TEXT} text-h2 + {text:TEXT} text-body muted
└─ faq-items                         {items:COMPONENT_LIST}
    └─ AccordionItem ×5              {question:TEXT} + {answer:RICH_TEXT}
```

Kontrol: ilk soru açık

<!-- anim-targets:start -->
```yaml
- id: I-FAQ-01
  section: FaqList
  layer: faq-items
  via: AccordionItem
  recipe: M-22
  trigger: click
  what: "Soru açılır, artı döner"
  from: { height: 0, icon.rotate: 0 }
  to: { height: auto, icon.rotate: 45 }
  timing: { spring: "bounce 0, 0.5s" }
  impl: css-transition
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/RichText
- **Kullanıldığı yer:** Hakkımızda, KVKK, iade politikası (özel sayfa)
- **ikas:** rich-text-section
- **Prop'lar:** `title`, `updatedText` TEXT · `content` RICH_TEXT · `showToc` BOOLEAN · `backgroundColor` COLOR
- **Desktop:** 1440; üst $space-section. Solda 280 içindekiler listesi (başlıklar), sağda 760 metin sütunu: text-h2 başlık, mono güncelleme tarihi, h3 ara başlıklar, paragraf, liste, link.
- **Mobil:** İçindekiler üstte açılır liste, metin tek sütun.
- **Yalnız masaüstü katmanlar:** `rich-toc-item`

```
rich-text
├─ rich-toc                          {code:headings} başlık listesi
├─ rich-title                        {title:TEXT} text-h2
├─ rich-meta                         {updatedText:TEXT} text-label mono
└─ rich-body                         {content:RICH_TEXT}: h3 · paragraf · liste · link
```

Kontrol: uzun metin okunurluğu: satır 760, satır aralığı 1.6

<!-- anim-targets:start -->
```yaml
- id: I-TXT-01
  section: RichText
  layer: rich-title
  recipe: M-01
  trigger: inview
  what: "Başlık yukarı belirir"
  from: { y: 40, opacity: 0 }
  to: { y: 0, opacity: 1 }
  timing: { duration: 0.5, ease: ease-standard, delay: 0.2 }
  impl: css-keyframes
  mobile: aynı
  reducedMotion: anında
  done: false
```
<!-- anim-targets:end -->

#### Section/OrderTracking
- **Kullanıldığı yer:** Sipariş takibi (özel sayfa)
- **ikas:** (özel) getOrderByEmail + order detail patterns
- **Prop'lar:** `title`, `text`, `emailLabel`, `orderNumberLabel`, `submitText`, `submittingText`, `notFoundText`, `statusTitle` TEXT · `backgroundColor` COLOR
- **Desktop:** 1440; solda form (e-posta + sipariş no + buton), sağda sonuç: durum adımları, kargo ve takip no, ürün satırları.
- **Mobil:** Form üstte, sonuç altta.

```
order-tracking
├─ tracking-intro                    {title:TEXT} text-h2 + {text:TEXT}
├─ tracking-form                     FormField {emailLabel:TEXT} {orderNumberLabel:TEXT} + tracking-button {submitText:TEXT} / {submittingText:TEXT}
├─ tracking-result                   {statusTitle:TEXT} + adım ×4 {data:order.status} + {data:package.trackingNumber} + satır ×N
└─ tracking-not-found                {notFoundText:TEXT}
```

Kontrol: boş · sonuç · bulunamadı halleri

<!-- anim-targets:start -->
```yaml
- id: I-TRK-01
  section: OrderTracking
  layer: tracking-button
  via: Button
  recipe: M-11
  trigger: hover
  what: "Buton dolgusu ters döner"
  from: { bottom.y: 100% }
  to: { bottom.y: 0, top.y: -100% }
  timing: { spring: "bounce 0.3, 0.4s" }
  impl: css-transition
  mobile: kapalı
  reducedMotion: anında renk değişimi
  done: false
```
<!-- anim-targets:end -->

### 6.3 Sayfalar

Her sayfa için `I/Page/<Ad>@desktop` ve `@mobile`: dikey layout, `clip: true`, çocukları yalnızca section instance'ları.

| Sayfa | Bölümler (sırayla) | ikas sayfa tipi |
|---|---|---|
| `Home` | Header · HeroSlider · ProductGrid · ActivityGrid · StoreSpotlight · Bestsellers · CollectionMosaic · Footer (koyu, bülten CTA'sı içinde; sıra dönüşümlü: ürün → görsel şerit → teklif → sıralı liste → mozaik) | `INDEX` |
| `Category` | Header · ProductList · Footer | `CATEGORY` |
| `Collection` | Header · CollectionHero · ProductList · Footer | `COLLECTION` |
| `Product` | Header · ProductDetail · ProductReviews · ProductGrid (birlikte alınanlar) · ProductGrid (son baktıkların) · Footer | `PRODUCT_DETAIL` |
| `Cart` | Header · CartPage · Footer | `CART` |
| `Account` | Header · Account · Footer | `ACCOUNT` |
| `Auth (×4)` | Header · AuthForms · Footer | `LOGIN`, `REGISTER`, `FORGOT_PASSWORD`, `RECOVER_PASSWORD` |
| `NotFound` | Header · NotFound · ProductGrid (öneriler) · Footer | `NOT_FOUND` |
| `Search` | Header · ProductList (arama modu) · Footer | `SEARCH` |
| `Favorites` | Header · ProductList (favori modu) · Footer | `FAVORITES` |
| `Blog` | Header · BlogList · Footer | `BLOG` |
| `BlogPost` | Header · BlogPost · BlogRelated · Footer | `BLOG_POST` |
| `EmailVerification` | Header · EmailVerification · Footer | `CUSTOMER_EMAIL_VERIFICATION` |
| `Stores` | Header · StoreSpotlight · StoreList · Footer | `CUSTOM` |
| `Contact` | Header · ContactForm · StoreLocator · FaqList · Footer | `CUSTOM` |
| `Policy` | Header · RichText · Footer | `CUSTOM` |
| `OrderTracking` | Header · OrderTracking · Footer | `CUSTOM` |
| `OrderDetail` | Header · Account · Footer (sipariş detayı hali) | `ORDER_DETAIL` |

### 6.4 Overlay frame'leri

6.2'de "Overlay" başlıklı her öğe için, yarı saydam bir sayfa görüntüsü yerine düz `$color-scrim` zemin üzerinde panel çizilir. Her biri desktop (1440×900) ve mobil (390×844), belirtilen durumlarıyla ayrı kök frame.

Çizilecek overlay kök frame'leri (her durum ayrı frame, ad sonuna ` — <durum>`):
- `I/Overlay/MenuOverlay@desktop — <durum>`
- `I/Overlay/MenuOverlay@mobile — <durum>`
- `I/Overlay/CartDrawer@desktop — <durum>`
- `I/Overlay/CartDrawer@mobile — <durum>`
- `I/Overlay/SearchOverlay@desktop — <durum>`
- `I/Overlay/SearchOverlay@mobile — <durum>`
- `I/Overlay/CookieBar@desktop — <durum>`
- `I/Overlay/CookieBar@mobile — <durum>`
- `I/Overlay/LocaleSwitcher@desktop — <durum>`
- `I/Overlay/LocaleSwitcher@mobile — <durum>`
- `I/Overlay/ImagePreview@desktop — <durum>`
- `I/Overlay/ImagePreview@mobile — <durum>`
- `I/Overlay/QuickBuy@desktop — <durum>`
- `I/Overlay/QuickBuy@mobile — <durum>`
- `I/Overlay/FilterDrawer@mobile — <durum>`

### 6.5 Motion States

Aşağıdaki tariflerin her biri için **bir** örnek üzerinde 2–3 kare çizilir (kök frame `I/Motion/<tarif> <bölüm>`; kareler soldan sağa, altlarında `note` ile yüzde/an bilgisi). Diğer kullanım yerleri aynı mantığı izler.

| Tarif | Örnek bölüm | Çizilecek kareler |
|---|---|---|
| M-03 | HeroSlider (`hero-title`) | başlık: kelimeler maske altında (görünmez) → yarısı girmiş → hepsi yerinde |
| M-06 | MenuOverlay (`menu-panel`) | megamenu: kapalı → yarı açık → açık |
| M-07 | HeroSlider (`hero-slides`) | slayt geçişi: eski slayt → maske %50 (iki görsel yan yana) → yeni slayt |
| M-09 | ProductGrid (`image-back`) | ürün kartı: ön görsel → arka görsel + dönmüş ok |
| M-11 | CartDrawer (`checkout-button`) | buton: varsayılan → dolgu yarı yolda → ters dolgu |
| M-20 | CartDrawer (`cart-drawer`) | çekmece: kapalı (sayfa) → yarı açık + scrim → açık |
| M-21 | SearchOverlay (`search-panel`) | arama: kapalı → açık boş → açık sonuçlu |
| M-22 | FilterDrawer (`filter-group`) | akordeon: kapalı → açık |
| I-M-01 | Header (`countdown-value`) | hane: eski rakam → yarı kaymış (iki rakam görünür) → yeni rakam |
| I-M-02 | CollectionMosaic (`tile-image-mono`) | karo: siyah-beyaz → renkli + %5 büyük |
| I-M-04 | ActivityGrid (`activity-row`) | kartlar: hepsi kapalı → ilk ikisi açık, üçüncüsü yolda → hepsi açık |
| I-M-05 | ActivityGrid (`activity-card`) | şerit: eşit kartlar → ilk kart açık → imlecin altındaki kart açık |
| I-M-06 | CollectionMosaic (`collection-tile`) | sütun: kısa/uzun → üst karo uzadı, alt daraldı → alt karo uzadı, üst daraldı |

## 7. Animasyon hedefleri özeti

Toplam **108 hedef**. Ayrıntılar 6.1 ve 6.2'deki `anim-targets` bloklarında.

| Bölüm | Hedef | Tarifler | ID aralığı |
|---|---|---|---|
| Header | 4 | M-28, I-M-01 | `I-HDR-01` … `I-HDR-04` |
| MenuOverlay | 2 | M-01, M-06 | `I-MENU-01` … `I-MENU-02` |
| CartDrawer | 4 | M-10, M-11, M-20 | `I-CART-01` … `I-CART-04` |
| SearchOverlay | 3 | M-01, M-10, M-21 | `I-SRCH-01` … `I-SRCH-03` |
| CookieBar | 1 | M-20 | `I-CKE-01` … `I-CKE-01` |
| LocaleSwitcher | 1 | M-06 | `I-LCL-01` … `I-LCL-01` |
| ImagePreview | 1 | M-02 | `I-PREV-01` … `I-PREV-01` |
| Footer | 4 | M-01, M-11, M-28 | `I-FTR-01` … `I-FTR-04` |
| HeroSlider | 7 | M-01, M-02, M-03, M-07, M-11, M-27, I-M-01 | `I-HERO-01` … `I-HERO-07` |
| ProductGrid | 4 | M-01, M-09, M-11 | `I-GRID-01` … `I-GRID-04` |
| ActivityGrid | 4 | M-01, M-10, I-M-04, I-M-05 | `I-ACT-01` … `I-ACT-04` |
| StoreSpotlight | 3 | M-01, M-11, I-M-01 | `I-SPOT-01` … `I-SPOT-03` |
| Bestsellers | 7 | M-01, M-02, M-10, M-28 | `I-BEST-01` … `I-BEST-07` |
| QuickBuy | 5 | M-02, M-10, M-11, M-20, M-28 | `I-QB-01` … `I-QB-05` |
| CollectionMosaic | 5 | M-01, M-11, I-M-02, I-M-06 | `I-MOS-01` … `I-MOS-05` |
| ProductList | 3 | M-01, M-11, M-18 | `I-PLP-01` … `I-PLP-03` |
| FilterDrawer | 2 | M-20, M-22 | `I-FILT-01` … `I-FILT-02` |
| CollectionHero | 1 | M-01 | `I-COLL-01` … `I-COLL-01` |
| ProductDetail | 7 | M-11, M-13, M-19, M-22, M-28 | `I-PDP-01` … `I-PDP-07` |
| ProductReviews | 2 | M-01, M-11 | `I-REV-01` … `I-REV-02` |
| CartPage | 2 | M-01, M-11 | `I-CRTP-01` … `I-CRTP-02` |
| Account | 1 | M-28 | `I-ACC-01` … `I-ACC-01` |
| AuthForms | 2 | M-01, M-11 | `I-AUTH-01` … `I-AUTH-02` |
| NotFound | 2 | M-11, I-M-01 | `I-NF-01` … `I-NF-02` |
| EmailVerification | 1 | M-11 | `I-EMV-01` … `I-EMV-01` |
| BlogList | 2 | M-01, M-28 | `I-BLOG-01` … `I-BLOG-02` |
| BlogPost | 2 | M-01, M-10 | `I-BLP-01` … `I-BLP-02` |
| BlogRelated | 1 | M-01 | `I-BREL-01` … `I-BREL-01` |
| StoreList | 2 | M-01, M-10 | `I-STOR-01` … `I-STOR-02` |
| ContactForm | 4 | M-01, M-11, M-28 | `I-CONT-01` … `I-CONT-04` |
| StoreLocator | 2 | M-02, M-28 | `I-LOC-01` … `I-LOC-02` |
| FaqList | 1 | M-22 | `I-FAQ-01` … `I-FAQ-01` |
| RichText | 1 | M-01 | `I-TXT-01` … `I-TXT-01` |
| OrderTracking | 1 | M-11 | `I-TRK-01` … `I-TRK-01` |
| Sub/ProductCard | 2 | M-09, M-28 | `I-CMP-01` … `I-CMP-02` |
| Sub/ProductCardSmall | 1 | M-28 | `I-CMP-03` … `I-CMP-03` |
| Sub/BlogCard | 1 | M-09 | `I-CMP-04` … `I-CMP-04` |
| Sub/Button | 1 | M-11 | `I-CMP-05` … `I-CMP-05` |
| Sub/ArrowLink | 1 | M-10 | `I-CMP-06` … `I-CMP-06` |
| Sub/FavoriteButton | 1 | I-M-03 | `I-CMP-07` … `I-CMP-07` |
| Sub/Counter | 1 | I-M-01 | `I-CMP-08` … `I-CMP-08` |
| Sub/Tabs | 1 | M-28 | `I-CMP-09` … `I-CMP-09` |
| Sub/VariantChip | 1 | M-28 | `I-CMP-10` … `I-CMP-10` |
| Sub/AccordionItem | 1 | M-22 | `I-CMP-11` … `I-CMP-11` |
| Sub/SectionHeading | 1 | M-01 | `I-CMP-12` … `I-CMP-12` |
| Sub/OfferCard | 1 | M-28 | `I-CMP-13` … `I-CMP-13` |
| Sub/VariantSwatch | 1 | M-28 | `I-CMP-14` … `I-CMP-14` |

| Tarif | Kullanım | Uygulama yolu |
|---|---|---|
| M-01 | 24 | css-keyframes |
| M-02 | 5 | css-keyframes |
| M-03 | 1 | animejs + io-hook |
| M-06 | 2 | css-transition |
| M-07 | 1 | animejs |
| M-09 | 3 | css-transition |
| M-10 | 8 | css-transition |
| M-11 | 18 | css-transition |
| M-13 | 1 | layout |
| M-18 | 1 | layout + css-transition |
| M-19 | 1 | layout + io-hook |
| M-20 | 5 | css-transition + animejs |
| M-21 | 1 | css-transition |
| M-22 | 4 | css-transition |
| M-27 | 1 | scroll-scrub |
| M-28 | 21 | css-transition |
| I-M-01 | 6 | animejs + io-hook |
| I-M-02 | 1 | css-transition |
| I-M-03 | 1 | css-keyframes |
| I-M-04 | 1 | animejs + io-hook |
| I-M-05 | 1 | css-transition |
| I-M-06 | 1 | css-transition |

## 8. Aktarım sonrası: animasyon üretimi

Tasarım ikas'a aktarıldıktan (statik hali çalışır olduktan) sonra bu bölüm uygulanır.

**1) Hedefleri topla.** Bu dosyadaki tüm `anim-targets` bloklarını tek listeye çıkar:

```bash
python3 - <<'EOF'
import re, sys
src = open("docs/pendev/plan-I-ismail.md", encoding="utf-8").read()
blocks = re.findall(r"<!-- anim-targets:start -->\s*```yaml\n(.*?)```", src, re.S)
items = re.split(r"\n(?=- id: )", "\n".join(blocks).strip())
for it in items:
    get = lambda k: (re.search(r"^\s*-?\s*%s: (.*)$" % k, it, re.M) or [None, ""])[1]
    print(get("id"), get("section"), get("layer"), get("recipe"), get("impl"), sep=" | ")
EOF
```

**2) Tasarımla karşılaştır.** pen.dev'de işaretli katmanları listele; iki liste aynı `id`'leri içermeli:

```js
Get(n => n.metadata && n.metadata.anim ? Print(n.metadata.anim, "|", n.name, "|", n.metadata.recipe) : undefined)
```

pen.dev, bileşen instance'larında ve override'larında `metadata` saklamaz; bu hedeflerin `id`'si katmanın `context` alanında durur. Sadece `metadata.anim` okunursa instance hedefleri listeden düşer, o yüzden `context` da taranır:

```js
Get(n => n.context && /I-[A-Z]{2,}-\d\d/.test(n.context) ? Print(n.context.match(/I-[A-Z]{2,}-\d\d/g).join(","), "|", n.name, "| context") : undefined)
```

İki çıktının birleşimi 7. bölümdeki listeyle karşılaştırılır.

**3) Ortak parçaları bir kez yaz** (`ismail-theme/src/` altında):

| Parça | Yer | Hangi hedefler |
|---|---|---|
| Motion custom property'leri (`--ease-*`, `--dur-*`) | `src/global.css` | hepsi |
| `useInView(ref, {threshold, once})` | `src/utils/motion/useInView.ts` | `impl` içinde `io-hook` |
| `useScrollProgress(ref)` → CSS değişkeni | `src/utils/motion/useScrollProgress.ts` | `impl` içinde `scroll-scrub` |
| `splitWords(el)` + AnimeJS stagger | `src/utils/motion/revealWords.ts` | M-03 |
| `Button`, `ArrowLink`, `Counter`, `FavoriteButton`, `AccordionItem`, `Drawer` | `src/sub-components/<Ad>/` | `via` alanı dolu olan hedefler (animasyon bileşenin içinde, bölümde tekrar yazılmaz) |
| `useInView(ref, opts)` | `src/utils/motion/useInView.ts` | M-01, M-03, I-M-01 |
| `rollDigits(el, from, to)` | `src/utils/motion/rollDigits.ts` | I-M-01 |
| `useCountdown(target)` | `src/utils/useCountdown.ts` | geri sayım metni (Header) |

**4) Bölüm bölüm uygula.** Her bölüm için sıra: `layout` (sticky) → `css-transition` → `css-keyframes` → `io-hook` → `animejs` → `scroll-scrub`. Her hedefte:
- `layer` = CSS sınıfı; durum sınıfları `is-inview`, `is-active`, `is-open`, `is-loading`.
- `from` / `to` / `timing` değerleri doğrudan kullanılır; token adları (`spring-soft`, `ease-inout`…) `globals.md` §7.1'den.
- `mobile` alanı medya sorgusuna (`@media (max-width: bp(<mobileId>))`), `reducedMotion` alanı `@media (prefers-reduced-motion: reduce)` bloğuna çevrilir.
- SSR çıktısı bitiş halini gösterir; başlangıç hali JS yüklenince eklenen sınıfla verilir.
- Tarayıcı API'leri sadece `useEffect` içinde. AnimeJS: `import { AnimeJS } from "@ikas/bp-storefront"`.
- Bileşen `styles.css` içindeki `@keyframes` adı o bileşene özeldir; birden çok bileşen aynı keyframe'i kullanacaksa `create_theme_global` (kind `keyframe`) ile tema keyframe'i aç.

**5) Doğrula ve işaretle.** `npx ikas-component check --json` → `npx ikas-component build` → editörde 1440 ve 390 genişlikte, ayrıca "hareketi azalt" açıkken kontrol. Tamamlanan hedefte `done: false` → `done: true`.

**Önerilen sıra (etki / emek):** `via` bileşenleri (her yerde görünür) → Header → ana sayfa bölümleri → ProductList / ProductDetail → overlay'ler → içerik sayfaları → scroll-scrub olanlar.

## 9. Bitiş kontrol listesi

Tasarım tarafı (pen.dev). Her madde `pendev_checks.js` içindeki bir CHK id'sidir (`extract_targets.py --js all` → `execute`; çıktı `CHK|<id>|PASS|FAIL|WARN|…`):
- [ ] `CHK vars`: `GetVariables()` 3. bölümdeki 41 çekirdek değişkeni ve eksenleri (`device`, `mode`) içeriyor.
- [ ] `CHK hardcoded`: tasarımda sabit hex dolgu, sabit yazı boyutu ya da sabit font ailesi yok; hepsi `$…`.
- [ ] `CHK sections`: 6.2'deki her bölümün `@desktop` ve `@mobile` kök frame'i var, ikisi de `reusable`.
- [ ] `CHK pages`: 6.3'teki her sayfa yalnızca section instance'larından oluşuyor; cihaz ekleri eşleşiyor.
- [ ] `CHK overlays`: 6.4'teki her overlay kök frame'i durumlarıyla birlikte var.
- [ ] `CHK anim`: `metadata.anim` ∪ `context` taramasındaki (8. bölüm, 2. adım) `id`'ler 7. bölümdeki listeyle birebir aynı.
- [ ] `CHK textclass`: her metin node'unda `textClass` var (`prop` → `prop` + `propType`; `data` → `source`).
- [ ] `CHK clip`: kırpılmış ("clipped") içerik yok; mask, track, marquee, ticker, pin, stage ve curtain kapları bilinçli olarak hariç.
- [ ] `CHK rootmeta`: her kök frame'de `type`, `role`, `ikas`, `device`, `variant`, `contract: 2` metadata'sı var.
- [ ] `CHK bgprop`: her section kök frame'i `prop: "backgroundColor"`, `propType: "COLOR"` taşıyor.
- [ ] `CHK placeholder`: hiçbir kök frame `placeholder: true` olarak kalmadı.
- [ ] `CHK refassets`: referansın görselleri, metinleri ve logosu kullanılmadı (referans sadece ilham; görsel, metin, logo ve marka adı kullanılmaz); hiçbir `fill` referans alan adını içermiyor.
- [ ] `CHK ds`: `I/DS/Colors`, `Typography`, `Spacing`, `Icons`, `Motion`, `Imagery` frame'leri var.
- [ ] Türkçe karakterler (`İ Ş Ğ Ü Ö Ç`) seçilen fontlarda doğru görünüyor (ekran görüntüsüyle).

Aktarım tarafı (ikas):
- [ ] Tema global'leri (renk, tipografi, kırılım) açıldı; `list_theme_globals` ile doğrulandı.
- [ ] Her section `check` ve `build` adımından hatasız geçti.
- [ ] 7. bölümdeki tüm hedefler `done: true`.

