/**
 * Auth Repository Types
 * Configuration types for authentication repositories
 */
import { ISoapClientPort } from "../soap/soap-client.port";
import { ITicketStoragePort } from "../storage/ticket-storage.port";
import { ILoginCredentials } from "@domain/entities/access-ticket.entity";

export interface AuthRepositoryConfig {
  soapClient?: ISoapClientPort;
  cert: string;
  key: string;
  cuit: number;
  production?: boolean;
  handleTicket?: boolean;
  ticketStorage?: ITicketStoragePort;
  credentials?: ILoginCredentials;
  /**
   * Enable HTTPS Agent for Node.js environments (required for legacy ARCA servers)
   * Set to false when running in Cloudflare Workers or other edge runtimes
   * @default true (enabled by default for Node.js compatibility)
   */
  useHttpsAgent?: boolean;
}
