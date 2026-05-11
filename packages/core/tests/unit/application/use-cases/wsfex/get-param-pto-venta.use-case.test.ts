import { GetParamPtoVentaUseCase } from "@application/use-cases/wsfex/get-param-pto-venta.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetParamPtoVentaUseCase", () => {
  it("returns repository result", async () => {
    const expected = { FEXGetPARAM_PtoVentaResult: {} };
    const repository = {
      getParamPtoVenta: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamPtoVentaUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.getParamPtoVenta).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getParamPtoVenta: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetParamPtoVentaUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
