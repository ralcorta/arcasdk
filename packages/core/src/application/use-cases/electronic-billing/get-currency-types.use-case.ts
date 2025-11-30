/**
 * Get Currency Types Use Case
 * Retrieves available currency types from AFIP/ARCA
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { CurrencyTypesResultDto } from "@application/dto/electronic-billing.dto";

export class GetCurrencyTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @returns Currency types information
   */
  async execute(): Promise<CurrencyTypesResultDto> {
    return this.electronicBillingRepository.getCurrencyTypes();
  }
}
