/**
 * Auth Repository Port
 * Outbound port for authentication operations
 */
import { AccessTicket } from "@domain/entities/access-ticket.entity";
import { WSAuthParam } from "@application/types";

export interface IAuthRepositoryPort {
  /**
   * Request a new login ticket for a service
   * @param serviceName Service name to authenticate for
   * @returns AccessTicket
   */
  requestLogin(serviceName: string): Promise<AccessTicket>;

  /**
   * Get authentication parameters formatted for SOAP requests
   * @param ticket Access ticket
   * @param cuit CUIT number
   * @returns WSAuthParam formatted for SOAP
   */
  getAuthParams(ticket: AccessTicket, cuit: number): WSAuthParam;
}
