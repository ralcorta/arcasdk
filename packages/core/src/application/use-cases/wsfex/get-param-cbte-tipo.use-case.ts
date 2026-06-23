import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetPARAM_Cbte_TipoInput,
  IFEXGetPARAM_Cbte_TipoOutput,
} from "@application/dto/fex";

export class GetParamCbteTipoUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(
    input: IFEXGetPARAM_Cbte_TipoInput,
  ): Promise<IFEXGetPARAM_Cbte_TipoOutput> {
    return this.repository.getParamCbteTipo(input);
  }
}
