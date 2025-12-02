/**
 * Get Iva Receptor Types Use Case
 * Retrieves available IVA receptor types from AFIP/ARCA
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { IvaReceptorTypesResultDto } from "@application/dto/electronic-billing.dto";

export class GetIvaReceptorTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @param claseCmp Voucher class (optional)
   * @returns IVA receptor types information
   */
  async execute(claseCmp?: string): Promise<IvaReceptorTypesResultDto> {
    return this.electronicBillingRepository.getIvaReceptorTypes(claseCmp);
  }
}
