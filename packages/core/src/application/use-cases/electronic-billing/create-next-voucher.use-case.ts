
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { Voucher } from "@domain/entities/voucher.entity";
import { CreateVoucherResultDto } from "@application/dto/electronic-billing";
import { VoucherNumber } from "@domain/value-objects/voucher-number.vo";
import {
  INextVoucher,
  IVoucher as IVoucherData,
} from "@domain/types/voucher.types";

export class CreateNextVoucherUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort,
  ) {}

  
  async execute(nextVoucherData: INextVoucher): Promise<CreateVoucherResultDto> {
    const lastVoucher = await this.electronicBillingRepository.getLastVoucher(
      nextVoucherData.PtoVta!,
      nextVoucherData.CbteTipo,
    );

    const lastNumber = lastVoucher.cbteNro || 0;
    const nextVoucherNumber =
      lastNumber === 0
        ? VoucherNumber.create(1).getValue()
        : VoucherNumber.create(lastNumber).next().getValue();

    const voucherData: IVoucherData = {
      ...nextVoucherData,
      CbteDesde: nextVoucherNumber,
      CbteHasta: nextVoucherNumber,
    };

    const voucher = Voucher.create(voucherData);

    return this.electronicBillingRepository.createVoucher(voucher);
  }
}
