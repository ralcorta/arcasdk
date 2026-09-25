import { GetOpcionalesTipoUseCase } from "@application/use-cases/wscdc/get-opcionales-tipo.use-case";
import { ICdcRepositoryPort } from "@application/ports/cdc/cdc-repository.port";

describe("GetOpcionalesTipoUseCase", () => {
  it("returns repository result", async () => {
    const expected = { OpcionalesTipoConsultarResult: {} };
    const repository = {
      getOpcionalesTipo: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<ICdcRepositoryPort>;

    const useCase = new GetOpcionalesTipoUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getOpcionalesTipo).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getOpcionalesTipo: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<ICdcRepositoryPort>;

    const useCase = new GetOpcionalesTipoUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
