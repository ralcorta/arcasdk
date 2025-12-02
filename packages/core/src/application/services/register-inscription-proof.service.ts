/**
 * Register Inscription Proof Service
 * Application service for Register Inscription Proof
 * Orchestrates register use cases for INSCRIPTION_PROOF scope
 */
import { IRegisterInscriptionProofRepositoryPort } from "@application/ports/register/register-repository.ports";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
  TaxpayersDetailsDto,
} from "@application/dto/register.dto";
import { GetRegisterServerStatusUseCase } from "@application/use-cases/register/get-register-server-status.use-case";
import { GetTaxpayerDetailsUseCase } from "@application/use-cases/register/get-taxpayer-details.use-case";
import { GetTaxpayersDetailsUseCase } from "@application/use-cases/register/get-taxpayers-details.use-case";

export class RegisterInscriptionProofService {
  private readonly getRegisterServerStatusUseCase: GetRegisterServerStatusUseCase;
  private readonly getTaxpayerDetailsUseCase: GetTaxpayerDetailsUseCase;
  private readonly getTaxpayersDetailsUseCase: GetTaxpayersDetailsUseCase;

  constructor(
    private readonly repository: IRegisterInscriptionProofRepositoryPort
  ) {
    this.getRegisterServerStatusUseCase = new GetRegisterServerStatusUseCase(
      this.repository
    );
    this.getTaxpayerDetailsUseCase = new GetTaxpayerDetailsUseCase(
      this.repository
    );
    this.getTaxpayersDetailsUseCase = new GetTaxpayersDetailsUseCase(
      this.repository
    );
  }

  /**
   * Asks to web service for servers status
   **/
  async getServerStatus(): Promise<RegisterServerStatusDto> {
    return this.getRegisterServerStatusUseCase.execute();
  }

  /**
   * Asks to web service for taxpayer details
   **/
  async getTaxpayerDetails(
    identifier: number
  ): Promise<TaxpayerDetailsDto | null> {
    return this.getTaxpayerDetailsUseCase.execute(identifier);
  }

  /**
   * Asks to web service for taxpayers details
   **/
  async getTaxpayersDetails(
    identifiers: number[]
  ): Promise<TaxpayersDetailsDto> {
    return this.getTaxpayersDetailsUseCase.execute(identifiers);
  }
}
