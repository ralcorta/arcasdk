import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetPARAM_IdiomasInput,
  IFEXGetPARAM_IdiomasOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FEXService/ServiceSoap";

export class GetParamIdiomasUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(
    input: IFEXGetPARAM_IdiomasInput,
  ): Promise<IFEXGetPARAM_IdiomasOutput> {
    return this.repository.getParamIdiomas(input);
  }
}
