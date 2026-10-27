import { GetDocumentosTipoUseCase } from "@application/use-cases/wscdc/get-documentos-tipo.use-case";
import { ICdcRepositoryPort } from "@application/ports/cdc/cdc-repository.port";

describe("GetDocumentosTipoUseCase", () => {
  it("returns repository result", async () => {
    const expected = { DocumentosTipoConsultarResult: {} };
    const repository = {
      getDocumentosTipo: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<ICdcRepositoryPort>;

    const useCase = new GetDocumentosTipoUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getDocumentosTipo).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getDocumentosTipo: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<ICdcRepositoryPort>;

    const useCase = new GetDocumentosTipoUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
