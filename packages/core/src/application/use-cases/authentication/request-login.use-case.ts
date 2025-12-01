/**
 * Request Login Use Case
 * Forces a new login request (ignores existing tickets)
 */
import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { AccessTicket } from "@domain/entities/access-ticket.entity";

export class RequestLoginUseCase {
  constructor(
    private readonly authenticationRepository: IAuthenticationRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @param serviceName Service name to authenticate for
   * @returns AccessTicket (newly requested)
   */
  async execute(serviceName: string): Promise<AccessTicket> {
    return this.authenticationRepository.requestLogin(serviceName);
  }
}
