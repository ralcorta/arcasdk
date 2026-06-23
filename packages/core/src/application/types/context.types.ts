import { ILoginCredentials } from "@domain/types/auth.types";
import { ITicketStoragePort } from "@application/ports/storage";

export interface Context {
  
  production?: boolean;

  
  cert: string;

  
  key: string;

  
  cuit: number;

  
  credentials?: ILoginCredentials;

  
  ticketStorage?: ITicketStoragePort;

  
  handleTicket?: boolean;

  
  ticketPath?: string;

  
  useSoap12?: boolean;

  
  useHttpsAgent?: boolean;
}
