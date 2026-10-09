import { useEffect, useState } from "preact/hooks";
import { cx } from "../../utils/cx";
import { TEXT, forceScheme } from "../../utils/tokens";
import Button from "../Button";
import IconButton from "../IconButton";

interface Props {
  content?: string;
  acceptText: string;
  closeAriaLabel: string;
}

const STORAGE_KEY = "ismail:cookie-consent";

function read(store: "local" | "session") {
  try {
    return (store === "local" ? window.localStorage : window.sessionStorage).getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function write(store: "local" | "session", value: string) {
  try {
    (store === "local" ? window.localStorage : window.sessionStorage).setItem(STORAGE_KEY, value);
  } catch {
    /* storage blocked: the bar simply stays dismissed for this page view */
  }
}

/**
 * I/Overlay/CookieBar — bottom strip (desktop) / floating card (mobile) in the Mürekkep palette, over a page scrim.
 * Client only: renders after hydration when no consent is stored. Accept persists in
 * localStorage; close hides it for the session. I-CKE-01 (M-20): slides up from the bottom.
 */
export default function CookieBar({ content, acceptText, closeAriaLabel }: Props) {
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!content || read("local") === "accepted" || read("session") === "dismissed") return;
    setVisible(true);
    const t = setTimeout(() => setShown(true), 400);
    return () => clearTimeout(t);
  }, [content]);

  if (!visible) return null;

  const hide = (store: "local" | "session", value: string) => {
    write(store, value);
    setShown(false);
    setTimeout(() => setVisible(false), 500);
  };

  return (
    <>
      {/* scrim (page scheme): fades in with the bar; a click dismisses for the session like the close button */}
      <div className={cx("ckbar-scrim", shown && "is-open")} aria-hidden="true" onClick={() => hide("session", "dismissed")} />
      <aside className={cx("ckbar", forceScheme("ink"), shown && "is-open")}>
        <div className={cx("ckbar__text", TEXT.uiSm)} dangerouslySetInnerHTML={{ __html: content ?? "" }} />
        <div className="ckbar__actions">
          <Button className="ckbar__accept" label={acceptText} onClick={() => hide("local", "accepted")} />
          <IconButton icon="x" iconSize={18} ariaLabel={closeAriaLabel} onClick={() => hide("session", "dismissed")} />
        </div>
      </aside>
    </>
  );
}
