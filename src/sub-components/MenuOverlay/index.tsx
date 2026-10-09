import { useRef, useState } from "preact/hooks";
import {
  IkasComponentRenderer,
  IkasImage,
  IkasNavigationLink,
  Router,
  createMediaSrcset,
  customerStore,
  getDefaultSrc,
  hasCustomer,
  logout,
  withRoutePrefix,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { cx } from "../../utils/cx";
import { useEscape, useScrollLock } from "../../utils/hooks";
import { fillText, useFocusTrap, usePresence } from "../../utils/overlay";
import { TEXT, forceScheme } from "../../utils/tokens";
import { UI_EVENT, emitUi } from "../../utils/ui";
import ArrowLink from "../ArrowLink";
import Button from "../Button";
import Icon from "../Icon";
import IconButton from "../IconButton";
import { hasLocaleAlternatives } from "../LocaleSwitcher";

export interface MenuFeature {
  image?: IkasImage | null;
  title?: string;
  linkText?: string;
  href?: string;
}

/** Column groups generated from a nav link's sub links (links without megamenu children). */
export function subLinkColumns(link?: IkasNavigationLink | null) {
  const subs = (link?.subLinks ?? []).filter((l) => l?.label);
  if (!subs.length) return [];
  if (subs.some((s) => s.subLinks?.length)) {
    return subs.map((s) => ({ title: s.label, href: s.href, links: (s.subLinks ?? []).filter((l) => l?.label) }));
  }
  return [{ title: "", href: "", links: subs }];
}

const linkTarget = (l: IkasNavigationLink) => (l.openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {});

/* ------------------------------------------------------------------ */
/* Desktop megamenu — I/Overlay/MenuOverlay@desktop — açık             */
/* ------------------------------------------------------------------ */

interface MegamenuProps {
  open: boolean;
  id: string;
  /** megamenuColumns COMPONENT_LIST (MegamenuColumn children) — used by the trigger link. */
  columns?: any[] | null;
  /** Fallback columns built from the hovered link's sub links. */
  linkColumns?: ReturnType<typeof subLinkColumns>;
  feature?: MenuFeature | null;
  parentProps?: Record<string, any>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClose: () => void;
}

/**
 * Panel below the header bar: link columns + 440 feature card. Desktop only (≥992).
 * I-MENU-01 (M-06): clip reveal downward, scrim fades in (scrim lives in Header).
 * I-MENU-02 (M-01): columns enter with 0.05s stagger.
 */
export function Megamenu({ open, id, columns, linkColumns, feature, parentProps, onMouseEnter, onMouseLeave, onClose }: MegamenuProps) {
  const hasComponents = !!columns?.length;
  const showFeature = hasComponents && !!(feature?.image || feature?.title);
  return (
    <div
      id={id}
      className={cx("mega", open && "is-open")}
      aria-hidden={!open}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="mega__inner">
        <div className="mega__columns">
          {hasComponents ? (
            <IkasComponentRenderer id={`${id}-columns`} className="mega__renderer" components={columns as any[]} parentProps={parentProps} />
          ) : (
            (linkColumns ?? []).map((col, i) => (
              <div key={i} className="mega__auto mcol">
                {col.title &&
                  (col.href ? (
                    <a className={cx("mcol__title mega__auto-title", TEXT.label)} href={col.href}>
                      {col.title}
                    </a>
                  ) : (
                    <p className={cx("mcol__title", TEXT.label)}>{col.title}</p>
                  ))}
                <ul className="mcol__links">
                  {col.links.map((l, j) => (
                    <li key={j}>
                      <a className={cx("mcol__link", TEXT.ui)} href={l.href} {...linkTarget(l)}>
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
        {showFeature && (
          <div className="mega__feature menu-feature">
            {feature?.image && (
              <a className="mega__feature-media" href={feature.href} tabIndex={-1} aria-hidden="true">
                <img
                  className="mega__feature-img"
                  src={getDefaultSrc(feature.image)}
                  srcSet={createMediaSrcset(feature.image)}
                  sizes="440px"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </a>
            )}
            {feature?.title && <p className={cx("mega__feature-title", TEXT.h4)}>{feature.title}</p>}
            {feature?.linkText && feature?.href && <ArrowLink label={feature.linkText} href={feature.href} />}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile / tablet panel — I/Overlay/MenuOverlay@mobile — açık         */
/* ------------------------------------------------------------------ */

export interface MenuPanelTexts {
  closeAriaLabel: string;
  loginText: string;
  registerText: string;
  logoutText: string;
  menuGreetingText: string;
  menuAccountLabel: string;
  favoritesLabel: string;
  localeText: string;
}

interface MenuPanelProps extends MenuPanelTexts {
  open: boolean;
  onClose: () => void;
  logoHtml?: string;
  logoAltText?: string;
  navLinks: IkasNavigationLink[];
  /** Index of the nav link whose accordion shows the megamenu columns (-1 = none). */
  megaIndex: number;
  columns?: any[] | null;
  parentProps?: Record<string, any>;
}

function go(e: MouseEvent, page: Parameters<typeof Router.navigateToPage>[0], onClose: () => void) {
  e.preventDefault();
  onClose();
  Router.navigateToPage(page);
}

/**
 * Full-screen (mobile) / 420 left drawer (tablet) in the Mürekkep palette.
 * I-MENU-01 mobile: panel slides in; rows accordion (M-22). I-MENU-02: rows enter in sequence.
 */
export const MenuPanel = observer(function MenuPanel({
  open,
  onClose,
  logoHtml,
  logoAltText,
  navLinks,
  megaIndex,
  columns,
  parentProps,
  closeAriaLabel,
  loginText,
  registerText,
  logoutText,
  menuGreetingText,
  menuAccountLabel,
  favoritesLabel,
  localeText,
}: MenuPanelProps) {
  const { mounted, shown } = usePresence(open);
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  useScrollLock(open);
  useEscape(open, onClose);
  useFocusTrap(panelRef, open && mounted);
  if (!mounted) return null;

  const loggedIn = hasCustomer(customerStore);
  const firstName = customerStore.customer?.firstName ?? "";
  const hasColumns = !!columns?.length;

  const onLogout = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await logout(customerStore);
      onClose();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={cx("mpanel", shown && "is-open")}>
      <div className="mpanel__scrim" onClick={onClose} aria-hidden="true" />
      <div ref={panelRef} className={cx("mpanel__panel", forceScheme("ink"))} role="dialog" aria-modal="true" aria-label={logoAltText}>
        <div className="mpanel__head">
          <a
            className="mpanel__logo"
            href={withRoutePrefix("/")}
            aria-label={logoAltText}
            onClick={(e) => go(e as any, "INDEX", onClose)}
            dangerouslySetInnerHTML={logoHtml ? { __html: logoHtml } : undefined}
          />
          <IconButton icon="x" iconSize={20} ariaLabel={closeAriaLabel} onClick={onClose} />
        </div>

        <div className="mpanel__body">
          {/* menu-auth */}
          <div className="mpanel__auth mpanel__row" style={{ "--i": 0 } as any}>
            {loggedIn ? (
              <>
                <span className={cx("mpanel__greeting", TEXT.ui)}>{fillText(menuGreetingText, { name: firstName })}</span>
                <button type="button" className={cx("mpanel__logout", TEXT.uiSm)} onClick={onLogout} disabled={busy}>
                  <Icon name="log-out" size={16} />
                  {logoutText}
                </button>
              </>
            ) : (
              <>
                <Button
                  label={loginText}
                  fullWidth
                  href={withRoutePrefix("/account/login")}
                  onClick={(e) => go(e, "LOGIN", onClose)}
                />
                <Button
                  label={registerText}
                  variant="outline"
                  fullWidth
                  href={withRoutePrefix("/account/register")}
                  onClick={(e) => go(e, "REGISTER", onClose)}
                />
              </>
            )}
          </div>

          {/* menu-columns: nav rows, sub links / megamenu columns in an accordion */}
          <ul className="mpanel__nav">
            {navLinks.map((link, i) => {
              const subs = (link.subLinks ?? []).filter((l) => l?.label);
              // Same rule as the desktop megamenu: the megamenu link opens the MegamenuColumn children.
              const showColumns = i === megaIndex && hasColumns;
              const expandable = subs.length > 0 || showColumns;
              const isOpen = expanded === i;
              const bodyId = `mpanel-acc-${i}`;
              return (
                <li key={`${link.label}-${i}`} className="mpanel__item mpanel__row" style={{ "--i": i + 1 } as any}>
                  {expandable ? (
                    <button
                      type="button"
                      className="mpanel__link"
                      aria-expanded={isOpen}
                      aria-controls={bodyId}
                      onClick={() => setExpanded(isOpen ? null : i)}
                    >
                      <span className={TEXT.h3}>{link.label}</span>
                      {/* menu-caret: plus (closed) / minus (open) */}
                      <Icon name={isOpen ? "minus" : "plus"} size={18} className="mpanel__caret" />
                    </button>
                  ) : (
                    <a className="mpanel__link" href={link.href} onClick={onClose} {...linkTarget(link)}>
                      <span className={TEXT.h3}>{link.label}</span>
                    </a>
                  )}
                  {expandable && (
                    <div id={bodyId} className={cx("mpanel__acc", isOpen && "is-open")}>
                      <div className="mpanel__acc-inner">
                        {showColumns ? (
                          <IkasComponentRenderer id="mpanel-columns" className="mpanel__renderer" components={columns as any[]} parentProps={parentProps} />
                        ) : (
                          <ul className="mpanel__subs">
                            {link.href && (
                              <li>
                                <a className={cx("mpanel__sub", TEXT.ui)} href={link.href} onClick={onClose} tabIndex={isOpen ? 0 : -1}>
                                  {link.label}
                                </a>
                              </li>
                            )}
                            {subs.map((s, j) => (
                              <li key={j}>
                                <a className={cx("mpanel__sub", TEXT.ui)} href={s.href} onClick={onClose} tabIndex={isOpen ? 0 : -1} {...linkTarget(s)}>
                                  {s.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* menu-footer */}
          <div className="mpanel__foot mpanel__row" style={{ "--i": navLinks.length + 1 } as any}>
            <div className="mpanel__foot-links">
              <a
                className={cx("mpanel__foot-link", TEXT.ui)}
                href={withRoutePrefix(loggedIn ? "/account" : "/account/login")}
                onClick={(e) => go(e as any, loggedIn ? "ACCOUNT" : "LOGIN", onClose)}
              >
                <Icon name="user" size={16} />
                {menuAccountLabel}
              </a>
              <a
                className={cx("mpanel__foot-link", TEXT.ui)}
                href={withRoutePrefix("/account/favorite-products")}
                onClick={(e) => go(e as any, loggedIn ? "FAVORITE_PRODUCTS" : "LOGIN", onClose)}
              >
                <Icon name="heart" size={16} />
                {favoritesLabel}
              </a>
            </div>
            {/* menu-locale: always drawn; opens the LocaleSwitcher sheet only when the store has alternatives. */}
            {localeText &&
              (hasLocaleAlternatives() ? (
                <button
                  type="button"
                  className={cx("mpanel__locale", TEXT.label)}
                  onClick={() => {
                    onClose();
                    emitUi(UI_EVENT.openLocale);
                  }}
                >
                  {localeText}
                </button>
              ) : (
                <p className={cx("mpanel__locale", TEXT.label)}>{localeText}</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export default MenuPanel;
