import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetPARAM_UMedInput,
  IFEXGetPARAM_UMedOutput,
} from "@application/dto/fex";

export class GetParamUMedUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(
    input: IFEXGetPARAM_UMedInput,
  ): Promise<IFEXGetPARAM_UMedOutput> {
    return this.repository.getParamUMed(input);
  }
}
