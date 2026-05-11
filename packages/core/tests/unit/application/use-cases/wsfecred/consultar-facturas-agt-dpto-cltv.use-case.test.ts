import { ConsultarFacturasAgtDptoCltvUseCase } from "@application/use-cases/wsfecred/consultar-facturas-agt-dpto-cltv.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("ConsultarFacturasAgtDptoCltvUseCase", () => {
  it("returns repository result", async () => {
    const expected = { consultarFacturasAgtDptoCltvReturn: {} };
    const repository = {
      consultarFacturasAgtDptoCltv: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarFacturasAgtDptoCltvUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.consultarFacturasAgtDptoCltv).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      consultarFacturasAgtDptoCltv: jest
        .fn()
        .mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarFacturasAgtDptoCltvUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
