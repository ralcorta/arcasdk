import { ConsultarTiposFormasCancelacionUseCase } from "@application/use-cases/wsfecred/consultar-tipos-formas-cancelacion.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("ConsultarTiposFormasCancelacionUseCase", () => {
  it("returns repository result", async () => {
    const expected = { codigoDescripcionReturn: {} };
    const repository = {
      consultarTiposFormasCancelacion: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarTiposFormasCancelacionUseCase(repository);
    const result = await useCase.execute();

    expect(repository.consultarTiposFormasCancelacion).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      consultarTiposFormasCancelacion: jest
        .fn()
        .mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarTiposFormasCancelacionUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
