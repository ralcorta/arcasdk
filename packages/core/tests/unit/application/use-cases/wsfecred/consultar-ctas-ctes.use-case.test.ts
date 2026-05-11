import { ConsultarCtasCtesUseCase } from "@application/use-cases/wsfecred/consultar-ctas-ctes.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("ConsultarCtasCtesUseCase", () => {
  it("returns repository result", async () => {
    const expected = { consultarCtasCtesReturn: {} };
    const repository = {
      consultarCtasCtes: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarCtasCtesUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.consultarCtasCtes).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      consultarCtasCtes: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarCtasCtesUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
