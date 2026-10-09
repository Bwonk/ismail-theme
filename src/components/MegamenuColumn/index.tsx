import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import { Props } from "./types";

/**
 * Header › megamenuColumns child — mono title + link list (I/Overlay/MenuOverlay `menu-column`).
 * I-MENU-02 stagger is driven by the Header (`--i` on the renderer containers).
 * Inside the mobile menu accordion the title is hidden (desktop-only layer) and links turn muted.
 */
export function MegamenuColumn({ title = "GİYİM", links }: Props) {
  const items = (links?.links ?? []).filter((l) => l?.label);
  return (
    <div className="mcol">
      {title && <p className={cx("mcol__title", TEXT.label)}>{title}</p>}
      {items.length > 0 && (
        <ul className="mcol__links">
          {items.map((link, i) => (
            <li key={`${link.label}-${i}`}>
              <a
                className={cx("mcol__link", TEXT.ui)}
                href={link.href}
                {...(link.openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MegamenuColumn;
