import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IinformarCancelacionTotalFECredInput,
  IinformarCancelacionTotalFECredOutput,
} from "@application/dto/fecred";

export class InformarCancelacionTotalFECredUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(
    input: IinformarCancelacionTotalFECredInput,
  ): Promise<IinformarCancelacionTotalFECredOutput> {
    return this.repository.informarCancelacionTotalFECred(input);
  }
}
