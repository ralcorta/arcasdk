import { CheckPermisoUseCase } from "@application/use-cases/wsfex/check-permiso.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("CheckPermisoUseCase", () => {
  it("returns repository checkPermiso result", async () => {
    const expected = { FEXCheck_PermisoResult: {} };
    const repository = {
      checkPermiso: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new CheckPermisoUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.checkPermiso).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      checkPermiso: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new CheckPermisoUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
