import { GetRegisterServerStatusUseCase } from "@application/use-cases/register/get-register-server-status.use-case";
import { IRegisterBaseRepositoryPort } from "@application/ports/register/register-repository.ports";

describe("GetRegisterServerStatusUseCase", () => {
  it("delegates getServerStatus to repository", async () => {
    const status = { appServer: "OK", dbServer: "OK", authServer: "OK" };
    const repository: jest.Mocked<IRegisterBaseRepositoryPort> = {
      getServerStatus: jest.fn().mockResolvedValue(status),
    } as any;

    const useCase = new GetRegisterServerStatusUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getServerStatus).toHaveBeenCalledTimes(1);
    expect(result).toEqual(status);
  });

  it("propagates repository errors", async () => {
    const repository: jest.Mocked<IRegisterBaseRepositoryPort> = {
      getServerStatus: jest.fn().mockRejectedValue(new Error("boom")),
    } as any;

    const useCase = new GetRegisterServerStatusUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
