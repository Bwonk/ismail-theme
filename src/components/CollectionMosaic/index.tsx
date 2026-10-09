import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import { IkasComponentRenderer } from "@ikas/bp-storefront";
import SectionHeading from "../../sub-components/SectionHeading";
import { cx } from "../../utils/cx";
import { useReveal } from "../../utils/hooks";
import { BREAKPOINT } from "../../utils/tokens";
import { Props } from "./types";

type TileState = { open: number; shrink: number };
const NONE: TileState = { open: -1, shrink: -1 };

/**
 * I/Section/CollectionMosaic — heading + a 3-column mosaic of CollectionTile children
 * (tiles fill the columns two by two: short+long · long+short · short+long; the 2nd tile is featured).
 * Desktop hover = vertical accordion within a column (I-MOS-05 · I-M-06): the section writes
 * `data-state="open|shrink"` on the hovered tile and its column partner. Tablet/mobile: 2-column
 * grid, hover off.
 */
export function CollectionMosaic({ tiles, ...props }: Props) {
  const {
    title = "Öne çıkan koleksiyonlar",
    subtitle = "Katman katman giyin, her havaya hazır ol.",
    grayscaleImages = true,
    backgroundColor,
  } = props;
  const list = useMemo(
    () => (Array.isArray(tiles) ? tiles : tiles ? [tiles] : []).flat().filter(Boolean),
    [tiles],
  );
  const count = list.length;
  const gridRef = useRef<HTMLDivElement>(null);
  const reveal = useReveal(gridRef); // I-MOS-02 · M-01: tiles fade up in column order
  const [state, setState] = useState<TileState>(NONE);

  const tilesEls = () => Array.from(gridRef.current?.querySelectorAll<HTMLElement>(".ctile") ?? []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const apply = () =>
      tilesEls().forEach((el, i) => {
        el.style.setProperty("--i", String(i));
        const s = i === state.open ? "open" : i === state.shrink ? "shrink" : null;
        if (s) el.setAttribute("data-state", s);
        else el.removeAttribute("data-state");
      });
    apply();
    const mo = new MutationObserver(apply);
    mo.observe(grid, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [state, list]);

  const canHover = () =>
    window.innerWidth > BREAKPOINT.tablet && !!window.matchMedia?.("(hover: hover)").matches;

  const onOver = (e: Event) => {
    if (!canHover()) return;
    const tile = (e.target as HTMLElement | null)?.closest?.(".ctile");
    if (!tile) return;
    const els = tilesEls();
    const i = els.indexOf(tile as HTMLElement);
    if (i < 0 || i === state.open) return;
    const partner = i ^ 1; // tiles pair up per column: 0-1, 2-3, 4-5
    setState({ open: i, shrink: partner < els.length ? partner : -1 });
  };

  const style: Record<string, string | number> = { "--mos-cols": Math.max(1, Math.ceil(count / 2)) };
  if (grayscaleImages) style["--ctile-mono"] = 1;

  return (
    <section
      className="mos"
      style={backgroundColor ? { ...style, backgroundColor } : (style as any)}
    >
      {/* I-MOS-01 · M-01 via SectionHeading */}
      <SectionHeading title={title} subtitle={subtitle} />
      {count > 0 && (
        <div
          ref={gridRef}
          className={cx("mos__grid", reveal)}
          onMouseOver={onOver}
          onFocusIn={onOver}
          onMouseLeave={() => setState(NONE)}
        >
          <IkasComponentRenderer id="mosaic-tiles" className="mos__renderer" components={list} parentProps={props} />
        </div>
      )}
    </section>
  );
}

export default CollectionMosaic;
