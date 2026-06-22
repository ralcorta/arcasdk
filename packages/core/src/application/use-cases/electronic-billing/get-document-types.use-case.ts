
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { DocumentTypesResultDto } from "@application/dto/electronic-billing";

export class GetDocumentTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(): Promise<DocumentTypesResultDto> {
    return this.electronicBillingRepository.getDocumentTypes();
  }
}
