import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetPARAM_OpcionalesInput,
  IFEXGetPARAM_OpcionalesOutput,
} from "@application/dto/fex";

export class GetParamOpcionalesUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(
    input: IFEXGetPARAM_OpcionalesInput,
  ): Promise<IFEXGetPARAM_OpcionalesOutput> {
    return this.repository.getParamOpcionales(input);
  }
}
