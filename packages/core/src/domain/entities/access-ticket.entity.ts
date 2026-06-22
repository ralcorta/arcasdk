import type {
  ILoginCredentials,
  LoginTicketCredentials,
  LoginTicketHeaders,
} from "@domain/types/auth.types";

/**
 * AccessTicket Entity
 * Represents an authentication ticket with business logic
 */
export class AccessTicket {
  private constructor(
    private readonly header: LoginTicketHeaders,
    private readonly credentials: LoginTicketCredentials,
  ) {
    this.validate();
  }

  static create(data: ILoginCredentials): AccessTicket {
    return new AccessTicket(data.header, data.credentials);
  }

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

  getSign(): string {
    return this.credentials.sign;
  }

  getToken(): string {
    return this.credentials.token;
  }

  getExpiration(): Date {
    const expirationTime = this.header[1].expirationtime;
    if (!expirationTime) {
      throw new Error("Expiration time is missing");
    }
    const d = new Date(expirationTime);
    if (Number.isNaN(d.getTime())) {
      throw new Error("Invalid ticket expiration time");
    }
    return d;
  }

  getHeaders(): LoginTicketHeaders {
    return this.header;
  }

  getCredentials(): LoginTicketCredentials {
    return this.credentials;
  }

  toLoginCredentials(): ILoginCredentials {
    return {
      header: this.header,
      credentials: this.credentials,
    };
  }

  isExpired(): boolean {
    try {
      const expiration = this.getExpiration();
      return expiration.getTime() < Date.now();
    } catch {
      return true;
    }
  }

  isValid(): boolean {
    return !this.isExpired();
  }

  getTimeUntilExpiration(): number {
    if (this.isExpired()) {
      return 0;
    }

    const expiration = this.getExpiration();
    const now = new Date();
    return Math.max(0, expiration.getTime() - now.getTime());
  }
}
