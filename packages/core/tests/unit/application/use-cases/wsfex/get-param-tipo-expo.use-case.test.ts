import { GetParamTipoExpoUseCase } from "@application/use-cases/wsfex/get-param-tipo-expo.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetParamTipoExpoUseCase", () => {
  it("returns repository result", async () => {
    const expected = { FEXGetPARAM_Tipo_ExpoResult: {} };
    const repository = {
      getParamTipoExpo: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamTipoExpoUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.getParamTipoExpo).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getParamTipoExpo: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamTipoExpoUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
