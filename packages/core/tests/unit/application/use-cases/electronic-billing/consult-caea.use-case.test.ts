import { ConsultCaeaUseCase } from "@application/use-cases/electronic-billing/consult-caea.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("ConsultCaeaUseCase", () => {
  it("returns repository consult CAEA with period and order", async () => {
    const expected = {
      resultGet: {
        period: 202405,
        order: 1,
        caea: "12345678901234",
      },
    };
    const repository = {
      consultCaea: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new ConsultCaeaUseCase(repository);
    const result = await useCase.execute(202405, 1);

    expect(repository.consultCaea).toHaveBeenCalledWith(202405, 1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      consultCaea: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new ConsultCaeaUseCase(repository);

    await expect(useCase.execute(202405, 1)).rejects.toThrow("boom");
  });
});
