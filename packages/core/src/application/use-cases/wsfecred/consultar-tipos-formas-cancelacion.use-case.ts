import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import { IconsultarTiposFormasCancelacionOutput } from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class ConsultarTiposFormasCancelacionUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(): Promise<IconsultarTiposFormasCancelacionOutput> {
    return this.repository.consultarTiposFormasCancelacion();
  }
}
