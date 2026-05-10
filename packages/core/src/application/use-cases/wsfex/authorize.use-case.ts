import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXAuthorizeInput,
  IFEXAuthorizeOutput,
} from "@infrastructure/outbound/ports/soap/interfaces/FEXService/ServiceSoap";

export class AuthorizeUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(input: IFEXAuthorizeInput): Promise<IFEXAuthorizeOutput> {
    return this.repository.authorize(input);
  }
}
