import { IRegisterBaseRepositoryPort } from "@application/ports/register/register-repository.ports";
import { ServerStatus } from "@application/dto/register";

export class GetRegisterServerStatusUseCase {
  constructor(private readonly repository: IRegisterBaseRepositoryPort) {}

  
  async execute(): Promise<ServerStatus> {
    return this.repository.getServerStatus();
  }
}
