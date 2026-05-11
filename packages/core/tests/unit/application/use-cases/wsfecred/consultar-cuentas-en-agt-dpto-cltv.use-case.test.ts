import { ConsultarCuentasEnAgtDptoCltvUseCase } from "@application/use-cases/wsfecred/consultar-cuentas-en-agt-dpto-cltv.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("ConsultarCuentasEnAgtDptoCltvUseCase", () => {
  it("returns repository result", async () => {
    const expected = { consultarCuentasEnAgtDptoCltvReturn: {} };
    const repository = {
      consultarCuentasEnAgtDptoCltv: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarCuentasEnAgtDptoCltvUseCase(repository);
    const result = await useCase.execute();

    expect(repository.consultarCuentasEnAgtDptoCltv).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      consultarCuentasEnAgtDptoCltv: jest
        .fn()
        .mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new ConsultarCuentasEnAgtDptoCltvUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
