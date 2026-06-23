import { AccessTicket } from "@domain/entities/access-ticket.entity";
import { ArcaServiceName } from "@application/types/service-name.types";

export interface ITicketStoragePort {
  save(ticket: AccessTicket, serviceName: ArcaServiceName): Promise<void>;
  get(serviceName: ArcaServiceName): Promise<AccessTicket | null>;
  delete(serviceName: ArcaServiceName): Promise<void>;
}
