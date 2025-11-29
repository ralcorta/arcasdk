/**
 * Get Last Voucher Use Case
 * Retrieves the last authorized voucher number for a sales point and voucher type
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { LastVoucherResultDto } from "@application/dto/electronic-billing.dto";
import { GetLastVoucherInput } from "@application/types";

export class GetLastVoucherUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @param input Sales point and voucher type
   * @returns Last voucher information
   */
  async execute(input: GetLastVoucherInput): Promise<LastVoucherResultDto> {
    return this.electronicBillingRepository.getLastVoucher(
      input.salesPoint,
      input.voucherType
    );
  }
}
