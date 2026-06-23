
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { LastVoucherResultDto } from "@application/dto/electronic-billing";
import { GetLastVoucherInput } from "@application/dto/electronic-billing";

export class GetLastVoucherUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(input: GetLastVoucherInput): Promise<LastVoucherResultDto> {
    return this.electronicBillingRepository.getLastVoucher(
      input.salesPoint,
      input.voucherType
    );
  }
}
