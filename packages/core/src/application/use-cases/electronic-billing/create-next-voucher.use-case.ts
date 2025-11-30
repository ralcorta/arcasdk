/**
 * Create Next Voucher Use Case
 * Creates the next voucher by getting the last voucher number and creating a new one
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { Voucher } from "@domain/entities/voucher.entity";
import { ICreateVoucherResult } from "@application/types/result.types";
import { INextVoucher } from "@domain/types/voucher.types";

export class CreateNextVoucherUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @param nextVoucherData Next voucher data (without CbteDesde/CbteHasta)
   * @returns Created voucher result with CAE
   */
  async execute(nextVoucherData: INextVoucher): Promise<ICreateVoucherResult> {
    // Get last voucher number
    const lastVoucher = await this.electronicBillingRepository.getLastVoucher(
      nextVoucherData.PtoVta!,
      nextVoucherData.CbteTipo
    );

    const lastVoucherNumber = lastVoucher.cbteNro || 0;
    const nextVoucherNumber = lastVoucherNumber + 1;

    // Build complete voucher data
    const voucherData: INextVoucher = {
      ...nextVoucherData,
      CbteDesde: nextVoucherNumber,
      CbteHasta: nextVoucherNumber,
    };

    // Create domain entity
    const voucher = Voucher.create(voucherData as any);

    // Use repository to create voucher
    return this.electronicBillingRepository.createVoucher(voucher);
  }
}
