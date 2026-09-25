import { CdcDummyUseCase } from "@application/use-cases/wscdc/dummy.use-case";
import { ICdcRepositoryPort } from "@application/ports/cdc/cdc-repository.port";

describe("CdcDummyUseCase", () => {
  it("returns repository result", async () => {
    const expected = { ComprobanteDummyResult: {} };
    const repository = {
      dummy: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<ICdcRepositoryPort>;

    const useCase = new CdcDummyUseCase(repository);
    const result = await useCase.execute();

    expect(repository.dummy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      dummy: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<ICdcRepositoryPort>;

    const useCase = new CdcDummyUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
