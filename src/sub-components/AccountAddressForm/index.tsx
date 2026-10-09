import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import {
  type AddressForm,
  type AddressFormItem,
  type IkasFormItem,
  type IkasFormItemOption,
  IkasCustomerAddress,
  customerStore,
  getEmptyAddressForm,
  getIkasCustomerAddressForm,
  initAddressForm,
  setAddressFormAddressLine1,
  setAddressFormAddressLine2,
  setAddressFormCity,
  setAddressFormCompany,
  setAddressFormCountry,
  setAddressFormDistrict,
  setAddressFormFirstName,
  setAddressFormIdentityNumber,
  setAddressFormLastName,
  setAddressFormPhone,
  setAddressFormPostalCode,
  setAddressFormRegion,
  setAddressFormState,
  setAddressFormTaxNumber,
  setAddressFormTaxOffice,
  setAddressFormTitle,
  submitAddressForm,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import type { AccountTexts } from "../../components/Account/texts";
import { cx } from "../../utils/cx";
import { TEXT, upperTr } from "../../utils/tokens";
import AccountSkeleton from "../AccountSkeleton";
import Button from "../Button";
import Checkbox from "../Checkbox";
import FormField, { type FormFieldType } from "../FormField";

interface Props {
  texts: AccountTexts;
  /** Editing an existing address; omitted → new address. */
  address?: IkasCustomerAddress;
  /** Initial state of "Varsayılan teslimat adresim olsun". */
  defaultChecked: boolean;
  onCancel: () => void;
  /** Called after submitAddressForm succeeds with the saved address id (new ids are resolved from the store). */
  onSaved: (addressId: string | null, makeDefault: boolean) => void | Promise<void>;
}

type Setter = (form: AddressForm, value: string) => void;
type Field = (IkasFormItem & { isLoading?: boolean; isFreeText?: boolean }) | undefined;

const AUTOCOMPLETE: Partial<Record<AddressFormItem, string>> = {
  firstName: "given-name",
  lastName: "family-name",
  phone: "tel",
  addressLine1: "address-line1",
  addressLine2: "address-line2",
  postalCode: "postal-code",
};

/**
 * I/Section/Account › address-form (satır içi) — title + country-driven matrix (addressForm.addressFormat:
 * ülke → il → ilçe selects with free-text fallback) + kurumsal fatura (firma, vergi dairesi, vergi no) + varsayılan.
 */
const AccountAddressForm = observer(function AccountAddressForm({ texts: t, address, defaultChecked, onCancel, onSaved }: Props) {
  const [form] = useState<AddressForm>(() => (address ? getIkasCustomerAddressForm(address) : getEmptyAddressForm(customerStore)));
  const [loading, setLoading] = useState(true);
  const [corporate, setCorporate] = useState(!!(address?.company || address?.taxNumber || address?.taxOffice));
  const [makeDefault, setMakeDefault] = useState(defaultChecked);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    initAddressForm(form, address).finally(() => setLoading(false));
  }, []);

  const input = (key: string, field: Field, setter: Setter, type: FormFieldType = "text", autoComplete?: string) => {
    if (!field) return null;
    return (
      <FormField
        key={key}
        label={upperTr(field.label ?? "")}
        type={type}
        name={key}
        rows={2}
        autoComplete={autoComplete}
        inputMode={type === "tel" ? "tel" : undefined}
        placeholder={field.placeholder}
        value={field.value ?? ""}
        required={field.isRequired}
        error={field.hasError ? field.message : undefined}
        invalid={field.hasError}
        onInput={(v) => setter(form, v)}
      />
    );
  };

  const select = (key: string, field: Field, options: IkasFormItemOption[] | undefined, setter: Setter) => {
    if (!field) return null;
    if (field.isFreeText || !options?.length) return input(key, field, setter);
    return (
      <FormField
        key={key}
        label={upperTr(field.label ?? "")}
        type="select"
        name={key}
        placeholder={field.placeholder ?? ""}
        options={options}
        value={field.value ?? ""}
        disabled={field.isLoading}
        required={field.isRequired}
        error={field.hasError ? field.message : undefined}
        invalid={field.hasError}
        onChange={(v) => setter(form, v)}
      />
    );
  };

  const renderField = (key: AddressFormItem) => {
    switch (key) {
      case "firstName":
        return input(key, form.firstName, setAddressFormFirstName, "text", AUTOCOMPLETE.firstName);
      case "lastName":
        return input(key, form.lastName, setAddressFormLastName, "text", AUTOCOMPLETE.lastName);
      case "identityNumber":
        return input(key, form.identityNumber, setAddressFormIdentityNumber);
      case "phone":
        return input(key, form.phone, setAddressFormPhone, "tel", AUTOCOMPLETE.phone);
      case "addressLine1":
        return input(key, form.addressLine1, setAddressFormAddressLine1, "textarea", AUTOCOMPLETE.addressLine1);
      case "addressLine2":
        return input(key, form.addressLine2, setAddressFormAddressLine2, "text", AUTOCOMPLETE.addressLine2);
      case "postalCode":
        return input(key, form.postalCode, setAddressFormPostalCode, "text", AUTOCOMPLETE.postalCode);
      case "country":
        return select(key, form.country, form.countryOptions, setAddressFormCountry);
      case "state":
        return select(key, form.state, form.stateOptions, setAddressFormState);
      case "city":
        return select(key, form.city, form.cityOptions, setAddressFormCity);
      case "district":
        return select(key, form.district, form.districtOptions, setAddressFormDistrict);
      case "region":
        return form.regionOptions?.length ? select(key, form.region, form.regionOptions, setAddressFormRegion) : null;
      default:
        return null;
    }
  };

  const toggleCorporate = (on: boolean) => {
    setCorporate(on);
    if (!on) {
      if (form.company) setAddressFormCompany(form, "");
      if (form.taxOffice) setAddressFormTaxOffice(form, "");
      if (form.taxNumber) setAddressFormTaxNumber(form, "");
    }
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (form.isSubmitting) return;
    setFailed(false);
    const before = new Set((customerStore.customer?.addresses ?? []).map((a) => a.id));
    const ok = await submitAddressForm(form);
    if (!ok) {
      setFailed(!!form.isFailure);
      return;
    }
    const savedId = address?.id ?? (customerStore.customer?.addresses ?? []).find((a) => !before.has(a.id))?.id ?? null;
    await onSaved(savedId, makeDefault && !address?.isDefault);
  };

  const title = address ? t.addressEditTitle : t.addressFormTitle;
  const rows = (form.addressFormat ?? [])
    .map((row) => row.filter((key) => form[key] != null))
    .filter((row) => row.length > 0);

  return (
    <form className="aform" onSubmit={onSubmit} noValidate>
      {title && <h3 className={cx("acc-title", TEXT.h4)}>{title}</h3>}
      {loading ? (
        <AccountSkeleton label={t.loadingText} />
      ) : (
        <>
          {input("title", form.title, setAddressFormTitle)}
          {rows.map((row) => (
            <div key={row.join("-")} className="aform__row" style={{ "--aform-cols": row.length } as any}>
              {row.map((key) => (
                <Fragment key={key}>{renderField(key)}</Fragment>
              ))}
            </div>
          ))}
          {t.corporateText && <Checkbox checked={corporate} onChange={toggleCorporate} label={t.corporateText} name="corporate" />}
          {corporate && (form.company || form.taxOffice || form.taxNumber) && (
            <div className="aform__corporate">
              {input("company", form.company, setAddressFormCompany, "text", "organization")}
              <div className="aform__row" style={{ "--aform-cols": 2 } as any}>
                {input("taxOffice", form.taxOffice, setAddressFormTaxOffice)}
                {input("taxNumber", form.taxNumber, setAddressFormTaxNumber)}
              </div>
            </div>
          )}
          {t.defaultAddressText && !address?.isDefault && (
            <Checkbox checked={makeDefault} onChange={setMakeDefault} label={t.defaultAddressText} name="isDefault" />
          )}
          {failed && (
            <p className={cx("acc-danger", TEXT.uiSm, "aform__error")} role="alert">
              {form.responseMessage || t.actionErrorText}
            </p>
          )}
          <div className="aform__actions">
            <Button
              type="submit"
              label={form.isSubmitting ? t.addressSavingText : t.addressSaveText}
              state={form.isSubmitting ? "loading" : "idle"}
            />
            {t.cancelText && (
              <Button label={t.cancelText} variant="outline" className="acc-btn--strong" disabled={form.isSubmitting} onClick={onCancel} />
            )}
          </div>
        </>
      )}
    </form>
  );
});

export default AccountAddressForm;
