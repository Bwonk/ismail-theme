import { Fragment } from "preact";
import { createMediaSrcset, getDefaultSrc } from "@ikas/bp-storefront";
import Button from "../../sub-components/Button";
import { cx } from "../../utils/cx";
import { TEXT, forceScheme } from "../../utils/tokens";
import { Props } from "./types";

/**
 * I/Section/HeroSlider › hero-slide — one slide of the HeroSlider COMPONENT_LIST.
 * The parent (HeroSlider) drives `data-state="active|prev|idle"` on `.hslide` and the
 * `--hero-parallax` / `--hero-scrim-opacity` custom properties; everything below reacts in CSS.
 * The scrim takes the section scheme's --c-scrim (canvas: hero-scrim sits outside the dark
 * hero-content); only the content layer is drawn with the Şeffaf scheme (light text).
 */
export function HeroSlide({
  image,
  mobileImage,
  title = "Rotanı kendin çiz.",
  text = "Rüzgârı arkana, karı önüne al. Kış 26 saha serisi; sırtta, kampta ve şehirde aynı ciddiyetle çalışan katmanlardan oluşur.",
  buttonText = "Koleksiyonu keşfet",
  metaText = "41°N 29°E · 2.140 M",
  buttonLink,
}: Props) {
  const desktop = image ?? mobileImage ?? null;
  const words = (title ?? "").split(/\s+/).filter(Boolean);

  return (
    <div className="hslide">
      {/* I-HERO-01 · M-02 load fade · I-HERO-05 · M-07 image scale · I-HERO-07 · M-27 parallax */}
      <div className="hslide__mask">
        <div className="hslide__bg">
          {desktop && (
            <picture>
              {mobileImage && (
                <source media="(max-width: 767px)" srcSet={createMediaSrcset(mobileImage)} sizes="100vw" />
              )}
              <img
                className="hslide__img"
                src={getDefaultSrc(desktop)}
                srcSet={createMediaSrcset(desktop)}
                sizes="100vw"
                alt={desktop.altText ?? ""}
                loading="eager"
                decoding="async"
              />
            </picture>
          )}
        </div>
      </div>
      <div className="hslide__scrim" aria-hidden="true" />

      <div className={cx("hslide__content", forceScheme("clear"))}>
        <div className="hslide__text">
          {words.length > 0 && (
            <h2 className={cx("hslide__title", TEXT.display)}>
              <span className="sr-only">{title}</span>
              {/* I-HERO-02 · M-03: word-by-word reveal inside the title clip mask */}
              <span className="hslide__title-mask" aria-hidden="true">
                {words.map((word, i) => (
                  <Fragment key={i}>
                    <span className="hslide__word" style={{ "--w": i } as any}>
                      {word}
                    </span>
                    {i < words.length - 1 ? " " : null}
                  </Fragment>
                ))}
              </span>
            </h2>
          )}
          {text && <p className={cx("hslide__desc", TEXT.body)}>{text}</p>}
          {buttonText && buttonLink?.href && (
            <div className="hslide__actions">
              {/* I-HERO-04 · M-11 via Button */}
              <Button label={buttonText} href={buttonLink.href} />
            </div>
          )}
        </div>
        {metaText && <p className={cx("hslide__meta", TEXT.label, "tabular")}>{metaText}</p>}
      </div>
    </div>
  );
}

export default HeroSlide;
