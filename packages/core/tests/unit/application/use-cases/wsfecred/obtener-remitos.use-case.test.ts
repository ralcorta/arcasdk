import { ObtenerRemitosUseCase } from "@application/use-cases/wsfecred/obtener-remitos.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("ObtenerRemitosUseCase", () => {
  it("returns repository result", async () => {
    const expected = { obtenerRemitosReturn: {} };
    const repository = {
      obtenerRemitos: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ObtenerRemitosUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.obtenerRemitos).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      obtenerRemitos: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ObtenerRemitosUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
