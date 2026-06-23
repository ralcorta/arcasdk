import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { ArcaServiceName } from "@application/types/service-name.types";
import { AccessTicket } from "@domain/entities/access-ticket.entity";

export class RequestLoginUseCase {
  constructor(
    private readonly authenticationRepository: IAuthenticationRepositoryPort,
  ) {}

  
  async execute(serviceName: ArcaServiceName): Promise<AccessTicket> {
    return this.authenticationRepository.requestLogin(serviceName);
  }
}
