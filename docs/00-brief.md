# Brief — İsmail

Bu dosya tüm fazların başlangıç noktasıdır. Her oturum önce bunu okur; en alttaki **Durum** tablosu ilk açık fazı gösterir. Kaynak sırası: bu brief > canlı .pen dosyası > `docs/` > skill varsayılanları.

## 1. Girdiler

| Dosya / URL | Sayfa | Viewport genişliği | Not |
|---|---|---|---|
| `docs/referans/girdi/01-anasayfa-desktop.jpg` | Ana sayfa (tam sayfa) | 1440 [tahmini] | Dosya 752×2314 px; gri sunum çerçevesi içinde küçültülmüş tasarım görseli (ölçek ≈ 0,47). Tüm değerler `[tahmini]`. |

- Canlı referans: yok (yalnızca ekran görüntüsü modu).
- Taranacak yollar: yok.
- Referansta görünen bölümler: üst duyuru bandı (geri sayımlı) · şeffaf header + tam genişlik hero (görsel, başlık, açıklama, CTA) · yeni gelenler ürün ızgarası (4×2, favori, "Limited" rozeti, sepete ekle ikonu, "Tümünü gör") · mağaza/kampanya tanıtımı (görsel + metin + büyük yüzde + harita CTA) · öne çıkan koleksiyonlar mozaiği (6 kutu, biri açıklama+CTA'lı) · koyu görselli bülten kaydı · koyu footer (logo, 3 link kolonu, sosyal ikonlar, iletişim, para birimi/dil, telif).
- Mobil referans yok: mobil düzen tema dilinden türetilir.
- Girdi klasörü: `docs/referans/girdi/` (git'e girmez; `.gitignore`'a eklendi: evet)

## 2. Marka

| Alan | Değer |
|---|---|
| Marka adı | İsmail (kullanıcı onayladı, 2026-10-08) |
| Slug | `ismail` |
| Sektör | Outdoor ekipman ve kentsel giyim (outdoor/streetwear) |
| Ton (3 sıfat) | teknik · sade · enerjik |

## 3. Yorum stratejisi

| Alan | Değer |
|---|---|
| Strateji | aynı iskelet — bölüm sırası ve yerleşim referansa yakın; tipografi, renk, detaylar ve tüm varlıklar özgün |
| Prefix harfi | `I` (çakışma kontrolü: `get_app_state` → `ismail.pen` içinde tek kök `bi8Au` "Frame"; `P/` kökü yok, çakışma yok) |
| Sözleşme | contract 2 |
| Plan dosyası | `docs/pendev/plan-I-ismail.md` |

## 4. Referans politikası

- [x] Referans sadece bakmak için: görseli, metni, logosu ve marka adı canvas'a girmez.
- [x] Görseller `Generate("ai" | "stock")`, logo `Generate("svg")` ile özgün üretilir.
- Onay: kullanıcı onayladı (2026-10-08, intake 1. tur).

## 5. Kapsamdaki sayfalar

| Sayfa tipi | Kapsamda | Not |
|---|---|---|
| `INDEX` | [x] | Referanstaki iskelet |
| `CATEGORY` | [x] | Referansta yok; tema dilinden |
| `PRODUCT_DETAIL` | [x] | Referansta yok; tema dilinden |
| `CART` | [x] | Referansta yok; tema dilinden |
| `ACCOUNT` | [x] | Referansta yok; tema dilinden |
| `LOGIN` · `REGISTER` · `FORGOT_PASSWORD` · `RECOVER_PASSWORD` | [x] | Tek `AuthForms` bölümü, 4 varyant |
| `NOT_FOUND` | [x] | |
| `SEARCH` | [x] | ProductList arama modu |
| `FAVORITES` | [x] | ProductList favori modu |
| `BLOG` · `BLOG_POST` | [x] | Menüde blog bağlantısı var |
| `COLLECTION` | [x] | Koleksiyon kapağı + ProductList |
| `CUSTOMER_EMAIL_VERIFICATION` | [x] | doğrulanıyor · başarılı · hata |
| Özel sayfalar | [x] | Mağazalar (`Stores`): mağaza listesi + harita bağlantısı; referanstaki mağaza tanıtım bloğunun karşılığı |
| Özel sayfa: İletişim (`Contact`, `CUSTOM`) | [x] | 2026-10-08 build sonrası eklendi, aynı gün kullanıcı referansıyla (`docs/referans/girdi/02-iletisim-referans.png`) geniş özel sayfaya çevrildi: ContactForm + StoreLocator + FaqList; ikas iletişim formu API'si (`getContactForm`, `setContactForm*`, `submitContactForm`) |

Zorunlu overlay'ler: CartDrawer · SearchOverlay · MenuOverlay · QuickBuy (hızlı al) · FilterDrawer@mobile.
Zorunlu mağaza blokları: ürün detayda birlikte al · set içeriği · kademeli indirim · kişiselleştirme · ürün grubu · gelince haber ver · Hızlı Öde · puan; ProductReviews; sepette kampanya satırları · uygulanan kupon · hediye satırı · öneri şeridi. Header ve Footer her sayfada.

## 6. Yerel ayarlar

| Alan | Değer |
|---|---|
| Dil / locale | Türkçe · `tr-TR` |
| Para biçimi | `1.850 TL` (binlik nokta, kuruş varsa virgül, birim sonda) |
| Büyük harf politikası | Kısmi: başlıklar ve gövde cümle düzeninde; yalnızca rozet, üst bant, küçük etiketler BÜYÜK HARF (`text-transform` yerine `tr` locale ile; İ/I doğru) |

## 7. Palet modları

- Seçim: ters bölümler — açık palet temel
- Koyu (`mode: dark`) bölümler: Footer (görselli CTA bandı + e-postayla bildirim kartı), mobil MenuOverlay; hero görsel üstü metin koyu mod tokenlarıyla. Ayrı Newsletter section'ı 2026-10-08'de kaldırıldı (bülten footer'a taşındı).

## 8. Canvas ve cihazlar

| Alan | Değer |
|---|---|
| .pen dosyası | `/Users/yigitozen/Documents/ismail.pen` |
| Masaüstü genişliği | 1440 |
| Mobil genişliği | 390 |
| Overlay boyutları | 1440×900 · 390×844 |

## 9. Motion iştahı

- Seviye: orta
- Not: scroll'da görünme (reveal), hero başlık maskesi, ürün kartı hover'ı (görsel değişimi / sepete ekle ikonu), koleksiyon kutusu hover, slider geçişleri, drawer/overlay açılışları, üst bant geri sayımı (`code` metin). Lenis/GSAP yok; CSS, `IkasThemeSlider`, AnimeJS.

## 10. Durum

| Faz | Durum | Dosya | Tarih | Not |
|---|---|---|---|---|
| 0 intake | tamam | `docs/00-brief.md` | 2026-10-08 | brief kullanıcı tarafından onaylandı |
| 1 analyze | tamam | `docs/referans/globals.md`, `docs/referans/components.md` | 2026-10-08 | ekran görüntüsü modu, tüm değerler [tahmini]; `LINT OK (0 targets)` |
| 2 plan | tamam | `docs/pendev/plan-I-ismail.md` | 2026-10-08 | `LINT OK (73 targets)`, kontrast geçti; §1 ve §6.2 gösterildi, kullanıcı build ile onayladı · revizeler sonrası `LINT OK (108 targets)` |
| 3 build | tamam | canvas + `docs/pendev/build-log.md` | 2026-10-08 | ds · subs · 19 section · 4 overlay · 17 sayfa · 11 motion; tüm birimler fail=0 warn=0 · revizeler sonrası 26 section · 8 overlay · 18 sayfa · ikas mağaza blokları + MCP tamamlama |
| 4 verify | tamam | `docs/pendev/verify-report.md` | 2026-10-08 | `SUMMARY|pass=13|fail=0|warn=0|mode=all|roots=190`; elle kontroller geçti; istisna yok · revizeler sonrası son tam koşu 2026-10-09 (parity, props, data dahil) fail=0 warn=0, roots=343 |
| 5 handoff | tamam | `docs/port/port-manifest.json`, `port-manifest.md`, `globals-runbook.md`, `handoff-notlari.md` | 2026-10-09 | `MANIFEST|sections=26|overlays=8|subs=27|pages=21|anims=108|open=0|blocking=0`, exit 0; prop (290/290), animasyon sahipliği ve veri (110/110) tuvalde işaretli; açık soru yok |
| 6 port | tamam | `src/`, `docs/port/kod-kurallari.md`, `globals-runbook.md` §7 | 2026-10-09 | global'ler kuruldu (20 çağrı, Rozet/Etiket'te `text_transform` yok); 26 section + 8 overlay + 13 çocuk bileşen, `ikas-component build` 39/39; 22 sayfa editörde kurulu ve yayında; akış testleri (sepet, çekmece, kupon, hızlı alım, arama, sıralama, filtre, PDP, sepet sayfası, hesap, iletişim doğrulaması) geçti; admin: TRY biçim kuralı (`3.250 TL`), yelek renk kodları, 4 ürün filtresi (Renk, Beden, Fiyat, Stok durumu) |

Durum değerleri: `bekliyor` · `sürüyor` · `tamam` · `istisna`.


## 11. ikas hazır sayfalar (skill güncellemesi sonrası not)

| Grup | Karar | Not |
|---|---|---|
| üyelik (giriş, kayıt, şifre, e-posta doğrulama) | özel tasarım (kullanıcı onayı, 2026-10-08) | canvas'ta AuthForms + EmailVerification çizili; port ikas hazır sayfa grubunu açmaz |
| hesap (hesabım, siparişler, adresler, favoriler) | özel tasarım (kullanıcı onayı, 2026-10-08) | Account + Favorites çizili |

## 12. İsteğe bağlı bileşen kararları (skill'e işlenecek)

Gruplar: **zorunlu** (her temada çizilir) · **koşullu** (intake'te sorulur, evetse çizilir) · **gereksiz** (kodda karar verilir). Kesinleşenler kullanıcı onayıyla işaretlenir.

| Bileşen | Grup | Durum |
|---|---|---|
| Ürün listesinde 3/4 sütun seçimi (mobilde 1/2) | koşullu | kullanıcı kararı, 2026-10-08 |
| SMS ile giriş · dil/para birimi seçici · mağazada stok | zorunlu (veri/ayar yoksa gizli) | kullanıcı kararı, 2026-10-08 |
| Kayıtta iki ayrı onay · hesap silme + veri dışa aktarma · misafir sipariş takibi · görsel yakınlaştırma/önizleme · yükleniyor iskeletleri · duyuru dönüşü | zorunlu | kullanıcı kararı, 2026-10-08 |
| MCP taramasındaki 14 eksik (filtre tipleri, renk swatch, galeride video, sipariş detayı + iade, adres formu + silme onayı, toast, çerez çubuğu, sosyal giriş, sepet satırını düzenleme, adet üst sınırı, yorum görseli + mağaza yanıtı, e-posta tekrar gönder, header yapışkan + menüde giriş, metin sayfası) | zorunlu | kullanıcı kararı, 2026-10-08 |
| Sadakat programı · çekiliş sayfaları · marka sayfası · teknik özellik tablosu · kayıtta ek müşteri alanları · blog etiket ve yazar · 3/4 sütun seçimi | koşullu (çizilmez; başka temalarda intake'te sorulur) | kullanıcı kararı, 2026-10-08 |
| Liste içi arama · önceki sayfayı yükle · numaralı sayfalama · birim fiyat | gereksiz (kodda karar) | öneri, itiraz edilmedi |
| Bildirim (toast) · onay penceresi · adres penceresi · hesap menüsü | koşullu (İsmail'de seçilmedi, canvas'tan kaldırıldı) | kullanıcı kararı, 2026-10-08 |
| Dil/para birimi seçici | zorunlu, her zaman footer alt satırından açılır (header'da yok) | kullanıcı kararı, 2026-10-08 |
| Kişiselleştirmenin bütün türleri (açılır liste, yuvarlak, görsel, uzun metin, onay kutusu, renk seçici, tarih, bağlı seçenek, seçim sınırı) | zorunlu, tema stiliyle (koşulluydu) | kullanıcı kararı, 2026-10-08 |
| Adres formu · adres düzenle/sil/varsayılan · adres silme ve hesap silme onayı | zorunlu, tema stiliyle (pencere seçilmediyse satır içi) | kullanıcı kararı, 2026-10-08 |
| Masaüstü/mobil eşliği (ikas blokları, hesap panelleri, onaylar her iki cihazda; önemli mobil durumlar) | zorunlu | kullanıcı kararı, 2026-10-08 |
| Renk şemaları kartları · ikas metin stilleri (4 kırılım) · ara kırılım davranışı tablosu | zorunlu (port hazırlığı) | kullanıcı kararı, 2026-10-08 |
