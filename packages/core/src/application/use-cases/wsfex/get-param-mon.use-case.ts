import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetPARAM_MONInput,
  IFEXGetPARAM_MONOutput,
} from "@application/dto/fex";

export class GetParamMonUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(input: IFEXGetPARAM_MONInput): Promise<IFEXGetPARAM_MONOutput> {
    return this.repository.getParamMon(input);
  }
}
