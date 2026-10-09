import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";

interface Props {
  value: string | number;
  textClass?: string;
  className?: string;
  ariaLabel?: string;
}

/** I/Sub/Counter — I-CMP-08 (I-M-01): each digit sits in a clipped mask and its reel rolls to the new value. */
export default function Counter({ value, textClass = TEXT.label, className, ariaLabel }: Props) {
  const chars = String(value).split("");
  return (
    <span className={cx("counter", textClass, "tabular", className)}>
      <span className="sr-only">{ariaLabel ?? String(value)}</span>
      {chars.map((ch, i) => {
        const d = ch.charCodeAt(0) - 48;
        if (d < 0 || d > 9) {
          return (
            <span key={`s${i}`} className="counter__sep" aria-hidden="true">
              {ch}
            </span>
          );
        }
        return (
          <span key={`d${chars.length - i}`} className="counter__mask" aria-hidden="true">
            <span className="counter__reel" style={{ transform: `translateY(${-d * 10}%)` }}>
              {"0123456789".split("").map((n) => (
                <span key={n} className="counter__digit">
                  {n}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
