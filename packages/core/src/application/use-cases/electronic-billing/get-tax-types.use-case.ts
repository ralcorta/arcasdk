/**
 * Get Tax Types Use Case
 * Retrieves available tax types from AFIP/ARCA
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { TaxTypesResultDto } from "@application/dto/electronic-billing.dto";

export class GetTaxTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @returns Tax types information
   */
  async execute(): Promise<TaxTypesResultDto> {
    return this.electronicBillingRepository.getTaxTypes();
  }
}

