import type { ComponentChildren } from "preact";
import { cx } from "../../utils/cx";
import Icon, { type IconName } from "../Icon";

interface Props {
  icon: IconName;
  ariaLabel: string;
  onClick?: (e: MouseEvent) => void;
  href?: string;
  size?: number;
  iconSize?: number;
  className?: string;
  disabled?: boolean;
  children?: ComponentChildren;
}

/** I/Sub/IconButton — 40×40, 18px line icon, surface on hover. */
export default function IconButton({ icon, ariaLabel, onClick, href, size = 40, iconSize = 18, className, disabled, children }: Props) {
  const style = { width: size, height: size };
  if (href) {
    return (
      <a className={cx("ibtn", className)} href={href} aria-label={ariaLabel} style={style}>
        <Icon name={icon} size={iconSize} />
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cx("ibtn", className)} aria-label={ariaLabel} onClick={onClick as any} style={style} disabled={disabled}>
      <Icon name={icon} size={iconSize} />
      {children}
    </button>
  );
}
