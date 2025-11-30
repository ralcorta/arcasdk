/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FECAESolicitarAsyncReturnMocks,
  FECompConsultarAsyncReturnMocks,
  FECompUltimoAutorizadoAsyncReturnMocks,
  FEDummyAsyncReturnMocks,
  FEParamGetTiposCbteAsyncReturnMocks,
  FEParamGetTiposConceptoAsyncReturnMocks,
  FEParamGetTiposDocAsyncReturnMocks,
  FEParamGetTiposIvaAsyncReturnMocks,
  FEParamGetTiposMonedasAsyncReturnMocks,
  FEParamGetTiposOpcionalAsyncReturnMocks,
  FEParamGetTiposTributosAsyncReturnMocks,
} from "../../../mocks/data/soapClient.mock";
import {
  data,
  testCbteNro,
  testCbteTipo,
  testPtoVta,
} from "../../../mocks/data/voucher.mock";
import { ElectronicBillingService } from "@arcasdk/core/src/application/services/electronic-billing.service";
import { IElectronicBillingRepositoryPort } from "@arcasdk/core/src/application/ports/electronic-billing/electronic-billing-repository.port";
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
} from "@arcasdk/core/src/application/dto/electronic-billing.dto";
import { ICreateVoucherResult } from "@arcasdk/core/src/application/types/result.types";

describe("Electronic Billings Service", () => {
  let electronicBillingService: ElectronicBillingService;
  let mockRepository: jest.Mocked<IElectronicBillingRepositoryPort>;

  beforeEach(() => {
    // Create mock repository
    mockRepository = {
      getServerStatus: jest.fn(),
      getSalesPoints: jest.fn(),
      getLastVoucher: jest.fn(),
      createVoucher: jest.fn(),
      getVoucherInfo: jest.fn(),
      getVoucherTypes: jest.fn(),
      getConceptTypes: jest.fn(),
      getDocumentTypes: jest.fn(),
      getAliquotTypes: jest.fn(),
      getCurrencyTypes: jest.fn(),
      getOptionalTypes: jest.fn(),
      getTaxTypes: jest.fn(),
    } as any;

    // Create service with mocked repository
    electronicBillingService = new ElectronicBillingService(mockRepository);

    // Setup default mock responses
    const serverStatus: ServerStatusDto = {
      appServer: FEDummyAsyncReturnMocks[0].FEDummyResult.AppServer,
      dbServer: FEDummyAsyncReturnMocks[0].FEDummyResult.DbServer,
      authServer: FEDummyAsyncReturnMocks[0].FEDummyResult.AuthServer,
    };
    mockRepository.getServerStatus.mockResolvedValue(serverStatus);

    const salesPoints: SalesPointsResultDto = {
      resultGet: {
        ptoVenta: [], // Mock doesn't have ResultGet, only Errors
      },
      errors: {
        err: [
          {
            code: 602,
            msg: "Sin Resultados: - Metodo FEParamGetPtosVenta",
          },
        ],
      },
    };
    mockRepository.getSalesPoints.mockResolvedValue(salesPoints);

    const lastVoucher: LastVoucherResultDto = {
      cbteNro:
        FECompUltimoAutorizadoAsyncReturnMocks[0].FECompUltimoAutorizadoResult
          .CbteNro,
      cbteTipo:
        FECompUltimoAutorizadoAsyncReturnMocks[0].FECompUltimoAutorizadoResult
          .CbteTipo,
      ptoVta:
        FECompUltimoAutorizadoAsyncReturnMocks[0].FECompUltimoAutorizadoResult
          .PtoVta,
    } as LastVoucherResultDto;
    mockRepository.getLastVoucher.mockResolvedValue(lastVoucher);

    const resultGet =
      FECompConsultarAsyncReturnMocks[0].FECompConsultarResult.ResultGet;
    const voucherInfo: VoucherInfoResultDto = {
      codAutorizacion: resultGet.CodAutorizacion,
      emisionTipo: resultGet.EmisionTipo,
      fchProceso: resultGet.FchProceso,
      cbteDesde: resultGet.CbteDesde,
      cbteHasta: resultGet.CbteHasta,
      resultado: resultGet.Resultado,
      concepto: resultGet.Concepto,
      docTipo: resultGet.DocTipo,
      docNro: resultGet.DocNro,
      cbteFch: resultGet.CbteFch,
      impTotal: resultGet.ImpTotal,
      impTotConc: resultGet.ImpTotConc,
      impNeto: resultGet.ImpNeto,
      impOpEx: resultGet.ImpOpEx,
      impIVA: resultGet.ImpIVA,
      impTrib: resultGet.ImpTrib,
      monId: resultGet.MonId,
      monCotiz: resultGet.MonCotiz,
      fchVto: resultGet.FchVto,
    } as VoucherInfoResultDto;
    mockRepository.getVoucherInfo.mockResolvedValue(voucherInfo);

    const createVoucherResult: ICreateVoucherResult = {
      response: {
        ...FECAESolicitarAsyncReturnMocks[0].FECAESolicitarResult,
        Events: undefined,
        Errors: undefined,
      } as any,
      cae:
        FECAESolicitarAsyncReturnMocks[0].FECAESolicitarResult.FeDetResp
          ?.FECAEDetResponse?.[0]?.CAE || "",
      caeFchVto:
        FECAESolicitarAsyncReturnMocks[0].FECAESolicitarResult.FeDetResp
          ?.FECAEDetResponse?.[0]?.CAEFchVto || "",
    };
    mockRepository.createVoucher.mockResolvedValue(createVoucherResult);

    mockRepository.getVoucherTypes.mockResolvedValue({
      resultGet: {
        cbteTipo:
          FEParamGetTiposCbteAsyncReturnMocks[0].FEParamGetTiposCbteResult.ResultGet.CbteTipo.map(
            (t: any) => ({
              id: t.Id,
              desc: t.Desc,
              fchDesde: t.FchDesde,
              fchHasta: t.FchHasta,
            })
          ),
      },
    } as VoucherTypesResultDto);

    mockRepository.getConceptTypes.mockResolvedValue({
      resultGet: {
        concepto:
          FEParamGetTiposConceptoAsyncReturnMocks[0].FEParamGetTiposConceptoResult.ResultGet.ConceptoTipo.map(
            (t: any) => ({
              id: t.Id,
              desc: t.Desc,
              fchDesde: t.FchDesde,
              fchHasta: t.FchHasta,
            })
          ),
      },
    } as ConceptTypesResultDto);

    mockRepository.getDocumentTypes.mockResolvedValue({
      resultGet: {
        docTipo:
          FEParamGetTiposDocAsyncReturnMocks[0].FEParamGetTiposDocResult.ResultGet.DocTipo.map(
            (t: any) => ({
              id: t.Id,
              desc: t.Desc,
              fchDesde: t.FchDesde,
              fchHasta: t.FchHasta,
            })
          ),
      },
    } as DocumentTypesResultDto);

    mockRepository.getAliquotTypes.mockResolvedValue({
      resultGet: {
        ivaTipo:
          FEParamGetTiposIvaAsyncReturnMocks[0].FEParamGetTiposIvaResult.ResultGet.IvaTipo.map(
            (t: any) => ({
              id: t.Id,
              desc: t.Desc,
              fchDesde: t.FchDesde,
              fchHasta: t.FchHasta,
            })
          ),
      },
    } as AliquotTypesResultDto);

    mockRepository.getCurrencyTypes.mockResolvedValue({
      resultGet: {
        moneda:
          FEParamGetTiposMonedasAsyncReturnMocks[0].FEParamGetTiposMonedasResult.ResultGet.Moneda.map(
            (t: any) => ({
              id: t.Id,
              desc: t.Desc,
              fchDesde: t.FchDesde,
              fchHasta: t.FchHasta,
            })
          ),
      },
    } as CurrencyTypesResultDto);

    mockRepository.getOptionalTypes.mockResolvedValue({
      resultGet: {
        opcionalTipo:
          FEParamGetTiposOpcionalAsyncReturnMocks[0].FEParamGetTiposOpcionalResult.ResultGet.OpcionalTipo.map(
            (t: any) => ({
              id: t.Id,
              desc: t.Desc,
              fchDesde: t.FchDesde,
              fchHasta: t.FchHasta,
            })
          ),
      },
    } as OptionalTypesResultDto);

    mockRepository.getTaxTypes.mockResolvedValue({
      resultGet: {
        tributoTipo:
          FEParamGetTiposTributosAsyncReturnMocks[0].FEParamGetTiposTributosResult.ResultGet.TributoTipo.map(
            (t: any) => ({
              id: t.Id,
              desc: t.Desc,
              fchDesde: t.FchDesde,
              fchHasta: t.FchHasta,
            })
          ),
      },
    } as TaxTypesResultDto);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get server status", async () => {
    const status = await electronicBillingService.getServerStatus();
    expect(status).toEqual({
      appServer: FEDummyAsyncReturnMocks[0].FEDummyResult.AppServer,
      dbServer: FEDummyAsyncReturnMocks[0].FEDummyResult.DbServer,
      authServer: FEDummyAsyncReturnMocks[0].FEDummyResult.AuthServer,
    });
    expect(mockRepository.getServerStatus).toHaveBeenCalledTimes(1);
  });

  it("should get the last type 11 voucher from sale point 2", async () => {
    const lastVoucher = await electronicBillingService.getLastVoucher(
      testPtoVta,
      testCbteTipo
    );
    expect(lastVoucher.cbteNro).toEqual(
      FECompUltimoAutorizadoAsyncReturnMocks[0].FECompUltimoAutorizadoResult
        .CbteNro
    );
    expect(mockRepository.getLastVoucher).toHaveBeenCalledWith(
      testPtoVta,
      testCbteTipo
    );
  });

  it("should get sales points", async () => {
    const salesPoints = await electronicBillingService.getSalesPoints();
    expect(salesPoints).not.toBeNull();
    expect(salesPoints.resultGet?.ptoVenta).toBeDefined();
    expect(mockRepository.getSalesPoints).toHaveBeenCalledTimes(1);
  });

  it("should create a voucher from correct params with createVoucher", async () => {
    const lastVoucher = await electronicBillingService.getLastVoucher(
      testPtoVta,
      testCbteTipo
    );
    const CbteDesde = lastVoucher.cbteNro + 1;
    const CbteHasta = lastVoucher.cbteNro + 1;
    const voucher = await electronicBillingService.createVoucher({
      ...data,
      CbteDesde,
      CbteHasta,
    });
    expect(voucher.response.Errors).toBeUndefined();
    expect(
      voucher.response.FeDetResp?.FECAEDetResponse?.[0]?.CbteDesde
    ).toEqual(CbteDesde);
    expect(
      voucher.response.FeDetResp?.FECAEDetResponse?.[0]?.CbteHasta
    ).toEqual(CbteHasta);
    expect(mockRepository.createVoucher).toHaveBeenCalled();
  });

  it("should create the next voucher using the previous voucher created as a starting point", async () => {
    const { CbteDesde, CbteHasta, ...voucherData } = data;
    const voucher = await electronicBillingService.createNextVoucher(
      voucherData
    );
    expect(voucher.response.Errors).toBeUndefined();
    expect(
      voucher.response.FeDetResp?.FECAEDetResponse?.[0]?.CbteDesde
    ).toEqual(testCbteNro + 1);
    expect(
      voucher.response.FeDetResp?.FECAEDetResponse?.[0]?.CbteHasta
    ).toEqual(testCbteNro + 1);
    expect(mockRepository.createVoucher).toHaveBeenCalled();
  });

  it("should get voucher info", async () => {
    const voucherInfo = await electronicBillingService.getVoucherInfo(
      testCbteNro,
      testPtoVta,
      testCbteTipo
    );
    expect(voucherInfo).not.toBeNull();
    expect(voucherInfo?.codAutorizacion).toBeDefined();
    expect(mockRepository.getVoucherInfo).toHaveBeenCalledWith(
      testCbteNro,
      testPtoVta,
      testCbteTipo
    );
  });

  it("should get voucher types", async () => {
    const voucherTypes = await electronicBillingService.getVoucherTypes();
    expect(voucherTypes).toBeDefined();
    expect(mockRepository.getVoucherTypes).toHaveBeenCalledTimes(1);
  });

  it("should get concept types", async () => {
    const conceptTypes = await electronicBillingService.getConceptTypes();
    expect(conceptTypes).toBeDefined();
    expect(mockRepository.getConceptTypes).toHaveBeenCalledTimes(1);
  });

  it("should get document types", async () => {
    const documentTypes = await electronicBillingService.getDocumentTypes();
    expect(documentTypes).toBeDefined();
    expect(mockRepository.getDocumentTypes).toHaveBeenCalledTimes(1);
  });

  it("should get aliquota types", async () => {
    const aliquotTypes = await electronicBillingService.getAliquotTypes();
    expect(aliquotTypes).toBeDefined();
    expect(mockRepository.getAliquotTypes).toHaveBeenCalledTimes(1);
  });

  it("should get currencies types", async () => {
    const currencyTypes = await electronicBillingService.getCurrenciesTypes();
    expect(currencyTypes).toBeDefined();
    expect(mockRepository.getCurrencyTypes).toHaveBeenCalledTimes(1);
  });

  it("should get Options types", async () => {
    const optionsTypes = await electronicBillingService.getOptionsTypes();
    expect(optionsTypes).toBeDefined();
    expect(mockRepository.getOptionalTypes).toHaveBeenCalledTimes(1);
  });

  it("should get Tax types", async () => {
    const taxTypes = await electronicBillingService.getTaxTypes();
    expect(taxTypes).toBeDefined();
    expect(mockRepository.getTaxTypes).toHaveBeenCalledTimes(1);
  });
});
