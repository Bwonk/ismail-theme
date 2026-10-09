import { createMediaSrcset, getDefaultSrc } from "@ikas/bp-storefront";
import { cx } from "../../utils/cx";
import { TEXT, forceScheme } from "../../utils/tokens";
import { Props } from "./types";

const stripTags = (html?: string | null) =>
  (html ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * I/Section/CollectionHero — collection cover: image + scrim, collection name and description
 * bottom-left in the Şeffaf scheme. Title = category.name (CATEGORY prop, bound to the page's
 * category in the editor); `title` is only the fallback when no category is resolved.
 * Image = `image` prop, else the category's own image. Description = the category description
 * (plain text) when it has one, else the `description` prop.
 */
export function CollectionHero({
  title = "Kış 26 saha serisi",
  description = "Rüzgâr geçirmeyen katmanlar, şehirde de dağda da.",
  category,
  image,
  backgroundColor,
}: Props) {
  const heading = category?.name || title;
  const media = image ?? category?.image ?? null;
  const body = stripTags(category?.description) || description;

  return (
    <section className="chero" data-ism-hero="" style={backgroundColor ? { backgroundColor } : undefined}>
      <div className="chero__media">
        {media && (
          <img
            className="chero__img"
            src={getDefaultSrc(media)}
            srcSet={createMediaSrcset(media)}
            sizes="100vw"
            alt={media.altText ?? ""}
            loading="eager"
            decoding="async"
          />
        )}
      </div>
      <div className="chero__scrim" aria-hidden="true" />
      <div className={cx("chero__text", forceScheme("clear"))}>
        {/* I-COLL-01 · M-01: title and description fade up on load */}
        {heading && <h1 className={cx("chero__title", TEXT.display)}>{heading}</h1>}
        {body && <p className={cx("chero__desc", TEXT.body)}>{body}</p>}
      </div>
    </section>
  );
}

export default CollectionHero;
