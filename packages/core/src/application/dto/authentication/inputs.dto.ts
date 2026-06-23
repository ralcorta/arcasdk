import { AccessTicket } from "@domain/entities/access-ticket.entity";

export interface GetAuthParamsInput {
  ticket: AccessTicket;
  cuit: number;
}
