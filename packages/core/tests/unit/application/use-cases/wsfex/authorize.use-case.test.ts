import { AuthorizeUseCase } from "@application/use-cases/wsfex/authorize.use-case";
import { IFexRepositoryPort } from "@application/ports/fex/fex-repository.port";

describe("AuthorizeUseCase", () => {
  it("returns repository authorize result", async () => {
    const expected = { FEXAuthorizeResult: {} };
    const repository = {
      authorize: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new AuthorizeUseCase(repository);
    const input = { Cmp: {} } as never;
    const result = await useCase.execute(input);

    expect(repository.authorize).toHaveBeenCalledWith(input);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      authorize: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IFexRepositoryPort>;

    const useCase = new AuthorizeUseCase(repository);

    await expect(useCase.execute({} as never)).rejects.toThrow("boom");
  });
});
