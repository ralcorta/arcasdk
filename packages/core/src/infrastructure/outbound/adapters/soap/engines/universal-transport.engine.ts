/**
 * Fetch HTTP Client
 * Implements IHttpClient using the native fetch API
 */
import type {
  SoapHttpClientRequestArgs,
  SoapHttpClientRequestReturn,
  SoapTransportHeaders,
  SoapTransportLikeResponse,
} from "@infrastructure/types/soap-engine.types";
import { IHttpClient } from "soap";

export class FetchHttpClient implements IHttpClient {
  /**
   * Implementation of the soap IHttpClient request method using fetch
   */
  public request(...args: SoapHttpClientRequestArgs): SoapHttpClientRequestReturn {
    const [rurl, data, callback, exheaders, exoptions] = args;
    const method = data ? "POST" : "GET";
    const headers: SoapTransportHeaders = {
      ...((exheaders ?? {}) as SoapTransportHeaders),
    };

    if (data) {
      headers["Content-Type"] =
        headers["Content-Type"] || "text/xml; charset=utf-8";
    }

    const options: RequestInit = {
      method,
      headers,
      body: (data as BodyInit | null | undefined) ?? null,
      ...((exoptions ?? {}) as RequestInit),
    };

    const requestPromise = fetch(rurl, options)
      .then(async (response) => {
        const body = await response.text();

        // Map fetch response to what the soap library expects
        const res: SoapTransportLikeResponse = {
          statusCode: response.status,
          headers: Object.fromEntries(response.headers.entries()),
          body,
          data: body, // axios/soap expects 'data' prop sometimes
        };

        callback(null, res, body);
      })
      .catch((error) => {
        callback(error);
      });

    return requestPromise as unknown as SoapHttpClientRequestReturn;
  }
}
