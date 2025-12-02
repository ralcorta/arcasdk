/**
 * Consult CAEA No Movement Use Case
 * Consults if a CAEA was informed as having no movements
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { CaeaNoMovementResultDto } from "@application/dto/electronic-billing.dto";

export class ConsultCaeaNoMovementUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Consult CAEA No Movement
   * @param caea CAEA number
   * @param salesPoint Sales point number
   * @returns CAEA No Movement information
   */
  async execute(
    caea: string,
    salesPoint: number
  ): Promise<CaeaNoMovementResultDto> {
    return this.electronicBillingRepository.consultCaeaNoMovement(
      caea,
      salesPoint
    );
  }
}
