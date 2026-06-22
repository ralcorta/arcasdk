
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { SalesPointsResultDto } from "@application/dto/electronic-billing";

export class GetSalesPointsUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(): Promise<SalesPointsResultDto> {
    return this.electronicBillingRepository.getSalesPoints();
  }
}
