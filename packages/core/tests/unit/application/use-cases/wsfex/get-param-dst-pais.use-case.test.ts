import { GetParamDstPaisUseCase } from "@application/use-cases/wsfex/get-param-dst-pais.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetParamDstPaisUseCase", () => {
  it("returns repository result", async () => {
    const expected = { FEXGetPARAM_DST_paisResult: {} };
    const repository = {
      getParamDstPais: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamDstPaisUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.getParamDstPais).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getParamDstPais: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamDstPaisUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
