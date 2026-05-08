import { GetVoucherTypesUseCase } from "@application/use-cases/electronic-billing/get-voucher-types.use-case";
import { IElectronicBillingRepositoryPort } from "@application/ports/electronic-billing/electronic-billing-repository.port";

describe("GetVoucherTypesUseCase", () => {
  it("returns repository voucher types", async () => {
    const expected = { resultGet: { cbteTipo: [] } };
    const repository = {
      getVoucherTypes: jest.fn().mockResolvedValue(expected),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetVoucherTypesUseCase(repository);
    const result = await useCase.execute();

    expect(repository.getVoucherTypes).toHaveBeenCalledTimes(1);
    expect(result).toEqual(expected);
  });

  it("propagates repository errors", async () => {
    const repository = {
      getVoucherTypes: jest.fn().mockRejectedValue(new Error("boom")),
    } as unknown as jest.Mocked<IElectronicBillingRepositoryPort>;

    const useCase = new GetVoucherTypesUseCase(repository);

    await expect(useCase.execute()).rejects.toThrow("boom");
  });
});
