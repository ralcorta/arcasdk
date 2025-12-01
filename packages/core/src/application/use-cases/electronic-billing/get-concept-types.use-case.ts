/**
 * Get Concept Types Use Case
 * Retrieves available concept types from AFIP/ARCA
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { ConceptTypesResultDto } from "@application/dto/electronic-billing.dto";

export class GetConceptTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @returns Concept types information
   */
  async execute(): Promise<ConceptTypesResultDto> {
    return this.electronicBillingRepository.getConceptTypes();
  }
}
