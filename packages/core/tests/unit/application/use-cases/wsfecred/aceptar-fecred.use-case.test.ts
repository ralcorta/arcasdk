import { AceptarFECredUseCase } from "@application/use-cases/wsfecred/aceptar-fecred.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("AceptarFECredUseCase", () => {
  it("returns repository result", async () => {
    const expected = { aceptarFECredReturn: {} };
    const repository = {
      aceptarFECred: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new AceptarFECredUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.aceptarFECred).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      aceptarFECred: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new AceptarFECredUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
