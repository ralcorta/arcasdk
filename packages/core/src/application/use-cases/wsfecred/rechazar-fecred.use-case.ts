import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";
import {
  IrechazarFECredInput,
  IrechazarFECredOutput,
} from "@application/dto/fecred";

export class RechazarFECredUseCase {
  constructor(private readonly repository: IFecredRepositoryPort) {}

  async execute(input: IrechazarFECredInput): Promise<IrechazarFECredOutput> {
    return this.repository.rechazarFECred(input);
  }
}
