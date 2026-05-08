import { GetAliquotTypesUseCase } from "@application/use-cases/electronic-billing/get-aliquot-types.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetAliquotTypesUseCase", () => {
  it("returns repository aliquot types", async () => {
    const expected = { resultGet: { ivaTipo: [] } };
    const repository = {
      getAliquotTypes: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetAliquotTypesUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getAliquotTypes).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getAliquotTypes: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetAliquotTypesUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
