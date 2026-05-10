import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetLast_IDInput,
  IFEXGetLast_IDOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FEXService/ServiceSoap";

export class GetLastIdUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(input: IFEXGetLast_IDInput): Promise<IFEXGetLast_IDOutput> {
    return this.repository.getLastId(input);
  }
}
