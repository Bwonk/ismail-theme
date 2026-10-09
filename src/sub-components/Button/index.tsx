import type { ComponentChildren } from "preact";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import Icon from "../Icon";
import Spinner from "../Spinner";

export type ButtonState = "idle" | "loading" | "added" | "soldout";

interface Props {
  label: string;
  variant?: "solid" | "outline" | "light";
  size?: "md" | "sm";
  state?: ButtonState;
  disabled?: boolean;
  fullWidth?: boolean;
  href?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
  icon?: ComponentChildren;
  className?: string;
  onClick?: (e: MouseEvent) => void;
}

/** I/Sub/Button — I-CMP-05 (M-11): accent fill slides up from the bottom, label rolls up. */
export default function Button({
  label,
  variant = "solid",
  size = "md",
  state = "idle",
  disabled,
  fullWidth,
  href,
  type = "button",
  ariaLabel,
  icon,
  className,
  onClick,
}: Props) {
  const inactive = disabled || state === "loading" || state === "soldout";
  const classes = cx(
    "btn",
    `btn--${variant}`,
    size === "sm" && "btn--sm",
    state !== "idle" && `btn--${state}`,
    disabled && "btn--disabled",
    fullWidth && "btn--full",
    className,
  );
  const content = (
    <>
      <span className="btn__face btn__face--top">
        {state === "loading" && <Spinner size={16} />}
        {state === "added" && <Icon name="check" size={16} className="btn__check" />}
        {state !== "loading" && state !== "added" && icon}
        <span className={cx("btn__label", TEXT.ui)}>{label}</span>
      </span>
      <span className="btn__face btn__face--bottom" aria-hidden="true">
        {icon}
        <span className={cx("btn__label", TEXT.ui)}>{label}</span>
      </span>
    </>
  );
  if (href && !inactive) {
    return (
      <a className={classes} href={href} aria-label={ariaLabel} onClick={onClick as any}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} type={type} disabled={inactive} aria-label={ariaLabel} aria-busy={state === "loading"} onClick={onClick as any}>
      {content}
    </button>
  );
}
