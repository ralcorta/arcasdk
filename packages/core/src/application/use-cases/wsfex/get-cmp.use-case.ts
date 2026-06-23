import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetCMPInput,
  IFEXGetCMPOutput,
} from "@application/dto/fex";

export class GetCmpUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(input: IFEXGetCMPInput): Promise<IFEXGetCMPOutput> {
    return this.repository.getCmp(input);
  }
}
