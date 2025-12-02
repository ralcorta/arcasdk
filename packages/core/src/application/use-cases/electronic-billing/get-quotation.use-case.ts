/**
 * Get Quotation Use Case
 * Retrieves the quotation for a specific currency
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { QuotationResultDto } from "@application/dto/electronic-billing.dto";

export class GetQuotationUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Get Quotation
   * @param currencyId Currency ID
   * @returns Quotation information
   */
  async execute(currencyId: string): Promise<QuotationResultDto> {
    return this.electronicBillingRepository.getQuotation(currencyId);
  }
}
