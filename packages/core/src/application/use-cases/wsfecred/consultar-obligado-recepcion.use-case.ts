import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IconsultarObligadoRecepcionInput,
  IconsultarObligadoRecepcionOutput,
} from "@application/dto/fecred";

export class ConsultarObligadoRecepcionUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(
    input: IconsultarObligadoRecepcionInput,
  ): Promise<IconsultarObligadoRecepcionOutput> {
    return this.repository.consultarObligadoRecepcion(input);
  }
}
