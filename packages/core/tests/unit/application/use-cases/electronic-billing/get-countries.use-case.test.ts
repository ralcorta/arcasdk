import { GetCountriesUseCase } from "@application/use-cases/electronic-billing/get-countries.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetCountriesUseCase", () => {
  it("returns repository countries", async () => {
    const expected = { resultGet: { paisTipo: [{ id: 1, desc: "AR" }] } };
    const repository = {
      getCountries: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetCountriesUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getCountries).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getCountries: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetCountriesUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
