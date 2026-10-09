import { useEffect, useRef, useState } from "preact/hooks";
import type { ComponentChildren } from "preact";
import {
  type IkasNavigationLink,
  Router,
  createMediaSrcset,
  customerStore,
  getDefaultSrc,
  getForgotPasswordForm,
  getLoginForm,
  getRecoverPasswordForm,
  getRegisterForm,
  getSmsLoginForm,
  handleSocialLogin,
  initForgotPasswordForm,
  initLoginForm,
  initRecoverPasswordForm,
  initRegisterForm,
  initSmsLoginForm,
  resendSmsLoginFormCode,
  setForgotPasswordFormEmail,
  setLoginFormEmail,
  setLoginFormPassword,
  setRecoverPasswordFormPassword,
  setRecoverPasswordFormPasswordAgain,
  setRegisterFormEmail,
  setRegisterFormFirstName,
  setRegisterFormIsMarketingAccepted,
  setRegisterFormIsMembershipAgreementAccepted,
  setRegisterFormLastName,
  setRegisterFormPassword,
  setSmsLoginFormCode,
  setSmsLoginFormEmail,
  setSmsLoginFormFirstName,
  setSmsLoginFormIsMarketingAccepted,
  setSmsLoginFormIsMembershipAgreementAccepted,
  setSmsLoginFormLastName,
  setSmsLoginFormPhone,
  socialLogin,
  submitForgotPasswordForm,
  submitLoginForm,
  submitRecoverPasswordForm,
  submitRegisterForm,
  submitSmsLoginForm,
  waitForCustomerStoreInit,
} from "@ikas/bp-storefront";
import ArrowLink from "../../sub-components/ArrowLink";
import Button from "../../sub-components/Button";
import Checkbox from "../../sub-components/Checkbox";
import FormField from "../../sub-components/FormField";
import SocialLoginButton from "../../sub-components/SocialLoginButton";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import { Props } from "./types";

type Field = { value: string; hasError: boolean; message?: string };
type Flag = { value: boolean; hasError: boolean; message?: string };
type Tone = "success" | "danger";

const fieldError = (f?: { hasError: boolean; message?: string } | null) => (f?.hasError ? f.message || undefined : undefined);
const hasFieldErrors = (...fields: Array<{ hasError: boolean } | undefined | null>) => fields.some((f) => !!f?.hasError);

/** "05321234518" → "0532 *** ** 18" for the SMS code note. */
function maskPhone(value: string) {
  const digits = (value || "").replace(/\D/g, "");
  if (digits.length < 6) return value;
  return `${digits.slice(0, 4)} *** ** ${digits.slice(-2)}`;
}

/**
 * I/Section/AuthForms — login · register · forgot password · recover password (variant ENUM),
 * with SMS login (phone → code → profile) and Google/Facebook login. Image half is desktop-only.
 */
export function AuthForms({
  variant = "login",
  showGoogle = true,
  showFacebook = true,
  showSmsLogin = true,
  image,
  loginTitle = "Giriş yap",
  registerTitle = "Hesap oluştur",
  forgotTitle = "Şifreni mi unuttun?",
  recoverTitle = "Yeni şifre belirle",
  smsTitle = "Telefonla giriş",
  loginText = "Siparişlerini takip et, favorilerini her cihazda gör.",
  registerText = "Bir hesapla siparişlerini takip et, adreslerini kaydet.",
  forgotText = "E-posta adresini yaz, yenileme bağlantısını gönderelim.",
  recoverText = "En az 8 karakter; bir harf ve bir rakam içersin.",
  smsText = "Numarana tek kullanımlık bir kod gönderelim.",
  smsProfileText = "Son bir adım: hesabını tamamla.",
  submitText = "Giriş yap",
  registerSubmitText = "Kaydol",
  forgotSubmitText = "Bağlantı gönder",
  recoverSubmitText = "Şifreyi kaydet",
  sendCodeText = "Kod gönder",
  submittingText = "Lütfen bekle…",
  firstNameLabel = "AD",
  lastNameLabel = "SOYAD",
  emailLabel = "E-POSTA",
  emailPlaceholder = "ornek@eposta.com",
  passwordLabel = "ŞİFRE",
  newPasswordLabel = "YENİ ŞİFRE",
  passwordAgainLabel = "ŞİFRE (TEKRAR)",
  phoneLabel = "TELEFON",
  phonePlaceholder = "05xx xxx xx xx",
  codeLabel = "DOĞRULAMA KODU",
  codeSentText = "{phone} numarasına 6 haneli kod gönderdik.",
  resendCodeText = "Kodu tekrar gönder",
  marketingConsentText = "Kampanya ve fırsatlardan e-posta/SMS ile haberdar olmak istiyorum.",
  agreementConsentText = "Üyelik sözleşmesini ve KVKK aydınlatma metnini okudum, kabul ediyorum.",
  forgotLinkText = "Şifremi unuttum",
  socialDividerText = "veya",
  googleText = "Google ile devam et",
  facebookText = "Facebook ile devam et",
  smsLoginText = "Telefon numarasıyla giriş yap",
  emailLoginText = "E-posta ile giriş yap",
  successText = "E-postanı kontrol et; şifre yenileme bağlantısı gönderildi.",
  recoverSuccessText = "Şifren güncellendi. Giriş sayfasına yönlendiriliyorsun.",
  registerSuccessText = "Hesabın oluşturuldu. E-postana gönderdiğimiz bağlantıyla hesabını doğrula.",
  errorText = "E-posta ya da şifre hatalı.",
  invalidTokenText = "Bu bağlantının süresi dolmuş. Yeni bir bağlantı iste.",
  switchText = "Hesabın yok mu?",
  registerLinkText = "Kaydol",
  registerSwitchText = "Zaten hesabın var mı?",
  forgotSwitchText = "Hatırladın mı?",
  loginLinkText = "Giriş yap",
  newLinkText = "Yeni bağlantı iste",
  orderTrackingText = "Üye olmadan sipariş verdin mi? Siparişini takip et",
  agreementLink,
  marketingLink,
  orderTrackingLink,
  backgroundColor,
}: Props) {
  const isAccountVariant = variant === "login" || variant === "register";
  const [mode, setMode] = useState<"email" | "sms">("email");
  const [registeredPending, setRegisteredPending] = useState(false);
  const [recoverDone, setRecoverDone] = useState(false);
  const [socialBusy, setSocialBusy] = useState<"google" | "facebook" | null>(null);
  const [resending, setResending] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Forms live in customerStore; only the active variant's form is touched.
  const loginForm = variant === "login" ? getLoginForm(customerStore) : null;
  const registerForm = variant === "register" ? getRegisterForm(customerStore) : null;
  const forgotForm = variant === "forgot" ? getForgotPasswordForm(customerStore) : null;
  const recoverForm = variant === "recover" ? getRecoverPasswordForm(customerStore) : null;
  const smsForm = isAccountVariant && mode === "sms" ? getSmsLoginForm(customerStore) : null;

  useEffect(() => {
    let alive = true;
    setMode("email");
    setRegisteredPending(false);
    setRecoverDone(false);
    waitForCustomerStoreInit(customerStore).then(() => {
      if (!alive) return;
      if (customerStore.customer && variant !== "recover") {
        Router.navigateToPage("ACCOUNT");
        return;
      }
      if (variant === "login") initLoginForm(getLoginForm(customerStore));
      if (variant === "register") initRegisterForm(getRegisterForm(customerStore));
      if (variant === "forgot") initForgotPasswordForm(getForgotPasswordForm(customerStore));
      if (variant === "recover") initRecoverPasswordForm(getRecoverPasswordForm(customerStore));
      if (variant === "login" || variant === "register") {
        handleSocialLogin(customerStore).then((result) => {
          if (alive && result?.status === "success") Router.navigateToPage("ACCOUNT");
        });
      }
    });
    return () => {
      alive = false;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [variant]);

  const go = (page: "LOGIN" | "REGISTER" | "FORGOT_PASSWORD" | "ACCOUNT") => () => Router.navigateToPage(page);

  const openSms = () => {
    initSmsLoginForm(getSmsLoginForm(customerStore));
    setMode("sms");
  };

  const onSocial = async (provider: "google" | "facebook") => {
    if (socialBusy) return;
    setSocialBusy(provider);
    try {
      await socialLogin(customerStore, provider);
    } finally {
      setSocialBusy(null);
    }
  };

  /* ---------- submit handlers ---------- */
  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (smsForm) {
      const ok = await submitSmsLoginForm(smsForm);
      if (ok && (smsForm.step === "Completed" || customerStore.customer)) Router.navigateToPage("ACCOUNT");
      return;
    }
    if (loginForm) {
      if (await submitLoginForm(loginForm)) Router.navigateToPage("ACCOUNT");
      return;
    }
    if (registerForm) {
      if (await submitRegisterForm(registerForm)) {
        // Stores with e-mail validation keep the visitor logged out until the link is clicked.
        if (customerStore.customer) Router.navigateToPage("ACCOUNT");
        else setRegisteredPending(true);
      }
      return;
    }
    if (forgotForm) {
      await submitForgotPasswordForm(forgotForm);
      return;
    }
    if (recoverForm) {
      if (await submitRecoverPasswordForm(recoverForm)) {
        setRecoverDone(true);
        timer.current = setTimeout(() => Router.navigateToPage("LOGIN"), 1600);
      }
    }
  };

  const onResendCode = async () => {
    if (!smsForm || resending) return;
    setResending(true);
    try {
      await resendSmsLoginFormCode(smsForm);
    } finally {
      setResending(false);
    }
  };

  /* ---------- derived state ---------- */
  const smsStep = smsForm?.step;
  const smsProfile = smsStep === "Complete Profile";

  let title = loginTitle;
  let text = loginText;
  if (smsForm) {
    title = smsTitle;
    text = smsProfile ? smsProfileText : smsText;
  } else if (variant === "register") {
    title = registerTitle;
    text = registerText;
  } else if (variant === "forgot") {
    title = forgotTitle;
    text = forgotText;
  } else if (variant === "recover") {
    title = recoverTitle;
    text = recoverText;
  }

  const recoverInvalid =
    !!recoverForm && !recoverDone && !!recoverForm.isFailure && !hasFieldErrors(recoverForm.password, recoverForm.passwordAgain);

  let message: { tone: Tone; text: string } | null = null;
  if (smsForm) {
    if (smsForm.isFailure && smsForm.responseMessage) message = { tone: "danger", text: smsForm.responseMessage };
  } else if (loginForm?.isFailure) {
    message = { tone: "danger", text: errorText };
  } else if (registerForm) {
    if (registeredPending) message = { tone: "success", text: registerSuccessText };
    else if (registerForm.isFailure && registerForm.responseMessage) message = { tone: "danger", text: registerForm.responseMessage };
  } else if (forgotForm) {
    if (forgotForm.isSuccess) message = { tone: "success", text: successText };
    else if (forgotForm.isFailure && forgotForm.responseMessage) message = { tone: "danger", text: forgotForm.responseMessage };
  } else if (recoverForm) {
    if (recoverDone) message = { tone: "success", text: recoverSuccessText };
    else if (recoverInvalid) message = { tone: "danger", text: invalidTokenText };
  }

  const submitting = !!(smsForm ?? loginForm ?? registerForm ?? forgotForm ?? recoverForm)?.isSubmitting;
  let buttonText = submitText;
  if (smsForm) buttonText = smsStep === "Enter Phone Number" ? sendCodeText : smsProfile ? registerSubmitText : submitText;
  else if (variant === "register") buttonText = registerSubmitText;
  else if (variant === "forgot") buttonText = forgotSubmitText;
  else if (variant === "recover") buttonText = recoverSubmitText;

  const showSocial = isAccountVariant && !smsForm && (showGoogle || showFacebook || showSmsLogin);
  const hasImage = !!image?.id;

  /* ---------- pieces ---------- */
  const linkLabel = (label: string, link?: IkasNavigationLink | null): ComponentChildren =>
    link?.href ? (
      <a href={link.href} {...(link.openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {label}
      </a>
    ) : (
      label
    );

  const consents = (marketing: Flag | undefined, agreement: Flag | undefined, onMarketing: (v: boolean) => void, onAgreement: (v: boolean) => void) => (
    /* register-consents — two separate consents */
    <div className="auth__consents">
      {marketingConsentText && (
        <Checkbox
          checked={!!marketing?.value}
          onChange={onMarketing}
          label={linkLabel(marketingConsentText, marketingLink)}
          error={fieldError(marketing)}
          name="marketing"
        />
      )}
      <Checkbox
        checked={!!agreement?.value}
        onChange={onAgreement}
        label={linkLabel(agreementConsentText, agreementLink)}
        error={fieldError(agreement)}
        name="agreement"
        required
      />
    </div>
  );

  const nameStage = (first: Field | undefined, last: Field | undefined, onFirst: (v: string) => void, onLast: (v: string) => void) => (
    <div className="auth__names">
      <FormField label={firstNameLabel} name="given-name" autoComplete="given-name" value={first?.value ?? ""} error={fieldError(first)} onInput={onFirst} />
      <FormField label={lastNameLabel} name="family-name" autoComplete="family-name" value={last?.value ?? ""} error={fieldError(last)} onInput={onLast} />
    </div>
  );

  const emailField = (f: Field | undefined, onInput: (v: string) => void) => (
    <FormField
      label={emailLabel}
      type="email"
      name="email"
      autoComplete="email"
      inputMode="email"
      placeholder={emailPlaceholder}
      value={f?.value ?? ""}
      error={fieldError(f)}
      onInput={onInput}
    />
  );

  let fields: ComponentChildren = null;
  if (smsForm) {
    /* sms-login — phone stage · code stage · profile stage */
    if (smsStep === "Verify Code") {
      fields = (
        <>
          <p className={cx("auth__note", TEXT.uiSm)}>{codeSentText.replace("{phone}", maskPhone(smsForm.phone?.value ?? ""))}</p>
          <FormField
            label={codeLabel}
            name="one-time-code"
            autoComplete="one-time-code"
            inputMode="numeric"
            maxLength={6}
            value={smsForm.code?.value ?? ""}
            error={fieldError(smsForm.code)}
            onInput={(v) => setSmsLoginFormCode(smsForm, v)}
          />
        </>
      );
    } else if (smsProfile) {
      fields = (
        <>
          {nameStage(
            smsForm.firstName,
            smsForm.lastName,
            (v) => setSmsLoginFormFirstName(smsForm, v),
            (v) => setSmsLoginFormLastName(smsForm, v),
          )}
          {emailField(smsForm.email, (v) => setSmsLoginFormEmail(smsForm, v))}
          {consents(
            smsForm.isMarketingAccepted,
            smsForm.isMembershipAgreementAccepted,
            (v) => setSmsLoginFormIsMarketingAccepted(smsForm, v),
            (v) => setSmsLoginFormIsMembershipAgreementAccepted(smsForm, v),
          )}
        </>
      );
    } else {
      fields = (
        <FormField
          label={phoneLabel}
          type="tel"
          name="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder={phonePlaceholder}
          value={smsForm.phone?.value ?? ""}
          error={fieldError(smsForm.phone)}
          onInput={(v) => setSmsLoginFormPhone(smsForm, v)}
        />
      );
    }
  } else if (loginForm) {
    fields = (
      <>
        {emailField(loginForm.email, (v) => setLoginFormEmail(loginForm, v))}
        <FormField
          label={passwordLabel}
          type="password"
          name="current-password"
          autoComplete="current-password"
          value={loginForm.password?.value ?? ""}
          error={fieldError(loginForm.password)}
          onInput={(v) => setLoginFormPassword(loginForm, v)}
        />
        {forgotLinkText && <ArrowLink label={forgotLinkText} className="auth__forgot" onClick={go("FORGOT_PASSWORD")} />}
      </>
    );
  } else if (registerForm) {
    fields = (
      <>
        {nameStage(
          registerForm.firstName,
          registerForm.lastName,
          (v) => setRegisterFormFirstName(registerForm, v),
          (v) => setRegisterFormLastName(registerForm, v),
        )}
        {emailField(registerForm.email, (v) => setRegisterFormEmail(registerForm, v))}
        <FormField
          label={passwordLabel}
          type="password"
          name="new-password"
          autoComplete="new-password"
          value={registerForm.password?.value ?? ""}
          error={fieldError(registerForm.password)}
          onInput={(v) => setRegisterFormPassword(registerForm, v)}
        />
        {consents(
          registerForm.isMarketingAccepted,
          registerForm.isMembershipAgreementAccepted,
          (v) => setRegisterFormIsMarketingAccepted(registerForm, v),
          (v) => setRegisterFormIsMembershipAgreementAccepted(registerForm, v),
        )}
      </>
    );
  } else if (forgotForm) {
    fields = emailField(forgotForm.email, (v) => setForgotPasswordFormEmail(forgotForm, v));
  } else if (recoverForm) {
    fields = (
      <>
        <FormField
          label={newPasswordLabel}
          type="password"
          name="new-password"
          autoComplete="new-password"
          value={recoverForm.password?.value ?? ""}
          error={fieldError(recoverForm.password)}
          disabled={recoverDone}
          onInput={(v) => setRecoverPasswordFormPassword(recoverForm, v)}
        />
        <FormField
          label={passwordAgainLabel}
          type="password"
          name="new-password-again"
          autoComplete="new-password"
          value={recoverForm.passwordAgain?.value ?? ""}
          error={fieldError(recoverForm.passwordAgain)}
          disabled={recoverDone}
          onInput={(v) => setRecoverPasswordFormPasswordAgain(recoverForm, v)}
        />
      </>
    );
  }

  let switchRow: ComponentChildren = null;
  if (variant === "login") {
    switchRow = (
      <>
        {switchText && <span className={cx("auth__switch-text", TEXT.ui)}>{switchText}</span>}
        <ArrowLink label={registerLinkText} onClick={go("REGISTER")} />
      </>
    );
  } else if (variant === "register") {
    switchRow = (
      <>
        {registerSwitchText && <span className={cx("auth__switch-text", TEXT.ui)}>{registerSwitchText}</span>}
        <ArrowLink label={loginLinkText} onClick={go("LOGIN")} />
      </>
    );
  } else if (variant === "forgot") {
    switchRow = (
      <>
        {forgotSwitchText && <span className={cx("auth__switch-text", TEXT.ui)}>{forgotSwitchText}</span>}
        <ArrowLink label={loginLinkText} onClick={go("LOGIN")} />
      </>
    );
  } else if (recoverInvalid) {
    switchRow = <ArrowLink label={newLinkText} onClick={go("FORGOT_PASSWORD")} />;
  }

  const smsWaiting = (smsForm?.time ?? 0) > 0;

  return (
    <section className={cx("auth", hasImage && "auth--media")} style={backgroundColor ? { backgroundColor } : undefined}>
      {hasImage && (
        /* auth-media — desktop only */
        <div className="auth__media">
          <img
            className="auth__img"
            src={getDefaultSrc(image!)}
            srcSet={createMediaSrcset(image!)}
            sizes="50vw"
            alt={image?.altText ?? ""}
            loading="eager"
            decoding="async"
          />
        </div>
      )}

      <div className="auth__panel">
        <div className="auth__inner">
          <div className="auth__head" key={`${variant}-${mode}-${smsStep ?? ""}`}>
            {title && <h1 className={cx("auth__title", TEXT.h2)}>{title}</h1>}
            {text && <p className={cx("auth__text", TEXT.body)}>{text}</p>}
          </div>

          <form className="auth__form" onSubmit={onSubmit} noValidate>
            <div className="auth__fields">{fields}</div>

            {/* auth-button · I-AUTH-01 · M-11 (Button hover fill) */}
            <Button
              type="submit"
              fullWidth
              label={submitting ? submittingText : buttonText}
              state={submitting ? "loading" : "idle"}
              disabled={recoverDone}
            />

            {smsForm && smsStep === "Verify Code" && resendCodeText && (
              /* sms-resend */
              <button type="button" className={cx("auth__resend", TEXT.label, "tabular")} disabled={smsWaiting || resending} onClick={onResendCode}>
                {resendCodeText}
                {smsWaiting && smsForm.formattedTime ? ` · ${smsForm.formattedTime}` : ""}
              </button>
            )}
          </form>

          {showSocial && (
            /* social-login */
            <div className="auth__social">
              {(showGoogle || showFacebook) && (
                <div className="auth__divider" aria-hidden={!socialDividerText}>
                  <span className="auth__divider-line" />
                  {socialDividerText && <span className={cx("auth__divider-text", TEXT.label)}>{socialDividerText}</span>}
                  <span className="auth__divider-line" />
                </div>
              )}
              {showGoogle && (
                <SocialLoginButton provider="google" label={googleText} loading={socialBusy === "google"} disabled={!!socialBusy} onClick={() => onSocial("google")} />
              )}
              {showFacebook && (
                <SocialLoginButton
                  provider="facebook"
                  label={facebookText}
                  loading={socialBusy === "facebook"}
                  disabled={!!socialBusy}
                  onClick={() => onSocial("facebook")}
                />
              )}
              {showSmsLogin && smsLoginText && (
                <button type="button" className={cx("auth__textlink", TEXT.uiSm)} onClick={openSms}>
                  {smsLoginText}
                </button>
              )}
            </div>
          )}

          {smsForm && emailLoginText && (
            <button type="button" className={cx("auth__textlink", TEXT.uiSm)} onClick={() => setMode("email")}>
              {emailLoginText}
            </button>
          )}

          {message && (
            /* auth-message · I-AUTH-02 · M-01 */
            <p
              key={message.text}
              className={cx("auth__message", `auth__message--${message.tone}`, TEXT.ui)}
              role={message.tone === "danger" ? "alert" : "status"}
            >
              {message.text}
            </p>
          )}

          {switchRow && <div className="auth__switch">{switchRow}</div>}

          {variant === "login" && orderTrackingText && orderTrackingLink?.href && (
            <a className={cx("auth__guest", TEXT.uiSm)} href={orderTrackingLink.href}>
              {orderTrackingText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default AuthForms;
