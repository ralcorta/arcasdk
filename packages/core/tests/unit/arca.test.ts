import { Arca } from "@infrastructure/composition/arca";
import { Context } from "@application/types";
import { FileSystemTicketStorage } from "@infrastructure/storage/file-system-ticket-storage";
import { MemoryTicketStorage } from "@infrastructure/storage/memory-ticket-storage";
import { AuthRepository } from "@infrastructure/repositories/auth/auth.repository";
import { ElectronicBillingRepository } from "@infrastructure/repositories/electronic-billing/electronic-billing-repository";
import { RegisterScopeFourRepository } from "@infrastructure/repositories/register/register-scope-four.repository";
import { RegisterScopeFiveRepository } from "@infrastructure/repositories/register/register-scope-five.repository";
import { RegisterScopeTenRepository } from "@infrastructure/repositories/register/register-scope-ten.repository";
import { RegisterScopeThirteenRepository } from "@infrastructure/repositories/register/register-scope-thirteen.repository";
import { RegisterInscriptionProofRepository } from "@infrastructure/repositories/register/register-inscription-proof.repository";
import { ElectronicBillingService } from "@application/services/electronic-billing.service";
import { RegisterInscriptionProofService } from "@application/services/register-inscription-proof.service";
import { RegisterScopeFourService } from "@application/services/register-scope-four.service";
import { RegisterScopeFiveService } from "@application/services/register-scope-five.service";
import { RegisterScopeTenService } from "@application/services/register-scope-ten.service";
import { RegisterScopeThirteenService } from "@application/services/register-scope-thirteen.service";
import { GenericService } from "@application/services/generic.service";
import { WsfecredService } from "@application/services/wsfecred.service";
import { WsfexService } from "@application/services/wsfex.service";
import { GenericRepository } from "@infrastructure/repositories/generic/generic-repository";
import { FecredRepository } from "@infrastructure/repositories/fecred/fecred.repository";
import { FexRepository } from "@infrastructure/repositories/fex/fex.repository";
import { ITicketStoragePort } from "@application/ports/storage";

jest.mock("std-env", () => ({
  isNode: true,
}));

jest.mock(
  "@infrastructure/storage/file-system-ticket-storage",
);
jest.mock(
  "@infrastructure/storage/memory-ticket-storage",
);
jest.mock(
  "@infrastructure/repositories/auth/auth.repository",
);
jest.mock(
  "@infrastructure/repositories/electronic-billing/electronic-billing-repository",
);
jest.mock(
  "@infrastructure/repositories/register/register-scope-four.repository",
);
jest.mock(
  "@infrastructure/repositories/register/register-scope-five.repository",
);
jest.mock(
  "@infrastructure/repositories/register/register-scope-ten.repository",
);
jest.mock(
  "@infrastructure/repositories/register/register-scope-thirteen.repository",
);
jest.mock(
  "@infrastructure/repositories/register/register-inscription-proof.repository",
);
jest.mock("@application/services/electronic-billing.service");
jest.mock(
  "@application/services/register-inscription-proof.service",
);
jest.mock("@application/services/register-scope-four.service");
jest.mock("@application/services/register-scope-five.service");
jest.mock("@application/services/register-scope-ten.service");
jest.mock(
  "@application/services/register-scope-thirteen.service",
);
jest.mock("@application/services/generic.service");
jest.mock("@application/services/wsfecred.service");
jest.mock("@application/services/wsfex.service");
jest.mock("@infrastructure/repositories/generic/generic-repository");
jest.mock("@infrastructure/repositories/fecred/fecred.repository");
jest.mock("@infrastructure/repositories/fex/fex.repository");

// Cast mocks to their mocked versions for type-safe access
const MockedFileSystemTicketStorage =
  FileSystemTicketStorage as jest.MockedClass<typeof FileSystemTicketStorage>;
const MockedMemoryTicketStorage = MemoryTicketStorage as jest.MockedClass<
  typeof MemoryTicketStorage
>;
const MockedAuthRepository = AuthRepository as jest.MockedClass<
  typeof AuthRepository
>;
const MockedElectronicBillingRepository =
  ElectronicBillingRepository as jest.MockedClass<
    typeof ElectronicBillingRepository
  >;
const MockedRegisterScopeFourRepository =
  RegisterScopeFourRepository as jest.MockedClass<
    typeof RegisterScopeFourRepository
  >;
const MockedRegisterScopeFiveRepository =
  RegisterScopeFiveRepository as jest.MockedClass<
    typeof RegisterScopeFiveRepository
  >;
const MockedRegisterScopeTenRepository =
  RegisterScopeTenRepository as jest.MockedClass<
    typeof RegisterScopeTenRepository
  >;
const MockedRegisterScopeThirteenRepository =
  RegisterScopeThirteenRepository as jest.MockedClass<
    typeof RegisterScopeThirteenRepository
  >;
const MockedRegisterInscriptionProofRepository =
  RegisterInscriptionProofRepository as jest.MockedClass<
    typeof RegisterInscriptionProofRepository
  >;
const MockedElectronicBillingService =
  ElectronicBillingService as jest.MockedClass<typeof ElectronicBillingService>;
const MockedRegisterInscriptionProofService =
  RegisterInscriptionProofService as jest.MockedClass<
    typeof RegisterInscriptionProofService
  >;
const MockedRegisterScopeFourService =
  RegisterScopeFourService as jest.MockedClass<typeof RegisterScopeFourService>;
const MockedRegisterScopeFiveService =
  RegisterScopeFiveService as jest.MockedClass<typeof RegisterScopeFiveService>;
const MockedRegisterScopeTenService =
  RegisterScopeTenService as jest.MockedClass<typeof RegisterScopeTenService>;
const MockedRegisterScopeThirteenService =
  RegisterScopeThirteenService as jest.MockedClass<
    typeof RegisterScopeThirteenService
  >;
const MockedGenericService = GenericService as jest.MockedClass<
  typeof GenericService
>;
const MockedWsfecredService = WsfecredService as jest.MockedClass<
  typeof WsfecredService
>;
const MockedWsfexService = WsfexService as jest.MockedClass<typeof WsfexService>;
const MockedGenericRepository = GenericRepository as jest.MockedClass<
  typeof GenericRepository
>;
const MockedFecredRepository = FecredRepository as jest.MockedClass<
  typeof FecredRepository
>;
const MockedFexRepository = FexRepository as jest.MockedClass<typeof FexRepository>;

describe("Arca", () => {
  const mockContext: Context = {
    cert: "mock-cert-content",
    key: "mock-key-content",
    cuit: 20111111112,
    production: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    MockedFileSystemTicketStorage.mockImplementation(
      () => ({}) as FileSystemTicketStorage,
    );
    MockedMemoryTicketStorage.mockImplementation(
      () => ({}) as MemoryTicketStorage,
    );
    MockedAuthRepository.mockImplementation(() => ({}) as AuthRepository);
    MockedElectronicBillingRepository.mockImplementation(
      () => ({}) as ElectronicBillingRepository,
    );
    MockedRegisterScopeFourRepository.mockImplementation(
      () => ({}) as RegisterScopeFourRepository,
    );
    MockedRegisterScopeFiveRepository.mockImplementation(
      () => ({}) as RegisterScopeFiveRepository,
    );
    MockedRegisterScopeTenRepository.mockImplementation(
      () => ({}) as RegisterScopeTenRepository,
    );
    MockedRegisterScopeThirteenRepository.mockImplementation(
      () => ({}) as RegisterScopeThirteenRepository,
    );
    MockedRegisterInscriptionProofRepository.mockImplementation(
      () => ({}) as RegisterInscriptionProofRepository,
    );

    MockedElectronicBillingService.mockImplementation(
      () => ({}) as ElectronicBillingService,
    );
    MockedRegisterInscriptionProofService.mockImplementation(
      () => ({}) as RegisterInscriptionProofService,
    );
    MockedRegisterScopeFourService.mockImplementation(
      () => ({}) as RegisterScopeFourService,
    );
    MockedRegisterScopeFiveService.mockImplementation(
      () => ({}) as RegisterScopeFiveService,
    );
    MockedRegisterScopeTenService.mockImplementation(
      () => ({}) as RegisterScopeTenService,
    );
    MockedRegisterScopeThirteenService.mockImplementation(
      () => ({}) as RegisterScopeThirteenService,
    );
    MockedGenericRepository.mockImplementation(
      () => ({}) as GenericRepository,
    );
    MockedFecredRepository.mockImplementation(() => ({}) as FecredRepository);
    MockedFexRepository.mockImplementation(() => ({}) as FexRepository);
    MockedGenericService.mockImplementation(() => ({}) as GenericService);
    MockedWsfecredService.mockImplementation(() => ({}) as WsfecredService);
    MockedWsfexService.mockImplementation(() => ({}) as WsfexService);
  });

  describe("constructor", () => {
    it("should create Arca instance with minimal context", () => {
      const arca = new Arca(mockContext);
      expect(arca).toBeInstanceOf(Arca);
      expect(MockedFileSystemTicketStorage).toHaveBeenCalled();
      expect(MockedAuthRepository).toHaveBeenCalled();
      expect(MockedElectronicBillingRepository).toHaveBeenCalled();
      expect(MockedRegisterScopeFourRepository).toHaveBeenCalled();
      expect(MockedRegisterScopeFiveRepository).toHaveBeenCalled();
      expect(MockedRegisterScopeTenRepository).toHaveBeenCalled();
      expect(MockedRegisterScopeThirteenRepository).toHaveBeenCalled();
      expect(MockedRegisterInscriptionProofRepository).toHaveBeenCalled();
      expect(MockedElectronicBillingService).toHaveBeenCalled();
      expect(MockedRegisterInscriptionProofService).toHaveBeenCalled();
      expect(MockedRegisterScopeFourService).toHaveBeenCalled();
      expect(MockedRegisterScopeFiveService).toHaveBeenCalled();
      expect(MockedRegisterScopeTenService).toHaveBeenCalled();
      expect(MockedRegisterScopeThirteenService).toHaveBeenCalled();
      expect(MockedGenericRepository).toHaveBeenCalled();
      expect(MockedFecredRepository).toHaveBeenCalled();
      expect(MockedFexRepository).toHaveBeenCalled();
      expect(MockedGenericService).toHaveBeenCalled();
      expect(MockedWsfecredService).toHaveBeenCalled();
      expect(MockedWsfexService).toHaveBeenCalled();
    });

    it("should create FileSystemTicketStorage with correct parameters", () => {
      new Arca(mockContext);
      expect(MockedFileSystemTicketStorage).toHaveBeenCalledWith({
        ticketPath: expect.any(String),
        cuit: mockContext.cuit,
        production: false,
      });
    });

    it("should allow injecting custom ticketStorage", () => {
      const mockStorage = {} as ITicketStoragePort;
      const contextWithStorage: Context = {
        ...mockContext,
        ticketStorage: mockStorage,
      };

      new Arca(contextWithStorage);

      expect(MockedAuthRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          ticketStorage: mockStorage,
        }),
      );
      expect(MockedFileSystemTicketStorage).not.toHaveBeenCalled();
      expect(MockedMemoryTicketStorage).not.toHaveBeenCalled();
    });

    it("should create AuthRepository with correct parameters", () => {
      new Arca(mockContext);
      expect(MockedAuthRepository).toHaveBeenCalledWith({
        cert: mockContext.cert,
        key: mockContext.key,
        cuit: mockContext.cuit,
        production: false,
        handleTicket: false,
        ticketStorage: expect.anything(),
        credentials: undefined,
        useHttpsAgent: false,
      });
    });

    it("should create AuthRepository with handleTicket true", () => {
      const contextWithHandleTicket: Context = {
        ...mockContext,
        handleTicket: true,
      };

      new Arca(contextWithHandleTicket);
      expect(MockedAuthRepository).toHaveBeenCalledWith(
        expect.objectContaining({
          handleTicket: true,
          ticketStorage: undefined,
        }),
      );
    });

    it("should create ElectronicBillingRepository with correct parameters", () => {
      new Arca(mockContext);
      expect(MockedElectronicBillingRepository).toHaveBeenCalledWith({
        authRepository: expect.anything(),
        cuit: mockContext.cuit,
        production: false,
        useSoap12: true,
        useHttpsAgent: false,
      });
    });

    it("should create Register Repositories with correct parameters", () => {
      new Arca(mockContext);
      const expectedRepoConfig = {
        authRepository: expect.anything(),
        cuit: mockContext.cuit,
        production: false,
        useHttpsAgent: false,
      };

      expect(MockedRegisterScopeFourRepository).toHaveBeenCalledWith(
        expectedRepoConfig,
      );
      expect(MockedRegisterScopeFiveRepository).toHaveBeenCalledWith(
        expectedRepoConfig,
      );
      expect(MockedRegisterScopeTenRepository).toHaveBeenCalledWith(
        expectedRepoConfig,
      );
      expect(MockedRegisterScopeThirteenRepository).toHaveBeenCalledWith(
        expectedRepoConfig,
      );
      expect(MockedRegisterInscriptionProofRepository).toHaveBeenCalledWith(
        expectedRepoConfig,
      );
    });

    it("should create Generic, FECRED and FEX repositories with soap config", () => {
      new Arca(mockContext);
      const expectedSoapConfig = {
        authRepository: expect.anything(),
        cuit: mockContext.cuit,
        production: false,
        useSoap12: true,
        useHttpsAgent: false,
      };

      expect(MockedGenericRepository).toHaveBeenCalledWith(expectedSoapConfig);
      expect(MockedFecredRepository).toHaveBeenCalledWith(expectedSoapConfig);
      expect(MockedFexRepository).toHaveBeenCalledWith(expectedSoapConfig);
    });

    it("should create Arca instance with production true", () => {
      const productionContext: Context = {
        ...mockContext,
        production: true,
      };

      new Arca(productionContext);
      expect(MockedFileSystemTicketStorage).toHaveBeenCalledWith(
        expect.objectContaining({ production: true }),
      );
      expect(MockedAuthRepository).toHaveBeenCalledWith(
        expect.objectContaining({ production: true }),
      );
    });
  });

  describe("getters", () => {
    let arca: Arca;
    const mockServices = {
      electronicBilling: {} as ElectronicBillingService,
      inscriptionProof: {} as RegisterInscriptionProofService,
      scopeFour: {} as RegisterScopeFourService,
      scopeFive: {} as RegisterScopeFiveService,
      scopeTen: {} as RegisterScopeTenService,
      scopeThirteen: {} as RegisterScopeThirteenService,
      generic: {} as GenericService,
      wsfecred: {} as WsfecredService,
      wsfex: {} as WsfexService,
    };

    beforeEach(() => {
      MockedElectronicBillingService.mockReturnValue(
        mockServices.electronicBilling,
      );
      MockedRegisterInscriptionProofService.mockReturnValue(
        mockServices.inscriptionProof,
      );
      MockedRegisterScopeFourService.mockReturnValue(mockServices.scopeFour);
      MockedRegisterScopeFiveService.mockReturnValue(mockServices.scopeFive);
      MockedRegisterScopeTenService.mockReturnValue(mockServices.scopeTen);
      MockedRegisterScopeThirteenService.mockReturnValue(
        mockServices.scopeThirteen,
      );
      MockedGenericService.mockReturnValue(mockServices.generic);
      MockedWsfecredService.mockReturnValue(mockServices.wsfecred);
      MockedWsfexService.mockReturnValue(mockServices.wsfex);

      arca = new Arca(mockContext);
    });

    it("should return electronicBillingService", () => {
      expect(arca.electronicBillingService).toBe(
        mockServices.electronicBilling,
      );
    });

    it("should return registerInscriptionProofService", () => {
      expect(arca.registerInscriptionProofService).toBe(
        mockServices.inscriptionProof,
      );
    });

    it("should return registerScopeFourService", () => {
      expect(arca.registerScopeFourService).toBe(mockServices.scopeFour);
    });

    it("should return registerScopeFiveService", () => {
      expect(arca.registerScopeFiveService).toBe(mockServices.scopeFive);
    });

    it("should return registerScopeTenService", () => {
      expect(arca.registerScopeTenService).toBe(mockServices.scopeTen);
    });

    it("should return registerScopeThirteenService", () => {
      expect(arca.registerScopeThirteenService).toBe(
        mockServices.scopeThirteen,
      );
    });

    it("should return genericService", () => {
      expect(arca.genericService).toBe(mockServices.generic);
    });

    it("should return wsfecredService", () => {
      expect(arca.wsfecredService).toBe(mockServices.wsfecred);
    });

    it("should return wsfexService", () => {
      expect(arca.wsfexService).toBe(mockServices.wsfex);
    });
  });

  describe("context normalization", () => {
    it("should use default ticketPath when not provided", () => {
      new Arca(mockContext);
      expect(MockedFileSystemTicketStorage).toHaveBeenCalledWith(
        expect.objectContaining({
          ticketPath: expect.stringContaining(
            "infrastructure/storage/auth/tickets",
          ),
        }),
      );
    });
  });
});
