import { MemoryTicketStorage } from "@infrastructure/outbound/adapters/storage/memory-ticket-storage";
import {
  AccessTicket,
  ILoginCredentials,
} from "@domain/entities/access-ticket.entity";

describe("MemoryTicketStorage", () => {
  let storage: MemoryTicketStorage;
  const config = {
    cuit: 20111111112,
    production: false,
  };

  beforeEach(() => {
    storage = new MemoryTicketStorage(config);
  });

  const mockTicketData: ILoginCredentials = {
    header: [
      { version: "1.0" },
      {
        source: "source",
        destination: "destination",
        uniqueid: "123",
        generationtime: new Date().toISOString(),
        expirationtime: new Date().toISOString(),
      },
    ],
    credentials: {
      token: "mock-token",
      sign: "mock-sign",
    },
  };

  it("should save and retrieve a ticket", async () => {
    const ticket = AccessTicket.create(mockTicketData);
    const serviceName = "wsfe";

    await storage.save(ticket, serviceName);
    const retrieved = await storage.get(serviceName);

    expect(retrieved).toBeDefined();
    expect(retrieved?.getCredentials().token).toBe("mock-token");
  });

  it("should return null for non-existent ticket", async () => {
    const retrieved = await storage.get("non-existent");
    expect(retrieved).toBeNull();
  });

  it("should delete a ticket", async () => {
    const ticket = AccessTicket.create(mockTicketData);
    const serviceName = "wsfe";

    await storage.save(ticket, serviceName);
    await storage.delete(serviceName);
    const retrieved = await storage.get(serviceName);

    expect(retrieved).toBeNull();
  });

  it("should respect production flag in key", async () => {
    const ticket = AccessTicket.create(mockTicketData);
    const serviceName = "wsfe";

    const prodStorage = new MemoryTicketStorage({
      ...config,
      production: true,
    });
    await prodStorage.save(ticket, serviceName);

    const testStorage = new MemoryTicketStorage({
      ...config,
      production: false,
    });
    const retrieved = await testStorage.get(serviceName);

    expect(retrieved).toBeNull(); // Should not find prod ticket in test storage
  });
});
