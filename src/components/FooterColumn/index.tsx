import type { IkasNavigationLink } from "@ikas/bp-storefront";
import AccordionItem from "../../sub-components/AccordionItem";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import { Props } from "./types";

function LinkList({ links }: { links: IkasNavigationLink[] }) {
  return (
    <ul className="fcol__list">
      {links.map((link, i) => (
        <li key={`${link.href}-${i}`}>
          {/* I-FTR-01 · M-28: muted → text */}
          <a
            className={cx("fcol__link", TEXT.uiSm)}
            href={link.href}
            {...(link.openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * I/Section/Footer › footer-column — mono title + muted links on desktop;
 * on mobile the same column is an AccordionItem (I-CMP-11 · M-22).
 */
export function FooterColumn({ title = "KATEGORİLER", links }: Props) {
  const items = (links?.links ?? []).filter((l) => l && l.label);
  return (
    <div className="fcol">
      <div className="fcol__desktop">
        {title && <p className={cx("fcol__title", TEXT.label)}>{title}</p>}
        {items.length > 0 && <LinkList links={items} />}
      </div>
      <div className="fcol__mobile">
        <AccordionItem title={title || ""} headingLevel={3} titleClass={TEXT.label} className="fcol__acc">
          {items.length > 0 && <LinkList links={items} />}
        </AccordionItem>
      </div>
    </div>
  );
}

export default FooterColumn;
