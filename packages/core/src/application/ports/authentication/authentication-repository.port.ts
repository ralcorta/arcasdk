import { AccessTicket } from "@domain/entities/access-ticket.entity";
import { WSAuthParam } from "@application/types";
import { ArcaServiceName } from "@application/types/service-name.types";

export interface IAuthenticationRepositoryPort {
  
  login(serviceName: ArcaServiceName): Promise<AccessTicket>;

  
  requestLogin(serviceName: ArcaServiceName): Promise<AccessTicket>;

  
  getAuthParams(ticket: AccessTicket, cuit: number): WSAuthParam;
}
