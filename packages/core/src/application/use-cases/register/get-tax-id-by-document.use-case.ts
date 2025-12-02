/**
 * Get Tax ID By Document Use Case
 * Retrieves Tax ID (CUIT) by document number (Scope 13)
 */
import { IRegisterScopeThirteenRepositoryPort } from "@application/ports/register/register-repository.ports";
import { TaxIDByDocumentResultDto } from "@application/dto/register.dto";

export class GetTaxIDByDocumentUseCase {
  constructor(
    private readonly repository: IRegisterScopeThirteenRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @param documentNumber Document number
   * @returns Tax ID information
   */
  async execute(documentNumber: string): Promise<TaxIDByDocumentResultDto> {
    return this.repository.getTaxIDByDocument(documentNumber);
  }
}
