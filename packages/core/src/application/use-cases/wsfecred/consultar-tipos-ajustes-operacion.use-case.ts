import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import { IconsultarTiposAjustesOperacionOutput } from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class ConsultarTiposAjustesOperacionUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(): Promise<IconsultarTiposAjustesOperacionOutput> {
    return this.repository.consultarTiposAjustesOperacion();
  }
}
