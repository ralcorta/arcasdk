import { GetOptionalTypesUseCase } from "@application/use-cases/electronic-billing/get-optional-types.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetOptionalTypesUseCase", () => {
  it("returns repository optional types", async () => {
    const expected = { resultGet: { opcionalTipo: [] } };
    const repository = {
      getOptionalTypes: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetOptionalTypesUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getOptionalTypes).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getOptionalTypes: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetOptionalTypesUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
