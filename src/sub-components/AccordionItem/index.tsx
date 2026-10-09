import type { ComponentChildren } from "preact";
import { useId, useState } from "preact/hooks";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";
import Icon from "../Icon";

export interface AccordionItemProps {
  title: string;
  /** RICH_TEXT HTML body. Use `children` instead for custom content. */
  body?: string;
  children?: ComponentChildren;
  /** Controlled open state. Leave undefined for uncontrolled (`defaultOpen`). */
  open?: boolean;
  defaultOpen?: boolean;
  onToggle?: (open: boolean) => void;
  id?: string;
  /** Heading level wrapping the toggle button (a11y). */
  headingLevel?: 2 | 3 | 4 | 5 | 6;
  /** Text style class for the title (default TEXT.ui), e.g. TEXT.label for footer columns. */
  titleClass?: string;
  className?: string;
}

/** I/Sub/AccordionItem — head (title + plus) over body; I-CMP-11 · M-22: height 0.4s, plus rotates 45° to ×. */
export default function AccordionItem({
  title,
  body,
  children,
  open,
  defaultOpen = false,
  onToggle,
  id,
  headingLevel = 3,
  titleClass = TEXT.ui,
  className,
}: AccordionItemProps) {
  const autoId = useId();
  const baseId = id || `acc-${autoId}`;
  const [inner, setInner] = useState(defaultOpen);
  const isOpen = open ?? inner;
  const Heading = `h${headingLevel}` as "h3";
  const toggle = () => {
    const next = !isOpen;
    if (open === undefined) setInner(next);
    onToggle?.(next);
  };
  return (
    <div className={cx("acc", isOpen && "acc--open", className)}>
      <Heading className="acc__heading">
        <button
          type="button"
          id={`${baseId}-head`}
          className="acc__head"
          aria-expanded={isOpen}
          aria-controls={`${baseId}-body`}
          onClick={toggle}
        >
          <span className={cx("acc__title", titleClass)}>{title}</span>
          <Icon name="plus" size={16} className="acc__icon" />
        </button>
      </Heading>
      {/* I-CMP-11 · M-22 */}
      <div
        id={`${baseId}-body`}
        className="acc__body"
        role="region"
        aria-labelledby={`${baseId}-head`}
        aria-hidden={!isOpen}
        {...({ inert: !isOpen ? true : undefined } as any)}
      >
        <div className="acc__clip">
          <div className="acc__inner">
            {body ? <div className={cx("acc__text", TEXT.body)} dangerouslySetInnerHTML={{ __html: body }} /> : null}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
