/**
 * Get Max Records Use Case
 * Retrieves the maximum number of records allowed per request
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { MaxRecordsResultDto } from "@application/dto/electronic-billing.dto";

export class GetMaxRecordsUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Get Max Records
   * @returns Max records number
   */
  async execute(): Promise<MaxRecordsResultDto> {
    return this.electronicBillingRepository.getMaxRecordsPerRequest();
  }
}
