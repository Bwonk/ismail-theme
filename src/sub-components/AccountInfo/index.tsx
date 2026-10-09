import { useEffect, useRef, useState } from "preact/hooks";
import {
  customerStore,
  getAccountInfoForm,
  initAccountInfoForm,
  setAccountInfoFormFirstName,
  setAccountInfoFormLastName,
  setAccountInfoFormPhone,
  submitAccountInfoForm,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import type { AccountTexts } from "../../components/Account/texts";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import AccountSkeleton from "../AccountSkeleton";
import Button from "../Button";
import FormField from "../FormField";

interface Props {
  texts: AccountTexts;
}

const errorProps = (f?: { hasError: boolean; message?: string }) => ({ error: f?.hasError ? f.message : undefined, invalid: !!f?.hasError });

/** I/Section/Account › info-form — 2-column FormFields, save button, "kaydedildi" message (fades in). */
const AccountInfo = observer(function AccountInfo({ texts: t }: Props) {
  const form = getAccountInfoForm(customerStore);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    initAccountInfoForm(form).finally(() => setLoading(false));
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (form.isSubmitting) return;
    setSaved(false);
    setFailed(false);
    const ok = await submitAccountInfoForm(form);
    setSaved(ok);
    setFailed(!ok && !!form.isFailure);
    if (timer.current) clearTimeout(timer.current);
    if (ok) timer.current = setTimeout(() => setSaved(false), 4000);
  };

  if (loading) return <AccountSkeleton label={t.loadingText} />;

  return (
    <form className="ainfo" onSubmit={onSubmit} noValidate>
      {t.infoTabText && <h2 className={cx("acc-title", TEXT.h4)}>{t.infoTabText}</h2>}
      <div className="ainfo__row">
        {form.firstName && (
          <FormField
            label={t.firstNameLabel}
            name="firstName"
            autoComplete="given-name"
            value={form.firstName.value}
            {...errorProps(form.firstName)}
            onInput={(v) => setAccountInfoFormFirstName(form, v)}
          />
        )}
        {form.lastName && (
          <FormField
            label={t.lastNameLabel}
            name="lastName"
            autoComplete="family-name"
            value={form.lastName.value}
            {...errorProps(form.lastName)}
            onInput={(v) => setAccountInfoFormLastName(form, v)}
          />
        )}
      </div>
      <div className="ainfo__row">
        <FormField label={t.emailLabel} type="email" name="email" value={customerStore.customer?.email ?? ""} readOnly />
        {form.phone && (
          <FormField
            label={t.phoneLabel}
            type="tel"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            value={form.phone.value}
            {...errorProps(form.phone)}
            onInput={(v) => setAccountInfoFormPhone(form, v)}
          />
        )}
      </div>
      <div className="ainfo__actions">
        <Button
          type="submit"
          label={form.isSubmitting ? t.savingText : t.saveText}
          state={form.isSubmitting ? "loading" : "idle"}
        />
        <p className={cx("ainfo__msg", saved && "ainfo__msg--on", "acc-success", TEXT.ui)} role="status" aria-live="polite">
          {saved ? t.savedText : ""}
        </p>
        {failed && (
          <p className={cx("acc-danger", TEXT.uiSm)} role="alert">
            {form.responseMessage || t.actionErrorText}
          </p>
        )}
      </div>
    </form>
  );
});

export default AccountInfo;
