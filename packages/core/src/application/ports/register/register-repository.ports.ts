import {
  ServerStatus,
  TaxpayerDetailsDto,
  TaxpayersDetailsDto,
  TaxIDByDocumentResultDto,
} from "@application/dto/register";

export interface IRegisterBaseRepositoryPort {
  getServerStatus(): Promise<ServerStatus>;
  getTaxpayerDetails(identifier: number): Promise<TaxpayerDetailsDto | null>;
}

export interface IRegisterBatchRepositoryPort extends IRegisterBaseRepositoryPort {
  getTaxpayersDetails(identifiers: number[]): Promise<TaxpayersDetailsDto>;
}

export interface IRegisterScopeFourRepositoryPort extends IRegisterBaseRepositoryPort {}

export interface IRegisterScopeFiveRepositoryPort extends IRegisterBatchRepositoryPort {}

export interface IRegisterScopeTenRepositoryPort extends IRegisterBaseRepositoryPort {}

export interface IRegisterScopeThirteenRepositoryPort extends IRegisterBaseRepositoryPort {
  getTaxIDByDocument(documentNumber: string): Promise<TaxIDByDocumentResultDto>;
}

export interface IRegisterInscriptionProofRepositoryPort extends IRegisterBatchRepositoryPort {}
