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

export class RegisterInscriptionProofService {
  constructor(
    private readonly repository: IRegisterInscriptionProofRepositoryPort
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
   * Asks to web service for taxpayers details
   **/
  async getTaxpayersDetails(
    identifiers: number[]
  ): Promise<TaxpayersDetailsDto> {
    return this.repository.getTaxpayersDetails(identifiers);
  }
}
