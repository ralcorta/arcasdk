
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { VoucherTypesResultDto } from "@application/dto/electronic-billing";

export class GetVoucherTypesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(): Promise<VoucherTypesResultDto> {
    return this.electronicBillingRepository.getVoucherTypes();
  }
}
