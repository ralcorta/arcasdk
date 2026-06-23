
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { CaeaNoMovementResultDto } from "@application/dto/electronic-billing";

export class InformCaeaNoMovementUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(
    caea: string,
    salesPoint: number
  ): Promise<CaeaNoMovementResultDto> {
    return this.electronicBillingRepository.informCaeaNoMovement(
      caea,
      salesPoint
    );
  }
}
