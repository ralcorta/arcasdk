/**
 * Application Types - Context
 * Configuration types for the application
 */
import { ILoginCredentials } from "@domain/entities/access-ticket.entity";

export interface Context {
  /**
   * Flag for production or testing environment
   */
  production?: boolean;

  /**
   * Content file for the X.509 certificate in PEM format
   */
  cert: string;

  /**
   * Content file for the private key corresponding to CERT (PEM)
   */
  key: string;

  /**
   * The CUIT to use
   */
  cuit: number;

  /**
   * Tokens object if you have one created before
   */
  credentials?: ILoginCredentials;

  /**
   * Flag that if is true, the access tickets data is handled by the developer, otherwise is saved locally.
   */
  handleTicket?: boolean;

  /**
   * The path of the auth obj if the package is auto managed
   */
  ticketPath?: string;

  /**
   * Enable console logging
   *
   * @default false
   */
  enableLogging?: boolean;
}
