import { cx } from "../../utils/cx";

interface Props {
  size?: number;
  className?: string;
}

/** I/Sub/Spinner — 20px ring: track $color-line, quarter arc $color-accent, ring width 15% of the radius (innerRadius 0.85). */
export default function Spinner({ size = 20, className }: Props) {
  const ring = Math.max(1, Math.round(size * 0.075 * 100) / 100);
  return <span className={cx("spinner", className)} style={{ width: size, height: size, borderWidth: ring }} role="status" aria-hidden="true" />;
}
