import { GetIvaReceptorTypesUseCase } from "@application/use-cases/electronic-billing/get-iva-receptor-types.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetIvaReceptorTypesUseCase", () => {
  it("returns repository iva receptor types", async () => {
    const expected = { resultGet: { condicionIvaReceptor: [] } };
    const repository = {
      getIvaReceptorTypes: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetIvaReceptorTypesUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getIvaReceptorTypes).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getIvaReceptorTypes: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetIvaReceptorTypesUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
