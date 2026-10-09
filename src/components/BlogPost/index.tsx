import { useEffect, useRef, useState } from "preact/hooks";
import { createMediaSrcset, getDefaultSrc, getIkasBlogFormattedDate, withRoutePrefix } from "@ikas/bp-storefront";
import ArrowLink from "../../sub-components/ArrowLink";
import Icon from "../../sub-components/Icon";
import { cx } from "../../utils/cx";
import { useReveal } from "../../utils/hooks";
import { TEXT, upperTr } from "../../utils/tokens";
import { Props } from "./types";

const fill = (tpl: string, key: string, value: string | number) => tpl.split(`{${key}}`).join(String(value));

/** Rich text headings get the theme H4 style (post-subheading); tokens cannot be applied from CSS. */
function withHeadingStyles(html: string) {
  return html.replace(/<h([1-6])(\s[^>]*)?>/gi, (_m, level: string, attrs = "") => {
    const cls = `${TEXT.h4} bpost__subheading`;
    if (/\sclass\s*=\s*"/i.test(attrs)) return `<h${level}${attrs.replace(/\sclass\s*=\s*"/i, ` class="${cls} `)}>`;
    return `<h${level} class="${cls}"${attrs}>`;
  });
}

function readingMinutes(html: string) {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/**
 * I/Section/BlogPost — centred reading column (760 · 640 tablet · full mobile): ArrowLink back link
 * (I-BLP-02 · M-10), mono meta (category · date · author), H2 title (I-BLP-01 · M-01 on load),
 * full-width cover (16:9 tablet, 4:3 mobile), rich-text body, share row (copy link · X · Facebook).
 */
export function BlogPost({
  blog,
  backLinkText = "Tüm yazılar",
  readingTimeText = "",
  shareText = "Paylaş",
  copyLinkAriaLabel = "Bağlantıyı kopyala",
  copiedText = "Bağlantı kopyalandı",
  shareXAriaLabel = "X’te paylaş",
  shareFacebookAriaLabel = "Facebook’ta paylaş",
  backLink,
  backgroundColor,
}: Props) {
  const headRef = useRef<HTMLElement>(null);
  const reveal = useReveal(headRef);
  const [pageUrl, setPageUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2400);
    return () => clearTimeout(t);
  }, [copied]);

  if (!blog) return null;

  const date = getIkasBlogFormattedDate(blog);
  const author = [blog.writer?.firstName, blog.writer?.lastName].filter(Boolean).join(" ");
  const html = blog.blogContent?.content ?? "";
  const meta = [
    blog.category?.name,
    date,
    author,
    readingTimeText && html ? fill(readingTimeText, "min", readingMinutes(html)) : "",
  ].filter(Boolean) as string[];
  const image = blog.image ?? null;
  const backHref = backLink?.href || withRoutePrefix("/blog");

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl || window.location.href);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const encodedUrl = encodeURIComponent(pageUrl);
  const shareX = pageUrl ? `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(blog.title)}` : undefined;
  const shareFacebook = pageUrl ? `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` : undefined;

  return (
    <article className="bpost" style={backgroundColor ? { backgroundColor } : undefined}>
      {/* I-BLP-01 · M-01: meta + title rise on load (y 40, 0.5s ease-standard, delay 0.2) */}
      <header ref={headRef} className={cx("bpost__head", reveal)}>
        {backLinkText && <ArrowLink className="bpost__back" label={backLinkText} href={backHref} />}
        {meta.length > 0 && (
          <div className={cx("bpost__meta", TEXT.label, "tabular")}>
            {meta.map((m, i) => (
              <span key={i} className="bpost__meta-item">
                {upperTr(m)}
              </span>
            ))}
          </div>
        )}
        <h1 className={cx("bpost__title", TEXT.h2)}>{blog.title}</h1>
      </header>

      {image && (
        <div className="bpost__cover">
          <img
            className="bpost__cover-img"
            src={getDefaultSrc(image)}
            srcSet={createMediaSrcset(image)}
            sizes="100vw"
            alt={blog.title}
            loading="eager"
            decoding="sync"
          />
        </div>
      )}

      {html && <div className={cx("bpost__body", TEXT.body)} dangerouslySetInnerHTML={{ __html: withHeadingStyles(html) }} />}

      {shareText && (
        <div className="bpost__share">
          <span className={cx("bpost__share-label", TEXT.ui)}>{shareText}</span>
          <button type="button" className="bpost__share-btn" aria-label={copyLinkAriaLabel} onClick={onCopy}>
            <Icon name={copied ? "check" : "link"} size={18} />
          </button>
          <a className="bpost__share-btn" href={shareX} target="_blank" rel="noopener noreferrer" aria-label={shareXAriaLabel}>
            <Icon name="twitter" size={18} />
          </a>
          <a className="bpost__share-btn" href={shareFacebook} target="_blank" rel="noopener noreferrer" aria-label={shareFacebookAriaLabel}>
            <Icon name="facebook-outline" size={18} />
          </a>
          <span className={cx("bpost__copied", copied && "bpost__copied--on", TEXT.uiSm)} role="status" aria-live="polite">
            {copied ? copiedText : ""}
          </span>
        </div>
      )}
    </article>
  );
}

export default BlogPost;
