import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import Icon from "../../sub-components/Icon";
import { cx } from "../../utils/cx";
import { prefersReducedMotion, useReveal } from "../../utils/hooks";
import { TEXT } from "../../utils/tokens";
import { Props } from "./types";

interface Heading {
  id: string;
  label: string;
}

const decode = (s: string) =>
  s
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

const slug = (s: string) =>
  s
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "baslik";

/**
 * Adds ids + text-style classes to the RICH_TEXT headings and returns the TOC entries.
 * TOC source = h2s (falls back to h3s when the content has no h2). Runs identically on SSR and client.
 */
function processContent(html: string): { html: string; headings: Heading[] } {
  const level = /<h2[\s>]/i.test(html) ? "2" : "3";
  const used = new Map<string, number>();
  const headings: Heading[] = [];
  const out = html.replace(/<h([23])(\s[^>]*)?>([\s\S]*?)<\/h\1>/gi, (_m, lvl: string, attrs: string = "", inner: string) => {
    const rest = attrs.replace(/\s(id|class)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
    const cls = `rtxt__h ${TEXT.h4}`;
    if (lvl !== level) return `<h${lvl} class="${cls}"${rest}>${inner}</h${lvl}>`;
    const label = decode(inner);
    const base = `bolum-${slug(label)}`;
    const n = used.get(base) ?? 0;
    used.set(base, n + 1);
    const id = n ? `${base}-${n + 1}` : base;
    headings.push({ id, label });
    return `<h${lvl} id="${id}" class="${cls}"${rest}>${inner}</h${lvl}>`;
  });
  return { html: out, headings };
}

/** I/Section/RichText — policy/text page: 280 TOC (dropdown ≤991) + 760 text column. I-TXT-01 on the title. */
export function RichText({
  title = "Kişisel verilerin korunması",
  updatedText = "SON GÜNCELLEME · 01.09.2026",
  content,
  tocTitle = "İÇİNDEKİLER",
  showToc = true,
  backgroundColor,
}: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const reveal = useReveal(titleRef);
  const { html, headings } = useMemo(() => processContent(content ?? ""), [content]);
  const [active, setActive] = useState<string | null>(null);
  const [tocOpen, setTocOpen] = useState(false);
  const hasToc = showToc !== false && headings.length > 0;
  const current = active ?? headings[0]?.id;

  // Scrollspy: the last heading that passed the top third of the viewport is active.
  useEffect(() => {
    const body = bodyRef.current;
    if (!hasToc || !body || typeof IntersectionObserver === "undefined") return;
    const els = headings.map((h) => body.querySelector<HTMLElement>(`#${CSS.escape(h.id)}`)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      () => {
        const line = window.innerHeight * 0.33;
        let id = els[0]?.id ?? null;
        for (const el of els) if (el.getBoundingClientRect().top <= line) id = el.id;
        setActive(id);
      },
      { rootMargin: "0px 0px -60% 0px", threshold: [0, 1] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [html, hasToc]);

  const go = (e: MouseEvent, id: string) => {
    const el = typeof document !== "undefined" ? document.getElementById(id) : null;
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    history.replaceState?.(null, "", `#${id}`);
    setActive(id);
    setTocOpen(false);
  };

  return (
    <section className="rtxt" style={backgroundColor ? { backgroundColor } : undefined}>
      <div className={cx("rtxt__wrap", !hasToc && "rtxt__wrap--solo")}>
        {hasToc && (
          <nav className={cx("rtxt__toc", tocOpen && "is-open")} aria-label={tocTitle || undefined}>
            <p className={cx("rtxt__toc-label", TEXT.label)}>{tocTitle}</p>
            <button
              type="button"
              className="rtxt__toc-toggle"
              aria-expanded={tocOpen}
              aria-controls="rtxt-toc-list"
              onClick={() => setTocOpen((o) => !o)}
            >
              <span className={TEXT.label}>{tocTitle}</span>
              <Icon name="chevron-down" size={16} className="rtxt__toc-icon" />
            </button>
            <ol id="rtxt-toc-list" className="rtxt__toc-list">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    className={cx("rtxt__toc-item", TEXT.uiSm, h.id === current && "is-active")}
                    aria-current={h.id === current ? "location" : undefined}
                    onClick={(e) => go(e as any, h.id)}
                  >
                    {h.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <article className="rtxt__content">
          {/* I-TXT-01 · M-01: title fades up (delay 0.2s) */}
          {title && (
            <h1 ref={titleRef} className={cx("rtxt__title", TEXT.h2, reveal)}>
              {title}
            </h1>
          )}
          {updatedText && <p className={cx("rtxt__meta", TEXT.label)}>{updatedText}</p>}
          {html && <div ref={bodyRef} className={cx("rtxt__body", TEXT.body)} dangerouslySetInnerHTML={{ __html: html }} />}
        </article>
      </div>
    </section>
  );
}

export default RichText;
