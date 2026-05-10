import { GetParamIncotermsUseCase } from "@application/use-cases/wsfex/get-param-incoterms.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetParamIncotermsUseCase", () => {
  it("returns repository result", async () => {
    const expected = { FEXGetPARAM_IncotermsResult: {} };
    const repository = {
      getParamIncoterms: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamIncotermsUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.getParamIncoterms).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getParamIncoterms: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamIncotermsUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
