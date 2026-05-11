import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IaceptarFECredInput,
  IaceptarFECredOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FECredService/ServiceSoap";

export class AceptarFECredUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(input: IaceptarFECredInput): Promise<IaceptarFECredOutput> {
    return this.repository.aceptarFECred(input);
  }
}
