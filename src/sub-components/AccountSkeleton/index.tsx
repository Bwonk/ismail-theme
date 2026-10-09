import { cx } from "../../utils/cx";
import Skeleton from "../Skeleton";

interface Props {
  /** Screen-reader text announced while loading ("Yükleniyor…"). */
  label: string;
  className?: string;
}

/** I/Section/Account › account-skeleton — Skeleton blocks (media 120, title 260×24, two lines, button 48). */
export default function AccountSkeleton({ label, className }: Props) {
  return (
    <div className={cx("askel", className)} role="status" aria-live="polite">
      <span className="sr-only">{label}</span>
      <Skeleton height={120} />
      <Skeleton width={260} height={24} className="askel__title" />
      <Skeleton height={12} />
      <Skeleton height={12} />
      <Skeleton height={48} />
    </div>
  );
}
