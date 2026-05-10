import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import { IdummyOutput } from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class FecredDummyUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(): Promise<IdummyOutput> {
    return this.repository.dummy();
  }
}
