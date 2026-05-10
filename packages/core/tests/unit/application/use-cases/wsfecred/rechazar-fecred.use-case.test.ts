import { RechazarFECredUseCase } from "@application/use-cases/wsfecred/rechazar-fecred.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("RechazarFECredUseCase", () => {
  it("returns repository result", async () => {
    const expected = { rechazarFECredReturn: {} };
    const repository = {
      rechazarFECred: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new RechazarFECredUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.rechazarFECred).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      rechazarFECred: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new RechazarFECredUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
