# Kod kuralları — İsmail port (ikas Code Components)

Bu dosya tüm port işinin ortak sözleşmesidir. `CLAUDE.md` (proje) her zaman geçerlidir; burada yalnızca bu temaya özgü kararlar var.

## 1. Kaynaklar

| Ne | Nerede |
|---|---|
| Section/overlay listesi, prop'lar, çocuklar, anim id'leri | `docs/port/port-manifest.md` (+ `.json`) |
| Plan satırları (masaüstü/mobil ölçüler, ağaç, kontroller) | `docs/pendev/plandata/sections/NN-<Key>.json` |
| Ara kırılım davranışı (laptop 992–1199, tablet 768–991) | `docs/referans/globals.md` §4a |
| Motion tarifleri (M-xx, I-M-xx) | `docs/referans/globals.md` §7 |
| Canlı token id'leri | `docs/port/globals-runbook.md` §7, `src/global.css` başı, `src/utils/tokens.ts` |
| Tasarım (gerçek kaynak) | `/Users/yigitozen/Documents/ismail.pen` — pencil MCP `execute` ile okunur (§9) |

Kaynak sırası: brief > canlı .pen > docs > bu dosya. Çelişki görürsen dur ve raporla.

## 2. Token kullanımı

- **Renk:** yalnızca `src/global.css` takma adları: `var(--c-bg)`, `--c-text`, `--c-muted`, `--c-line`, `--c-surface`, `--c-inverse-bg`, `--c-inverse-text`, `--c-accent`, `--c-accent-text`, `--c-danger`, `--c-success`, `--c-scrim`, `--c-transparent`. Hex yazılmaz (görsel üstü gradyan karartma için `--c-scrim` ve `color-mix` kullan).
- Pen.dev → CSS: `$color-bg`→`--c-bg`, `$color-inverse-bg`→`--c-inverse-bg` … (aynı ad, `color-` → `c-`).
- **Şema zorlama:** bir alt ağaç sabit bir paletle çizilmişse (ör. Footer koyu, Header hero üstünde şeffaf) o elemana `forceScheme("ink" | "clear" | "paper")` sınıfını ver (`src/utils/tokens.ts`). Section'ın kendi varsayılan şeması (globals-runbook §4 notları) editörden seçilir; kökü zorlamak yalnızca tasarım hiç değişmeyecekse (Footer = Mürekkep) yapılır.
- **Tipografi:** `TEXT.display | h2 | h3 | h4 | title | ui | uiSm | badge | label | body | price` sınıfları (`src/utils/tokens.ts`). Font ailesi/boyutu CSS'te yazılmaz. Pen.dev `fontSize: $text-h3` → `TEXT.h3`. `fontWeight` farkı varsa CSS'te `font-weight` yazılabilir.
- Rakam içeren etiket/fiyat/sayaç: `tabular` sınıfı.
- **Boşluk/ölçü:** `--space-page|grid|card|panel|xs|sm|md|section`, `--size-header|line|logo|hero`, `--radius-card|pill`, `--opacity-inactive`. Mobil değerler global.css'te otomatik değişir; mobil sayıyı elle yazma.
- **Motion:** `--ease-standard`, `--ease-out-soft`, `--ease-spring-soft`, `--dur-fast|base|slow`. Ortak giriş: tema keyframe'i `_ovqsdHMO4b` (fade-up) ve `_EMX39fgOGw` (fade) — `animation: _ovqsdHMO4b 0.5s var(--ease-standard) both;`.
- **Kırılımlar (CSS):** `@media (max-width: bp(rLU3LmiCdo))` laptop ≤1199 · `bp(zTpkWoce2k)` tablet ≤991 · `bp(KUQjO8W6p9)` mobil ≤767. `var()` medya sorgusunda çalışmaz.
- Büyük harf: tipografide `text-transform` yok. Varsayılan metinler zaten BÜYÜK yazılır; dinamik veri (ürün etiketi vb.) `upperTr()` ile.

## 3. Dosya ve bileşen yapısı

- Section'lar `src/components/<Key>/` (CLI ile). Çocuk bileşenler (COMPONENT_LIST içindekiler) de `src/components/<Child>/`, `--type component`.
- Overlay'ler ve tekrar eden parçalar `src/sub-components/<Name>/index.tsx + styles.css` (ikas.config'e girmez). Overlay, sahibi olan section'ın içinde render edilir (manifest'te "<Section> › Overlay X"). Overlay prop'ları sahibi section'ın prop'larıdır; sub-component'e `texts` nesnesi ya da tek tek prop olarak geçirilir.
- Ortak yardımcılar: `src/utils/tokens.ts`, `cx.ts`, `hooks.ts` (`useReveal`, `useScrollLock`, `useEscape`, `useCountdown`, `useMounted`, `prefersReducedMotion`), `ui.ts` (`emitUi`/`onUi` + `UI_EVENT`).
- Hazır sub'lar: `Icon` (adlar `src/sub-components/Icon/index.tsx` içinde; eksik ikon lucide geometrisiyle EKLENİR, yeni dosya açılmaz), `Button`, `ArrowLink`, `Badge`, `FavoriteButton`, `Counter`, `IconButton`, `Spinner`, `Skeleton`, `SectionHeading`, `ProductCard`. Önce bunları kullan; aynı işi yapan yenisini yazma.
- Referans uygulama: `src/components/ProductGrid` (section iskeleti, reveal, mobil kurallar) ve `src/sub-components/ProductCard` (storefront API, observer).
- CSS sınıfları: section başına kısa bir önek (`pgrid__…`, `hdr__…`). Sub'larda da önek (`btn__`, `pcard__`). Yalnızca sınıf seçici; element seçici yok.
- Root export `observer` ile sarılmaz; store okuyan sub'lar `observer(function Name(){…})`.

## 4. Prop kuralları

- Prop listesi manifestten gelir. Varsayılan metinler **tuvaldeki Türkçe metinlerdir** (pen.dev `content`). Merchant verisi tiplerinde (IMAGE, PRODUCT_LIST, …) varsayılan yok.
- Görünen her metin TEXT prop'tur (boş durum, yükleniyor, hata, aria-label dahil). Yükleniyor durumu için ikinci prop (`submitText` + `submittingText`). Manifestte olmayan ama gereken metin için yeni TEXT prop eklemek serbest; adı manifest diline uysun.
- Her section'da `backgroundColor` COLOR (varsayılansız). Kodda: `style={backgroundColor ? { backgroundColor } : undefined}`; yoksa şemanın `--c-bg`'si geçerli.
- Gruplar: `texts` Metinler · `content` İçerik · `images` Görseller · `links` Bağlantılar · `settings` Ayarlar · `colors` Renkler · `components` Bileşenler · `brand` Marka. `add-component` sonrası `tr-groups.sh <Ad>` çalıştır (grupları Türkçeleştirir).
- displayName'ler Türkçe.
- ENUM gerekiyorsa önce `add-enum`, dönen id ile prop.
- Container section: önce çocukları oluştur, id'yi al, sonra parent'ı, sonra `update-prop --filteredComponentIds`.

## 5. CLI — ZORUNLU sarmalayıcı

`ikas.config.json`, `types.ts`, `global-types.ts`, `src/components/index.ts` dosyalarını değiştiren her komut kilitli sarmalayıcıyla çalışır (paralel çalışan başka ajanlar var):

```
T=/private/tmp/claude-501/-Users-yigitozen-orca-ismail-theme/dfa24521-93fb-44a5-85c3-4b4fdac92a6c/scratchpad/tools
$T/cfg.sh add-component --name "X" --type section --props '[...]'
$T/cfg.sh add-prop --component "X" --name y --displayName "Y" --type TEXT --defaultValue "…" --group texts
$T/tr-groups.sh X
```

- Bu dosyaları elle asla düzenleme. `npx ikas-component build` ÇALIŞTIRMA (dist'e paralel yazım çakışır); doğrulama `npx ikas-component check --json` ile yapılır ve yalnızca kendi dosyalarındaki hatalar düzeltilir. Başka ajanın dosyasındaki hatayı düzeltme, raporla.
- Başka ajanın oluşturduğu bileşeni silme/yeniden adlandırma.

## 6. Davranış

- SSR: tarayıcı API'leri yalnızca `useEffect` içinde. SSR çıktısı animasyonların **bitiş** halini gösterir; başlangıç hali hidrasyondan sonra sınıfla gelir (`useReveal` → `is-pending` / `is-inview`).
- `prefers-reduced-motion: reduce`: girişler anında, döngüler durur.
- Hover efektleri `@media (hover: hover)` içinde.
- Dışarıdan paket yok. `animejs` kök node_modules'ta yok: stagger/timeline için CSS `animation-delay: calc(var(--i) * …)` ya da Web Animations API (`el.animate`) kullan.
- Fiyat: `get*FormattedPrice` / `formatCurrency`; `Intl.NumberFormat` yok. Görsel: `getDefaultSrc` + `createMediaSrcset`, varyant görseli `.image`.
- Overlay açma: `emitUi(UI_EVENT.openCart)` vb.; overlay `onUi` ile dinler. Overlay açıkken `useScrollLock`, `useEscape`, scrim tıklaması kapatır, odak yönetimi (`role="dialog" aria-modal="true"`).
- `desktopOnly` katmanlar (manifest "Yalnız masaüstü katmanlar") mobil kırılımda `display: none`.
- Masaüstü/mobil frame farkı → aynı bileşen, `bp(KUQjO8W6p9)` medya kuralı. Laptop/tablet → globals.md §4a.
- Durum frame'leri (`— boş`, `— yükleniyor`, `— hata` …) kodda gerçek durumlara karşılık gelir; hepsi uygulanır.

## 7. API

Her storefront fonksiyonu kullanılmadan önce ikas MCP ile doğrulanır (`get_section_template`, `get_section_child`, `get_function_doc`, `get_model_guide`). Şablonlardan yalnızca API kalıbı alınır; JSX/CSS özgündür ve tasarımdan gelir.

## 8. Bitti tanımı (birim başına)

1. Manifestteki bütün prop'lar, çocuklar, overlay'ler ve anim id'leri karşılandı (anim id'si kodda yorum olarak geçer: `/* I-GRID-02 · M-01 */`).
2. Masaüstü + mobil + ara kırılımlar + durum frame'leri uygulandı.
3. `npx ikas-component check --json` kendi dosyalarında 0 hata.
4. Rapor: oluşturulan bileşen id'leri, eklenen prop'lar, karşılanamayan ya da şüpheli noktalar.

## 9. Tasarımı okumak (pencil MCP)

`mcp__pencil__execute` (filePath `/Users/yigitozen/Documents/ismail.pen`) ile **yalnızca okuma**: `Get`, `Print`, `TakeScreenshot`, `Export`. Tuvalde hiçbir şeyi değiştirme (Insert/Update/Delete/Generate yasak). Kompakt ağaç dökümü için `…/scratchpad/tools/dump.js` içeriğini başına `const ROOTS=["<nodeId>",…];` ekleyerek `input` olarak gönder. Kök id'leri: `docs/port/canvas-dump.txt` (`ROOT|<ad>|<id>|…`). Ekran görüntüsünü yalnızca bölüm başına bir-iki kez al.
