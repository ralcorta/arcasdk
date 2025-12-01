/**
 * Register Scope Five Service
 * Application service for Register Scope Five (Padrón A5)
 * Orchestrates register use cases for scope FIVE
 */
import { IRegisterScopeFiveRepositoryPort } from "@application/ports/register/register-repository.ports";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
  TaxpayersDetailsDto,
} from "@application/dto/register.dto";

export class RegisterScopeFiveService {
  constructor(private readonly repository: IRegisterScopeFiveRepositoryPort) {}

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
   * Asks to web service for taxpayers details
   **/
  async getTaxpayersDetails(
    identifiers: number[]
  ): Promise<TaxpayersDetailsDto> {
    return this.repository.getTaxpayersDetails(identifiers);
  }
}
