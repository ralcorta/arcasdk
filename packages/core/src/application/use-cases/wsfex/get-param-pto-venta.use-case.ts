import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetPARAM_PtoVentaInput,
  IFEXGetPARAM_PtoVentaOutput,
} from "@application/dto/fex";

export class GetParamPtoVentaUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(
    input: IFEXGetPARAM_PtoVentaInput,
  ): Promise<IFEXGetPARAM_PtoVentaOutput> {
    return this.repository.getParamPtoVenta(input);
  }
}
