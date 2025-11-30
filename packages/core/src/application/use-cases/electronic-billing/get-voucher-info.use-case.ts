/**
 * Get Voucher Info Use Case
 * Retrieves information about a specific voucher
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { VoucherInfoResultDto } from "@application/dto/electronic-billing.dto";
import { GetVoucherInfoInput } from "@application/types";

export class GetVoucherInfoUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @param input Voucher number, sales point, and type
   * @returns Voucher information or null if not found
   */
  async execute(
    input: GetVoucherInfoInput
  ): Promise<VoucherInfoResultDto | null> {
    return this.electronicBillingRepository.getVoucherInfo(
      input.number,
      input.salesPoint,
      input.type
    );
  }
}
