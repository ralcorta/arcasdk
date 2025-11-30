/**
 * Get Optional Types Use Case
 * Retrieves available optional types from AFIP/ARCA
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { OptionalTypesResultDto } from "@application/dto/electronic-billing.dto";

export class GetOptionalTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @returns Optional types information
   */
  async execute(): Promise<OptionalTypesResultDto> {
    return this.electronicBillingRepository.getOptionalTypes();
  }
}

