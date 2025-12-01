/**
 * Infrastructure Types - SOAP
 * Types related to SOAP infrastructure
 */
import { IOptions } from "soap";
import { WsdlPathEnum } from "@infrastructure/outbound/ports/soap/enums/wsdl-path.enum";
import {
  EndpointsEnum,
  SoapServiceVersion,
} from "@infrastructure/outbound/ports/soap/enums/endpoints.enum";
import { ServiceNamesEnum } from "@infrastructure/outbound/ports/soap/enums/service-names.enum";

export type SoapAsyncFunc<I, O> = (
  input: I,
  options?: any,
  extraHeaders?: any
) => Promise<[O, string, { [k: string]: any }, string]>;

export type WSAuthTokens = {
  token: string;
  sign: string;
  expirationDate: string;
};

export type SoapClientParams = {
  wsdl: WsdlPathEnum;
  options?: IOptions;
};

export type ArcaServiceSoapParam = SoapClientParams & {
  v12?: boolean;
  url: EndpointsEnum;
  url_test?: EndpointsEnum;
  wsdl_test?: WsdlPathEnum;
} & { serviceName: ServiceNamesEnum };

export type SoapServices<T> = Record<
  "Service",
  Record<
    SoapServiceVersion,
    Record<keyof T, Record<"input" | "output", Record<string, any>>>
  >
>;
