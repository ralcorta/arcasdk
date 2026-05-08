import { GetCurrencyTypesUseCase } from "@application/use-cases/electronic-billing/get-currency-types.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetCurrencyTypesUseCase", () => {
  it("returns repository currency types", async () => {
    const expected = { resultGet: { moneda: [] } };
    const repository = {
      getCurrencyTypes: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetCurrencyTypesUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getCurrencyTypes).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getCurrencyTypes: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetCurrencyTypesUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
