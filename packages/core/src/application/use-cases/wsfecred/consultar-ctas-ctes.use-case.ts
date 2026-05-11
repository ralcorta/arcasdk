import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IconsultarCtasCtesInput,
  IconsultarCtasCtesOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class ConsultarCtasCtesUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(
    input: IconsultarCtasCtesInput,
  ): Promise<IconsultarCtasCtesOutput> {
    return this.repository.consultarCtasCtes(input);
  }
}
