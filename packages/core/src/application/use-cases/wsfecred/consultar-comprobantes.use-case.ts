import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IconsultarComprobantesInput,
  IconsultarComprobantesOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class ConsultarComprobantesUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(
    input: IconsultarComprobantesInput,
  ): Promise<IconsultarComprobantesOutput> {
    return this.repository.consultarComprobantes(input);
  }
}
