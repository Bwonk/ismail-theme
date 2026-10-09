// Cross-section UI events. Overlays live inside their owning section (Header owns
// CartDrawer, SearchOverlay, MenuOverlay, QuickBuy) and listen on window.

export const UI_EVENT = {
  openCart: "ismail:open-cart",
  openSearch: "ismail:open-search",
  openMenu: "ismail:open-menu",
  openQuickBuy: "ismail:open-quick-buy",
  openLocale: "ismail:open-locale",
  openFilter: "ismail:open-filter",
  openPreview: "ismail:open-preview",
  closeAll: "ismail:close-overlays",
} as const;

export type UiEventName = (typeof UI_EVENT)[keyof typeof UI_EVENT];

export function emitUi(name: UiEventName, detail?: unknown) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

export function onUi<T = unknown>(name: UiEventName, handler: (detail: T) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<T>).detail);
  window.addEventListener(name, listener);
  return () => window.removeEventListener(name, listener);
}

// Parent ↔ child events inside one section. COMPONENT_LIST children are opaque to the parent
// (and bundled separately), so a child dispatches a bubbling DOM event from its own element and
// the section (plus sibling children) listen on the shared container `[data-scope="<name>"]`.
export const SCOPED_EVENT = {
  /** ContactTopic → ContactForm (+ sibling chips). detail: { label: string | null, el: Element | null } */
  contactTopic: "ismail:contact-topic",
  /** StoreItem → StoreLocator (+ sibling rows). detail: StoreSelectDetail */
  storeSelect: "ismail:store-select",
} as const;

export function emitScoped(from: Element, name: string, detail?: unknown) {
  from.dispatchEvent(new CustomEvent(name, { detail, bubbles: true }));
}

export function onScoped<T = unknown>(target: Element, name: string, handler: (detail: T) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<T>).detail);
  target.addEventListener(name, listener);
  return () => target.removeEventListener(name, listener);
}
