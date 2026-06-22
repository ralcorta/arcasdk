import { Voucher } from "@domain/entities/voucher.entity";
import { IVoucher } from "@domain/types/voucher.types";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { CaeaUsageResultDto } from "@application/dto/electronic-billing";

export class InformCaeaUsageUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(
    voucherData: IVoucher,
    caea: string
  ): Promise<CaeaUsageResultDto> {
    const voucher = Voucher.create(voucherData);
    return this.electronicBillingRepository.informCaeaUsage(voucher, caea);
  }
}
