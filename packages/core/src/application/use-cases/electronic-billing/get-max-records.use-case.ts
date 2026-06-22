
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { MaxRecordsResultDto } from "@application/dto/electronic-billing";

export class GetMaxRecordsUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(): Promise<MaxRecordsResultDto> {
    return this.electronicBillingRepository.getMaxRecordsPerRequest();
  }
}
