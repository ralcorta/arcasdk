import { GetServerStatusUseCase } from "@application/use-cases/electronic-billing/get-server-status.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetServerStatusUseCase", () => {
  it("returns repository server status", async () => {
    const expected = {
      appServer: "OK",
      dbServer: "OK",
      authServer: "OK",
    };
    const repository = {
      getServerStatus: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetServerStatusUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getServerStatus).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getServerStatus: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetServerStatusUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
