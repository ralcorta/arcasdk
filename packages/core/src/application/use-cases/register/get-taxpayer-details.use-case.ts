/**
 * Get Taxpayer Details Use Case
 * Retrieves details for a specific taxpayer
 */
import { IRegisterBaseRepositoryPort } from "@application/ports/register/register-repository.ports";
import { TaxpayerDetailsDto } from "@application/dto/register.dto";

export class GetTaxpayerDetailsUseCase {
  constructor(private readonly repository: IRegisterBaseRepositoryPort) {}

  /**
   * Execute the use case
   * @param identifier Taxpayer identifier (CUIT)
   * @returns Taxpayer details or null if not found
   */
  async execute(identifier: number): Promise<TaxpayerDetailsDto | null> {
    return this.repository.getTaxpayerDetails(identifier);
  }
}
