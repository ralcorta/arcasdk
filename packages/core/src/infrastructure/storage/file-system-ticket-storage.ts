import { ITicketStoragePort } from "@application/ports/storage";
import { ArcaServiceName } from "@application/types/service-name.types";
import { AccessTicket } from "@domain/entities/access-ticket.entity";
import { promises as fs } from "fs";
import { resolve } from "path";
import { FileSystemTicketStorageConfig } from "@infrastructure/types/ticket-storage.types";

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

export class FileSystemTicketStorage implements ITicketStoragePort {
  private ticketPath: string;
  private cuit: number;
  private production: boolean;

  constructor(config: FileSystemTicketStorageConfig) {
    this.ticketPath = config.ticketPath;
    this.cuit = config.cuit;
    this.production = config.production ?? false;
  }

  /**
   * Create file name for ticket
   */
  private createFileName(serviceName: string): string {
    return `TA-${this.cuit.toString()}-${serviceName}${
      this.production ? "-production" : ""
    }.json`;
  }

  /**
   * Get path to ticket file
   */
  private getTicketFilePath(serviceName: string): string {
    return resolve(this.ticketPath, this.createFileName(serviceName));
  }

  async save(ticket: AccessTicket, serviceName: ArcaServiceName): Promise<void> {
    try {
      await fs.mkdir(this.ticketPath, { recursive: true });
    } catch (error) {
      throw new Error(
        `Failed to create tickets directory: ${getErrorMessage(error)}`,
      );
    }

    const filePath = this.getTicketFilePath(serviceName);
    const ticketData = {
      header: ticket.getHeaders(),
      credentials: ticket.getCredentials(),
    };

    await fs.writeFile(filePath, JSON.stringify(ticketData, null, 2), "utf8");
  }

  async get(serviceName: ArcaServiceName): Promise<AccessTicket | null> {
    const filePath = this.getTicketFilePath(serviceName);

    try {
      await fs.access(filePath, fs.constants.F_OK);
    } catch {
      return null; // File doesn't exist
    }

    try {
      await fs.access(filePath, fs.constants.R_OK);
    } catch {
      throw new Error(`Access denied to ticket file: ${filePath}`);
    }

    let fileData: string;
    try {
      fileData = await fs.readFile(filePath, "utf8");
    } catch {
      return null; // Can't read file
    }

    try {
      const ticketData = JSON.parse(fileData);
      return AccessTicket.create(ticketData);
    } catch (error) {
      throw new Error(
        `Invalid access ticket format: ${getErrorMessage(error)}`,
      );
    }
  }

  async delete(serviceName: ArcaServiceName): Promise<void> {
    const filePath = this.getTicketFilePath(serviceName);

    try {
      await fs.unlink(filePath);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
  }
}
