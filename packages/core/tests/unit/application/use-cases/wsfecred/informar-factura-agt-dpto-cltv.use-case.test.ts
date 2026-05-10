import { InformarFacturaAgtDptoCltvUseCase } from "@application/use-cases/wsfecred/informar-factura-agt-dpto-cltv.use-case";
import { IFecredRepositoryPort } from "@application/ports/fecred/fecred-repository.port";

describe("InformarFacturaAgtDptoCltvUseCase", () => {
  it("returns repository result", async () => {
    const expected = { informarFacturaAgtDptoCltvReturn: {} };
    const repository = {
      informarFacturaAgtDptoCltv: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new InformarFacturaAgtDptoCltvUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.informarFacturaAgtDptoCltv).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      informarFacturaAgtDptoCltv: jest
        .fn()
        .mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFecredRepositoryPort>;

    const useCase = new InformarFacturaAgtDptoCltvUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
