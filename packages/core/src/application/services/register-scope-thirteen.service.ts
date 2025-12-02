/**
 * Register Scope Thirteen Service
 * Application service for Register Scope Thirteen (Padrón A13)
 * Orchestrates register use cases for scope THIRTEEN
 */
import { IRegisterScopeThirteenRepositoryPort } from "@application/ports/register/register-repository.ports";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
  TaxIDByDocumentResultDto,
} from "@application/dto/register.dto";
import { GetRegisterServerStatusUseCase } from "@application/use-cases/register/get-register-server-status.use-case";
import { GetTaxpayerDetailsUseCase } from "@application/use-cases/register/get-taxpayer-details.use-case";
import { GetTaxIDByDocumentUseCase } from "@application/use-cases/register/get-tax-id-by-document.use-case";

export class RegisterScopeThirteenService {
  private readonly getRegisterServerStatusUseCase: GetRegisterServerStatusUseCase;
  private readonly getTaxpayerDetailsUseCase: GetTaxpayerDetailsUseCase;
  private readonly getTaxIDByDocumentUseCase: GetTaxIDByDocumentUseCase;

  constructor(
    private readonly repository: IRegisterScopeThirteenRepositoryPort
  ) {
    this.getRegisterServerStatusUseCase = new GetRegisterServerStatusUseCase(
      this.repository
    );
    this.getTaxpayerDetailsUseCase = new GetTaxpayerDetailsUseCase(
      this.repository
    );
    this.getTaxIDByDocumentUseCase = new GetTaxIDByDocumentUseCase(
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
   * Asks to web service for tax id by document number
   **/
  async getTaxIDByDocument(
    documentNumber: string
  ): Promise<TaxIDByDocumentResultDto> {
    return this.getTaxIDByDocumentUseCase.execute(documentNumber);
  }
}
