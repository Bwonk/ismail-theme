import { normalizeSvg } from "@ikas/bp-storefront";
import { cx } from "../../utils/cx";

const DEFAULT_ICON = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2.16c3.2 0 3.58 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58 0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33 0 7.05.07 2.7.27.27 2.69.07 7.05 0 8.33 0 8.74 0 12s0 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 24 8.74 24 12 24s3.67 0 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s0-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67 0 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z\"/></svg>";
import { Props } from "./types";

/** I/Section/Footer › social-button — 40px ring, 18px merchant SVG; I-FTR-02 · M-28 icon → accent on hover. */
export function SocialLink({ icon, link, label = "Instagram" }: Props) {
  const href = link?.href;
  const svg = icon || DEFAULT_ICON;
  const glyph = svg ? (
    <span className="slink__icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: normalizeSvg(svg, { idPrefix: `slink-${label}` }) }} />
  ) : null;
  if (!href) {
    return (
      <span className={cx("slink", "slink--static")} role="img" aria-label={label || undefined}>
        {glyph}
      </span>
    );
  }
  return (
    <a className="slink" href={href} aria-label={label || undefined} target="_blank" rel="noopener noreferrer">
      {glyph}
    </a>
  );
}

export default SocialLink;
