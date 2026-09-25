import { GetComprobantesTipoUseCase } from "@application/use-cases/wscdc/get-comprobantes-tipo.use-case";
import { ICdcRepositoryPort } from "@application/ports/cdc/cdc-repository.port";

describe("GetComprobantesTipoUseCase", () => {
  it("returns repository result", async () => {
    const expected = { ComprobantesTipoConsultarResult: {} };
    const repository = {
      getComprobantesTipo: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<ICdcRepositoryPort>;

    const useCase = new GetComprobantesTipoUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getComprobantesTipo).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getComprobantesTipo: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<ICdcRepositoryPort>;

    const useCase = new GetComprobantesTipoUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
