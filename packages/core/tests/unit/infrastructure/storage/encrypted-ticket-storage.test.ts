import { randomBytes, createDecipheriv } from "crypto";
import { EncryptedTicketStorage } from "@infrastructure/storage/encrypted-ticket-storage";
import { ArcaServiceNames } from "@application/types/service-name.types";
import { AccessTicket } from "@domain/entities/access-ticket.entity";
import { ITicketStoragePort } from "@application/ports/storage";
import type { ArcaServiceName } from "@application/types/service-name.types";
import type { ILoginCredentials } from "@domain/types/auth.types";

function createInnerStorage(): jest.Mocked<ITicketStoragePort> & {
  tickets: Map<ArcaServiceName, AccessTicket>;
} {
  const tickets = new Map<ArcaServiceName, AccessTicket>();
  return {
    tickets,
    save: jest.fn(async (ticket: AccessTicket, serviceName: ArcaServiceName) => {
      tickets.set(serviceName, ticket);
    }),
    get: jest.fn(async (serviceName: ArcaServiceName) => tickets.get(serviceName) ?? null),
    delete: jest.fn(async (serviceName: ArcaServiceName) => {
      tickets.delete(serviceName);
    }),
  };
}

describe("EncryptedTicketStorage", () => {
  const key = randomBytes(32);
  const ticketData: ILoginCredentials = {
    header: [
      { version: "1.0" },
      {
        source: "CN=wsaahomo, O=AFIP, C=AR",
        destination: "CN=wsfe, O=AFIP, C=AR",
        uniqueid: "123",
        generationtime: new Date().toISOString(),
        expirationtime: new Date(Date.now() + 60_000).toISOString(),
      },
    ],
    credentials: { token: "token-value-ñ", sign: "sign-value" },
  };
  const ticket = AccessTicket.create(ticketData);

  let inner: ReturnType<typeof createInnerStorage>;
  let storage: EncryptedTicketStorage;

  beforeEach(() => {
    inner = createInnerStorage();
    storage = new EncryptedTicketStorage({ storage: inner, key });
  });

  describe("constructor", () => {
    it("accepts a base64 key", () => {
      expect(
        () =>
          new EncryptedTicketStorage({
            storage: inner,
            key: key.toString("base64"),
          }),
      ).not.toThrow();
    });

    it.each([
      ["a short key", randomBytes(16)],
      ["a long key", randomBytes(64)],
      ["a non base64 passphrase", "my secret passphrase"],
    ])("rejects %s", (_label, badKey) => {
      expect(
        () => new EncryptedTicketStorage({ storage: inner, key: badKey }),
      ).toThrow("EncryptedTicketStorage key must be 32 bytes");
    });
  });

  describe("save", () => {
    it("stores token and sign encrypted and the header as is", async () => {
      await storage.save(ticket, ArcaServiceNames.WSFE);

      const stored = inner.tickets.get(ArcaServiceNames.WSFE)!;
      expect(stored.getHeaders()).toEqual(ticket.getHeaders());
      expect(stored.getToken()).toMatch(/^enc:v1:/);
      expect(stored.getSign()).toMatch(/^enc:v1:/);
      expect(stored.getToken()).not.toContain(ticket.getToken());
      expect(stored.getSign()).not.toContain(ticket.getSign());
    });

    it("uses a new IV on every save", async () => {
      await storage.save(ticket, ArcaServiceNames.WSFE);
      const first = inner.tickets.get(ArcaServiceNames.WSFE)!.getToken();

      await storage.save(ticket, ArcaServiceNames.WSFE);
      const second = inner.tickets.get(ArcaServiceNames.WSFE)!.getToken();

      expect(second).not.toBe(first);
    });

    it("produces standard AES-256-GCM bound to the service and field", async () => {
      await storage.save(ticket, ArcaServiceNames.WSFE);
      const [, , iv, payload] = inner.tickets
        .get(ArcaServiceNames.WSFE)!
        .getToken()
        .split(":");
      const bytes = Buffer.from(payload!, "base64");

      const decipher = createDecipheriv(
        "aes-256-gcm",
        key,
        Buffer.from(iv!, "base64"),
      );
      decipher.setAAD(Buffer.from("wsfe:token"));
      decipher.setAuthTag(bytes.subarray(-16));
      const token = Buffer.concat([
        decipher.update(bytes.subarray(0, -16)),
        decipher.final(),
      ]).toString("utf8");

      expect(token).toBe(ticket.getToken());
    });
  });

  describe("get", () => {
    it("returns null when the wrapped storage has no ticket", async () => {
      await expect(storage.get(ArcaServiceNames.WSFE)).resolves.toBeNull();
    });

    it("returns the decrypted ticket", async () => {
      await storage.save(ticket, ArcaServiceNames.WSFE);

      const result = await storage.get(ArcaServiceNames.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
      expect(result?.getToken()).toBe(ticket.getToken());
      expect(result?.getSign()).toBe(ticket.getSign());
      expect(result?.getHeaders()).toEqual(ticket.getHeaders());
    });

    it("reads tickets saved before encryption was enabled", async () => {
      inner.tickets.set(ArcaServiceNames.WSFE, ticket);

      const result = await storage.get(ArcaServiceNames.WSFE);

      expect(result?.getToken()).toBe(ticket.getToken());
      expect(result?.getSign()).toBe(ticket.getSign());
    });

    it("fails with a wrong key", async () => {
      await storage.save(ticket, ArcaServiceNames.WSFE);
      const otherKey = new EncryptedTicketStorage({
        storage: inner,
        key: randomBytes(32),
      });

      await expect(otherKey.get(ArcaServiceNames.WSFE)).rejects.toThrow(
        "Failed to decrypt the WSAA ticket token for wsfe: wrong key or tampered data",
      );
    });

    it("fails when a ciphertext is moved to another service", async () => {
      await storage.save(ticket, ArcaServiceNames.WSFE);
      inner.tickets.set(
        ArcaServiceNames.WSFEX,
        inner.tickets.get(ArcaServiceNames.WSFE)!,
      );

      await expect(storage.get(ArcaServiceNames.WSFEX)).rejects.toThrow(
        "wrong key or tampered data",
      );
    });

    it("fails when the ciphertext was altered", async () => {
      await storage.save(ticket, ArcaServiceNames.WSFE);
      const stored = inner.tickets.get(ArcaServiceNames.WSFE)!;
      const [prefix, version, iv, payload] = stored.getToken().split(":");
      const bytes = Buffer.from(payload!, "base64");
      bytes[0] = bytes[0]! ^ 0xff;
      inner.tickets.set(
        ArcaServiceNames.WSFE,
        AccessTicket.create({
          header: stored.getHeaders(),
          credentials: {
            token: [prefix, version, iv, bytes.toString("base64")].join(":"),
            sign: stored.getSign(),
          },
        }),
      );

      await expect(storage.get(ArcaServiceNames.WSFE)).rejects.toThrow(
        "Failed to decrypt the WSAA ticket token for wsfe",
      );
    });

    it("fails on a malformed encrypted value", async () => {
      inner.tickets.set(
        ArcaServiceNames.WSFE,
        AccessTicket.create({
          ...ticketData,
          credentials: { token: "enc:v1:bad", sign: "sign-value" },
        }),
      );

      await expect(storage.get(ArcaServiceNames.WSFE)).rejects.toThrow(
        "wrong key or tampered data",
      );
    });
  });

  describe("delete", () => {
    it("delegates to the wrapped storage", async () => {
      await storage.save(ticket, ArcaServiceNames.WSFE);

      await storage.delete(ArcaServiceNames.WSFE);

      expect(inner.delete).toHaveBeenCalledWith(ArcaServiceNames.WSFE);
      await expect(storage.get(ArcaServiceNames.WSFE)).resolves.toBeNull();
    });
  });
});
