import { ConsultarComprobantesUseCase } from "@application/use-cases/wsfecred/consultar-comprobantes.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("ConsultarComprobantesUseCase", () => {
  it("returns repository result", async () => {
    const expected = { consultarCmpReturn: {} };
    const repository = {
      consultarComprobantes: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarComprobantesUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.consultarComprobantes).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      consultarComprobantes: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarComprobantesUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
