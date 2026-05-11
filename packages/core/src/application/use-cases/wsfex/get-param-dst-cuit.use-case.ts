import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetPARAM_DST_CUITInput,
  IFEXGetPARAM_DST_CUITOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FEXService/ServiceSoap";

export class GetParamDstCuitUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(
    input: IFEXGetPARAM_DST_CUITInput,
  ): Promise<IFEXGetPARAM_DST_CUITOutput> {
    return this.repository.getParamDstCuit(input);
  }
}
