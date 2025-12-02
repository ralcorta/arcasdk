/**
 * Inform CAEA No Movement Use Case
 * Informs that a CAEA had no movements
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { CaeaNoMovementResultDto } from "@application/dto/electronic-billing.dto";

export class InformCaeaNoMovementUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Inform CAEA No Movement
   * @param caea CAEA number
   * @param salesPoint Sales point number
   * @returns CAEA No Movement information
   */
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
