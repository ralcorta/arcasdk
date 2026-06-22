import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetPARAM_IdiomasInput,
  IFEXGetPARAM_IdiomasOutput,
} from "@application/dto/fex";

export class GetParamIdiomasUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(
    input: IFEXGetPARAM_IdiomasInput,
  ): Promise<IFEXGetPARAM_IdiomasOutput> {
    return this.repository.getParamIdiomas(input);
  }
}
