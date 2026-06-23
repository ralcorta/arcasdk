
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { AliquotTypesResultDto } from "@application/dto/electronic-billing";

export class GetAliquotTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(): Promise<AliquotTypesResultDto> {
    return this.electronicBillingRepository.getAliquotTypes();
  }
}

