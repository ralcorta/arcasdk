
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { ConceptTypesResultDto } from "@application/dto/electronic-billing";

export class GetConceptTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(): Promise<ConceptTypesResultDto> {
    return this.electronicBillingRepository.getConceptTypes();
  }
}
