import { cx } from "../../utils/cx";

interface Props {
  width?: number | string;
  height?: number | string;
  radius?: "card" | "pill";
  className?: string;
}

/** I/Sub/Skeleton — surface blocks with a slow shimmer; compose in place of loading content. */
export default function Skeleton({ width = "100%", height = 12, radius = "card", className }: Props) {
  return <span className={cx("skel", radius === "pill" && "skel--pill", className)} style={{ width, height }} aria-hidden="true" />;
}
