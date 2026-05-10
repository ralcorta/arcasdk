import { ConsultarCtaCteUseCase } from "@application/use-cases/wsfecred/consultar-cta-cte.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("ConsultarCtaCteUseCase", () => {
  it("returns repository result", async () => {
    const expected = { consultarCtaCteReturn: {} };
    const repository = {
      consultarCtaCte: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarCtaCteUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.consultarCtaCte).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      consultarCtaCte: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarCtaCteUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
