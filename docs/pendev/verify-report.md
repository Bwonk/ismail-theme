# Doğrulama raporu — İsmail (I, contract 2)

| Alan | Değer |
|---|---|
| Tarih | 2026-10-08 |
| .pen dosyası | `/Users/yigitozen/Documents/ismail.pen` |
| Plan | `docs/pendev/plan-I-ismail.md` (`LINT OK (108 targets)`) |
| Prefix · sözleşme | `I` · contract 2 |
| Kontrol komutu | `extract_targets.py docs/pendev/plan-I-ismail.md --js all` → `execute` (betik gövdesi değiştirilmeden, tam koşu) |

## CHK sonuçları

### Son koşu (2026-10-08, 343 kök, 14 CHK)

Tuval büyüdüğü için tek `execute` zaman aşımına uğradı (`InternalError: interrupted`). Koşu skill 8bf1cd9'un bölme düzeniyle yapıldı: `--checks vars,ds,sections,overlays,pages,rootmeta,bgprop,placeholder,parity`, `--checks anim`, ardından `--checks hardcoded,textclass,clip,refassets --part 1/3 · 2/3 · 3/3`. Her parça betiğin aynı mantığıyla çalıştırıldı ve sayılar toplandı.

| CHK | Sonuç | n | Ayrıntı |
|---|---|---|---|
| `vars` | PASS | 44 | 44/44 |
| `ds` | PASS | 6 | 6/6 |
| `sections` | PASS | 26 | 26/26 |
| `overlays` | PASS | 8 | 8/8 (FilterDrawer yalnız mobil) |
| `pages` | PASS | 18 | 18/18 |
| `anim` | PASS | 108 | 108/108; fazla id yok · 2026-10-09 yeniden: başka bölüm kimliği (`foreign`) yok, 4 arka plan Header kopyası atlandı (skill 8908552); QuickBuy'da kopyadan kalan `I-PDP-03` → `I-QB-03` |
| `hardcoded` | PASS | 0 | 3 parça: fill=0 stroke=0 fontSize=0 fontFamily=0 |
| `textclass` | PASS | 0 | texts=1080 (369 + 433 + 278) none=0 invalid=0 |
| `clip` | PASS | 0 | no clipped content (3 parça) |
| `rootmeta` | PASS | 343 | 343/343 |
| `bgprop` | PASS | 167 | 167/167 |
| `parity` | PASS | 33 | 33/33; beyanlı masaüstü-yalnız katmanlar plan §6.2 `Yalnız masaüstü katmanlar` satırlarında (Header, MenuOverlay, ImagePreview, Footer, HeroSlider, QuickBuy, ProductList, AuthForms, RichText) |
| `props` | PASS | 290 | 290/290 (2026-10-09, skill 3fc65f0): plan ağacındaki her prop tuvalde `metadata.prop` ya da `context` işaretiyle (02 §5a); planın tanımadığı işaret yok. 65 eksik işaret eklendi, 8 eskimiş `index` işareti silindi |
| `data` | PASS | 110 | 110/110 (2026-10-09, skill f83cdae): her `{data:}` / `{code:}` metinde, satırda adı geçen Sub'da ya da `context` işaretiyle (02 §5c); planın tanımadığı işaret yok |
| `placeholder` | PASS | 0 | none |
| `refassets` | PASS | 0 | no reference-host image fills (3 parça) |

```
SUMMARY|pass=14|fail=0|warn=0|mode=all|roots=343  (parçaların toplamı)
```

`parity` ilk koşuda FAIL 30/33 verdi. Kalan farkların hepsi bilinçli tasarım kararıydı: masaüstü megamenü sütun başlıkları ve öne çıkan görsel, ImagePreview okları (mobilde kaydırma), QuickBuy masaüstü galeri sayacı ve okları (mobil alt sayfada 96 × 120 küçük görsel). Bunlar plandata `desktopOnly` ile beyan edildi.

### Tam koşu (2026-10-09, 343 kök, 16 CHK)

Skill 819abbe bölme düzeniyle: yapı + animasyon tek koşu, düğüm taraması `--part 1/3 · 2/3 · 3/3`, `props` + `data` tek koşu.

| CHK | Sonuç | n | Ayrıntı |
|---|---|---|---|
| `vars` | PASS | 44 | 44/44 |
| `ds` | PASS | 6 | 6/6 |
| `sections` | PASS | 26 | 26/26 |
| `overlays` | PASS | 8 | 8/8 |
| `pages` | PASS | 18 | 18/18 |
| `anim` | PASS | 108 | 108/108; başka bölüm kimliği yok |
| `rootmeta` | PASS | 343 | 343/343 |
| `bgprop` | PASS | 167 | 167/167 |
| `parity` | PASS | 33 | 33/33 |
| `props` | PASS | 290 | 290/290; eskimiş işaret yok |
| `data` | PASS | 110 | 110/110; eskimiş işaret yok |
| `placeholder` | PASS | 0 | none |
| `hardcoded` | PASS | 0 | 3 parça: fill=0 stroke=0 fontSize=0 fontFamily=0 |
| `textclass` | PASS | 0 | texts=1082 (369 + 434 + 279) none=0 invalid=0 |
| `clip` | PASS | 0 | no clipped content |
| `refassets` | PASS | 0 | no reference-host image fills |

```
SUMMARY|pass=16|fail=0|warn=0|mode=all|roots=343  (parçaların toplamı, 16 CHK)
```

### İlk koşu (2026-10-08, 190 kök)

İkinci tam koşudan alınmıştır. İlk koşu `SUMMARY|pass=12|fail=0|warn=1|mode=all|roots=190` verdi; tek uyarı `clip` idi. Bu uyarının iki nedeni düzeltildi (bkz. Notlar), ardından betik yeniden çalıştırıldı.

| CHK | Sonuç | n | Ayrıntı |
|---|---|---|---|
| `vars` | PASS | 44 | 44/44 (41 çekirdek + `size-hero`, `radius-card`, `radius-pill`) |
| `hardcoded` | PASS | 0 | fill=0 stroke=0 fontSize=0 fontFamily=0 |
| `sections` | PASS | 19 | 19/19 |
| `pages` | PASS | 14 | 14/14 (Auth ×4 varyant) |
| `overlays` | PASS | 4 | 4/4 |
| `anim` | PASS | 73 | 73/73 |
| `textclass` | PASS | 0 | texts=436 none=0 invalid=0 |
| `clip` | PASS | 0 | no clipped content |
| `rootmeta` | PASS | 190 | 190/190 |
| `bgprop` | PASS | 66 | 66/66 |
| `placeholder` | PASS | 0 | none |
| `refassets` | PASS | 0 | no reference-host image fills |
| `ds` | PASS | 6 | 6/6 |

```
SUMMARY|pass=13|fail=0|warn=0|mode=all|roots=190
```

Notlar (ilk koşudaki `clip` uyarısı):
- `I/DS/Icons > Logo`: Wordmark'ın son path'i 70 piksellik frame'den 0,2 piksel taşıyordu. Logo genişliği 71'e çıkarıldı; header instance'ı 71, footer instance'ları 142 oldu.
- `I/DS/Imagery > img-library-row`: Satır genişliği 1320'ydi, alan 1312. Satır aralığı 12'den 11'e indirildi.

## Elle kontroller

| Kontrol | Sonuç | Not |
|---|---|---|
| Türkçe karakterler (`İ Ş Ğ Ü Ö Ç ı`) seçilen fontlarda doğru (`I/DS/Typography`) | geçti | `I/DS/Typography` (Gf2F1) ekran görüntüsü alındı: Mona Sans (display, h2–h4, ui, body) ve JetBrains Mono (label, badge, price) satırlarında büyük ve küçük harfler yedek fonta düşmeden çiziliyor. pen.dev hiçbir aile için "invalid font" uyarısı vermedi. |
| Kontrast çiftleri WCAG AA (`I/DS/Colors`) | geçti | Değerler aşağıdaki tabloda, açık ve koyu mod için. Planın lint kontrolü de aynı çiftleri hata vermeden geçti. |
| Referansın görseli / metni / logosu kullanılmadı (göz kontrolü) | geçti | Canvas'taki 836 metin ve not, referansın marka adı ve metinleri için tarandı (`jolt`, `sport project`, `new arrivals`, `find store`, `shop now`, ürün ve şehir adları): 0 eşleşme. Görsellerin tamamı `Generate("ai")` (generated-*.png); logo ve işaret `Generate("svg")` ile üretildi. Referans görseli canvas'a alınmadı. |

Kontrast (02 §10):

| Çift | Açık | Koyu | Eşik | Sonuç |
|---|---|---|---|---|
| `color-text` / `color-bg` | 16.72 | 16.64 | 4.5 | geçti |
| `color-muted` / `color-bg` | 6.10 | 7.49 | 4.5 | geçti |
| `color-inverse-text` / `color-inverse-bg` | 16.72 | 16.72 | 4.5 | geçti |
| `color-accent-text` / `color-accent` | 5.31 | 5.31 | 4.5 | geçti |
| `color-danger` / `color-bg` | 5.93 | 8.01 | 4.5 | geçti |
| `color-text` / `color-surface` | 14.99 | 14.70 | 4.5 | geçti |
| `color-muted` / `color-surface` | 5.47 | 6.61 | 4.5 | geçti |
| `color-success` / `color-bg` | 4.86 | 10.10 | 3.0 | geçti |
| `color-line` / `color-bg` | 3.15 | 3.57 | 3.0 | geçti |
| `color-accent` / `color-bg` | 3.15 | 5.29 | 3.0 | geçti |

Görsel üstü metinler (hero, koleksiyon karoları, bülten, koleksiyon kapağı) koyu mod token'larıyla ve `color-scrim` ya da alttan gradyan karartma üstünde çizildi. Bu çiftler görsele bağlı olduğu için yukarıdaki tabloya girmez; ekran görüntülerinde okunur oldukları kontrol edildi (build-log).

## İstisnalar

| CHK | Node / kök | Gerekçe | Kullanıcı onayı |
|---|---|---|---|
| — | — | FAIL ya da WARN kalmadı. | — |

## Ekran görüntüleri

| Birim | Node | Ne gösteriyor |
|---|---|---|
| DS / Typography | Gf2F1 | 11 stil × masaüstü/mobil, Türkçe karakter satırları |
| DS / Colors | hxUZt | açık/koyu palet + kontrast kartları |
| DS / Imagery | v5jiW | görsel yönü + 17 görsellik kütüphane |
| DS / Icons | x5Xdk4 | 19 ikon + İSMAİL wordmark ve işaret |
| Sub / ProductCard + durumlar | Yp4Jp · Enuv3 · OoL9x | varsayılan, hover (arka görsel), indirimli |
| Sub / Button | d5lSV · CQpCR | yükleniyor, eklendi |
| Header | IPhRF · CuGQ7 · eorrj | opak masaüstü/mobil, hero üstü şeffaf |
| MenuOverlay | peyPC · f2f70 | megamenu, mobil koyu menü |
| CartDrawer / SearchOverlay | I34BT · E64O6 · x5QP6T · pIJs1 | dolu, boş, yazarken (masaüstü/mobil) |
| Footer | OLtep · XJbJV | koyu palet, mobil akordeon |
| HeroSlider | kewJH · dxdG3 | sol alt başlık, koordinat + sayaç |
| ProductGrid | wllla · h3WYM | 4×2 / 2×2 ürün ızgarası |
| StoreSpotlight | s5rxiu · G1rmg | dev `%30` teklif |
| CollectionMosaic | G5ICRw · xAP4U | kısa/uzun mozaik, gradyan karartma sonrası |
| Newsletter | H1u2UI · e4OaDV · HqN6w | koyu, ikiye bölünmüş; hata durumu |
| ProductList | iEonR · BRP3L · a2bReY · kamFU | filtreli ızgara, favori girişi, boş |
| FilterDrawer / CollectionHero | ZAPOC · e25Ed · WuZ6v | mobil filtre, koleksiyon kapağı |
| ProductDetail | NDft6 · rXdWm | galeri + sticky bilgi, mobil satın alma çubuğu |
| CartPage | WG5MX · KiCFp · e6m162 | satırlar + özet, boş sepet |
| Account | Gc7le · y1RlC · enaJZ | bilgiler, siparişler |
| AuthForms | jnyOb · QVD4w · IdF9Y · hIMxg | giriş, kayıt, şifre yenile |
| NotFound / EmailVerification | t5Hl1z · r2HnVM · M3GGei · i1Gx0e | 404, doğrulanıyor, hata |
| BlogList / BlogRelated | bWa5p · OLmDR · oxYSJ | blog ızgarası, mobil yatay şerit |
| BlogPost / StoreList | x0lR5E · be2Kh · w1SRI | okuma sütunu, mağaza kartları |
| Sayfalar | ySzRi · rSoBf · hqHps | Home masaüstü/mobil, Cart (alt boşluk düzeltmesi sonrası) |
| Motion | Z4yToF · qgYpV · OXLuL | altimetre sayacı ara kareleri, kelime reveal, slayt geçişi |

## Doğrulama sonrası değişiklik

- **2026-10-08 · font:** kullanıcı isteğiyle `font-mono` ve `font-price` değişkenleri `JetBrains Mono` → `Inter Tight`. Yalnızca değişken değerleri ve `I/DS/Typography` içindeki 4 açıklama metni değişti; node yapısı, metadata ve token bağları aynı, bu yüzden CHK sonuçları etkilenmez. Elle kontrol: pen.dev "invalid font" uyarısı vermedi; `İ Ş Ğ Ü Ö Ç ı` Inter Tight'ta karşılaştırma frame'inde ve canlı ekranlarda (Header, ProductGrid, StoreSpotlight mobil) doğru çizildi. Port notu: sayaç, fiyat ve geri sayımda `font-variant-numeric: tabular-nums`.
- **2026-10-08 · başlık üstü etiketler:** kullanıcı isteğiyle tüm başlık üstü etiketler kaldırıldı (25 node: `section-index`, `spotlight-index`, `newsletter-index`, `auth-index`, `hero-eyebrow`, `collection-hero-eyebrow`, `not-found-eyebrow`, `store-coordinate` ×6, DS `ds-index` ×6). `I-CMP-12` animasyonu `section-title` katmanının `context` alanına taşındı; plandata ağaçları ve prop listeleri (`index`, `eyebrow`, `coordinate`) güncellendi, `LINT OK (73 targets)`. Yeniden tam koşu: `SUMMARY|pass=13|fail=0|warn=0|mode=all|roots=190` (textclass texts=417). Kural ikas-pendev skill'ine eklendi (SKILL.md kural 11, 08-quality anti-desen).
- **2026-10-08 · iletişim sayfası:** `ContactForm` section'ı (masaüstü, mobil + gönderiliyor/başarılı/hata) ve `Contact` sayfası eklendi; plan `LINT OK (76 targets)`. Yeniden tam koşu: `SUMMARY|pass=13|fail=0|warn=0|mode=all|roots=197` (sections 20/20, pages 15/15, anim 76/76, texts=439).
- **2026-10-08 · iletişim sayfası (geniş):** kullanıcı referansıyla ContactForm yeniden kuruldu (kök id'ler korundu), StoreLocator ve FaqList eklendi; Contact = Header · ContactForm · StoreLocator · FaqList · Footer. Plan `LINT OK (80 targets)`. Yeniden tam koşu: `SUMMARY|pass=13|fail=0|warn=0|mode=all|roots=201` (sections 22/22, pages 15/15, anim 80/80, texts=503).
- **2026-10-08 · footer revizyonu (G4):** Footer görselli CTA bandı + buzlu cam iletişim kartı + e-postayla bildirim kartı olarak yeniden kuruldu (kök id'ler korundu; `— bildirim başarılı` / `— bildirim hata` durumları eklendi); footer altındaki 132 kök +613 kaydırıldı. Plan `LINT OK (82 targets)`. Yeniden tam koşu: `SUMMARY|pass=13|fail=0|warn=0|mode=all|roots=203` (anim 82/82, texts=512).
- **2026-10-08 · PDP hizmet şeridi + Newsletter kaldırma:** ProductDetail'e `pdp-highlights` eklendi; ayrı Newsletter section'ı (2 kök + 3 durum + Home/Mağazalar'daki 4 instance) ve `I-NEWS-01..03` hedefleri kaldırıldı, bülten Footer CTA bandında. Plan `LINT OK (79 targets)`. Yeniden tam koşu: `SUMMARY|pass=13|fail=0|warn=0|mode=all|roots=198` (sections 21/21, pages 15/15, anim 79/79 — fazla id yok, texts=516).
- **2026-10-08 · ana sayfa zenginleştirme:** geçici öneri frame'inden B (Aktiviteye göre seç → `ActivityGrid`, yerel tarifler `I-M-04` perde girişi + `I-M-05` genişleyen kart) ve D (Çok satanlar → `Bestsellers`, sıralı liste + önizleme) asıl tasarıma alındı. Home sırası: Header · HeroSlider · ProductGrid · ActivityGrid · StoreSpotlight · Bestsellers · CollectionMosaic · Footer. Plan `LINT OK (90 targets)`. Yeniden tam koşu: `SUMMARY|pass=13|fail=0|warn=0|mode=all|roots=204` (sections 23/23, pages 15/15, anim 90/90, texts=566, bgprop 76/76).
- **2026-10-08 · QuickBuy (hızlı al):** skill'e zorunlu overlay olarak eklendi; `I/Overlay/QuickBuy` masaüstü (pencere) ve mobil (alt sayfa) için açık · seçim eksik · ekleniyor halleriyle çizildi. Plan `LINT OK (95 targets)`. Yeniden tam koşu: `SUMMARY|pass=13|fail=0|warn=0|mode=all|roots=210` (overlays 5/5, anim 95/95, texts=613, rootmeta 210/210).
- **2026-10-08 · QuickBuy tetikleyici:** İsmail'de QuickBuy ana sayfadaki Çok satanlar (Bestsellers) satırının sepet düğmesiyle açılır; sahibi Bestsellers. Yalnızca `context` metinleri ve plan/doküman ifadeleri değişti, node yapısı ve anim id'leri aynı.
- **2026-10-08 · koleksiyon mozaiği dikey akordeon:** CollectionMosaic'e yerel tarif `I-M-06` (karo sütun içinde uzar, komşusu daralır) eklendi; `— hover` durum frame'i ve `I/Motion/I-M-06` kareleri çizildi. Plan `LINT OK (96 targets)`. Yeniden tam koşu: `SUMMARY|pass=13|fail=0|warn=0|mode=all|roots=212` (anim 96/96, rootmeta 212/212, bgprop 77/77).
- **2026-10-08 · ikas mağaza blokları:** ürün detaya birlikte al, set içeriği, kademeli indirim, kişiselleştirme, ürün grubu, gelince haber ver, Hızlı Öde ve puan; yeni ProductReviews section'ı; sepet sayfası ve çekmeceye kampanya/kupon/hediye çeki satırları, uygulanan kupon, hediye satırı ve öneri şeridi; 4 yeni Sub + CartLineItem'a 4 durum. Plan `LINT OK (102 targets)` (yeni L21 dahil). Yeniden tam koşu: `SUMMARY|pass=13|fail=0|warn=0|mode=all|roots=237` (sections 24/24, anim 102/102, texts=761, rootmeta 237/237, bgprop 87/87).
- **2026-10-08 · opaklık + temizlik:** `$opacity-inactive` bağlı 17 düğüm canvas'ta görünmüyordu; değişkenin değeri (0.4) yazıldı, token adı her düğümün `context`'inde (istisna: 02 §3). Geçici öneri frame'i silindi. Kontrol: roots 237, anim id 102/102, clip 0.
- **2026-10-08 · MCP tamamlama:** ikas MCP taramasındaki zorunlu eksikler (14 madde + kullanıcının zorunlu saydığı 9 madde) çizildi: filtre tipleri, varyant swatch'ları, galeride video, mağazada stok, sipariş detayı + iade, adres penceresi + silme onayı, hesap ayarları, toast, çerez çubuğu, görsel önizleme, dil seçici, hesap menüsü, sosyal + SMS giriş, iki ayrı kayıt onayı, e-posta tekrar gönder, yapışkan header + duyuru sayfalayıcı, yorum görseli/yanıtı/sayfalama, adet üst sınırı, yükleniyor iskeletleri, metin sayfası, sipariş takibi. Plan `LINT OK (112 targets)`. Yeniden tam koşu: `SUMMARY|pass=13|fail=0|warn=0|mode=all|roots=300` (sections 26/26, overlays 12/12, pages 18/18, anim 112/112, texts=1073, rootmeta 300/300, bgprop 108/108).
- **2026-10-08 · koşullu overlay'ler + footer dil seçici:** Toast, ConfirmModal, AddressModal, AccountMenu koşullu yapıldı ve İsmail'den kaldırıldı; dil/para birimi seçici footer alt satırına taşındı. Plan `LINT OK (108 targets)`. Yeniden tam koşu: `SUMMARY|pass=13|fail=0|warn=0|mode=all|roots=283` (overlays 8/8, anim 108/108, rootmeta 283/283).
- **2026-10-08 · kişiselleştirme türleri:** ürün detaydaki kişiselleştirme bloğuna ikas'ın bütün seçenek türleri tema stiliyle eklendi; yalnız ProductDetail değişti, birim kontrolü temiz (clip 0, textclass 0, hardcoded 0). Son tam koşu `roots=283` geçerli.
- **2026-10-08 · adres ve silme akışları:** hesapta adres kartı eylemleri (Düzenle · Sil · Varsayılan yap), satır içi adres formu, adres silme ve şifreli hesap silme onayı tema stiliyle eklendi; durumlar: adres ekle · adres sil onayı · hesap silme onayı. Tam canvas taraması: kırpılma 0, çakışma 0.
- **2026-10-08 · mobil hesap eşliği:** mobil hesaba ayarlar (şifreli silme onayıyla), iade talebi, hata ve yükleniyor panelleri ile 5 mobil durum eklendi. Yeniden tam koşu: `SUMMARY|pass=13|fail=0|warn=0|mode=all|roots=291` (texts=1076, rootmeta 291/291, bgprop 115/115).
- **2026-10-08 · port hazırlığı (renk şemaları, metin stilleri, ara kırılımlar):** `I/DS/Colors`'a üç ikas renk şeması kartı, `I/DS/Typography`'ye dört kırılımlı ikas metin stilleri tablosu eklendi; `globals.md` §1a, §2a, §4a yazıldı. DS sayfaları CHK'yi etkilemez (DS metinleri `code`); plan `LINT OK (108 targets)`.

## Sonuç

Tüm CHK satırları PASS (son tam koşu 2026-10-09, `props` ve `data` dahil: fail=0 warn=0, 343 kök) ve üç elle kontrol geçti. Tasarım port paketine (Faz 5 · handoff) hazır.
