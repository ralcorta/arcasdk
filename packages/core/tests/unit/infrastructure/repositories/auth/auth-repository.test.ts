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

  describe("concurrent logins", () => {
    const loginResponse = [
      { loginCmsReturn: "<xml>response</xml>" },
      "",
      {},
      "",
    ];

    function delayedLoginResponse() {
      return new Promise((resolve) => setTimeout(() => resolve(loginResponse), 10));
    }

    beforeEach(() => {
      mockSoapClientInstance.createClient.mockResolvedValue({} as Client);
      mockTicketStorage.get.mockResolvedValue(null);
    });

    it("should share a single WSAA login between concurrent calls", async () => {
      mockSoapClientInstance.call.mockImplementation(
        delayedLoginResponse as never,
      );
      adapter = new AuthRepository({
        ...config,
        ticketStorage: mockTicketStorage,
      });

      const tickets = await Promise.all([
        adapter.login(ArcaServiceNames.WSFE),
        adapter.login(ArcaServiceNames.WSFE),
        adapter.requestLogin(ArcaServiceNames.WSFE),
      ]);

      expect(mockSoapClientInstance.call).toHaveBeenCalledTimes(1);
      expect(tickets[1]).toBe(tickets[0]);
      expect(tickets[2]).toBe(tickets[0]);
      expect(mockTicketStorage.save).toHaveBeenCalledTimes(1);
    });

    it("should log in separately for different services", async () => {
      mockSoapClientInstance.call.mockImplementation(
        delayedLoginResponse as never,
      );
      adapter = new AuthRepository({
        ...config,
        ticketStorage: mockTicketStorage,
      });

      await Promise.all([
        adapter.login(ArcaServiceNames.WSFE),
        adapter.login(ArcaServiceNames.WSFEX),
      ]);

      expect(mockSoapClientInstance.call).toHaveBeenCalledTimes(2);
    });

    it("should request a new login once the previous one finished", async () => {
      mockSoapClientInstance.call.mockResolvedValue(loginResponse as never);
      adapter = new AuthRepository({ ...config });

      await adapter.requestLogin(ArcaServiceNames.WSFE);
      await adapter.requestLogin(ArcaServiceNames.WSFE);

      expect(mockSoapClientInstance.call).toHaveBeenCalledTimes(2);
    });

    it("should let a new login run after a failed one", async () => {
      mockSoapClientInstance.call
        .mockRejectedValueOnce(new Error("network down"))
        .mockResolvedValueOnce(loginResponse as never);
      adapter = new AuthRepository({ ...config });

      await expect(
        adapter.requestLogin(ArcaServiceNames.WSFE),
      ).rejects.toThrow("network down");
      await expect(
        adapter.requestLogin(ArcaServiceNames.WSFE),
      ).resolves.toBeInstanceOf(AccessTicket);
    });
  });

  describe("coe.alreadyAuthenticated", () => {
    const alreadyAuthenticated = Object.assign(
      new Error(
        "ns1:coe.alreadyAuthenticated: El CEE ya posee un TA valido para el acceso al WSN solicitado",
      ),
      {
        root: {
          Envelope: {
            Body: { Fault: { faultcode: "ns1:coe.alreadyAuthenticated" } },
          },
        },
      },
    );

    beforeEach(() => {
      mockSoapClientInstance.createClient.mockResolvedValue({} as Client);
      mockSoapClientInstance.call.mockRejectedValue(alreadyAuthenticated);
    });

    it("should return the ticket another instance stored meanwhile", async () => {
      const storedTicket = AccessTicket.create(mockLoginCredentials);
      mockTicketStorage.get
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(storedTicket);
      adapter = new AuthRepository({
        ...config,
        ticketStorage: mockTicketStorage,
      });

      const result = await adapter.login(ArcaServiceNames.WSFE);

      expect(result).toBe(storedTicket);
      expect(mockTicketStorage.get).toHaveBeenCalledTimes(3);
      expect(mockTicketStorage.save).not.toHaveBeenCalled();
    });

    it("should rethrow the fault when the storage has no valid ticket", async () => {
      mockTicketStorage.get.mockResolvedValue(null);
      adapter = new AuthRepository({
        ...config,
        ticketStorage: mockTicketStorage,
      });

      await expect(adapter.login(ArcaServiceNames.WSFE)).rejects.toBe(
        alreadyAuthenticated,
      );
    });

    it("should rethrow the fault when there is no storage", async () => {
      adapter = new AuthRepository({ ...config });

      await expect(adapter.requestLogin(ArcaServiceNames.WSFE)).rejects.toBe(
        alreadyAuthenticated,
      );
    });

    it("should not read the storage again for other errors", async () => {
      const otherError = new Error("ns1:cms.cert.expired");
      mockSoapClientInstance.call.mockRejectedValue(otherError);
      mockTicketStorage.get.mockResolvedValue(null);
      adapter = new AuthRepository({
        ...config,
        ticketStorage: mockTicketStorage,
      });

      await expect(adapter.requestLogin(ArcaServiceNames.WSFE)).rejects.toBe(
        otherError,
      );
      expect(mockTicketStorage.get).toHaveBeenCalledTimes(1);
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
