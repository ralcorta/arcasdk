import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetPARAM_ActividadesInput,
  IFEXGetPARAM_ActividadesOutput,
} from "@application/dto/fex";

export class GetParamActividadesUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(
    input: IFEXGetPARAM_ActividadesInput,
  ): Promise<IFEXGetPARAM_ActividadesOutput> {
    return this.repository.getParamActividades(input);
  }
}
