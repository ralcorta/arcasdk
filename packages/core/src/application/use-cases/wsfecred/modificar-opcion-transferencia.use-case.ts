import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  ImodificarOpcionTransferenciaInput,
  ImodificarOpcionTransferenciaOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class ModificarOpcionTransferenciaUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(
    input: ImodificarOpcionTransferenciaInput,
  ): Promise<ImodificarOpcionTransferenciaOutput> {
    return this.repository.modificarOpcionTransferencia(input);
  }
}
