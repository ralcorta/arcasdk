import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import { IconsultarTiposMotivosRechazoOutput } from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class ConsultarTiposMotivosRechazoUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(): Promise<IconsultarTiposMotivosRechazoOutput> {
    return this.repository.consultarTiposMotivosRechazo();
  }
}
