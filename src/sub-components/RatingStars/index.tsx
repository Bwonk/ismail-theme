import { useState } from "preact/hooks";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";

export interface RatingStarsProps {
  /** Average 0–5 (read-only mode). Rounded to the nearest half star. */
  rating?: number | null;
  /** Review count, rendered "(128)". 0 → yorumsuz state when `emptyText` is set. */
  count?: number | null;
  showScore?: boolean;
  showCount?: boolean;
  /** Overrides the default "4,6" score text. */
  scoreText?: string;
  /** yorumsuz: grey stars + this text (e.g. "Henüz yorum yok"). */
  emptyText?: string;
  /** Star size in px (14 in lists/cards, larger in the review form). */
  size?: number;
  /** Read-only: accessible summary, e.g. "5 üzerinden 4,6 puan". */
  ariaLabel?: string;
  /** Selectable 1–5 for the review form. */
  interactive?: boolean;
  value?: number;
  onChange?: (value: number) => void;
  /** Interactive: radio labels, `{n}` is replaced by the star count (e.g. "{n} yıldız"). */
  starAriaLabel?: string;
  /** Interactive: radiogroup label (e.g. "Puanın"). */
  groupAriaLabel?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
}

const STARS = [1, 2, 3, 4, 5];

// Same geometry as Icon "star-fill", cropped to the star's bounds (pen.dev viewBox 2 2 20 19.02).
const STAR_PATH = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z";

function StarSvg({ size, className }: { size: number; className: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="2 2 20 19.02" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={STAR_PATH} />
    </svg>
  );
}

function Star({ fill, size }: { fill: 0 | 0.5 | 1; size: number }) {
  return (
    <span className="rstars__star" style={{ width: size, height: size }}>
      <StarSvg size={size} className="rstars__base" />
      {fill > 0 && (
        <span className="rstars__mask" style={{ width: fill === 1 ? "100%" : "50%" }}>
          <StarSvg size={size} className="rstars__fill" />
        </span>
      )}
    </span>
  );
}

/**
 * I/Sub/RatingStars — five 14px stars (text fill, line when empty, half via clip mask),
 * mono score + muted count. yorumsuz: line stars + empty text. Interactive mode for the review form.
 */
export default function RatingStars({
  rating,
  count,
  showScore = true,
  showCount = true,
  scoreText,
  emptyText,
  size = 14,
  ariaLabel,
  interactive,
  value = 0,
  onChange,
  starAriaLabel,
  groupAriaLabel,
  disabled,
  invalid,
  className,
}: RatingStarsProps) {
  const [hover, setHover] = useState(0);

  if (interactive) {
    const shown = hover || value;
    const onKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        onChange?.(Math.min(5, (value || 0) + 1));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        onChange?.(Math.max(1, (value || 1) - 1));
      }
    };
    return (
      <div
        className={cx("rstars", "rstars--input", invalid && "rstars--invalid", disabled && "rstars--disabled", className)}
        role="radiogroup"
        aria-label={groupAriaLabel}
        aria-invalid={invalid || undefined}
        onMouseLeave={() => setHover(0)}
        onKeyDown={onKeyDown as any}
      >
        <span className="rstars__row">
          {STARS.map((n) => (
            <button
              key={n}
              type="button"
              className="rstars__pick"
              role="radio"
              aria-checked={value === n}
              aria-label={starAriaLabel ? starAriaLabel.replace("{n}", String(n)) : String(n)}
              tabIndex={value === n || (!value && n === 1) ? 0 : -1}
              disabled={disabled}
              onMouseEnter={() => setHover(n)}
              onFocus={() => setHover(0)}
              onClick={() => onChange?.(n)}
            >
              <Star fill={n <= shown ? 1 : 0} size={size} />
            </button>
          ))}
        </span>
      </div>
    );
  }

  const isEmpty = count === 0 || (!rating && !count);
  const r = isEmpty ? 0 : Math.round(Math.min(Math.max(rating ?? 0, 0), 5) * 2) / 2;
  const score = scoreText ?? (rating ? rating.toFixed(1).replace(".", ",") : "");

  return (
    <div className={cx("rstars", isEmpty && "rstars--empty", className)} role={ariaLabel ? "img" : undefined} aria-label={ariaLabel}>
      <span className="rstars__row" aria-hidden="true">
        {STARS.map((n) => (
          <Star key={n} fill={r >= n ? 1 : r >= n - 0.5 ? 0.5 : 0} size={size} />
        ))}
      </span>
      {isEmpty
        ? emptyText && (
            <span className={cx("rstars__count", TEXT.label)} aria-hidden={ariaLabel ? "true" : undefined}>
              {emptyText}
            </span>
          )
        : (
            <>
              {showScore && score && (
                <span className={cx("rstars__score", TEXT.label, "tabular")} aria-hidden={ariaLabel ? "true" : undefined}>
                  {score}
                </span>
              )}
              {showCount && count != null && (
                <span className={cx("rstars__count", TEXT.label, "tabular")} aria-hidden={ariaLabel ? "true" : undefined}>
                  ({count})
                </span>
              )}
            </>
          )}
    </div>
  );
}
