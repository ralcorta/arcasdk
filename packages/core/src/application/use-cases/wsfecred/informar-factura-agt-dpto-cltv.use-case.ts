import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IinformarFacturaAgtDptoCltvInput,
  IinformarFacturaAgtDptoCltvOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class InformarFacturaAgtDptoCltvUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(
    input: IinformarFacturaAgtDptoCltvInput,
  ): Promise<IinformarFacturaAgtDptoCltvOutput> {
    return this.repository.informarFacturaAgtDptoCltv(input);
  }
}
