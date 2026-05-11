import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IconsultarObligadoRecepcionInput,
  IconsultarObligadoRecepcionOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class ConsultarObligadoRecepcionUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(
    input: IconsultarObligadoRecepcionInput,
  ): Promise<IconsultarObligadoRecepcionOutput> {
    return this.repository.consultarObligadoRecepcion(input);
  }
}
