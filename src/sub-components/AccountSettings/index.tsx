import { useEffect, useRef, useState } from "preact/hooks";
import {
  Router,
  customerStore,
  exportCustomerPersonalData,
  getAccountInfoForm,
  getDeactivateCustomerForm,
  initAccountInfoForm,
  initDeactivateCustomerForm,
  isCustomerSubscribed,
  logout,
  setAccountInfoFormIsMarketingAccepted,
  setAccountInfoFormPhone,
  setDeactivateCustomerFormPassword,
  submitAccountInfoForm,
  submitDeactivateCustomerForm,
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

type Status = "idle" | "busy" | "success" | "error";

/**
 * I/Section/Account › account-settings — phone, pazarlama izni anahtarı (saved on change),
 * KVKK veri kopyası (exportCustomerPersonalData), hesap silme with inline password confirmation (hesap silme onayı).
 */
const AccountSettings = observer(function AccountSettings({ texts: t }: Props) {
  const form = getAccountInfoForm(customerStore);
  const deactivate = getDeactivateCustomerForm(customerStore);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<Status>("idle");
  const [exportStatus, setExportStatus] = useState<Status>("idle");
  const [confirming, setConfirming] = useState(false);
  const [deleteFailed, setDeleteFailed] = useState(false);
  const savedPhone = useRef("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    initDeactivateCustomerForm(deactivate);
    initAccountInfoForm(form).finally(() => {
      savedPhone.current = form.phone?.value ?? "";
      setLoading(false);
    });
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const customer = customerStore.customer;
  const marketing = form.isMarketingAccepted?.value ?? (customer ? isCustomerSubscribed(customer) : false);

  const save = async () => {
    if (form.isSubmitting) return;
    setSaveStatus("busy");
    const ok = await submitAccountInfoForm(form);
    setSaveStatus(ok ? "success" : "error");
    if (ok) savedPhone.current = form.phone?.value ?? "";
    if (timer.current) clearTimeout(timer.current);
    if (ok) timer.current = setTimeout(() => setSaveStatus("idle"), 4000);
  };

  const onMarketing = () => {
    if (form.isSubmitting) return;
    setAccountInfoFormIsMarketingAccepted(form, !marketing);
    save();
  };

  const onPhoneBlur = () => {
    if ((form.phone?.value ?? "") !== savedPhone.current) save();
  };

  const onExport = async () => {
    if (exportStatus === "busy") return;
    setExportStatus("busy");
    const res = await exportCustomerPersonalData(customerStore).catch(() => undefined);
    setExportStatus(res?.isSuccess ? "success" : "error");
  };

  const onDelete = async (e: Event) => {
    e.preventDefault();
    if (deactivate.isSubmitting) return;
    setDeleteFailed(false);
    const ok = await submitDeactivateCustomerForm(deactivate);
    if (ok) {
      await logout(customerStore);
      Router.navigateToPage("INDEX");
      return;
    }
    setDeleteFailed(!!deactivate.isFailure);
  };

  const closeConfirm = () => {
    setConfirming(false);
    setDeleteFailed(false);
    setDeactivateCustomerFormPassword(deactivate, "");
  };

  if (loading) return <AccountSkeleton label={t.loadingText} />;

  return (
    <div className="aset">
      {t.settingsTabText && <h2 className={cx("acc-title", TEXT.h4)}>{t.settingsTabText}</h2>}

      {form.phone && (
        <FormField
          label={t.phoneLabel}
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          value={form.phone.value}
          error={form.phone.hasError ? form.phone.message : undefined}
          invalid={form.phone.hasError}
          onInput={(v) => setAccountInfoFormPhone(form, v)}
          onBlur={onPhoneBlur}
        />
      )}

      <div className="aset__marketing">
        <button
          type="button"
          role="switch"
          aria-checked={marketing}
          aria-labelledby="aset-marketing-text"
          className={cx("aset__toggle", marketing && "aset__toggle--on")}
          disabled={form.isSubmitting}
          onClick={onMarketing}
        >
          <span className="aset__knob" aria-hidden="true" />
        </button>
        <span id="aset-marketing-text" className={cx("aset__marketing-text", TEXT.uiSm)}>
          {t.marketingText}
        </span>
      </div>
      {(saveStatus === "success" || saveStatus === "error") && (
        <p
          className={cx("aset__msg", saveStatus === "success" ? "acc-success" : "acc-danger", TEXT.uiSm)}
          role={saveStatus === "success" ? "status" : "alert"}
        >
          {saveStatus === "success" ? t.savedText : form.responseMessage || t.actionErrorText}
        </p>
      )}

      <div className="aset__block">
        <div className="aset__block-text">
          <p className={cx("aset__text", TEXT.uiSm)}>{t.exportDataText}</p>
          {(exportStatus === "success" || exportStatus === "error") && (
            <p
              className={cx("aset__text", exportStatus === "success" ? "acc-success" : "acc-danger", TEXT.uiSm)}
              role={exportStatus === "success" ? "status" : "alert"}
            >
              {exportStatus === "success" ? t.exportSuccessText : t.actionErrorText}
            </p>
          )}
        </div>
        {t.exportButtonText && (
          <Button
            label={exportStatus === "busy" ? t.exportingText : t.exportButtonText}
            variant="outline"
            className="acc-btn--strong aset__btn"
            state={exportStatus === "busy" ? "loading" : "idle"}
            onClick={onExport}
          />
        )}
      </div>

      {!confirming ? (
        <div className="aset__block aset__block--delete">
          <p className={cx("aset__text", "acc-danger", TEXT.uiSm)}>{t.deleteAccountText}</p>
          {t.deleteAccountButtonText && (
            <Button
              label={t.deleteAccountButtonText}
              variant="outline"
              className="acc-btn--danger-line aset__btn"
              onClick={() => setConfirming(true)}
            />
          )}
        </div>
      ) : (
        <form className="aset__confirm" onSubmit={onDelete} noValidate>
          {t.accountDeleteTitle && <p className={cx("aset__confirm-title", TEXT.ui)}>{t.accountDeleteTitle}</p>}
          {t.accountDeleteConfirmText && <p className={cx("aset__text", "acc-muted", TEXT.uiSm)}>{t.accountDeleteConfirmText}</p>}
          <FormField
            label={t.passwordLabel}
            type="password"
            name="password"
            autoComplete="current-password"
            value={deactivate.password?.value ?? ""}
            error={deactivate.password?.hasError ? deactivate.password.message : undefined}
            invalid={deactivate.password?.hasError}
            showPasswordLabel={t.showPasswordLabel || undefined}
            hidePasswordLabel={t.hidePasswordLabel || undefined}
            onInput={(v) => setDeactivateCustomerFormPassword(deactivate, v)}
          />
          {deleteFailed && (
            <p className={cx("aset__text", "acc-danger", TEXT.uiSm)} role="alert">
              {deactivate.responseMessage || t.actionErrorText}
            </p>
          )}
          <div className="aset__confirm-actions">
            <Button label={t.cancelText} variant="outline" className="acc-btn--strong" disabled={deactivate.isSubmitting} onClick={closeConfirm} />
            <Button
              type="submit"
              label={deactivate.isSubmitting ? t.accountDeletingText : t.accountDeleteFinalText}
              className="acc-btn--danger"
              state={deactivate.isSubmitting ? "loading" : "idle"}
            />
          </div>
        </form>
      )}
    </div>
  );
});

export default AccountSettings;
