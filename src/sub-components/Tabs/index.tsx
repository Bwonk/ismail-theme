import { useRef } from "preact/hooks";
import { cx } from "../../utils/cx";
import { TEXT } from "../../utils/tokens";

export interface TabItem {
  value: string;
  label: string;
  /** Link tabs (e.g. blog categories) render <a> with aria-current instead of role="tab". */
  href?: string;
  disabled?: boolean;
  /** id of the panel this tab controls (button tabs). */
  panelId?: string;
}

export interface TabsProps {
  items: TabItem[];
  value?: string | null;
  onChange?: (value: string, item: TabItem) => void;
  orientation?: "horizontal" | "vertical";
  ariaLabel?: string;
  idPrefix?: string;
  className?: string;
}

/**
 * I/Sub/Tabs — horizontal (underline row, gap 28) and dikey (stacked, gap 4).
 * I-CMP-09 · M-28: label muted → text on hover/active, active has a 2px text underline.
 */
export default function Tabs({ items, value, onChange, orientation = "horizontal", ariaLabel, idPrefix, className }: TabsProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const isLinks = items.some((i) => i.href);
  const vertical = orientation === "vertical";

  const onKeyDown = (e: KeyboardEvent) => {
    if (isLinks) return;
    const prev = vertical ? "ArrowUp" : "ArrowLeft";
    const next = vertical ? "ArrowDown" : "ArrowRight";
    if (![prev, next, "Home", "End"].includes(e.key)) return;
    const enabled = items.filter((i) => !i.disabled);
    if (!enabled.length) return;
    e.preventDefault();
    const cur = enabled.findIndex((i) => i.value === value);
    let idx = cur;
    if (e.key === "Home") idx = 0;
    else if (e.key === "End") idx = enabled.length - 1;
    else if (e.key === prev) idx = cur <= 0 ? enabled.length - 1 : cur - 1;
    else idx = cur >= enabled.length - 1 ? 0 : cur + 1;
    const item = enabled[idx];
    onChange?.(item.value, item);
    const el = listRef.current?.querySelector<HTMLElement>(`[data-tab="${CSS.escape(item.value)}"]`);
    el?.focus();
  };

  return (
    <div
      ref={listRef}
      className={cx("tabs", vertical && "tabs--vertical", className)}
      role={isLinks ? undefined : "tablist"}
      aria-label={ariaLabel}
      aria-orientation={isLinks ? undefined : orientation}
      onKeyDown={onKeyDown as any}
    >
      {items.map((item) => {
        const active = item.value === value;
        const cls = cx("tabs__item", active && "tabs__item--active", item.disabled && "tabs__item--disabled");
        const label = <span className={cx("tabs__label", TEXT.ui)}>{item.label}</span>;
        if (item.href) {
          return (
            <a
              key={item.value}
              className={cls}
              href={item.href}
              data-tab={item.value}
              aria-current={active ? "page" : undefined}
              onClick={onChange ? () => onChange(item.value, item) : undefined}
            >
              {label}
            </a>
          );
        }
        return (
          <button
            key={item.value}
            type="button"
            id={idPrefix ? `${idPrefix}-${item.value}` : undefined}
            className={cls}
            role="tab"
            data-tab={item.value}
            aria-selected={active}
            aria-controls={item.panelId}
            tabIndex={active || (value == null && item === items[0]) ? 0 : -1}
            disabled={item.disabled}
            onClick={() => onChange?.(item.value, item)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
