import { useRef } from "preact/hooks";
import { getBlogListNextPage, getIkasBlogCategoryHref, hasBlogListNextPage, withRoutePrefix } from "@ikas/bp-storefront";
import BlogCard from "../../sub-components/BlogCard";
import Button from "../../sub-components/Button";
import SectionHeading from "../../sub-components/SectionHeading";
import Tabs, { TabItem } from "../../sub-components/Tabs";
import { cx } from "../../utils/cx";
import { useReveal } from "../../utils/hooks";
import { TEXT } from "../../utils/tokens";
import { Props } from "./types";

const ALL = "__all__";

/**
 * I/Section/BlogList — left SectionHeading, category Tabs (links, I-BLOG-02 · M-28 via Tabs), BlogCard grid:
 * first post wide (2 cols, 16:9) beside a tall card, then 3 columns (3 laptop · 2 tablet · 1 mobile),
 * outlined "load more" (getBlogListNextPage), empty-category state.
 */
export function BlogList({
  title = "Rota notları",
  subtitle = "Sahadan notlar, rehberler ve ekip hikâyeleri.",
  allTabText = "Tümü",
  tabsAriaLabel = "Blog kategorileri",
  readMoreText = "Devamını oku",
  loadMoreText = "Daha fazla yazı",
  loadingMoreText = "Yükleniyor",
  emptyText = "Bu kategoride henüz yazı yok.",
  blogs,
  categories,
  backgroundColor,
}: Props) {
  const gridRef = useRef<HTMLDivElement>(null);
  const reveal = useReveal(gridRef);

  const posts = (blogs?.data ?? []).filter((b) => !b.deleted);
  const cats = (categories?.data ?? []).filter((c) => !c.deleted);
  const activeId = blogs?.filterCategoryId ?? ALL;
  const loading = !!blogs?.isLoading;
  const canLoadMore = !!blogs && hasBlogListNextPage(blogs);
  const pageSize = Math.max(1, blogs?.limit || 9);
  const featured = posts.length >= 2;

  const tabs: TabItem[] = cats.length
    ? [
        { value: ALL, label: allTabText, href: withRoutePrefix("/blog") },
        ...cats.map((cat) => ({ value: cat.id, label: cat.name, href: getIkasBlogCategoryHref(cat) || undefined })),
      ]
    : [];

  return (
    <section className="blist" style={backgroundColor ? { backgroundColor } : undefined}>
      <SectionHeading className="blist__heading" title={title} subtitle={subtitle} align="left" as="h1" />

      {tabs.length > 0 && (
        <div className="blist__tabs">
          <Tabs items={tabs} value={activeId} ariaLabel={tabsAriaLabel} />
        </div>
      )}

      {posts.length > 0 ? (
        /* I-BLOG-01 · M-01: cards enter in sequence (y 40, 0.5s ease-standard, stagger 0.06) */
        <div ref={gridRef} className={cx("blist__grid", reveal)}>
          {posts.map((blog, i) => (
            <div
              key={blog.id}
              className={cx("blist__item", featured && i === 0 && "blist__item--feature", featured && i === 1 && "blist__item--beside")}
              style={{ "--i": i % pageSize } as any}
            >
              <BlogCard
                blog={blog}
                readMoreText={readMoreText}
                aspectRatio="var(--blist-ar, 442 / 332)"
                sizes={
                  featured && i === 0
                    ? "(max-width: 767px) 100vw, 66vw"
                    : "(max-width: 767px) 100vw, (max-width: 991px) 50vw, 33vw"
                }
                priority={i < 2}
              />
            </div>
          ))}
        </div>
      ) : (
        !loading &&
        emptyText && (
          <div className="blist__empty" role="status">
            <p className={cx("blist__empty-text", TEXT.h4)}>{emptyText}</p>
          </div>
        )
      )}

      {canLoadMore && posts.length > 0 && (
        <div className="blist__more">
          <Button
            variant="outline"
            label={loading ? loadingMoreText : loadMoreText}
            state={loading ? "loading" : "idle"}
            onClick={() => blogs && getBlogListNextPage(blogs)}
          />
        </div>
      )}
    </section>
  );
}

export default BlogList;
