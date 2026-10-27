import type { IHttpClient, IOptions } from "soap";
import type { SoapRuntimeValue } from "@infrastructure/utils/soap-runtime";

export interface EngineConfig {
  useHttpsAgent?: boolean;
  // false: en Node usa un https.Agent propio sin keep-alive en lugar del agente global.
  keepAlive?: boolean;
  runtime: SoapRuntimeValue;
  
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
