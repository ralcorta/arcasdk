/**
 * Get CAEA Use Case
 * Requests an Anticipated Electronic Authorization Code (CAEA)
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { CaeaResultDto } from "@application/dto/electronic-billing.dto";

export class GetCaeaUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Request CAEA
   * @param period Period (YYYYMM)
   * @param order Fortnight (1 or 2)
   * @returns CAEA information
   */
  async execute(period: number, order: number): Promise<CaeaResultDto> {
    return this.electronicBillingRepository.getCaea(period, order);
  }
}
