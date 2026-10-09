// Live ids from docs/port/globals-runbook.md §7. Literal strings so publish ships the tokens.

/** Theme text styles: apply as className, never inline the values. */
export const TEXT = {
  display: "_f1JrzqIvcE",
  h2: "_FEHST3SdIj",
  h3: "_KZwYgX5VT5",
  h4: "_Ud5e1Sf5zH",
  title: "_I9GGr26BuM",
  ui: "_Nx0cY45JZb",
  uiSm: "_X6laGBbBTC",
  badge: "_jzncaPrv22",
  label: "_TVRrGKS76Y",
  body: "_gVS3y9Wt5R",
  price: "_ojnnKm9mqH",
} as const;

/** Colour scheme classes. Combine with `ism-scheme` to re-resolve the --c-* aliases. */
export const SCHEME = {
  paper: "_FKRyOgJgLv",
  ink: "_OYYkHhFGEt",
  clear: "_7XjEWncbmF",
} as const;

export const forceScheme = (scheme: keyof typeof SCHEME) => `${SCHEME[scheme]} ism-scheme`;

/** Theme keyframe refs (animation-name). */
export const KEYFRAME = {
  fadeUp: "_ovqsdHMO4b",
  fade: "_EMX39fgOGw",
} as const;

/** Theme breakpoint widths (px). CSS uses bp(<id>) instead: laptop rLU3LmiCdo · tablet zTpkWoce2k · mobile KUQjO8W6p9. */
export const BREAKPOINT = { laptop: 1199, tablet: 991, mobile: 767 } as const;

/** Upper-case for Turkish copy (İ/I). Typography tokens carry no text-transform by design. */
export const upperTr = (s?: string | null) => (s ?? "").toLocaleUpperCase("tr-TR");
