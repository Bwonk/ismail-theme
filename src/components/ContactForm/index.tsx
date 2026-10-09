import { useEffect, useRef, useState } from "preact/hooks";
import {
  IkasComponentRenderer,
  IkasFormItem,
  customerStore,
  getContactForm,
  initContactForm,
  setContactFormEmail,
  setContactFormFirstName,
  setContactFormLastName,
  setContactFormMessage,
  setContactFormPhone,
  submitContactForm,
} from "@ikas/bp-storefront";
import Button from "../../sub-components/Button";
import Checkbox from "../../sub-components/Checkbox";
import FormField from "../../sub-components/FormField";
import { cx } from "../../utils/cx";
import { useReveal } from "../../utils/hooks";
import { TEXT } from "../../utils/tokens";
import { SCOPED_EVENT, onScoped } from "../../utils/ui";
import { Props } from "./types";

type Status = "idle" | "success" | "invalid" | "failure";

const toList = (v: any) => (Array.isArray(v) ? v : v ? [v] : []).flat().filter(Boolean);

/**
 * I/Section/ContactForm — display title + intro/response pill; form card (topic chips from ContactTopic,
 * name/email/phone/order/message, consent, submit) and the channel column (ContactChannel + SocialLink).
 * ikas: getContactForm → initContactForm → setContactForm* → submitContactForm. Topic and order number
 * are prefixed to the message (the ikas contact form has no such fields). Anims I-CONT-01..04.
 */
export function ContactForm(props: Props) {
  const {
    title = "Yaz, birlikte\nçözelim.",
    intro = "Siparişin, bedenin ya da mağazalarımızla ilgili bir sorun mu var? Ekibimiz hafta içi her gün yanıtlıyor.",
    responseText = "Ortalama yanıt süresi: 2 saat",
    formTitle = "Mesaj gönder",
    topicLabel = "Ne hakkında yazıyorsun?",
    firstNameLabel = "AD",
    firstNamePlaceholder = "Adın",
    lastNameLabel = "SOYAD",
    lastNamePlaceholder = "Soyadın",
    emailLabel = "E-POSTA",
    emailPlaceholder = "ornek@eposta.com",
    phoneLabel = "TELEFON (İSTEĞE BAĞLI)",
    phonePlaceholder = "05xx xxx xx xx",
    orderLabel = "SİPARİŞ NUMARASI (İSTEĞE BAĞLI)",
    orderPlaceholder = "#IS-10482",
    messageLabel = "MESAJ",
    messagePlaceholder = "Talebini biraz anlatır mısın?",
    consentText = "Aydınlatma metnini okudum, kabul ediyorum.",
    consentErrorText = "Devam etmek için onay vermelisin.",
    requiredErrorText = "Bu alan boş bırakılamaz.",
    emailErrorText = "Geçerli bir e-posta adresi gir.",
    submitText = "Mesajı gönder",
    submittingText = "Gönderiliyor…",
    successText = "Mesajın bize ulaştı. Genellikle 2 saat içinde dönüyoruz.",
    errorText = "İşaretli alanları kontrol et.",
    failureText = "Mesajın gönderilemedi, lütfen tekrar dene.",
    socialTitle = "Rotamızı takip et",
    topicPrefix = "Konu",
    orderPrefix = "Sipariş no",
    topics,
    channels,
    socialLinks,
    backgroundColor,
  } = props;

  const form = getContactForm(customerStore);
  const heroRef = useRef<HTMLDivElement>(null);
  const topicsRef = useRef<HTMLDivElement>(null);
  const reveal = useReveal(heroRef);
  const [topic, setTopic] = useState<string | null>(null);
  const [order, setOrder] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    initContactForm(form);
  }, []);

  useEffect(() => {
    const scope = topicsRef.current;
    if (!scope) return;
    return onScoped<{ label: string | null }>(scope, SCOPED_EVENT.contactTopic, (d) => setTopic(d?.label ?? null));
  }, []);

  const touch = () => status !== "idle" && status !== "invalid" && setStatus("idle");

  const fieldError = (item?: IkasFormItem, isEmail?: boolean) => {
    if (!item?.hasError) return undefined;
    return isEmail && item.value ? emailErrorText : requiredErrorText;
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (form.isSubmitting) return;
    const body = message.trim();
    const prefix = [topic && `${topicPrefix}: ${topic}`, order.trim() && `${orderPrefix}: ${order.trim()}`].filter(Boolean).join("\n");
    setContactFormMessage(form, body ? (prefix ? `${prefix}\n\n${body}` : body) : "");
    if (!consent) {
      setConsentError(true);
      setStatus("invalid");
      return;
    }
    setStatus("idle");
    const ok = await submitContactForm(form);
    if (ok) {
      initContactForm(form);
      setOrder("");
      setMessage("");
      setConsent(false);
      setStatus("success");
    } else {
      const invalid = ["firstName", "lastName", "email", "phone", "message"].some((k) => (form as any)[k]?.hasError);
      setStatus(invalid ? "invalid" : "failure");
    }
  };

  const submitting = !!form.isSubmitting;
  const resultText = status === "success" ? successText : status === "invalid" ? errorText : status === "failure" ? failureText : "";
  const topicList = toList(topics);
  const channelList = toList(channels);
  const socialList = toList(socialLinks);

  return (
    <section className="cform" style={backgroundColor ? { backgroundColor } : undefined}>
      <div ref={heroRef} className={cx("cform__hero", reveal)}>
        {title && <h1 className={cx("cform__title", TEXT.display)}>{title}</h1>}
        {(intro || responseText) && (
          <div className="cform__intro">
            {intro && <p className={cx("cform__intro-text", TEXT.body)}>{intro}</p>}
            {responseText && (
              <p className="cform__pill">
                <span className="cform__dot" aria-hidden="true" />
                <span className={TEXT.uiSm}>{responseText}</span>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="cform__body">
        <form className="cform__panel" onSubmit={onSubmit} noValidate aria-busy={submitting}>
          {formTitle && <h2 className={cx("cform__form-title", TEXT.h3)}>{formTitle}</h2>}

          {topicList.length > 0 && (
            <div className="cform__topics" role="group" aria-label={topicLabel || undefined}>
              {topicLabel && <p className={cx("cform__topic-label", TEXT.uiSm)}>{topicLabel}</p>}
              {/* I-CONT-04 · M-28 via ContactTopic */}
              <div ref={topicsRef} className="cform__topic-track" data-scope="contact-topics">
                <IkasComponentRenderer id="contact-topics" components={topicList} parentProps={props} />
              </div>
            </div>
          )}

          <div className="cform__row">
            <FormField
              label={firstNameLabel}
              name="firstName"
              autoComplete="given-name"
              value={form.firstName?.value ?? ""}
              placeholder={firstNamePlaceholder}
              error={fieldError(form.firstName)}
              disabled={submitting}
              onInput={(v) => (setContactFormFirstName(form, v), touch())}
            />
            <FormField
              label={lastNameLabel}
              name="lastName"
              autoComplete="family-name"
              value={form.lastName?.value ?? ""}
              placeholder={lastNamePlaceholder}
              error={fieldError(form.lastName)}
              disabled={submitting}
              onInput={(v) => (setContactFormLastName(form, v), touch())}
            />
          </div>
          <div className="cform__row">
            <FormField
              label={emailLabel}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={form.email?.value ?? ""}
              placeholder={emailPlaceholder}
              error={fieldError(form.email, true)}
              disabled={submitting}
              onInput={(v) => (setContactFormEmail(form, v), touch())}
            />
            <FormField
              label={phoneLabel}
              type="tel"
              name="phone"
              autoComplete="tel"
              inputMode="tel"
              value={form.phone?.value ?? ""}
              placeholder={phonePlaceholder}
              error={fieldError(form.phone)}
              disabled={submitting}
              onInput={(v) => (setContactFormPhone(form, v), touch())}
            />
          </div>
          <FormField
            label={orderLabel}
            name="orderNumber"
            value={order}
            placeholder={orderPlaceholder}
            disabled={submitting}
            onInput={(v) => (setOrder(v), touch())}
          />
          <FormField
            label={messageLabel}
            type="textarea"
            name="message"
            className="cform__message"
            rows={6}
            value={message}
            placeholder={messagePlaceholder}
            error={form.message?.hasError ? requiredErrorText : undefined}
            disabled={submitting}
            onInput={(v) => {
              setMessage(v);
              setContactFormMessage(form, v);
              touch();
            }}
          />

          <div className="cform__submit-row">
            <Checkbox
              checked={consent}
              label={consentText}
              error={consentError && !consent ? consentErrorText : undefined}
              disabled={submitting}
              onChange={(c) => {
                setConsent(c);
                if (c) setConsentError(false);
              }}
            />
            {/* I-CONT-01 · M-11 via Button */}
            <Button
              type="submit"
              label={submitting ? submittingText : submitText}
              state={submitting ? "loading" : "idle"}
              className="cform__submit"
            />
          </div>

          {/* I-CONT-02 · M-01: result fades up (y 8 → 0, 0.3s) */}
          <p
            className={cx("cform__result", TEXT.ui, resultText && "is-visible", status === "success" ? "cform__result--ok" : "cform__result--err")}
            role="status"
            aria-live="polite"
          >
            {resultText}
          </p>
        </form>

        {(channelList.length > 0 || socialList.length > 0) && (
          <div className="cform__channels">
            {channelList.length > 0 && (
              /* I-CONT-03 · M-28 via ContactChannel */
              <IkasComponentRenderer id="contact-channels" components={channelList} parentProps={props} />
            )}
            {socialList.length > 0 && (
              <div className="cform__social">
                {socialTitle && <p className={cx("cform__social-title", TEXT.ui)}>{socialTitle}</p>}
                <div className="cform__social-row">
                  <IkasComponentRenderer id="contact-social" components={socialList} parentProps={props} />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default ContactForm;
