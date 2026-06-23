import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { IVoucher, INextVoucher } from "@domain/types/voucher.types";
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
import { GetServerStatusUseCase } from "@application/use-cases/electronic-billing/get-server-status.use-case";
import { GetSalesPointsUseCase } from "@application/use-cases/electronic-billing/get-sales-points.use-case";
import { GetLastVoucherUseCase } from "@application/use-cases/electronic-billing/get-last-voucher.use-case";
import { CreateVoucherUseCase } from "@application/use-cases/electronic-billing/create-voucher.use-case";
import { CreateNextVoucherUseCase } from "@application/use-cases/electronic-billing/create-next-voucher.use-case";
import { GetVoucherInfoUseCase } from "@application/use-cases/electronic-billing/get-voucher-info.use-case";
import { GetVoucherTypesUseCase } from "@application/use-cases/electronic-billing/get-voucher-types.use-case";
import { GetConceptTypesUseCase } from "@application/use-cases/electronic-billing/get-concept-types.use-case";
import { GetDocumentTypesUseCase } from "@application/use-cases/electronic-billing/get-document-types.use-case";
import { GetAliquotTypesUseCase } from "@application/use-cases/electronic-billing/get-aliquot-types.use-case";
import { GetCurrencyTypesUseCase } from "@application/use-cases/electronic-billing/get-currency-types.use-case";
import { GetOptionalTypesUseCase } from "@application/use-cases/electronic-billing/get-optional-types.use-case";
import { GetTaxTypesUseCase } from "@application/use-cases/electronic-billing/get-tax-types.use-case";
import { GetIvaReceptorTypesUseCase } from "@application/use-cases/electronic-billing/get-iva-receptor-types.use-case";
import { GetCaeaUseCase } from "@application/use-cases/electronic-billing/get-caea.use-case";
import { ConsultCaeaUseCase } from "@application/use-cases/electronic-billing/consult-caea.use-case";
import { InformCaeaNoMovementUseCase } from "@application/use-cases/electronic-billing/inform-caea-no-movement.use-case";
import { ConsultCaeaNoMovementUseCase } from "@application/use-cases/electronic-billing/consult-caea-no-movement.use-case";
import { InformCaeaUsageUseCase } from "@application/use-cases/electronic-billing/inform-caea-usage.use-case";
import { GetQuotationUseCase } from "@application/use-cases/electronic-billing/get-quotation.use-case";
import { GetCountriesUseCase } from "@application/use-cases/electronic-billing/get-countries.use-case";
import { GetActivitiesUseCase } from "@application/use-cases/electronic-billing/get-activities.use-case";
import { GetMaxRecordsUseCase } from "@application/use-cases/electronic-billing/get-max-records.use-case";

export class ElectronicBillingService {
  private readonly getServerStatusUseCase: GetServerStatusUseCase;
  private readonly getSalesPointsUseCase: GetSalesPointsUseCase;
  private readonly getLastVoucherUseCase: GetLastVoucherUseCase;
  private readonly createVoucherUseCase: CreateVoucherUseCase;
  private readonly createNextVoucherUseCase: CreateNextVoucherUseCase;
  private readonly getVoucherInfoUseCase: GetVoucherInfoUseCase;
  private readonly getVoucherTypesUseCase: GetVoucherTypesUseCase;
  private readonly getConceptTypesUseCase: GetConceptTypesUseCase;
  private readonly getDocumentTypesUseCase: GetDocumentTypesUseCase;
  private readonly getAliquotTypesUseCase: GetAliquotTypesUseCase;
  private readonly getCurrencyTypesUseCase: GetCurrencyTypesUseCase;
  private readonly getOptionalTypesUseCase: GetOptionalTypesUseCase;
  private readonly getTaxTypesUseCase: GetTaxTypesUseCase;
  private readonly getIvaReceptorTypesUseCase: GetIvaReceptorTypesUseCase;
  private readonly getCaeaUseCase: GetCaeaUseCase;
  private readonly consultCaeaUseCase: ConsultCaeaUseCase;
  private readonly informCaeaNoMovementUseCase: InformCaeaNoMovementUseCase;
  private readonly consultCaeaNoMovementUseCase: ConsultCaeaNoMovementUseCase;
  private readonly informCaeaUsageUseCase: InformCaeaUsageUseCase;
  private readonly getQuotationUseCase: GetQuotationUseCase;
  private readonly getCountriesUseCase: GetCountriesUseCase;
  private readonly getActivitiesUseCase: GetActivitiesUseCase;
  private readonly getMaxRecordsUseCase: GetMaxRecordsUseCase;

  constructor(
    private readonly electronicBillingRepository: IElectronicBillingRepositoryPort
  ) {
    this.getServerStatusUseCase = new GetServerStatusUseCase(
      this.electronicBillingRepository
    );
    this.getSalesPointsUseCase = new GetSalesPointsUseCase(
      this.electronicBillingRepository
    );
    this.getLastVoucherUseCase = new GetLastVoucherUseCase(
      this.electronicBillingRepository
    );
    this.createVoucherUseCase = new CreateVoucherUseCase(
      this.electronicBillingRepository
    );
    this.createNextVoucherUseCase = new CreateNextVoucherUseCase(
      this.electronicBillingRepository
    );
    this.getVoucherInfoUseCase = new GetVoucherInfoUseCase(
      this.electronicBillingRepository
    );
    this.getVoucherTypesUseCase = new GetVoucherTypesUseCase(
      this.electronicBillingRepository
    );
    this.getConceptTypesUseCase = new GetConceptTypesUseCase(
      this.electronicBillingRepository
    );
    this.getDocumentTypesUseCase = new GetDocumentTypesUseCase(
      this.electronicBillingRepository
    );
    this.getAliquotTypesUseCase = new GetAliquotTypesUseCase(
      this.electronicBillingRepository
    );
    this.getCurrencyTypesUseCase = new GetCurrencyTypesUseCase(
      this.electronicBillingRepository
    );
    this.getOptionalTypesUseCase = new GetOptionalTypesUseCase(
      this.electronicBillingRepository
    );
    this.getTaxTypesUseCase = new GetTaxTypesUseCase(
      this.electronicBillingRepository
    );
    this.getIvaReceptorTypesUseCase = new GetIvaReceptorTypesUseCase(
      this.electronicBillingRepository
    );
    this.getCaeaUseCase = new GetCaeaUseCase(this.electronicBillingRepository);
    this.consultCaeaUseCase = new ConsultCaeaUseCase(
      this.electronicBillingRepository
    );
    this.informCaeaNoMovementUseCase = new InformCaeaNoMovementUseCase(
      this.electronicBillingRepository
    );
    this.consultCaeaNoMovementUseCase = new ConsultCaeaNoMovementUseCase(
      this.electronicBillingRepository
    );
    this.informCaeaUsageUseCase = new InformCaeaUsageUseCase(
      this.electronicBillingRepository
    );
    this.getQuotationUseCase = new GetQuotationUseCase(
      this.electronicBillingRepository
    );
    this.getCountriesUseCase = new GetCountriesUseCase(
      this.electronicBillingRepository
    );
    this.getActivitiesUseCase = new GetActivitiesUseCase(
      this.electronicBillingRepository
    );
    this.getMaxRecordsUseCase = new GetMaxRecordsUseCase(
      this.electronicBillingRepository
    );
  }

  
  async getServerStatus(): Promise<ServerStatus> {
    return this.getServerStatusUseCase.execute();
  }

  
  public async getSalesPoints(): Promise<SalesPointsResultDto> {
    return this.getSalesPointsUseCase.execute();
  }

  
  async getLastVoucher(
    salesPoint: number,
    type: number
  ): Promise<LastVoucherResultDto> {
    return this.getLastVoucherUseCase.execute({
      salesPoint,
      voucherType: type,
    });
  }

  
  public async createVoucher(req: IVoucher): Promise<CreateVoucherResultDto> {
    return this.createVoucherUseCase.execute(req);
  }

  
  async createNextVoucher(req: INextVoucher): Promise<CreateVoucherResultDto> {
    return this.createNextVoucherUseCase.execute(req);
  }

  
  async getVoucherInfo(
    number: number,
    salesPoint: number,
    type: number
  ): Promise<VoucherInfoResultDto | null> {
    return this.getVoucherInfoUseCase.execute({
      number,
      salesPoint,
      type,
    });
  }

  
  async getVoucherTypes(): Promise<VoucherTypesResultDto> {
    return this.getVoucherTypesUseCase.execute();
  }

  
  async getConceptTypes(): Promise<ConceptTypesResultDto> {
    return this.getConceptTypesUseCase.execute();
  }

  
  async getDocumentTypes(): Promise<DocumentTypesResultDto> {
    return this.getDocumentTypesUseCase.execute();
  }

  
  async getAliquotTypes(): Promise<AliquotTypesResultDto> {
    return this.getAliquotTypesUseCase.execute();
  }

  
  async getCurrencyTypes(): Promise<CurrencyTypesResultDto> {
    return this.getCurrencyTypesUseCase.execute();
  }

  async getOptionalTypes(): Promise<OptionalTypesResultDto> {
    return this.getOptionalTypesUseCase.execute();
  }

  
  async getTaxTypes(): Promise<TaxTypesResultDto> {
    return this.getTaxTypesUseCase.execute();
  }

  
  async getIvaReceptorTypes(
    claseCmp?: string
  ): Promise<IvaReceptorTypesResultDto> {
    return this.getIvaReceptorTypesUseCase.execute(claseCmp);
  }

  
  async getCaea(period: number, order: number): Promise<CaeaResultDto> {
    return this.getCaeaUseCase.execute(period, order);
  }

  
  async consultCaea(period: number, order: number): Promise<CaeaResultDto> {
    return this.consultCaeaUseCase.execute(period, order);
  }

  
  async informCaeaNoMovement(
    caea: string,
    salesPoint: number
  ): Promise<CaeaNoMovementResultDto> {
    return this.informCaeaNoMovementUseCase.execute(caea, salesPoint);
  }

  
  async consultCaeaNoMovement(
    caea: string,
    salesPoint: number
  ): Promise<CaeaNoMovementResultDto> {
    return this.consultCaeaNoMovementUseCase.execute(caea, salesPoint);
  }

  
  async informCaeaUsage(
    voucher: IVoucher,
    caea: string
  ): Promise<CaeaUsageResultDto> {
    return this.informCaeaUsageUseCase.execute(voucher, caea);
  }

  
  async getQuotation(currencyId: string): Promise<QuotationResultDto> {
    return this.getQuotationUseCase.execute(currencyId);
  }

  
  async getCountries(): Promise<CountriesResultDto> {
    return this.getCountriesUseCase.execute();
  }

  
  async getActivities(): Promise<ActivitiesResultDto> {
    return this.getActivitiesUseCase.execute();
  }

  
  async getMaxRecordsPerRequest(): Promise<MaxRecordsResultDto> {
    return this.getMaxRecordsUseCase.execute();
  }

  
  async createInvoice(req: IVoucher) {
    return this.createVoucher(req);
  }

  
  async createNextInvoice(req: INextVoucher) {
    return this.createNextVoucher(req);
  }
}
