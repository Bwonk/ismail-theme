import { useEffect, useRef, useState } from "preact/hooks";
import { getIkasBlogHref } from "@ikas/bp-storefront";
import BlogCard from "../../sub-components/BlogCard";
import { cx } from "../../utils/cx";
import { useReveal } from "../../utils/hooks";
import { TEXT } from "../../utils/tokens";
import { Props } from "./types";

/**
 * I/Section/BlogRelated — left H2 + 3 BlogCards (2 on tablet, horizontal 300px strip on mobile).
 * The post currently being read is skipped after hydration. I-BREL-01 · M-01: cards enter in sequence.
 */
export function BlogRelated({ title = "Okumaya devam et", readMoreText = "Devamını oku", blogs, backgroundColor }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const reveal = useReveal(trackRef);
  const [currentPath, setCurrentPath] = useState<string | null>(null);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const posts = (blogs?.data ?? [])
    .filter((b) => !b.deleted && (!currentPath || getIkasBlogHref(b) !== currentPath))
    .slice(0, 3);
  if (!posts.length) return null;

  return (
    <section className="brel" style={backgroundColor ? { backgroundColor } : undefined}>
      {title && (
        <div className="brel__head">
          <h2 className={cx("brel__title", TEXT.h2)}>{title}</h2>
        </div>
      )}
      {/* I-BREL-01 · M-01: y 40, 0.5s ease-standard, stagger 0.06 */}
      <div ref={trackRef} className={cx("brel__track", reveal)}>
        {posts.map((blog, i) => (
          <div key={blog.id} className="brel__item" style={{ "--i": i } as any}>
            <BlogCard blog={blog} readMoreText={readMoreText} sizes="(max-width: 767px) 300px, (max-width: 991px) 50vw, 33vw" />
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogRelated;
