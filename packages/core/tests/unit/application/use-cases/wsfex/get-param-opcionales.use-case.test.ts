import { GetParamOpcionalesUseCase } from "@application/use-cases/wsfex/get-param-opcionales.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetParamOpcionalesUseCase", () => {
  it("returns repository result", async () => {
    const expected = { FEXGetPARAM_OpcionalesResult: {} };
    const repository = {
      getParamOpcionales: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamOpcionalesUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.getParamOpcionales).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getParamOpcionales: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamOpcionalesUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
