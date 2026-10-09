import { useEffect, useState } from "preact/hooks";
import Button from "../../sub-components/Button";
import Counter from "../../sub-components/Counter";
import { cx } from "../../utils/cx";
import { prefersReducedMotion } from "../../utils/hooks";
import { TEXT } from "../../utils/tokens";
import { Props } from "./types";

/** I/Section/NotFound — 404 reel (Counter), title, text, button; left-aligned. ProductGrid follows as its own section. */
export function NotFound({
  codeText = "404",
  title = "Bu patika bir yere çıkmıyor",
  text = "Aradığın sayfa taşınmış ya da hiç var olmamış olabilir. Rotayı ana sayfadan yeniden çizelim.",
  buttonText = "Ana sayfaya dön",
  buttonLink,
  backgroundColor,
}: Props) {
  const code = codeText || "404";
  // SSR renders the end value; after hydration the reel starts at zeros and rolls in.
  const [shown, setShown] = useState(code);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(code);
      return;
    }
    setShown(code.replace(/\d/g, "0"));
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setShown(code));
    });
    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [code]);

  return (
    <section className="nf" style={backgroundColor ? { backgroundColor } : undefined}>
      <div className="nf__inner">
        {/* not-found-code · I-NF-01 · I-M-01 via Counter (I-CMP-08): digits roll 000 → 404, right to left */}
        <Counter value={shown} ariaLabel={code} textClass={TEXT.displayNum} className="nf__code" />
        {title && <h1 className={cx("nf__title", TEXT.h2)}>{title}</h1>}
        {text && <p className={cx("nf__text", TEXT.body)}>{text}</p>}
        {buttonText && (
          /* not-found-button · I-NF-02 · M-11 */
          <div className="nf__actions">
            <Button label={buttonText} href={buttonLink?.href || "/"} />
          </div>
        )}
      </div>
    </section>
  );
}

export default NotFound;
