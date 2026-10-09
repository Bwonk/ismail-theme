import type { ComponentChildren } from "preact";
import { useId } from "preact/hooks";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import Icon from "../Icon";

export interface CheckboxProps {
  checked: boolean;
  onChange?: (checked: boolean, e: Event) => void;
  /** Plain text or nodes (e.g. text with an <a>). */
  label?: ComponentChildren;
  /** RICH_TEXT HTML label (takes precedence over `label`); links inside stay clickable. */
  labelHtml?: string;
  /** Error message under the row; truthy → danger border. */
  error?: string | null;
  invalid?: boolean;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  value?: string;
  ariaLabel?: string;
  className?: string;
}

/** I/Sub/Checkbox — 18px box (radius 3), label text-ui-sm. işaretli: inverse fill + check. */
export default function Checkbox({
  checked,
  onChange,
  label,
  labelHtml,
  error,
  invalid,
  disabled,
  required,
  id,
  name,
  value,
  ariaLabel,
  className,
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id || `cb-${autoId}`;
  const msgId = `${inputId}-msg`;
  const hasError = !!error || !!invalid;
  const hasLabel = !!labelHtml || (label !== undefined && label !== null && label !== "");
  return (
    <div className={cx("cbox", checked && "cbox--on", hasError && "cbox--error", disabled && "cbox--disabled", className)}>
      <div className="cbox__row">
        <span className="cbox__box">
          <input
            id={inputId}
            className="cbox__input"
            type="checkbox"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            required={required}
            aria-label={hasLabel ? undefined : ariaLabel}
            aria-invalid={hasError || undefined}
            aria-describedby={error ? msgId : undefined}
            onChange={(e) => onChange?.((e.currentTarget as HTMLInputElement).checked, e)}
          />
          <Icon name="check" size={12} strokeWidth={2} className="cbox__check" />
        </span>
        {hasLabel &&
          (labelHtml ? (
            <label className={cx("cbox__label", TEXT.uiSm)} htmlFor={inputId} dangerouslySetInnerHTML={{ __html: labelHtml }} />
          ) : (
            <label className={cx("cbox__label", TEXT.uiSm)} htmlFor={inputId}>
              {label}
            </label>
          ))}
      </div>
      {error && (
        <p id={msgId} className={cx("cbox__msg", TEXT.uiSm)} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
