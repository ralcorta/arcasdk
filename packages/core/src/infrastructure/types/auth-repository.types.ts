import { ITicketStoragePort } from "@application/ports/storage";
import { ISoapClientPort } from "@infrastructure/soap/soap-client.port";
import { ILoginCredentials } from "@domain/types/auth.types";

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
