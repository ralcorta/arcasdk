
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { CountriesResultDto } from "@application/dto/electronic-billing";

export class GetCountriesUseCase {
  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {}

  
  async execute(): Promise<CountriesResultDto> {
    return this.electronicBillingRepository.getCountries();
  }
}
