import { GetMaxRecordsUseCase } from "@application/use-cases/electronic-billing/get-max-records.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetMaxRecordsUseCase", () => {
  it("returns repository max records", async () => {
    const expected = { resultGet: 500 };
    const repository = {
      getMaxRecordsPerRequest: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetMaxRecordsUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getMaxRecordsPerRequest).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getMaxRecordsPerRequest: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetMaxRecordsUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
