import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IconsultarHistorialEstadosComprobanteInput,
  IconsultarHistorialEstadosComprobanteOutput,
} from "@application/dto/fecred";

export class ConsultarHistorialEstadosComprobanteUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(
    input: IconsultarHistorialEstadosComprobanteInput,
  ): Promise<IconsultarHistorialEstadosComprobanteOutput> {
    return this.repository.consultarHistorialEstadosComprobante(input);
  }
}
