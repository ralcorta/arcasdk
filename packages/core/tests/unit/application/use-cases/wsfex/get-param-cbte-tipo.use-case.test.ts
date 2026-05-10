import { GetParamCbteTipoUseCase } from "@application/use-cases/wsfex/get-param-cbte-tipo.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetParamCbteTipoUseCase", () => {
  it("returns repository result", async () => {
    const expected = { FEXGetPARAM_Cbte_TipoResult: {} };
    const repository = {
      getParamCbteTipo: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamCbteTipoUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.getParamCbteTipo).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getParamCbteTipo: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamCbteTipoUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
