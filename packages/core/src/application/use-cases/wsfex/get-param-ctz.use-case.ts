import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetPARAM_CtzInput,
  IFEXGetPARAM_CtzOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FEXService/ServiceSoap";

export class GetParamCtzUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(input: IFEXGetPARAM_CtzInput): Promise<IFEXGetPARAM_CtzOutput> {
    return this.repository.getParamCtz(input);
  }
}
