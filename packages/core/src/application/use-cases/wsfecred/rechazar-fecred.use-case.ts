import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IrechazarFECredInput,
  IrechazarFECredOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class RechazarFECredUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(input: IrechazarFECredInput): Promise<IrechazarFECredOutput> {
    return this.repository.rechazarFECred(input);
  }
}
