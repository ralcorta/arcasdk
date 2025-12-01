import { Arca } from "@arcasdk/core/src/arca";
import { Context } from "@arcasdk/core/src/application/types";
import { ILoginCredentials } from "@arcasdk/core/src/domain/entities/access-ticket.entity";
import { FileSystemTicketStorage } from "@arcasdk/core/src/infrastructure/outbound/adapters/storage/file-system-ticket-storage";
import { AuthRepository } from "@arcasdk/core/src/infrastructure/outbound/adapters/auth/auth.repository";
import { WinstonLogger } from "@arcasdk/core/src/infrastructure/outbound/adapters/logger/winston-logger";
import { ElectronicBillingRepository } from "@arcasdk/core/src/infrastructure/outbound/adapters/electronic-billing/electronic-billing-repository";
import { RegisterScopeFourRepository } from "@arcasdk/core/src/infrastructure/outbound/adapters/register/register-scope-four.repository";
import { RegisterScopeFiveRepository } from "@arcasdk/core/src/infrastructure/outbound/adapters/register/register-scope-five.repository";
import { RegisterScopeTenRepository } from "@arcasdk/core/src/infrastructure/outbound/adapters/register/register-scope-ten.repository";
import { RegisterScopeThirteenRepository } from "@arcasdk/core/src/infrastructure/outbound/adapters/register/register-scope-thirteen.repository";
import { RegisterInscriptionProofRepository } from "@arcasdk/core/src/infrastructure/outbound/adapters/register/register-inscription-proof.repository";
import { ElectronicBillingService } from "@arcasdk/core/src/application/services/electronic-billing.service";
import { RegisterInscriptionProofService } from "@arcasdk/core/src/application/services/register-inscription-proof.service";
import { RegisterScopeFourService } from "@arcasdk/core/src/application/services/register-scope-four.service";
import { RegisterScopeFiveService } from "@arcasdk/core/src/application/services/register-scope-five.service";
import { RegisterScopeTenService } from "@arcasdk/core/src/application/services/register-scope-ten.service";
import { RegisterScopeThirteenService } from "@arcasdk/core/src/application/services/register-scope-thirteen.service";

jest.mock(
  "@arcasdk/core/src/infrastructure/outbound/adapters/storage/file-system-ticket-storage"
);
jest.mock(
  "@arcasdk/core/src/infrastructure/outbound/adapters/auth/auth.repository"
);
jest.mock(
  "@arcasdk/core/src/infrastructure/outbound/adapters/logger/winston-logger"
);
jest.mock(
  "@arcasdk/core/src/infrastructure/outbound/adapters/electronic-billing/electronic-billing-repository"
);
jest.mock(
  "@arcasdk/core/src/infrastructure/outbound/adapters/register/register-scope-four.repository"
);
jest.mock(
  "@arcasdk/core/src/infrastructure/outbound/adapters/register/register-scope-five.repository"
);
jest.mock(
  "@arcasdk/core/src/infrastructure/outbound/adapters/register/register-scope-ten.repository"
);
jest.mock(
  "@arcasdk/core/src/infrastructure/outbound/adapters/register/register-scope-thirteen.repository"
);
jest.mock(
  "@arcasdk/core/src/infrastructure/outbound/adapters/register/register-inscription-proof.repository"
);
jest.mock("@arcasdk/core/src/application/services/electronic-billing.service");
jest.mock(
  "@arcasdk/core/src/application/services/register-inscription-proof.service"
);
jest.mock("@arcasdk/core/src/application/services/register-scope-four.service");
jest.mock("@arcasdk/core/src/application/services/register-scope-five.service");
jest.mock("@arcasdk/core/src/application/services/register-scope-ten.service");
jest.mock(
  "@arcasdk/core/src/application/services/register-scope-thirteen.service"
);

describe("Arca", () => {
  const mockContext: Context = {
    cert: "mock-cert-content",
    key: "mock-key-content",
    cuit: 20111111112,
    production: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (FileSystemTicketStorage as jest.Mock).mockImplementation(() => ({}));
    (AuthRepository as jest.Mock).mockImplementation(() => ({}));
    (WinstonLogger as jest.Mock).mockImplementation(() => ({}));
    (ElectronicBillingRepository as jest.Mock).mockImplementation(() => ({}));
    (RegisterScopeFourRepository as jest.Mock).mockImplementation(() => ({}));
    (RegisterScopeFiveRepository as jest.Mock).mockImplementation(() => ({}));
    (RegisterScopeTenRepository as jest.Mock).mockImplementation(() => ({}));
    (RegisterScopeThirteenRepository as jest.Mock).mockImplementation(
      () => ({})
    );
    (RegisterInscriptionProofRepository as jest.Mock).mockImplementation(
      () => ({})
    );
    (ElectronicBillingService as jest.Mock).mockImplementation(() => ({}));
    (RegisterInscriptionProofService as jest.Mock).mockImplementation(
      () => ({})
    );
    (RegisterScopeFourService as jest.Mock).mockImplementation(() => ({}));
    (RegisterScopeFiveService as jest.Mock).mockImplementation(() => ({}));
    (RegisterScopeTenService as jest.Mock).mockImplementation(() => ({}));
    (RegisterScopeThirteenService as jest.Mock).mockImplementation(() => ({}));
  });

  describe("constructor", () => {
    it("should create Arca instance with minimal context", () => {
      const arca = new Arca(mockContext);

      expect(arca).toBeInstanceOf(Arca);
      expect(FileSystemTicketStorage).toHaveBeenCalled();
      expect(AuthRepository).toHaveBeenCalled();
      expect(WinstonLogger).toHaveBeenCalled();
      expect(ElectronicBillingRepository).toHaveBeenCalled();
      expect(RegisterScopeFourRepository).toHaveBeenCalled();
      expect(RegisterScopeFiveRepository).toHaveBeenCalled();
      expect(RegisterScopeTenRepository).toHaveBeenCalled();
      expect(RegisterScopeThirteenRepository).toHaveBeenCalled();
      expect(RegisterInscriptionProofRepository).toHaveBeenCalled();
      expect(ElectronicBillingService).toHaveBeenCalled();
      expect(RegisterInscriptionProofService).toHaveBeenCalled();
      expect(RegisterScopeFourService).toHaveBeenCalled();
      expect(RegisterScopeFiveService).toHaveBeenCalled();
      expect(RegisterScopeTenService).toHaveBeenCalled();
      expect(RegisterScopeThirteenService).toHaveBeenCalled();
    });

    it("should create FileSystemTicketStorage with correct parameters", () => {
      new Arca(mockContext);

      expect(FileSystemTicketStorage).toHaveBeenCalledWith({
        ticketPath: expect.any(String),
        cuit: mockContext.cuit,
        production: false,
      });
    });

    it("should create FileSystemTicketStorage with custom ticketPath", () => {
      const customTicketPath = "/custom/ticket/path";
      const contextWithPath: Context = {
        ...mockContext,
        ticketPath: customTicketPath,
      };

      new Arca(contextWithPath);

      expect(FileSystemTicketStorage).toHaveBeenCalledWith({
        ticketPath: customTicketPath,
        cuit: mockContext.cuit,
        production: false,
      });
    });

    it("should create AuthRepository with correct parameters", () => {
      new Arca(mockContext);

      expect(AuthRepository).toHaveBeenCalledWith({
        cert: mockContext.cert,
        key: mockContext.key,
        cuit: mockContext.cuit,
        production: false,
        handleTicket: false,
        ticketStorage: expect.anything(),
        credentials: undefined,
      });
    });

    it("should create AuthRepository with handleTicket true", () => {
      const contextWithHandleTicket: Context = {
        ...mockContext,
        handleTicket: true,
      };

      new Arca(contextWithHandleTicket);

      expect(AuthRepository).toHaveBeenCalledWith({
        cert: mockContext.cert,
        key: mockContext.key,
        cuit: mockContext.cuit,
        production: false,
        handleTicket: true,
        ticketStorage: undefined,
        credentials: undefined,
      });
    });

    it("should create AuthRepository with credentials", () => {
      const mockCredentials: ILoginCredentials = {
        header: [
          {
            version: "1.0",
          },
          {
            source: "source",
            destination: "destination",
            uniqueid: "uniqueid",
            generationtime: new Date().toISOString(),
            expirationtime: new Date().toISOString(),
          },
        ],
        credentials: {
          token: "mock-token",
          sign: "mock-sign",
        },
      };
      const contextWithCredentials: Context = {
        ...mockContext,
        credentials: mockCredentials,
      };

      new Arca(contextWithCredentials);

      expect(AuthRepository).toHaveBeenCalledWith({
        cert: mockContext.cert,
        key: mockContext.key,
        cuit: mockContext.cuit,
        production: false,
        handleTicket: false,
        ticketStorage: expect.anything(),
        credentials: mockCredentials,
      });
    });

    it("should create WinstonLogger with enableLogging false by default", () => {
      new Arca(mockContext);

      expect(WinstonLogger).toHaveBeenCalledWith({
        enableLogging: false,
      });
    });

    it("should create WinstonLogger with enableLogging true", () => {
      const contextWithLogging: Context = {
        ...mockContext,
        enableLogging: true,
      };

      new Arca(contextWithLogging);

      expect(WinstonLogger).toHaveBeenCalledWith({
        enableLogging: true,
      });
    });

    it("should create ElectronicBillingRepository with correct parameters", () => {
      new Arca(mockContext);

      expect(ElectronicBillingRepository).toHaveBeenCalledWith({
        authRepository: expect.anything(),
        logger: expect.anything(),
        cuit: mockContext.cuit,
        production: false,
        useSoap12: true, // Default value
      });
    });

    it("should create ElectronicBillingRepository with useSoap12 false", () => {
      const contextWithSoap11: Context = {
        ...mockContext,
        useSoap12: false,
      };

      new Arca(contextWithSoap11);

      expect(ElectronicBillingRepository).toHaveBeenCalledWith({
        authRepository: expect.anything(),
        logger: expect.anything(),
        cuit: mockContext.cuit,
        production: false,
        useSoap12: false,
      });
    });

    it("should create Register Repositories with correct parameters", () => {
      new Arca(mockContext);

      const expectedRepoConfig = {
        authRepository: expect.anything(),
        logger: expect.anything(),
        cuit: mockContext.cuit,
        production: false,
      };

      expect(RegisterScopeFourRepository).toHaveBeenCalledWith(
        expectedRepoConfig
      );
      expect(RegisterScopeFiveRepository).toHaveBeenCalledWith(
        expectedRepoConfig
      );
      expect(RegisterScopeTenRepository).toHaveBeenCalledWith(
        expectedRepoConfig
      );
      expect(RegisterScopeThirteenRepository).toHaveBeenCalledWith(
        expectedRepoConfig
      );
      expect(RegisterInscriptionProofRepository).toHaveBeenCalledWith(
        expectedRepoConfig
      );
    });

    it("should create all services with correct repositories", () => {
      const mockRegisterScopeFourRepository = {} as any;
      const mockRegisterScopeFiveRepository = {} as any;
      const mockRegisterScopeTenRepository = {} as any;
      const mockRegisterScopeThirteenRepository = {} as any;
      const mockRegisterInscriptionProofRepository = {} as any;

      (RegisterScopeFourRepository as jest.Mock).mockReturnValue(
        mockRegisterScopeFourRepository
      );
      (RegisterScopeFiveRepository as jest.Mock).mockReturnValue(
        mockRegisterScopeFiveRepository
      );
      (RegisterScopeTenRepository as jest.Mock).mockReturnValue(
        mockRegisterScopeTenRepository
      );
      (RegisterScopeThirteenRepository as jest.Mock).mockReturnValue(
        mockRegisterScopeThirteenRepository
      );
      (RegisterInscriptionProofRepository as jest.Mock).mockReturnValue(
        mockRegisterInscriptionProofRepository
      );

      new Arca(mockContext);

      expect(RegisterScopeFourService).toHaveBeenCalledWith(
        mockRegisterScopeFourRepository
      );
      expect(RegisterScopeFiveService).toHaveBeenCalledWith(
        mockRegisterScopeFiveRepository
      );
      expect(RegisterScopeTenService).toHaveBeenCalledWith(
        mockRegisterScopeTenRepository
      );
      expect(RegisterScopeThirteenService).toHaveBeenCalledWith(
        mockRegisterScopeThirteenRepository
      );
      expect(RegisterInscriptionProofService).toHaveBeenCalledWith(
        mockRegisterInscriptionProofRepository
      );
    });

    it("should create ElectronicBillingService with ElectronicBillingRepository", () => {
      const mockElectronicBillingRepository = {} as any;
      (ElectronicBillingRepository as jest.Mock).mockReturnValue(
        mockElectronicBillingRepository
      );

      new Arca(mockContext);

      expect(ElectronicBillingService).toHaveBeenCalledWith(
        mockElectronicBillingRepository
      );
    });

    it("should create Arca instance with production true", () => {
      const productionContext: Context = {
        ...mockContext,
        production: true,
      };

      const arca = new Arca(productionContext);

      expect(arca).toBeInstanceOf(Arca);
      expect(FileSystemTicketStorage).toHaveBeenCalledWith(
        expect.objectContaining({
          production: true,
        })
      );
      expect(AuthRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          production: true,
        })
      );
      expect(ElectronicBillingRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          production: true,
        })
      );
      expect(RegisterScopeFourRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          production: true,
        })
      );
    });
  });

  describe("getters", () => {
    let arca: Arca;
    let mockElectronicBillingService: jest.Mocked<ElectronicBillingService>;
    let mockRegisterInscriptionProofService: jest.Mocked<RegisterInscriptionProofService>;
    let mockRegisterScopeFourService: jest.Mocked<RegisterScopeFourService>;
    let mockRegisterScopeFiveService: jest.Mocked<RegisterScopeFiveService>;
    let mockRegisterScopeTenService: jest.Mocked<RegisterScopeTenService>;
    let mockRegisterScopeThirteenService: jest.Mocked<RegisterScopeThirteenService>;

    beforeEach(() => {
      // Setup mock services
      mockElectronicBillingService =
        {} as jest.Mocked<ElectronicBillingService>;
      mockRegisterInscriptionProofService =
        {} as jest.Mocked<RegisterInscriptionProofService>;
      mockRegisterScopeFourService =
        {} as jest.Mocked<RegisterScopeFourService>;
      mockRegisterScopeFiveService =
        {} as jest.Mocked<RegisterScopeFiveService>;
      mockRegisterScopeTenService = {} as jest.Mocked<RegisterScopeTenService>;
      mockRegisterScopeThirteenService =
        {} as jest.Mocked<RegisterScopeThirteenService>;

      (ElectronicBillingService as jest.Mock).mockReturnValue(
        mockElectronicBillingService
      );
      (RegisterInscriptionProofService as jest.Mock).mockReturnValue(
        mockRegisterInscriptionProofService
      );
      (RegisterScopeFourService as jest.Mock).mockReturnValue(
        mockRegisterScopeFourService
      );
      (RegisterScopeFiveService as jest.Mock).mockReturnValue(
        mockRegisterScopeFiveService
      );
      (RegisterScopeTenService as jest.Mock).mockReturnValue(
        mockRegisterScopeTenService
      );
      (RegisterScopeThirteenService as jest.Mock).mockReturnValue(
        mockRegisterScopeThirteenService
      );

      arca = new Arca(mockContext);
    });

    it("should return electronicBillingService", () => {
      expect(arca.electronicBillingService).toBe(mockElectronicBillingService);
    });

    it("should return registerInscriptionProofService", () => {
      expect(arca.registerInscriptionProofService).toBe(
        mockRegisterInscriptionProofService
      );
    });

    it("should return registerScopeFourService", () => {
      expect(arca.registerScopeFourService).toBe(mockRegisterScopeFourService);
    });

    it("should return registerScopeFiveService", () => {
      expect(arca.registerScopeFiveService).toBe(mockRegisterScopeFiveService);
    });

    it("should return registerScopeTenService", () => {
      expect(arca.registerScopeTenService).toBe(mockRegisterScopeTenService);
    });

    it("should return registerScopeThirteenService", () => {
      expect(arca.registerScopeThirteenService).toBe(
        mockRegisterScopeThirteenService
      );
    });
  });

  describe("context normalization", () => {
    it("should use default ticketPath when not provided", () => {
      new Arca(mockContext);

      expect(FileSystemTicketStorage).toHaveBeenCalledWith({
        ticketPath: expect.stringContaining(
          "infrastructure/storage/auth/tickets"
        ),
        cuit: mockContext.cuit,
        production: false,
      });
    });

    it("should use provided ticketPath when available", () => {
      const customPath = "/custom/path/to/tickets";
      const contextWithPath: Context = {
        ...mockContext,
        ticketPath: customPath,
      };

      new Arca(contextWithPath);

      expect(FileSystemTicketStorage).toHaveBeenCalledWith({
        ticketPath: customPath,
        cuit: mockContext.cuit,
        production: false,
      });
    });
  });
});
