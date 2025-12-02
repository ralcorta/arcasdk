/**
 * Get Activities Use Case
 * Retrieves the list of available activities
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { ActivitiesResultDto } from "@application/dto/electronic-billing.dto";

export class GetActivitiesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Get Activities
   * @returns Activities information
   */
  async execute(): Promise<ActivitiesResultDto> {
    return this.electronicBillingRepository.getActivities();
  }
}
