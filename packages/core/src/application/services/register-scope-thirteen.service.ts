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

export class RegisterScopeThirteenService {
  constructor(
    private readonly repository: IRegisterScopeThirteenRepositoryPort
  ) {}

  /**
   * Asks to web service for servers status
   **/
  async getServerStatus(): Promise<RegisterServerStatusDto> {
    return this.repository.getServerStatus();
  }

  /**
   * Asks to web service for taxpayer details
   **/
  async getTaxpayerDetails(
    identifier: number
  ): Promise<TaxpayerDetailsDto | null> {
    return this.repository.getTaxpayerDetails(identifier);
  }

  /**
   * Asks to web service for tax id by document number
   **/
  async getTaxIDByDocument(
    documentNumber: string
  ): Promise<TaxIDByDocumentResultDto> {
    return this.repository.getTaxIDByDocument(documentNumber);
  }
}
