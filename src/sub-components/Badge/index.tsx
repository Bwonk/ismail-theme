import { cx } from "../../utils/cx";
import { TEXT, upperTr } from "../../utils/tokens";

interface Props {
  text: string;
  tone?: "default" | "new" | "sale" | "soldout";
  className?: string;
}

/** I/Sub/Badge — default (SINIRLI) · new (YENİ) · sale (%20) · soldout (TÜKENDİ). */
export default function Badge({ text, tone = "default", className }: Props) {
  if (!text) return null;
  return <span className={cx("badge", `badge--${tone}`, TEXT.badge, "tabular", className)}>{upperTr(text)}</span>;
}
