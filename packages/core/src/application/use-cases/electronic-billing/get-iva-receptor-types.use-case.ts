
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { IvaReceptorTypesResultDto } from "@application/dto/electronic-billing";

export class GetIvaReceptorTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(claseCmp?: string): Promise<IvaReceptorTypesResultDto> {
    return this.electronicBillingRepository.getIvaReceptorTypes(claseCmp);
  }
}
