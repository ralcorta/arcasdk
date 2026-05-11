import { ConsultarMontoObligadoRecepcionUseCase } from "@application/use-cases/wsfecred/consultar-monto-obligado-recepcion.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("ConsultarMontoObligadoRecepcionUseCase", () => {
  it("returns repository result", async () => {
    const expected = { consultarMontoObligadoRecepcionReturn: {} };
    const repository = {
      consultarMontoObligadoRecepcion: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarMontoObligadoRecepcionUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.consultarMontoObligadoRecepcion).toHaveBeenCalledWith(
      input,
    );
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      consultarMontoObligadoRecepcion: jest
        .fn()
        .mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarMontoObligadoRecepcionUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
