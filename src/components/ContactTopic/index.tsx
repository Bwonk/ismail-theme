import { useEffect, useRef, useState } from "preact/hooks";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import { SCOPED_EVENT, emitScoped, onScoped } from "../../utils/ui";
import { Props } from "./types";

interface TopicDetail {
  label: string | null;
  el: Element | null;
}

/**
 * I/Section/ContactForm › topic-chip — toggle chip. Selection is announced to ContactForm (and the
 * sibling chips) with a bubbling SCOPED_EVENT.contactTopic on `[data-scope="contact-topics"]`.
 * I-CONT-04 · M-28: selected chip → inverse fill.
 */
export function ContactTopic({ label = "Sipariş durumu" }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const scope = el?.closest('[data-scope="contact-topics"]');
    if (!el || !scope) return;
    return onScoped<TopicDetail>(scope, SCOPED_EVENT.contactTopic, (d) => setSelected(!!d && d.el === el));
  }, []);

  if (!label) return null;
  return (
    <button
      ref={ref}
      type="button"
      className={cx("ctopic", selected && "ctopic--on")}
      aria-pressed={selected}
      onClick={() => {
        const el = ref.current;
        if (!el) return;
        emitScoped(el, SCOPED_EVENT.contactTopic, selected ? { label: null, el: null } : { label, el });
      }}
    >
      <span className={TEXT.uiSm}>{label}</span>
    </button>
  );
}

export default ContactTopic;
