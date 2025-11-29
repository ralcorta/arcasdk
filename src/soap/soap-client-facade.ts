import { resolve } from "path";
import { Client, createClientAsync, IHttpClient, HttpClient } from "soap";
import { SoapClientParams } from "../types";
import * as https from "https";

export class SoapClientFacade {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private construct() {}

  /**
   * Geth the path for the WSDL file stored on the WSDL folder.
   *
   * @param wsdlFile
   * @param forceFolderPath
   * @returns Path of wsdl file
   */
  private static getWsdlPath(
    wsdlFile: string,
    forceFolderPath?: string
  ): string {
    return resolve(forceFolderPath ?? resolve(__dirname, "wsdl/"), wsdlFile);
  }

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
