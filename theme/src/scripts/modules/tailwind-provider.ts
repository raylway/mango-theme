import "construct-style-sheets-polyfill";
import { css, LitElement } from "lit";

/**
  * A Provider LitElement, that other LitElements can extend and adopt the Tailwind stylesheet.
  * @public
  *
  * @example
  * ```typescript
  * import { TailwindProvider } from "{@link TailwindProvider}";
  * 
  * export class MyLitElement extends TailwindProvider {
  *   static styles = [
  *     TailwindProvider.styles,
  *     ...
  *   ];
  * }
  * ```
  */
export class TailwindProvider extends LitElement {
  static styles = css`
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  `;
}
