import { GetLastIdUseCase } from "@application/use-cases/wsfex/get-last-id.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("GetLastIdUseCase", () => {
  it("returns repository getLastId result", async () => {
    const expected = { FEXGetLast_IDResult: {} };
    const repository = {
      getLastId: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetLastIdUseCase(repository);
    const input = {} as never;
    const result = await useCase.execute(input);

    expect(repository.getLastId).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getLastId: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new GetLastIdUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
