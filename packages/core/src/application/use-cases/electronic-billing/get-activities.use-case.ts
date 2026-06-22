
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { ActivitiesResultDto } from "@application/dto/electronic-billing";

export class GetActivitiesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(): Promise<ActivitiesResultDto> {
    return this.electronicBillingRepository.getActivities();
  }
}
