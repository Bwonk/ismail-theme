import { createMediaSrcset, getDefaultSrc } from "@ikas/bp-storefront";
import Icon from "../../sub-components/Icon";
import { cx } from "../../utils/cx";
import { TEXT, forceScheme } from "../../utils/tokens";
import { Props } from "./types";

/**
 * I/Section/ActivityGrid › activity-card — expanding card (I-ACT-04 · I-M-05).
 * ActivityGrid sets `data-open` on the open card (and `--i` for the entrance stagger);
 * every open-dependent value is derived from `--o` (0 closed · 1 open) so it can transition.
 */
export function ActivityCard({
  image,
  title = "Yürüyüş",
  text = "Rota, bot ve katmanlar; uzun günler için.",
  countText = "48 ürün",
  buttonText = "Keşfet",
  link,
}: Props) {
  const href = link?.href;
  const Tag = (href ? "a" : "div") as any;
  const linkAttrs = href
    ? { href, ...(link?.openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {}) }
    : {};

  return (
    <Tag className="acard" {...linkAttrs}>
      <div className="acard__media">
        {image && (
          <img
            className="acard__img"
            src={getDefaultSrc(image)}
            srcSet={createMediaSrcset(image)}
            sizes="(max-width: 767px) 240px, (max-width: 991px) 280px, 40vw"
            alt={image.altText ?? ""}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
      <div className="acard__scrim" aria-hidden="true" />
      <div className="acard__scrim acard__scrim--deep" aria-hidden="true" />

      <div className={cx("acard__content", forceScheme("clear"))}>
        {title && <h3 className={cx("acard__title", TEXT.h3)}>{title}</h3>}
        {text && (
          <div className="acard__reveal">
            <p className={cx("acard__text", TEXT.uiSm)}>{text}</p>
          </div>
        )}
        {countText && <p className={cx("acard__count", TEXT.uiSm)}>{countText}</p>}
        {buttonText && (
          <div className="acard__reveal">
            <span className="acard__link">
              <span className={TEXT.ui}>{buttonText}</span>
              <Icon name="arrow-right" size={16} />
            </span>
          </div>
        )}
      </div>
    </Tag>
  );
}

export default ActivityCard;
