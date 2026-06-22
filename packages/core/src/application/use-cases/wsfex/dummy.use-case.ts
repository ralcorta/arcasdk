import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import { IFEXDummyOutput } from "@application/dto/fex";

export class FexDummyUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(): Promise<IFEXDummyOutput> {
    return this.repository.dummy();
  }
}
