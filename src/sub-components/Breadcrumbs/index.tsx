import { cx } from "../../utils/cx";
import { TEXT, upperTr } from "../../utils/tokens";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  /** Root → current. The last item is the current page (text colour, no link). */
  items: BreadcrumbItem[];
  /** <nav> aria-label, e.g. "Sayfa konumu". */
  ariaLabel?: string;
  className?: string;
}

/** I/Sub/Breadcrumbs — mono label crumbs separated by "/", muted; current crumb in text colour. */
export default function Breadcrumbs({ items, ariaLabel, className }: BreadcrumbsProps) {
  const list = items.filter((i) => i && i.label);
  if (!list.length) return null;
  return (
    <nav className={cx("crumbs", className)} aria-label={ariaLabel}>
      <ol className="crumbs__list">
        {list.map((item, i) => {
          const last = i === list.length - 1;
          return (
            <li key={`${i}-${item.label}`} className="crumbs__item">
              {last || !item.href ? (
                <span className={cx("crumbs__crumb", last && "crumbs__crumb--current", TEXT.label)} aria-current={last ? "page" : undefined}>
                  {upperTr(item.label)}
                </span>
              ) : (
                <a className={cx("crumbs__crumb", "crumbs__link", TEXT.label)} href={item.href}>
                  {upperTr(item.label)}
                </a>
              )}
              {!last && (
                <span className={cx("crumbs__sep", TEXT.label)} aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
