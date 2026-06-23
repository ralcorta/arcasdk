
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { TaxTypesResultDto } from "@application/dto/electronic-billing";

export class GetTaxTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(): Promise<TaxTypesResultDto> {
    return this.electronicBillingRepository.getTaxTypes();
  }
}

