/**
 * Get Taxpayers Details Use Case
 * Retrieves multiple taxpayers details by identifiers
 * Available for RegisterScope.FIVE and RegisterScope.INSCRIPTION_PROOF
 */
import { IRegisterRepositoryPort } from "@application/ports/register/register-repository.port";
import { TaxpayersDetailsDto } from "@application/dto/register.dto";
import { GetTaxpayersDetailsInput } from "@application/types";

export class GetTaxpayersDetailsUseCase {
  constructor(private readonly registerRepository: IRegisterRepositoryPort) {}

  /**
   * Execute the use case
   * @param input Register scope and array of taxpayer identifiers
   * @returns Taxpayers details
   */
  async execute(input: GetTaxpayersDetailsInput): Promise<TaxpayersDetailsDto> {
    return this.registerRepository.getTaxpayersDetails(
      input.scope,
      input.identifiers
    );
  }
}
