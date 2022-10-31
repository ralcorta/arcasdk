import { Client } from "soap";

/* tslint:disable:max-line-length no-empty-interface */
export interface IloginCmsInput {
  /** xsd:string(undefined) */
  in0: string;
}

export interface IloginCmsOutput {
  /** xsd:string(undefined) */
  loginCmsReturn: string; //ILoginCmsReturn -> LoginTicketResponse;
}

export interface LoginTicketResponse {
  loginticketresponse: ILoginCmsReturn;
}

export interface ILoginCmsReturn {
  header: ILoginCmsReturnHeaders;
  credentials: ILoginCmsReturnCredentials;
}

export interface ILoginCmsReturnHeaderVersion {
  version: string;
}

export interface ILoginCmsReturnHeaderData {
  source: string;
  destination: string;
  uniqueid: string;
  generationtime: string;
  expirationtime: string;
}

export interface ILoginCmsReturnHeaders {
  [0]: ILoginCmsReturnHeaderVersion;
  [1]: ILoginCmsReturnHeaderData;
}

export interface ILoginCmsReturnCredentials {
  token: string;
  sign: string;
}

export interface ILoginCmsSoap extends Client {
  loginCms: (
    input: IloginCmsInput,
    cb: (
      err: any | null,
      result: IloginCmsOutput,
      raw: string,
      soapHeader: { [k: string]: any }
    ) => any,
    options?: any,
    extraHeaders?: any
  ) => void;
  loginCmsAsync: (
    input: IloginCmsInput,
    options?: any,
    extraHeaders?: any
  ) => Promise<[IloginCmsOutput, string, { [k: string]: any }, string]>;
}
