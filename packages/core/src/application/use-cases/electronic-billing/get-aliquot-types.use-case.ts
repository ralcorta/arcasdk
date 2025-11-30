/**
 * Get Aliquot Types Use Case
 * Retrieves available aliquot (IVA) types from AFIP/ARCA
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { AliquotTypesResultDto } from "@application/dto/electronic-billing.dto";

export class GetAliquotTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @returns Aliquot types information
   */
  async execute(): Promise<AliquotTypesResultDto> {
    return this.electronicBillingRepository.getAliquotTypes();
  }
}

