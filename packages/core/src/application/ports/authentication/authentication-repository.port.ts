import { AccessTicket } from "@domain/entities/access-ticket.entity";
import { WSAuthParam } from "@application/types";
import { ArcaServiceName } from "@application/types/service-name.types";

export interface IAuthenticationRepositoryPort {
  /**
   * Login and get access ticket for a service
   * Handles automatic ticket management (checking existing, requesting new if needed)
   * @param serviceName Service name to authenticate for
   * @returns AccessTicket
   */
  login(serviceName: ArcaServiceName): Promise<AccessTicket>;

  /**
   * Request a new login ticket for a service (forces new login)
   * @param serviceName Service name to authenticate for
   * @returns AccessTicket
   */
  requestLogin(serviceName: ArcaServiceName): Promise<AccessTicket>;

  /**
   * Get authentication parameters formatted for SOAP requests
   * @param ticket Access ticket
   * @param cuit CUIT number
   * @returns WSAuthParam formatted for SOAP
   */
  getAuthParams(ticket: AccessTicket, cuit: number): WSAuthParam;
}
