import {
  ServerStatus,
  TaxpayerDetailsDto,
  TaxpayersDetailsDto,
  TaxIDByDocumentResultDto,
  ParameterCollectionDto,
} from "@application/dto/register";

export interface IRegisterServerStatusRepositoryPort {
  getServerStatus(): Promise<ServerStatus>;
}

export interface IRegisterBaseRepositoryPort extends IRegisterServerStatusRepositoryPort {
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

export interface IRegisterScopeHundredRepositoryPort extends IRegisterServerStatusRepositoryPort {
  getParameterCollection(
    collectionName: string,
  ): Promise<ParameterCollectionDto | null>;
}
