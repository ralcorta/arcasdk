import { GetTaxIDByDocumentUseCase } from "@application/use-cases/register/get-tax-id-by-document.use-case";
import { IRegisterScopeThirteenRepositoryPort } from "@application/ports/register/register-repository.ports";
import { TaxIDByDocumentResultDto } from "@application/dto/register.dto";

describe("GetTaxIDByDocumentUseCase", () => {
  it("delegates getTaxIDByDocument to repository", async () => {
    const result: TaxIDByDocumentResultDto = {
      idPersona: [12345],
    };
    const repository: jest.Mocked<IRegisterScopeThirteenRepositoryPort> = {
      getTaxIDByDocument: jest.fn().mockResolvedValue(result),
    } as any;

    const useCase = new GetTaxIDByDocumentUseCase(repository);
    const documentNumber = "20111111112";
    const returnedResult = await useCase.execute(documentNumber);

    expect(repository.getTaxIDByDocument).toHaveBeenCalledWith(documentNumber);
    expect(returnedResult).toEqual(result);
  });

  it("handles missing idPersona in response", async () => {
    const result: TaxIDByDocumentResultDto = {};
    const repository: jest.Mocked<IRegisterScopeThirteenRepositoryPort> = {
      getTaxIDByDocument: jest.fn().mockResolvedValue(result),
    } as any;

    const useCase = new GetTaxIDByDocumentUseCase(repository);
    const documentNumber = "99999999999";
    const returnedResult = await useCase.execute(documentNumber);

    expect(returnedResult.idPersona).toBeUndefined();
  });

  it("propagates repository errors", async () => {
    const repository: jest.Mocked<IRegisterScopeThirteenRepositoryPort> = {
      getTaxIDByDocument: jest
        .fn()
        .mockRejectedValue(new Error("boom")),
    } as any;

    const useCase = new GetTaxIDByDocumentUseCase(repository);

    await expect(
      useCase.execute("20111111112"),
    ).rejects.toThrow("boom");
  });
});
