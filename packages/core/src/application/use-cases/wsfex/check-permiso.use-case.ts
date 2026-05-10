import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXCheck_PermisoInput,
  IFEXCheck_PermisoOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FEXService/ServiceSoap";

export class CheckPermisoUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(
    input: IFEXCheck_PermisoInput,
  ): Promise<IFEXCheck_PermisoOutput> {
    return this.repository.checkPermiso(input);
  }
}
