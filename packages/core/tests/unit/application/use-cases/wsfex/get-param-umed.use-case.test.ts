import { GetParamUMedUseCase } from "@application/use-cases/wsfex/get-param-umed.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetParamUMedUseCase", () => {
  it("returns repository result", async () => {
    const expected = { FEXGetPARAM_UMedResult: {} };
    const repository = {
      getParamUMed: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamUMedUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.getParamUMed).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getParamUMed: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamUMedUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
