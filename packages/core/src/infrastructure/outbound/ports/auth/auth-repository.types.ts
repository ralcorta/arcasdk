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
}

