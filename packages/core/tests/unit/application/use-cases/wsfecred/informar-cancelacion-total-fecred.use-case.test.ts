import { InformarCancelacionTotalFECredUseCase } from "@application/use-cases/wsfecred/informar-cancelacion-total-fecred.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("InformarCancelacionTotalFECredUseCase", () => {
  it("returns repository result", async () => {
    const expected = { informarCancelacionTotalFECredReturn: {} };
    const repository = {
      informarCancelacionTotalFECred: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new InformarCancelacionTotalFECredUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.informarCancelacionTotalFECred).toHaveBeenCalledWith(
      input,
    );
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      informarCancelacionTotalFECred: jest
        .fn()
        .mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new InformarCancelacionTotalFECredUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
