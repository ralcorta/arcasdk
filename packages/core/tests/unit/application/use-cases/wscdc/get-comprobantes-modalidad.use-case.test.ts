import { GetComprobantesModalidadUseCase } from "@application/use-cases/wscdc/get-comprobantes-modalidad.use-case";
import { ICdcRepositoryPort } from "@application/ports/cdc/cdc-repository.port";

describe("GetComprobantesModalidadUseCase", () => {
  it("returns repository result", async () => {
    const expected = { ComprobantesModalidadConsultarResult: {} };
    const repository = {
      getComprobantesModalidad: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<ICdcRepositoryPort>;

    const useCase = new GetComprobantesModalidadUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getComprobantesModalidad).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getComprobantesModalidad: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<ICdcRepositoryPort>;

    const useCase = new GetComprobantesModalidadUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
