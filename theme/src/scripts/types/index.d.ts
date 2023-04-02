interface Shopify {
  shop: string;
  routes: {
    root: string;
  };
  currency: {
    active: string;
    rate: string;
  };
}


declare global {
  interface Window {
    ThemeStyles: CSSStyleSheet;
    Shopify: Shopify;
    MoneyFormat: string;
  }
  type Subscriber<T> = {
    callback: (arg0?: T) => T | void;
    subscriber: HTMLElement | LitElement;
  };
  type ClientState = "load" | "idle" | "visible" | "media";
  type StorefrontApiVersion = "unstable" | "2023-04" | "2023-01" | "2022-10" | "2022-07" | "2022-04";
}

export {};


