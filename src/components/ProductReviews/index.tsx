import { useEffect, useRef, useState } from "preact/hooks";
import {
  IkasCustomerReviewList,
  IkasImage,
  Router,
  customerStore,
  getCustomerReviewListPage,
  getCustomerReviewListPageCount,
  getIkasProductCustomerReviewForm,
  getProductCustomerReviews,
  clearIkasProductCustomerReviewForm,
  hasCustomer,
  hasCustomerReviewListNextPage,
  hasCustomerReviewListPrevPage,
  isCustomerReviewEnabled,
  isCustomerReviewLoginRequired,
  setCustomerReviewFormComment,
  setCustomerReviewFormStar,
  setCustomerReviewFormTitle,
  submitCustomerReviewForm,
} from "@ikas/bp-storefront";
import ArrowLink from "../../sub-components/ArrowLink";
import Button from "../../sub-components/Button";
import FormField from "../../sub-components/FormField";
import Icon from "../../sub-components/Icon";
import ImagePreview from "../../sub-components/ImagePreview";
import RatingStars from "../../sub-components/RatingStars";
import ReviewCard from "../../sub-components/ReviewCard";
import Skeleton from "../../sub-components/Skeleton";
import { cx } from "../../utils/cx";
import { useReveal } from "../../utils/hooks";
import { fill } from "../../utils/productBuy";
import { TEXT } from "../../utils/tokens";
import { Props } from "./types";

function pageNumbers(current: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "gap")[] = [1];
  if (current > 3) out.push("gap");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) out.push(i);
  if (current < total - 2) out.push("gap");
  out.push(total);
  return out;
}

/**
 * I/Section/ProductReviews — 420 summary (score, stars, 5→1 bars, Yorum yaz) beside the
 * ReviewCard list (I-REV-01 · M-01 stagger) with numbered pagination. States: yorumlu, boş,
 * yorum formu (login-required per isCustomerReviewLoginRequired). Review photos open ImagePreview.
 */
export function ProductReviews({
  product,
  title = "Değerlendirmeler",
  reviewsCountText = "değerlendirme",
  writeReviewText = "Yorum yaz",
  verifiedText = "Doğrulanmış alıcı",
  merchantReplyLabel = "MAĞAZA YANITI",
  emptyTitle = "Henüz yorum yok",
  emptyText = "İlk yorumu sen yaz; rotada nasıl işe yaradığını anlat.",
  ratingAriaLabel = "5 üzerinden {n} yıldız",
  barAriaLabel = "{star} yıldız: {count} değerlendirme",
  reviewImageAltText = "Yorum görseli",
  imageButtonAriaLabel = "{n}. görseli büyüt",
  paginationAriaLabel = "Yorum sayfaları",
  prevPageAriaLabel = "Önceki sayfa",
  nextPageAriaLabel = "Sonraki sayfa",
  closeAriaLabel = "Kapat",
  prevImageAriaLabel = "Önceki görsel",
  nextImageAriaLabel = "Sonraki görsel",
  formTitle = "Yorumunu yaz",
  ratingLabel = "PUANIN",
  starAriaLabel = "{n} yıldız",
  reviewTitleLabel = "BAŞLIK",
  reviewTitlePlaceholder = "Kısaca özetle",
  reviewTextLabel = "YORUMUN",
  reviewTextPlaceholder = "Ürünü nerede, nasıl kullandın?",
  submitText = "Gönder",
  submittingText = "Gönderiliyor…",
  successText = "Yorumun onaylandıktan sonra yayınlanır.",
  starRequiredText = "Bir puan seç.",
  formErrorText = "Yorum gönderilemedi, tekrar dene.",
  cancelText = "Vazgeç",
  loginRequiredText = "Yorum yazmak için giriş yapmalısın.",
  loginLinkText = "Giriş yap",
  reviewsPerPage = 3,
  backgroundColor,
}: Props) {
  const [list, setList] = useState<IkasCustomerReviewList | null>(null);
  const [loading, setLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [preview, setPreview] = useState<{ images: IkasImage[]; index: number } | null>(null);
  const [, setTick] = useState(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const reveal = useReveal(bodyRef);
  const limit = Math.max(1, reviewsPerPage || 3);

  const load = () => {
    if (!product) return;
    setLoading(true);
    getProductCustomerReviews(product, limit)
      .then((res) => setList(res))
      .catch(() => setList(null))
      .finally(() => setLoading(false));
  };

  useEffect(load, [product?.id, limit]);

  if (!product) return null;

  const enabled = isCustomerReviewEnabled(product);
  const needsLogin = isCustomerReviewLoginRequired(product) && !hasCustomer(customerStore);
  const reviews = list?.data ?? [];
  const total = product.reviewCount ?? list?.count ?? 0;
  const average = product.averageRating ?? 0;
  const isEmpty = !loading && total === 0 && reviews.length === 0;
  const score = isEmpty ? "0" : average.toFixed(1).replace(".", ",");
  const stars = [5, 4, 3, 2, 1].map((s) => ({ star: s, count: product.stars?.find((x) => x.star === s)?.count ?? 0 }));
  const starsTotal = stars.reduce((a, b) => a + b.count, 0) || 1;
  const pageCount = list ? getCustomerReviewListPageCount(list) : 0;
  const form = getIkasProductCustomerReviewForm(product);

  const goPage = async (page: number) => {
    if (!list || page === list.page || page < 1 || page > pageCount) return;
    setLoading(true);
    try {
      await getCustomerReviewListPage(list, page);
    } finally {
      setLoading(false);
      setTick((t) => t + 1);
      mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const openForm = () => {
    setSent(false);
    setFailed(false);
    setFormOpen(true);
    requestAnimationFrame(() => mainRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  const closeForm = () => {
    clearIkasProductCustomerReviewForm(product);
    setFailed(false);
    setFormOpen(false);
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (form.isSubmitting) return;
    setFailed(false);
    const ok = await submitCustomerReviewForm(form);
    if (ok) {
      clearIkasProductCustomerReviewForm(product);
      setFormOpen(false);
      setSent(true);
      load();
    } else if (!form.star.hasError && !form.title.hasError && !form.comment.hasError) {
      setFailed(true);
    }
    setTick((t) => t + 1);
  };

  const starValue = Number(form.star.value) || 0;

  return (
    <section id="product-reviews" className="rev" style={backgroundColor ? { backgroundColor } : undefined}>
      <div ref={bodyRef} className={cx("rev__body", reveal)}>
        <div className="rev__summary">
          {title && <h2 className={cx("rev__title", TEXT.h2)}>{title}</h2>}
          <div className="rev__score">
            <span className={cx("rev__score-value", isEmpty && "rev__score-value--empty", TEXT.display, "tabular")}>{score}</span>
            <div className="rev__score-meta">
              <RatingStars
                rating={isEmpty ? 0 : average}
                count={isEmpty ? 0 : total}
                showScore={false}
                showCount={false}
                ariaLabel={fill(ratingAriaLabel, { n: score })}
              />
              <span className={cx("rev__count", TEXT.uiSm)}>
                <span className="tabular">{total}</span> {reviewsCountText}
              </span>
            </div>
          </div>
          <div className="rev__bars">
            {stars.map(({ star, count }) => (
              <div key={star} className="rev__bar" role="img" aria-label={fill(barAriaLabel, { star, count })}>
                <span className={cx("rev__bar-star", TEXT.label, "tabular")} aria-hidden="true">
                  {star}
                </span>
                <span className="rev__bar-track" aria-hidden="true">
                  <span className="rev__bar-fill" style={{ width: `${(count / starsTotal) * 100}%` }} />
                </span>
                <span className={cx("rev__bar-count", TEXT.label, "tabular")} aria-hidden="true">
                  {count}
                </span>
              </div>
            ))}
          </div>
          {/* I-REV-02 · M-11 via Button */}
          {enabled && !formOpen && writeReviewText && (
            <div className="rev__write">
              <Button label={writeReviewText} variant="outline" onClick={openForm} />
            </div>
          )}
        </div>

        <div ref={mainRef} className="rev__main">
          {sent && successText && (
            <p className={cx("rev__notice", TEXT.uiSm)} role="status">
              <Icon name="circle-check" size={16} className="rev__notice-icon" />
              {successText}
            </p>
          )}

          {formOpen ? (
            <form className="rev__form" onSubmit={onSubmit as any} noValidate>
              {formTitle && <h3 className={cx("rev__form-title", TEXT.h4)}>{formTitle}</h3>}
              {needsLogin ? (
                <div className="rev__login">
                  <span className="rev__login-text">
                    <Icon name="lock" size={16} />
                    <span className={TEXT.uiSm}>{loginRequiredText}</span>
                  </span>
                  <span className="rev__login-actions">
                    <ArrowLink label={loginLinkText} onClick={() => Router.navigateToPage("LOGIN")} />
                    <button type="button" className={cx("rev__cancel", TEXT.uiSm)} onClick={closeForm}>
                      {cancelText}
                    </button>
                  </span>
                </div>
              ) : (
                <>
                  <div className="rev__form-rating">
                    <span className={cx("rev__form-label", TEXT.label)}>{ratingLabel}</span>
                    <RatingStars
                      interactive
                      size={24}
                      value={starValue}
                      onChange={(v) => setCustomerReviewFormStar(form, String(v))}
                      groupAriaLabel={ratingLabel}
                      starAriaLabel={starAriaLabel}
                      invalid={form.star.hasError}
                      disabled={form.isSubmitting}
                    />
                    {form.star.hasError && (
                      <p className={cx("rev__field-error", TEXT.uiSm)} role="alert">
                        {starRequiredText || form.star.message}
                      </p>
                    )}
                  </div>
                  <FormField
                    className="rev__field"
                    label={reviewTitleLabel}
                    name="title"
                    placeholder={reviewTitlePlaceholder}
                    value={form.title.value}
                    error={form.title.hasError ? form.title.message || " " : null}
                    disabled={form.isSubmitting}
                    onInput={(v) => setCustomerReviewFormTitle(form, v)}
                  />
                  <FormField
                    className="rev__field"
                    type="textarea"
                    rows={5}
                    label={reviewTextLabel}
                    name="comment"
                    placeholder={reviewTextPlaceholder}
                    value={form.comment.value}
                    error={form.comment.hasError ? form.comment.message || " " : null}
                    disabled={form.isSubmitting}
                    onInput={(v) => setCustomerReviewFormComment(form, v)}
                  />
                  {failed && (
                    <p className={cx("rev__field-error", TEXT.uiSm)} role="alert">
                      {form.responseMessage || formErrorText}
                    </p>
                  )}
                  <div className="rev__form-actions">
                    <div className="rev__form-buttons">
                      <Button
                        type="submit"
                        label={form.isSubmitting ? submittingText : submitText}
                        state={form.isSubmitting ? "loading" : "idle"}
                      />
                      <button type="button" className={cx("rev__cancel", TEXT.uiSm)} onClick={closeForm}>
                        {cancelText}
                      </button>
                    </div>
                    {successText && <p className={cx("rev__form-note", TEXT.uiSm)}>{successText}</p>}
                  </div>
                </>
              )}
            </form>
          ) : isEmpty ? (
            <div className="rev__empty">
              <h3 className={cx("rev__empty-title", TEXT.h3)}>{emptyTitle}</h3>
              <p className={cx("rev__empty-text", TEXT.body)}>{emptyText}</p>
            </div>
          ) : (
            <div className="rev__list">
              {loading && !reviews.length ? (
                <div className="rev__skeleton" aria-busy="true">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rev__skeleton-card">
                      <Skeleton width={80} height={14} />
                      <Skeleton width="50%" height={18} />
                      <Skeleton height={12} />
                      <Skeleton width="70%" height={12} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={cx("rev__cards", loading && "rev__cards--loading")}>
                  {reviews.map((review, i) => (
                    /* I-REV-01 · M-01 */
                    <div key={review.id} className="rev__card" style={{ "--i": i } as any}>
                      <ReviewCard
                        review={review}
                        verifiedText={verifiedText}
                        merchantReplyLabel={merchantReplyLabel}
                        imageAltText={reviewImageAltText}
                        ratingAriaLabel={ratingAriaLabel}
                        imageButtonAriaLabel={imageButtonAriaLabel}
                        onImageClick={(index, images) => setPreview({ index, images })}
                      />
                    </div>
                  ))}
                </div>
              )}

              {list && pageCount > 1 && (
                <nav className="rev__pages" aria-label={paginationAriaLabel}>
                  <button
                    type="button"
                    className="rev__page"
                    aria-label={prevPageAriaLabel}
                    disabled={!hasCustomerReviewListPrevPage(list) || loading}
                    onClick={() => goPage(list.page - 1)}
                  >
                    <span className={TEXT.label}>‹</span>
                  </button>
                  {pageNumbers(list.page, pageCount).map((p, i) =>
                    p === "gap" ? (
                      <span key={`g${i}`} className={cx("rev__page-gap", TEXT.label)} aria-hidden="true">
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        className={cx("rev__page", p === list.page && "rev__page--on")}
                        aria-current={p === list.page ? "page" : undefined}
                        disabled={loading}
                        onClick={() => goPage(p)}
                      >
                        <span className={cx(TEXT.label, "tabular")}>{p}</span>
                      </button>
                    ),
                  )}
                  <button
                    type="button"
                    className="rev__page"
                    aria-label={nextPageAriaLabel}
                    disabled={!hasCustomerReviewListNextPage(list) || loading}
                    onClick={() => goPage(list.page + 1)}
                  >
                    <span className={TEXT.label}>›</span>
                  </button>
                </nav>
              )}
            </div>
          )}
        </div>
      </div>

      <ImagePreview
        open={!!preview}
        images={preview?.images ?? []}
        index={preview?.index ?? 0}
        altText={reviewImageAltText}
        onClose={() => setPreview(null)}
        closeAriaLabel={closeAriaLabel}
        prevAriaLabel={prevImageAriaLabel}
        nextAriaLabel={nextImageAriaLabel}
      />
    </section>
  );
}

export default ProductReviews;
