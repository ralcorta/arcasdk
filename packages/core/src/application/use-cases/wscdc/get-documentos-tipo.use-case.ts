import { ICdcRepositoryPort } from "@application/ports/cdc/cdc-repository.port";
import { IDocumentosTipoConsultarOutput } from "@application/dto/cdc";

export class GetDocumentosTipoUseCase {
  constructor(private readonly repository: ICdcRepositoryPort) {}

  async execute(): Promise<IDocumentosTipoConsultarOutput> {
    return this.repository.getDocumentosTipo();
  }
}
