import type { ITicketStoragePort } from "@application/ports/storage";

export interface FileSystemTicketStorageConfig {
  ticketPath: string;
  cuit: number;
  production?: boolean;
}

export interface EncryptedTicketStorageConfig {
  // Storage that keeps the encrypted tickets.
  storage: ITicketStoragePort;
  // 32-byte AES-256 key, as bytes or base64 (e.g. `openssl rand -base64 32`).
  key: string | Uint8Array;
}
