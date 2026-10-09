import { IkasCustomerReview, IkasImage, createMediaSrcset, getDefaultSrc } from "@ikas/bp-storefront";
import { cx } from "../../utils/cx";
import { TEXT, upperTr } from "../../utils/tokens";
import Icon from "../Icon";
import RatingStars from "../RatingStars";

export interface ReviewCardProps {
  review: IkasCustomerReview;
  /** "Doğrulanmış alıcı" */
  verifiedText: string;
  /** "MAĞAZA YANITI" */
  merchantReplyLabel: string;
  /** Verified-buyer badge; defaults to `!!review.orderId` (review tied to an order). */
  verified?: boolean;
  /** Overrides "Elif K." built from firstName + last initial. */
  authorText?: string;
  /** Overrides the dd.MM.yyyy date built from createdAt. */
  dateText?: string;
  /** Alt text for review photos (e.g. "Yorum görseli"). */
  imageAltText?: string;
  /** Accessible label for the stars; `{n}` → star count (e.g. "5 üzerinden {n} yıldız"). */
  ratingAriaLabel?: string;
  /** Makes photos buttons (e.g. open a lightbox). */
  onImageClick?: (index: number, images: IkasImage[]) => void;
  /** Aria label for a photo button; `{n}` → 1-based index. */
  imageButtonAriaLabel?: string;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");

function formatDate(ts?: number | null) {
  if (!ts) return "";
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "";
  return `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
}

function authorName(r: IkasCustomerReview) {
  const first = (r.firstName ?? "").trim();
  const last = (r.lastName ?? "").trim();
  if (!first && !last) return "";
  if (!last) return first;
  return `${first} ${upperTr(last.charAt(0))}.`.trim();
}

/**
 * I/Sub/ReviewCard — stars, title, comment, optional photos (görselli), meta row
 * (author · date · verified badge; doğrulanmamış hides it) and merchant reply box (mağaza yanıtlı).
 */
export default function ReviewCard({
  review,
  verifiedText,
  merchantReplyLabel,
  verified,
  authorText,
  dateText,
  imageAltText = "",
  ratingAriaLabel,
  onImageClick,
  imageButtonAriaLabel,
  className,
}: ReviewCardProps) {
  const isVerified = verified ?? !!review.orderId;
  const images = (review.images ?? []).filter(Boolean) as IkasImage[];
  const author = authorText ?? authorName(review);
  const date = dateText ?? formatDate(review.createdAt);
  const reply = review.reply?.trim();
  const star = Math.min(Math.max(Math.round(review.star || 0), 0), 5);

  return (
    <article className={cx("rcard", className)}>
      <RatingStars
        rating={star}
        count={1}
        showScore={false}
        showCount={false}
        ariaLabel={ratingAriaLabel ? ratingAriaLabel.replace("{n}", String(star)) : undefined}
      />
      {review.title && <h3 className={cx("rcard__title", TEXT.title)}>{review.title}</h3>}
      {review.comment && <p className={cx("rcard__text", TEXT.body)}>{review.comment}</p>}
      {images.length > 0 && (
        <div className="rcard__images">
          {images.map((img, i) => {
            const pic = (
              <img
                className="rcard__img"
                src={getDefaultSrc(img)}
                srcSet={createMediaSrcset(img)}
                sizes="56px"
                alt={imageAltText}
                width={56}
                height={56}
                loading="lazy"
                decoding="async"
              />
            );
            return onImageClick ? (
              <button
                key={img.id ?? i}
                type="button"
                className="rcard__thumb rcard__thumb--btn"
                aria-label={imageButtonAriaLabel ? imageButtonAriaLabel.replace("{n}", String(i + 1)) : undefined}
                onClick={() => onImageClick(i, images)}
              >
                {pic}
              </button>
            ) : (
              <span key={img.id ?? i} className="rcard__thumb">
                {pic}
              </span>
            );
          })}
        </div>
      )}
      {(author || date || isVerified) && (
        <div className="rcard__meta">
          {author && <span className={cx("rcard__author", TEXT.label)}>{author}</span>}
          {date && (
            <time className={cx("rcard__date", TEXT.label, "tabular")} dateTime={new Date(review.createdAt).toISOString()}>
              {date}
            </time>
          )}
          {isVerified && verifiedText && (
            <span className="rcard__verified">
              <Icon name="badge-check" size={14} className="rcard__verified-icon" />
              <span className={TEXT.uiSm}>{verifiedText}</span>
            </span>
          )}
        </div>
      )}
      {reply && (
        <div className="rcard__reply">
          {merchantReplyLabel && <span className={cx("rcard__reply-label", TEXT.label)}>{merchantReplyLabel}</span>}
          <p className={cx("rcard__reply-text", TEXT.uiSm)}>{reply}</p>
        </div>
      )}
    </article>
  );
}
