import { useRef } from "preact/hooks";
import { cx } from "../../utils/cx";
import { useReveal } from "../../utils/hooks";
import { TEXT } from "../../utils/tokens";

interface Props {
  title?: string;
  subtitle?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}

/** I/Sub/SectionHeading — I-CMP-12 (M-01): title, then subtitle, fade up on first view. */
export default function SectionHeading({ title, subtitle, align = "center", as: Tag = "h2", className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reveal = useReveal(ref);
  if (!title && !subtitle) return null;
  return (
    <div ref={ref} className={cx("shead", `shead--${align}`, reveal, className)}>
      {title && <Tag className={cx("shead__title", TEXT.h2)}>{title}</Tag>}
      {subtitle && <p className={cx("shead__subtitle", TEXT.body)}>{subtitle}</p>}
    </div>
  );
}
