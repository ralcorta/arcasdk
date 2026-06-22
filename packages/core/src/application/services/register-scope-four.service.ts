import { IRegisterScopeFourRepositoryPort } from "@application/ports/register/register-repository.ports";
import {
  ServerStatus,
  TaxpayerDetailsDto,
} from "@application/dto/register";
import { GetRegisterServerStatusUseCase } from "@application/use-cases/register/get-register-server-status.use-case";
import { GetTaxpayerDetailsUseCase } from "@application/use-cases/register/get-taxpayer-details.use-case";

export class RegisterScopeFourService {
  private readonly getRegisterServerStatusUseCase: GetRegisterServerStatusUseCase;
  private readonly getTaxpayerDetailsUseCase: GetTaxpayerDetailsUseCase;

  constructor(private readonly repository: IRegisterScopeFourRepositoryPort) {
    this.getRegisterServerStatusUseCase = new GetRegisterServerStatusUseCase(
      this.repository,
    );
    this.getTaxpayerDetailsUseCase = new GetTaxpayerDetailsUseCase(
      this.repository,
    );
  }

  
  async getServerStatus(): Promise<ServerStatus> {
    return this.getRegisterServerStatusUseCase.execute();
  }

  
  async getTaxpayerDetails(
    identifier: number,
  ): Promise<TaxpayerDetailsDto | null> {
    return this.getTaxpayerDetailsUseCase.execute(identifier);
  }
}
