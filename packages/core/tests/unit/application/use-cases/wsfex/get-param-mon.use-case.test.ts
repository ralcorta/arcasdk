import { GetParamMonUseCase } from "@application/use-cases/wsfex/get-param-mon.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetParamMonUseCase", () => {
  it("returns repository result", async () => {
    const expected = { FEXGetPARAM_MONResult: {} };
    const repository = {
      getParamMon: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamMonUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.getParamMon).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getParamMon: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamMonUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
