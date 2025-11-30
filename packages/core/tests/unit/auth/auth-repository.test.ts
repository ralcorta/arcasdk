import { AuthRepository } from "@arcasdk/core/src/infrastructure/outbound/adapters/auth/auth.repository";
import { ITicketStoragePort } from "@arcasdk/core/src/infrastructure/outbound/ports/storage/ticket-storage.port";
import {
  AccessTicket,
  ILoginCredentials,
} from "@arcasdk/core/src/domain/entities/access-ticket.entity";
import { ServiceNamesEnum } from "@arcasdk/core/src/infrastructure/outbound/ports/soap/enums/service-names.enum";
import { mockLoginCredentials } from "../../mocks/data/credential-json.mock";
import moment from "moment";
import { Parser } from "@arcasdk/core/src/infrastructure/utils/parser";
import { Cryptography } from "@arcasdk/core/src/infrastructure/utils/crypt-data";
import { SoapClient } from "@arcasdk/core/src/infrastructure/outbound/adapters/soap/soap-client";

jest.mock("@infrastructure/utils/parser");
jest.mock("@infrastructure/utils/crypt-data");
jest.mock("@infrastructure/outbound/adapters/soap/soap-client");

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
    } as any;

    (SoapClient as jest.MockedClass<typeof SoapClient>).mockImplementation(
      () => mockSoapClientInstance
    );

    mockTicketStorage = {
      get: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    } as any;

    // Setup Parser mocks
    jest.spyOn(Parser, "jsonToXml").mockReturnValue("<mock-xml>");
    jest.spyOn(Parser, "xmlToJson").mockResolvedValue({
      loginticketresponse: mockLoginCredentials,
    } as any);

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

      const result = await adapter.login(ServiceNamesEnum.WSFE);

      expect(result).toBe(existingTicket);
      expect(mockTicketStorage.get).toHaveBeenCalledWith(ServiceNamesEnum.WSFE);
      expect(mockSoapClientInstance.createClient).not.toHaveBeenCalled();
    });

    it("should request new login if ticket is expired", async () => {
      const expiredCredentials: ILoginCredentials = {
        header: [
          mockLoginCredentials.header[0],
          {
            ...mockLoginCredentials.header[1],
            expirationtime: moment().subtract(1, "day").toISOString(),
          },
        ] as any,
        credentials: mockLoginCredentials.credentials,
      };
      const expiredTicket = AccessTicket.create(expiredCredentials);
      mockTicketStorage.get.mockResolvedValue(expiredTicket);

      const mockClient = {};
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient as any);
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

      const result = await adapter.login(ServiceNamesEnum.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
      expect(mockTicketStorage.get).toHaveBeenCalledWith(ServiceNamesEnum.WSFE);
      expect(mockSoapClientInstance.createClient).toHaveBeenCalled();
    });

    it("should request new login if no ticket in storage", async () => {
      mockTicketStorage.get.mockResolvedValue(null);

      const mockClient = {};
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient as any);
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

      const result = await adapter.login(ServiceNamesEnum.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
      expect(mockTicketStorage.get).toHaveBeenCalledWith(ServiceNamesEnum.WSFE);
      expect(mockSoapClientInstance.createClient).toHaveBeenCalled();
    });

    it("should request new login if no storage is provided", async () => {
      const mockClient = {};
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient as any);
      mockSoapClientInstance.call.mockResolvedValue([
        { loginCmsReturn: "<xml>response</xml>" },
        "",
        {},
        "",
      ]);

      adapter = new AuthRepository({
        ...config,
      });

      const result = await adapter.login(ServiceNamesEnum.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
      expect(mockSoapClientInstance.createClient).toHaveBeenCalled();
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

      const result = await adapter.requestLogin(ServiceNamesEnum.WSFE);

      expect(result).toBe(existingTicket);
      expect(mockTicketStorage.get).toHaveBeenCalledWith(ServiceNamesEnum.WSFE);
      expect(mockSoapClientInstance.createClient).not.toHaveBeenCalled();
    });

    it("should request new login if ticket is expired", async () => {
      const expiredCredentials: ILoginCredentials = {
        header: [
          mockLoginCredentials.header[0],
          {
            ...mockLoginCredentials.header[1],
            expirationtime: moment().subtract(1, "day").toISOString(),
          },
        ] as any,
        credentials: mockLoginCredentials.credentials,
      };
      const expiredTicket = AccessTicket.create(expiredCredentials);
      mockTicketStorage.get.mockResolvedValue(expiredTicket);

      const mockClient = {};
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient as any);
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

      const result = await adapter.requestLogin(ServiceNamesEnum.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
      expect(mockSoapClientInstance.createClient).toHaveBeenCalled();
    });

    it("should save ticket when handleTicket is false", async () => {
      mockTicketStorage.get.mockResolvedValue(null);

      const mockClient = {};
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient as any);
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

      const result = await adapter.requestLogin(ServiceNamesEnum.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
      expect(mockTicketStorage.save).toHaveBeenCalledWith(
        result,
        ServiceNamesEnum.WSFE
      );
    });

    it("should not save ticket when handleTicket is true", async () => {
      mockTicketStorage.get.mockResolvedValue(null);

      const mockClient = {};
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient as any);
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

      const result = await adapter.requestLogin(ServiceNamesEnum.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
      expect(mockTicketStorage.save).not.toHaveBeenCalled();
    });

    it("should not save ticket when no storage is provided", async () => {
      const mockClient = {};
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient as any);
      mockSoapClientInstance.call.mockResolvedValue([
        { loginCmsReturn: "<xml>response</xml>" },
        "",
        {},
        "",
      ]);

      adapter = new AuthRepository({
        ...config,
      });

      const result = await adapter.requestLogin(ServiceNamesEnum.WSFE);

      expect(result).toBeInstanceOf(AccessTicket);
    });

    it("should use production endpoint when production is true", async () => {
      mockTicketStorage.get.mockResolvedValue(null);

      const mockClient = {};
      mockSoapClientInstance.createClient.mockResolvedValue(mockClient as any);
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

      await adapter.requestLogin(ServiceNamesEnum.WSFE);

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
