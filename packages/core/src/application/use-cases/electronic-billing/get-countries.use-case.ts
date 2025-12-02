/**
 * Get Countries Use Case
 * Retrieves the list of available countries
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { CountriesResultDto } from "@application/dto/electronic-billing.dto";

export class GetCountriesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  /**
   * Get Countries
   * @returns Countries information
   */
  async execute(): Promise<CountriesResultDto> {
    return this.electronicBillingRepository.getCountries();
  }
}
