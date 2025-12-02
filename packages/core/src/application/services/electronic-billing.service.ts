/**
 * Electronic Billing Service
 * Application service that orchestrates electronic billing use cases
 * Maintains compatibility with legacy API
 */
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";
import { IVoucher, INextVoucher } from "@domain/types/voucher.types";
import { ICreateVoucherResult } from "@application/types/result.types";
import {
  ServerStatusDto,
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
  CaeaNoMovementResultDto,
  CountriesResultDto,
  ActivitiesResultDto,
  QuotationResultDto,
  MaxRecordsResultDto,
} from "@application/dto/electronic-billing.dto";

// Use cases
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
  // Use cases
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
    // Initialize all use cases
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

  /**
   * Asks to web service for servers status
   *
   * @return object { AppServer : Web Service status,
   * DbServer : Database status, AuthServer : Autentication
   * server status}
   **/
  async getServerStatus(): Promise<ServerStatusDto> {
    return this.getServerStatusUseCase.execute();
  }

  /**
   * Asks to ARCA Servers for sales points availables {@see WS
   * Specification item 4.11}
   *
   * @return array All sales points availables
   **/
  public async getSalesPoints(): Promise<SalesPointsResultDto> {
    return this.getSalesPointsUseCase.execute();
  }

  /**
   * Asks to Arca servers for number of the last voucher created for
   * certain sales point and voucher type
   *
   * @param salesPoint Sales point to ask for last voucher
   * @param type Voucher type to ask for last voucher
   * @returns
   */
  async getLastVoucher(
    salesPoint: number,
    type: number
  ): Promise<LastVoucherResultDto> {
    return this.getLastVoucherUseCase.execute({
      salesPoint,
      voucherType: type,
    });
  }

  /**
   * Create a voucher from ARCA
   *
   * Send to ARCA servers request for create a voucher and assign
   * CAE to them
   *
   * @param req data Voucher parameter
   **/
  public async createVoucher(req: IVoucher): Promise<ICreateVoucherResult> {
    return this.createVoucherUseCase.execute(req);
  }

  /**
   * Create next voucher from ARCA
   *
   * This method combines getLastVoucher and createVoucher
   * for create the next voucher
   *
   * @param req data Same to data in Arca.createVoucher except that
   * 	don't need CbteDesde and CbteHasta attributes
   **/
  async createNextVoucher(req: INextVoucher): Promise<ICreateVoucherResult> {
    return this.createNextVoucherUseCase.execute(req);
  }

  /**
   * Get voucher information
   *
   * Asks to ARCA servers for complete information of voucher
   *
   * @param number 		Number of voucher to get information
   * @param salesPoint 	Sales point of voucher to get information
   * @param type 			Type of voucher to get information
   *
   * @return data with array | null returns array with complete voucher information
   **/
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

  /**
   * Asks to ARCA Servers for voucher types availables
   **/
  async getVoucherTypes(): Promise<VoucherTypesResultDto> {
    return this.getVoucherTypesUseCase.execute();
  }

  /**
   * Asks to ARCA Servers for voucher concepts availables
   *
   * @return data with array of all voucher concepts availables
   **/
  async getConceptTypes(): Promise<ConceptTypesResultDto> {
    return this.getConceptTypesUseCase.execute();
  }

  /**
   * Asks to ARCA Servers for document types availables
   *
   * @return data with array of all document types availables
   **/
  async getDocumentTypes(): Promise<DocumentTypesResultDto> {
    return this.getDocumentTypesUseCase.execute();
  }

  /**
   * Asks to ARCA Servers for aliquot availables
   *
   * @return data with array of all aliquot availables
   **/
  async getAliquotTypes(): Promise<AliquotTypesResultDto> {
    return this.getAliquotTypesUseCase.execute();
  }

  /**
   * Asks to ARCA Servers for currencies availables
   *
   * @return data with array of all currencies availables
   **/
  async getCurrenciesTypes(): Promise<CurrencyTypesResultDto> {
    return this.getCurrencyTypesUseCase.execute();
  }

  /**
   * Asks to ARCA Servers for voucher optional data available
   *
   * @return data with array of all voucher optional data available
   **/
  async getOptionsTypes(): Promise<OptionalTypesResultDto> {
    return this.getOptionalTypesUseCase.execute();
  }

  /**
   * Asks to ARCA Servers for tax availables
   *
   * @return data with array of all tax availables
   **/
  async getTaxTypes(): Promise<TaxTypesResultDto> {
    return this.getTaxTypesUseCase.execute();
  }

  /**
   * Asks to ARCA Servers for IVA receptor types availables
   *
   * @param claseCmp Voucher class (optional)
   * @return data with array of all IVA receptor types availables
   **/
  async getIvaReceptorTypes(
    claseCmp?: string
  ): Promise<IvaReceptorTypesResultDto> {
    return this.getIvaReceptorTypesUseCase.execute(claseCmp);
  }

  /**
   * Request CAEA (Anticipated Electronic Authorization Code)
   * @param period Period (YYYYMM)
   * @param order Fortnight (1 or 2)
   * @returns CAEA information
   */
  async getCaea(period: number, order: number): Promise<CaeaResultDto> {
    return this.getCaeaUseCase.execute(period, order);
  }

  /**
   * Consult CAEA
   * @param period Period (YYYYMM)
   * @param order Fortnight (1 or 2)
   * @returns CAEA information
   */
  async consultCaea(period: number, order: number): Promise<CaeaResultDto> {
    return this.consultCaeaUseCase.execute(period, order);
  }

  /**
   * Inform CAEA No Movement
   * @param caea CAEA number
   * @param salesPoint Sales point number
   * @returns CAEA No Movement information
   */
  async informCaeaNoMovement(
    caea: string,
    salesPoint: number
  ): Promise<CaeaNoMovementResultDto> {
    return this.informCaeaNoMovementUseCase.execute(caea, salesPoint);
  }

  /**
   * Consult CAEA No Movement
   * @param caea CAEA number
   * @param salesPoint Sales point number
   * @returns CAEA No Movement information
   */
  async consultCaeaNoMovement(
    caea: string,
    salesPoint: number
  ): Promise<CaeaNoMovementResultDto> {
    return this.consultCaeaNoMovementUseCase.execute(caea, salesPoint);
  }

  /**
   * Inform CAEA Usage (Regimen Informativo)
   * @param caea CAEA number
   * @param salesPoint Sales point number
   * @returns CAEA Usage information
   */
  async informCaeaUsage(
    voucher: IVoucher,
    caea: string
  ): Promise<CaeaResultDto> {
    return this.informCaeaUsageUseCase.execute(voucher, caea);
  }

  /**
   * Get Quotation
   * @param currencyId Currency ID
   * @returns Quotation information
   */
  async getQuotation(currencyId: string): Promise<QuotationResultDto> {
    return this.getQuotationUseCase.execute(currencyId);
  }

  /**
   * Get Countries
   * @returns Countries information
   */
  async getCountries(): Promise<CountriesResultDto> {
    return this.getCountriesUseCase.execute();
  }

  /**
   * Get Activities
   * @returns Activities information
   */
  async getActivities(): Promise<ActivitiesResultDto> {
    return this.getActivitiesUseCase.execute();
  }

  /**
   * Get Max Records per Request
   * @returns Max records number
   */
  async getMaxRecordsPerRequest(): Promise<MaxRecordsResultDto> {
    return this.getMaxRecordsUseCase.execute();
  }

  /**
   * Alias for createVoucher method.
   */
  async createInvoice(req: IVoucher) {
    return this.createVoucher(req);
  }

  /**
   * Alias for createVoucher method.
   */
  async createNextInvoice(req: INextVoucher) {
    return this.createNextVoucher(req);
  }
}
