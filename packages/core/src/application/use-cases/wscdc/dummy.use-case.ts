import { ICdcRepositoryPort } from "@application/ports/cdc/cdc-repository.port";
import { IComprobanteDummyOutput } from "@application/dto/cdc";

export class CdcDummyUseCase {
  constructor(private readonly repository: ICdcRepositoryPort) {}

  async execute(): Promise<IComprobanteDummyOutput> {
    return this.repository.dummy();
  }
}
