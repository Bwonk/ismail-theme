import { useEffect, useState } from "preact/hooks";
import { Router, activateCustomer, customerStore, resendCustomerActivationMail } from "@ikas/bp-storefront";
import Button from "../../sub-components/Button";
import FormField from "../../sub-components/FormField";
import Icon from "../../sub-components/Icon";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import { Props } from "./types";

type Status = "verifying" | "success" | "error";
type Resend = "idle" | "sending" | "sent" | "failed";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** I/Section/EmailVerification — doğrulanıyor · başarılı · hata (+ tekrar gönder formu) · tekrar gönderildi. */
export function EmailVerification({
  verifyingText = "E-postan doğrulanıyor…",
  verifyingSubtext = "Birkaç saniye sürebilir, sayfayı kapatma.",
  successTitle = "Hesabın hazır",
  successText = "E-posta adresin doğrulandı. Artık giriş yapabilirsin.",
  errorTitle = "Doğrulama başarısız",
  errorText = "Bağlantının süresi dolmuş olabilir. Yeni bir doğrulama e-postası iste.",
  buttonText = "Giriş yap",
  resendTitle = "Doğrulama e-postasını yeniden gönder",
  emailLabel = "E-POSTA",
  emailPlaceholder = "elif@ornek.com",
  resendButtonText = "Gönder",
  resendingText = "Gönderiliyor…",
  resentTitle = "E-postanı kontrol et",
  resentText = "Yeni bağlantıyı gönderdik; gelen kutunu ve gereksiz klasörünü kontrol et.",
  resendSuccessText = "Yeni doğrulama bağlantısı e-postana gönderildi.",
  resendErrorText = "E-posta gönderilemedi. Adresini kontrol edip tekrar dene.",
  backgroundColor,
}: Props) {
  const [status, setStatus] = useState<Status>("verifying");
  const [resend, setResend] = useState<Resend>("idle");
  const [email, setEmail] = useState("");
  const [invalid, setInvalid] = useState(false);

  useEffect(() => {
    let alive = true;
    activateCustomer(customerStore)
      .then((ok) => alive && setStatus(ok ? "success" : "error"))
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, []);

  const onResend = async (e: Event) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setInvalid(true);
      return;
    }
    if (resend === "sending") return;
    setResend("sending");
    const ok = await resendCustomerActivationMail(customerStore, value).catch(() => false);
    setResend(ok ? "sent" : "failed");
  };

  const sent = status === "error" && resend === "sent";
  let title = verifyingText;
  let text = verifyingSubtext;
  if (status === "success") {
    title = successTitle;
    text = successText;
  } else if (sent) {
    title = resentTitle;
    text = resentText;
  } else if (status === "error") {
    title = errorTitle;
    text = errorText;
  }

  return (
    <section className="emv" style={backgroundColor ? { backgroundColor } : undefined} aria-busy={status === "verifying"}>
      {/* verify-icon — loader-circle (accent, spins) | check (success) | triangle-alert (danger) | mail-check (success) */}
      <div
        className={cx("emv__icon", status === "verifying" && "emv__icon--busy", status === "error" && !sent && "emv__icon--danger")}
        key={`${status}-${sent}`}
      >
        {status === "verifying" && <Icon name="loader-circle" size={24} className="emv__loader" />}
        {status === "success" && <Icon name="check" size={24} />}
        {status === "error" && <Icon name={sent ? "mail-check" : "triangle-alert"} size={24} />}
      </div>

      <h1 className={cx("emv__title", TEXT.h3)} role="status" aria-live="polite">
        {title}
      </h1>
      {text && <p className={cx("emv__text", TEXT.body)}>{text}</p>}

      {status !== "error" && buttonText && (
        /* verify-button · I-EMV-01 · M-11 — reserved (invisible) while verifying */
        <div className={cx("emv__actions", status === "verifying" && "emv__actions--hidden")} aria-hidden={status === "verifying"}>
          <Button label={buttonText} disabled={status === "verifying"} onClick={() => Router.navigateToPage("LOGIN")} />
        </div>
      )}

      {status === "error" && (
        /* resend-form */
        <form className="emv__resend" onSubmit={onResend} noValidate>
          {resendTitle && <p className={cx("emv__resend-title", TEXT.ui)}>{resendTitle}</p>}
          <div className="emv__resend-row">
            <FormField
              label={emailLabel}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder={emailPlaceholder}
              value={email}
              invalid={invalid}
              onInput={(v) => {
                setEmail(v);
                if (invalid) setInvalid(false);
              }}
            />
            <Button
              type="submit"
              className="emv__resend-button"
              label={resend === "sending" ? resendingText : resendButtonText}
              state={resend === "sending" ? "loading" : "idle"}
            />
          </div>
          {resend === "sent" && resendSuccessText && (
            <p className={cx("emv__msg", "emv__msg--success", TEXT.uiSm)} role="status">
              {resendSuccessText}
            </p>
          )}
          {resend === "failed" && resendErrorText && (
            <p className={cx("emv__msg", "emv__msg--danger", TEXT.uiSm)} role="alert">
              {resendErrorText}
            </p>
          )}
        </form>
      )}
    </section>
  );
}

export default EmailVerification;
