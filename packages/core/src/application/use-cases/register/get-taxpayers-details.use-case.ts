/**
 * Get Taxpayers Details Use Case
 * Retrieves details for multiple taxpayers
 */
import { IRegisterBatchRepositoryPort } from "@application/ports/register/register-repository.ports";
import { TaxpayersDetailsDto } from "@application/dto/register.dto";

export class GetTaxpayersDetailsUseCase {
  constructor(private readonly repository: IRegisterBatchRepositoryPort) {}

  /**
   * Execute the use case
   * @param identifiers Array of taxpayer identifiers (CUITs)
   * @returns Taxpayers details
   */
  async execute(identifiers: number[]): Promise<TaxpayersDetailsDto> {
    return this.repository.getTaxpayersDetails(identifiers);
  }
}
