/**
 * Get Taxpayer Details Use Case
 * Retrieves taxpayer details by identifier
 */
import { IRegisterRepositoryPort } from "@application/ports/register/register-repository.port";
import { TaxpayerDetailsDto } from "@application/dto/register.dto";
import { GetTaxpayerDetailsInput } from "@application/types";

export class GetTaxpayerDetailsUseCase {
  constructor(private readonly registerRepository: IRegisterRepositoryPort) {}

  /**
   * Execute the use case
   * @param input Register scope and taxpayer identifier
   * @returns Taxpayer details or null if not found
   */
  async execute(
    input: GetTaxpayerDetailsInput
  ): Promise<TaxpayerDetailsDto | null> {
    return this.registerRepository.getTaxpayerDetails(
      input.scope,
      input.identifier
    );
  }
}
