
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { CaeaResultDto } from "@application/dto/electronic-billing";

export class GetCaeaUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(period: number, order: number): Promise<CaeaResultDto> {
    return this.electronicBillingRepository.getCaea(period, order);
  }
}
