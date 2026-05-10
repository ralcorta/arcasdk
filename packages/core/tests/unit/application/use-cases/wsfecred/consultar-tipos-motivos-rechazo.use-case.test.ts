import { ConsultarTiposMotivosRechazoUseCase } from "@application/use-cases/wsfecred/consultar-tipos-motivos-rechazo.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("ConsultarTiposMotivosRechazoUseCase", () => {
  it("returns repository result", async () => {
    const expected = { codigoDescripcionReturn: {} };
    const repository = {
      consultarTiposMotivosRechazo: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarTiposMotivosRechazoUseCase(repository);
    const result = await useCase.execute();

    expect(repository.consultarTiposMotivosRechazo).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      consultarTiposMotivosRechazo: jest
        .fn()
        .mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarTiposMotivosRechazoUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
