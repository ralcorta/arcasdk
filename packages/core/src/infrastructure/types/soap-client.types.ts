import { type SoapRuntimeValue } from "@infrastructure/utils/soap-runtime";
import { type IHttpClient } from "soap";
import type { SoapAsyncResultTuple } from "./soap.types";

/** Standard `soap` call result tuple: [result, rawResponse, soapHeader, rawRequest] */
export type SoapCallResult = SoapAsyncResultTuple<unknown, unknown>;

export interface ISoapOptions {
  forceSoap12Headers?: boolean;
  wsdlContent?: string;
  disableCache?: boolean;
  /**
   * Optional runtime override to force a specific internal engine.
   * If omitted, runtime is auto-detected.
   */
  runtime?: SoapRuntimeValue;
  /**
   * Optional custom SOAP transport engine.
   * When defined, internal engine selection is skipped.
   */
  httpClient?: IHttpClient;
  [key: string]: unknown;
}
