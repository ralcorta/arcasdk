/**
 * Get Voucher Types Use Case
 * Retrieves available voucher types from AFIP/ARCA
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { VoucherTypesResultDto } from "@application/dto/electronic-billing.dto";

export class GetVoucherTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @returns Voucher types information
   */
  async execute(): Promise<VoucherTypesResultDto> {
    return this.electronicBillingRepository.getVoucherTypes();
  }
}
