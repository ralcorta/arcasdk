import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import { IconsultarTiposAjustesOperacionOutput } from "@application/dto/fecred";

export class ConsultarTiposAjustesOperacionUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(): Promise<IconsultarTiposAjustesOperacionOutput> {
    return this.repository.consultarTiposAjustesOperacion();
  }
}
