/**
 * SOAP Client Facade
 * Internal utility for creating SOAP clients
 */
import { Client, createClientAsync, IHttpClient, HttpClient } from "soap";

export interface SoapClientParams {
  wsdl: string;
  options?: any;
}

export class SoapClientFacade {
  private constructor() {}

  /**
   * Create HTTP client with custom HTTPS agent for legacy servers
   */
  private static createHttpClientWithAgent(
    httpsAgent: any // Using any to avoid importing https types in non-Node environments
  ): IHttpClient {
    const originalHttpClient = new HttpClient();

    return {
      request: function (
        rurl: string,
        data: any,
        callback: (error: any, res?: any, body?: any) => any,
        exheaders?: any,
        exoptions?: any
      ) {
        if (!exoptions) {
          exoptions = {};
        }
        if (!exoptions.httpsAgent) {
          exoptions.httpsAgent = httpsAgent;
        }
        return originalHttpClient.request(
          rurl,
          data,
          callback,
          exheaders,
          exoptions
        );
      },
    };
  }

  /**
   * Create a SOAP client
   */
  public static async create<T extends Client>({
    wsdl,
    options,
  }: SoapClientParams): Promise<T> {
    const requestOptions = options?.request as any;
    let finalOptions = { ...options };

    if (requestOptions?.httpsAgent) {
      const httpsAgent = requestOptions.httpsAgent;
      finalOptions = {
        ...options,
        httpClient: SoapClientFacade.createHttpClientWithAgent(httpsAgent),
      };
    }

    const client = (await createClientAsync(wsdl, finalOptions)) as T;

    return client;
  }
}
