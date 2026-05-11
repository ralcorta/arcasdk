import { RechazarNotaDCUseCase } from "@application/use-cases/wsfecred/rechazar-nota-dc.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("RechazarNotaDCUseCase", () => {
  it("returns repository result", async () => {
    const expected = { rechazarNotaDCReturn: {} };
    const repository = {
      rechazarNotaDC: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new RechazarNotaDCUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.rechazarNotaDC).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      rechazarNotaDC: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new RechazarNotaDCUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
