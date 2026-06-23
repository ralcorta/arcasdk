
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { OptionalTypesResultDto } from "@application/dto/electronic-billing";

export class GetOptionalTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(): Promise<OptionalTypesResultDto> {
    return this.electronicBillingRepository.getOptionalTypes();
  }
}

