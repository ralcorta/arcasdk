import { ConsultarTiposAjustesOperacionUseCase } from "@application/use-cases/wsfecred/consultar-tipos-ajustes-operacion.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("ConsultarTiposAjustesOperacionUseCase", () => {
  it("returns repository result", async () => {
    const expected = { codigoDescripcionReturn: {} };
    const repository = {
      consultarTiposAjustesOperacion: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarTiposAjustesOperacionUseCase(repository);
    const result = await useCase.execute();

    expect(repository.consultarTiposAjustesOperacion).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      consultarTiposAjustesOperacion: jest
        .fn()
        .mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarTiposAjustesOperacionUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
