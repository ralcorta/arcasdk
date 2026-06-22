import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IconsultarMontoObligadoRecepcionInput,
  IconsultarMontoObligadoRecepcionOutput,
} from "@application/dto/fecred";

export class ConsultarMontoObligadoRecepcionUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(
    input: IconsultarMontoObligadoRecepcionInput,
  ): Promise<IconsultarMontoObligadoRecepcionOutput> {
    return this.repository.consultarMontoObligadoRecepcion(input);
  }
}
