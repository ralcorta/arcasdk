import { ILoginCredentials } from "@domain/types/auth.types";
import { LoginTicketResponse } from "@application/dto/authentication/login-ticket-response.types";

export function mapLoginTicketResponse(
  parsed: LoginTicketResponse,
): ILoginCredentials {
  const { header, credentials } = parsed.loginticketresponse;
  return {
    header: [header[0], header[1]],
    credentials,
  };
}
