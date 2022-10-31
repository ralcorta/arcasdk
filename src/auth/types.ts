import { ServiceSoapTypes } from "../soap/interfaces/Service/ServiceSoap";

export type WSAuthParam = { Auth: ServiceSoapTypes.IAuth };

export type WSAuthTokens = {
  token: string;
  sign: string;
  expirationDate: string;
};
