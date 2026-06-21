/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Voucher } from "@arcasdk/core/src/domain/entities/voucher.entity";
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
} from "@application/dto/electronic-billing";
import { ICreateVoucherResult } from "@application/dto/electronic-billing";

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
      getIvaReceptorTypes: jest.fn(),
      getCaea: jest.fn(),
      consultCaea: jest.fn(),
      informCaeaNoMovement: jest.fn(),
      consultCaeaNoMovement: jest.fn(),
      informCaeaUsage: jest.fn(),
      getQuotation: jest.fn(),
      getCountries: jest.fn(),
      getActivities: jest.fn(),
      getMaxRecordsPerRequest: jest.fn(),
    } as jest.Mocked<IElectronicBillingRepositoryPort>;

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

    const resGet =
      FECompConsultarAsyncReturnMocks[0].FECompConsultarResult.ResultGet;
    const voucherInfo: VoucherInfoResultDto = {
      codAutorizacion: resGet.CodAutorizacion,
      emisionTipo: resGet.EmisionTipo,
      fchProceso: resGet.FchProceso,
      cbteDesde: resGet.CbteDesde,
      cbteHasta: resGet.CbteHasta,
      resultado: resGet.Resultado,
      concepto: resGet.Concepto,
      docTipo: resGet.DocTipo,
      docNro: resGet.DocNro,
      cbteFch: resGet.CbteFch,
      impTotal: resGet.ImpTotal,
      impTotConc: resGet.ImpTotConc,
      impNeto: resGet.ImpNeto,
      impOpEx: resGet.ImpOpEx,
      impIVA: resGet.ImpIVA,
      impTrib: resGet.ImpTrib,
      monId: resGet.MonId,
      monCotiz: resGet.MonCotiz,
      fchVto: resGet.FchVto,
    } as VoucherInfoResultDto;
    mockRepository.getVoucherInfo.mockResolvedValue(voucherInfo);

    const createVoucherResult: ICreateVoucherResult = {
      response: {
        ...FECAESolicitarAsyncReturnMocks[0].FECAESolicitarResult,
        Events: { Evt: [] },
        Errors: { Err: [] },
      } as never,
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
            (t) => ({
              id: t.Id,
              desc: t.Desc,
              fchDesde: t.FchDesde,
              fchHasta: t.FchHasta,
            }),
          ),
      },
    } as VoucherTypesResultDto);

    mockRepository.getConceptTypes.mockResolvedValue({
      resultGet: {
        conceptoTipo:
          FEParamGetTiposConceptoAsyncReturnMocks[0].FEParamGetTiposConceptoResult.ResultGet.ConceptoTipo.map(
            (t) => ({
              id: t.Id,
              desc: t.Desc,
              fchDesde: t.FchDesde,
              fchHasta: t.FchHasta,
            }),
          ),
      },
    } as ConceptTypesResultDto);

    mockRepository.getDocumentTypes.mockResolvedValue({
      resultGet: {
        docTipo:
          FEParamGetTiposDocAsyncReturnMocks[0].FEParamGetTiposDocResult.ResultGet.DocTipo.map(
            (t) => ({
              id: t.Id,
              desc: t.Desc,
              fchDesde: t.FchDesde,
              fchHasta: t.FchHasta,
            }),
          ),
      },
    } as DocumentTypesResultDto);

    mockRepository.getAliquotTypes.mockResolvedValue({
      resultGet: {
        ivaTipo:
          FEParamGetTiposIvaAsyncReturnMocks[0].FEParamGetTiposIvaResult.ResultGet.IvaTipo.map(
            (t) => ({
              id: Number(t.Id),
              desc: t.Desc,
              fchDesde: t.FchDesde,
              fchHasta: t.FchHasta,
            }),
          ),
      },
    } as AliquotTypesResultDto);

    mockRepository.getCurrencyTypes.mockResolvedValue({
      resultGet: {
        moneda:
          FEParamGetTiposMonedasAsyncReturnMocks[0].FEParamGetTiposMonedasResult.ResultGet.Moneda.map(
            (t) => ({
              id: t.Id,
              desc: t.Desc,
              fchDesde: t.FchDesde,
              fchHasta: t.FchHasta,
            }),
          ),
      },
    } as CurrencyTypesResultDto);

    mockRepository.getOptionalTypes.mockResolvedValue({
      resultGet: {
        opcionalTipo:
          FEParamGetTiposOpcionalAsyncReturnMocks[0].FEParamGetTiposOpcionalResult.ResultGet.OpcionalTipo.map(
            (t) => ({
              id: t.Id,
              desc: t.Desc,
              fchDesde: t.FchDesde,
              fchHasta: t.FchHasta,
            }),
          ),
      },
    } as OptionalTypesResultDto);

    mockRepository.getTaxTypes.mockResolvedValue({
      resultGet: {
        tributoTipo:
          FEParamGetTiposTributosAsyncReturnMocks[0].FEParamGetTiposTributosResult.ResultGet.TributoTipo.map(
            (t) => ({
              id: t.Id,
              desc: t.Desc,
              fchDesde: t.FchDesde,
              fchHasta: t.FchHasta,
            }),
          ),
      },
    } as TaxTypesResultDto);

    mockRepository.getIvaReceptorTypes.mockResolvedValue({
      resultGet: {
        condicionIvaReceptor: [
          {
            id: 1,
            desc: "IVA Responsable Inscripto",
            cmp_Clase: "A",
          },
        ],
      },
    } as IvaReceptorTypesResultDto);
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
      testCbteTipo,
    );
    expect(lastVoucher.cbteNro).toEqual(
      FECompUltimoAutorizadoAsyncReturnMocks[0].FECompUltimoAutorizadoResult
        .CbteNro,
    );
    expect(mockRepository.getLastVoucher).toHaveBeenCalledWith(
      testPtoVta,
      testCbteTipo,
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
      testCbteTipo,
    );
    const CbteDesde = lastVoucher.cbteNro + 1;
    const CbteHasta = lastVoucher.cbteNro + 1;
    const voucher = await electronicBillingService.createVoucher({
      ...data,
      CbteDesde,
      CbteHasta,
    });
    expect(voucher.response.Errors).toBeDefined();
    expect(
      voucher.response.FeDetResp?.FECAEDetResponse?.[0]?.CbteDesde,
    ).toEqual(CbteDesde);
    expect(
      voucher.response.FeDetResp?.FECAEDetResponse?.[0]?.CbteHasta,
    ).toEqual(CbteHasta);
  });

  it("should create next voucher (orchestration)", async () => {
    // 1. Setup mock for getLastVoucher
    const lastVoucherNumber = 100;
    mockRepository.getLastVoucher.mockResolvedValue({
      cbteNro: lastVoucherNumber,
      cbteTipo: testCbteTipo,
      ptoVta: testPtoVta,
    });

    // 2. Define input for createNextVoucher
    const nextVoucherReq = {
      ...data,
      PtoVta: testPtoVta,
      CbteTipo: testCbteTipo,
    };
    delete (nextVoucherReq as any).CbteDesde;
    delete (nextVoucherReq as any).CbteHasta;

    // 3. Execute
    await electronicBillingService.createNextVoucher(nextVoucherReq);

    // 4. Verify orchestration
    expect(mockRepository.getLastVoucher).toHaveBeenCalledWith(
      testPtoVta,
      testCbteTipo,
    );
    expect(mockRepository.createVoucher).toHaveBeenCalled();
    const createdVoucher = mockRepository.createVoucher.mock
      .calls[0][0] as Voucher;
    const dto = createdVoucher.toDTO();
    expect(dto.CbteDesde).toBe(lastVoucherNumber + 1);
    expect(dto.CbteHasta).toBe(lastVoucherNumber + 1);
  });

  it("should get voucher info", async () => {
    const voucherInfo = await electronicBillingService.getVoucherInfo(
      testCbteNro,
      testPtoVta,
      testCbteTipo,
    );
    expect(voucherInfo).not.toBeNull();
    expect(voucherInfo?.codAutorizacion).toBeDefined();
    expect(mockRepository.getVoucherInfo).toHaveBeenCalledWith(
      testCbteNro,
      testPtoVta,
      testCbteTipo,
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

  it("should get IVA receptor types", async () => {
    const ivaReceptorTypes =
      await electronicBillingService.getIvaReceptorTypes();
    expect(ivaReceptorTypes).toBeDefined();
    expect(mockRepository.getIvaReceptorTypes).toHaveBeenCalledTimes(1);
  });

  it("should get CAEA", async () => {
    const period = 202310;
    const order = 1;
    const mockResult = {
      resultGet: {
        caea: "12345678901234",
        periodo: 202310,
        orden: 1,
        fchVigDesde: "20231001",
        fchVigHasta: "20231031",
        fchTopeInf: "20231110",
        fchProceso: "20231001",
      },
    };
    mockRepository.getCaea.mockResolvedValue(mockResult as never);

    const result = await electronicBillingService.getCaea(period, order);

    expect(result).toEqual(mockResult);
    expect(mockRepository.getCaea).toHaveBeenCalledWith(period, order);
  });

  it("should inform CAEA usage", async () => {
    const caea = "12345678901234";
    const voucherData = { ...data };
    const mockResult = {
      resultGet: {
        caea: "12345678901234",
        concepto: 1,
        docTipo: 80,
        docNro: 20111111112,
        cbteDesde: 1,
        cbteHasta: 1,
        cbteFch: "20231001",
        resultado: "A",
      },
    };
    mockRepository.informCaeaUsage.mockResolvedValue(mockResult as never);

    const result = await electronicBillingService.informCaeaUsage(
      voucherData,
      caea,
    );

    expect(result).toEqual(mockResult);
    expect(mockRepository.informCaeaUsage).toHaveBeenCalledWith(
      expect.any(Voucher),
      caea,
    );
  });

  it("should inform CAEA no movement", async () => {
    const caea = "12345678901234";
    const ptoVta = 1;
    const mockResult = {
      resultGet: [
        {
          caea: "12345678901234",
          fchProceso: "20231101",
          ptoVta: 1,
        },
      ],
    };
    mockRepository.informCaeaNoMovement.mockResolvedValue(mockResult as never);

    const result = await electronicBillingService.informCaeaNoMovement(
      caea,
      ptoVta,
    );

    expect(result).toEqual(mockResult);
    expect(mockRepository.informCaeaNoMovement).toHaveBeenCalledWith(
      caea,
      ptoVta,
    );
  });

  it("should consult CAEA no movement", async () => {
    const caea = "12345678901234";
    const ptoVta = 1;
    const mockResult = {
      resultGet: [
        {
          caea: "12345678901234",
          fchProceso: "20231101",
          ptoVta: 1,
        },
      ],
    };
    mockRepository.consultCaeaNoMovement.mockResolvedValue(mockResult as never);

    const result = await electronicBillingService.consultCaeaNoMovement(
      caea,
      ptoVta,
    );

    expect(result).toEqual(mockResult);
    expect(mockRepository.consultCaeaNoMovement).toHaveBeenCalledWith(
      caea,
      ptoVta,
    );
  });

  it("should consult CAEA", async () => {
    const period = 202310;
    const order = 1;
    const mockResult = {
      resultGet: {
        caea: "12345678901234",
        periodo: 202310,
        orden: 1,
        fchVigDesde: "20231001",
        fchVigHasta: "20231031",
        fchTopeInf: "20231110",
        fchProceso: "20231001",
      },
    };
    mockRepository.consultCaea.mockResolvedValue(mockResult as never);

    const result = await electronicBillingService.consultCaea(period, order);

    expect(result).toEqual(mockResult);
    expect(mockRepository.consultCaea).toHaveBeenCalledWith(period, order);
  });

  it("should get quotation by currency", async () => {
    const mockResult = {
      resultGet: {
        monId: "DOL",
        monCotiz: 1012.25,
        fchCotiz: "20240507",
      },
    };
    mockRepository.getQuotation.mockResolvedValue(mockResult as never);

    const result = await electronicBillingService.getQuotation("DOL");

    expect(result).toEqual(mockResult);
    expect(mockRepository.getQuotation).toHaveBeenCalledWith("DOL");
  });

  it("should get countries", async () => {
    const mockResult = {
      resultGet: {
        paisTipo: [
          { id: 200, desc: "ARGENTINA", fchDesde: "20100101", fchHasta: null },
        ],
      },
    };
    mockRepository.getCountries.mockResolvedValue(mockResult as never);

    const result = await electronicBillingService.getCountries();

    expect(result).toEqual(mockResult);
    expect(mockRepository.getCountries).toHaveBeenCalledTimes(1);
  });

  it("should get activities", async () => {
    const mockResult = {
      resultGet: {
        actividadTipo: [
          {
            id: 620100,
            desc: "SERVICIOS",
            fchDesde: "20100101",
            fchHasta: null,
          },
        ],
      },
    };
    mockRepository.getActivities.mockResolvedValue(mockResult as never);

    const result = await electronicBillingService.getActivities();

    expect(result).toEqual(mockResult);
    expect(mockRepository.getActivities).toHaveBeenCalledTimes(1);
  });

  it("should get max records per request", async () => {
    const mockResult = {
      resultGet: 500,
    };
    mockRepository.getMaxRecordsPerRequest.mockResolvedValue(
      mockResult as never,
    );

    const result = await electronicBillingService.getMaxRecordsPerRequest();

    expect(result).toEqual(mockResult);
    expect(mockRepository.getMaxRecordsPerRequest).toHaveBeenCalledTimes(1);
  });

  it("should create invoice as alias of createVoucher", async () => {
    const voucherInput = {
      ...data,
      CbteDesde: 10,
      CbteHasta: 10,
    };

    await electronicBillingService.createInvoice(voucherInput);

    expect(mockRepository.createVoucher).toHaveBeenCalledTimes(1);
  });

  it("should create next invoice as alias of createNextVoucher", async () => {
    const lastVoucherNumber = 77;
    mockRepository.getLastVoucher.mockResolvedValue({
      cbteNro: lastVoucherNumber,
      cbteTipo: testCbteTipo,
      ptoVta: testPtoVta,
    });

    const req = {
      ...data,
      PtoVta: testPtoVta,
      CbteTipo: testCbteTipo,
    };
    delete (req as any).CbteDesde;
    delete (req as any).CbteHasta;

    await electronicBillingService.createNextInvoice(req as never);

    expect(mockRepository.getLastVoucher).toHaveBeenCalledWith(
      testPtoVta,
      testCbteTipo,
    );
    expect(mockRepository.createVoucher).toHaveBeenCalledTimes(1);
  });
});
