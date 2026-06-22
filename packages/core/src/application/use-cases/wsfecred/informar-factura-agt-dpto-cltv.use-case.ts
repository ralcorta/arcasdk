import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IinformarFacturaAgtDptoCltvInput,
  IinformarFacturaAgtDptoCltvOutput,
} from "@application/dto/fecred";

export class InformarFacturaAgtDptoCltvUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(
    input: IinformarFacturaAgtDptoCltvInput,
  ): Promise<IinformarFacturaAgtDptoCltvOutput> {
    return this.repository.informarFacturaAgtDptoCltv(input);
  }
}
