/**
 * Get Tax ID By Document Use Case
 * Retrieves tax ID (CUIT) by document number
 * Available only for RegisterScope.THIRTEEN
 */
import { IRegisterRepositoryPort } from "@application/ports/register/register-repository.port";
import { TaxIDByDocumentResultDto } from "@application/dto/register.dto";
import { GetTaxIDByDocumentInput } from "@application/types";

export class GetTaxIDByDocumentUseCase {
  constructor(private readonly registerRepository: IRegisterRepositoryPort) {}

  /**
   * Execute the use case
   * @param input Register scope and document number
   * @returns Tax ID result
   */
  async execute(
    input: GetTaxIDByDocumentInput
  ): Promise<TaxIDByDocumentResultDto> {
    return this.registerRepository.getTaxIDByDocument(
      input.scope,
      input.documentNumber
    );
  }
}
