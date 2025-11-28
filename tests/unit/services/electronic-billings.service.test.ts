/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FECAESolicitarAsyncReturnMocks,
  FECompConsultarAsyncReturnMocks,
  FECompUltimoAutorizadoAsyncReturnMocks,
  FEDummyAsyncReturnMocks,
  FEParamGetPtosVentaAsyncReturnMocks,
  FEParamGetTiposCbteAsyncReturnMocks,
  FEParamGetTiposConceptoAsyncReturnMocks,
  FEParamGetTiposDocAsyncReturnMocks,
  FEParamGetTiposIvaAsyncReturnMocks,
  FEParamGetTiposMonedasAsyncReturnMocks,
  FEParamGetTiposOpcionalAsyncReturnMocks,
  FEParamGetTiposTributosAsyncReturnMocks,
} from "../../mocks/data/soapClient.mock";
import {
  data,
  testCbteNro,
  testCbteTipo,
  testCuit,
  testPtoVta,
} from "../../mocks/data/voucher.mock";
import { Arca } from "../../../src/arca";
import { TestConfigUtils } from "../../utils/config.utils";
import { AccessTicket } from "../../../src/auth/access-ticket";
import { mockLoginCredentials } from "../../mocks/data/credential-json.mock";

describe("Electronic Billings Service", () => {
  let arca: Arca;
  let arcaRemote: Arca;

  beforeEach(async () => {
    arca = new Arca({
      key: await TestConfigUtils.getKey(),
      cert: await TestConfigUtils.getCert(),
      cuit: testCuit,
    });

    arcaRemote = new Arca({
      key: await TestConfigUtils.getKey(),
      cert: await TestConfigUtils.getCert(),
      cuit: testCuit,
      handleTicket: true,
    });

    const afipMockParams = {
      FEDummyAsync: jest.fn().mockResolvedValue(FEDummyAsyncReturnMocks),
      FEParamGetPtosVentaAsync: jest
        .fn()
        .mockResolvedValue(FEParamGetPtosVentaAsyncReturnMocks),
      FECompUltimoAutorizadoAsync: jest
        .fn()
        .mockResolvedValue(FECompUltimoAutorizadoAsyncReturnMocks),
      FECAESolicitarAsync: jest
        .fn()
        .mockResolvedValue(FECAESolicitarAsyncReturnMocks),
      FECompConsultarAsync: jest
        .fn()
        .mockResolvedValue(FECompConsultarAsyncReturnMocks),
      FEParamGetTiposCbteAsync: jest
        .fn()
        .mockResolvedValue(FEParamGetTiposCbteAsyncReturnMocks),
      FEParamGetTiposConceptoAsync: jest
        .fn()
        .mockResolvedValue(FEParamGetTiposConceptoAsyncReturnMocks),
      FEParamGetTiposDocAsync: jest
        .fn()
        .mockResolvedValue(FEParamGetTiposDocAsyncReturnMocks),
      FEParamGetTiposIvaAsync: jest
        .fn()
        .mockResolvedValue(FEParamGetTiposIvaAsyncReturnMocks),
      FEParamGetTiposMonedasAsync: jest
        .fn()
        .mockResolvedValue(FEParamGetTiposMonedasAsyncReturnMocks),
      FEParamGetTiposOpcionalAsync: jest
        .fn()
        .mockResolvedValue(FEParamGetTiposOpcionalAsyncReturnMocks),
      FEParamGetTiposTributosAsync: jest
        .fn()
        .mockResolvedValue(FEParamGetTiposTributosAsyncReturnMocks),
    } as any;

    jest
      .spyOn(arca.electronicBillingService, "getClient")
      .mockReturnValue(afipMockParams);
    jest
      .spyOn(arcaRemote.electronicBillingService, "getClient")
      .mockReturnValue(afipMockParams);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get server status", async () => {
    const { electronicBillingService } = arca;
    const status = await electronicBillingService.getServerStatus();
    expect(status).toEqual(FEDummyAsyncReturnMocks[0]);
  });

  it("should get the last type 11 voucher from sale point 2", async () => {
    const { electronicBillingService } = arca;
    const lastVoucher = await electronicBillingService.getLastVoucher(
      testPtoVta,
      testCbteTipo
    );
    expect(lastVoucher).toStrictEqual(
      FECompUltimoAutorizadoAsyncReturnMocks[0].FECompUltimoAutorizadoResult
    );
  });

  it("should get sales points", async () => {
    const { electronicBillingService } = arca;
    const status = await electronicBillingService.getSalesPoints();
    expect(status).not.toBeNull();
  });

  it("should create a voucher from correct params with createVoucher", async () => {
    const { electronicBillingService } = arca;
    const lastVoucher = await electronicBillingService.getLastVoucher(
      testPtoVta,
      testCbteTipo
    );
    const CbteDesde = lastVoucher.CbteNro + 1;
    const CbteHasta = lastVoucher.CbteNro + 1;
    const voucher = await electronicBillingService.createVoucher({
      ...data,
      CbteDesde,
      CbteHasta,
    });
    expect(voucher.response.Errors).toBeUndefined();
    expect(voucher.response.FeDetResp.FECAEDetResponse[0].CbteDesde).toEqual(
      CbteDesde
    );
    expect(voucher.response.FeDetResp.FECAEDetResponse[0].CbteHasta).toEqual(
      CbteHasta
    );
  });

  it("should create the next voucher using the previous voucher created as a starting point", async () => {
    const { electronicBillingService } = arca;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { CbteDesde, CbteHasta, ...voucherData } = data;
    const voucher = await electronicBillingService.createNextVoucher(
      voucherData
    );
    expect(voucher.response.Errors).toBeUndefined();
    expect(voucher.response.FeDetResp.FECAEDetResponse[0].CbteDesde).toEqual(
      testCbteNro + 1
    );
    expect(voucher.response.FeDetResp.FECAEDetResponse[0].CbteHasta).toEqual(
      testCbteNro + 1
    );
  });

  it("should get voucher info", async () => {
    expect(
      await arca.electronicBillingService.getVoucherInfo(
        testCbteNro,
        testPtoVta,
        testCbteTipo
      )
    ).toStrictEqual(FECompConsultarAsyncReturnMocks[0].FECompConsultarResult);
  });

  it("should get sales points with an authorized ticket after an initialization of afib with handleTicket true", async () => {
    const { electronicBillingService } = new Arca({
      key: await TestConfigUtils.getKey(),
      cert: await TestConfigUtils.getCert(),
      cuit: testCuit,
      handleTicket: true,
    });

    const afipAuthMock = {
      login: jest
        .fn()
        .mockResolvedValue(new AccessTicket(mockLoginCredentials)),
    };

    electronicBillingService["_afipAuth"] = afipAuthMock as any;

    jest.spyOn(electronicBillingService, "getWsAuth");
    const ticket = await electronicBillingService.login();
    electronicBillingService.setCredentials(ticket);
    const status = await electronicBillingService.getSalesPoints();
    expect(status).not.toBeNull();
    expect(electronicBillingService.getWsAuth).toHaveBeenCalled();
  });

  it("should create a voucher with an authorized ticket after an initialization of afib with handleTicket true", async () => {
    const { electronicBillingService } = arcaRemote;
    const afipAuthMock = {
      login: jest
        .fn()
        .mockResolvedValue(new AccessTicket(mockLoginCredentials)),
    };

    electronicBillingService["_afipAuth"] = afipAuthMock as any;

    const ticket = await electronicBillingService.login();
    electronicBillingService.setCredentials(ticket);
    const { CbteDesde, CbteHasta, ...voucherData } = data;
    const voucher = await electronicBillingService.createNextVoucher(
      voucherData
    );
    expect(voucher.response.Errors).toBeUndefined();
    expect(voucher.response.FeDetResp.FECAEDetResponse[0].CbteDesde).toEqual(
      testCbteNro + 1
    );
    expect(voucher.response.FeDetResp.FECAEDetResponse[0].CbteHasta).toEqual(
      testCbteNro + 1
    );
  });

  it("should get voucher types", async () => {
    expect(await arca.electronicBillingService.getVoucherTypes()).toStrictEqual(
      FEParamGetTiposCbteAsyncReturnMocks[0].FEParamGetTiposCbteResult
    );
  });

  it("should get concept types", async () => {
    expect(await arca.electronicBillingService.getConceptTypes()).toStrictEqual(
      FEParamGetTiposConceptoAsyncReturnMocks[0].FEParamGetTiposConceptoResult
    );
  });

  it("should get document types", async () => {
    expect(
      await arca.electronicBillingService.getDocumentTypes()
    ).toStrictEqual(
      FEParamGetTiposDocAsyncReturnMocks[0].FEParamGetTiposDocResult
    );
  });

  it("should get aliquota types", async () => {
    expect(await arca.electronicBillingService.getAliquotTypes()).toStrictEqual(
      FEParamGetTiposIvaAsyncReturnMocks[0].FEParamGetTiposIvaResult
    );
  });

  it("should get currencies types", async () => {
    expect(
      await arca.electronicBillingService.getCurrenciesTypes()
    ).toStrictEqual(
      FEParamGetTiposMonedasAsyncReturnMocks[0].FEParamGetTiposMonedasResult
    );
  });

  it("should get Options types", async () => {
    expect(await arca.electronicBillingService.getOptionsTypes()).toStrictEqual(
      FEParamGetTiposOpcionalAsyncReturnMocks[0].FEParamGetTiposOpcionalResult
    );
  });

  it("should get Tax types", async () => {
    expect(await arca.electronicBillingService.getTaxTypes()).toStrictEqual(
      FEParamGetTiposTributosAsyncReturnMocks[0].FEParamGetTiposTributosResult
    );
  });
});
