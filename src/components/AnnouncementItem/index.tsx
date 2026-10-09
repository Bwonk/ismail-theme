import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import { Props } from "./types";

/**
 * Header › announcements child — one line of the announcement bar (mono label).
 * Header stacks several of these in a clip mask and rotates them (M-04) via `data-state`.
 */
export function AnnouncementItem({ text = "1.500 TL üzeri siparişte kargo ücretsiz", link }: Props) {
  if (!text) return null;
  const cls = cx("annc__text", TEXT.label);
  return (
    <div className="annc">
      {link?.href ? (
        <a className={cx(cls, "annc__link")} href={link.href} {...(link.openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {text}
        </a>
      ) : (
        <span className={cls}>{text}</span>
      )}
    </div>
  );
}

export default AnnouncementItem;
