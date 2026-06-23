import { AccessTicket } from "@domain/entities/access-ticket.entity";
import { accessTicketToWSAuthParam } from "@application/helpers/access-ticket-auth";
import { mockLoginCredentials } from "../../../mocks/data/credential-json.mock";

describe("accessTicketToWSAuthParam", () => {
  it("formats ticket for SOAP authentication with valid CUIT", () => {
    const ticket = AccessTicket.create(mockLoginCredentials);
    const wsAuth = accessTicketToWSAuthParam(ticket, 20111111112);

    expect(wsAuth).toHaveProperty("Auth");
    expect(wsAuth.Auth).toHaveProperty("Token");
    expect(wsAuth.Auth).toHaveProperty("Sign");
    expect(wsAuth.Auth).toHaveProperty("Cuit");
    expect(wsAuth.Auth.Cuit).toBe(20111111112);
  });

  it("throws error with invalid CUIT", () => {
    const ticket = AccessTicket.create(mockLoginCredentials);
    expect(() => accessTicketToWSAuthParam(ticket, 0)).toThrow(/CUIT/i);
  });

  it("throws error with negative CUIT", () => {
    const ticket = AccessTicket.create(mockLoginCredentials);
    expect(() => accessTicketToWSAuthParam(ticket, -1)).toThrow(/CUIT/i);
  });

  it("throws error with null CUIT", () => {
    const ticket = AccessTicket.create(mockLoginCredentials);
    expect(() => accessTicketToWSAuthParam(ticket, null as any)).toThrow(
      /CUIT/i,
    );
  });
});
