import { GetParamDstCuitUseCase } from "@application/use-cases/wsfex/get-param-dst-cuit.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetParamDstCuitUseCase", () => {
  it("returns repository result", async () => {
    const expected = { FEXGetPARAM_DST_CUITResult: {} };
    const repository = {
      getParamDstCuit: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamDstCuitUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.getParamDstCuit).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getParamDstCuit: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamDstCuitUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
