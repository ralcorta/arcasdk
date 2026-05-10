import { ConsultarHistorialEstadosCtaCteUseCase } from "@application/use-cases/wsfecred/consultar-historial-estados-cta-cte.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("ConsultarHistorialEstadosCtaCteUseCase", () => {
  it("returns repository result", async () => {
    const expected = { consultarHistorialEstadosCtaCteReturn: {} };
    const repository = {
      consultarHistorialEstadosCtaCte: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarHistorialEstadosCtaCteUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.consultarHistorialEstadosCtaCte).toHaveBeenCalledWith(
      input,
    );
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      consultarHistorialEstadosCtaCte: jest
        .fn()
        .mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarHistorialEstadosCtaCteUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
