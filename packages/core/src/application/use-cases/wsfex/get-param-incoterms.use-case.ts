import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetPARAM_IncotermsInput,
  IFEXGetPARAM_IncotermsOutput,
} from "@application/dto/fex";

export class GetParamIncotermsUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(
    input: IFEXGetPARAM_IncotermsInput,
  ): Promise<IFEXGetPARAM_IncotermsOutput> {
    return this.repository.getParamIncoterms(input);
  }
}
