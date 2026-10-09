import {
  IkasBlog,
  createMediaSrcset,
  getDefaultSrc,
  getIkasBlogFormattedDate,
  getIkasBlogHref,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { cx } from "../../utils/cx";
import { TEXT, upperTr } from "../../utils/tokens";
import ArrowLink from "../ArrowLink";
import Icon from "../Icon";

interface Props {
  blog: IkasBlog;
  /** "Devamını oku" — ArrowLink label; omit to hide the link. */
  readMoreText?: string;
  /** Show the short description under the title (not drawn on the canvas; off by default). */
  showExcerpt?: boolean;
  /** Media aspect ratio; canvas: 442×332 grid card (default), 909×511 featured → "16 / 9". */
  aspectRatio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/**
 * I/Sub/BlogCard — media, category · date meta, H4 title, ArrowLink.
 * Hover: I-CMP-04 (M-09) image scales to 1.04 over 0.6s ease-out-soft; I-CMP-06 arrow link.
 */
const BlogCard = observer(function BlogCard({
  blog,
  readMoreText,
  showExcerpt = false,
  aspectRatio = "442 / 332",
  sizes = "(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw",
  priority = false,
  className,
}: Props) {
  const href = getIkasBlogHref(blog);
  const image = blog.image ?? null;
  const date = getIkasBlogFormattedDate(blog);
  const category = blog.category?.name;

  return (
    <article className={cx("bcard", className)}>
      <a className="bcard__media" href={href} tabIndex={-1} aria-hidden="true" style={{ aspectRatio }}>
        {image ? (
          <img
            className="bcard__img"
            src={getDefaultSrc(image)}
            srcSet={createMediaSrcset(image)}
            sizes={sizes}
            alt=""
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
          />
        ) : (
          <Icon name="mountain" size={32} className="bcard__placeholder" />
        )}
      </a>
      {(category || date) && (
        <div className={cx("bcard__meta", TEXT.label, "tabular")}>
          {category && <span className="bcard__category">{upperTr(category)}</span>}
          {date && (
            <time className="bcard__date" dateTime={blog.publishedAt ? new Date(blog.publishedAt).toISOString() : undefined}>
              {upperTr(date)}
            </time>
          )}
        </div>
      )}
      <h3 className={cx("bcard__title", TEXT.h4)}>
        <a href={href}>{blog.title}</a>
      </h3>
      {showExcerpt && blog.shortDescription && <p className={cx("bcard__excerpt", TEXT.body)}>{blog.shortDescription}</p>}
      {readMoreText && <ArrowLink label={readMoreText} href={href} className="bcard__more" />}
    </article>
  );
});

export default BlogCard;
