import { type SoapRuntimeValue } from "@infrastructure/utils/soap-runtime";
import { type IHttpClient } from "soap";
import type { SoapAsyncResultTuple } from "./soap.types";

export type SoapCallResult = SoapAsyncResultTuple<unknown, unknown>;

export interface ISoapOptions {
  forceSoap12Headers?: boolean;
  wsdlContent?: string;
  disableCache?: boolean;
  
  runtime?: SoapRuntimeValue;
  
  httpClient?: IHttpClient;
  [key: string]: unknown;
}
