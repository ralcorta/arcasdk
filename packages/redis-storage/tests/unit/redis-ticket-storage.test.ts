import { AccessTicket, ArcaServiceNames } from "@arcasdk/core";
import {
  DEFAULT_KEY_PREFIX,
  RedisTicketStorage,
  type RedisTicketStorageClient,
} from "../../src";

const CUIT = 20111111112;

function createTicket(expiresInMs = 12 * 60 * 60 * 1000): AccessTicket {
  const now = Date.now();
  return AccessTicket.create({
    header: [
      { version: "1.0" },
      {
        source: "CN=wsaahomo, O=AFIP, C=AR",
        destination: "CN=wsfe, O=AFIP, C=AR",
        uniqueid: "123456",
        generationtime: new Date(now).toISOString(),
        expirationtime: new Date(now + expiresInMs).toISOString(),
      },
    ],
    credentials: { token: "token-value", sign: "sign-value" },
  });
}

function createClient(): jest.Mocked<RedisTicketStorageClient> & {
  data: Map<string, string>;
} {
  const data = new Map<string, string>();
  return {
    data,
    get: jest.fn(async (key: string) => data.get(key) ?? null),
    set: jest.fn(async (key: string, value: string) => {
      data.set(key, value);
      return "OK";
    }),
    del: jest.fn(async (key: string) => (data.delete(key) ? 1 : 0)),
  };
}

describe("RedisTicketStorage", () => {
  let client: ReturnType<typeof createClient>;
  let storage: RedisTicketStorage;

  beforeEach(() => {
    client = createClient();
    storage = new RedisTicketStorage({ client, cuit: CUIT });
  });

  describe("getKey", () => {
    it("builds the key from the default prefix, CUIT and service", () => {
      expect(storage.getKey(ArcaServiceNames.WSFE)).toBe(
        `${DEFAULT_KEY_PREFIX}${CUIT}:wsfe`,
      );
    });

    it("adds a production suffix in production", () => {
      storage = new RedisTicketStorage({ client, cuit: CUIT, production: true });
      expect(storage.getKey(ArcaServiceNames.WSFE)).toBe(
        `${DEFAULT_KEY_PREFIX}${CUIT}:wsfe:production`,
      );
    });

    it("uses a custom prefix", () => {
      storage = new RedisTicketStorage({
        client,
        cuit: CUIT,
        keyPrefix: "tenant-1:arca:",
      });
      expect(storage.getKey(ArcaServiceNames.WSFE)).toBe(
        `tenant-1:arca:${CUIT}:wsfe`,
      );
    });
  });

  describe("save", () => {
    it("stores the ticket headers and credentials as JSON", async () => {
      const ticket = createTicket();

      await storage.save(ticket, ArcaServiceNames.WSFE);

      expect(client.set).toHaveBeenCalledWith(
        storage.getKey(ArcaServiceNames.WSFE),
        expect.any(String),
      );
      const stored = JSON.parse(
        client.data.get(storage.getKey(ArcaServiceNames.WSFE))!,
      );
      expect(stored).toEqual({
        header: ticket.getHeaders(),
        credentials: ticket.getCredentials(),
      });
    });
  });

  describe("get", () => {
    it("returns null when the key does not exist", async () => {
      await expect(storage.get(ArcaServiceNames.WSFE)).resolves.toBeNull();
    });

    it("returns the saved ticket", async () => {
      const ticket = createTicket();
      await storage.save(ticket, ArcaServiceNames.WSFE);

      const result = await storage.get(ArcaServiceNames.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
      expect(result?.getToken()).toBe("token-value");
      expect(result?.getSign()).toBe("sign-value");
      expect(result?.getExpiration()).toEqual(ticket.getExpiration());
      expect(result?.isExpired()).toBe(false);
    });

    it("returns expired tickets so core can renew them", async () => {
      await storage.save(createTicket(-60_000), ArcaServiceNames.WSFE);

      const result = await storage.get(ArcaServiceNames.WSFE);

      expect(result?.isExpired()).toBe(true);
    });

    it("keeps services and environments apart", async () => {
      const production = new RedisTicketStorage({
        client,
        cuit: CUIT,
        production: true,
      });
      await storage.save(createTicket(), ArcaServiceNames.WSFE);

      await expect(storage.get(ArcaServiceNames.WSFEX)).resolves.toBeNull();
      await expect(production.get(ArcaServiceNames.WSFE)).resolves.toBeNull();
    });

    it("throws a descriptive error when the stored value is not a ticket", async () => {
      client.data.set(storage.getKey(ArcaServiceNames.WSFE), "not json");

      await expect(storage.get(ArcaServiceNames.WSFE)).rejects.toThrow(
        `Failed to parse ticket stored in ${storage.getKey(ArcaServiceNames.WSFE)}`,
      );
    });
  });

  describe("delete", () => {
    it("removes the ticket", async () => {
      await storage.save(createTicket(), ArcaServiceNames.WSFE);

      await storage.delete(ArcaServiceNames.WSFE);

      expect(client.del).toHaveBeenCalledWith(
        storage.getKey(ArcaServiceNames.WSFE),
      );
      await expect(storage.get(ArcaServiceNames.WSFE)).resolves.toBeNull();
    });
  });
});
