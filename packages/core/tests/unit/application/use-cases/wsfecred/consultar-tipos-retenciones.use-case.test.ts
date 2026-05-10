import { ConsultarTiposRetencionesUseCase } from "@application/use-cases/wsfecred/consultar-tipos-retenciones.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("ConsultarTiposRetencionesUseCase", () => {
  it("returns repository result", async () => {
    const expected = { consultarTiposRetencionesReturn: {} };
    const repository = {
      consultarTiposRetenciones: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarTiposRetencionesUseCase(repository);
    const result = await useCase.execute();

    expect(repository.consultarTiposRetenciones).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      consultarTiposRetenciones: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarTiposRetencionesUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
