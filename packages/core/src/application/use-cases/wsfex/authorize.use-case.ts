import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";
import {
  IFEXAuthorizeInput,
  IFEXAuthorizeOutput,
} from "@application/dto/fex";

export class AuthorizeUseCase {
  constructor(private readonly repository: IFexRepositoryPort) {}

  async execute(input: IFEXAuthorizeInput): Promise<IFEXAuthorizeOutput> {
    return this.repository.authorize(input);
  }
}
