import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetLast_CMPInput,
  IFEXGetLast_CMPOutput,
} from "@application/dto/fex";

export class GetLastCmpUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(input: IFEXGetLast_CMPInput): Promise<IFEXGetLast_CMPOutput> {
    return this.repository.getLastCmp(input);
  }
}
