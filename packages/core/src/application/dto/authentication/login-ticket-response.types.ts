/**
 * Parsed WSAA login ticket XML shape (not part of the WSDL SOAP contract).
 * Used after decoding `loginCmsReturn` from WSAA.
 */
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

export type ILoginCmsReturnHeaders = [
  ILoginCmsReturnHeaderVersion,
  ILoginCmsReturnHeaderData,
];

export interface ILoginCmsReturnCredentials {
  token: string;
  sign: string;
}
