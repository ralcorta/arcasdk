import { AccessTicket } from "@domain/entities/access-ticket.entity";
import type { ILoginCredentials } from "@domain/types/auth.types";
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
    ],
    credentials: {
      token: "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4...",
      sign: "signature123",
    },
  };

  function invalidLoginCredentials(value: unknown): ILoginCredentials {
    return value as ILoginCredentials;
  }

  describe("create", () => {
    it("creates a valid access ticket", () => {
      const ticket = AccessTicket.create(validLoginCredentials);
      expect(ticket).toBeDefined();
    });

    it("throws error when header is invalid", () => {
      expect(() =>
        AccessTicket.create(
          invalidLoginCredentials({
            ...validLoginCredentials,
            header: null,
          }),
        ),
      ).toThrow(/header|Invalid/i);
    });

    it("throws error when header is not an array", () => {
      expect(() =>
        AccessTicket.create(
          invalidLoginCredentials({
            ...validLoginCredentials,
            header: {},
          }),
        ),
      ).toThrow(/header/i);
    });

    it("throws error when credentials are missing", () => {
      expect(() =>
        AccessTicket.create(
          invalidLoginCredentials({
            ...validLoginCredentials,
            credentials: null,
          }),
        ),
      ).toThrow(/credentials/i);
    });

    it("throws error when sign is missing", () => {
      expect(() =>
        AccessTicket.create(
          invalidLoginCredentials({
            ...validLoginCredentials,
            credentials: {
              token: "token123",
              sign: "",
            },
          }),
        ),
      ).toThrow(/credentials/i);
    });

    it("throws error when token is missing", () => {
      expect(() =>
        AccessTicket.create(
          invalidLoginCredentials({
            ...validLoginCredentials,
            credentials: {
              token: "",
              sign: "signature123",
            },
          }),
        ),
      ).toThrow(/credentials/i);
    });

    it("throws error when expiration time is missing", () => {
      expect(() =>
        AccessTicket.create(
          invalidLoginCredentials({
            ...validLoginCredentials,
            header: [
              { version: "1.0" },
              {
                source: "WSAA",
                destination: "CN=wsfe",
                uniqueid: "12345",
                generationtime: new Date().toISOString(),
                expirationtime: "",
              },
            ],
          }),
        ),
      ).toThrow(/expiration/i);
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
        ],
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
