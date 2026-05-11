import { GetParamMonConCotizacionUseCase } from "@application/use-cases/wsfex/get-param-mon-con-cotizacion.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetParamMonConCotizacionUseCase", () => {
  it("returns repository result", async () => {
    const expected = { FEXGetPARAM_MON_CON_COTIZACIONResult: {} };
    const repository = {
      getParamMonConCotizacion: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamMonConCotizacionUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.getParamMonConCotizacion).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getParamMonConCotizacion: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamMonConCotizacionUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
