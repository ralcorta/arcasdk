import { ICdcRepositoryPort } from "@application/ports/cdc/cdc-repository.port";
import { IOpcionalesTipoConsultarOutput } from "@application/dto/cdc";

export class GetOpcionalesTipoUseCase {
  constructor(private readonly repository: ICdcRepositoryPort) {}

  async execute(): Promise<IOpcionalesTipoConsultarOutput> {
    return this.repository.getOpcionalesTipo();
  }
}
