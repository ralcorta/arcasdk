/**
 * Get Document Types Use Case
 * Retrieves available document types from AFIP/ARCA
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { DocumentTypesResultDto } from "@application/dto/electronic-billing.dto";

export class GetDocumentTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @returns Document types information
   */
  async execute(): Promise<DocumentTypesResultDto> {
    return this.electronicBillingRepository.getDocumentTypes();
  }
}
