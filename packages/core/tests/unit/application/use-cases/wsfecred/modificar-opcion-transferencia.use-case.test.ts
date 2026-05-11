import { ModificarOpcionTransferenciaUseCase } from "@application/use-cases/wsfecred/modificar-opcion-transferencia.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("ModificarOpcionTransferenciaUseCase", () => {
  it("returns repository result", async () => {
    const expected = { modificarOpcionTransferenciaReturn: {} };
    const repository = {
      modificarOpcionTransferencia: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ModificarOpcionTransferenciaUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.modificarOpcionTransferencia).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      modificarOpcionTransferencia: jest
        .fn()
        .mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ModificarOpcionTransferenciaUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
