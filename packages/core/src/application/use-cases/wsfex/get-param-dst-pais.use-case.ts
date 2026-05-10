import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetPARAM_DST_paisInput,
  IFEXGetPARAM_DST_paisOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FEXService/ServiceSoap";

export class GetParamDstPaisUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(
    input: IFEXGetPARAM_DST_paisInput,
  ): Promise<IFEXGetPARAM_DST_paisOutput> {
    return this.repository.getParamDstPais(input);
  }
}
