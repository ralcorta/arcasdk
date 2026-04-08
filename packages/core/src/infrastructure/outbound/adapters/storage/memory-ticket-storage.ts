import { ITicketStoragePort } from "@infrastructure/outbound/ports/storage/ticket-storage.port";
import { AccessTicket } from "@domain/entities/access-ticket.entity";

export class MemoryTicketStorage implements ITicketStoragePort {
  private static storage = new Map<string, string>();
  private readonly cuit: number;
  private readonly production: boolean;

  constructor(config: { cuit: number; production?: boolean }) {
    this.cuit = config.cuit;
    this.production = config.production ?? false;
  }

  private createKey(serviceName: string): string {
    return `${this.cuit}-${serviceName}-${this.production ? "prod" : "test"}`;
  }

  async save(ticket: AccessTicket, serviceName: string): Promise<void> {
    const key = this.createKey(serviceName);
    const ticketData = {
      header: ticket.getHeaders(),
      credentials: ticket.getCredentials(),
    };
    MemoryTicketStorage.storage.set(key, JSON.stringify(ticketData));
  }

  async get(serviceName: string): Promise<AccessTicket | null> {
    const key = this.createKey(serviceName);
    const data = MemoryTicketStorage.storage.get(key);
    if (!data) return null;

    try {
      const ticketData = JSON.parse(data);
      return AccessTicket.create(ticketData);
    } catch {
      return null;
    }
  }

  async delete(serviceName: string): Promise<void> {
    const key = this.createKey(serviceName);
    MemoryTicketStorage.storage.delete(key);
  }
}
