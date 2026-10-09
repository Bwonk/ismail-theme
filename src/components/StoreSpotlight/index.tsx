import { useEffect, useRef, useState } from "preact/hooks";
import { createMediaSrcset, getDefaultSrc } from "@ikas/bp-storefront";
import Button from "../../sub-components/Button";
import Counter from "../../sub-components/Counter";
import { cx } from "../../utils/cx";
import { prefersReducedMotion, useReveal } from "../../utils/hooks";
import { TEXT } from "../../utils/tokens";
import { Props } from "./types";

/**
 * I/Section/StoreSpotlight — store image beside a text column: intro (title + paragraph) on top,
 * the offer (label, giant rolling number, note, map button) at the bottom.
 */
export function StoreSpotlight({
  image,
  title = "Kadıköy mağazası açıldı",
  text = "Kamp ekipmanından kentsel katmanlara kadar tüm koleksiyon tek çatı altında. Gel, dene, rotanı birlikte çizelim.",
  offerLabel = "AÇILIŞA ÖZEL",
  offerValue = "%30",
  offerNote = "Mağazaya özel, 31 Ekim'e kadar geçerli.",
  buttonText = "Yol tarifi al",
  buttonLink,
  imagePosition = "left",
  backgroundColor,
}: Props) {
  const introRef = useRef<HTMLDivElement>(null);
  const introReveal = useReveal(introRef); // I-SPOT-01 · M-01
  const valueRef = useRef<HTMLDivElement>(null);
  // I-SPOT-02 · I-M-01: SSR shows the final value; after hydration the digits reset to 0 and
  // roll to the target once 60% of the number is on screen (once).
  const [roll, setRoll] = useState<"idle" | "zero" | "run">("idle");

  useEffect(() => {
    const el = valueRef.current;
    if (!el || !offerValue || !/\d/.test(offerValue)) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;
    setRoll("zero");
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        requestAnimationFrame(() => requestAnimationFrame(() => setRoll("run")));
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [offerValue]);

  const shownValue = roll === "zero" ? (offerValue ?? "").replace(/\d/g, "0") : offerValue ?? "";

  return (
    <section
      className={cx("spot", imagePosition === "right" && "spot--right")}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="spot__media">
        {image && (
          <img
            className="spot__img"
            src={getDefaultSrc(image)}
            srcSet={createMediaSrcset(image)}
            sizes="(max-width: 991px) 100vw, (max-width: 1199px) 50vw, 62vw"
            alt={image.altText ?? title ?? ""}
            loading="lazy"
            decoding="async"
          />
        )}
      </div>

      <div className="spot__content">
        <div ref={introRef} className={cx("spot__intro", introReveal)}>
          {title && <h2 className={cx("spot__title", TEXT.h3)}>{title}</h2>}
          {text && <p className={cx("spot__text", TEXT.body)}>{text}</p>}
        </div>

        <div className="spot__offer">
          {offerLabel && <p className={cx("spot__label", TEXT.label)}>{offerLabel}</p>}
          {offerValue && (
            <div ref={valueRef} className={cx("spot__value", roll === "zero" && "is-zero")}>
              <Counter value={shownValue} textClass={TEXT.display} ariaLabel={offerValue} />
            </div>
          )}
          {offerNote && <p className={cx("spot__note", TEXT.uiSm)}>{offerNote}</p>}
          {buttonText && buttonLink?.href && (
            <div className="spot__actions">
              {/* I-SPOT-03 · M-11 via Button */}
              <Button label={buttonText} href={buttonLink.href} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default StoreSpotlight;
