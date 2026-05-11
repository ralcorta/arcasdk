import { GetParamIdiomasUseCase } from "@application/use-cases/wsfex/get-param-idiomas.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetParamIdiomasUseCase", () => {
  it("returns repository result", async () => {
    const expected = { FEXGetPARAM_IdiomasResult: {} };
    const repository = {
      getParamIdiomas: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamIdiomasUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.getParamIdiomas).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getParamIdiomas: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamIdiomasUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
