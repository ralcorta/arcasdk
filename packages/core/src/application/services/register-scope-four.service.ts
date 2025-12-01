/**
 * Register Scope Four Service
 * Application service for Register Scope Four (Padrón A4)
 * Orchestrates register use cases for scope FOUR
 */

import { IRegisterScopeFourRepositoryPort } from "@application/ports/register/register-repository.ports";
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
} from "@application/dto/register.dto";

export class RegisterScopeFourService {
  constructor(private readonly repository: IRegisterScopeFourRepositoryPort) {}

  /**
   * Asks to web service for servers status
   *
   * @return object { appserver : Web Service status,
   * dbserver : Database status, authserver : Autentication
   * server status}
   **/
  async getServerStatus(): Promise<RegisterServerStatusDto> {
    return this.repository.getServerStatus();
  }

  /**
   * Asks to web service for taxpayer details
   *
   * @return object|null if taxpayer does not exists, return null,
   * if it exists, returns full response
   **/
  async getTaxpayerDetails(
    identifier: number
  ): Promise<TaxpayerDetailsDto | null> {
    return this.repository.getTaxpayerDetails(identifier);
  }
}
