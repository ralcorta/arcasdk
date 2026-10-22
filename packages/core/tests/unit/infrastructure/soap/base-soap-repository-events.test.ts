import { EventEmitter } from "events";
import { RegisterScopeFourRepository } from "@infrastructure/repositories/register/register-scope-four.repository";
import { SoapClient } from "@infrastructure/soap/soap-client";
import type { ArcaEvent } from "@application/types/events.types";
import {
  createRepositoryConfig,
  createServerStatusResponse,
  createTaxpayerPersonaResponse,
  REPOSITORY_TEST_IDENTIFIER,
} from "../repositories/register/register-repository.test.helpers";

jest.mock("@infrastructure/soap/soap-client");

const ENDPOINT =
  "https://awshomo.afip.gov.ar/sr-padron/webservices/personaServiceA4";

// Behaves like a node-soap client: emits the envelope with the exchange id it gets
function createMockSoapClient() {
  const client = Object.assign(new EventEmitter(), {
    lastEndpoint: ENDPOINT,
    setEndpoint: jest.fn(),
    describe: jest.fn().mockReturnValue({
      Service: {
        ServiceSoap: {
          dummy: { input: {} },
          getPersona: { input: { Auth: {} } },
        },
      },
    }),
    dummyAsync: jest.fn(),
    getPersonaAsync: jest.fn(),
  });

  const answer =
    (result: unknown, rawResponse: string) =>
    async (_params: unknown, options?: { exchangeId?: string }) => {
      client.emit("request", "<soapenv:Envelope/>", options?.exchangeId);
      return [result, rawResponse, {}, ""];
    };
  client.dummyAsync.mockImplementation(
    answer(createServerStatusResponse(), "<dummyResponse/>"),
  );
  client.getPersonaAsync.mockImplementation(
    answer(createTaxpayerPersonaResponse(), "<getPersonaResponse/>"),
  );
  return client;
}

describe("BaseSoapRepository events (via RegisterScopeFourRepository)", () => {
  let mockSoapClient: ReturnType<typeof createMockSoapClient>;

  beforeEach(() => {
    mockSoapClient = createMockSoapClient();
    (SoapClient.prototype.createClient as jest.Mock).mockResolvedValue(
      mockSoapClient,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should emit request and response events for methods with auth", async () => {
    const events: ArcaEvent[] = [];
    const repository = new RegisterScopeFourRepository({
      ...createRepositoryConfig(),
      onEvent: (event) => events.push(event),
    });

    await repository.getTaxpayerDetails(REPOSITORY_TEST_IDENTIFIER);

    expect(events.map((e) => e.type)).toEqual(["request", "response"]);
    expect(events[1]).toMatchObject({
      service: "ws_sr_padron_a4",
      method: "getPersona",
      endpoint: ENDPOINT,
      requestId: events[0].requestId,
      xml: "<getPersonaResponse/>",
      result: createTaxpayerPersonaResponse(),
    });
    // the request carries the params with auth, credentials redacted
    expect(events[0]).toMatchObject({
      params: {
        token: "[REDACTED]",
        sign: "[REDACTED]",
        idPersona: REPOSITORY_TEST_IDENTIFIER,
      },
    });
    // auth is still injected, and the exchange id reaches node-soap
    const [params, options] = mockSoapClient.getPersonaAsync.mock.calls[0];
    expect(params).toMatchObject({ token: "token", sign: "sign" });
    expect(options).toEqual({ exchangeId: events[0].requestId });
  });

  it("should emit events for methods without auth", async () => {
    const events: ArcaEvent[] = [];
    const repository = new RegisterScopeFourRepository({
      ...createRepositoryConfig(),
      onEvent: (event) => events.push(event),
    });

    await repository.getServerStatus();

    expect(events.map((e) => [e.type, e.method])).toEqual([
      ["request", "dummy"],
      ["response", "dummy"],
    ]);
  });

  it("should emit an error event and rethrow when the call fails", async () => {
    const events: ArcaEvent[] = [];
    const repository = new RegisterScopeFourRepository({
      ...createRepositoryConfig(),
      onEvent: (event) => events.push(event),
    });
    mockSoapClient.getPersonaAsync.mockRejectedValue(new Error("timeout"));

    await expect(
      repository.getTaxpayerDetails(REPOSITORY_TEST_IDENTIFIER),
    ).rejects.toThrow("timeout");
    expect(events).toEqual([
      expect.objectContaining({ type: "error", method: "getPersona" }),
    ]);
  });

  it("should call node-soap exactly as before when there is no listener", async () => {
    const repository = new RegisterScopeFourRepository(
      createRepositoryConfig(),
    );

    await repository.getTaxpayerDetails(REPOSITORY_TEST_IDENTIFIER);
    await repository.getServerStatus();

    expect(mockSoapClient.getPersonaAsync.mock.calls[0]).toHaveLength(1);
    expect(mockSoapClient.dummyAsync.mock.calls[0]).toHaveLength(1);
    expect(mockSoapClient.listenerCount("request")).toBe(0);
  });
});
