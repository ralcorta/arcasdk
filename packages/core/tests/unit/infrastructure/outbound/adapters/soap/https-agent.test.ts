import { SoapClient } from "@arcasdk/core/src/infrastructure/outbound/adapters/soap/soap-client";
import { createClientAsync, type Client } from "soap";
import { SoapRuntime } from "@arcasdk/core/src/infrastructure/utils/soap-runtime";

const mockCreateSoapEngine = jest.fn();
const mockDetectSoapRuntime = jest.fn();

jest.mock(
  "@arcasdk/core/src/infrastructure/outbound/adapters/soap/engines",
  () => ({
    createSoapEngine: mockCreateSoapEngine,
    detectSoapRuntime: mockDetectSoapRuntime,
  }),
);

jest.mock(
  "@arcasdk/core/src/infrastructure/outbound/adapters/soap/wsdl-strings",
  () => ({
    getWsdlString: jest
      .fn()
      .mockReturnValue(
        '<?xml version="1.0" encoding="UTF-8"?><wsdl:definitions></wsdl:definitions>',
      ),
  }),
);

jest.mock("soap", () => ({
  ...jest.requireActual("soap"),
  createClientAsync: jest.fn(),
}));

describe("SoapClient HTTPS agent wiring", () => {
  const mockedCreateClientAsync = createClientAsync as jest.MockedFunction<
    typeof createClientAsync
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    mockDetectSoapRuntime.mockReturnValue(SoapRuntime.Node);
    mockCreateSoapEngine.mockResolvedValue({ request: jest.fn() });
    mockedCreateClientAsync.mockResolvedValue({
      setEndpoint: jest.fn(),
    } as never);
  });

  it("propaga useHttpsAgent=true al engine factory", async () => {
    const soapClient = new SoapClient(true);

    await soapClient.createClient<Client>("wsfe.wsdl");

    expect(mockCreateSoapEngine).toHaveBeenCalledWith(
      expect.objectContaining({
        runtime: SoapRuntime.Node,
        useHttpsAgent: true,
      }),
    );
  });

  it("propaga useHttpsAgent=false al engine factory", async () => {
    const soapClient = new SoapClient(false);

    await soapClient.createClient<Client>("wsfe.wsdl");

    expect(mockCreateSoapEngine).toHaveBeenCalledWith(
      expect.objectContaining({
        runtime: SoapRuntime.Node,
        useHttpsAgent: false,
      }),
    );
  });

  it("usa false por defecto cuando no se pasa useHttpsAgent", async () => {
    const soapClient = new SoapClient();

    await soapClient.createClient<Client>("wsfe.wsdl");

    expect(mockCreateSoapEngine).toHaveBeenCalledWith(
      expect.objectContaining({
        runtime: SoapRuntime.Node,
        useHttpsAgent: false,
      }),
    );
  });
});
