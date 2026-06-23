
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { CurrencyTypesResultDto } from "@application/dto/electronic-billing";

export class GetCurrencyTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(): Promise<CurrencyTypesResultDto> {
    return this.electronicBillingRepository.getCurrencyTypes();
  }
}
