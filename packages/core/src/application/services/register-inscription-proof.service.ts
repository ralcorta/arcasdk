import { IRegisterInscriptionProofRepositoryPort } from "@application/ports/register/register-repository.ports";
import {
  ServerStatus,
  TaxpayerDetailsDto,
  TaxpayersDetailsDto,
} from "@application/dto/register";
import { GetRegisterServerStatusUseCase } from "@application/use-cases/register/get-register-server-status.use-case";
import { GetTaxpayerDetailsUseCase } from "@application/use-cases/register/get-taxpayer-details.use-case";
import { GetTaxpayersDetailsUseCase } from "@application/use-cases/register/get-taxpayers-details.use-case";

export class RegisterInscriptionProofService {
  private readonly getRegisterServerStatusUseCase: GetRegisterServerStatusUseCase;
  private readonly getTaxpayerDetailsUseCase: GetTaxpayerDetailsUseCase;
  private readonly getTaxpayersDetailsUseCase: GetTaxpayersDetailsUseCase;

  constructor(
    private readonly repository: IRegisterInscriptionProofRepositoryPort,
  ) {
    this.getRegisterServerStatusUseCase = new GetRegisterServerStatusUseCase(
      this.repository,
    );
    this.getTaxpayerDetailsUseCase = new GetTaxpayerDetailsUseCase(
      this.repository,
    );
    this.getTaxpayersDetailsUseCase = new GetTaxpayersDetailsUseCase(
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

  
  async getTaxpayersDetails(
    identifiers: number[],
  ): Promise<TaxpayersDetailsDto> {
    return this.getTaxpayersDetailsUseCase.execute(identifiers);
  }
}
