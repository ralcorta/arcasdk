import { FexDummyUseCase } from "@application/use-cases/wsfex/dummy.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("FexDummyUseCase", () => {
  it("returns repository dummy result", async () => {
    const expected = {
      FEXDummyResult: { AppServer: "OK", DbServer: "OK", AuthServer: "OK" },
    };
    const repository = {
      dummy: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new FexDummyUseCase(repository);
    const result = await useCase.execute();

    expect(repository.dummy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      dummy: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new FexDummyUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
