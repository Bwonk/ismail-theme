// Account texts: canvas defaults for every TEXT prop (keep in sync with ikas.config.json defaults).
import type { Props } from "./types";

export const ACCOUNT_DEFAULTS = {
  greetingText: "Merhaba,",
  infoTabText: "Bilgilerim",
  ordersTabText: "Siparişlerim",
  addressesTabText: "Adreslerim",
  favoritesTabText: "Favorilerim",
  settingsTabText: "Hesap ayarları",
  logoutText: "Çıkış yap",
  tabsAriaLabel: "Hesap menüsü",
  firstNameLabel: "AD",
  lastNameLabel: "SOYAD",
  emailLabel: "E-POSTA",
  phoneLabel: "TELEFON",
  saveText: "Kaydet",
  savingText: "Kaydediliyor…",
  savedText: "Bilgilerin güncellendi.",
  ordersColumnLabels: "SİPARİŞ, TARİH, DURUM, TUTAR",
  ordersEmptyText: "Henüz siparişin yok.",
  shopText: "Alışverişe başla",
  errorText: "Siparişlerin şu an yüklenemedi.",
  retryText: "Tekrar dene",
  orderDetailTitle: "Sipariş",
  packageTitleText: "PAKET {n}",
  cargoLabel: "Kargo firması",
  trackingLabel: "Takip numarası",
  copyAriaLabel: "Takip numarasını kopyala",
  copiedText: "Kopyalandı",
  quantityText: "{count} ADET",
  shippingAddressLabel: "TESLİMAT ADRESİ",
  billingAddressLabel: "FATURA ADRESİ",
  paymentLabel: "Ödeme",
  installmentText: "{count} taksit",
  subtotalLabel: "Ara toplam",
  shippingLabel: "Kargo",
  freeShippingText: "Ücretsiz",
  totalLabel: "Toplam",
  returnButtonText: "İade talebi oluştur",
  orderNotFoundText: "Sipariş bulunamadı.",
  returnTitle: "İade talebi",
  returnIntroText: "İade etmek istediğin ürünleri ve adedi seç.",
  returnReasonLabel: "İADE NEDENİ",
  returnSubmitText: "Talebi gönder",
  returnSubmittingText: "Gönderiliyor…",
  returnSuccessText: "Talebin alındı. Kargo kodu e-postana gönderilecek.",
  returnErrorText: "Talebin gönderilemedi. Lütfen tekrar dene.",
  returnEmptyText: "Bu siparişte iade edilebilecek ürün yok.",
  decreaseAriaLabel: "Adedi azalt",
  increaseAriaLabel: "Adedi artır",
  addressesEmptyText: "Henüz kayıtlı adresin yok.",
  addAddressText: "Yeni adres ekle",
  defaultBadgeText: "VARSAYILAN",
  editText: "Düzenle",
  deleteText: "Sil",
  deletingText: "Siliniyor…",
  makeDefaultText: "Varsayılan yap",
  confirmDeleteText: "Bu adres silinsin mi? Bu işlem geri alınamaz.",
  cancelText: "Vazgeç",
  addressFormTitle: "Yeni adres",
  addressEditTitle: "Adresi düzenle",
  addressSaveText: "Adresi kaydet",
  addressSavingText: "Kaydediliyor…",
  corporateText: "Kurumsal fatura istiyorum",
  defaultAddressText: "Varsayılan teslimat adresim olsun",
  marketingText: "Kampanya ve fırsatlardan e-posta ve SMS ile haberdar olmak istiyorum.",
  exportDataText: "Kişisel verilerinin bir kopyasını e-postana gönderelim.",
  exportButtonText: "Verilerimi indir",
  exportingText: "Hazırlanıyor…",
  exportSuccessText: "Verilerinin kopyası e-postana gönderildi.",
  deleteAccountText: "Hesabını silersen sipariş geçmişin ve adreslerin kalıcı olarak silinir.",
  deleteAccountButtonText: "Hesabımı sil",
  accountDeleteTitle: "Hesabını kalıcı olarak silmek istediğine emin misin?",
  accountDeleteConfirmText: "Siparişlerin, adreslerin ve favorilerin silinir; bu işlem geri alınamaz. Devam etmek için şifreni gir.",
  passwordLabel: "ŞİFRE",
  showPasswordLabel: "Şifreyi göster",
  hidePasswordLabel: "Şifreyi gizle",
  accountDeleteFinalText: "Hesabımı kalıcı olarak sil",
  accountDeletingText: "Siliniyor…",
  actionErrorText: "İşlem tamamlanamadı. Lütfen tekrar dene.",
  loadingText: "Yükleniyor…",
} satisfies Record<keyof Omit<Props, "backgroundColor">, string>;

export type AccountTexts = { [K in keyof typeof ACCOUNT_DEFAULTS]: string };

/** Editor values win (an emptied prop stays empty); undefined falls back to the canvas default. */
export function resolveAccountTexts(props: Props): AccountTexts {
  const out = { ...ACCOUNT_DEFAULTS } as AccountTexts;
  (Object.keys(ACCOUNT_DEFAULTS) as (keyof AccountTexts)[]).forEach((key) => {
    const value = props[key];
    if (typeof value === "string") out[key] = value;
  });
  return out;
}

/** "{count} ADET" → "2 ADET". */
export const fill = (tpl: string, key: string, value: string | number) => tpl.split(`{${key}}`).join(String(value));
