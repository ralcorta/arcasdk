import { InformCaeaNoMovementUseCase } from "@application/use-cases/electronic-billing/inform-caea-no-movement.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("InformCaeaNoMovementUseCase", () => {
  it("returns repository inform CAEA no movement with parameters", async () => {
    const expected = {
      resultGet: { result: "A" },
    };
    const repository = {
      informCaeaNoMovement: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new InformCaeaNoMovementUseCase(repository);
    const result = await useCase.execute("12345678901234", 1);

    expect(repository.informCaeaNoMovement).toHaveBeenCalledWith(
      "12345678901234",
      1,
    );
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      informCaeaNoMovement: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new InformCaeaNoMovementUseCase(repository);

    await expect(useCase.execute("12345678901234", 1)).rejects.toThrow("boom");
  });
});
