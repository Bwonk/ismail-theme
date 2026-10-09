import { createMediaSrcset, getDefaultSrc } from "@ikas/bp-storefront";
import Button from "../../sub-components/Button";
import { cx } from "../../utils/cx";
import { TEXT, forceScheme } from "../../utils/tokens";
import { Props } from "./types";

/**
 * I/Section/CollectionMosaic › collection-tile — mosaic tile (image, scrim, label bottom-left).
 * CollectionMosaic decides the tile's size and state: it writes `data-state="open|shrink"` on
 * `.ctile` (I-MOS-05 · I-M-06), and `--ctile-featured` / `--ctile-mono` reach it by inheritance.
 * Description + small button show on the featured tile and on an open (hovered) tile.
 */
export function CollectionTile({
  image,
  title = "Şapka ve bere",
  text = "Kafayı sıcak tut: bere, şapka ve boyunluklar yeni sezonda.",
  buttonText = "Keşfet",
  link,
}: Props) {
  const href = link?.href;
  const newTab = link?.openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <div className="ctile">
      <div className="ctile__media">
        {image && (
          <img
            className="ctile__img"
            src={getDefaultSrc(image)}
            srcSet={createMediaSrcset(image)}
            sizes="(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
            alt={image.altText ?? ""}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <div className="ctile__scrim" aria-hidden="true" />
      <div className="ctile__scrim ctile__scrim--flat" aria-hidden="true" />

      <div className={cx("ctile__content", forceScheme("clear"))}>
        {title && (
          <h3 className={cx("ctile__title", TEXT.h2)}>
            {href ? (
              <a className="ctile__link" href={href} {...newTab}>
                <span className="ctile__label">{title}</span>
              </a>
            ) : (
              <span className="ctile__label">{title}</span>
            )}
          </h3>
        )}
        {(text || (buttonText && href)) && (
          <div className="ctile__reveal">
            {text && <p className={cx("ctile__text", TEXT.body)}>{text}</p>}
            {buttonText && href && (
              <div className="ctile__actions">
                {/* I-MOS-04 · M-11 via Button (light, small) */}
                <Button label={buttonText} href={href} size="sm" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CollectionTile;
