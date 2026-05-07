import { GetTaxTypesUseCase } from "@application/use-cases/electronic-billing/get-tax-types.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetTaxTypesUseCase", () => {
  it("returns repository tax types", async () => {
    const expected = { resultGet: { tributoTipo: [] } };
    const repository = {
      getTaxTypes: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetTaxTypesUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getTaxTypes).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getTaxTypes: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetTaxTypesUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
