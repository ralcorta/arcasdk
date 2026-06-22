import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import { IconsultarTiposMotivosRechazoOutput } from "@application/dto/fecred";

export class ConsultarTiposMotivosRechazoUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(): Promise<IconsultarTiposMotivosRechazoOutput> {
    return this.repository.consultarTiposMotivosRechazo();
  }
}
