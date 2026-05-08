import { GetQuotationUseCase } from "@application/use-cases/electronic-billing/get-quotation.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetQuotationUseCase", () => {
  it("returns repository quotation", async () => {
    const expected = { resultGet: { monCotiz: 1000.5 } };
    const repository = {
      getQuotation: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetQuotationUseCase(repository);
    const result = await useCase.execute("DOL");

    expect(repository.getQuotation).toHaveBeenCalledWith("DOL");
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getQuotation: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetQuotationUseCase(repository);

    await expect(useCase.execute("DOL")).rejects.toThrow("boom");
  });
});
