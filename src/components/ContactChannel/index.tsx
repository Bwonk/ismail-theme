import { normalizeSvg } from "@ikas/bp-storefront";
import Icon from "../../sub-components/Icon";
import { cx } from "../../utils/cx";
import { TEXT, forceScheme } from "../../utils/tokens";
import { Props } from "./types";

/**
 * I/Section/ContactForm › contact-channel — icon disc, value (h4) + hint, arrow. `dark` forces Mürekkep.
 * No label above the value (rule 11). I-CONT-03 · M-28: bg surface → line, arrow nudges up-right.
 */
export function ContactChannel({
  icon,
  value = "destek@ismail.com.tr",
  hint = "Genellikle 2 saat içinde yanıt",
  link,
  dark = false,
}: Props) {
  const href = link?.href;
  const Tag = (href ? "a" : "div") as any;
  const external = href && /^https?:/i.test(href);
  const linkAttrs = href
    ? { href, ...(link?.openInNewTab || external ? { target: "_blank", rel: "noopener noreferrer" } : {}) }
    : {};
  return (
    <Tag className={cx("cchan", dark && "cchan--dark", dark && forceScheme("ink"), href && "cchan--link")} {...linkAttrs}>
      <span className="cchan__icon" aria-hidden="true">
        {icon && <span className="cchan__glyph" dangerouslySetInnerHTML={{ __html: normalizeSvg(icon, { idPrefix: "cchan" }) }} />}
      </span>
      <span className="cchan__text">
        {value && <span className={cx("cchan__value", TEXT.h4)}>{value}</span>}
        {hint && <span className={cx("cchan__hint", TEXT.uiSm)}>{hint}</span>}
      </span>
      {href && <Icon name="arrow-up-right" size={18} className="cchan__arrow" />}
    </Tag>
  );
}

export default ContactChannel;
