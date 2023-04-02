type StorefrontRequestInit = Omit<RequestInit, "headers" | "method">;

/**
  * Represents a Storefront fetch client to interact on a readonly level with the Shopify Storefront API
  * @public
  *
  * @param accessToken - Custom App access token to use in the X-Shopify-Storefront-Access-Token header for fetch.
  * @param storefrontUrl - Optional, will use the shop key:value on the window.Shopify record otherwise.
  *
  * @returns {@link Storefront}
  */
export class Storefront {
  private storefrontUrl: string;
  private accessToken: string;

  constructor(accessToken: string, storefrontUrl?: string) {
    this.storefrontUrl = this.validateStorefrontUrl(storefrontUrl ? storefrontUrl : window.Shopify.shop);
    this.accessToken = accessToken;
  }

  /** 
    * Validates a string to match the regex of /[%.\s]+\.myshopify\.con/
    * @internal
    *
    * @param storefrontUrl - Takes in a string that should match a .myshopify.com url.
    *
    * @throws {@link Error}
    * Throws a generic error is the string passed is not a valid .myshopify.com url.
    *
    * @returns A formatter string that is normalized without http:// | https:// | ftp://
    * 
    */
  private validateStorefrontUrl(storefrontUrl: string): string {
    const re = new RegExp(/[^.\s]+\.myshopify\.com/, "gm");
    const isValidStorefront = re.test(storefrontUrl);

    if (isValidStorefront === false) {
      throw new Error("Storefront client was passed an invalid storefront URL");
    }

    // normalize the url without https://
    return storefrontUrl.replace(/^(https?|ftp):\/\//gm, "");

  }

  /**
    * Makes a GraphQL request to the Shopify Storefront API, using the values from the Storefront Constructor.
    * @public
    * @param query - The GraphQL query/mutation as a string/template literal, must be a named query or mutation.
    * @param variables? - A optional object with [key: string]: any, where key is the name of the variable used.
    *
    * @returns A formated JSON string for use in a Storefront.fetch call "{ "query": "my query", "variables": "" }"
    *
    * @example
    * ```typescript
    * const client = new Storefront("shct_example_access_token");
    * client.fetch("unstable", {
    *   body: client.makeQuery(`
    *     query myQuery($query: String!) {
    *       products(query: $query, first: 10) {
    *         edges {
    *           node {
    *             id
    *           }
    *         }
    *       }     
    *     }
    *   `, { query: "My super cool query"}),
    * });
    * ```
    */
  public makeQuery<T extends Record<string, string>>(query: string, variables?: T): string {
    return JSON.stringify({ query, variables });
  }

  /**
    * Makes a GraphQL request to the Shopify Storefront API, using the values from the Storefront Constructor.
    * @public
    * @param version - The Storefront API Version to use, the union type declares the supported values.
    * @param init - Generic Fetch options with method & headers omitted.
    *
    * @returns The result of a generic fetch request, can be chained with .then & .catch or awaited like all fetch() calls.
    *
    * @example
    * A simple example
    * ```typescript
    * const client = new Storefront("shct_example_access_token");
    * client.fetch("unstable", {
    *   body: client.makeQuery(`
    *     query myQuery($query: String!) {
    *       products(query: $query, first: 10) {
    *         edges {
    *           node {
    *             id
    *           }
    *         }
    *       }     
    *     }
    *   `, { query: "My super cool query"}),
    * });
    * ```
    */
  public fetch(version: StorefrontApiVersion, init?: StorefrontRequestInit | undefined): Promise<Response> {
    return window.fetch(`https://${this.storefrontUrl}/api/${version}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/graphql",
        "X-Shopify-Storefront-Access-Token": this.accessToken,
      },
      ...init,
    });
  }
}

