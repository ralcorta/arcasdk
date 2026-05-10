import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IconsultarCtaCteInput,
  IconsultarCtaCteOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class ConsultarCtaCteUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(input: IconsultarCtaCteInput): Promise<IconsultarCtaCteOutput> {
    return this.repository.consultarCtaCte(input);
  }
}
