
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { Voucher } from "@domain/entities/voucher.entity";
import { CreateVoucherResultDto } from "@application/dto/electronic-billing";
import { IVoucher } from "@domain/types/voucher.types";

export class CreateVoucherUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(voucherData: IVoucher): Promise<CreateVoucherResultDto> {
    const voucher = Voucher.create(voucherData);
    return this.electronicBillingRepository.createVoucher(voucher);
  }
}
