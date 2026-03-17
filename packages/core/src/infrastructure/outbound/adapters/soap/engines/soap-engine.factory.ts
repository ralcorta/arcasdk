import { HttpClient, IHttpClient } from "soap";

/**
 * Configuration for the SOAP Engine factory
 */
export interface EngineConfig {
  /** Whether to use a custom HTTPS agent (Node.js only) */
  useHttpsAgent?: boolean;
  /** Current environment detection */
  isNode: boolean;
  /** Additional request options */
  requestOptions?: any;
}

/**
 * Unified Factory to create a SOAP Engine (HttpClient)
 * This handles the environment-specific logic (Node.js vs Universal/Fetch)
 * and security configuration internally.
 */
export async function createSoapEngine(
  config: EngineConfig,
): Promise<IHttpClient> {
  const { isNode, useHttpsAgent, requestOptions = {} } = config;

  if (isNode) {
    // Node.js: Use the native soap HttpClient with optional security tuning
    const httpClient = new HttpClient(requestOptions);

    if (useHttpsAgent) {
      /**
       * Dynamic import to prevent loading Node-specific SSL logic
       * in environments like Cloudflare Workers or the browser.
       */
      const { createLegacyHttpsAgent } = await import("./node-security.engine");
      const agent = await createLegacyHttpsAgent();

      // Inject the agent into the request method
      const originalRequest = httpClient.request.bind(httpClient);
      httpClient.request = (rurl, data, callback, exheaders, exoptions) => {
        return originalRequest(rurl, data, callback, exheaders, {
          ...exoptions,
          httpsAgent: exoptions?.httpsAgent || agent,
        });
      };
    }

    return httpClient;
  }

  // Universal/Serverless (Cloudflare, Lambda 18+, etc.): Use Fetch
  /**
   * Dynamic import to keep the bundle clean for Node.js users
   * who don't need the Fetch-based universal transport.
   */
  const { FetchHttpClient } = await import("./universal-transport.engine");
  return new FetchHttpClient();
}
