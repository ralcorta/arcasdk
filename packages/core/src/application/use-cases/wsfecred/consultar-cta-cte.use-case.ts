import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IconsultarCtaCteInput,
  IconsultarCtaCteOutput,
} from "@application/dto/fecred";

export class ConsultarCtaCteUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(input: IconsultarCtaCteInput): Promise<IconsultarCtaCteOutput> {
    return this.repository.consultarCtaCte(input);
  }
}
