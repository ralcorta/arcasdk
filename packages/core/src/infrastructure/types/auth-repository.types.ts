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

  
  useHttpsAgent?: boolean;
}
