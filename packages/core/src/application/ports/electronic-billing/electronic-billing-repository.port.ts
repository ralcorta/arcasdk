import { Voucher } from "@domain/entities/voucher.entity";
import { CreateVoucherResultDto } from "@application/dto/electronic-billing";
import { ServerStatus } from "@application/dto/common";
import {
  SalesPointsResultDto,
  LastVoucherResultDto,
  VoucherInfoResultDto,
  VoucherTypesResultDto,
  ConceptTypesResultDto,
  DocumentTypesResultDto,
  AliquotTypesResultDto,
  CurrencyTypesResultDto,
  OptionalTypesResultDto,
  TaxTypesResultDto,
  IvaReceptorTypesResultDto,
  CaeaResultDto,
  CaeaUsageResultDto,
  CaeaNoMovementResultDto,
  CountriesResultDto,
  ActivitiesResultDto,
  QuotationResultDto,
  MaxRecordsResultDto,
} from "@application/dto/electronic-billing";

export interface IElectronicBillingRepositoryPort {
  
  getServerStatus(): Promise<ServerStatus>;

  
  getSalesPoints(): Promise<SalesPointsResultDto>;

  
  getLastVoucher(
    salesPoint: number,
    voucherType: number,
  ): Promise<LastVoucherResultDto>;

  
  createVoucher(voucher: Voucher): Promise<CreateVoucherResultDto>;

  
  getVoucherInfo(
    number: number,
    salesPoint: number,
    type: number,
  ): Promise<VoucherInfoResultDto | null>;

  
  getVoucherTypes(): Promise<VoucherTypesResultDto>;

  
  getConceptTypes(): Promise<ConceptTypesResultDto>;

  
  getDocumentTypes(): Promise<DocumentTypesResultDto>;

  
  getAliquotTypes(): Promise<AliquotTypesResultDto>;

  
  getCurrencyTypes(): Promise<CurrencyTypesResultDto>;

  
  getOptionalTypes(): Promise<OptionalTypesResultDto>;

  
  getTaxTypes(): Promise<TaxTypesResultDto>;

  
  getIvaReceptorTypes(claseCmp?: string): Promise<IvaReceptorTypesResultDto>;

  
  getCaea(period: number, order: number): Promise<CaeaResultDto>;

  
  consultCaea(period: number, order: number): Promise<CaeaResultDto>;

  
  informCaeaNoMovement(
    caea: string,
    salesPoint: number,
  ): Promise<CaeaNoMovementResultDto>;

  
  consultCaeaNoMovement(
    caea: string,
    salesPoint: number,
  ): Promise<CaeaNoMovementResultDto>;

  
  informCaeaUsage(voucher: Voucher, caea: string): Promise<CaeaUsageResultDto>;

  
  getQuotation(currencyId: string): Promise<QuotationResultDto>;

  
  getCountries(): Promise<CountriesResultDto>;

  
  getActivities(): Promise<ActivitiesResultDto>;

  
  getMaxRecordsPerRequest(): Promise<MaxRecordsResultDto>;
}
