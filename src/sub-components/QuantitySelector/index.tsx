import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import Icon from "../Icon";

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  /** alt sınır: the minus button turns inactive at `min` (default 1). */
  min?: number;
  /** üst sınır: the plus button turns inactive at `max` (unbounded when omitted). */
  max?: number;
  disabled?: boolean;
  decreaseAriaLabel: string;
  increaseAriaLabel: string;
  /** Accessible name of the value (e.g. "Adet"); the number itself is announced. */
  valueAriaLabel?: string;
  className?: string;
}

/** I/Sub/QuantitySelector — 40px boxed stepper: minus / value / plus. States: üst sınır, alt sınır. */
export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max,
  disabled,
  decreaseAriaLabel,
  increaseAriaLabel,
  valueAriaLabel,
  className,
}: QuantitySelectorProps) {
  const canDecrease = !disabled && value > min;
  const canIncrease = !disabled && (max == null || value < max);
  return (
    <div className={cx("qty", disabled && "qty--disabled", className)} role="group" aria-label={valueAriaLabel}>
      <button
        type="button"
        className="qty__btn"
        aria-label={decreaseAriaLabel}
        disabled={!canDecrease}
        onClick={() => canDecrease && onChange(Math.max(min, value - 1))}
      >
        <Icon name="minus" size={16} />
      </button>
      <span className={cx("qty__value", TEXT.numeral, "tabular")} aria-live="polite" aria-atomic="true">
        {value}
      </span>
      <button
        type="button"
        className="qty__btn"
        aria-label={increaseAriaLabel}
        disabled={!canIncrease}
        onClick={() => canIncrease && onChange(max == null ? value + 1 : Math.min(max, value + 1))}
      >
        <Icon name="plus" size={16} />
      </button>
    </div>
  );
}
