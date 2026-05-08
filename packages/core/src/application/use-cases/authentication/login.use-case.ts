import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { AccessTicket } from "@domain/entities/access-ticket.entity";

export class LoginUseCase {
  constructor(
    private readonly authenticationRepository: IAuthenticationRepositoryPort,
  ) {}

  /**
   * Execute the use case
   * @param serviceName Service name to authenticate for
   * @returns AccessTicket
   */
  async execute(serviceName: string): Promise<AccessTicket> {
    return this.authenticationRepository.login(serviceName);
  }
}
