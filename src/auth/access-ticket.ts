import { IAccessTicket, ILoginCredentials, WSAuthTokens } from "./../types";
import moment, { MomentInput } from "moment";
import {
  ILoginCmsReturnCredentials,
  ILoginCmsReturnHeaders,
} from "../soap/interfaces/LoginCMSService/LoginCms";

export class AccessTicket implements IAccessTicket {
  readonly header: ILoginCmsReturnHeaders;
  readonly credentials: ILoginCmsReturnCredentials;

  constructor({ header, credentials }: ILoginCredentials) {
    this.header = header;
    this.credentials = credentials;
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

  public isExpired(): boolean {
    return moment(this.getExpiration()).isBefore(new Date());
  }
}
