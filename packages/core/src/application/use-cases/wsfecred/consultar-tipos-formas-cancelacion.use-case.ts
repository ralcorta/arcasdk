import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import { IconsultarTiposFormasCancelacionOutput } from "@application/dto/fecred";

export class ConsultarTiposFormasCancelacionUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(): Promise<IconsultarTiposFormasCancelacionOutput> {
    return this.repository.consultarTiposFormasCancelacion();
  }
}
