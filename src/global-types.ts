// Auto-generated global type definitions for ikas code components.
// This file is regenerated automatically — do not edit manually.
import { getThemeSettingValue as _getThemeSettingValueRaw } from "@ikas/bp-storefront";

/** Enum type: Qo0PqGZsHA */
export type AuthFormVariant = "login" | "register" | "forgot" | "recover";
/** Enum type: ZOVGXjccF1 */
export type HeroHeightMode = "theme" | "full" | "short";
/** Enum type: qTXhiLvC99 */
export type ProductListPageMode = "category" | "search" | "favorites";
/** Enum type: KprQdDh7kj */
export type SpotlightImagePosition = "left" | "right";

/** Stable keys of theme global variables defined in the editor's "Styles" panel. */
export type ThemeSettingName =
  /** Çizgi / Varsayılan (BORDER) */
  | "_cLMlr8SnkP";

/** Narrowed value type per global key (primitives only; complex kinds are `any`). */
type ThemeSettingValueMap = {
  "_cLMlr8SnkP": any;
};

/**
 * Type-safe theme global accessor — only accepts keys declared in the editor's Styles panel.
 * Import this from `./global-types`, not `getThemeSettingValue` from `@ikas/bp-storefront`
 * (that one is untyped: it accepts any string and returns `any`).
 */
export function themeValue<K extends ThemeSettingName>(name: K): ThemeSettingValueMap[K] {
  return _getThemeSettingValueRaw(name) as ThemeSettingValueMap[K];
}
