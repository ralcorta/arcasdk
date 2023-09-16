import { IAccessTicket, WSAuthTokens } from "./../types";
import moment, { MomentInput } from "moment";
import {
  ILoginCmsReturn,
  ILoginCmsReturnCredentials,
  ILoginCmsReturnHeaders,
} from "../soap/interfaces/LoginCMSService/LoginCms";

export class AccessTicket implements IAccessTicket {
  header: ILoginCmsReturnHeaders;
  credentials: ILoginCmsReturnCredentials;

  constructor(loginReturn: ILoginCmsReturn) {
    this.header = loginReturn.header;
    this.credentials = loginReturn.credentials;
  }

  getSign(): string {
    return this.credentials.sign;
  }

  getToken(): string {
    return this.credentials.token;
  }

  getExpiration(): Date {
    return moment(this.header[1].expirationtime).toDate();
  }

  getHeaders(): ILoginCmsReturnHeaders {
    return this.header;
  }

  getCredentials(): ILoginCmsReturnCredentials {
    return this.credentials;
  }

  getAuthKeyProps(): WSAuthTokens {
    return {
      token: this.getToken(),
      sign: this.getSign(),
      expirationDate: this.getExpiration().toISOString(),
    };
  }

  public isAccessTicketValid(): boolean {
    return AccessTicket.hasExpired(this.getExpiration());
  }

  public hasExpired(expirationDateIsoFormat: MomentInput): boolean {
    return moment(expirationDateIsoFormat).isBefore(new Date());
  }

  public static hasExpired(expirationDateIsoFormat: MomentInput): boolean {
    return moment(expirationDateIsoFormat).isBefore(new Date());
  }
}
