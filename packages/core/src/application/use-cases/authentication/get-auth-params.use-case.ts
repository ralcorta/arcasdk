import { IAuthenticationRepositoryPort } from "@application/ports/authentication/authentication-repository.port";
import { GetAuthParamsInput } from "@application/dto/authentication";
import { WSAuthParam } from "@application/types";

export class GetAuthParamsUseCase {
  constructor(
    private readonly authenticationRepository: IAuthenticationRepositoryPort,
  ) {}

  
  async execute(input: GetAuthParamsInput): Promise<WSAuthParam> {
    return this.authenticationRepository.getAuthParams(
      input.ticket,
      input.cuit,
    );
  }
}
