import { useState } from "preact/hooks";
import { IkasCustomer, IkasCustomerAddress, customerStore, deleteCustomerAddress, saveCustomer } from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import type { AccountTexts } from "../../components/Account/texts";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import AccountAddressForm from "../AccountAddressForm";
import Badge from "../Badge";
import Button from "../Button";

interface Props {
  texts: AccountTexts;
}

/** Marks one address as the default delivery address (no address-form field exists for it). */
export async function setDefaultCustomerAddress(addressId: string) {
  const customer = customerStore.customer;
  if (!customer) return false;
  const updated = {
    ...customer,
    addresses: (customer.addresses ?? []).map((a) => ({ ...a, isDefault: a.id === addressId })),
  } as IkasCustomer;
  return saveCustomer(customerStore, updated);
}

function addressLines(a: IkasCustomerAddress) {
  const street = [a.addressLine1, a.addressLine2].filter(Boolean).join(" ");
  const place = [a.district?.name, a.city?.name ?? a.state?.name].filter(Boolean).join(" / ");
  return [street, place].filter(Boolean);
}

type FormState = { address?: IkasCustomerAddress } | null;

/**
 * I/Section/Account › addresses-list — cards (2-up desktop/tablet, 1-up mobile) with Düzenle · Sil · Varsayılan yap,
 * inline delete confirm inside the card (adres sil onayı), inline add/edit form (adres ekle).
 */
const AccountAddresses = observer(function AccountAddresses({ texts: t }: Props) {
  const addresses = customerStore.customer?.addresses ?? [];
  const [form, setForm] = useState<FormState>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  const onDelete = async (address: IkasCustomerAddress) => {
    setBusyId(address.id);
    setErrorId(null);
    const ok = await deleteCustomerAddress(customerStore, address).catch(() => false);
    setBusyId(null);
    if (ok) setConfirmId(null);
    else setErrorId(address.id);
  };

  const onMakeDefault = async (address: IkasCustomerAddress) => {
    setBusyId(address.id);
    setErrorId(null);
    const ok = await setDefaultCustomerAddress(address.id).catch(() => false);
    setBusyId(null);
    if (!ok) setErrorId(address.id);
  };

  const openForm = (address?: IkasCustomerAddress) => {
    setConfirmId(null);
    setErrorId(null);
    setForm({ address });
  };

  return (
    <div className="aaddr">
      {t.addressesTabText && <h2 className={cx("acc-title", TEXT.h4)}>{t.addressesTabText}</h2>}

      {addresses.length === 0 && !form && <p className={cx("aaddr__empty", "acc-muted", TEXT.body)}>{t.addressesEmptyText}</p>}

      {addresses.length > 0 && (
        <div className="aaddr__grid">
          {addresses.map((address) => {
            const confirming = confirmId === address.id;
            const busy = busyId === address.id;
            return (
              <div key={address.id} className={cx("aaddr__card", confirming && "aaddr__card--danger")}>
                <div className="aaddr__card-head">
                  <span className={cx("aaddr__title", TEXT.ui)}>{address.title}</span>
                  {address.isDefault && t.defaultBadgeText && <Badge text={t.defaultBadgeText} tone="new" />}
                </div>
                <p className={cx("aaddr__text", "acc-muted", TEXT.body)}>
                  {addressLines(address).map((line, i) => (
                    <span key={i} className="aaddr__line">
                      {line}
                    </span>
                  ))}
                </p>
                <div className="aaddr__actions">
                  {t.editText && (
                    <button type="button" className={cx("acc-textbtn", TEXT.uiSm)} disabled={busy} onClick={() => openForm(address)}>
                      {t.editText}
                    </button>
                  )}
                  {t.deleteText && (
                    <button
                      type="button"
                      className={cx("acc-textbtn", "acc-danger", TEXT.uiSm)}
                      disabled={busy}
                      aria-expanded={confirming}
                      onClick={() => setConfirmId(confirming ? null : address.id)}
                    >
                      {t.deleteText}
                    </button>
                  )}
                  {!address.isDefault && t.makeDefaultText && (
                    <button
                      type="button"
                      className={cx("acc-textbtn", "acc-muted", "aaddr__make-default", TEXT.uiSm)}
                      disabled={busy}
                      aria-busy={busy && !confirming}
                      onClick={() => onMakeDefault(address)}
                    >
                      {t.makeDefaultText}
                    </button>
                  )}
                </div>
                {confirming && (
                  <div className="aaddr__confirm" role="group">
                    <p className={cx("aaddr__confirm-text", TEXT.uiSm)}>{t.confirmDeleteText}</p>
                    <div className="aaddr__confirm-actions">
                      <Button label={t.cancelText} variant="outline" className="acc-btn--strong" disabled={busy} onClick={() => setConfirmId(null)} />
                      <Button
                        label={busy ? t.deletingText : t.deleteText}
                        className="acc-btn--danger"
                        state={busy ? "loading" : "idle"}
                        onClick={() => onDelete(address)}
                      />
                    </div>
                  </div>
                )}
                {errorId === address.id && (
                  <p className={cx("acc-danger", TEXT.uiSm, "aaddr__error")} role="alert">
                    {t.actionErrorText}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {form ? (
        <AccountAddressForm
          key={form.address?.id ?? "new"}
          address={form.address}
          texts={t}
          defaultChecked={form.address ? !!form.address.isDefault : addresses.length === 0}
          onCancel={() => setForm(null)}
          onSaved={async (addressId, makeDefault) => {
            if (makeDefault && addressId) await setDefaultCustomerAddress(addressId).catch(() => false);
            setForm(null);
          }}
        />
      ) : (
        t.addAddressText && (
          <div className="aaddr__add">
            <Button label={t.addAddressText} variant="outline" onClick={() => openForm()} />
          </div>
        )
      )}
    </div>
  );
});

export default AccountAddresses;
