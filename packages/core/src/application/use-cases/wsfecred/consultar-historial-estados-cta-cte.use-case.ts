import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IconsultarHistorialEstadosCtaCteInput,
  IconsultarHistorialEstadosCtaCteOutput,
} from "@application/dto/fecred";

export class ConsultarHistorialEstadosCtaCteUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(
    input: IconsultarHistorialEstadosCtaCteInput,
  ): Promise<IconsultarHistorialEstadosCtaCteOutput> {
    return this.repository.consultarHistorialEstadosCtaCte(input);
  }
}
