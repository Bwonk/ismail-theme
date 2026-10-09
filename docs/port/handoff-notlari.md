# Handoff notları — İsmail (I)

Tarih: 2026-10-09 · Plan `LINT OK (108 targets)` · son tam doğrulama 16 CHK, fail=0 warn=0 (343 kök); sonradan eklenen 2 durum karesi (`ProductDetail — sepet güncelleniyor`) için kök metadata, eşlik ve çakışma ayrıca kontrol edildi.

## Üretilenler

| Dosya | İçerik |
|---|---|
| `canvas-dump.txt` | 345 `ROOT|…` satırı. Tuval büyük olduğu için `--js manifest --part 1/6 … 6/6` ile alındı; parçalar `parts/` altında. |
| `port-manifest.json` / `.md` | 26 section · 8 overlay · 27 sub · 21 sayfa · 108 animasyon hedefi; masaüstü-yalnız katmanlar bölüm başına listeli. |
| `globals-runbook.md` | 3 kırılım · 3 renk şeması (Kâğıt varsayılan · Mürekkep · Şeffaf) · 11 metin stili (4 kırılım) · 1 global değişken · 2 keyframe = 20 çağrı; `src/global.css` bloğu. |

Komut: `build_manifest.py --plandata docs/pendev/plandata --plan docs/pendev/plan-I-ismail.md --dump docs/port/canvas-dump.txt --globals docs/referans/globals.md -o docs/port/` → `MANIFEST|sections=26|overlays=8|subs=27|pages=21|anims=108|open=0|blocking=0`, exit 0 (2026-10-09).

## Açık sorular: 0

İlk üretimde 199 soru vardı; üçü de kalıcı kurallarla kapandı:

| Tür | İlk | Şimdi | Nasıl kapandı |
|---|---|---|---|
| Prop farkı | 150 | 0 | Prop'lar tuvalde `metadata.prop` ya da `context` işaretiyle (sözleşme 02 §5a, CHK `props` 290/290); overlay prop'ları sahiplerine taşındı, 24 prop plan ağacına yerleşti. |
| Animasyon fazlası | 9 | 0 | Overlay karelerindeki Header kopyası arka plan sayılıyor (02 §5b); QuickBuy'da kopyadan kalan `I-PDP-03` → `I-QB-03`. CHK `anim` 108/108, başka bölüm kimliği yok. |
| Veri işareti | 40 | 0 | Veri metinde, satırda adı geçen Sub'da ya da `data` / `code` işaretiyle (02 §5c, CHK `data` 110/110); 4 plan satırına Sub adı yazıldı, 47 düğüme işaret eklendi. |

## Port'a giderken bilinmesi gerekenler

- **Masaüstü-yalnız katmanlar** (`port-manifest.md` her bölümün altında): Header nav ve buton etiketleri, MenuOverlay megamenü sütun başlıkları ve öne çıkan görsel, Footer sütunları (mobilde akordeon), HeroSlider meta, ProductList filtre kenar çubuğu ve etiketleri (mobilde FilterDrawer), AuthForms görseli, RichText içindekiler, ImagePreview okları, QuickBuy galeri sayacı ve okları.
- **Renk şemaları** bölüm varsayılanlarıyla birlikte `globals-runbook.md` notlarında. Kâğıt varsayılan şema yapılır.
- **Ara kırılımlar** (992–1199, 768–991) bölüm davranışları `docs/referans/globals.md` §4a'da.
- Tuvalde (0,0) konumunda boş bir `Frame` var. Tasarıma ait değil, port'u etkilemez.
