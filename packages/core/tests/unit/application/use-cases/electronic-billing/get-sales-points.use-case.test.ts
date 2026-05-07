import { GetSalesPointsUseCase } from "@application/use-cases/electronic-billing/get-sales-points.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetSalesPointsUseCase", () => {
  it("returns repository sales points", async () => {
    const expected = {
      resultGet: { ptoVta: [{ nro: 1, emisionTipo: 1, bloqueo: "N" }] },
    };
    const repository = {
      getSalesPoints: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetSalesPointsUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getSalesPoints).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getSalesPoints: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetSalesPointsUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
