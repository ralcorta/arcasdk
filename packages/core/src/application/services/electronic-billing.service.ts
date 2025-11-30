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
