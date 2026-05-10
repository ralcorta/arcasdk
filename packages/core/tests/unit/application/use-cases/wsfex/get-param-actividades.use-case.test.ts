import { GetParamActividadesUseCase } from "@application/use-cases/wsfex/get-param-actividades.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetParamActividadesUseCase", () => {
  it("returns repository result", async () => {
    const expected = { FEXGetPARAM_ActividadesResult: {} };
    const repository = {
      getParamActividades: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamActividadesUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.getParamActividades).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getParamActividades: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamActividadesUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
