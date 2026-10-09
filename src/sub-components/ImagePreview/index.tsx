import { useEffect, useRef, useState } from "preact/hooks";
import { IkasImage, createMediaSrcset, getDefaultSrc, getThumbnailSrc } from "@ikas/bp-storefront";
import { cx } from "../../utils/cx";
import { useEscape, useScrollLock } from "../../utils/hooks";
import { TEXT } from "../../utils/tokens";
import Icon from "../Icon";

export interface ImagePreviewTexts {
  closeAriaLabel: string;
  prevAriaLabel: string;
  nextAriaLabel: string;
  /** Desktop click-to-zoom button label. */
  zoomAriaLabel?: string;
}

interface Props extends ImagePreviewTexts {
  open: boolean;
  images: IkasImage[];
  index: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
  /** Base alt text (product name); "{alt} 2" per slide. */
  altText?: string;
}

/**
 * I/Overlay/ImagePreview — full-screen viewer: counter + close on top, 640×720 image
 * (I-PREV-01 · M-02 fade-in), prev/next arrows (desktop only), thumbnails. Swipe on touch
 * (scroll-snap track), click-to-zoom on desktop, ←/→/Esc keys.
 */
export default function ImagePreview({
  open,
  images,
  index,
  onClose,
  onIndexChange,
  altText = "",
  closeAriaLabel,
  prevAriaLabel,
  nextAriaLabel,
  zoomAriaLabel,
}: Props) {
  const [current, setCurrent] = useState(index);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const count = images.length;

  useScrollLock(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => returnFocus.current?.focus?.();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setCurrent(index);
    setZoom(null);
    requestAnimationFrame(() => {
      const track = trackRef.current;
      if (track) track.scrollLeft = index * track.clientWidth;
    });
  }, [open, index]);

  useEffect(() => {
    onIndexChange?.(current);
    const thumb = thumbsRef.current?.children[current] as HTMLElement | undefined;
    thumb?.scrollIntoView?.({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [current]);

  if (!open || !count) return null;

  const go = (i: number) => {
    const next = (i + count) % count;
    setZoom(null);
    const track = trackRef.current;
    if (track) track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
    setCurrent(next);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track || !track.clientWidth) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== current && i >= 0 && i < count) {
      setCurrent(i);
      setZoom(null);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(current + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(current - 1);
    } else if (e.key === "Tab") {
      // keep focus inside the dialog
      const nodes = (e.currentTarget as HTMLElement).querySelectorAll<HTMLElement>("button:not([disabled])");
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const toggleZoom = (e: MouseEvent) => {
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setZoom((z) => (z ? null : { x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 }));
  };

  const moveZoom = (e: MouseEvent) => {
    if (!zoom) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setZoom({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 });
  };

  return (
    <div className="iprev" role="dialog" aria-modal="true" aria-label={altText || undefined} onKeyDown={onKeyDown as any}>
      <div className="iprev__scrim" aria-hidden="true" onClick={onClose} />
      <div className="iprev__panel">
        <div className="iprev__top">
          <span className={cx("iprev__count", TEXT.label, "tabular")} aria-live="polite">
            {current + 1} / {count}
          </span>
          <button ref={closeRef} type="button" className="iprev__close" aria-label={closeAriaLabel} onClick={onClose}>
            <Icon name="x" size={22} />
          </button>
        </div>

        <div ref={trackRef} className="iprev__track" onScroll={onScroll}>
          {images.map((img, i) => (
            <div key={img.id || i} className="iprev__slide" aria-hidden={i !== current}>
              {/* I-PREV-01 · M-02 */}
              <div className="iprev__media">
                {img.isVideo ? (
                  <video className="iprev__img" src={getDefaultSrc(img)} controls playsInline preload="metadata">
                    <track kind="captions" />
                  </video>
                ) : (
                  <button
                    type="button"
                    className={cx("iprev__zoom", i === current && zoom && "iprev__zoom--on")}
                    aria-label={zoomAriaLabel}
                    aria-pressed={i === current && !!zoom}
                    tabIndex={i === current ? 0 : -1}
                    onClick={toggleZoom as any}
                    onMouseMove={moveZoom as any}
                  >
                    <img
                      className="iprev__img"
                      src={getDefaultSrc(img)}
                      srcSet={createMediaSrcset(img)}
                      sizes="(max-width: 767px) 100vw, 640px"
                      alt={img.altText || (altText ? `${altText} ${i + 1}` : "")}
                      loading={Math.abs(i - current) <= 1 ? "eager" : "lazy"}
                      decoding="async"
                      style={i === current && zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {count > 1 && (
          <div className="iprev__nav">
            <button type="button" className="iprev__arrow" aria-label={prevAriaLabel} onClick={() => go(current - 1)}>
              <Icon name="arrow-left" size={20} />
            </button>
            <button type="button" className="iprev__arrow" aria-label={nextAriaLabel} onClick={() => go(current + 1)}>
              <Icon name="arrow-right" size={20} />
            </button>
          </div>
        )}

        {count > 1 && (
          <div ref={thumbsRef} className="iprev__thumbs">
            {images.map((img, i) => (
              <button
                key={img.id || i}
                type="button"
                className={cx("iprev__thumb", i === current && "iprev__thumb--on")}
                aria-label={`${i + 1} / ${count}`}
                aria-current={i === current ? "true" : undefined}
                onClick={() => go(i)}
              >
                {img.isVideo ? (
                  <span className="iprev__thumb-video">
                    <Icon name="play" size={16} />
                  </span>
                ) : (
                  <img className="iprev__thumb-img" src={getThumbnailSrc(img)} alt="" loading="lazy" decoding="async" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
