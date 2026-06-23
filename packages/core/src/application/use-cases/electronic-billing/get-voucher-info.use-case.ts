
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { VoucherInfoResultDto } from "@application/dto/electronic-billing";
import { GetVoucherInfoInput } from "@application/dto/electronic-billing";

export class GetVoucherInfoUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
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
