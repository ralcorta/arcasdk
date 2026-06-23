import { FecredRepository } from "@infrastructure/repositories/fecred/fecred.repository";
import { SoapClient } from "@infrastructure/soap/soap-client";
import { BaseSoapRepositoryConstructorConfig } from "@infrastructure/types/soap-repository.types";
import { IFECredServiceSOAPSoap } from "@infrastructure/soap/contracts/FECredService/ServiceSoap";

jest.mock("@infrastructure/soap/soap-client");

describe("FecredRepository", () => {
  let repository: FecredRepository;
  let mockSoapClient: jest.Mocked<IFECredServiceSOAPSoap>;
  let mockConfig: BaseSoapRepositoryConstructorConfig;
  const expectedAuth = {
    authRequest: {
      token: "token",
      sign: "sign",
      cuitRepresentada: 12345678901,
    },
  };

  beforeEach(() => {
    mockSoapClient = {
      aceptarFECredAsync: jest.fn(),
      rechazarFECredAsync: jest.fn(),
      consultarComprobantesAsync: jest.fn(),
      consultarCtasCtesAsync: jest.fn(),
      consultarCtaCteAsync: jest.fn(),
      informarCancelacionTotalFECredAsync: jest.fn(),
      rechazarNotaDCAsync: jest.fn(),
      informarFacturaAgtDptoCltvAsync: jest.fn(),
      consultarFacturasAgtDptoCltvAsync: jest.fn(),
      consultarCuentasEnAgtDptoCltvAsync: jest.fn(),
      consultarObligadoRecepcionAsync: jest.fn(),
      consultarTiposRetencionesAsync: jest.fn(),
      consultarTiposMotivosRechazoAsync: jest.fn(),
      consultarTiposFormasCancelacionAsync: jest.fn(),
      obtenerRemitosAsync: jest.fn(),
      consultarHistorialEstadosComprobanteAsync: jest.fn(),
      consultarHistorialEstadosCtaCteAsync: jest.fn(),
      consultarTiposAjustesOperacionAsync: jest.fn(),
      consultarMontoObligadoRecepcionAsync: jest.fn(),
      modificarOpcionTransferenciaAsync: jest.fn(),
      dummyAsync: jest.fn(),
      setEndpoint: jest.fn(),
      describe: jest.fn().mockReturnValue({
        Service: {
          ServiceSoap12: {},
        },
      }),
    } as never;

    (SoapClient.prototype.createClient as jest.Mock).mockResolvedValue(
      mockSoapClient,
    );

    const mockAuthRepository = {
      login: jest.fn().mockResolvedValue({ token: "token", sign: "sign" }),
      getAuthParams: jest.fn().mockReturnValue({
        Auth: { Token: "token", Sign: "sign", Cuit: 12345678901 },
      }),
    } as never;

    mockConfig = {
      authRepository: mockAuthRepository,
      cuit: 12345678901,
      production: false,
    };

    repository = new FecredRepository(mockConfig);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("aceptarFECred", () => {
    it("should accept an electronic credit invoice", async () => {
      const mockResponse = {
        aceptarFECredReturn: { resultado: "A" },
      };
      mockSoapClient.aceptarFECredAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = {
        idCtaCte: 1,
        formasCancelacion: { formaCancelacion: [] },
      };
      const result = await repository.aceptarFECred(input as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.aceptarFECredAsync).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("rechazarFECred", () => {
    it("should reject an electronic credit invoice", async () => {
      const mockResponse = {
        rechazarFECredReturn: { resultado: "A" },
      };
      mockSoapClient.rechazarFECredAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = {
        idCtaCte: 1,
        codMotivo: 1,
        desMotivo: "Test",
      };
      const result = await repository.rechazarFECred(input as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.rechazarFECredAsync).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("consultarComprobantes", () => {
    it("should query invoices", async () => {
      const mockResponse = {
        consultarComprobantesReturn: {
          arrayComprobantes: { comprobante: [] },
        },
      };
      mockSoapClient.consultarComprobantesAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = {
        rol: "Emisor",
        cuitContraparte: 20111111112,
        tipoComprobante: 1,
      };
      const result = await repository.consultarComprobantes(input as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.consultarComprobantesAsync).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("consultarCtasCtes", () => {
    it("should query current accounts", async () => {
      const mockResponse = {
        consultarCtasCtesReturn: {
          arrayCtasCtes: { ctaCte: [] },
        },
      };
      mockSoapClient.consultarCtasCtesAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = {
        rol: "Emisor",
        cuitContraparte: 20111111112,
      };
      const result = await repository.consultarCtasCtes(input as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.consultarCtasCtesAsync).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("consultarCtaCte", () => {
    it("should query a specific current account", async () => {
      const mockResponse = {
        consultarCtaCteReturn: { ctaCte: { idCtaCte: 1 } },
      };
      mockSoapClient.consultarCtaCteAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = { idCtaCte: 1 };
      const result = await repository.consultarCtaCte(input as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.consultarCtaCteAsync).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("informarCancelacionTotalFECred", () => {
    it("should report total cancellation", async () => {
      const mockResponse = {
        informarCancelacionTotalFECredReturn: { resultado: "A" },
      };
      mockSoapClient.informarCancelacionTotalFECredAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = {
        idCtaCte: 1,
        formasCancelacion: { formaCancelacion: [] },
        importeCancelacion: 1000,
      };
      const result = await repository.informarCancelacionTotalFECred(
        input as never,
      );

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.informarCancelacionTotalFECredAsync,
      ).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("rechazarNotaDC", () => {
    it("should reject a debit/credit note", async () => {
      const mockResponse = {
        rechazarNotaDCReturn: { resultado: "A" },
      };
      mockSoapClient.rechazarNotaDCAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = {
        CUITEmisor: 20111111112,
        tipoComprobante: 1,
        puntoVenta: 1,
        nroComprobante: 1,
        codMotivo: 1,
        desMotivo: "Test",
      };
      const result = await repository.rechazarNotaDC(input as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.rechazarNotaDCAsync).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("informarFacturaAgtDptoCltv", () => {
    it("should report invoice to collection agent", async () => {
      const mockResponse = {
        informarFacturaAgtDptoCltvReturn: { resultado: "A" },
      };
      mockSoapClient.informarFacturaAgtDptoCltvAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = { idCtaCte: 1, cuentaAgtDptoCltv: "test" };
      const result = await repository.informarFacturaAgtDptoCltv(
        input as never,
      );

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.informarFacturaAgtDptoCltvAsync,
      ).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("consultarFacturasAgtDptoCltv", () => {
    it("should query invoices in collection agent", async () => {
      const mockResponse = {
        consultarFacturasAgtDptoCltvReturn: {
          arrayFacturas: { factura: [] },
        },
      };
      mockSoapClient.consultarFacturasAgtDptoCltvAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = { idCtaCte: 1 };
      const result = await repository.consultarFacturasAgtDptoCltv(
        input as never,
      );

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.consultarFacturasAgtDptoCltvAsync,
      ).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("consultarCuentasEnAgtDptoCltv", () => {
    it("should query accounts in collection agent", async () => {
      const mockResponse = {
        consultarCuentasEnAgtDptoCltvReturn: {
          arrayCuentas: { cuenta: [] },
        },
      };
      mockSoapClient.consultarCuentasEnAgtDptoCltvAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.consultarCuentasEnAgtDptoCltv();

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.consultarCuentasEnAgtDptoCltvAsync,
      ).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("consultarObligadoRecepcion", () => {
    it("should check obligation status", async () => {
      const mockResponse = {
        consultarObligadoRecepcionReturn: { obligado: true },
      };
      mockSoapClient.consultarObligadoRecepcionAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = { cuitConsultada: 20111111112 };
      const result = await repository.consultarObligadoRecepcion(
        input as never,
      );

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.consultarObligadoRecepcionAsync,
      ).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("consultarTiposRetenciones", () => {
    it("should return retention types", async () => {
      const mockResponse = {
        consultarTiposRetencionesReturn: {
          arrayTiposRetenciones: { tipoRetencion: [] },
        },
      };
      mockSoapClient.consultarTiposRetencionesAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.consultarTiposRetenciones();

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.consultarTiposRetencionesAsync,
      ).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("consultarTiposMotivosRechazo", () => {
    it("should return rejection reason types", async () => {
      const mockResponse = {
        consultarTiposMotivosRechazoReturn: {
          arrayTiposMotivosRechazo: { tipoMotivoRechazo: [] },
        },
      };
      mockSoapClient.consultarTiposMotivosRechazoAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.consultarTiposMotivosRechazo();

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.consultarTiposMotivosRechazoAsync,
      ).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("consultarTiposFormasCancelacion", () => {
    it("should return cancellation form types", async () => {
      const mockResponse = {
        consultarTiposFormasCancelacionReturn: {
          arrayTiposFormasCancelacion: { tipoFormaCancelacion: [] },
        },
      };
      mockSoapClient.consultarTiposFormasCancelacionAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.consultarTiposFormasCancelacion();

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.consultarTiposFormasCancelacionAsync,
      ).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("obtenerRemitos", () => {
    it("should return remitos", async () => {
      const mockResponse = {
        obtenerRemitosReturn: {
          arrayRemitos: { remito: [] },
        },
      };
      mockSoapClient.obtenerRemitosAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = {
        CUITEmisor: 20111111112,
        tipoComprobante: 1,
        puntoVenta: 1,
        nroComprobante: 1,
      };
      const result = await repository.obtenerRemitos(input as never);

      expect(result).toEqual(mockResponse);
      expect(mockSoapClient.obtenerRemitosAsync).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("consultarHistorialEstadosComprobante", () => {
    it("should return invoice status history", async () => {
      const mockResponse = {
        consultarHistorialEstadosComprobanteReturn: {
          arrayEstados: { estado: [] },
        },
      };
      mockSoapClient.consultarHistorialEstadosComprobanteAsync.mockResolvedValue(
        [mockResponse] as never,
      );

      const input = {
        CUITEmisor: 20111111112,
        tipoComprobante: 1,
        puntoVenta: 1,
        nroComprobante: 1,
      };
      const result = await repository.consultarHistorialEstadosComprobante(
        input as never,
      );

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.consultarHistorialEstadosComprobanteAsync,
      ).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("consultarHistorialEstadosCtaCte", () => {
    it("should return current account status history", async () => {
      const mockResponse = {
        consultarHistorialEstadosCtaCteReturn: {
          arrayEstados: { estado: [] },
        },
      };
      mockSoapClient.consultarHistorialEstadosCtaCteAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = { idCtaCte: 1 };
      const result = await repository.consultarHistorialEstadosCtaCte(
        input as never,
      );

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.consultarHistorialEstadosCtaCteAsync,
      ).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("consultarTiposAjustesOperacion", () => {
    it("should return operation adjustment types", async () => {
      const mockResponse = {
        consultarTiposAjustesOperacionReturn: {
          arrayTiposAjustesOperacion: { tipoAjusteOperacion: [] },
        },
      };
      mockSoapClient.consultarTiposAjustesOperacionAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const result = await repository.consultarTiposAjustesOperacion();

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.consultarTiposAjustesOperacionAsync,
      ).toHaveBeenCalledWith({
        ...expectedAuth,
      });
    });
  });

  describe("consultarMontoObligadoRecepcion", () => {
    it("should return mandatory reception amount", async () => {
      const mockResponse = {
        consultarMontoObligadoRecepcionReturn: { monto: 500000 },
      };
      mockSoapClient.consultarMontoObligadoRecepcionAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = {
        cuitConsultada: 20111111112,
        fechaEmision: "2023-10-01",
      };
      const result = await repository.consultarMontoObligadoRecepcion(
        input as never,
      );

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.consultarMontoObligadoRecepcionAsync,
      ).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("modificarOpcionTransferencia", () => {
    it("should modify transfer option", async () => {
      const mockResponse = {
        modificarOpcionTransferenciaReturn: { resultado: "A" },
      };
      mockSoapClient.modificarOpcionTransferenciaAsync.mockResolvedValue([
        mockResponse,
      ] as never);

      const input = { idCtaCte: 1, opcionTransferencia: "SCA" };
      const result = await repository.modificarOpcionTransferencia(
        input as never,
      );

      expect(result).toEqual(mockResponse);
      expect(
        mockSoapClient.modificarOpcionTransferenciaAsync,
      ).toHaveBeenCalledWith({
        ...input,
        ...expectedAuth,
      });
    });
  });

  describe("client caching", () => {
    it("should reuse the cached SOAP client on consecutive calls", async () => {
      mockSoapClient.consultarTiposRetencionesAsync.mockResolvedValue([
        {
          consultarTiposRetencionesReturn: {},
        },
      ] as never);

      await repository.consultarTiposRetenciones();
      await repository.consultarTiposRetenciones();

      expect(SoapClient.prototype.createClient).toHaveBeenCalledTimes(1);
    });
  });
});
