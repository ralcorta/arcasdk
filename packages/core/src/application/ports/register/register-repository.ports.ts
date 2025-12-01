/**
 * Register Repository Ports
 * Specific ports for each register scope
 */
import {
  RegisterServerStatusDto,
  TaxpayerDetailsDto,
  TaxpayersDetailsDto,
  TaxIDByDocumentResultDto,
} from "@application/dto/register.dto";

export interface IRegisterScopeFourRepositoryPort {
  getServerStatus(): Promise<RegisterServerStatusDto>;
  getTaxpayerDetails(identifier: number): Promise<TaxpayerDetailsDto | null>;
}

export interface IRegisterScopeFiveRepositoryPort {
  getServerStatus(): Promise<RegisterServerStatusDto>;
  getTaxpayerDetails(identifier: number): Promise<TaxpayerDetailsDto | null>;
  getTaxpayersDetails(identifiers: number[]): Promise<TaxpayersDetailsDto>;
}

export interface IRegisterScopeTenRepositoryPort {
  getServerStatus(): Promise<RegisterServerStatusDto>;
  getTaxpayerDetails(identifier: number): Promise<TaxpayerDetailsDto | null>;
}

export interface IRegisterScopeThirteenRepositoryPort {
  getServerStatus(): Promise<RegisterServerStatusDto>;
  getTaxpayerDetails(identifier: number): Promise<TaxpayerDetailsDto | null>;
  getTaxIDByDocument(documentNumber: string): Promise<TaxIDByDocumentResultDto>;
}

export interface IRegisterInscriptionProofRepositoryPort {
  getServerStatus(): Promise<RegisterServerStatusDto>;
  getTaxpayerDetails(identifier: number): Promise<TaxpayerDetailsDto | null>;
  getTaxpayersDetails(identifiers: number[]): Promise<TaxpayersDetailsDto>;
}
