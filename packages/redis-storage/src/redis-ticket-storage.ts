import {
  AccessTicket,
  type ArcaServiceName,
  type ITicketStoragePort,
} from "@arcasdk/core";

/**
 * Subset of the Redis client API used by the storage. `redis` (node-redis v4+)
 * and `ioredis` clients both satisfy it as they are.
 */
export interface RedisTicketStorageClient {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<unknown>;
  del(key: string): Promise<unknown>;
}

export interface RedisTicketStorageConfig {
  client: RedisTicketStorageClient;
  cuit: number;
  production?: boolean;
  /** Prefix for every key. Defaults to `arcasdk:ticket:`. */
  keyPrefix?: string;
}

export const DEFAULT_KEY_PREFIX = "arcasdk:ticket:";

// Keys carry no TTL: setting one differs between redis and ioredis, there is
// a single key per CUIT and service that each renewal overwrites, and core
// already ignores expired tickets.
export class RedisTicketStorage implements ITicketStoragePort {
  private readonly client: RedisTicketStorageClient;
  private readonly cuit: number;
  private readonly production: boolean;
  private readonly keyPrefix: string;

  constructor(config: RedisTicketStorageConfig) {
    this.client = config.client;
    this.cuit = config.cuit;
    this.production = config.production ?? false;
    this.keyPrefix = config.keyPrefix ?? DEFAULT_KEY_PREFIX;
  }

  getKey(serviceName: ArcaServiceName): string {
    return `${this.keyPrefix}${this.cuit}:${serviceName}${
      this.production ? ":production" : ""
    }`;
  }

  async save(ticket: AccessTicket, serviceName: ArcaServiceName): Promise<void> {
    const ticketData = {
      header: ticket.getHeaders(),
      credentials: ticket.getCredentials(),
    };

    await this.client.set(this.getKey(serviceName), JSON.stringify(ticketData));
  }

  async get(serviceName: ArcaServiceName): Promise<AccessTicket | null> {
    const key = this.getKey(serviceName);
    const value = await this.client.get(key);
    if (value === null || value === undefined) {
      return null;
    }

    try {
      return AccessTicket.create(JSON.parse(value));
    } catch (error) {
      throw new Error(
        `Failed to parse ticket stored in ${key}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }

  async delete(serviceName: ArcaServiceName): Promise<void> {
    await this.client.del(this.getKey(serviceName));
  }
}
