import { GetLastCmpUseCase } from "@application/use-cases/wsfex/get-last-cmp.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetLastCmpUseCase", () => {
  it("returns repository getLastCmp result", async () => {
    const expected = { FEXGetLast_CMPResult: {} };
    const repository = {
      getLastCmp: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetLastCmpUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.getLastCmp).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getLastCmp: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetLastCmpUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
