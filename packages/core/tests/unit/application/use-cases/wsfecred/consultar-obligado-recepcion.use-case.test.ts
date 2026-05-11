import { ConsultarObligadoRecepcionUseCase } from "@application/use-cases/wsfecred/consultar-obligado-recepcion.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("ConsultarObligadoRecepcionUseCase", () => {
  it("returns repository result", async () => {
    const expected = { consultarObligadoRecepcionReturn: {} };
    const repository = {
      consultarObligadoRecepcion: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarObligadoRecepcionUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.consultarObligadoRecepcion).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      consultarObligadoRecepcion: jest
        .fn()
        .mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarObligadoRecepcionUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
