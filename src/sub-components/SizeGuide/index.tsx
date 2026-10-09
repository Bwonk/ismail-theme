import { useRef } from "preact/hooks";
import {
  IkasProductAttributeDetail,
  getAttributeDetailValues,
  getIkasProductAttributeTableValue,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { cx } from "../../utils/cx";
import { useEscape, useScrollLock } from "../../utils/hooks";
import { useFocusTrap, usePresence } from "../../utils/overlay";
import { TEXT, upperTr } from "../../utils/tokens";
import IconButton from "../IconButton";

/** Header labels + body rows; the first cell of every row is the size. */
export interface SizeTable {
  head: string[];
  rows: string[][];
}

const norm = (s?: string | null) => upperTr(s).replace(/\s+/g, " ").trim();

/**
 * TABLE-type product custom field → SizeTable.
 * Cells are `{ colId, rowId, value }`; the column / row names live on
 * `value.productAttribute.tableTemplate` (`{ columns: {id,name}[], rows: {id,name}[] }`).
 * Row names are the sizes, so they become the first column under `rowHeaderLabel`.
 */
export function getAttributeSizeTable(detail: IkasProductAttributeDetail | null | undefined, rowHeaderLabel: string): SizeTable | null {
  if (!detail?.attributePropValue?.attributeId) return null;
  for (const value of getAttributeDetailValues(detail)) {
    const cells = (getIkasProductAttributeTableValue(value) ?? []).filter((c) => c && c.colId && c.rowId);
    if (!cells.length) continue;
    const template = value.productAttribute?.tableTemplate;
    const cols = (template?.columns ?? []).map((c) => ({ id: c.id, name: c.name ?? "" }));
    const rows = (template?.rows ?? []).map((r) => ({ id: r.id, name: r.name ?? "" }));
    // Cells whose column/row is missing from the template (or no template at all) keep their order.
    cells.forEach((c) => {
      if (!cols.some((x) => x.id === c.colId)) cols.push({ id: c.colId, name: "" });
      if (!rows.some((x) => x.id === c.rowId)) rows.push({ id: c.rowId, name: "" });
    });
    const withRowHeader = rows.some((r) => r.name.trim());
    const cellValue = (rowId: string, colId: string) =>
      (cells.find((c) => c.rowId === rowId && c.colId === colId)?.value ?? "").trim();
    const body = rows
      .map((r) => {
        const values = cols.map((c) => cellValue(r.id, c.id));
        return { values: withRowHeader ? [r.name.trim(), ...values] : values, filled: values.some(Boolean) };
      })
      .filter((r) => r.filled)
      .map((r) => r.values);
    if (!body.length) continue;
    return { head: withRowHeader ? [rowHeaderLabel, ...cols.map((c) => c.name)] : cols.map((c) => c.name), rows: body };
  }
  return null;
}

const ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", hellip: "…", times: "×",
  ccedil: "ç", Ccedil: "Ç", ouml: "ö", Ouml: "Ö", uuml: "ü", Uuml: "Ü", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”",
};

const htmlText = (html: string) =>
  html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
      if (e[0] === "#") {
        const code = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
        return Number.isFinite(code) ? String.fromCodePoint(code) : m;
      }
      return ENTITIES[e] ?? m;
    })
    .replace(/\s+/g, " ")
    .trim();

const hasContent = (html: string) => !!htmlText(html) || /<(img|svg|video|iframe)\b/i.test(html);

/**
 * Splits rich text around its first <table> so the table renders with the same markup as the
 * custom-field table (row highlight included). Text before/after it stays rich text.
 */
export function parseRichTextTable(html: string): { before: string; table: SizeTable; after: string } | null {
  const match = /<table\b[\s\S]*?<\/table>/i.exec(html);
  if (!match) return null;
  const parsed: { header: boolean; cells: string[] }[] = [];
  match[0].replace(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi, (_m, inner: string) => {
    const cells: string[] = [];
    inner.replace(/<t([hd])\b[^>]*>([\s\S]*?)<\/t\1>/gi, (_c, _t, content: string) => {
      cells.push(htmlText(content));
      return "";
    });
    if (cells.length) parsed.push({ header: /<th\b/i.test(inner), cells });
    return "";
  });
  if (!parsed.length) return null;
  const head = parsed[0].header ? parsed.shift()!.cells : [];
  if (!parsed.length) return null;
  return {
    before: html.slice(0, match.index),
    table: { head, rows: parsed.map((r) => r.cells) },
    after: html.slice(match.index + match[0].length),
  };
}

export interface SizeGuideTexts {
  title: string;
  note?: string;
  closeAriaLabel: string;
  howToMeasureTitle?: string;
  howToMeasureText?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  texts: SizeGuideTexts;
  /** Custom-field table; wins over `fallbackHtml`. */
  table?: SizeTable | null;
  /** Shared rich text shown when the product has no table value. */
  fallbackHtml?: string;
  /** Currently selected size value — its row (first cell) is highlighted. */
  selectedSize?: string | null;
}

/**
 * I/Overlay/SizeGuide — bottom sheet over a scrim on every breakpoint (M-20: slides up, scrim
 * fades in). Mobile: full width with grab handle, ~80vh with internal scroll. ≥768: 720 centred
 * panel, no handle. Opened by ProductDetail's "Beden rehberi" link (VariantPicker › onSizeGuide).
 */
const SizeGuide = observer(function SizeGuide({ open, onClose, texts, table, fallbackHtml, selectedSize }: Props) {
  const { mounted, shown } = usePresence(open, 500);
  const panelRef = useRef<HTMLDivElement>(null);
  useScrollLock(open);
  useEscape(open, onClose);
  useFocusTrap(panelRef, open && mounted);
  if (!mounted) return null;

  const fallback = !table && fallbackHtml ? parseRichTextTable(fallbackHtml) : null;
  const data = table ?? fallback?.table ?? null;
  const selected = norm(selectedSize);

  const rich = (html: string | undefined, key: string) =>
    html && hasContent(html) ? <div key={key} className={cx("sg__rich", TEXT.uiSm)} dangerouslySetInnerHTML={{ __html: html }} /> : null;

  return (
    <div className={cx("sg", shown && "is-open")}>
      <div className="sg__scrim" onClick={onClose} aria-hidden="true" />
      {/* I-SG-01 · M-20 */}
      <div
        ref={panelRef}
        className="sg__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sg-title"
        aria-describedby={texts.note ? "sg-note" : undefined}
      >
        <span className="sg__grabber" aria-hidden="true" />
        <div className="sg__head">
          <div className="sg__head-text">
            <h2 id="sg-title" className={cx("sg__title", TEXT.h4)}>
              {texts.title}
            </h2>
            {texts.note && (
              <p id="sg-note" className={cx("sg__note", TEXT.uiSm)}>
                {texts.note}
              </p>
            )}
          </div>
          <IconButton icon="x" iconSize={20} ariaLabel={texts.closeAriaLabel} onClick={onClose} className="sg__close" />
        </div>

        <div className="sg__body">
          {fallback && rich(fallback.before, "before")}
          {data ? (
            <table className="sg__table">
              {data.head.some(Boolean) && (
                <thead>
                  <tr>
                    {data.head.map((h, i) => (
                      <th key={i} scope="col" className={cx("sg__th", TEXT.label)}>
                        {upperTr(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {data.rows.map((row, ri) => {
                  const on = !!selected && norm(row[0]) === selected;
                  return (
                    <tr key={ri} className={cx("sg__row", on && "sg__row--on")} aria-current={on ? "true" : undefined}>
                      {row.map((cell, ci) =>
                        ci === 0 ? (
                          <th key={ci} scope="row" className={cx("sg__td", "sg__td--size", TEXT.ui)}>
                            {cell}
                          </th>
                        ) : (
                          <td key={ci} className={cx("sg__td", TEXT.price, "tabular")}>
                            {cell}
                          </td>
                        ),
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            !fallback && rich(fallbackHtml, "fallback")
          )}
          {fallback && rich(fallback.after, "after")}

          {(texts.howToMeasureTitle || (texts.howToMeasureText && hasContent(texts.howToMeasureText))) && (
            <div className="sg__howto">
              {texts.howToMeasureTitle && <h3 className={cx("sg__howto-title", TEXT.ui)}>{texts.howToMeasureTitle}</h3>}
              {texts.howToMeasureText && hasContent(texts.howToMeasureText) && (
                <div className={cx("sg__howto-text", TEXT.uiSm)} dangerouslySetInnerHTML={{ __html: texts.howToMeasureText }} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default SizeGuide;
