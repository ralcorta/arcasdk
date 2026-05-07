import {
  AccessTicket,
  ILoginCredentials,
} from "@domain/entities/access-ticket.entity";
import { MS_PER_DAY } from "../../../utils/time.constants";

describe("AccessTicket Entity", () => {
  const futureExpiration = new Date(Date.now() + MS_PER_DAY).toISOString();
  const validLoginCredentials: ILoginCredentials = {
    header: [
      { version: "1.0" },
      {
        source: "WSAA",
        destination: "CN=wsfe",
        uniqueid: "12345",
        generationtime: new Date().toISOString(),
        expirationtime: futureExpiration,
      },
    ] as any,
    credentials: {
      token: "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4...",
      sign: "signature123",
    },
  };

  describe("create", () => {
    it("creates a valid access ticket", () => {
      const ticket = AccessTicket.create(validLoginCredentials);
      expect(ticket).toBeDefined();
    });

    it("throws error when header is invalid", () => {
      const invalidData = {
        ...validLoginCredentials,
        header: null as any,
      };
      expect(() => AccessTicket.create(invalidData)).toThrow(/header|Invalid/i);
    });

    it("throws error when header is not an array", () => {
      const invalidData = {
        ...validLoginCredentials,
        header: {} as any,
      };
      expect(() => AccessTicket.create(invalidData)).toThrow(/header/i);
    });

    it("throws error when credentials are missing", () => {
      const invalidData = {
        ...validLoginCredentials,
        credentials: null as any,
      };
      expect(() => AccessTicket.create(invalidData)).toThrow(/credentials/i);
    });

    it("throws error when sign is missing", () => {
      const invalidData = {
        ...validLoginCredentials,
        credentials: {
          token: "token123",
          sign: "",
          cuit: 20111111112,
        },
      };
      expect(() => AccessTicket.create(invalidData)).toThrow(/credentials/i);
    });

    it("throws error when token is missing", () => {
      const invalidData = {
        ...validLoginCredentials,
        credentials: {
          token: "",
          sign: "signature123",
          cuit: 20111111112,
        },
      };
      expect(() => AccessTicket.create(invalidData)).toThrow(/credentials/i);
    });

    it("throws error when expiration time is missing", () => {
      const invalidData = {
        ...validLoginCredentials,
        header: [null, { uniqueId: "12345" }] as any,
      };
      expect(() => AccessTicket.create(invalidData)).toThrow(/expiration/i);
    });
  });

  describe("getters", () => {
    const ticket = AccessTicket.create(validLoginCredentials);

    it("getSign returns correct sign value", () => {
      expect(ticket.getSign()).toBe("signature123");
    });

    it("getToken returns correct token value", () => {
      expect(ticket.getToken()).toMatch(/PD94bWwg/);
    });

    it("getExpiration returns valid Date", () => {
      const expiration = ticket.getExpiration();
      expect(expiration).toBeInstanceOf(Date);
      expect(expiration.getTime()).toBeGreaterThan(0);
    });

    it("getHeaders returns header array", () => {
      const headers = ticket.getHeaders();
      expect(Array.isArray(headers)).toBe(true);
      expect(headers[1]?.uniqueid).toBe("12345");
    });

    it("getCredentials returns credentials object", () => {
      const creds = ticket.getCredentials();
      expect(creds.token).toBe(
        "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4...",
      );
      expect(creds.sign).toBe("signature123");
    });
  });

  describe("toLoginCredentials", () => {
    it("returns the complete login credentials", () => {
      const ticket = AccessTicket.create(validLoginCredentials);
      const result = ticket.toLoginCredentials();

      expect(result.header).toEqual(validLoginCredentials.header);
      expect(result.credentials).toEqual(validLoginCredentials.credentials);
    });
  });

  describe("getWSAuthFormat", () => {
    it("formats ticket for SOAP authentication with valid CUIT", () => {
      const ticket = AccessTicket.create(validLoginCredentials);
      const wsAuth = ticket.getWSAuthFormat(20111111112);

      expect(wsAuth).toHaveProperty("Auth");
      expect(wsAuth.Auth).toHaveProperty("Token");
      expect(wsAuth.Auth).toHaveProperty("Sign");
      expect(wsAuth.Auth).toHaveProperty("Cuit");
      expect(wsAuth.Auth.Cuit).toBe(20111111112);
    });

    it("throws error with invalid CUIT", () => {
      const ticket = AccessTicket.create(validLoginCredentials);
      expect(() => ticket.getWSAuthFormat(0)).toThrow(/CUIT/i);
    });

    it("throws error with negative CUIT", () => {
      const ticket = AccessTicket.create(validLoginCredentials);
      expect(() => ticket.getWSAuthFormat(-1)).toThrow(/CUIT/i);
    });

    it("throws error with null CUIT", () => {
      const ticket = AccessTicket.create(validLoginCredentials);
      expect(() => ticket.getWSAuthFormat(null as any)).toThrow(/CUIT/i);
    });
  });

  describe("isExpired", () => {
    it("returns true when expiration time is in the past", () => {
      const expiredCredentials: ILoginCredentials = {
        header: [
          { version: "1.0" },
          {
            source: "WSAA",
            destination: "CN=wsfe",
            uniqueid: "12345",
            generationtime: new Date().toISOString(),
            expirationtime: new Date(Date.now() - MS_PER_DAY).toISOString(),
          },
        ] as any,
        credentials: {
          token: "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4...",
          sign: "signature123",
        },
      };
      const ticket = AccessTicket.create(expiredCredentials);
      expect(ticket.isExpired()).toBe(true);
    });

    it("returns false when expiration time is in the future", () => {
      const ticket = AccessTicket.create(validLoginCredentials);
      expect(ticket.isExpired()).toBe(false);
    });
  });
});
