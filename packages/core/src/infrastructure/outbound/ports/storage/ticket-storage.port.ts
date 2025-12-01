/**
 * Ticket Storage Port
 * Outbound port for ticket storage operations
 */
import { AccessTicket } from "@domain/entities/access-ticket.entity";

export interface ITicketStoragePort {
  /**
   * Save an access ticket
   * @param ticket Access ticket to save
   * @param serviceName Service name identifier
   */
  save(ticket: AccessTicket, serviceName: string): Promise<void>;

  /**
   * Get an access ticket
   * @param serviceName Service name identifier
   * @returns AccessTicket or null if not found
   */
  get(serviceName: string): Promise<AccessTicket | null>;

  /**
   * Delete an access ticket
   * @param serviceName Service name identifier
   */
  delete(serviceName: string): Promise<void>;
}
