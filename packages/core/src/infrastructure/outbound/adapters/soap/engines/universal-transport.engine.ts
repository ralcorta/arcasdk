/**
 * Fetch HTTP Client
 * Implements IHttpClient using the native fetch API
 */
import { IHttpClient } from "soap";

export class FetchHttpClient implements IHttpClient {
  /**
   * Implementation of the soap IHttpClient request method using fetch
   */
  public request(
    rurl: string,
    data: any,
    callback: (error: any, res?: any, body?: any) => any,
    exheaders?: any,
    exoptions?: any,
  ): any {
    const method = data ? "POST" : "GET";
    const headers = { ...exheaders };

    if (data) {
      headers["Content-Type"] =
        headers["Content-Type"] || "text/xml; charset=utf-8";
    }

    const options: RequestInit = {
      method,
      headers,
      body: data,
      ...exoptions,
    };

    fetch(rurl, options)
      .then(async (response) => {
        const body = await response.text();

        // Map fetch response to what the soap library expects
        const res = {
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
  }
}
