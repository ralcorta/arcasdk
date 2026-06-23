
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { ServerStatus } from "@application/dto/common";

export class GetServerStatusUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(): Promise<ServerStatus> {
    return this.electronicBillingRepository.getServerStatus();
  }
}
