import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetPARAM_Tipo_ExpoInput,
  IFEXGetPARAM_Tipo_ExpoOutput,
} from "@application/dto/fex";

export class GetParamTipoExpoUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(
    input: IFEXGetPARAM_Tipo_ExpoInput,
  ): Promise<IFEXGetPARAM_Tipo_ExpoOutput> {
    return this.repository.getParamTipoExpo(input);
  }
}
