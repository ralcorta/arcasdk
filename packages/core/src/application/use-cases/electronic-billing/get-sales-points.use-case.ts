/**
 * Get Sales Points Use Case
 * Retrieves available sales points from AFIP/ARCA
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { SalesPointsResultDto } from "@application/dto/electronic-billing.dto";

export class GetSalesPointsUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @returns Sales points information
   */
  async execute(): Promise<SalesPointsResultDto> {
    return this.electronicBillingRepository.getSalesPoints();
  }
}
