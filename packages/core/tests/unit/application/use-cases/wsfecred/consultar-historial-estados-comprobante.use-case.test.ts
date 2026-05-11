import { ConsultarHistorialEstadosComprobanteUseCase } from "@application/use-cases/wsfecred/consultar-historial-estados-comprobante.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("ConsultarHistorialEstadosComprobanteUseCase", () => {
  it("returns repository result", async () => {
    const expected = { consultarHistorialEstadosComprobanteReturn: {} };
    const repository = {
      consultarHistorialEstadosComprobante: jest
        .fn()
        .mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarHistorialEstadosComprobanteUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(
      repository.consultarHistorialEstadosComprobante,
    ).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      consultarHistorialEstadosComprobante: jest
        .fn()
        .mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarHistorialEstadosComprobanteUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
