import { GetParamCtzUseCase } from "@application/use-cases/wsfex/get-param-ctz.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetParamCtzUseCase", () => {
  it("returns repository result", async () => {
    const expected = { FEXGetPARAM_CtzResult: {} };
    const repository = {
      getParamCtz: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamCtzUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.getParamCtz).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getParamCtz: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamCtzUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
