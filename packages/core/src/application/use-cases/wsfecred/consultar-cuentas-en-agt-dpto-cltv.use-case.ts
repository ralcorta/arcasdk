import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import { IconsultarCuentasEnAgtDptoCltvOutput } from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class ConsultarCuentasEnAgtDptoCltvUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(): Promise<IconsultarCuentasEnAgtDptoCltvOutput> {
    return this.repository.consultarCuentasEnAgtDptoCltv();
  }
}
