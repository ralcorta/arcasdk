/**
 * Register Scope Ten Service
 * Application service for Register Scope Ten (Padrón A10)
 * Orchestrates register use cases for scope TEN
 */
import { IRegisterScopeTenRepositoryPort } from "@application/ports/register/register-repository.ports";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
} from "@application/dto/register.dto";

export class RegisterScopeTenService {
  constructor(private readonly repository: IRegisterScopeTenRepositoryPort) {}

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
}
