/**
 * SOAP Client Facade
 * Internal utility for creating SOAP clients
 */
import { resolve } from "path";
import { Client, createClientAsync, IHttpClient, HttpClient } from "soap";
import * as https from "https";
import { MIN_DH_SIZE_LEGACY } from "@infrastructure/constants/ssl.constants";

export interface SoapClientParams {
  wsdl: string;
  options?: any;
}

export class SoapClientFacade {
  private constructor() {}

  /**
   * Get the path for the WSDL file stored on the WSDL folder
   */
  private static getWsdlPath(
    wsdlFile: string,
    forceFolderPath?: string
  ): string {
    return resolve(forceFolderPath ?? resolve(__dirname, "./wsdl/"), wsdlFile);
  }

  /**
   * Create HTTP client with custom HTTPS agent for legacy servers
   */
  private static createHttpClientWithAgent(
    httpsAgent: https.Agent
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

    const client = (await createClientAsync(
      SoapClientFacade.getWsdlPath(wsdl),
      finalOptions
    )) as T;

    return client;
  }
}
