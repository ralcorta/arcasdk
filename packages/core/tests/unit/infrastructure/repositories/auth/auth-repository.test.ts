import { AuthRepository } from "@infrastructure/repositories/auth/auth.repository";
import { ITicketStoragePort } from "@application/ports/storage";
import { AccessTicket } from "@domain/entities/access-ticket.entity";
import type { ILoginCredentials } from "@domain/types/auth.types";
import { ArcaServiceNames } from "@application/types/service-name.types";
import { mockLoginCredentials } from "../../../../mocks/data/credential-json.mock";
import { MS_PER_DAY } from "../../../../utils/time.constants";
import { Parser } from "@infrastructure/utils/parser";
import { Cryptography } from "@infrastructure/utils/crypt-data";
import { SoapClient } from "@infrastructure/soap/soap-client";
import { Client } from "soap";
import { EventEmitter } from "events";
import type { ArcaEvent } from "@application/types/events.types";

jest.mock("@infrastructure/utils/parser");
jest.mock("@infrastructure/utils/crypt-data");
jest.mock("@infrastructure/soap/soap-client");

describe("AuthRepository", () => {
  let adapter: AuthRepository;
  let mockTicketStorage: jest.Mocked<ITicketStoragePort>;
  let mockSoapClientInstance: jest.Mocked<SoapClient>;
  const config = {
    cert: "mock-cert",
    key: "mock-key",
    cuit: 20111111111,
    production: false,
    handleTicket: false,
  };

  beforeEach(() => {
    mockSoapClientInstance = {
      createClient: jest.fn(),
      setEndpoint: jest.fn(),
      call: jest.fn(),
      useHttpsAgent: jest.fn(),
    } as never;

    (SoapClient as jest.MockedClass<typeof SoapClient>).mockImplementation(
      () => mockSoapClientInstance,
    );

    mockTicketStorage = {
      get: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    } as jest.Mocked<ITicketStoragePort>;

    // Setup Parser mocks
    jest.spyOn(Parser, "jsonToXml").mockReturnValue("<mock-xml>");
    jest.spyOn(Parser, "xmlToJson").mockResolvedValue({
      loginticketresponse: mockLoginCredentials,
    } as never);

    // Setup Cryptography mocks
    jest.spyOn(Cryptography.prototype, "sign").mockReturnValue("signed-tra");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    it("should initialize with provided config", () => {
      adapter = new AuthRepository({
        ...config,
      });
      expect(adapter).toBeInstanceOf(AuthRepository);
    });

    it("should set production to false by default", () => {
      const configWithoutProduction = {
        ...config,
        production: undefined,
      };
      adapter = new AuthRepository(configWithoutProduction);
      expect(adapter).toBeInstanceOf(AuthRepository);
    });
  });

  describe("login", () => {
    it("should return existing ticket from storage if valid", async () => {
      const existingTicket = AccessTicket.create(mockLoginCredentials);
      mockTicketStorage.get.mockResolvedValue(existingTicket);

      adapter = new AuthRepository({
        ...config,
        ticketStorage: mockTicketStorage,
      });

      const result = await adapter.login(ArcaServiceNames.WSFE);

      expect(result).toBe(existingTicket);
      expect(mockTicketStorage.get).toHaveBeenCalledWith(ArcaServiceNames.WSFE);
      expect(mockSoapClientInstance.createClient).not.toHaveBeenCalled();
    });

    it("should request new login if ticket is expired", async () => {
      const expiredCredentials: ILoginCredentials = {
        header: [
          mockLoginCredentials.header[0],
          {
            ...mockLoginCredentials.header[1],
            expirationtime: new Date(Date.now() - MS_PER_DAY).toISOString(),
          },
        ],
        credentials: mockLoginCredentials.credentials,
      };
      const expiredTicket = AccessTicket.create(expiredCredentials);
      mockTicketStorage.get.mockResolvedValue(expiredTicket);

      const mockClient = {} as Client;
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient);
      mockSoapClientInstance.call.mockResolvedValue([
        { loginCmsReturn: "<xml>response</xml>" },
        "",
        {},
        "",
      ]);

      adapter = new AuthRepository({
        ...config,
        ticketStorage: mockTicketStorage,
      });

      const result = await adapter.login(ArcaServiceNames.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
      expect(mockTicketStorage.get).toHaveBeenCalledWith(ArcaServiceNames.WSFE);
      expect(mockSoapClientInstance.createClient).toHaveBeenCalled();
    });

    it("should request new login if no ticket in storage", async () => {
      mockTicketStorage.get.mockResolvedValue(null);

      const mockClient = {} as Client;
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient);
      mockSoapClientInstance.call.mockResolvedValue([
        { loginCmsReturn: "<xml>response</xml>" },
        "",
        {},
        "",
      ]);

      adapter = new AuthRepository({
        ...config,
        ticketStorage: mockTicketStorage,
      });

      const result = await adapter.login(ArcaServiceNames.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
      expect(mockTicketStorage.get).toHaveBeenCalledWith(ArcaServiceNames.WSFE);
      expect(mockSoapClientInstance.createClient).toHaveBeenCalled();
    });

    it("should request new login if no storage is provided", async () => {
      const mockClient = {} as Client;
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient);
      mockSoapClientInstance.call.mockResolvedValue([
        { loginCmsReturn: "<xml>response</xml>" },
        "",
        {},
        "",
      ]);

      adapter = new AuthRepository({
        ...config,
      });

      const result = await adapter.login(ArcaServiceNames.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
      expect(mockSoapClientInstance.createClient).toHaveBeenCalled();
    });

    it("should call loginCms without options when there is no listener", async () => {
      mockSoapClientInstance.createClient.mockResolvedValue({} as Client);
      mockSoapClientInstance.call.mockResolvedValue([
        { loginCmsReturn: "<xml>response</xml>" },
        "",
        {},
        "",
      ]);

      adapter = new AuthRepository({ ...config });
      await adapter.login(ArcaServiceNames.WSFE);

      expect(mockSoapClientInstance.call).toHaveBeenCalledWith(
        {},
        "loginCmsAsync",
        { in0: "signed-tra" },
      );
    });

    it("should emit WSAA events with the ticket redacted", async () => {
      const client = Object.assign(new EventEmitter(), {
        lastEndpoint: "https://wsaahomo.afip.gov.ar/ws/services/LoginCms",
      });
      mockSoapClientInstance.createClient.mockResolvedValue(
        client as unknown as Client,
      );
      mockSoapClientInstance.call.mockImplementation(
        async (_client, _method, _params, options) => {
          client.emit(
            "request",
            "<loginCms><in0>signed-tra</in0></loginCms>",
            (options as { exchangeId: string }).exchangeId,
          );
          return [
            { loginCmsReturn: "<xml>response</xml>" },
            "<loginCmsReturn>&lt;token&gt;T&lt;/token&gt;&lt;sign&gt;S&lt;/sign&gt;</loginCmsReturn>",
            {},
            "",
          ] as never;
        },
      );
      const events: ArcaEvent[] = [];

      adapter = new AuthRepository({
        ...config,
        onEvent: (event) => events.push(event),
      });
      await adapter.login(ArcaServiceNames.WSFE);

      expect(events.map((e) => [e.type, e.service, e.method])).toEqual([
        ["request", "wsaa", "loginCms"],
        ["response", "wsaa", "loginCms"],
      ]);
      expect(events[0]).toMatchObject({
        params: { in0: "[REDACTED]" },
        xml: "<loginCms><in0>[REDACTED]</in0></loginCms>",
      });
      expect(events[1]).toMatchObject({
        result: { loginCmsReturn: "<xml>response</xml>" },
      });
      expect(events[1].xml).toBe(
        "<loginCmsReturn>&lt;token&gt;[REDACTED]&lt;/token&gt;&lt;sign&gt;[REDACTED]&lt;/sign&gt;</loginCmsReturn>",
      );
    });
  });

  describe("requestLogin", () => {
    it("should return existing valid ticket from storage if available", async () => {
      const existingTicket = AccessTicket.create(mockLoginCredentials);
      mockTicketStorage.get.mockResolvedValue(existingTicket);

      adapter = new AuthRepository({
        ...config,
        ticketStorage: mockTicketStorage,
      });

      const result = await adapter.requestLogin(ArcaServiceNames.WSFE);

      expect(result).toBe(existingTicket);
      expect(mockTicketStorage.get).toHaveBeenCalledWith(ArcaServiceNames.WSFE);
      expect(mockSoapClientInstance.createClient).not.toHaveBeenCalled();
    });

    it("should request new login if ticket is expired", async () => {
      const expiredCredentials: ILoginCredentials = {
        header: [
          mockLoginCredentials.header[0],
          {
            ...mockLoginCredentials.header[1],
            expirationtime: new Date(Date.now() - MS_PER_DAY).toISOString(),
          },
        ],
        credentials: mockLoginCredentials.credentials,
      };
      const expiredTicket = AccessTicket.create(expiredCredentials);
      mockTicketStorage.get.mockResolvedValue(expiredTicket);

      const mockClient = {} as Client;
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient);
      mockSoapClientInstance.call.mockResolvedValue([
        { loginCmsReturn: "<xml>response</xml>" },
        "",
        {},
        "",
      ]);

      adapter = new AuthRepository({
        ...config,
        ticketStorage: mockTicketStorage,
      });

      const result = await adapter.requestLogin(ArcaServiceNames.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
      expect(mockSoapClientInstance.createClient).toHaveBeenCalled();
    });

    it("should save ticket when handleTicket is false", async () => {
      mockTicketStorage.get.mockResolvedValue(null);

      const mockClient = {} as Client;
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient);
      mockSoapClientInstance.call.mockResolvedValue([
        { loginCmsReturn: "<xml>response</xml>" },
        "",
        {},
        "",
      ]);

      adapter = new AuthRepository({
        ...config,
        handleTicket: false,
        ticketStorage: mockTicketStorage,
      });

      const result = await adapter.requestLogin(ArcaServiceNames.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
      expect(mockTicketStorage.save).toHaveBeenCalledWith(
        result,
        ArcaServiceNames.WSFE,
      );
    });

    it("should not save ticket when handleTicket is true", async () => {
      mockTicketStorage.get.mockResolvedValue(null);

      const mockClient = {} as Client;
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient);
      mockSoapClientInstance.call.mockResolvedValue([
        { loginCmsReturn: "<xml>response</xml>" },
        "",
        {},
        "",
      ]);

      adapter = new AuthRepository({
        ...config,
        handleTicket: true,
        ticketStorage: mockTicketStorage,
      });

      const result = await adapter.requestLogin(ArcaServiceNames.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
      expect(mockTicketStorage.save).not.toHaveBeenCalled();
    });

    it("should not save ticket when no storage is provided", async () => {
      const mockClient = {} as Client;
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient);
      mockSoapClientInstance.call.mockResolvedValue([
        { loginCmsReturn: "<xml>response</xml>" },
        "",
        {},
        "",
      ]);

      adapter = new AuthRepository({
        ...config,
      });

      const result = await adapter.requestLogin(ArcaServiceNames.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
    });

    it("should use production endpoint when production is true", async () => {
      mockTicketStorage.get.mockResolvedValue(null);

      const mockClient = {} as Client;
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient);
      mockSoapClientInstance.call.mockResolvedValue([
        { loginCmsReturn: "<xml>response</xml>" },
        "",
        {},
        "",
      ]);

      adapter = new AuthRepository({
        ...config,
        production: true,
        ticketStorage: mockTicketStorage,
      });

      await adapter.requestLogin(ArcaServiceNames.WSFE);

      expect(mockSoapClientInstance.createClient).toHaveBeenCalled();
      expect(mockSoapClientInstance.setEndpoint).toHaveBeenCalled();
    });
  });

  describe("getAuthParams", () => {
    it("should return formatted auth params", () => {
      const ticket = AccessTicket.create(mockLoginCredentials);
      const cuit = 20111111111;

      adapter = new AuthRepository({
        ...config,
      });

      const result = adapter.getAuthParams(ticket, cuit);

      expect(result).toEqual({
        Auth: {
          Token: mockLoginCredentials.credentials.token,
          Sign: mockLoginCredentials.credentials.sign,
          Cuit: cuit,
        },
      });
    });
  });
});
