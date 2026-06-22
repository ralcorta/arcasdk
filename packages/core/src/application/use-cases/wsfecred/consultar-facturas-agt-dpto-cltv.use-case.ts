import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IconsultarFacturasAgtDptoCltvInput,
  IconsultarFacturasAgtDptoCltvOutput,
} from "@application/dto/fecred";

export class ConsultarFacturasAgtDptoCltvUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(
    input: IconsultarFacturasAgtDptoCltvInput,
  ): Promise<IconsultarFacturasAgtDptoCltvOutput> {
    return this.repository.consultarFacturasAgtDptoCltv(input);
  }
}
