import { ICdcRepositoryPort } from "@application/ports/cdc/cdc-repository.port";
import { IComprobantesModalidadConsultarOutput } from "@application/dto/cdc";

export class GetComprobantesModalidadUseCase {
  constructor(private readonly repository: ICdcRepositoryPort) {}

  async execute(): Promise<IComprobantesModalidadConsultarOutput> {
    return this.repository.getComprobantesModalidad();
  }
}
