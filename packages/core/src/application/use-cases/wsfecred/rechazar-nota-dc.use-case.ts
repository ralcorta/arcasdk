import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IrechazarNotaDCInput,
  IrechazarNotaDCOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class RechazarNotaDCUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(input: IrechazarNotaDCInput): Promise<IrechazarNotaDCOutput> {
    return this.repository.rechazarNotaDC(input);
  }
}
