import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import Icon from "../Icon";
import Spinner from "../Spinner";

export interface SocialLoginButtonProps {
  provider: "google" | "facebook";
  /** e.g. googleText "Google ile devam et" / facebookText "Facebook ile devam et". */
  label: string;
  onClick?: (e: MouseEvent) => void;
  href?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

/** I/Sub/SocialLoginButton — 48px outline button, 20px monochrome brand mark + label; hover → surface fill (M-28). */
export default function SocialLoginButton({ provider, label, onClick, href, loading, disabled, className }: SocialLoginButtonProps) {
  const inactive = disabled || loading;
  const content = (
    <>
      {loading ? (
        <Spinner size={18} />
      ) : (
        <Icon name={provider === "google" ? "google-line" : "facebook-line"} size={20} className="slogin__icon" />
      )}
      <span className={cx("slogin__label", TEXT.ui)}>{label}</span>
    </>
  );
  const cls = cx("slogin", `slogin--${provider}`, inactive && "slogin--inactive", className);
  if (href && !inactive) {
    return (
      <a className={cls} href={href} onClick={onClick as any}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} disabled={inactive} aria-busy={loading || undefined} onClick={onClick as any}>
      {content}
    </button>
  );
}
