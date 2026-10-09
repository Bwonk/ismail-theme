import { useEffect, useRef } from "preact/hooks";
import { IkasComponentRenderer } from "@ikas/bp-storefront";
import SectionHeading from "../../sub-components/SectionHeading";
import { cx } from "../../utils/cx";
import { useReveal } from "../../utils/hooks";
import { Props } from "./types";

const toList = (v: any) => (Array.isArray(v) ? v : v ? [v] : []).flat().filter(Boolean);

/** I/Section/StoreList — SectionHeading + StoreItem cards (3 / 2 / 1 per row). I-STOR-01 stagger; I-STOR-02 via ArrowLink. */
export function StoreList(props: Props) {
  const {
    title = "Mağazalarımız",
    subtitle = "Ekipmanı elinle tut, denedikten sonra karar ver.",
    stores,
    backgroundColor,
  } = props;
  const gridRef = useRef<HTMLDivElement>(null);
  const reveal = useReveal(gridRef);
  const list = toList(stores);

  // Stagger index for the opaque children (I-STOR-01 · M-01, 0.08s).
  useEffect(() => {
    gridRef.current?.querySelectorAll<HTMLElement>(".sitem").forEach((el, i) => el.style.setProperty("--i", String(i)));
  }, [list.length]);

  return (
    <section className="stor" style={backgroundColor ? { backgroundColor } : undefined}>
      <SectionHeading title={title} subtitle={subtitle} className="stor__heading" />
      {list.length > 0 && (
        <div ref={gridRef} className={cx("stor__grid", reveal)}>
          <IkasComponentRenderer id="store-list" components={list} parentProps={props} />
        </div>
      )}
    </section>
  );
}

export default StoreList;
