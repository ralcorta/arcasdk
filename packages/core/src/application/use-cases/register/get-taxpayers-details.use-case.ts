import { IRegisterBatchRepositoryPort } from "@application/ports/register/register-repository.ports";
import { TaxpayersDetailsDto } from "@application/dto/register";

export class GetTaxpayersDetailsUseCase {
  constructor(private readonly repository: IRegisterBatchRepositoryPort) {}

  
  async execute(identifiers: number[]): Promise<TaxpayersDetailsDto> {
    return this.repository.getTaxpayersDetails(identifiers);
  }
}
