import type { ComponentChildren, Ref } from "preact";
import { useId, useState } from "preact/hooks";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import Icon from "../Icon";

export type FormFieldType = "text" | "email" | "password" | "tel" | "number" | "date" | "search" | "url" | "textarea" | "select";

export interface FormFieldOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FormFieldProps {
  /** Visible label (I/Sub/FormField `label`). Omit for an unlabeled field — then pass `ariaLabel`. */
  label?: string;
  type?: FormFieldType;
  value?: string | number | null;
  placeholder?: string;
  /** Error message. Truthy → error state + message under the field (ikas: `field.hasError ? field.message : undefined`). */
  error?: string | null;
  /** Error state without a message (e.g. the message is shown elsewhere). */
  invalid?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "numeric" | "decimal" | "search" | "url" | "none";
  maxLength?: number;
  min?: number | string;
  max?: number | string;
  pattern?: string;
  rows?: number;
  ariaLabel?: string;
  /** `select` only. A disabled empty option is rendered first when `placeholder` is set. */
  options?: FormFieldOption[];
  /** `password` only: when both are set an eye toggle is rendered (aria-labels). */
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
  /** Extra node rendered inside the field box on the right (e.g. an IconButton). */
  suffix?: ComponentChildren;
  /** Text style of the input/select/textarea (default `TEXT.ui`). */
  controlTextClass?: string;
  className?: string;
  inputRef?: Ref<any>;
  onInput?: (value: string, e: Event) => void;
  onChange?: (value: string, e: Event) => void;
  onBlur?: (e: FocusEvent) => void;
  onFocus?: (e: FocusEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
}

/**
 * I/Sub/FormField — mono label, 48px box, message. States: odak (accent 2px), hata (danger),
 * pasif (surface + inactive opacity), dolu (text colour). Controlled: pass `value` + `onInput`.
 */
export default function FormField({
  label,
  type = "text",
  value,
  placeholder,
  error,
  invalid,
  disabled,
  readOnly,
  required,
  id,
  name,
  autoComplete,
  inputMode,
  maxLength,
  min,
  max,
  pattern,
  rows = 4,
  ariaLabel,
  options,
  showPasswordLabel,
  hidePasswordLabel,
  suffix,
  controlTextClass = TEXT.ui,
  className,
  inputRef,
  onInput,
  onChange,
  onBlur,
  onFocus,
  onKeyDown,
}: FormFieldProps) {
  const autoId = useId();
  const fieldId = id || (name ? `ff-${name}-${autoId}` : `ff-${autoId}`);
  const msgId = `${fieldId}-msg`;
  const [reveal, setReveal] = useState(false);
  const hasError = !!error || !!invalid;
  const strValue = value === null || value === undefined ? undefined : String(value);
  const canToggle = type === "password" && !!showPasswordLabel && !!hidePasswordLabel;

  const shared = {
    id: fieldId,
    name,
    disabled,
    required,
    "aria-label": label ? undefined : ariaLabel,
    "aria-invalid": hasError || undefined,
    "aria-describedby": error ? msgId : undefined,
    ref: inputRef,
    onInput: (e: Event) => onInput?.((e.currentTarget as HTMLInputElement).value, e),
    onChange: (e: Event) => onChange?.((e.currentTarget as HTMLInputElement).value, e),
    onBlur,
    onFocus,
    onKeyDown,
  };

  let control;
  if (type === "textarea") {
    control = (
      <textarea
        {...(shared as any)}
        className={cx("ffield__control", "ffield__control--area", controlTextClass)}
        value={strValue}
        placeholder={placeholder}
        readOnly={readOnly}
        rows={rows}
        maxLength={maxLength}
        autoComplete={autoComplete}
      />
    );
  } else if (type === "select") {
    control = (
      <>
        <select
          {...(shared as any)}
          className={cx("ffield__control", "ffield__control--select", !strValue && "ffield__control--empty", controlTextClass)}
          value={strValue ?? ""}
          autoComplete={autoComplete}
        >
          {placeholder !== undefined && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {(options ?? []).map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size={16} className="ffield__chevron" />
      </>
    );
  } else {
    control = (
      <input
        {...(shared as any)}
        className={cx("ffield__control", controlTextClass, (type === "number" || type === "tel") && "tabular")}
        type={canToggle && reveal ? "text" : type}
        value={strValue}
        placeholder={placeholder}
        readOnly={readOnly}
        autoComplete={autoComplete}
        inputMode={inputMode}
        maxLength={maxLength}
        min={min}
        max={max}
        pattern={pattern}
      />
    );
  }

  return (
    <div
      className={cx(
        "ffield",
        hasError && "ffield--error",
        disabled && "ffield--disabled",
        type === "textarea" && "ffield--area",
        className,
      )}
    >
      {label && (
        <label className={cx("ffield__label", TEXT.label)} htmlFor={fieldId}>
          {label}
        </label>
      )}
      <div className="ffield__box">
        {control}
        {canToggle && (
          <button
            type="button"
            className="ffield__toggle"
            aria-label={reveal ? hidePasswordLabel : showPasswordLabel}
            aria-pressed={reveal}
            aria-controls={fieldId}
            disabled={disabled}
            onClick={() => setReveal((r) => !r)}
          >
            <Icon name={reveal ? "eye-off" : "eye"} size={18} />
          </button>
        )}
        {suffix}
      </div>
      {error && (
        <p id={msgId} className={cx("ffield__msg", TEXT.uiXs)} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
