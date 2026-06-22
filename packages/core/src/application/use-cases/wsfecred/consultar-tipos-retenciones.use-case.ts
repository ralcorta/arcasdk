import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import { IconsultarTiposRetencionesOutput } from "@application/dto/fecred";

export class ConsultarTiposRetencionesUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(): Promise<IconsultarTiposRetencionesOutput> {
    return this.repository.consultarTiposRetenciones();
  }
}
