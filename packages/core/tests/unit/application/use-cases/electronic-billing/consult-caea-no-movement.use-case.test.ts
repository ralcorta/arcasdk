import { ConsultCaeaNoMovementUseCase } from "@application/use-cases/electronic-billing/consult-caea-no-movement.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("ConsultCaeaNoMovementUseCase", () => {
  it("returns repository consult CAEA no movement with parameters", async () => {
    const expected = {
      resultGet: { result: "A" },
    };
    const repository = {
      consultCaeaNoMovement: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new ConsultCaeaNoMovementUseCase(repository);
    const result = await useCase.execute("12345678901234", 1);

    expect(repository.consultCaeaNoMovement).toHaveBeenCalledWith(
      "12345678901234",
      1,
    );
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      consultCaeaNoMovement: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new ConsultCaeaNoMovementUseCase(repository);

    await expect(
      useCase.execute("12345678901234", 1),
    ).rejects.toThrow("boom");
  });
});
