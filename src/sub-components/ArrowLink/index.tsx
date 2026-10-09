import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import Icon from "../Icon";

interface Props {
  label: string;
  href?: string;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  external?: boolean;
}

/** I/Sub/ArrowLink — I-CMP-06 (M-10): underline grows from the left, arrow slides out and a new one slides in. */
export default function ArrowLink({ label, href, className, onClick, external }: Props) {
  const inner = (
    <>
      <span className="alink__row">
        <span className={cx("alink__label", TEXT.ui)}>{label}</span>
        <span className="alink__arrow" aria-hidden="true">
          <Icon name="arrow-right" size={14} className="alink__arrow-top" />
          <Icon name="arrow-right" size={14} className="alink__arrow-bottom" />
        </span>
      </span>
      <span className="alink__line" aria-hidden="true" />
    </>
  );
  if (href) {
    return (
      <a className={cx("alink", className)} href={href} onClick={onClick as any} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" className={cx("alink", "alink--button", className)} onClick={onClick as any}>
      {inner}
    </button>
  );
}
