import { IRegisterBaseRepositoryPort } from "@application/ports/register/register-repository.ports";
import { TaxpayerDetailsDto } from "@application/dto/register";

export class GetTaxpayerDetailsUseCase {
  constructor(private readonly repository: IRegisterBaseRepositoryPort) {}

  
  async execute(identifier: number): Promise<TaxpayerDetailsDto | null> {
    return this.repository.getTaxpayerDetails(identifier);
  }
}
