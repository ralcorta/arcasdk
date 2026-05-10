import { GetCmpUseCase } from "@application/use-cases/wsfex/get-cmp.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetCmpUseCase", () => {
  it("returns repository getCmp result", async () => {
    const expected = { FEXGetCMPResult: {} };
    const repository = {
      getCmp: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetCmpUseCase(repository);
    const input = { Cmp: {} } as never;
    const result = await useCase.execute(input);

    expect(repository.getCmp).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getCmp: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetCmpUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
