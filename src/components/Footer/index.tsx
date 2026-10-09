import { useEffect, useRef, useState } from "preact/hooks";
import {
  IkasComponentRenderer,
  createMediaSrcset,
  customerStore,
  getDefaultSrc,
  getNewsletterSubscriptionForm,
  initNewsletterSubscriptionForm,
  setNewsletterSubscriptionFormEmail,
  normalizeSvg,
  submitNewsletterSubscriptionForm,
} from "@ikas/bp-storefront";
import Button from "../../sub-components/Button";
import FormField from "../../sub-components/FormField";
import Icon from "../../sub-components/Icon";
import LocaleSwitcher, { currentLocaleLabel, hasLocaleAlternatives, hasLocaleOptions } from "../../sub-components/LocaleSwitcher";
import { cx } from "../../utils/cx";
import { useMounted } from "../../utils/hooks";
import { TEXT, forceScheme } from "../../utils/tokens";
import { UI_EVENT, onUi } from "../../utils/ui";
import { Props } from "./types";

type NotifyStatus = "idle" | "success" | "invalid" | "failure";

const toList = (v: any) => (Array.isArray(v) ? v : v ? [v] : []).flat().filter(Boolean);

/**
 * I/Section/Footer — always Mürekkep (ink). CTA band (image + scrim + fade/blur, frosted contact card
 * and a paper newsletter card), brand + social, FooterColumn children, bottom row with the
 * LocaleSwitcher trigger. Anims: I-FTR-01 (FooterColumn) · I-FTR-02 (SocialLink) · I-FTR-03 (Button) · I-FTR-04 (here).
 */
export function Footer(props: Props) {
  const {
    ctaImage,
    ctaTitle = "Sorun mu var?\nYaz, birlikte çözelim.",
    ctaButtonText = "Bize ulaş",
    ctaButtonLink,
    notifyTitle = "E-postayla bildirim al",
    notifyText = "Yeni sezon, mağaza etkinlikleri ve indirimler önce sana gelsin.",
    notifyPlaceholder = "E-posta adresin",
    notifyButtonText = "Kaydol",
    notifySubmittingText = "Gönderiliyor…",
    notifySuccessText = "Teşekkürler, listeye eklendin.",
    notifyErrorText = "Geçerli bir e-posta adresi gir.",
    notifyFailureText = "Bir sorun oluştu, lütfen tekrar dene.",
    logo,
    aboutText = "Dağda da şehirde de aynı ekipman. İsmail, rotanı kendin çizmen için tasarlar.",
    columns,
    socialLinks,
    contactText = "Bize ulaş: 0850 000 00 00",
    contactLink,
    localeText = "TL · Türkçe",
    localeTitle = "ÜLKE VE PARA BİRİMİ",
    languageTitle = "DİL",
    copyrightText = "© 2026 İsmail. Tüm hakları saklıdır.",
    coordinateText = "41°N 29°E · KADIKÖY, İSTANBUL",
    backgroundColor,
  } = props;

  const mounted = useMounted();
  const form = getNewsletterSubscriptionForm(customerStore);
  const [status, setStatus] = useState<NotifyStatus>("idle");
  const [localeOpen, setLocaleOpen] = useState(false);
  const [localeMode, setLocaleMode] = useState<"anchored" | "sheet">("anchored");
  const localeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    initNewsletterSubscriptionForm(form);
  }, []);

  // Other sections (e.g. MenuOverlay) open the switcher as a bottom sheet.
  useEffect(
    () =>
      onUi(UI_EVENT.openLocale, () => {
        setLocaleMode("sheet");
        setLocaleOpen(true);
      }),
    [],
  );
  useEffect(() => onUi(UI_EVENT.closeAll, () => setLocaleOpen(false)), []);

  const closeLocale = () => {
    setLocaleOpen(false);
    if (localeMode === "anchored") localeBtnRef.current?.focus();
  };

  const onNotifySubmit = async (e: Event) => {
    e.preventDefault();
    if (form.isSubmitting) return;
    setStatus("idle");
    const ok = await submitNewsletterSubscriptionForm(form);
    if (ok) {
      setStatus("success");
      initNewsletterSubscriptionForm(form);
    } else {
      setStatus(form.email.hasError ? "invalid" : "failure");
    }
  };

  const message =
    status === "success" ? notifySuccessText : status === "invalid" ? notifyErrorText : status === "failure" ? notifyFailureText : "";
  const columnList = toList(columns);
  const socialList = toList(socialLinks);
  // locale-button: always in the bottom row (canvas). Opens the switcher once the store's options are known;
  // the label follows the live routing only when the shopper can actually switch.
  const canSwitch = mounted && hasLocaleOptions();
  const localeLabel = (mounted && hasLocaleAlternatives() && currentLocaleLabel()) || localeText;
  const submitting = !!form.isSubmitting;

  return (
    <footer className={cx("ftr", forceScheme("ink"))} style={backgroundColor ? { backgroundColor } : undefined}>
      <div className="ftr__band">
        {ctaImage && (
          <img
            className="ftr__band-img"
            src={getDefaultSrc(ctaImage)}
            srcSet={createMediaSrcset(ctaImage)}
            sizes="100vw"
            alt={ctaImage.altText ?? ""}
            loading="lazy"
            decoding="async"
          />
        )}
        <div className="ftr__band-tint" aria-hidden="true" />
        <div className="ftr__band-blur" aria-hidden="true" />
        <div className="ftr__band-fade" aria-hidden="true" />

        <div className="ftr__cta">
          <div className="ftr__cta-card">
            {ctaTitle && <h2 className={cx("ftr__cta-title", TEXT.h2)}>{ctaTitle}</h2>}
            {ctaButtonText && (
              /* I-FTR-03 · M-11 via Button */
              <Button label={ctaButtonText} href={ctaButtonLink?.href} className="ftr__cta-btn" />
            )}
          </div>

          <div className={cx("ftr__notify", forceScheme("paper"))}>
            <div className="ftr__notify-text">
              {notifyTitle && <h3 className={cx("ftr__notify-title", TEXT.h4)}>{notifyTitle}</h3>}
              {notifyText && <p className={cx("ftr__notify-hint", TEXT.uiSm)}>{notifyText}</p>}
            </div>
            <form className="ftr__notify-form" onSubmit={onNotifySubmit} noValidate>
              <FormField
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                className="ftr__notify-field"
                value={form.email?.value ?? ""}
                placeholder={notifyPlaceholder}
                ariaLabel={notifyPlaceholder}
                invalid={!!form.email?.hasError}
                disabled={submitting}
                onInput={(v) => {
                  setNewsletterSubscriptionFormEmail(form, v);
                  if (status !== "idle") setStatus("idle");
                }}
              />
              <Button
                type="submit"
                label={submitting ? notifySubmittingText : notifyButtonText}
                state={submitting ? "loading" : "idle"}
                className="ftr__notify-btn"
              />
            </form>
            {/* I-FTR-04 · M-01: result fades up (y 8 → 0, 0.3s) */}
            <p
              className={cx(
                "ftr__notify-msg",
                TEXT.uiSm,
                message && "is-visible",
                status === "success" ? "ftr__notify-msg--ok" : "ftr__notify-msg--err",
              )}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          </div>
        </div>
      </div>

      <div className="ftr__lower">
        <div className="ftr__top">
          <div className="ftr__brand">
            {logo && <span className="ftr__logo" aria-hidden="true" dangerouslySetInnerHTML={{ __html: normalizeSvg(logo, { idPrefix: "ftr-logo" }) }} />}
            {aboutText && <p className={cx("ftr__about", TEXT.uiSm)}>{aboutText}</p>}
            {socialList.length > 0 && (
              /* I-FTR-02 · M-28 via SocialLink */
              <div className="ftr__social">
                <IkasComponentRenderer id="footer-social" components={socialList} parentProps={props} />
              </div>
            )}
          </div>
          {columnList.length > 0 && (
            /* I-FTR-01 · M-28 via FooterColumn */
            <nav className="ftr__columns">
              <IkasComponentRenderer id="footer-columns" components={columnList} parentProps={props} />
            </nav>
          )}
        </div>

        <div className="ftr__bottom">
          {coordinateText && <p className={cx("ftr__coord", TEXT.label)}>{coordinateText}</p>}
          {copyrightText && <p className={cx("ftr__copy", TEXT.uiSm)}>{copyrightText}</p>}
          <div className="ftr__meta">
            {contactText &&
              (contactLink?.href ? (
                <a className={cx("ftr__contact", TEXT.uiSm)} href={contactLink.href}>
                  {contactText}
                </a>
              ) : (
                <p className={cx("ftr__contact", TEXT.uiSm)}>{contactText}</p>
              ))}
            {localeLabel && (
              <div className="ftr__locale">
                <button
                  ref={localeBtnRef}
                  type="button"
                  className={cx("ftr__locale-btn", localeOpen && "is-open")}
                  aria-haspopup="dialog"
                  aria-expanded={localeOpen}
                  aria-controls="footer-locale-panel"
                  disabled={!canSwitch}
                  onClick={() => {
                    setLocaleMode("anchored");
                    setLocaleOpen((o) => !o);
                  }}
                >
                  <Icon name="globe" size={14} />
                  <span className={TEXT.uiSm}>{localeLabel}</span>
                  <Icon name="chevron-up" size={14} className="ftr__locale-caret" />
                </button>
                {canSwitch && <LocaleSwitcher
                  id="footer-locale-panel"
                  open={localeOpen}
                  mode={localeMode}
                  onClose={closeLocale}
                  localeTitle={localeTitle}
                  languageTitle={languageTitle}
                />}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
