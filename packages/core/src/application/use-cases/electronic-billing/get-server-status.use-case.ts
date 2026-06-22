/**
 * Get Server Status Use Case
 * Retrieves the status of AFIP/ARCA servers
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { ServerStatus } from "@application/dto/common";

export class GetServerStatusUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @returns Server status information
   */
  async execute(): Promise<ServerStatus> {
    return this.electronicBillingRepository.getServerStatus();
  }
}
