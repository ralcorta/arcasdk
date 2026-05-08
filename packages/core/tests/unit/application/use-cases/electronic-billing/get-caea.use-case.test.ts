import { GetCaeaUseCase } from "@application/use-cases/electronic-billing/get-caea.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetCaeaUseCase", () => {
  it("returns repository CAEA with period and order", async () => {
    const expected = {
      resultGet: { caea: "12345678901234", caeFchVto: "20240531" },
    };
    const repository = {
      getCaea: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetCaeaUseCase(repository);
    const result = await useCase.execute(202405, 1);

    expect(repository.getCaea).toHaveBeenCalledWith(202405, 1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getCaea: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetCaeaUseCase(repository);

    await expect(useCase.execute(202405, 1)).rejects.toThrow("boom");
  });
});
