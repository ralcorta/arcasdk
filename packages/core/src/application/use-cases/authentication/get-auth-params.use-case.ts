/**
 * Get Auth Params Use Case
 * Gets authentication parameters formatted for SOAP requests
 */
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { WSAuthParam, GetAuthParamsInput } from "@application/types";

export class GetAuthParamsUseCase {
  constructor(
    private readonly authenticationRepository: IAuthenticationRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @param input Ticket and CUIT
   * @returns WSAuthParam formatted for SOAP
   */
  async execute(input: GetAuthParamsInput): Promise<WSAuthParam> {
    return this.authenticationRepository.getAuthParams(
      input.ticket,
      input.cuit
    );
  }
}
