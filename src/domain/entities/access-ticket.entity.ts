/**
 * AccessTicket Entity
 * Domain entity representing an authentication ticket from AFIP/ARCA
 */
import moment from "moment";
import {
  ILoginCmsReturnHeaders,
  ILoginCmsReturnCredentials,
} from "@infrastructure/outbound/ports/soap/interfaces/LoginCMSService/LoginCms";
import { WSAuthParam } from "@application/types";

export type { WSAuthParam };

export interface ILoginCredentials {
  header: ILoginCmsReturnHeaders;
  credentials: ILoginCmsReturnCredentials;
}

/**
 * AccessTicket Entity
 * Represents an authentication ticket with business logic
 */
export class AccessTicket {
  private constructor(
    private readonly header: ILoginCmsReturnHeaders,
    private readonly credentials: ILoginCmsReturnCredentials
  ) {
    this.validate();
  }

  /**
   * Factory method to create an AccessTicket
   * @param data Login credentials data
   * @returns AccessTicket instance
   */
  static create(data: ILoginCredentials): AccessTicket {
    return new AccessTicket(data.header, data.credentials);
  }

  /**
   * Validates the ticket structure
   * @throws Error if ticket is invalid
   */
  private validate(): void {
    if (!this.header || !Array.isArray(this.header)) {
      throw new Error("Invalid ticket header structure");
    }

    if (
      !this.credentials ||
      !this.credentials.sign ||
      !this.credentials.token
    ) {
      throw new Error("Invalid ticket credentials");
    }

    const expirationTime = this.header[1]?.expirationtime;
    if (!expirationTime) {
      throw new Error("Ticket expiration time is missing");
    }
  }

  /**
   * Gets the sign from credentials
   */
  getSign(): string {
    return this.credentials.sign;
  }

  /**
   * Gets the token from credentials
   */
  getToken(): string {
    return this.credentials.token;
  }

  /**
   * Gets the expiration date
   */
  getExpiration(): Date {
    const expirationTime = this.header[1].expirationtime;
    if (!expirationTime) {
      throw new Error("Expiration time is missing");
    }
    return moment(expirationTime).toDate();
  }

  /**
   * Gets the headers
   */
  getHeaders(): ILoginCmsReturnHeaders {
    return this.header;
  }

  /**
   * Gets the credentials
   */
  getCredentials(): ILoginCmsReturnCredentials {
    return this.credentials;
  }

  /**
   * Formats the ticket for SOAP authentication
   * @param cuit CUIT to include in auth
   * @returns WSAuthParam formatted for SOAP
   */
  getWSAuthFormat(cuit: number): WSAuthParam {
    if (!cuit || cuit <= 0) {
      throw new Error("Invalid CUIT provided");
    }

    return {
      Auth: {
        Token: this.getToken(),
        Sign: this.getSign(),
        Cuit: cuit,
      },
    };
  }

  /**
   * Checks if the ticket is expired
   * @returns true if expired, false otherwise
   */
  isExpired(): boolean {
    try {
      const expiration = this.getExpiration();
      return moment(expiration).isBefore(new Date());
    } catch (error) {
      return true; // If we can't determine expiration, consider it expired
    }
  }

  /**
   * Checks if the ticket is valid (not expired)
   * @returns true if valid, false otherwise
   */
  isValid(): boolean {
    return !this.isExpired();
  }

  /**
   * Gets the time remaining until expiration in milliseconds
   * @returns milliseconds until expiration, or 0 if expired
   */
  getTimeUntilExpiration(): number {
    if (this.isExpired()) {
      return 0;
    }

    const expiration = this.getExpiration();
    const now = new Date();
    return Math.max(0, expiration.getTime() - now.getTime());
  }
}
