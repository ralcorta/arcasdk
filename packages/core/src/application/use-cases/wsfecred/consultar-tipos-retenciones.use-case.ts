import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import { IconsultarTiposRetencionesOutput } from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class ConsultarTiposRetencionesUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(): Promise<IconsultarTiposRetencionesOutput> {
    return this.repository.consultarTiposRetenciones();
  }
}
