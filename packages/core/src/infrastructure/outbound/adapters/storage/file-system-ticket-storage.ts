/**
 * File System Ticket Storage
 * Implements ITicketStoragePort using the file system
 */
import { ITicketStoragePort } from "@infrastructure/outbound/ports/storage/ticket-storage.port";
import { AccessTicket } from "@domain/entities/access-ticket.entity";
import { promises as fs } from "fs";
import { resolve } from "path";
import { FileSystemTicketStorageConfig } from "@infrastructure/outbound/ports/storage/ticket-storage.types";

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

  async save(ticket: AccessTicket, serviceName: string): Promise<void> {
    try {
      await fs.mkdir(this.ticketPath, { recursive: true });
    } catch (error: any) {
      throw new Error(`Failed to create tickets directory: ${error.message}`);
    }

    const filePath = this.getTicketFilePath(serviceName);
    const ticketData = {
      header: ticket.getHeaders(),
      credentials: ticket.getCredentials(),
    };

    await fs.writeFile(filePath, JSON.stringify(ticketData, null, 2), "utf8");
  }

  async get(serviceName: string): Promise<AccessTicket | null> {
    const filePath = this.getTicketFilePath(serviceName);

    try {
      await fs.access(filePath, fs.constants.F_OK);
    } catch {
      return null; // File doesn't exist
    }

    try {
      await fs.access(filePath, fs.constants.R_OK);
    } catch (error: any) {
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
    } catch (error: any) {
      throw new Error(`Invalid access ticket format: ${error.message}`);
    }
  }

  async delete(serviceName: string): Promise<void> {
    const filePath = this.getTicketFilePath(serviceName);

    try {
      await fs.unlink(filePath);
    } catch (error: any) {
      if (error.code !== "ENOENT") {
        throw new Error(`Failed to delete ticket file: ${error.message}`);
      }
      // File doesn't exist, that's okay
    }
  }
}
