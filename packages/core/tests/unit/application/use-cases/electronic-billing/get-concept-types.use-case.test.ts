import { GetConceptTypesUseCase } from "@application/use-cases/electronic-billing/get-concept-types.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetConceptTypesUseCase", () => {
  it("returns repository concept types", async () => {
    const expected = { resultGet: { conceptoTipo: [] } };
    const repository = {
      getConceptTypes: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetConceptTypesUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getConceptTypes).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getConceptTypes: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetConceptTypesUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
