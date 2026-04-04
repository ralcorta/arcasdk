/**
 * SOAP HTTP engine / transport types (`IHttpClient` adapters for the `soap` package).
 */
import type { IHttpClient, IOptions } from "soap";
import type { SoapRuntime } from "@infrastructure/utils/soap-runtime";

export interface EngineConfig {
  useHttpsAgent?: boolean;
  runtime: SoapRuntime;
  /**
   * Options for `soap`'s Node `HttpClient` constructor (`IOptions` in node-soap typings).
   */
  requestOptions?: IOptions;
}

export type SoapHttpClientRequestArgs = Parameters<IHttpClient["request"]>;
export type SoapHttpClientRequestReturn = ReturnType<IHttpClient["request"]>;

export type SoapTransportHeaders = Record<string, string>;

export interface SoapTransportLikeResponse {
  statusCode: number;
  headers: SoapTransportHeaders;
  body: string;
  data: string;
}
