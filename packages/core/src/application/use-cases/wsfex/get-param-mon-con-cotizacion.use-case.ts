import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXGetPARAM_MON_CON_COTIZACIONInput,
  IFEXGetPARAM_MON_CON_COTIZACIONOutput,
} from "@application/dto/fex";

export class GetParamMonConCotizacionUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(
    input: IFEXGetPARAM_MON_CON_COTIZACIONInput,
  ): Promise<IFEXGetPARAM_MON_CON_COTIZACIONOutput> {
    return this.repository.getParamMonConCotizacion(input);
  }
}
