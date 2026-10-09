import { useEffect, useRef, useState } from "preact/hooks";
import { cx } from "../../utils/cx";
import Icon from "../Icon";

interface Props {
  active: boolean;
  ariaLabel: string;
  onToggle: () => void | Promise<void>;
  size?: "sm" | "md";
  className?: string;
}

/** I/Sub/FavoriteButton — I-CMP-07 (I-M-03): the filled heart pops once when it turns on. */
export default function FavoriteButton({ active, ariaLabel, onToggle, size = "sm", className }: Props) {
  const [pop, setPop] = useState(false);
  const prev = useRef(active);
  useEffect(() => {
    if (active && !prev.current) {
      setPop(true);
      const t = setTimeout(() => setPop(false), 450);
      prev.current = active;
      return () => clearTimeout(t);
    }
    prev.current = active;
  }, [active]);
  return (
    <button
      type="button"
      className={cx("fav", `fav--${size}`, active && "fav--on", pop && "fav--pop", className)}
      aria-label={ariaLabel}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
    >
      <Icon name="heart" size={size === "sm" ? 14 : 18} className="fav__outline" />
      <Icon name="heart-fill" size={size === "sm" ? 14 : 18} className="fav__filled" />
    </button>
  );
}
