import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IobtenerRemitosInput,
  IobtenerRemitosOutput,
} from "@application/dto/fecred";

export class ObtenerRemitosUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(input: IobtenerRemitosInput): Promise<IobtenerRemitosOutput> {
    return this.repository.obtenerRemitos(input);
  }
}
