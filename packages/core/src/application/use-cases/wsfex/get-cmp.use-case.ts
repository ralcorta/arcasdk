import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetCMPInput,
  IFEXGetCMPOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FEXService/ServiceSoap";

export class GetCmpUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(input: IFEXGetCMPInput): Promise<IFEXGetCMPOutput> {
    return this.repository.getCmp(input);
  }
}
