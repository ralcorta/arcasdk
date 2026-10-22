import { ILoginCredentials } from "@domain/types/auth.types";
import { ITicketStoragePort } from "@application/ports/storage";
import { ArcaEventListener } from "./events.types";

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

  /**
   * Receives a `request`, `response` or `error` event for every call to ARCA,
   * WSAA included, with the parameters, the result and the XML (token and sign redacted)
   */
  onEvent?: ArcaEventListener;
}
