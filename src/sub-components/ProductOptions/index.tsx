import type { ComponentChildren } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import {
  IkasProduct,
  IkasProductOption,
  IkasProductOptionSelectValue,
  clearValues,
  getDisplayedChildOptions,
  getDisplayedOptions,
  getProductOptionFormattedPrice,
  getProductOptionSet,
  getTextValue,
  getThumbnailSrc,
  hasError,
  hasValidProductOptionSetValues,
  isCheckboxOption,
  isChecked,
  isChoiceOptionBoxType,
  isChoiceOptionSelectType,
  isChoiceOptionSwatchType,
  isColorPickerOption,
  isDatePickerOption,
  isFileOption,
  isImageOption,
  isProductOptionSelectValueSelected,
  isTextAreaOption,
  isTextOption,
  productOptionFileUpload,
  selectValue,
  setCheckboxValue,
  setTextValue,
  setValues,
} from "@ikas/bp-storefront";
import { observer } from "@ikas/component-utils";
import { cx } from "../../utils/cx";
import { fill } from "../../utils/productBuy";
import { TEXT, upperTr } from "../../utils/tokens";
import Checkbox from "../Checkbox";
import FormField from "../FormField";
import Icon from "../Icon";
import Spinner from "../Spinner";
import VariantChip from "../VariantChip";
import VariantSwatch from "../VariantSwatch";

export interface ProductOptionsTexts {
  optionsTitle?: string;
  /** Shown under the list after a failed add-to-cart ("Devam etmek için seçenekleri tamamla."). */
  optionSetErrorText?: string;
  optionRequiredText?: string;
  optionOptionalText?: string;
  optionSelectPlaceholder?: string;
  /** "{max}" / "{count}" placeholders. */
  optionLimitText?: string;
  /** "{min}" placeholder. */
  optionMinText?: string;
  fileUploadText?: string;
  fileUploadingText?: string;
  fileUploadErrorText?: string;
  fileRemoveAriaLabel?: string;
}

interface Props {
  product: IkasProduct;
  /** Set after a failed add-to-cart: field errors + summary message become visible. */
  showError?: boolean;
  texts: ProductOptionsTexts;
  className?: string;
}

const pad = (n: number) => String(n).padStart(2, "0");
const toIsoDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
function relativeDate(days: number | null | undefined, fixed: Date | null | undefined) {
  if (days != null) {
    const d = new Date();
    d.setDate(d.getDate() + days);
    return toIsoDate(d);
  }
  return fixed ? toIsoDate(new Date(fixed)) : undefined;
}

function valuePrice(option: IkasProductOption, val: IkasProductOptionSelectValue) {
  if (val.price == null || val.price === 0) return "";
  return getProductOptionFormattedPrice({ ...option, price: val.price, priceType: val.priceType, otherPrices: val.otherPrices });
}

function fileName(url: string) {
  try {
    return decodeURIComponent(url.split("?")[0].split("/").pop() || url);
  } catch {
    return url;
  }
}

const FileField = observer(function FileField({
  option,
  texts,
  invalid,
}: {
  option: IkasProductOption;
  texts: ProductOptionsTexts;
  invalid: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const max = option.fileSettings?.maxQuantity ?? undefined;
  const exts = option.fileSettings?.allowedExtensions?.filter(Boolean) ?? [];
  const accept = exts.length ? exts.map((e) => (e.startsWith(".") ? e : `.${e}`)).join(",") : isImageOption(option) ? "image/*" : undefined;
  const full = max != null && option.values.length >= max;

  const upload = async (list: FileList | null) => {
    if (!list || !list.length || uploading) return;
    const room = max != null ? Math.max(0, max - option.values.length) : list.length;
    const files = Array.from(list).slice(0, room);
    if (!files.length) return;
    setFailed(false);
    setUploading(true);
    try {
      const urls = await productOptionFileUpload(option, files);
      if (urls.length) setValues(option, [...option.values, ...urls]);
      else setFailed(true);
    } catch {
      setFailed(true);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="popt__file">
      {!full && (
        <label
          className={cx("popt__upload", drag && "popt__upload--drag", invalid && "popt__upload--error")}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDrag(false);
            upload(e.dataTransfer?.files ?? null);
          }}
        >
          <input
            ref={inputRef}
            className="sr-only"
            type="file"
            accept={accept}
            multiple={max == null || max > 1}
            disabled={uploading}
            onChange={(e) => upload((e.currentTarget as HTMLInputElement).files)}
          />
          {uploading ? <Spinner size={18} /> : <Icon name="upload" size={18} />}
          <span className={TEXT.uiSm}>{uploading ? texts.fileUploadingText : texts.fileUploadText}</span>
        </label>
      )}
      {option.values.length > 0 && (
        <ul className="popt__files">
          {option.values.map((url) => (
            <li key={url} className="popt__file-row">
              <Icon name="check" size={14} />
              <span className={cx("popt__file-name", TEXT.uiSm)}>{fileName(url)}</span>
              <button
                type="button"
                className="popt__file-remove"
                aria-label={texts.fileRemoveAriaLabel}
                onClick={() => setValues(option, option.values.filter((v) => v !== url))}
              >
                <Icon name="x" size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
      {failed && texts.fileUploadErrorText && (
        <p className={cx("popt__msg", TEXT.uiSm)} role="alert">
          {texts.fileUploadErrorText}
        </p>
      )}
    </div>
  );
});

const OptionField = observer(function OptionField({
  option,
  showError,
  texts,
}: {
  option: IkasProductOption;
  showError: boolean;
  texts: ProductOptionsTexts;
}) {
  const invalid = showError && hasError(option);
  const price = option.price ? getProductOptionFormattedPrice(option) : "";
  const optional = option.isOptional && texts.optionOptionalText ? ` ${texts.optionOptionalText}` : "";
  const choices = [...(option.selectSettings?.values ?? [])].sort((a, b) => a.order - b.order);
  const selectedChoices = choices.filter((v) => isProductOptionSelectValueSelected(option, v));
  const children = getDisplayedChildOptions(option);
  const fieldId = `popt-${option.id}`;

  let suffix = price ? ` · +${price}` : "";
  if (isChoiceOptionSwatchType(option) && selectedChoices.length) suffix += ` · ${upperTr(selectedChoices.map((v) => v.value).join(", "))}`;
  const label = `${option.name}${suffix}${optional}`;

  const toggle = (val: IkasProductOptionSelectValue) => selectValue(option, val);
  let control: ComponentChildren = null;
  let meta: string | null = null;

  if (isTextOption(option) || isTextAreaOption(option)) {
    const value = getTextValue(option) ?? "";
    const max = option.textSettings?.max ?? undefined;
    control = (
      <FormField
        id={fieldId}
        type={isTextAreaOption(option) ? "textarea" : "text"}
        ariaLabel={option.name}
        value={value}
        maxLength={max}
        invalid={invalid}
        onInput={(v) => setTextValue(option, v)}
      />
    );
    if (max) meta = `${value.length} / ${max}`;
  } else if (isCheckboxOption(option)) {
    control = (
      <div className="popt__check">
        <Checkbox
          checked={isChecked(option)}
          invalid={invalid}
          label={`${option.name}${optional}`}
          onChange={(c) => setCheckboxValue(option, c)}
        />
        {price && <span className={cx("popt__price", TEXT.price, "tabular")}>+{price}</span>}
      </div>
    );
  } else if (isChoiceOptionSelectType(option)) {
    control = (
      <FormField
        id={fieldId}
        type="select"
        ariaLabel={option.name}
        value={selectedChoices[0]?.id ?? ""}
        placeholder={texts.optionSelectPlaceholder ?? ""}
        invalid={invalid}
        options={choices.map((v) => {
          const p = valuePrice(option, v);
          return { value: v.id, label: p ? `${v.value} · +${p}` : v.value };
        })}
        onChange={(id) => {
          const next = choices.find((v) => v.id === id);
          if (!next) {
            clearValues(option, true);
            return;
          }
          if (isProductOptionSelectValueSelected(option, next)) return;
          setValues(option, []);
          selectValue(option, next);
        }}
      />
    );
  } else if (isChoiceOptionBoxType(option)) {
    control = (
      <div className="popt__choices" role="group" aria-label={option.name}>
        {choices.map((v) => {
          const p = valuePrice(option, v);
          return (
            <VariantChip
              key={v.id}
              label={p ? `${v.value} · +${p}` : v.value}
              selected={isProductOptionSelectValueSelected(option, v)}
              onSelect={() => toggle(v)}
            />
          );
        })}
      </div>
    );
  } else if (isChoiceOptionSwatchType(option)) {
    const withImages = choices.some((v) => v.thumbnailImage);
    control = withImages ? (
      <div className="popt__images" role="group" aria-label={option.name}>
        {choices.map((v) => {
          const on = isProductOptionSelectValueSelected(option, v);
          return (
            <button
              key={v.id}
              type="button"
              className={cx("popt__image", on && "popt__image--on")}
              aria-pressed={on}
              aria-label={v.value}
              title={v.value}
              onClick={() => toggle(v)}
            >
              {v.thumbnailImage ? (
                <img className="popt__image-img" src={getThumbnailSrc(v.thumbnailImage)} alt="" loading="lazy" decoding="async" />
              ) : (
                <span className={cx("popt__image-text", TEXT.badge)}>{v.value}</span>
              )}
            </button>
          );
        })}
      </div>
    ) : (
      <div className="popt__swatches" role="group" aria-label={option.name}>
        {choices.map((v) => (
          <VariantSwatch
            key={v.id}
            label={v.value}
            color={v.colorCode}
            image={null}
            selected={isProductOptionSelectValueSelected(option, v)}
            soldOut={false}
            onSelect={() => toggle(v)}
          />
        ))}
      </div>
    );
  } else if (isColorPickerOption(option)) {
    const value = option.values[0] ?? "";
    control = (
      <label className={cx("popt__box", invalid && "popt__box--error")}>
        <span className="popt__box-left">
          <span className="popt__color-dot" style={value ? { background: value } : undefined} />
          <span className={cx("popt__box-value", TEXT.priceSm, "tabular")}>{value ? value.toUpperCase() : option.name}</span>
        </span>
        <Icon name="pipette" size={16} className="popt__box-icon" />
        <input
          className="popt__color-input"
          type="color"
          aria-label={option.name}
          value={value || "#000000"}
          onInput={(e) => setValues(option, [(e.currentTarget as HTMLInputElement).value])}
        />
      </label>
    );
  } else if (isDatePickerOption(option)) {
    const ds = option.dateSettings;
    control = (
      <FormField
        id={fieldId}
        type="date"
        ariaLabel={option.name}
        controlTextClass={cx(TEXT.numeral, "tabular")}
        className="popt__date"
        value={option.values[0] ?? ""}
        min={relativeDate(ds?.minRelativeNextDate, ds?.min)}
        max={relativeDate(ds?.maxRelativeNextDate, ds?.max)}
        invalid={invalid}
        onInput={(v) => setValues(option, v ? [v] : [])}
      />
    );
  } else if (isFileOption(option) || isImageOption(option)) {
    control = <FileField option={option} texts={texts} invalid={invalid} />;
  }

  if (option.type === "CHOICE") {
    const max = option.selectSettings?.maxSelect ?? null;
    const min = option.selectSettings?.minSelect ?? null;
    if (max != null && max > 1 && texts.optionLimitText) meta = fill(texts.optionLimitText, { max, count: selectedChoices.length });
    else if (min != null && min > 1 && texts.optionMinText) meta = fill(texts.optionMinText, { min });
  }

  return (
    <div className={cx("popt__item", invalid && "popt__item--error")}>
      {!isCheckboxOption(option) && (
        <label className={cx("popt__label", TEXT.uiSm)} htmlFor={fieldId}>
          {label}
        </label>
      )}
      {control}
      {meta && <span className={cx("popt__meta", TEXT.label, "tabular")}>{meta}</span>}
      {invalid && texts.optionRequiredText && (
        <p className={cx("popt__msg", TEXT.uiSm)} role="alert">
          {texts.optionRequiredText}
        </p>
      )}
      {children.length > 0 && (
        <div className="popt__children">
          {children.map((child) => (
            <OptionField key={child.id} option={child} showError={showError} texts={texts} />
          ))}
        </div>
      )}
    </div>
  );
});

/**
 * I/Section/ProductDetail › pdp-options — product option set (kişiselleştirme), every ikas
 * option type: text / textarea (sayaç), select, box (VariantChip), swatch (VariantSwatch or
 * image tiles), checkbox (+ek ücret), colour picker, date, file/image upload, linked child
 * options and selection limits. Loads the set async; renders nothing without one.
 */
const ProductOptions = observer(function ProductOptions({ product, showError = false, texts, className }: Props) {
  const [loaded, setLoaded] = useState(!!product.productOptionSet);
  useEffect(() => {
    if (!product.productOptionSetId) return;
    let alive = true;
    getProductOptionSet(product)
      .then(() => alive && setLoaded(true))
      .catch(() => alive && setLoaded(true));
    return () => {
      alive = false;
    };
  }, [product.id, product.productOptionSetId]);

  const optionSet = product.productOptionSet;
  if (!loaded || !optionSet) return null;
  const options = getDisplayedOptions(optionSet);
  if (!options.length) return null;
  const incomplete = showError && !hasValidProductOptionSetValues(optionSet);

  return (
    <div className={cx("popt", className)}>
      {texts.optionsTitle && <span className={cx("popt__title", TEXT.label)}>{texts.optionsTitle}</span>}
      {options.map((option) => (
        <OptionField key={option.id} option={option} showError={showError} texts={texts} />
      ))}
      {incomplete && texts.optionSetErrorText && (
        <p className={cx("popt__error", TEXT.uiSm)} role="alert">
          {texts.optionSetErrorText}
        </p>
      )}
    </div>
  );
});

export default ProductOptions;
