/**
 * Create Voucher Use Case
 * Creates a new electronic voucher
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { Voucher } from "@domain/entities/voucher.entity";
import { ICreateVoucherResult } from "@application/types/result.types";
import { IVoucher } from "@domain/types/voucher.types";

export class CreateVoucherUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @param voucherData Voucher data
   * @returns Created voucher result with CAE
   */
  async execute(voucherData: IVoucher): Promise<ICreateVoucherResult> {
    // Create domain entity from data
    const voucher = Voucher.create(voucherData);

    // Use repository to create voucher
    return this.electronicBillingRepository.createVoucher(voucher);
  }
}
