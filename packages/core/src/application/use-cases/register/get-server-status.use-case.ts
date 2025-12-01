/**
 * Get Server Status Use Case (Register)
 * Retrieves the status of AFIP/ARCA register servers
 */
import { IRegisterRepositoryPort } from "@application/ports/register/register-repository.port";
import { RegisterServerStatusDto } from "@application/dto/register.dto";
import { GetRegisterServerStatusInput } from "@application/types";

export class GetRegisterServerStatusUseCase {
  constructor(private readonly registerRepository: IRegisterRepositoryPort) {}

  /**
   * Execute the use case
   * @param input Register scope
   * @returns Server status information
   */
  async execute(
    input: GetRegisterServerStatusInput
  ): Promise<RegisterServerStatusDto> {
    return this.registerRepository.getServerStatus(input.scope);
  }
}
