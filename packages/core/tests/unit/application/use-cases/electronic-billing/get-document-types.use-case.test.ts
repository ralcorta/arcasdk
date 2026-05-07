import { GetDocumentTypesUseCase } from "@application/use-cases/electronic-billing/get-document-types.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetDocumentTypesUseCase", () => {
  it("returns repository document types", async () => {
    const expected = { resultGet: { docTipo: [] } };
    const repository = {
      getDocumentTypes: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetDocumentTypesUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getDocumentTypes).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getDocumentTypes: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetDocumentTypesUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
