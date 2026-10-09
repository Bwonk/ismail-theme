import { cx } from "../../utils/cx";

interface Props {
  size?: number;
  className?: string;
}

export default function Spinner({ size = 20, className }: Props) {
  return <span className={cx("spinner", className)} style={{ width: size, height: size }} role="status" aria-hidden="true" />;
}
