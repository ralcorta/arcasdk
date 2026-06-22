import { IRegisterScopeThirteenRepositoryPort } from "@application/ports/register/register-repository.ports";
import { TaxIDByDocumentResultDto } from "@application/dto/register";

export class GetTaxIDByDocumentUseCase {
  constructor(
    private readonly repository: IRegisterScopeThirteenRepositoryPort,
  ) {}

  
  async execute(documentNumber: string): Promise<TaxIDByDocumentResultDto> {
    return this.repository.getTaxIDByDocument(documentNumber);
  }
}
