/**
 * Get Register Server Status Use Case
 * Retrieves the status of the register servers
 */
import { IRegisterBaseRepositoryPort } from "@application/ports/register/register-repository.ports";
import { RegisterServerStatusDto } from "@application/dto/register.dto";

export class GetRegisterServerStatusUseCase {
  constructor(private readonly repository: IRegisterBaseRepositoryPort) {}

  /**
   * Execute the use case
   * @returns Register server status
   */
  async execute(): Promise<RegisterServerStatusDto> {
    return this.repository.getServerStatus();
  }
}
