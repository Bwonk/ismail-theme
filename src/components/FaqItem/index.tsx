import { useEffect, useRef, useState } from "preact/hooks";
import AccordionItem from "../../sub-components/AccordionItem";
import { Props } from "./types";

/**
 * I/Section/FaqList › AccordionItem — question + RICH_TEXT answer (I-FAQ-01 · I-CMP-11 · M-22).
 * The first item of a FaqList with "openFirst" starts open (read from the parent's data attribute after hydration).
 */
export function FaqItem({ question = "Kargo ne kadar sürer?", answer }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const list = el?.closest<HTMLElement>("[data-faq-open-first]");
    if (!el || !list) return;
    if (list.querySelector(".faqi") === el) setOpen(true);
  }, []);

  if (!question) return null;
  return (
    <div ref={ref} className="faqi">
      <AccordionItem title={question} body={answer} open={open} onToggle={setOpen} headingLevel={3} />
    </div>
  );
}

export default FaqItem;
