import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IconsultarCtasCtesInput,
  IconsultarCtasCtesOutput,
} from "@application/dto/fecred";

export class ConsultarCtasCtesUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(
    input: IconsultarCtasCtesInput,
  ): Promise<IconsultarCtasCtesOutput> {
    return this.repository.consultarCtasCtes(input);
  }
}
