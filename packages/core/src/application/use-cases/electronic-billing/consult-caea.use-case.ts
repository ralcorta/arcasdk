/**
 * Consult CAEA Use Case
 * Consults an Anticipated Electronic Authorization Code (CAEA)
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { CaeaResultDto } from "@application/dto/electronic-billing.dto";

export class ConsultCaeaUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Consult CAEA
   * @param period Period (YYYYMM)
   * @param order Fortnight (1 or 2)
   * @returns CAEA information
   */
  async execute(period: number, order: number): Promise<CaeaResultDto> {
    return this.electronicBillingRepository.consultCaea(period, order);
  }
}
