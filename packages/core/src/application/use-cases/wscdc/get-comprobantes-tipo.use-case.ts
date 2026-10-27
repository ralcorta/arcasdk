import { ICdcRepositoryPort } from "@application/ports/cdc/cdc-repository.port";
import { IComprobantesTipoConsultarOutput } from "@application/dto/cdc";

export class GetComprobantesTipoUseCase {
  constructor(private readonly repository: ICdcRepositoryPort) {}

  async execute(): Promise<IComprobantesTipoConsultarOutput> {
    return this.repository.getComprobantesTipo();
  }
}
