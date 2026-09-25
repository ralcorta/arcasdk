import { ConstatarComprobanteUseCase } from "@application/use-cases/wscdc/constatar-comprobante.use-case";
import { ICdcRepositoryPort } from "@application/ports/cdc/cdc-repository.port";

describe("ConstatarComprobanteUseCase", () => {
  it("returns repository result", async () => {
    const expected = { ComprobanteConstatarResult: {} };
    const repository = {
      constatarComprobante: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<ICdcRepositoryPort>;

    const useCase = new ConstatarComprobanteUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.constatarComprobante).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      constatarComprobante: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<ICdcRepositoryPort>;

    const useCase = new ConstatarComprobanteUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
