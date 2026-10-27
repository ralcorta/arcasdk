import { ICdcRepositoryPort } from "@application/ports/cdc/cdc-repository.port";
import {
  ConstatarComprobanteInput,
  IComprobanteConstatarOutput,
} from "@application/dto/cdc";

export class ConstatarComprobanteUseCase {
  constructor(private readonly repository: ICdcRepositoryPort) {}

  async execute(
    input: ConstatarComprobanteInput,
  ): Promise<IComprobanteConstatarOutput> {
    return this.repository.constatarComprobante(input);
  }
}
