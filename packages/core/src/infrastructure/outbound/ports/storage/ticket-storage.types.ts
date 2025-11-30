/**
 * Ticket Storage Types
 * Configuration types for ticket storage implementations
 */
export interface FileSystemTicketStorageConfig {
  ticketPath: string;
  cuit: number;
  production?: boolean;
}

