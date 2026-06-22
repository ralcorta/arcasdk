import { AccessTicket } from "@domain/entities/access-ticket.entity";
import { WSAuthParam } from "@application/types";

export function accessTicketToWSAuthParam(
  ticket: AccessTicket,
  cuit: number,
): WSAuthParam {
  if (!cuit || cuit <= 0) {
    throw new Error("Invalid CUIT provided");
  }

  return {
    Auth: {
      Token: ticket.getToken(),
      Sign: ticket.getSign(),
      Cuit: cuit,
    },
  };
}
