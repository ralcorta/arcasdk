
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { QuotationResultDto } from "@application/dto/electronic-billing";

export class GetQuotationUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(currencyId: string): Promise<QuotationResultDto> {
    return this.electronicBillingRepository.getQuotation(currencyId);
  }
}
