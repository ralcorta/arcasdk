import { RegisterScopeHundredService } from "@application/services/register-scope-hundred.service";
import { IRegisterScopeHundredRepositoryPort } from "@application/ports/register/register-repository.ports";
import { ParameterCollectionDto } from "@application/dto/register";

describe("Register Scope Hundred Service", () => {
  let registerScopeHundredService: RegisterScopeHundredService;
  let mockRepository: jest.Mocked<IRegisterScopeHundredRepositoryPort>;

  const serverStatus = { appServer: "OK", dbServer: "OK", authServer: "OK" };
  const collection: ParameterCollectionDto = {
    name: "SUPA.E_PROVINCIA",
    fechaHora: "2026-09-25T12:38:03.144Z",
    parameters: [
      {
        id: "0",
        description: "CIUDAD AUTONOMA BUENOS AIRES",
        attributes: {
          NOMBRE_PROVINCIA: "CIUDAD AUTONOMA BUENOS AIRES",
          COD_PROVINCIA: "0",
          CODIGO_SIM_PROVINCIA: "CF",
        },
      },
    ],
  };

  beforeEach(() => {
    mockRepository = {
      getServerStatus: jest.fn().mockResolvedValue(serverStatus),
      getParameterCollection: jest.fn().mockResolvedValue(collection),
    } as jest.Mocked<IRegisterScopeHundredRepositoryPort>;

    registerScopeHundredService = new RegisterScopeHundredService(
      mockRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get server status", async () => {
    const status = await registerScopeHundredService.getServerStatus();
    expect(status).toEqual(serverStatus);
    expect(mockRepository.getServerStatus).toHaveBeenCalled();
  });

  it("should get a parameter collection", async () => {
    const result =
      await registerScopeHundredService.getParameterCollection(
        "SUPA.E_PROVINCIA",
      );
    expect(result).toEqual(collection);
    expect(mockRepository.getParameterCollection).toHaveBeenCalledWith(
      "SUPA.E_PROVINCIA",
    );
  });
});
