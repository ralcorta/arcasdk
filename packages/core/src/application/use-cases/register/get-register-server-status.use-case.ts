import { IRegisterBaseRepositoryPort } from "@application/ports/register/register-repository.ports";
import { ServerStatus } from "@application/dto/register";

export class GetRegisterServerStatusUseCase {
  constructor(private readonly repository: IRegisterBaseRepositoryPort) {}

  /**
   * Execute the use case
   * @returns Register server status
   */
  async execute(): Promise<ServerStatus> {
    return this.repository.getServerStatus();
  }
}
