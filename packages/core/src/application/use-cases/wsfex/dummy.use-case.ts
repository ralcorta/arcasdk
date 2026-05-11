import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import { IFEXDummyOutput } from "@infrastructure/outbound/ports/soap/interfaces/FEXService/ServiceSoap";

export class FexDummyUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(): Promise<IFEXDummyOutput> {
    return this.repository.dummy();
  }
}
