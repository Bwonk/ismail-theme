import { IkasComponentRenderer } from "@ikas/bp-storefront";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import { Props } from "./types";

/** I/Section/FaqList — 420 intro column + FaqItem accordions (I-FAQ-01 via AccordionItem). */
export function FaqList(props: Props) {
  const {
    title = "Hızlı yanıtlar",
    text = "Soruların çoğunun yanıtı burada. Bulamazsan yukarıdan yaz.",
    items,
    openFirst = true,
    backgroundColor,
  } = props;
  const list = (Array.isArray(items) ? items : items ? [items] : []).flat().filter(Boolean);

  return (
    <section className="faq" style={backgroundColor ? { backgroundColor } : undefined}>
      {(title || text) && (
        <div className="faq__intro">
          {title && <h2 className={cx("faq__title", TEXT.h2)}>{title}</h2>}
          {text && <p className={cx("faq__text", TEXT.body)}>{text}</p>}
        </div>
      )}
      {list.length > 0 && (
        /* I-FAQ-01 · M-22 via AccordionItem */
        <div className="faq__items" {...(openFirst !== false ? { "data-faq-open-first": "" } : {})}>
          <IkasComponentRenderer id="faq-items" components={list} parentProps={props} />
        </div>
      )}
    </section>
  );
}

export default FaqList;
